'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.__esModule = true;

var _isString = require('lodash/isString');

var _isString2 = _interopRequireDefault(_isString);

var _isObject = require('lodash/isObject');

var _isObject2 = _interopRequireDefault(_isObject);

var _isUndefined = require('lodash/isUndefined');

var _isUndefined2 = _interopRequireDefault(_isUndefined);

var _each = require('lodash/each');

var _each2 = _interopRequireDefault(_each);

var _find = require('lodash/find');

var _find2 = _interopRequireDefault(_find);

var _headGoverness = require('./governesses/head-governess');

var _headGoverness2 = _interopRequireDefault(_headGoverness);

var _perimeter = require('./perimeter');

var _perimeter2 = _interopRequireDefault(_perimeter);

var _purpose = require('./purpose');

var _purpose2 = _interopRequireDefault(_purpose);

var _baseObject = require('./base-object');

var _baseObject2 = _interopRequireDefault(_baseObject);

var _allowedMethodsService = require('./utils/allowed-methods-service');

var _allowedMethodsService2 = _interopRequireDefault(_allowedMethodsService);

var _utils = require('./utils/utils');

var _errors = require('./errors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The definition of Sandbox class.
 * The sandbox can load multiple perimeters and define a kind of container,
 * where child can play governed by a governess. Sandbox is always under sharp
 * eye of a governess.
 */

var Sandbox = function (_BaseObject) {
  _inherits(Sandbox, _BaseObject);

  /**
   * Create a new empty sandbox.
   */

  function Sandbox(child) {
    _classCallCheck(this, Sandbox);

    // init publish/subscribe

    var _this = _possibleConstructorReturn(this, _BaseObject.call(this));

    _this.child = child;

    _this.governess = new _headGoverness2.default(child);

    _this._perimeters = [];

    _this.trigger('created', arguments);
    return _this;
  }

  /**
   * The getter of a child.
   * Return null if sandbox does not reference any child.
   */


  /**
   * Make sure governess know all the rules from the loaded perimeters.
   */

  Sandbox.prototype._learnRules = function _learnRules() {
    var _this2 = this;

    (0, _each2.default)(this._perimeters || [], function (perimeter) {
      _this2.governess.learnRules(perimeter);
    });
  };

  /**
   * Load perimeters.
   * Returns the count of addded perimeters.
   */


  Sandbox.prototype.loadPerimeter = function loadPerimeter() {
    var _this3 = this;

    var counter = 0;

    for (var _len = arguments.length, perimeters = Array(_len), _key = 0; _key < _len; _key++) {
      perimeters[_key] = arguments[_key];
    }

    (0, _each2.default)(perimeters, function (perimeter) {
      // Sandbox only accepts perimeters
      if (!(0, _isObject2.default)(perimeter) || !(perimeter instanceof _perimeter2.default)) {
        throw new _errors.ArgumentError('Module must be instance of Kindergarten.Perimeter.');
      }

      // Skip if sandbox already contains the perimeter
      if (_this3.hasPerimeter(perimeter)) return;

      ++counter;

      // If perimeter has a governess, then she has to learn the rules as well
      if ((0, _isObject2.default)(perimeter.governess) && perimeter.governess instanceof _headGoverness2.default) {
        perimeter.governess.learnRules(perimeter, perimeter.govern);
      }

      // The governess of a sandbox must know all the rules
      _this3.governess.learnRules(perimeter, perimeter.govern);

      perimeter.sandbox = _this3;

      _this3._perimeters.push(perimeter);

      _this3._extendPurpose(perimeter);
    });

    return counter;
  };

  /**
   * Alias for loadPerimeter
   */


  Sandbox.prototype.loadModule = function loadModule() {
    return this.loadPerimeter.apply(this, arguments);
  };

  Sandbox.prototype._extendPurpose = function _extendPurpose(perimeter) {
    var name = perimeter.purpose;
    var allowedMethodsService = new _allowedMethodsService2.default(this);

    if (!(0, _isString2.default)(name)) throw new _errors.NoPurposeError();

    if (allowedMethodsService.isRestricted(name)) {
      throw new _errors.RestrictedMethodError();
    }

    this[name] = this[name] || new _purpose2.default(name, this);
    this[name]._addPerimeter(perimeter);
  };

  /**
   * Return true if sandbox already contains a perimeter
   */


  Sandbox.prototype.hasPerimeter = function hasPerimeter(perimeter) {
    return this._perimeters.some(function (p) {
      return p.purpose === perimeter.purpose;
    });
  };

  /**
   * Return perimeter by purpose
   */


  Sandbox.prototype.getPerimeter = function getPerimeter(purpose) {
    var perimeter = (0, _find2.default)(this._perimeters, function (p) {
      return p.purpose === purpose;
    });

    return (0, _isObject2.default)(perimeter) && perimeter instanceof _perimeter2.default ? perimeter : null;
  };

  /**
   * Return true if allowed to do action on target
   */


  Sandbox.prototype.isAllowed = function isAllowed() {
    var _governess;

    return (_governess = this.governess).isAllowed.apply(_governess, arguments);
  };

  /**
   * Return true if not allowed to do action on target
   */


  Sandbox.prototype.isNotAllowed = function isNotAllowed() {
    return !this.isAllowed.apply(this, arguments);
  };

  _createClass(Sandbox, [{
    key: 'child',
    get: function get() {
      var child = this._child;

      return (0, _isUndefined2.default)(child) ? null : child;
    }

    /**
     * The setter of a child.
     * Store null instead of undefined.
     */
    ,
    set: function set(value) {
      this._child = (0, _isUndefined2.default)(value) ? null : value;

      return value;
    }

    /**
     * The getter of a governess.
     * Sandbox MUST always reference a governess. If no governess is set, use
     * HeadGoverness.
     * Make sure new governess learn all the rules.
     */

  }, {
    key: 'governess',
    get: function get() {
      var _this4 = this;

      return (0, _utils.isGoverness)(this._governess) ? this._governess : function () {
        // New governess must know all the rules (if any)
        _this4._learnRules();

        return new _headGoverness2.default(_this4.child);
      }();
    }

    /**
     * The setter of the governess.
     * Make sure new governess learn all the rules.
     */
    ,
    set: function set(value) {
      // if governess is null perimeter will use the governess of it's sandbox
      this._governess = (0, _utils.isGoverness)(value) ? value : new _headGoverness2.default(this.child);

      // New governess must know all the rules (if any)
      this._learnRules();

      return value;
    }
  }]);

  return Sandbox;
}(_baseObject2.default);

exports.default = Sandbox;