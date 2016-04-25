import isFunction from 'lodash/isFunction';
import isArray from 'lodash/isArray';
import isRegExp from 'lodash/isRegExp';
import isEmpty from 'lodash/isEmpty';
import find from 'lodash/find';

import BaseObject from '../base-object';
import memoize from 'lodash/memoize';
import { WrongRuleDefinition } from '../errors';

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
    this._rule = rule;
    this._raw = def;

    this._resolve();
  }

  get items() {
    return this._condition('items')(this._items) ?
      this._items : null;
  }

  getItems() {
    return this.items;
  }

  set items(val) {
    this._items = this._condition('items')(val) ? val : null;

    return val;
  }

  setItems(val) {
    this.items = val;

    return val;
  }

  get regex() {
    return this._regex || null;
  }

  getRegex() {
    return this.regex;
  }

  set regex(val) {
    this._regex = this._condition('regex')(val) ? val : null;

    return val;
  }

  setRegex(val) {
    this.regex = val;

    return val;
  }

  get customMethod() {
    return this._customMethod || null;
  }

  getCustomMethod() {
    return this.customMethod;
  }

  set customMethod(val) {
    this._customMethod = this._condition('customMethod')(val) ? val : null;

    return val;
  }

  setCustomMethod(val) {
    this.customMethod = val;

    return val;
  }

  _resolve() {
    const definitionObj = find(TYPES, (type) => {
      const condition = type[1];

      return condition(this._raw);
    }) || null;

    if (!isArray(definitionObj)) {
      throw new WrongRuleDefinition(
        `Cannot create a new rule "${this._rule.type.type}". Wrong rule definition.`
      );
    }

    this.ruleContext = this._raw.ruleContext;

    [this._type] = definitionObj;

    this[this._type] = this._raw;
  }

  get type() {
    return this._type;
  }

  isStrict() {
    return !this._rule.type.isPositive() ||
      this._isStrict(this._type);
  }

  isCustom() {
    return this._type === 'customMethod';
  }
}

Definition.prototype._condition = memoize((type) =>
  (find(TYPES, (t) => type === t[0])[1] || (() => false)
));

Definition.prototype._isStrict = memoize((type) =>
  (find(TYPES, (t) => type === t[0])[2] || (() => false)()
));
