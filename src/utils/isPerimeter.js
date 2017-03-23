import isObject from 'lodash/isObject';

import Perimeter from '../Perimeter';

const isPerimeter = (obj) =>
  isObject(obj) && obj instanceof Perimeter;

export default isPerimeter;
