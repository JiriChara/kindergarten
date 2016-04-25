'use strict';

exports.__esModule = true;

var _isString = require('lodash/isString');

var _isString2 = _interopRequireDefault(_isString);

var _includes = require('lodash/includes');

var _includes2 = _interopRequireDefault(_includes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var METHOD_REGEX = /^[a-z_$][a-zA-Z0-9_$]*$/;

/**
 * Definition of AllowedMethodsService class.
 *
 * This service is used to determine which methods can be safely used to extend
 * a given object. This is useful for e.g. for sandbox to make sure the name of
 * the purpose of one of the perimeters does not break anything.
 */

var AllowedMethodsService = function () {
  function AllowedMethodsService() {
    var dummyObj = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    var isStrict = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

    _classCallCheck(this, AllowedMethodsService);

    this.dummyObj = dummyObj || {};
    this.isStrict = isStrict;

    // TODO: add spec
    this._initRestricted = this._restrictedMethods();
  }

  /**
   * Return true if method is not safe to use on the current object
   */


  AllowedMethodsService.prototype.isRestricted = function isRestricted(methodName) {
    return !(0, _isString2.default)(methodName) || !METHOD_REGEX.test(methodName) || (0, _includes2.default)(this.isStrict ? this._restrictedMethods() : this._initRestricted, methodName) || (0, _includes2.default)(this._customUnsafeList(), methodName) || (0, _includes2.default)(this._reservedWords(), methodName);
  };

  /**
   * Return list of properties available for the current object
   */


  AllowedMethodsService.prototype._restrictedMethods = function _restrictedMethods() {
    var restricted = [];

    /* eslint guard-for-in: 0 */
    for (var prop in this.dummyObj) {
      restricted.push(prop);
    }

    return restricted;
  };

  /**
   * Return list of reserved words
   */


  AllowedMethodsService.prototype._reservedWords = function _reservedWords() {
    return [// reserved words
    'abstract', 'arguments', 'boolean', 'break', 'byte', 'case', 'catch', 'char', 'class', 'const', 'continue', 'debugger', 'default', 'delete', 'do', 'double', 'else', 'enum', 'eval', 'export', 'extends', 'false', 'final', 'finally', 'float', 'for', 'function', 'goto', 'if', 'implements', 'import', 'in', 'instanceof', 'int', 'interface', 'let', 'long', 'native', 'new', 'null', 'package', 'private', 'protected', 'public', 'return', 'short', 'static', 'super*', 'switch', 'synchronized', 'this', 'throw', 'throws', 'transient', 'true', 'try', 'typeof', 'var', 'void', 'volatile', 'while', 'with', 'yield'];
  };

  AllowedMethodsService.prototype._customUnsafeList = function _customUnsafeList() {
    return [// TODO: add more?
    'constructor', 'property', '__proto__'];
  };

  return AllowedMethodsService;
}();

exports.default = AllowedMethodsService;