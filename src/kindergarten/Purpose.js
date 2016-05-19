import {
  each,
  isEmpty,
  isFunction,
  isString
} from 'lodash';

import AllowedMethodsService from './utils/AllowedMethodsService';
import BaseObject from './BaseObject';
import Logger from './Logger';
import {
  isPerimeter,
  isSandbox
} from './utils';
import {
  ArgumentError,
  NoExposedMethodError,
  RestrictedMethodError
} from './errors';

/**
 * Definition of Purpose class.
 *
 * Purpose is used as a connection between Sandbox and Perimeter. Whenever
 * a Perimeter is added to a Sandbox new Purpose is created. And all exposed
 * methods from Perimeter and copied to Purpose.
 */
export default class Purpose extends BaseObject {
  constructor(name, sandbox) {
    super();

    this._name = name;
    this._sandbox = sandbox;

    if (!isString(this._name)) {
      throw new ArgumentError(
        'Purpose must have a name.'
      );
    }

    if (!isSandbox(this._sandbox)) {
      throw new ArgumentError(
        'Purpose must have a sandbox.'
      );
    }
  }

  /**
   * Load perimeter & copy all exposed method into the purpose.
   */
  _loadPerimeter(perimeter) {
    if (!isPerimeter(perimeter)) {
      throw new ArgumentError(
        'Cannot load perimeter. Is it an instance of perimeter?'
      );
    }

    const exposedMethods = perimeter.expose;
    const allowedMethodsService = new AllowedMethodsService(this, false);

    if (isEmpty(exposedMethods)) return;

    each(exposedMethods, (exposedMethod) => {
      if (allowedMethodsService.isRestricted(exposedMethod)) {
        throw new RestrictedMethodError(
          `Cannot create a method ${exposedMethods}. It is restricted.`
        );
      }

      if (isFunction(this[exposedMethod])) {
        Logger.warn(`Overriding already sandboxed method ${this._name}.${exposedMethod}.`);
      }

      if (!isFunction(perimeter[exposedMethod])) {
        throw new NoExposedMethodError(
          `The exposed method ${exposedMethod} is not defined on perimeter ${perimeter.purpose}.`
        );
      }

      // Call the method in context of perimeter and governed by a governess
      this[exposedMethod] = (...args) => perimeter.governed(
        perimeter[exposedMethod],
        args,
        perimeter
      );
    });
  }

  isAllowed(...args) {
    const perimeter = this._sandbox.getPerimeter(this._name);
    return perimeter.isAllowed(...args);
  }

  isNotAllowed(...args) {
    return !this.isAllowed(...args);
  }
}
