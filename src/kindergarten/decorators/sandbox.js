import each from 'lodash/each';
import forOwn from 'lodash/forOwn';

import Sandbox from '../Sandbox';

const sandbox = (...sandboxArgs) => (Target) => {
  const sandboxInstance = new Sandbox(...sandboxArgs);

  const addMethod = (obj, key, value) => {
    if (obj[key]) {
      throw new Error(
        `Cannot apply sandbox decorator ${key} property is already defined.`
      );
    }
    obj[key] = value;
  };

  return class extends Target {
    constructor(...args) {
      super(...args);

      each([
        'loadPerimeter',
        'loadModule',
        'guard',
        'isAllowed',
        'isNotAllowed',
        'hasPerimeter',
        'getPerimeter',
        'getPerimeters',
        'governess'
      ], (key) => {
        addMethod(this, key, sandboxInstance[key]);
      });

      forOwn(sandboxInstance, (val, key) => {
        addMethod(this, key, val);
      });
    }
  };
};

export default sandbox;
