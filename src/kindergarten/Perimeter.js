import extend from 'lodash/extend';
import isArray from 'lodash/isArray';
import isObject from 'lodash/isObject';
import isString from 'lodash/isString';

import AllowedMethodsService from './utils/AllowedMethodsService';
import BaseObject from './BaseObject';
import HeadGoverness from './governesses/HeadGoverness';
import {
  isGoverness,
  isSandbox
} from './utils';
import {
  NoPurposeError,
  NoSandboxError
} from './errors';

const allowedMethodsService = new AllowedMethodsService({});

/**
 * A Perimeter is used to define the places where child can play.
 */
export default class Perimeter extends BaseObject {
  constructor(purpose, opts = {}) {
    super();

    // TODO: added spec for it
    if (isObject(purpose) && isString(purpose.purpose)) {
      opts = purpose;
      this.purpose = purpose.purpose;
    }

    this.purpose = this.purpose || purpose;
    this.govern = opts.govern;
    this.expose = opts.expose;

    if (isGoverness(this.governess)) {
      this.governess.learnRules(this, this.govern);
    }

    extend(this, opts);
  }

  guard(...args) {
    return this.governess.guard.call(this.governess, ...args);
  }

  governed(...args) {
    return this.governess.governed.call(this.governess, ...args);
  }

  isAllowed(...args) { // TODO: add spec
    return this.governess.isAllowed.call(this.governess, ...args);
  }

  isNotAllowed(...args) { // TODO: add spec
    return this.governess.isNotAllowed.call(this.governess, ...args);
  }

  get purpose() {
    return this._purpose;
  }

  set purpose(value) {
    if (!isString(value) || allowedMethodsService.isRestricted(value)) {
      throw new NoPurposeError();
    }

    this._purpose = value;

    return value;
  }

  get govern() {
    return isObject(this._govern) ? this._govern : {};
  }

  set govern(value) {
    this._govern = isObject(value) ? value : {};

    return value;
  }

  get expose() {
    return isArray(this._expose) ? this._expose : [];
  }

  set expose(value) {
    this._expose = isArray(value) ? value : [];

    return value;
  }

  get sandbox() {
    return isSandbox(this._sandbox) ?
      this._sandbox :
      null;
  }

  set sandbox(value) {
    if (!isSandbox(value)) {
      throw new NoSandboxError();
    }

    this._sandbox = value;
    this.child = value.child;

    return value;
  }

  get governess() {
    return isGoverness(this._governess) ?
      this._governess : (() => isSandbox(this.sandbox) ?
          this.sandbox.governess : null
      )();
  }

  set governess(value) {
    // if governess is null perimeter will use the governess of it's sandbox
    this._governess = (isObject(value) && value instanceof HeadGoverness) ?
      value : (() =>
        isSandbox(this.sandbox) ? this.sandbox.governess : null
      )();

    // Make sure governess know all the rules
    if (
      isObject(this._governess) && this._governess instanceof HeadGoverness
    ) {
      this._governess.learnRules(this, this.govern);
    }

    return value;
  }

  get child() {
    return this._child || null;
  }

  set child(child) {
    this._child = (child || null);
  }
}
