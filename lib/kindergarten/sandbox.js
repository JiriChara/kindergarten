import {_} from 'lodash';

import {HeadGoverness} from './governesses/head-governess';
import {Perimeter} from './perimeter';
import {Purpose} from './purpose';
import {
  ArgumentError,
  NoPurposeError
} from './errors';

// TODO: make sure name of purpose does not clash with the instance method
// names of sandbox
export class Sandbox {
  constructor(child) {
    this.child = child;
    this.governess = new HeadGoverness(child);

    this.perimeters = [];

    this._unguarded = false;
  }

  /**
   * Load perimeter classes
   */
  loadPerimeter(...perimeters) {
    _.each(perimeters, (perimeter) => {
      if (!_.isObject(perimeter) || !(perimeter instanceof Perimeter)) {
        throw new ArgumentError(
          'Module must be instance of Kindergarten.Perimeter.'
        );
      }

      // Skip if sandbox already contains the perimeter
      if (this.hasPerimeter(perimeter)) return;

      // Each perimeter must have a governess
      perimeter.governess = (
        _.isObject(perimeter.governess) &&
        perimeter.governess instanceof HeadGoverness
      ) ? perimeter.governess : this.governess;

      this.perimeters.push(perimeter);

      this._extendPurpose(perimeter);
    });
  }

  /**
   * Alias for loadPerimeter
   */
  loadModule(...args) {
    this.loadPerimeter.call(this, ...args);
  }

  _extendPurpose(perimeter) {
    const name = perimeter.purpose;
    if (!_.isString(name)) throw new NoPurposeError();

    this[name] = this[name] || new Purpose(name, this);
    this[name]._addPerimeter(perimeter);
  }

  /**
   * Return true if sandbox already contains a perimeter
   */
  hasPerimeter(perimeter) {
    return _.some(this.perimeters, (p) => {
      return p.purpose === perimeter.purpose;
    });
  }

  /**
   * Return true if allowed to do action on target
   */
  isAllowed(action, target) {
    return this.governess.isAllowed(action, target);
  }

  /**
   * Return true if not allowed to do action on target
   */
  isNotAllowed() {
    return !this.isAllowed();
  }

  /**
   * Return true if sandbox is guarded
   */
  isGuarded() {
    return !this._unguarded;
  }

  /**
   * Return true if sandbox is unguarded
   */
  isNotGuarded() {
    return !this.isGuarded;
  }

  // alias
  isUnguarded(...args) {
    return this.isNotGuarded.apply(this, ...args);
  }

  subscribe(purposeName, ...eventsAndCallback) {
    // FIXME: use event object instead of string
    const callback = _.last(eventsAndCallback);
    const events = eventsAndCallback.splice(-1, 1);
    const purpose = this.purpose[purposeName];

    if (!purpose) {
      throw new NoPurposeError(
         `Sandbox does not have purpose ${purposeName}`
      );
    }

    if (
      eventsAndCallback.length <= 1 ||
      !_.isFunction(callback)
    ) {
      throw new ArgumentError(
        'You must provide events to subscribe to and a callback.'
      );
    }

    _.each(events, (e) => {
      purpose._suscribe(e, callback);
    });
  }

  unsubscribe(purposeName, ...events) {
    const purpose = this.purpose[purposeName];

    if (!purpose) {
      throw new NoPurposeError(
         `Sandbox does not have purpose ${purposeName}`
      );
    }

    _.each(events, (e) => {
      purpose._unsubscribe(e);
    });
  }
}
