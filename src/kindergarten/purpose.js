import isFunction from 'lodash/isFunction';
import isObject from 'lodash/isObject';
import isString from 'lodash/isString';
import isEmpty from 'lodash/isEmpty';
import each from 'lodash/each';

import Logger from './logger';
import BaseObject from './base-object';
import AllowedMethodsService from './utils/allowed-methods-service';
import Perimeter from './perimeter';
import { isSandbox } from './utils/utils';
import {
  NoExposedMethodError,
  RestrictedMethodError,
  ArgumentError
} from './errors';

export default class Purpose extends BaseObject {
  constructor(name, sandbox) {
    super();

    this._name = name;
    this._sandbox = sandbox;

    if (!isString(this._name)) {
      throw new ArgumentError(
        'Name of the purpose must be a string'
      );
    }

    if (!isSandbox(this._sandbox)) {
      throw new ArgumentError(
        'Purpose requires sandbox to be given.'
      );
    }
  }

  _addPerimeter(perimeter) {
    if (!isObject(perimeter) || !(perimeter instanceof Perimeter)) {
      throw new ArgumentError(
        'Cannot add perimeter. Is it a perimeter?'
      );
    }

    const exposedMethods = perimeter.expose;
    const allowedMethodsService = new AllowedMethodsService(this, false);

    if (isEmpty(exposedMethods)) return;

    each(exposedMethods, (exposedMethod) => {
      if (allowedMethodsService.isRestricted(exposedMethod)) {
        throw new RestrictedMethodError(
          `Method name ${exposedMethods} is restricted.`
        );
      } else if (isFunction(this[exposedMethod])) {
        Logger.warn(`Overriding already sandboxed method ${this._name}.${exposedMethod}.`);
      }

      if (!isFunction(perimeter[exposedMethod])) {
        throw new NoExposedMethodError(
          `The exposed method ${exposedMethod} is not defined on perimeter ${perimeter.purpose}`
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
