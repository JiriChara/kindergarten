import isObject from 'lodash/isObject';

import Sandbox from '../Sandbox';

const isSandbox = (obj) =>
  isObject(obj) && obj instanceof Sandbox;

export default isSandbox;
