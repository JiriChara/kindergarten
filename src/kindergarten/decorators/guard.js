import {
  isString
} from 'lodash';

import {
  isPerimeter,
  isSandbox
} from '../utils';

const guard = (...args) => {
  const action = args[0];
  const isCalled = isString(action) || args.length === 0;

  const guardFunc = function (target, name, descriptor) {
    const protectedMethod = descriptor.value;

    descriptor.value = function (...protectedMethodArgs) {
      if (!isPerimeter(this) && !isSandbox(this)) {
        throw new Error(
          'Guard decorator can only be used within perimeter or sandbox.'
        );
      }

      this.guard((isCalled && action) ? action : name, ...protectedMethodArgs);

      return protectedMethod.apply(this, protectedMethodArgs);
    };
  };

  return isCalled ? guardFunc : guardFunc(...args);
};

export default guard;
