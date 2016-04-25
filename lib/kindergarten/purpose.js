'use strict';

exports.__esModule = true;

var _isFunction = require('lodash/isFunction');

var _isFunction2 = _interopRequireDefault(_isFunction);

var _isObject = require('lodash/isObject');

var _isObject2 = _interopRequireDefault(_isObject);

var _isString = require('lodash/isString');

var _isString2 = _interopRequireDefault(_isString);

var _isEmpty = require('lodash/isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _each = require('lodash/each');

var _each2 = _interopRequireDefault(_each);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _baseObject = require('./base-object');

var _baseObject2 = _interopRequireDefault(_baseObject);

var _allowedMethodsService = require('./utils/allowed-methods-service');

var _allowedMethodsService2 = _interopRequireDefault(_allowedMethodsService);

var _perimeter = require('./perimeter');

var _perimeter2 = _interopRequireDefault(_perimeter);

var _utils = require('./utils/utils');

var _errors = require('./errors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Purpose = function (_BaseObject) {
  _inherits(Purpose, _BaseObject);

  function Purpose(name, sandbox) {
    _classCallCheck(this, Purpose);

    var _this = _possibleConstructorReturn(this, _BaseObject.call(this));

    _this._name = name;
    _this._sandbox = sandbox;

    if (!(0, _isString2.default)(_this._name)) {
      throw new _errors.ArgumentError('Name of the purpose must be a string');
    }

    if (!(0, _utils.isSandbox)(_this._sandbox)) {
      throw new _errors.ArgumentError('Purpose requires sandbox to be given.');
    }
    return _this;
  }

  Purpose.prototype._addPerimeter = function _addPerimeter(perimeter) {
    var _this2 = this;

    if (!(0, _isObject2.default)(perimeter) || !(perimeter instanceof _perimeter2.default)) {
      throw new _errors.ArgumentError('Cannot add perimeter. Is it a perimeter?');
    }

    var exposedMethods = perimeter.expose;
    var allowedMethodsService = new _allowedMethodsService2.default(this, false);

    if ((0, _isEmpty2.default)(exposedMethods)) return;

    (0, _each2.default)(exposedMethods, function (exposedMethod) {
      if (allowedMethodsService.isRestricted(exposedMethod)) {
        throw new _errors.RestrictedMethodError('Method name ' + exposedMethods + ' is restricted.');
      } else if ((0, _isFunction2.default)(_this2[exposedMethod])) {
        _logger2.default.warn('Overriding already sandboxed method ' + _this2._name + '.' + exposedMethod + '.');
      }

      if (!(0, _isFunction2.default)(perimeter[exposedMethod])) {
        throw new _errors.NoExposedMethodError('The exposed method ' + exposedMethod + ' is not defined on perimeter ' + perimeter.purpose);
      }

      // Call the method in context of perimeter and governed by a governess
      _this2[exposedMethod] = function () {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return perimeter.governed(perimeter[exposedMethod], args, perimeter);
      };
    });
  };

  Purpose.prototype.isAllowed = function isAllowed() {
    var perimeter = this._sandbox.getPerimeter(this._name);
    return perimeter.isAllowed.apply(perimeter, arguments);
  };

  Purpose.prototype.isNotAllowed = function isNotAllowed() {
    return !this.isAllowed.apply(this, arguments);
  };

  return Purpose;
}(_baseObject2.default);

exports.default = Purpose;