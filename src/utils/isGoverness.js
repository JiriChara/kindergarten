import isObject from 'lodash/isObject';

import { HeadGoverness } from '../governesses';

const isGoverness = (obj) =>
  isObject(obj) && obj instanceof HeadGoverness;

export default isGoverness;
