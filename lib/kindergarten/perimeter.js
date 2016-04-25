'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.__esModule = true;

var _isString = require('lodash/isString');

var _isString2 = _interopRequireDefault(_isString);

var _isArray = require('lodash/isArray');

var _isArray2 = _interopRequireDefault(_isArray);

var _isObject = require('lodash/isObject');

var _isObject2 = _interopRequireDefault(_isObject);

var _extend = require('lodash/extend');

var _extend2 = _interopRequireDefault(_extend);

var _baseObject = require('./base-object');

var _baseObject2 = _interopRequireDefault(_baseObject);

var _allowedMethodsService = require('./utils/allowed-methods-service');

var _allowedMethodsService2 = _interopRequireDefault(_allowedMethodsService);

var _utils = require('./utils/utils');

var _headGoverness = require('./governesses/head-governess');

var _headGoverness2 = _interopRequireDefault(_headGoverness);

var _errors = require('./errors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var allowedMethodsService = new _allowedMethodsService2.default({});

/**
 * A Perimeter is used to define the places where child can play.
 */

var Perimeter = function (_BaseObject) {
  _inherits(Perimeter, _BaseObject);

  function Perimeter(purpose) {
    var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    _classCallCheck(this, Perimeter);

    // TODO: added spec for it

    var _this = _possibleConstructorReturn(this, _BaseObject.call(this));

    if ((0, _isObject2.default)(purpose) && (0, _isString2.default)(purpose.purpose)) {
      opts = purpose;
      _this.purpose = purpose.purpose;
    }

    _this.purpose = _this.purpose || purpose;
    _this.govern = opts.govern;
    _this.expose = opts.expose;

    if ((0, _utils.isGoverness)(_this.governess)) {
      _this.governess.learnRules(_this, _this.govern);
    }

    (0, _extend2.default)(_this, opts);
    return _this;
  }

  Perimeter.prototype.guard = function guard() {
    var _governess$guard;

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_governess$guard = this.governess.guard).call.apply(_governess$guard, [this.governess].concat(args));
  };

  Perimeter.prototype.governed = function governed() {
    var _governess$governed;

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return (_governess$governed = this.governess.governed).call.apply(_governess$governed, [this.governess].concat(args));
  };

  Perimeter.prototype.isAllowed = function isAllowed() {
    var _governess$isAllowed;

    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    // TODO: add spec
    return (_governess$isAllowed = this.governess.isAllowed).call.apply(_governess$isAllowed, [this.governess].concat(args));
  };

  Perimeter.prototype.isNotAllowed = function isNotAllowed() {
    var _governess$isNotAllow;

    for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }

    // TODO: add spec
    return (_governess$isNotAllow = this.governess.isNotAllowed).call.apply(_governess$isNotAllow, [this.governess].concat(args));
  };

  _createClass(Perimeter, [{
    key: 'purpose',
    get: function get() {
      return this._purpose;
    },
    set: function set(value) {
      if (!(0, _isString2.default)(value) || allowedMethodsService.isRestricted(value)) {
        throw new _errors.NoPurposeError();
      }

      this._purpose = value;

      return value;
    }
  }, {
    key: 'govern',
    get: function get() {
      return (0, _isObject2.default)(this._govern) ? this._govern : {};
    },
    set: function set(value) {
      this._govern = (0, _isObject2.default)(value) ? value : {};

      return value;
    }
  }, {
    key: 'expose',
    get: function get() {
      return (0, _isArray2.default)(this._expose) ? this._expose : [];
    },
    set: function set(value) {
      this._expose = (0, _isArray2.default)(value) ? value : [];

      return value;
    }
  }, {
    key: 'sandbox',
    get: function get() {
      return (0, _utils.isSandbox)(this._sandbox) ? this._sandbox : null;
    },
    set: function set(value) {
      if (!(0, _utils.isSandbox)(value)) {
        throw new _errors.NoSanboxError();
      }

      this._sandbox = value;
      this.child = value.child;

      return value;
    }
  }, {
    key: 'governess',
    get: function get() {
      var _this2 = this;

      return (0, _utils.isGoverness)(this._governess) ? this._governess : function () {
        return (0, _utils.isSandbox)(_this2.sandbox) ? _this2.sandbox.governess : null;
      }();
    },
    set: function set(value) {
      var _this3 = this;

      // if governess is null perimeter will use the governess of it's sandbox
      this._governess = (0, _isObject2.default)(value) && value instanceof _headGoverness2.default ? value : function () {
        return (0, _utils.isSandbox)(_this3.sandbox) ? _this3.sandbox.governess : null;
      }();

      // Make sure governess know all the rules
      if ((0, _isObject2.default)(this._governess) && this._governess instanceof _headGoverness2.default) {
        this._governess.learnRules(this, this.govern);
      }

      return value;
    }
  }, {
    key: 'child',
    get: function get() {
      return this._child || null;
    },
    set: function set(child) {
      this._child = child || null;
    }
  }]);

  return Perimeter;
}(_baseObject2.default);

exports.default = Perimeter;