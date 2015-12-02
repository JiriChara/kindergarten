import {_} from 'lodash';

import {Rule} from '../rule';
import {
  AccessDenied,
  ArgumentError
} from '../errors';

export class HeadGoverness {
  constructor(child) {
    this.child = child;
    this.rules = [];
  }

  guard(action, target) {
    if (this.isGuarded()) {
      // Is there any rule explicitly allowing the child to do that?
      const hasAllowRule = _.some(this.getRules(action), (rule) => {
        return this.isRule(rule) && rule.verify(target);
      });

      // Is there any rule explicitly disallowing the child to do that?
      const hasDisallowRule = _.some(this.getRules(action), (rule) => {
        return this.isRule(rule) && !rule.verify(target);
      });

      if (!hasDisallowRule || !hasAllowRule) {
        // TODO: is there a way to get a type of target?
        throw new AccessDenied(
          `Child is not allowed to ${action} the target.`
        );
      }
    }

    return target;
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
    return _.filter(this.rules, function(rule) {
      return rule.type === type;
    });
  }

  verify(action, target) {
    _.each(this.getRules(action), function(rule) {
      rule.verify(target);
    });

    return true;
  }

  addRule(...rules) {
    _.each(rules, (rule) => {
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
    return _.isEmpty(this.rules);
  }

  /**
   * Perform some stuff unguarded
   */
  unguarded(callback, context) {
    context = context || null;

    if (_.isFunction(callback)) {
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
