import HeadGoverness from './HeadGoverness';
import {
  AccessDenied
} from '../errors';

/**
 * A very strict governess! She forces all exposed methods from the sandbox or
 * perimeter to be governed. This means that all exposed methods must call
 * `guard()` method.
 *
 * Use this governess if you, or you colleagues forget to call `guard()` method
 * in you exposed methods.
 *
 * Note: Strict Governess does not prevent the exposed method to be executed!
 * Actually it executes that method and throw an error if that method did not
 * called the `guard()`
 */
export default class StrictGoverness extends HeadGoverness {
  constructor(...args) {
    super(...args);
    this._guardCount = 0;
    this._governedCount = 0;
  }

  governed(...args) {
    const returnVal = HeadGoverness.prototype.governed.apply(this, args);

    if (++this._governedCount > this._guardCount && !this.unguarded) {
      throw new AccessDenied(
        'All exposed methods must call guard method.'
      );
    }

    // TODO: test for return value
    return returnVal;
  }

  guard(...args) {
    ++this._guardCount;

    // TODO: test for return value
    return HeadGoverness.prototype.guard.apply(this, args);
  }
}
