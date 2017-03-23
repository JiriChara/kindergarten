import isArray from 'lodash/isArray';
import isString from 'lodash/isString';

import AllowedMethodsService from '../utils/AllowedMethodsService';
import {
  WrongRuleDefinition
} from '../errors';

// The basic RegEx for validating that rule string is correct. The type of the
// rule is later on validated using AllowedMethodsService as well.
const TYPE_REGEX = /^can(not)? ([a-z_$][a-zA-Z0-9_$]*)$/;

/**
 * Implementation of the Rule Type class.
 * Type is responsible for the rule string e.g. `can watch` validation and
 * for extracting all relevant infos out of that string.
 */
export default class Type {
  constructor(rule, str) {
    const match = isString(str) && str.match(TYPE_REGEX);

    // Extract type of the rule.
    // e.g. "cannot watch" => "watch"
    this.type = (() => (isArray(match) ? match[2] : undefined))();

    /**
     * Just store the given string. Used internally by Type class.
     */
    this.raw = str;

    /**
     * Reference to a original rule
     */
    this.rule = rule;

    this.validate();

    // 'can' rules are positive 'cannot' rules are NOT positive.
    this._isPositive = !match[1];
  }

  /**
   * Throws an error if the type of the rule is not applicable.
   */
  validate() {
    const allowedMethodsService = new AllowedMethodsService();
    const type = this.type;

    if (!isString(type) || allowedMethodsService.isRestricted(type)) {
      throw new WrongRuleDefinition(
        `Cannot create a rule ${this.raw}. The type of the rule cannot be parsed.`
      );
    }

    return true;
  }

  /**
   * `can` rules are positive `cannot` rules are negative.
   */
  isPositive() {
    return !!this._isPositive;
  }

  /**
   * Opposite of `isPositive()` method.
   */
  isNegative() {
    return !this.isPositive();
  }
}
