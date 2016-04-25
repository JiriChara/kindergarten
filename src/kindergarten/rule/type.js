import isArray from 'lodash/isArray';
import isString from 'lodash/isString';

import BaseObject from '../base-object';
import AllowedMethodsService from '../utils/allowed-methods-service';
import {
  WrongRuleDefinition
} from '../errors';

// The basic RegEx for validating that rule string is correct. The type of the
// rule is later on validated using AllowedMethodsService as well.
const TYPE_REGEX = /^can(not)? ([a-z_$][a-zA-Z0-9_$]*)$/;

export default class Type extends BaseObject {
  constructor(str) {
    super();

    const match = isString(str) && str.match(TYPE_REGEX);

    // Extract type of the rule.
    // e.g. "cannot watch" => "watch"
    this._type = (() => isArray(match) ? match[2] : undefined)();

    this._str = str;

    this._validate();

    // 'can' rules are positive 'cannot' rules are NOT positive.
    this._isPositive = !match[1];
  }

  // Throw an error if the type of the rule is not applicable.
  _validate() {
    const allowedMethodsService = new AllowedMethodsService();
    const type = this.getType();

    if (
      !isString(type) ||
      allowedMethodsService.isRestricted(type)
    ) {
      throw new WrongRuleDefinition(
        `Cannot create a rule ${this._str}. ` +
        `The type of the rule cannot be parsed.`
      );
    }

    return true;
  }

  isPositive() {
    return !!this._isPositive;
  }

  getType() {
    return this._type;
  }
}
