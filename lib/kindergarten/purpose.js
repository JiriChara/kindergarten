import { Logger } from './logger';
import { PubSub } from './utils/pub-sub';
import { AllowedMethodsService } from './utils/allowed-methods-service';
import {
  isFunction,
  isObject,
  isString,
  isEmpty,
  isSandbox,
  each
} from './utils/utils';
import { Perimeter } from './perimeter';
import {
  NoExposedMethodError,
  RestrictedMethodError,
  ArgumentError
} from './errors';

export class Purpose extends PubSub {
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
      this[exposedMethod] = (...args) => {
        return perimeter.governed(
          perimeter[exposedMethod],
          args,
          perimeter
        );
      };
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
