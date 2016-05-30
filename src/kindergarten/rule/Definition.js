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

const TYPES = [
  [
    'items',
    (def) => isArray(def) && !isEmpty(def),
    false // is not strict
  ],

  [
    'regex',
    (def) => isRegExp(def),
    true // is strict
  ],

  [
    'customMethod',
    (def) => isFunction(def),
    true // is strict
  ]
];

export default class Definition extends BaseObject {
  constructor(rule, def) {
    super();

    this.rule = rule;

    this.raw = def;

    this._resolve();
  }

  isStrict() {
    return !this.rule.type.isPositive() ||
      this._isStrict(this._type);
  }

  isCustom() {
    return this._type === 'customMethod';
  }

  get items() {
    return this._condition('items')(this._items) ?
      this._items : null;
  }

  set items(val) {
    this._items = this._condition('items')(val) ? val : null;

    return val;
  }

  get regex() {
    return this._regex || null;
  }

  set regex(val) {
    this._regex = this._condition('regex')(val) ? val : null;

    return val;
  }

  get customMethod() {
    return this._customMethod || null;
  }

  set customMethod(val) {
    this._customMethod = this._condition('customMethod')(val) ? val : null;

    return val;
  }

  get type() {
    return this._type;
  }

  _resolve() {
    const definitionObj = find(TYPES, (type) => {
      const condition = type[1];

      return condition(this.raw);
    }) || null;

    if (!isArray(definitionObj)) {
      throw new WrongRuleDefinition(
        `Cannot create a new rule "${this.rule.type.type}". Wrong rule definition.`
      );
    }

    this.ruleContext = this.raw.ruleContext;

    [this._type] = definitionObj;

    this[this._type] = this.raw;
  }
}

Definition.prototype._condition = memoize((type) =>
  (find(TYPES, (t) => type === t[0])[1] || (() => false)
));

Definition.prototype._isStrict = memoize((type) =>
  (find(TYPES, (t) => type === t[0])[2] || (() => false)()
));
