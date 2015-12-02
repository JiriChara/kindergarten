import {_} from 'lodash';

import {WrongRuleDefinition} from './errors';
import {ArgumentError} from './errors';

const RULE_REGEX = /^can(not)? (\w+)$/;

export class Rule {
  static create(str, def) {
    const match = _.isString(str) && str.match(RULE_REGEX);

    // extract type of the rule
    // e.g. "cannot watch" => "watch"
    const type = (function() {
      return _.isArray(match) ?
        match[2] : undefined;
    }());

    if (_.isUndefined(type)) {
      throw new WrongRuleDefinition(
        `Cannot parse following rule definition "${str}".`
      );
    }

    def = def || {};

    const isPositive = !match[1];
    const items = def.items || [];
    const rule = def.rule;

    if (_.isEmpty(items) && !_.isFunction(rule)) {
      throw new WrongRuleDefinition(
        `Cannot parse rule "${str}". No items or rule given.`
      );
    }

    return new Rule(
      type,
      items,
      this._createVerifyMethod(rule, isPositive, def.ruleContext),
      isPositive
    );
  }

  static _createVerifyMethod(rule, isPositive, ruleContext = null) {
    if (_.isFunction(rule)) {
      return (...args) => {
        const res = rule.apply(ruleContext, ...args);
        return isPositive ? res : !res;
      };
    }

    return () => {
      return isPositive;
    };
  }

  constructor(type, items, verifyMethod, isPositive) {
    this.type = type;
    this.items = items;
    this.verifyMethod = verifyMethod;
    this.isPositive = isPositive;

    const errorSufix = 'Use create() to create new rule.';
    if (!_.isString(this.type)) {
      throw new ArgumentError(
        `type must be a string. ${errorSufix}`
      );
    }

    if (!_.isArray(this.items)) {
      throw new ArgumentError(
        `items must be an array. ${errorSufix}`
      );
    }

    if (!_.isFunction(this.verifyMethod)) {
      throw new ArgumentError(
        `verifyMethod must be a function. ${errorSufix}`
      );
    }

    if (!_.isBoolean(this.isPositive)) {
      throw new ArgumentError(
        `isPositive must be a boolean. ${errorSufix}`
      );
    }
  }

  verify(...args) {
    let isAllowed = false;
    const subject = args[0];

    if (!_.isEmpty(this.items)) {
      isAllowed = _.some(this.items, (item) => {
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

    return isAllowed && this.verifyMethod(subject);
  }
}
