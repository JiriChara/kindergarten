'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.__esModule = true;

var _isFunction = require('lodash/isFunction');

var _isFunction2 = _interopRequireDefault(_isFunction);

var _isEmpty2 = require('lodash/isEmpty');

var _isEmpty3 = _interopRequireDefault(_isEmpty2);

var _some = require('lodash/some');

var _some2 = _interopRequireDefault(_some);

var _filter = require('lodash/filter');

var _filter2 = _interopRequireDefault(_filter);

var _each = require('lodash/each');

var _each2 = _interopRequireDefault(_each);

var _rule = require('../rule');

var _rule2 = _interopRequireDefault(_rule);

var _baseObject = require('../base-object');

var _baseObject2 = _interopRequireDefault(_baseObject);

var _errors = require('../errors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HeadGoverness = function (_BaseObject) {
  _inherits(HeadGoverness, _BaseObject);

  function HeadGoverness(child) {
    _classCallCheck(this, HeadGoverness);

    var _this = _possibleConstructorReturn(this, _BaseObject.call(this));

    _this.child = child;
    _this.rules = [];
    return _this;
  }

  HeadGoverness.prototype.guard = function guard(action) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var target = args[0];

    if (this.isAllowed.apply(this, [action].concat(args))) {
      return target;
    }

    throw new _errors.AccessDenied(
    // TODO: is there a way to get a type of target?
    'Child is not allowed to ' + action + ' the target.');
  };

  /**
   * Watch over some child action. By default we only execute it, but custom
   * governesses can override it to do some custom stuff like calling `guard()`
   * or something else (see. `StrictGoverness` class).
   */


  HeadGoverness.prototype.governed = function governed(callback) {
    var args = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];
    var callingContext = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

    return callback.apply(callingContext, args);
  };

  HeadGoverness.prototype.isAllowed = function isAllowed(action) {
    var _this2 = this;

    for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }

    if (this.isGuarded()) {
      // Is there any rule explicitly allowing the child to do that?
      var hasAllowRule = (0, _some2.default)(this.getRules(action), function (rule) {
        return _this2.isRule(rule) && rule.type.isPositive && rule.verify.apply(rule, args);
      });

      // Is there any rule strictly disallowing the child to do that?
      var hasStrictDisallowRule = (0, _some2.default)(this.getRules(action), function (rule) {
        return _this2.isRule(rule) && !rule.verify.apply(rule, args) && rule.definition.isStrict;
      });

      if (!hasAllowRule || hasStrictDisallowRule) {
        return false;
      }
    }

    return true;
  };

  HeadGoverness.prototype.isNotAllowed = function isNotAllowed() {
    return !this.isAllowed.apply(this, arguments);
  };

  /**
   * Return true if given rule is an instance of Kindergarten.Rule class
   */

  HeadGoverness.prototype.isRule = function isRule(rule) {
    var res = false;

    try {
      res = rule instanceof _rule2.default;
    } catch (ignore) {
      // ignore
    }

    return res;
  };

  HeadGoverness.prototype.getRules = function getRules(type) {
    // TODO: implement new method on type to compare that
    return (0, _filter2.default)(this.rules, function (rule) {
      return rule.type.getType() === type;
    });
  };

  HeadGoverness.prototype.verify = function verify(action) {
    for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      args[_key3 - 1] = arguments[_key3];
    }

    (0, _each2.default)(this.getRules(action), function (rule) {
      rule.verify.apply(rule, args);
    });

    return true;
  };

  HeadGoverness.prototype.learnRules = function learnRules(perimeter, governObj) {
    var keys = 0;

    for (var key in governObj) {
      if (governObj.hasOwnProperty(key)) {
        keys++;

        var ruleDef = governObj[key];

        ruleDef.ruleContext = ruleDef.ruleContext || perimeter;

        this.addRule(new _rule2.default(key, ruleDef));
      }
    }

    return keys;
  };

  HeadGoverness.prototype.addRule = function addRule() {
    var _this3 = this;

    for (var _len4 = arguments.length, rules = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      rules[_key4] = arguments[_key4];
    }

    (0, _each2.default)(rules, function (rule) {
      if (!_this3.isRule(rule)) {
        throw new _errors.ArgumentError('Governess cannot learn the rule. Does it inherit from Rule class?');
      }

      _this3.rules.push(rule);
    });

    return this.rules.length;
  };

  /**
   * The governess is empty when no rules have been defined
   */


  HeadGoverness.prototype.isEmpty = function isEmpty() {
    return (0, _isEmpty3.default)(this.rules);
  };

  /**
   * Perform some stuff unguarded
   */


  HeadGoverness.prototype.unguarded = function unguarded(callback, context) {
    context = context || null;

    if ((0, _isFunction2.default)(callback)) {
      var before = this.unguarded;

      this.unguarded = true;
      callback.apply(context);
      this.unguarded = before;
    }
  };

  HeadGoverness.prototype.isUnguarded = function isUnguarded() {
    return !!this.unguarded;
  };

  HeadGoverness.prototype.isGuarded = function isGuarded() {
    return !this.isUnguarded();
  };

  _createClass(HeadGoverness, [{
    key: 'unguarded',
    get: function get() {
      return !!this._unguarded;
    },
    set: function set(value) {
      this._unguarded = !!value;

      return value;
    }
  }]);

  return HeadGoverness;
}(_baseObject2.default);

exports.default = HeadGoverness;