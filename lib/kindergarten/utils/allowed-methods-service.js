import {_} from 'lodash';

const METHOD_REGEX = /^[a-z_\$]+[a-zA-Z0-9_\$]*$/;

export class AllowedMethodsService {
  constructor(dummyObj) {
    this.dummyObj = dummyObj || {};
  }

  _restrictedMethods() {
    const restricted = [];

    for (const prop in this.dummyObj) {
      if (this.dummyObj.hasOwnProperty(prop)) {
        restricted.push(prop);
      }
    }

    return restricted;
  }

  isRestricted(methodName) {
    return !_.isString(methodName) ||
      !METHOD_REGEX.test(methodName) ||
      _.contains(this._restrictedMethods(), methodName);
  }
}
