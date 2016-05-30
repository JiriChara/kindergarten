import {
  each
} from 'lodash';

import HeadGoverness from './HeadGoverness';
import { isPerimeter } from '../utils';

/**
 * German governess loves rules. She automatically guards all exposed methods.
 * This means that she calls `guard()` and passes the name of the exposed
 * method as a first argument and arguments passed to exposed method as well.
 */
export default class GermanGoverness extends HeadGoverness {
  governed(callback, args = [], callingContext = null) {
    const guardArgs = args;

    const exposedMethodName = this._detectNameOfExposedMethod(
      callingContext,
      callback
    );

    guardArgs.unshift(exposedMethodName);

    this.guard.apply(
      this,
      guardArgs
    );

    return HeadGoverness.prototype.governed.call(this, callback, args, callingContext);
  }

  _detectNameOfExposedMethod(source, method) {
    if (isPerimeter(source)) {
      let methodName;

      each(source.expose, (m) => {
        if (source[m] === method) {
          methodName = m;
          return;
        }
      });

      return methodName;
    }

    // TODO: throw a custom error
    throw new Error(
      'German governess can only be used within sandbox.'
    );
  }
}
