import {
  each,
  filter,
  isEmpty,
  isFunction,
  some
} from 'lodash';

import Rule from '../Rule';
import BaseObject from '../BaseObject';
import {
  AccessDenied,
  ArgumentError
} from '../errors';

export default class HeadGoverness extends BaseObject {
  constructor(child) {
    super();
    this.child = child;
    this.rules = [];
  }

  guard(action, ...args) {
    const target = args[0];

    if (this.isAllowed(action, ...args)) {
      return target;
    }

    throw new AccessDenied(
      // TODO: is there a way to get a type of target?
      `Child is not allowed to ${action} the target.`
    );
  }

  /**
   * Watch over some child action. By default we only execute it, but custom
   * governesses can override it to do some custom stuff like calling `guard()`
   * or something else (see. `StrictGoverness` class).
   */
  governed(callback, args = [], callingContext = null) {
    return callback.apply(callingContext, args);
  }

  isAllowed(action, ...args) {
    if (this.isGuarded()) {
      // Is there any rule explicitly allowing the child to do that?
      const hasAllowRule = some(this.getRules(action), (rule) =>
        this.isRule(rule) && rule.type.isPositive && rule.verify(...args)
      );

      // Is there any rule strictly disallowing the child to do that?
      const hasStrictDisallowRule = some(this.getRules(action), (rule) =>
        this.isRule(rule) && !rule.verify(...args) && rule.definition.isStrict
      );

      if (!hasAllowRule || hasStrictDisallowRule) {
        return false;
      }
    }

    return true;
  }

  isNotAllowed(...args) {
    return !this.isAllowed(...args);
  }

  get unguarded() {
    return !!this._unguarded;
  }

  set unguarded(value) {
    this._unguarded = !!value;

    return value;
  }

  /**
   * Return true if given rule is an instance of Kindergarten.Rule class
   */
  isRule(rule) {
    let res = false;

    try {
      res = (rule instanceof Rule);
    } catch (ignore) {
      // ignore
    }

    return res;
  }

  getRules(type) {
    // TODO: implement new method on type to compare that
    return filter(this.rules, (rule) => rule.type.getType() === type);
  }

  verify(action, ...args) {
    each(this.getRules(action), (rule) => {
      rule.verify(...args);
    });

    return true;
  }

  learnRules(perimeter, governObj) {
    let keys = 0;

    for (const key in governObj) {
      if (governObj.hasOwnProperty(key)) {
        keys++;

        const ruleDef = governObj[key];

        ruleDef.ruleContext = ruleDef.ruleContext || perimeter;

        this.addRule(new Rule(
          key, ruleDef
        ));
      }
    }

    return keys;
  }

  addRule(...rules) {
    each(rules, (rule) => {
      if (!this.isRule(rule)) {
        throw new ArgumentError(
          'Governess cannot learn the rule. Does it inherit from Rule class?'
        );
      }

      this.rules.push(rule);
    });

    return this.rules.length;
  }

  /**
   * The governess is empty when no rules have been defined
   */
  isEmpty() {
    return isEmpty(this.rules);
  }

  /**
   * Perform some stuff unguarded
   */
  unguarded(callback, context) {
    context = context || null;

    if (isFunction(callback)) {
      const before = this.unguarded;

      this.unguarded = true;
      callback.apply(context);
      this.unguarded = before;
    }
  }

  isUnguarded() {
    return !!this.unguarded;
  }

  isGuarded() {
    return !this.isUnguarded();
  }
}
