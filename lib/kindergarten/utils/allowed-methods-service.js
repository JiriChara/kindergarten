import isString from 'lodash/isString';
import includes from 'lodash/includes';

const METHOD_REGEX = /^[a-z_$][a-zA-Z0-9_$]*$/;

/**
 * Definition of AllowedMethodsService class.
 *
 * This service is used to determine which methods can be safely used to extend
 * a given object. This is useful for e.g. for sandbox to make sure the name of
 * the purpose of one of the perimeters does not break anything.
 */
export default class AllowedMethodsService {
  constructor(dummyObj = {}, isStrict = true) {
    this.dummyObj = dummyObj || {};
    this.isStrict = isStrict;

    // TODO: add spec
    this._initRestricted = this._restrictedMethods();
  }

  /**
   * Return true if method is not safe to use on the current object
   */
  isRestricted(methodName) {
    return !isString(methodName) ||
      !METHOD_REGEX.test(methodName) ||
      includes((this.isStrict ?
        this._restrictedMethods() :
        this._initRestricted), methodName) ||
      includes(this._customUnsafeList(), methodName) ||
      includes(this._reservedWords(), methodName);
  }

  /**
   * Return list of properties available for the current object
   */
  _restrictedMethods() {
    const restricted = [];

    /* eslint guard-for-in: 0 */
    for (const prop in this.dummyObj) {
      restricted.push(prop);
    }

    return restricted;
  }

  /**
   * Return list of reserved words
   */
  _reservedWords() {
    return [ // reserved words
      'abstract', 'arguments', 'boolean', 'break', 'byte', 'case', 'catch',
      'char', 'class', 'const', 'continue', 'debugger', 'default', 'delete',
      'do', 'double', 'else', 'enum', 'eval', 'export', 'extends', 'false',
      'final', 'finally', 'float', 'for', 'function', 'goto', 'if',
      'implements', 'import', 'in', 'instanceof', 'int', 'interface', 'let',
      'long', 'native', 'new', 'null', 'package', 'private', 'protected',
      'public', 'return', 'short', 'static', 'super*', 'switch',
      'synchronized', 'this', 'throw', 'throws', 'transient', 'true', 'try',
      'typeof', 'var', 'void', 'volatile', 'while', 'with', 'yield'
    ];
  }

  _customUnsafeList() {
    return [ // TODO: add more?
      'constructor', 'property', '__proto__'
    ];
  }
}
