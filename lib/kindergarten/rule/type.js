'use strict';

exports.__esModule = true;

var _isArray = require('lodash/isArray');

var _isArray2 = _interopRequireDefault(_isArray);

var _isString = require('lodash/isString');

var _isString2 = _interopRequireDefault(_isString);

var _baseObject = require('../base-object');

var _baseObject2 = _interopRequireDefault(_baseObject);

var _allowedMethodsService = require('../utils/allowed-methods-service');

var _allowedMethodsService2 = _interopRequireDefault(_allowedMethodsService);

var _errors = require('../errors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// The basic RegEx for validating that rule string is correct. The type of the
// rule is later on validated using AllowedMethodsService as well.
var TYPE_REGEX = /^can(not)? ([a-z_$][a-zA-Z0-9_$]*)$/;

var Type = function (_BaseObject) {
  _inherits(Type, _BaseObject);

  function Type(str) {
    _classCallCheck(this, Type);

    var _this = _possibleConstructorReturn(this, _BaseObject.call(this));

    var match = (0, _isString2.default)(str) && str.match(TYPE_REGEX);

    // Extract type of the rule.
    // e.g. "cannot watch" => "watch"
    _this._type = function () {
      return (0, _isArray2.default)(match) ? match[2] : undefined;
    }();

    _this._str = str;

    _this._validate();

    // 'can' rules are positive 'cannot' rules are NOT positive.
    _this._isPositive = !match[1];
    return _this;
  }

  // Throw an error if the type of the rule is not applicable.


  Type.prototype._validate = function _validate() {
    var allowedMethodsService = new _allowedMethodsService2.default();
    var type = this.getType();

    if (!(0, _isString2.default)(type) || allowedMethodsService.isRestricted(type)) {
      throw new _errors.WrongRuleDefinition('Cannot create a rule ' + this._str + '. ' + 'The type of the rule cannot be parsed.');
    }

    return true;
  };

  Type.prototype.isPositive = function isPositive() {
    return !!this._isPositive;
  };

  Type.prototype.getType = function getType() {
    return this._type;
  };

  return Type;
}(_baseObject2.default);

exports.default = Type;