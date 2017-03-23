import isObject from 'lodash/isObject';

import Rule from '../Rule';

const isRule = (obj) =>
  isObject(obj) && obj instanceof Rule;

export default isRule;
