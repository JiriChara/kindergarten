import { Sandbox } from '../sandbox';
import { HeadGoverness } from '../governesses/head-governess';

export const isString = (obj) =>
  Object.prototype.toString.call(obj) === '[object String]';

export const isFunction = (obj) =>
  Object.prototype.toString.call(obj) === '[object Function]';

export const isRegExp = (obj) =>
  Object.prototype.toString.call(obj) === '[object RegExp]';

export const isArray = Array.isArray || ((obj) => {
  return Object.prototype.toString.call(obj) === '[object Array]';
});

export const isUndefined = (obj) => obj === undefined;

export const isObject = (obj) => {
  const type = typeof obj;
  return type === 'function' || type === 'object' && !!obj;
};

export const isBoolean = (obj) => {
  return obj === true ||
    obj === false ||
    toString.call(obj) === '[object Boolean]';
};

export const isGoverness = (obj) => {
  return isObject(obj) && obj instanceof HeadGoverness;
};

export const isSandbox = (obj) => {
  return isObject(obj) && obj instanceof Sandbox;
};

export const isEmpty = (obj) => {
  if (isArray(obj)) {
    return obj.length > 0 ? false : true;
  }

  return true;
};

export const each = (arr, cb) => {
  for (let i = 0, len = arr.length; i < len; i++) {
    cb(arr[i]);
  }
};

export const find = (arr, cb) => {
  for (let i = 0, len = arr.length; i < len; i++) {
    const item = arr[i];

    if (cb(item)) {
      return item;
    }
  }
};

export const some = (arr, predicate) => {
  for (let i = 0, len = arr.length; i < len; i++) {
    if (predicate(arr[i])) {
      return true;
    }
  }

  return false;
};

export const filter = (arr, predicate) => {
  const results = [];

  for (let i = 0, len = arr.length; i < len; i++) {
    const item = arr[i];

    if (predicate(item)) {
      results.push(item);
    }
  }

  return results;
};

export const contains = (arr, item) => arr.indexOf(item) >= 0;

export const has = (obj, key) => {
  return Object.prototype.hasOwnProperty.call(obj, key);
};

export const bind = (func, context) => {
  if (!isFunction(func)) {
    throw new TypeError('Cannot bind non-callable function.');
  }

  return (...args) => func.apply(context, args);
};

export const keys = (obj) => {
  const nativeKeys = Object.keys;
  if (!isObject(obj)) return [];
  if (nativeKeys) return nativeKeys(obj);
  const keyArr = [];
  for (const key in obj) if (has(obj, key)) keyArr.push(key);
  return keys;
};

export const extend = (dest, source) => {
  const keyArr = keys(source);
  for (let i = 0, length = keyArr.length; i < length; i++) {
    const key = keyArr[i];
    const prop = source[key];

    if (has(source, key)) {
      dest[key] = isFunction(prop) ?
        bind(prop, dest) : prop;
    }
  }
};
