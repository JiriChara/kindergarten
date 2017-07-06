import extend from 'lodash/extend';
import isObject from 'lodash/isObject';
import isString from 'lodash/isString';
import omit from 'lodash/omit';
import keys from 'lodash/keys';
import each from 'lodash/each';

import AllowedMethodsService from './utils/AllowedMethodsService';
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
export default class Perimeter {
  /**
   * Create new perimeter
   */
  constructor(purpose, opts = {}) {
    if (isObject(purpose) && isString(purpose.purpose)) {
      opts = purpose;
      this.purpose = purpose.purpose;
    }

    this.purpose = this.purpose || purpose;
    this.govern = this.extractGovern(opts);
    this.expose = opts.expose || [];

    if (!isGoverness(opts.governess)) {
      try {
        const Governess = opts.governess;
        this.governess = new Governess();
      } catch (ignore) {
        // ignore...
      }
    }

    this.governess = this.governess || opts.governess;

    // Perimeter doesn't require governess
    if (isGoverness(this.governess)) {
      this.governess.learnRules(this);
    }

    extend(this, omit(opts, ['purpose', 'govern', 'expose', 'governess']));
  }

  /**
   * The getter of the purpose.
   */
  get purpose() {
    return this._purpose;
  }

  /**
   * The setter of the purpose. Make sure that name of the purpose is not
   * restricted.
   */
  set purpose(value) {
    if (!isString(value) || allowedMethodsService.isRestricted(value)) {
      throw new NoPurposeError();
    }

    this._purpose = value;

    return value;
  }

  /**
   * Returns purpose of the perimeter.
   */
  getPurpose() {
    return this.purpose;
  }

  /**
   * The getter of the sandbox.
   */
  get sandbox() {
    return this._sandbox;
  }

  /**
   * The setter of the sandbox.
   * Make sure that given sandbox is an instance of Sandbox class.
   */
  set sandbox(value) {
    if (!isSandbox(value)) {
      throw new NoSandboxError();
    }

    this._sandbox = value;
    this.child = value.child;

    return value;
  }

  /**
   * Returns sandbox of the perimeter
   */
  getSandbox() {
    return this.sandbox;
  }

  /**
   * The getter of the governess.
   */
  get governess() {
    return this.hasOwnGoverness() ?
      this._governess : (() => (
        isSandbox(this.sandbox) ? this.sandbox.governess : null
      ))();
  }

  /**
   * The setter of the governess.
   */
  set governess(value) {
    // if governess is null perimeter will use the governess of it's sandbox
    this._governess = (isGoverness(value)) ?
      value : (() => (
        isSandbox(this.sandbox) ? this.sandbox.governess : null
    ))();

    // Make sure governess know all the rules
    if (
      isObject(this._governess) && this._governess instanceof HeadGoverness
    ) {
      this._governess.learnRules(this);
    }

    return value;
  }

  /**
   * Return the governess of the perimeter or the governess of it's sandbox
   */
  getGoverness() {
    return this.governess;
  }

  /**
   * Return true if perimeter has it's own governess.
   */
  hasOwnGoverness() {
    return isGoverness(this._governess);
  }

  /**
   * Forward guard call to governess.
   */
  guard(...args) {
    return this.governess.guard.call(this.governess, ...args);
  }

  /**
   * Forward governed call to governess.
   */
  governed(...args) {
    return this.governess.governed.call(this.governess, ...args);
  }

  /**
   * Forward isAllowed call to governess.
   */
  isAllowed(...args) {
    return this.governess.isAllowed.call(this.governess, ...args);
  }

  /**
   * Forward isNotAllowed call to governess.
   */
  isNotAllowed(...args) {
    return this.governess.isNotAllowed.call(this.governess, ...args);
  }

  extractGovern({ govern, can, cannot }) {
    govern = govern || {};

    each(keys(can || {}), (key) => {
      govern[`can ${key}`] = can[key];
    });

    each(keys(cannot || {}), (key) => {
      govern[`cannot ${key}`] = cannot[key];
    });

    return govern;
  }
}
