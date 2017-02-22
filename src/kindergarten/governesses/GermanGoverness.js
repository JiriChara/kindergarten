import find from 'lodash/find';

import HeadGoverness from './HeadGoverness';
import { isPerimeter } from '../utils';

/**
 * German governess loves rules. She automatically guards all exposed methods.
 * This means that she calls `guard()` and passes the name of the exposed
 * method as a first argument and arguments passed to exposed method as well.
 */
export default class GermanGoverness extends HeadGoverness {
  /**
   * The overriden governed method of the HeadGoverness, that calls guard
   * method before any exposed method is executed. The first parameter passed
   * to guard method will be the name of the exposed method. So make sure the
   * name of exposed method and rule is the same when defining a perimeter.
   */
  governed(callback, args = [], callingContext = null) {
    const guardArgs = args;

    guardArgs.unshift(this._detectNameOfExposedMethod(
      callingContext,
      callback
    ));

    // Call the guard method on each exposed method
    this.guard.apply(
      this,
      guardArgs
    );

    return HeadGoverness.prototype.governed.call(this, callback, args, callingContext);
  }

  /**
   * Find the method in the perimeter.
   */
  _detectNameOfExposedMethod(perimeter, method) {
    if (isPerimeter(perimeter)) {
      return find((perimeter.expose || []), (m) => perimeter[m] === method);
    }

    throw new Error(
      'German governess can only be used within sandbox.'
    );
  }
}
