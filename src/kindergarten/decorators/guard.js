import isString from 'lodash/isString';
import isFunction from 'lodash/isFunction';
import isUndefined from 'lodash/isUndefined';

import {
  isPerimeter,
  isSandbox
} from '../utils';

import {
  AccessDenied
} from '../errors';

/**
 * The definition of `guard` decorator. Guard decorator is used to protect
 * methods in the sandbox. You can pass the name of the rule as a first
 * argument otherwise the name of the rule will be detected from name of the
 * protected method. Second argument can be a callback function or return value
 * that should be returned when child is not allowed to perform certain action.
 *
 * Example:
 *
 * class Foo {
 *   @guard
 *   foo() {}
 *
 *   @guard('watch')
 *   bar() {}
 *
 *   @guard('bar', '<div>Not allowed</div>')
 *   baz() {}
 * }
 */
const guard = (...args) => {
  /**
   * Name of the action that should be guarded.
   */
  const action = args[0];

  /**
   * True if the @guard decorator is called `@guard()`
   */
  const isCalled = isString(action) || args.length === 0;

  /**
   * Return callback or value that should be returned in case guard method
   * throws `AccessDenied` error
   */
  let callback;
  if (isCalled) {
    callback = args[1];
  }

  const guardFunc = function (target, name, descriptor) {
    const protectedMethod = descriptor.value;

    descriptor.value = function (...protectedMethodArgs) {
      if (!isPerimeter(this) && !isSandbox(this) && !isFunction(this.guard)) {
        throw new Error(
          'Guard decorator can only be used within perimeter or sandbox.'
        );
      }

      const guardCall = () => this.guard(
        (isCalled && action) ? action : name, ...protectedMethodArgs
      );

      /**
       * If callback is specified and guard method throws an error. Then we
       * need to return the result of the callback method;
       */
      if (!isUndefined(callback)) {
        try {
          guardCall();
        } catch (e) {
          if (e instanceof AccessDenied) {
            return isFunction(callback) ?
              callback.apply(this, protectedMethodArgs) :
              callback;
          }
        }
      }

      /**
       * Call the guard method of the governess
       */
      guardCall();

      return protectedMethod.apply(this, protectedMethodArgs);
    };
  };

  return isCalled ? guardFunc : guardFunc(...args);
};

export default guard;
