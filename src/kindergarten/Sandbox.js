import {
  each,
  find,
  some
} from 'lodash';

import HeadGoverness from './governesses/HeadGoverness';
import Purpose from './Purpose';
import BaseObject from './BaseObject';
import AllowedMethodsService from './utils/AllowedMethodsService';
import {
  isGoverness,
  isPerimeter,
  isPurpose
} from './utils';
import {
  ArgumentError,
  NoGovernessError,
  RestrictedMethodError
} from './errors';

/**
 * The definition of Sandbox class.
 * The sandbox is place where children can play governed by a govenress.
 */
export default class Sandbox extends BaseObject {
  /**
   * Create a new empty sandbox.
   */
  constructor(child = null, opts = {}) {
    super(); // init publish/subscribe

    this.child = child;

    // Sandbox is governed by a HeadGoverness by default
    this.governess = opts.governess || new HeadGoverness(child);

    this._perimeters = opts.perimeters || [];

    this.trigger('initialize', this);
  }

  /**
   * The getter of the governess.
   */
  get governess() {
    return this._governess;
  }

  /**
   * The setter of the governess.
   * Make sure new governess learn all the rules when governess is set.
   */
  set governess(value) {
    if (!isGoverness(value)) {
      throw new NoGovernessError();
    }

    // if governess is null perimeter will use the governess of it's sandbox
    this._governess = value;

    // New governess must know all the rules (if any)
    this._learnRules();

    return value;
  }

  /**
   * Load perimeters.
   * Returns the count of addded perimeters.
   */
  loadPerimeter(...perimeters) {
    let counter = 0;

    each(perimeters, (perimeter) => {
      // Sandbox only accepts perimeters
      if (!isPerimeter(perimeter)) {
        throw new ArgumentError(
          'Module must be instance of Kindergarten.Perimeter.'
        );
      }

      // Skip if sandbox already have the perimeter
      if (this.hasPerimeter(perimeter)) return;

      // If perimeter has a governess, then she has to learn the rules as well
      if (isGoverness(perimeter.governess)) {
        perimeter.governess.learnRules(perimeter, perimeter.govern);
      }

      // The governess of a sandbox must know all the rules
      this.governess.learnRules(perimeter, perimeter.govern);

      perimeter.sandbox = this;

      this._perimeters.push(perimeter);

      // Make sure the purpose is available on Sandbox
      this._extendPurpose(perimeter);

      ++counter;

      this.trigger('load-perimeter', this, perimeter);
    });

    return counter;
  }

  /**
   * Alias for loadPerimeter
   */
  loadModule(...args) {
    return this.loadPerimeter(...args);
  }

  /**
   * Return true if sandbox already contains a perimeter.
   */
  hasPerimeter(perimeter) {
    return some(this._perimeters, (p) => p.purpose === perimeter.purpose);
  }

  /**
   * Return perimeter by a purpose or null.
   */
  getPerimeter(purpose) {
    const perimeter = find(this._perimeters, (p) => (p.purpose === purpose));

    return isPerimeter(perimeter) ? perimeter : null;
  }

  /**
   * Return true if allowed to do action on target.
   */
  isAllowed(...args) {
    return this.governess.isAllowed(...args);
  }

  /**
   * Return true if not allowed to do action on target.
   */
  isNotAllowed(...args) {
    return !this.isAllowed(...args);
  }

  /**
   * Expose the purpose of a perimeter, make sure the purpose of the perimeter
   * is available on this sandbox.
   * This method is used internally by Sandbox and shouldn't be used
   * externally.
   */
  _extendPurpose(perimeter) {
    const name = perimeter.purpose;
    const allowedMethodsService = new AllowedMethodsService(this);

    if (allowedMethodsService.isRestricted(name)) {
      throw new RestrictedMethodError(
        `Cannot expose purpose ${name} to sandbox. Restricted method name.`
      );
    }

    this[name] = isPurpose(this[name]) ? this[name] : new Purpose(name, this);
    this[name]._loadPerimeter(perimeter);
  }

  /**
   * Make sure governess know all the rules from all loaded perimeters.
   * This method is used internally by Sandbox and shouldn't be used
   * externally.
   */
  _learnRules() {
    each(this._perimeters || [], (perimeter) => {
      this.governess.learnRules(perimeter);
    });
  }
}
