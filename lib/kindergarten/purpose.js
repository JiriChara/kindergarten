import {_} from 'lodash';

import {Logger} from './logger';
import {AllowedMethodsService} from './utils/allowed-methods-service';
import {NoExposedMethodsError, RestrictedMethodError} from './errors';

let allowedMethodsService;

export class Purpose {
  constructor(name, sandbox) {
    this._name = name;
    this._sandbox = sandbox;
  }

  _addPerimeter(perimeter) {
    const exposedMethods = perimeter.expose;

    // TODO: better error message
    if (_.isEmpty(exposedMethods)) throw new NoExposedMethodsError();

    _.each(exposedMethods, (exposedMethod) => {
      if (allowedMethodsService.isRestricted(exposedMethod)) {
        throw new RestrictedMethodError(
          `Method name ${exposedMethods} is restricted.`
        );
      } else if (_.isFunction(this[exposedMethod])) {
        Logger.warn(`Overriding already sandboxed method ${this._name}.${name}.`);
      }

      this[exposedMethod] = _.bind(perimeter[exposedMethod], perimeter);
    });
  }
}

allowedMethodsService = new AllowedMethodsService(
  new Purpose()
);
