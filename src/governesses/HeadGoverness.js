import each from 'lodash/each';
import filter from 'lodash/filter';
import forIn from 'lodash/forIn';
import isFunction from 'lodash/isFunction';
import isString from 'lodash/isString';
import isEmpty from 'lodash/isEmpty';
import some from 'lodash/some';

import Rule from '../Rule';
import isRule from '../utils/isRule';
import {
  AccessDenied,
  ArgumentError
} from '../errors';

export default class HeadGoverness {
  /**
   * Creates a new instance of the HeadGoverness
   */
  constructor() {
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
      const allowRules = [];
      const strictDisallowRules = [];

      each(this.getRules(action), (rule) => {
        const verificationResult = rule.verify(...args);

        if (isRule(rule)) {
          // Is there any rule explicitly allowing the child to do that?
          if (rule.type.isPositive && verificationResult) {
            allowRules.push(rule);
          }

          // Is there any rule strictly disallowing the child to do that?
          if (!verificationResult && rule.definition.isStrict) {
            strictDisallowRules.push(rule);
          }
        }
      });

      if (isEmpty(allowRules) || !isEmpty(strictDisallowRules)) {
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
        const ruleDef = governObj[key];

        // function rules must be called in context of perimeter to have access
        // to `this.child`
        if (isFunction(ruleDef)) {
          ruleDef.ruleContext = ruleDef.ruleContext || perimeter;
        }

        const rule = new Rule(
          key, ruleDef
        );
        rule._perimeter = perimeter;

        if (!this.hasRule(perimeter, rule)) {
          this.addRule(rule);
          keys++;
        }
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
   * Return true if governess already has a given rule from perimeter.
   */
  hasRule(perimeter, rule) {
    return some(this.rules, (r) => r.type.raw === rule.type.raw && r._perimeter === perimeter);
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
