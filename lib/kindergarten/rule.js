import { PubSub } from './utils/pub-sub';
import { AllowedMethodsService } from './utils/allowed-methods-service';
import {
  isFunction,
  isArray,
  isString,
  isUndefined,
  isEmpty,
  isBoolean,
  isRegExp,
  some,
  each
} from './utils/utils';
import { WrongRuleDefinition } from './errors';

// The basic RegEx for validating that rule string is correct. The type of the
// rule is later on validated using AllowedMethodsService as well.
const RULE_REGEX = /^can(not)? (\w+)$/;

/**
 * The definition of Rule class.
 *
 * Rules are used by a governess. Governess can learn many rules and they are
 * defined in perimeter in most of the cases.
 *
 * The easiest way to create a new rule is to use the create class method of
 * Rule class. A simple definition of a rule might look like this:
 *
 * Rule.create('can view', {
 *   items: [Article]
 * });
 *
 * Note: Rules are used internally by a governess, it's not meant to use them
 * as a standalone object. It's faster to define multiple rules using
 * perimeter.
 */
export class Rule extends PubSub {
  static create(str, def) {
    const match = isString(str) && str.match(RULE_REGEX);

    // Extract type of the rule.
    // e.g. "cannot watch" => "watch"
    const type = (function () {
      return isArray(match) ?
        match[2] : undefined;
    }());

    // Rule must have a type.
    if (isUndefined(type)) {
      throw new WrongRuleDefinition(
        `Cannot parse following rule definition "${str}".`
      );
    }

    def = def || {};

    // 'can' rules are positive 'cannot' rules are NOT positive.
    const isPositive = !match[1];
    const items = def.items || [];
    // Custom rule definition
    const rule = def.rule;

    if (isEmpty(items) && !this._isValidRuleDef(rule)) {
      throw new WrongRuleDefinition(
        `Cannot create a new rule "${str}". No items or rule given.`
      );
    }

    if (!isEmpty(items) && this._isValidRuleDef(rule)) {
      throw new WrongRuleDefinition(
        `Cannot create a new rule "${str}". Both the items and rule given.`
      );
    }

    // Return newly constructed rule.
    return new Rule(
      type,
      items,
      this._createVerifyObj(rule, isPositive, def.ruleContext)
    );
  }

  static _createVerifyObj(rule, isPositive, ruleContext = null) {
    // The custom rules are always strict
    if (this._isValidRuleDef(rule)) {
      return {
        isPositive,
        isStrict: true,
        isCustom: true,
        rule(...args) {
          if (isFunction(rule)) {
            const res = rule.apply(ruleContext, args);
            return isPositive ? res : !res;
          }

          // TODO: add spec
          if (isRegExp(rule)) {
            return rule.test(args[0]);
          }
        }
      };
    }

    return {
      isPositive,
      isStrict: !isPositive,
      isCustom: false,
      rule() { // verify methods of non-custom rules return always true
        return true;
      }
    };
  }

  static _isValidRuleDef(rule) {
    return isFunction(rule) || isRegExp(rule);
  }

  constructor(type, items, verifyObj) {
    super();

    // The type of the rule.
    // e.g. "cannot watch" => "watch"
    this.type = type;
    this.items = items;
    this.verifyMethod = verifyObj.rule;
    this.isPositive = verifyObj.isPositive;
    this.isStrict = verifyObj.isStrict;
    this.isCustom = verifyObj.isCustom;

    const errorSufix = 'Use create() to create new rule.';

    const allowedMethodsService = new AllowedMethodsService();
    if (!isString(this.type) || allowedMethodsService.isRestricted(this.type)) {
      throw new WrongRuleDefinition(
        `${this.type} can't be used as a type of the rule. ${errorSufix}`
      );
    }

    const validation = [
      [
        !isArray(this.items),
        'items must be an array.'
      ],
      [
        !isFunction(this.verifyMethod),
        'verifyMethod must be a function.'
      ],
      [
        !isBoolean(this.isPositive),
        'isPositive must be a boolean.'
      ],
      [
        !isBoolean(this.isStrict),
        'isStrict must be a boolean.'
      ],
      [
        !isBoolean(this.isCustom),
        'isCustom must be a boolean.'
      ],
      [
        this.isCustom && !this.isStrict,
        'Rule can\'t be custom and not strict.'
      ],
      [
        !this.isPositive && !this.isStrict,
        'Rule can\'t be negative and not strict.'
      ]
    ];

    each(validation, (val) => {
      if (val[0]) {
        throw new WrongRuleDefinition(
          `${val[1]} ${errorSufix}`
        );
      }
    });
  }

  verify(...args) {
    let isAllowed = false;
    const subject = args[0];

    if (!isEmpty(this.items)) {
      isAllowed = some(this.items, (item) => {
        let isInstance = false;

        try {
          isInstance = subject instanceof item;
        } catch (ignore) {
          // Ignore if instanceof is not applicable
        }

        return isInstance || item === subject;
      });
    }

    isAllowed = this.isPositive ? isAllowed : !isAllowed;

    return this.isCustom ? this.verifyMethod(...args) : isAllowed;
  }

  toJSON() {
    return {
      type: this.type,
      isPositive: this.isPositive,
      isStrict: this.isStrict,
      isCustom: this.isCustom
    };
  }
}
