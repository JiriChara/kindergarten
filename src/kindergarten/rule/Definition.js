import {
  find,
  isArray,
  isEmpty,
  isFunction,
  isRegExp,
  memoize
} from 'lodash';

import BaseObject from '../BaseObject';
import {
  WrongRuleDefinition
} from '../errors';

export default class Definition extends BaseObject {
  constructor(rule, def) {
    super();

    this.TYPES = [
      [
        // The name of the definition type
        'items',
        // Condition that has to be met for raw value
        (ruleDef) => isArray(ruleDef) && !isEmpty(ruleDef),
        false // is not strict
      ],

      [
        // The name of the definition type
        'regex',
        // Condition that has to be met for raw value
        (ruleDef) => isRegExp(ruleDef),
        true // is strict
      ],

      [
        // The name of the definition type
        'customMethod',
        // Condition that has to be met for raw value
        (ruleDef) => isFunction(ruleDef),
        true // is strict
      ]
    ];

    this.rule = rule;

    this.raw = def;

    this._resolve();
  }

  isStrict() {
    return !this.rule.type.isPositive() ||
      this._isStrict(this.type);
  }

  _resolve() {
    const definitionObj = find(this.TYPES, (type) => {
      const condition = type[1];

      return condition(this.raw);
    }) || null;

    if (!isArray(definitionObj)) {
      throw new WrongRuleDefinition(
        `Cannot create a new rule "${this.rule.type.type}". Wrong rule definition.`
      );
    }

    if (isFunction(this.raw) && this.raw.ruleContext) {
      this.ruleContext = this.raw.ruleContext;
    }

    // set the type of the rule definition (items/customMethod/regex/...)
    [this.type] = definitionObj;

    this[this.type] = this.raw;
  }
}

Definition.prototype._isStrict = memoize(function (type) {
  return (find(this.TYPES, (t) => type === t[0]) || [])[2] || false;
});
