import isObject from 'lodash/isObject';

import Purpose from '../Purpose';

const isPurpose = (obj) =>
  isObject(obj) && obj instanceof Purpose;

export default isPurpose;
