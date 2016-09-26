import {
  each,
  filter,
  forIn,
  isEmpty,
  isFunction,
  isString,
  some
} from 'lodash';

import Rule from '../Rule';
import BaseObject from '../BaseObject';
import isRule from '../utils/isRule';
import {
  AccessDenied,
  ArgumentError
} from '../errors';

export default class HeadGoverness extends BaseObject {
  /**
   * Creates a new instance of the HeadGoverness
   */
  constructor() {
    super();
    this.rules = [];
  }

  /**
   * Throws an error if child is not allowed to do some action
   */
  guard(action, ...args) {
    const target = args[0];

    if (this.isAllowed(action, ...args)) {
      return target;
    }

    throw new AccessDenied(
      `Child is not allowed to ${action} ${isString(target) ? target : 'the target'}.`
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

  /**
   * Returns true if child is allowed to perform some action
   */
  isAllowed(action, ...args) {
    if (this.isGuarded()) {
      // Is there any rule explicitly allowing the child to do that?
      const hasAllowRule = some(this.getRules(action), (rule) =>
        isRule(rule) && rule.type.isPositive && rule.verify(...args)
      );

      // Is there any rule strictly disallowing the child to do that?
      const hasStrictDisallowRule = some(this.getRules(action), (rule) =>
        isRule(rule) && !rule.verify(...args) && rule.definition.isStrict
      );

      if (!hasAllowRule || hasStrictDisallowRule) {
        return false;
      }
    }

    return true;
  }

  /**
   * Returns false if child is allowed to perform some action
   */
  isNotAllowed(...args) {
    return !this.isAllowed(...args);
  }

  /**
   * The getter of unguarded property. If governess is ungarded, then no errors will be
   * thrown when guard() method is called.
   */
  get unguarded() {
    return !!this._unguarded;
  }

  /**
   * The setter of unguarded property. If governess is ungarded, then no errors will be
   * thrown when guard() method is called.
   */
  set unguarded(value) {
    this._unguarded = !!value;

    return value;
  }

  getRules(type) {
    return type ?
      filter(this.rules, (rule) => rule.type.type === type) :
      this.rules;
  }

  learnRules(perimeter) {
    const governObj = perimeter.govern || {};
    let keys = 0;

    forIn(governObj, (val, key) => {
      if (governObj.hasOwnProperty(key)) {
        keys++;

        const ruleDef = governObj[key];

        // function rules must be called in context of perimeter to have access
        // to `this.child`
        if (isFunction(ruleDef)) {
          ruleDef.ruleContext = ruleDef.ruleContext || perimeter;
        }

        this.addRule(new Rule(
          key, ruleDef
        ));
      }
    });

    return keys;
  }

  addRule(...rules) {
    let counter = 0;

    each(rules, (rule) => {
      if (!isRule(rule)) {
        throw new ArgumentError(
          'Governess cannot learn the rule. Does it inherit from Rule class?'
        );
      }

      ++counter;
      this.rules.push(rule);
    });

    return counter;
  }

  /**
   * The governess is empty when no rules have been defined
   */
  hasAnyRules() {
    return !isEmpty(this.rules);
  }

  /**
   * Perform some stuff unguarded
   */
  doUnguarded(callback, context) {
    let returnValue;

    context = context || null;

    if (isFunction(callback)) {
      const before = this.unguarded;

      this.unguarded = true;
      returnValue = callback.apply(context);
      this.unguarded = before;
    }

    return returnValue;
  }

  isUnguarded() {
    return this.unguarded;
  }

  isGuarded() {
    return !this.isUnguarded();
  }
}
