import {_} from 'lodash';

import {Sandbox} from './sandbox';
import {HeadGoverness} from './governesses/head-governess';
import {NoPurposeError} from './errors';
import {NoSanboxError} from './errors';

const PURPOSE_REGEX = /^[a-z_\$]+[a-zA-Z0-9_\$]*$/;

/**
 * A Perimeter is used to define the places where child can play.
 */
export class Perimeter {
  constructor(purpose, opts = {}) {
    this.purpose = purpose;
    this.govern = opts.govern;
    this.expose = opts.expose;
  }

  import(sandbox, governess) {
    this.sandbox = sandbox;
    this.governess = governess;
  }

  guard(...args) {
    this.governess.guard(...args);
  }

  get purpose() {
    return this._purpose;
  }

  set purpose(value) {
    if (!_.isString(value) || !PURPOSE_REGEX.test(value)) {
      throw new NoPurposeError();
    }

    this._purpose = value;

    return value;
  }

  get govern() {
    return _.isObject(this._govern) ? this._govern : {};
  }

  set govern(value) {
    this._govern = _.isObject(value) ? value : {};

    return value;
  }

  get expose() {
    return _.isArray(this._expose) ? this._expose : [];
  }

  set expose(value) {
    this._expose = _.isArray(value) ? value : [];

    return value;
  }

  get sandbox() {
    return this._sandbox || null;
  }

  set sandbox(value) {
    if (!_.isObject(value) || !(value instanceof Sandbox)) {
      throw new NoSanboxError();
    }

    this._sandbox = value;
    this._child = value.child;
  }

  get governess() {
    return this._governess;
  }

  set governess(value) {
    // if governess is null perimeter will use the governess of it's sandbox
    this._governess = (_.isObject(value) && value instanceof HeadGoverness) ?
      value : null;

    return value;
  }
}
