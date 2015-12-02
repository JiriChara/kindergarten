(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Kindergarten = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _perimeter = require('./kindergarten/perimeter');

var _sandbox = require('./kindergarten/sandbox');

var _headGoverness = require('./kindergarten/governesses/head-governess');

var _easyGoverness = require('./kindergarten/governesses/easy-governess');

var _strictGoverness = require('./kindergarten/governesses/strict-governess');

var _germanGoverness = require('./kindergarten/governesses/german-governess');

var _rule = require('./kindergarten/rule');

var _purpose = require('./kindergarten/purpose');

var _logger = require('./kindergarten/logger');

var _version = require('./kindergarten/version');

var _errors = require('./kindergarten/errors');

/**
 * The base namespace of the library.
 * It expose all publicly available classes.
 */
var Kindergarten = {
  Perimeter: _perimeter.Perimeter,
  Sandbox: _sandbox.Sandbox,
  HeadGoverness: _headGoverness.HeadGoverness,
  EasyGoverness: _easyGoverness.EasyGoverness,
  StrictGoverness: _strictGoverness.StrictGoverness,
  GermanGoverness: _germanGoverness.GermanGoverness,
  Rule: _rule.Rule,
  Purpose: _purpose.Purpose,
  Logger: _logger.Logger,
  VERSION: _version.VERSION,

  // expose all the possible errors so user can catch them
  AccessDenied: _errors.AccessDenied,
  ArgumentError: _errors.ArgumentError,
  NoExposedMethodError: _errors.NoExposedMethodError,
  NoPurposeError: _errors.NoPurposeError,
  NoSanboxError: _errors.NoSanboxError,
  RestrictedMethodError: _errors.RestrictedMethodError,
  WrongRuleDefinition: _errors.WrongRuleDefinition,

  /**
   * Create and return new sandbox
   */
  sandbox: function sandbox(child) {
    return new Kindergarten.Sandbox(child);
  }
};

module.exports = Kindergarten;

},{"./kindergarten/errors":2,"./kindergarten/governesses/easy-governess":3,"./kindergarten/governesses/german-governess":4,"./kindergarten/governesses/head-governess":5,"./kindergarten/governesses/strict-governess":6,"./kindergarten/logger":7,"./kindergarten/perimeter":8,"./kindergarten/purpose":9,"./kindergarten/rule":10,"./kindergarten/sandbox":11,"./kindergarten/version":15}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AccessDenied = AccessDenied;
exports.ArgumentError = ArgumentError;
exports.NoExposedMethodError = NoExposedMethodError;
exports.NoPurposeError = NoPurposeError;
exports.NoSanboxError = NoSanboxError;
exports.RestrictedMethodError = RestrictedMethodError;
exports.WrongRuleDefinition = WrongRuleDefinition;
// List of possible errors sorted alphabetically

/**
 * AccessDenied Error
 */
function AccessDenied(message) {
  this.name = 'AccessDenied';
  this.message = message;
}
AccessDenied.prototype = new Error();

/**
 * ArgumentError Error
 */
function ArgumentError(message) {
  this.name = 'ArgumentError';
  this.message = message;
}
ArgumentError.prototype = new Error();

/**
 * NoExposedMethod Error
 */
function NoExposedMethodError(message) {
  this.name = 'NoExposedMethodError';
  this.message = message;
}
NoExposedMethodError.prototype = new Error();

/**
 * NoPurposeError Error
 */
function NoPurposeError(message) {
  this.name = 'NoPurposeError';
  this.message = message || 'Perimeter must have a purpose.';
}
NoPurposeError.prototype = new Error();

/**
 * NoSanboxError Error
 */
function NoSanboxError(message) {
  this.name = 'NoSanboxError';
  this.message = message || 'Perimeter must be imported into a sandbox.';
}
NoSanboxError.prototype = new Error();

/**
 * RestrictedMethodError Error
 */
function RestrictedMethodError(message) {
  this.name = 'RestrictedMethodError';
  this.message = message;
}
RestrictedMethodError.prototype = new Error();

/**
 * WrongRuleDefinition Error
 */
function WrongRuleDefinition(message) {
  this.name = 'WrongRuleDefinition';
  this.message = message;
}
WrongRuleDefinition.prototype = new Error();

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EasyGoverness = undefined;

var _headGoverness = require('./head-governess');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Very easy governess who lets everything happen unguarded.
 */

var EasyGoverness = exports.EasyGoverness = (function (_HeadGoverness) {
  _inherits(EasyGoverness, _HeadGoverness);

  function EasyGoverness(child) {
    _classCallCheck(this, EasyGoverness);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(EasyGoverness).call(this, child));

    _this.unguarded = true;
    return _this;
  }

  return EasyGoverness;
})(_headGoverness.HeadGoverness);

},{"./head-governess":5}],4:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GermanGoverness = undefined;

var _perimeter = require('../perimeter');

var _headGoverness = require('./head-governess');

var _utils = require('../utils/utils');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * German governess loves rules as every German. She automatically guards all
 * exposed methods. This means that she calls `guard()` and passes the name of
 * the exposed method as a first argument and arguments passed to exposed
 * method as well.
 *
 * Note: this governess can only be used within the sandbox.
 */

var GermanGoverness = exports.GermanGoverness = (function (_HeadGoverness) {
  _inherits(GermanGoverness, _HeadGoverness);

  function GermanGoverness() {
    var _Object$getPrototypeO;

    _classCallCheck(this, GermanGoverness);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(GermanGoverness)).call.apply(_Object$getPrototypeO, [this].concat(args)));
  }

  _createClass(GermanGoverness, [{
    key: 'governed',
    value: function governed(callback) {
      var args = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];
      var callingContext = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

      var guardArgs = args;

      var exposedMethodName = this._detectNameOfExposedMethod(callingContext, callback);

      guardArgs.unshift(exposedMethodName);

      this.guard.apply(this, guardArgs);

      return _headGoverness.HeadGoverness.prototype.governed.apply(this, arguments);
    }
  }, {
    key: '_detectNameOfExposedMethod',
    value: function _detectNameOfExposedMethod(source, method) {
      if ((0, _utils.isObject)(source) && source instanceof _perimeter.Perimeter) {
        var methodName = undefined;

        (0, _utils.each)(source.expose, function (m) {
          if (source[m] === method) {
            methodName = m;
            return;
          }
        });

        return methodName;
      }

      // TODO: throw a custom error
      throw new Error('German governess can only be used within sandbox.');
    }
  }]);

  return GermanGoverness;
})(_headGoverness.HeadGoverness);

},{"../perimeter":8,"../utils/utils":14,"./head-governess":5}],5:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HeadGoverness = undefined;

var _rule = require('../rule');

var _pubSub = require('../utils/pub-sub');

var _utils = require('../utils/utils');

var _errors = require('../errors');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HeadGoverness = exports.HeadGoverness = (function (_PubSub) {
  _inherits(HeadGoverness, _PubSub);

  function HeadGoverness(child) {
    _classCallCheck(this, HeadGoverness);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(HeadGoverness).call(this));

    _this.child = child;
    _this.rules = [];
    return _this;
  }

  _createClass(HeadGoverness, [{
    key: 'guard',
    value: function guard(action) {
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
    }

    /**
     * Watch over some child action. By default we only execute it, but custom
     * governesses can override it to do some custom stuff like calling `guard()`
     * or something else (see. `StrictGoverness` class).
     */

  }, {
    key: 'governed',
    value: function governed(callback) {
      var args = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];
      var callingContext = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

      return callback.apply(callingContext, args);
    }
  }, {
    key: 'isAllowed',
    value: function isAllowed(action) {
      var _this2 = this;

      for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      if (this.isGuarded()) {
        // Is there any rule explicitly allowing the child to do that?
        var hasAllowRule = (0, _utils.some)(this.getRules(action), function (rule) {
          return _this2.isRule(rule) && rule.isPositive && rule.verify.apply(rule, args);
        });

        // Is there any rule strictly disallowing the child to do that?
        var hasStrictDisallowRule = (0, _utils.some)(this.getRules(action), function (rule) {
          return _this2.isRule(rule) && !rule.verify.apply(rule, args) && rule.isStrict;
        });

        if (!hasAllowRule || hasStrictDisallowRule) {
          return false;
        }
      }

      return true;
    }
  }, {
    key: 'isNotAllowed',
    value: function isNotAllowed() {
      return !this.isAllowed.apply(this, arguments);
    }
  }, {
    key: 'isRule',

    /**
     * Return true if given rule is an instance of Kindergarten.Rule class
     */
    value: function isRule(rule) {
      var res = false;

      try {
        res = rule instanceof _rule.Rule;
      } catch (ignore) {
        // ignore
      }

      return res;
    }
  }, {
    key: 'getRules',
    value: function getRules(type) {
      return (0, _utils.filter)(this.rules, function (rule) {
        return rule.type === type;
      });
    }
  }, {
    key: 'verify',
    value: function verify(action) {
      for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        args[_key3 - 1] = arguments[_key3];
      }

      (0, _utils.each)(this.getRules(action), function (rule) {
        rule.verify.apply(rule, args);
      });

      return true;
    }
  }, {
    key: 'learnRules',
    value: function learnRules(perimeter, governObj) {
      var keys = 0;

      for (var key in governObj) {
        if (governObj.hasOwnProperty(key)) {
          keys++;

          var ruleDef = governObj[key];

          ruleDef.ruleContext = ruleDef.ruleContext || perimeter;

          this.addRule(_rule.Rule.create(key, ruleDef));
        }
      }

      return keys;
    }
  }, {
    key: 'addRule',
    value: function addRule() {
      var _this3 = this;

      for (var _len4 = arguments.length, rules = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        rules[_key4] = arguments[_key4];
      }

      (0, _utils.each)(rules, function (rule) {
        if (!_this3.isRule(rule)) {
          throw new _errors.ArgumentError('Governess cannot learn the rule. Does it inherit from Rule class?');
        }

        _this3.rules.push(rule);
      });

      return this.rules.length;
    }

    /**
     * The governess is empty when no rules have been defined
     */

  }, {
    key: 'isEmpty',
    value: function isEmpty() {
      return (0, _utils.isEmpty)(this.rules);
    }

    /**
     * Perform some stuff unguarded
     */

  }, {
    key: 'unguarded',
    value: function unguarded(callback, context) {
      context = context || null;

      if ((0, _utils.isFunction)(callback)) {
        var before = this.unguarded;

        this.unguarded = true;
        callback.apply(context);
        this.unguarded = before;
      }
    }
  }, {
    key: 'isUnguarded',
    value: function isUnguarded() {
      return !!this.unguarded;
    }
  }, {
    key: 'isGuarded',
    value: function isGuarded() {
      return !this.isUnguarded();
    }
  }, {
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
})(_pubSub.PubSub);

},{"../errors":2,"../rule":10,"../utils/pub-sub":13,"../utils/utils":14}],6:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StrictGoverness = undefined;

var _headGoverness = require('./head-governess');

var _errors = require('../errors');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A very strict governess! She forces all exposed methods from the sandbox or
 * perimeter to be governed. This means that all exposed methods must call
 * `guard()` method.
 *
 * Use this governess if you, or you colleagues forget to call `guard()` method
 * in you exposed methods.
 *
 * Note: Strict Governess does not prevent the exposed method to be executed!
 * Actually it executes that method and throw an error if that method did not
 * called the `guard()`
 */

var StrictGoverness = exports.StrictGoverness = (function (_HeadGoverness) {
  _inherits(StrictGoverness, _HeadGoverness);

  function StrictGoverness(child) {
    _classCallCheck(this, StrictGoverness);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(StrictGoverness).call(this, child));

    _this._guardCount = 0;
    _this._governedCount = 0;
    return _this;
  }

  _createClass(StrictGoverness, [{
    key: 'governed',
    value: function governed() {
      var returnVal = _headGoverness.HeadGoverness.prototype.governed.apply(this, arguments);

      if (++this._governedCount > this._guardCount && !this.unguarded) {
        throw new _errors.AccessDenied('All exposed methods must call guard method.');
      }

      // TODO: test for return value
      return returnVal;
    }
  }, {
    key: 'guard',
    value: function guard() {
      ++this._guardCount;

      // TODO: test for return value
      return _headGoverness.HeadGoverness.prototype.guard.apply(this, arguments);
    }
  }]);

  return StrictGoverness;
})(_headGoverness.HeadGoverness);

},{"../errors":2,"./head-governess":5}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Logger = undefined;

var _utils = require('./utils/utils');

var Logger = exports.Logger = {
  _log: function _log(msg) {
    if (console && (0, _utils.isFunction)(console.log)) {
      /* eslint no-console: 0 */
      console.log(msg);
    }
  },
  log: function log(msg) {
    Logger._log(msg);
  },
  warn: function warn(msg) {
    Logger._log('WARN ' + msg);
  }
};

},{"./utils/utils":14}],8:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Perimeter = undefined;

var _sandbox = require('./sandbox');

var _pubSub = require('./utils/pub-sub');

var _allowedMethodsService = require('./utils/allowed-methods-service');

var _utils = require('./utils/utils');

var _headGoverness = require('./governesses/head-governess');

var _errors = require('./errors');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var allowedMethodsService = new _allowedMethodsService.AllowedMethodsService({});

/**
 * A Perimeter is used to define the places where child can play.
 */

var Perimeter = exports.Perimeter = (function (_PubSub) {
  _inherits(Perimeter, _PubSub);

  function Perimeter(purpose) {
    var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    _classCallCheck(this, Perimeter);

    // TODO: added spec for it

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Perimeter).call(this));

    if ((0, _utils.isObject)(purpose) && (0, _utils.isString)(purpose.purpose)) {
      opts = purpose;
      _this.purpose = purpose.purpose;
    }

    _this.purpose = _this.purpose || purpose;
    _this.govern = opts.govern;
    _this.expose = opts.expose;

    if ((0, _utils.isGoverness)(_this.governess)) {
      _this.governess.learnRules(_this, _this.govern);
    }

    (0, _utils.extend)(_this, opts);
    return _this;
  }

  _createClass(Perimeter, [{
    key: 'guard',
    value: function guard() {
      var _governess$guard;

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return (_governess$guard = this.governess.guard).call.apply(_governess$guard, [this.governess].concat(args));
    }
  }, {
    key: 'governed',
    value: function governed() {
      var _governess$governed;

      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return (_governess$governed = this.governess.governed).call.apply(_governess$governed, [this.governess].concat(args));
    }
  }, {
    key: 'isAllowed',
    value: function isAllowed() {
      var _governess$isAllowed;

      for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      // TODO: add spec
      return (_governess$isAllowed = this.governess.isAllowed).call.apply(_governess$isAllowed, [this.governess].concat(args));
    }
  }, {
    key: 'isNotAllowed',
    value: function isNotAllowed() {
      var _governess$isNotAllow;

      for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      // TODO: add spec
      return (_governess$isNotAllow = this.governess.isNotAllowed).call.apply(_governess$isNotAllow, [this.governess].concat(args));
    }
  }, {
    key: 'purpose',
    get: function get() {
      return this._purpose;
    },
    set: function set(value) {
      if (!(0, _utils.isString)(value) || allowedMethodsService.isRestricted(value)) {
        throw new _errors.NoPurposeError();
      }

      this._purpose = value;

      return value;
    }
  }, {
    key: 'govern',
    get: function get() {
      return (0, _utils.isObject)(this._govern) ? this._govern : {};
    },
    set: function set(value) {
      this._govern = (0, _utils.isObject)(value) ? value : {};

      return value;
    }
  }, {
    key: 'expose',
    get: function get() {
      return (0, _utils.isArray)(this._expose) ? this._expose : [];
    },
    set: function set(value) {
      this._expose = (0, _utils.isArray)(value) ? value : [];

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

      return (0, _utils.isGoverness)(this._governess) ? this._governess : (function () {
        return (0, _utils.isSandbox)(_this2.sandbox) ? _this2.sandbox.governess : null;
      })();
    },
    set: function set(value) {
      var _this3 = this;

      // if governess is null perimeter will use the governess of it's sandbox
      debugger;
      this._governess = (0, _utils.isObject)(value) && value instanceof _headGoverness.HeadGoverness ? value : (function () {
        return (0, _utils.isObject)(_this3.sandbox) && _this3.sandbox instanceof _sandbox.Sandbox ? _this3.sandbox.governess : null;
      })();

      // Make sure governess know all the rules
      if ((0, _utils.isObject)(this._governess) && this._governess instanceof _headGoverness.HeadGoverness) {
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
})(_pubSub.PubSub);

},{"./errors":2,"./governesses/head-governess":5,"./sandbox":11,"./utils/allowed-methods-service":12,"./utils/pub-sub":13,"./utils/utils":14}],9:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Purpose = undefined;

var _logger = require('./logger');

var _pubSub = require('./utils/pub-sub');

var _allowedMethodsService = require('./utils/allowed-methods-service');

var _utils = require('./utils/utils');

var _perimeter = require('./perimeter');

var _errors = require('./errors');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Purpose = exports.Purpose = (function (_PubSub) {
  _inherits(Purpose, _PubSub);

  function Purpose(name, sandbox) {
    _classCallCheck(this, Purpose);

    // TODO: verify name
    // TODO: verify sandbox

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Purpose).call(this));

    _this._name = name;
    _this._sandbox = sandbox;
    return _this;
  }

  _createClass(Purpose, [{
    key: '_addPerimeter',
    value: function _addPerimeter(perimeter) {
      var _this2 = this;

      if (!(0, _utils.isObject)(perimeter) || !(perimeter instanceof _perimeter.Perimeter)) {
        throw new _errors.ArgumentError('Cannot add perimeter. Is it a perimeter?');
      }

      var exposedMethods = perimeter.expose;
      var allowedMethodsService = new _allowedMethodsService.AllowedMethodsService(this, false);

      if ((0, _utils.isEmpty)(exposedMethods)) return;

      (0, _utils.each)(exposedMethods, function (exposedMethod) {
        if (allowedMethodsService.isRestricted(exposedMethod)) {
          throw new _errors.RestrictedMethodError('Method name ' + exposedMethods + ' is restricted.');
        } else if ((0, _utils.isFunction)(_this2[exposedMethod])) {
          _logger.Logger.warn('Overriding already sandboxed method ' + _this2._name + '.' + exposedMethod + '.');
        }

        if (!(0, _utils.isFunction)(perimeter[exposedMethod])) {
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
    }
  }, {
    key: 'isAllowed',
    value: function isAllowed() {
      var perimeter = this._sandbox.getPerimeter(this._name);
      return perimeter.isAllowed.apply(perimeter, arguments);
    }
  }, {
    key: 'isNotAllowed',
    value: function isNotAllowed() {
      return !this.isAllowed.apply(this, arguments);
    }
  }]);

  return Purpose;
})(_pubSub.PubSub);

},{"./errors":2,"./logger":7,"./perimeter":8,"./utils/allowed-methods-service":12,"./utils/pub-sub":13,"./utils/utils":14}],10:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Rule = undefined;

var _pubSub = require('./utils/pub-sub');

var _allowedMethodsService = require('./utils/allowed-methods-service');

var _utils = require('./utils/utils');

var _errors = require('./errors');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// The basic RegEx for validating that rule string is correct. The type of the
// rule is later on validated using AllowedMethodsService as well.
var RULE_REGEX = /^can(not)? (\w+)$/;

/**
 * The definition of Rule class.
 *
 * Rules are used by a governess. Governess can learn many rules and they are
 * defined in perimeter in most of the cases.
 *
 * The easiest way to create a new rule is to use the create class method of
 * Rule class. A simple definition of a rule might look like this:
 *
 * Rule.create('can view', {
 *   items: [Article]
 * });
 *
 * Note: Rules are used internally by a governess, it's not meant to use them
 * as a standalone object. It's faster to define multiple rules using
 * perimeter.
 */

var Rule = exports.Rule = (function (_PubSub) {
  _inherits(Rule, _PubSub);

  _createClass(Rule, null, [{
    key: 'create',
    value: function create(str, def) {
      var match = (0, _utils.isString)(str) && str.match(RULE_REGEX);

      // Extract type of the rule.
      // e.g. "cannot watch" => "watch"
      var type = (function () {
        return (0, _utils.isArray)(match) ? match[2] : undefined;
      })();

      // Rule must have a type.
      if ((0, _utils.isUndefined)(type)) {
        throw new _errors.WrongRuleDefinition('Cannot parse following rule definition "' + str + '".');
      }

      def = def || {};

      // 'can' rules are positive 'cannot' rules are NOT positive.
      var isPositive = !match[1];
      var items = def.items || [];
      // Custom rule definition
      var rule = def.rule;

      if ((0, _utils.isEmpty)(items) && !(0, _utils.isFunction)(rule)) {
        throw new _errors.WrongRuleDefinition('Cannot create a new rule "' + str + '". No items or rule given.');
      }

      if (!(0, _utils.isEmpty)(items) && (0, _utils.isFunction)(rule)) {
        throw new _errors.WrongRuleDefinition('Cannot create a new rule "' + str + '". Both the items and rule given.');
      }

      // Return newly constructed rule.
      return new Rule(type, items, this._createVerifyObj(rule, isPositive, def.ruleContext));
    }
  }, {
    key: '_createVerifyObj',
    value: function _createVerifyObj(_rule, isPositive) {
      var ruleContext = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

      // The custom rules are always strict
      if ((0, _utils.isFunction)(_rule)) {
        return {
          isPositive: isPositive,
          isStrict: true,
          isCustom: true,
          rule: function rule() {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }

            var res = _rule.apply(ruleContext, args);
            return isPositive ? res : !res;
          }
        };
      }

      return {
        isPositive: isPositive,
        isStrict: !isPositive,
        isCustom: false,
        rule: function rule() {
          // verify methods of non-custom rules return always true
          return true;
        }
      };
    }
  }]);

  function Rule(type, items, verifyObj) {
    _classCallCheck(this, Rule);

    // The type of the rule.
    // e.g. "cannot watch" => "watch"

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Rule).call(this));

    _this.type = type;
    _this.items = items;
    _this.verifyMethod = verifyObj.rule;
    _this.isPositive = verifyObj.isPositive;
    _this.isStrict = verifyObj.isStrict;
    _this.isCustom = verifyObj.isCustom;

    var errorSufix = 'Use create() to create new rule.';

    var allowedMethodsService = new _allowedMethodsService.AllowedMethodsService();
    if (!(0, _utils.isString)(_this.type) || allowedMethodsService.isRestricted(_this.type)) {
      throw new _errors.WrongRuleDefinition(_this.type + ' can\'t be used as a type of the rule. ' + errorSufix);
    }

    var validation = [[!(0, _utils.isArray)(_this.items), 'items must be an array.'], [!(0, _utils.isFunction)(_this.verifyMethod), 'verifyMethod must be a function.'], [!(0, _utils.isBoolean)(_this.isPositive), 'isPositive must be a boolean.'], [!(0, _utils.isBoolean)(_this.isStrict), 'isStrict must be a boolean.'], [!(0, _utils.isBoolean)(_this.isCustom), 'isCustom must be a boolean.'], [_this.isCustom && !_this.isStrict, 'Rule can\'t be custom and not strict.'], [!_this.isPositive && !_this.isStrict, 'Rule can\'t be negative and not strict.']];

    (0, _utils.each)(validation, function (val) {
      if (val[0]) {
        throw new _errors.WrongRuleDefinition(val[1] + ' ' + errorSufix);
      }
    });
    return _this;
  }

  _createClass(Rule, [{
    key: 'verify',
    value: function verify() {
      var isAllowed = false;
      var subject = arguments.length <= 0 ? undefined : arguments[0];

      if (!(0, _utils.isEmpty)(this.items)) {
        isAllowed = (0, _utils.some)(this.items, function (item) {
          var isInstance = false;

          try {
            isInstance = subject instanceof item;
          } catch (ignore) {
            // Ignore if instanceof is not applicable
          }

          return isInstance || item === subject;
        });
      }

      isAllowed = this.isPositive ? isAllowed : !isAllowed;

      return this.isCustom ? this.verifyMethod.apply(this, arguments) : isAllowed;
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        type: this.type,
        isPositive: this.isPositive,
        isStrict: this.isStrict,
        isCustom: this.isCustom
      };
    }
  }]);

  return Rule;
})(_pubSub.PubSub);

},{"./errors":2,"./utils/allowed-methods-service":12,"./utils/pub-sub":13,"./utils/utils":14}],11:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Sandbox = undefined;

var _headGoverness = require('./governesses/head-governess');

var _perimeter = require('./perimeter');

var _purpose = require('./purpose');

var _pubSub = require('./utils/pub-sub');

var _allowedMethodsService = require('./utils/allowed-methods-service');

var _utils = require('./utils/utils');

var _errors = require('./errors');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The definition of Sandbox class.
 * The sandbox can load multiple perimeters and define a kind of container,
 * where child can play governed by a governess. Sandbox is always under sharp
 * eye of a governess.
 */

var Sandbox = exports.Sandbox = (function (_PubSub) {
  _inherits(Sandbox, _PubSub);

  /**
   * Create a new empty sandbox.
   */

  function Sandbox(child) {
    _classCallCheck(this, Sandbox);

    // init publish/subscribe

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Sandbox).call(this));

    _this.child = child;

    _this.governess = new _headGoverness.HeadGoverness(child);

    _this._perimeters = [];

    _this.trigger('created', arguments);
    return _this;
  }

  /**
   * The getter of a child.
   * Return null if sandbox does not reference any child.
   */

  _createClass(Sandbox, [{
    key: '_learnRules',

    /**
     * Make sure governess know all the rules from the loaded perimeters.
     */
    value: function _learnRules() {
      var _this2 = this;

      (0, _utils.each)(this._perimeters || [], function (perimeter) {
        _this2.governess.learnRules(perimeter);
      });
    }

    /**
     * Load perimeters.
     * Returns the count of addded perimeters.
     */

  }, {
    key: 'loadPerimeter',
    value: function loadPerimeter() {
      var _this3 = this;

      var counter = 0;

      for (var _len = arguments.length, perimeters = Array(_len), _key = 0; _key < _len; _key++) {
        perimeters[_key] = arguments[_key];
      }

      (0, _utils.each)(perimeters, function (perimeter) {
        // Sandbox only accepts perimeters
        if (!(0, _utils.isObject)(perimeter) || !(perimeter instanceof _perimeter.Perimeter)) {
          throw new _errors.ArgumentError('Module must be instance of Kindergarten.Perimeter.');
        }

        // Skip if sandbox already contains the perimeter
        if (_this3.hasPerimeter(perimeter)) return;

        ++counter;

        // If perimeter has a governess, then she has to learn the rules as well
        if ((0, _utils.isObject)(perimeter.governess) && perimeter.governess instanceof _headGoverness.HeadGoverness) {
          perimeter.governess.learnRules(perimeter, perimeter.govern);
        }

        // The governess of a sandbox must know all the rules
        _this3.governess.learnRules(perimeter, perimeter.govern);

        perimeter.sandbox = _this3;

        _this3._perimeters.push(perimeter);

        _this3._extendPurpose(perimeter);
      });

      return counter;
    }

    /**
     * Alias for loadPerimeter
     */

  }, {
    key: 'loadModule',
    value: function loadModule() {
      return this.loadPerimeter.apply(this, arguments);
    }
  }, {
    key: '_extendPurpose',
    value: function _extendPurpose(perimeter) {
      var name = perimeter.purpose;
      var allowedMethodsService = new _allowedMethodsService.AllowedMethodsService(this);

      if (!(0, _utils.isString)(name)) throw new _errors.NoPurposeError();

      if (allowedMethodsService.isRestricted(name)) {
        throw new _errors.RestrictedMethodError();
      }

      this[name] = this[name] || new _purpose.Purpose(name, this);
      this[name]._addPerimeter(perimeter);
    }

    /**
     * Return true if sandbox already contains a perimeter
     */

  }, {
    key: 'hasPerimeter',
    value: function hasPerimeter(perimeter) {
      return this._perimeters.some(function (p) {
        return p.purpose === perimeter.purpose;
      });
    }

    /**
     * Return perimeter by purpose
     */

  }, {
    key: 'getPerimeter',
    value: function getPerimeter(purpose) {
      var perimeter = (0, _utils.find)(this._perimeters, function (p) {
        return p.purpose === purpose;
      });

      return (0, _utils.isObject)(perimeter) && perimeter instanceof _perimeter.Perimeter ? perimeter : null;
    }

    /**
     * Return true if allowed to do action on target
     */

  }, {
    key: 'isAllowed',
    value: function isAllowed() {
      var _governess;

      return (_governess = this.governess).isAllowed.apply(_governess, arguments);
    }

    /**
     * Return true if not allowed to do action on target
     */

  }, {
    key: 'isNotAllowed',
    value: function isNotAllowed() {
      return !this.isAllowed.apply(this, arguments);
    }
  }, {
    key: 'child',
    get: function get() {
      var child = this._child;

      return (0, _utils.isUndefined)(child) ? null : child;
    }

    /**
     * The setter of a child.
     * Store null instead of undefined.
     */
    ,
    set: function set(value) {
      this._child = (0, _utils.isUndefined)(value) ? null : value;

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

      return (0, _utils.isGoverness)(this._governess) ? this._governess : (function () {
        // New governess must know all the rules (if any)
        _this4._learnRules();

        return new _headGoverness.HeadGoverness(_this4.child);
      })();
    }

    /**
     * The setter of the governess.
     * Make sure new governess learn all the rules.
     */
    ,
    set: function set(value) {
      // if governess is null perimeter will use the governess of it's sandbox
      this._governess = (0, _utils.isGoverness)(value) ? value : new _headGoverness.HeadGoverness(this.child);

      // New governess must know all the rules (if any)
      this._learnRules();

      return value;
    }
  }]);

  return Sandbox;
})(_pubSub.PubSub);

},{"./errors":2,"./governesses/head-governess":5,"./perimeter":8,"./purpose":9,"./utils/allowed-methods-service":12,"./utils/pub-sub":13,"./utils/utils":14}],12:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AllowedMethodsService = undefined;

var _utils = require('./utils');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var METHOD_REGEX = /^[a-z_\$]+[a-zA-Z0-9_\$]*$/;

/**
 * Definition of AllowedMethodsService class.
 *
 * This service is used to determine which methods can be safely used to extend
 * a given object. This is useful for e.g. for sandbox to make sure the name of
 * the purpose of one of the perimeters does not break anything.
 */

var AllowedMethodsService = exports.AllowedMethodsService = (function () {
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

  _createClass(AllowedMethodsService, [{
    key: 'isRestricted',
    value: function isRestricted(methodName) {
      return !(0, _utils.isString)(methodName) || !METHOD_REGEX.test(methodName) || (0, _utils.contains)(this.isStrict ? this._restrictedMethods() : this._initRestricted, methodName) || (0, _utils.contains)(this._customUnsafeList(), methodName) || (0, _utils.contains)(this._reservedWords(), methodName);
    }

    /**
     * Return list of properties available for the current object
     */

  }, {
    key: '_restrictedMethods',
    value: function _restrictedMethods() {
      var restricted = [];

      /* eslint guard-for-in: 0 */
      for (var prop in this.dummyObj) {
        restricted.push(prop);
      }

      return restricted;
    }

    /**
     * Return list of reserved words
     */

  }, {
    key: '_reservedWords',
    value: function _reservedWords() {
      return [// reserved words
      'abstract', 'arguments', 'boolean', 'break', 'byte', 'case', 'catch', 'char', 'class', 'const', 'continue', 'debugger', 'default', 'delete', 'do', 'double', 'else', 'enum', 'eval', 'export', 'extends', 'false', 'final', 'finally', 'float', 'for', 'function', 'goto', 'if', 'implements', 'import', 'in', 'instanceof', 'int', 'interface', 'let', 'long', 'native', 'new', 'null', 'package', 'private', 'protected', 'public', 'return', 'short', 'static', 'super*', 'switch', 'synchronized', 'this', 'throw', 'throws', 'transient', 'true', 'try', 'typeof', 'var', 'void', 'volatile', 'while', 'with', 'yield'];
    }
  }, {
    key: '_customUnsafeList',
    value: function _customUnsafeList() {
      return [// TODO: add more?
      'constructor', 'property', '__proto__'];
    }
  }]);

  return AllowedMethodsService;
})();

},{"./utils":14}],13:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PubSub = undefined;

var _hookies = require('hookies');

var _hookies2 = _interopRequireDefault(_hookies);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Override trigger method from hookies to be synchronous by default
 */

var PubSub = exports.PubSub = (function (_Hookies$Hooks) {
  _inherits(PubSub, _Hookies$Hooks);

  function PubSub() {
    var _Object$getPrototypeO;

    _classCallCheck(this, PubSub);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(PubSub)).call.apply(_Object$getPrototypeO, [this].concat(args)));
  }

  /**
   * Trigger all events synchronously by default
   */

  _createClass(PubSub, [{
    key: 'trigger',
    value: function trigger(name) {
      var _Hookies$Hooks$protot;

      for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      (_Hookies$Hooks$protot = _hookies2.default.Hooks.prototype.trigger).call.apply(_Hookies$Hooks$protot, [this, {
        name: name,
        sync: true,
        context: this
      }].concat(args));
    }

    /**
     * Trigger asynchronously
     */

  }, {
    key: 'triggerAsyc',
    value: function triggerAsyc() {
      _hookies2.default.Hooks.prototype.trigger.apply(this, arguments);
    }
  }]);

  return PubSub;
})(_hookies2.default.Hooks);

},{"hookies":16}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extend = exports.keys = exports.bind = exports.has = exports.contains = exports.isEmpty = exports.filter = exports.some = exports.find = exports.each = exports.isSandbox = exports.isGoverness = exports.isBoolean = exports.isObject = exports.isArray = exports.isUndefined = exports.isFunction = exports.isString = undefined;

var _sandbox = require('../sandbox');

var _headGoverness = require('../governesses/head-governess');

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

var isString = exports.isString = function isString(obj) {
  return Object.prototype.toString.call(obj) === '[object String]';
};

var isFunction = exports.isFunction = function isFunction(obj) {
  return Object.prototype.toString.call(obj) === '[object Function]';
};

var isUndefined = exports.isUndefined = function isUndefined(obj) {
  return obj === undefined;
};

var isArray = exports.isArray = Array.isArray || function (obj) {
  return Object.prototype.toString.call(obj) === '[object Array]';
};

var isObject = exports.isObject = function isObject(obj) {
  var type = typeof obj === 'undefined' ? 'undefined' : _typeof(obj);
  return type === 'function' || type === 'object' && !!obj;
};

var isBoolean = exports.isBoolean = function isBoolean(obj) {
  return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
};

var isGoverness = exports.isGoverness = function isGoverness(obj) {
  return isObject(obj) && obj instanceof _headGoverness.HeadGoverness;
};

var isSandbox = exports.isSandbox = function isSandbox(obj) {
  return isObject(obj) && obj instanceof _sandbox.Sandbox;
};

var each = exports.each = function each(arr, cb) {
  for (var i = 0, len = arr.length; i < len; i++) {
    cb(arr[i]);
  }
};

var find = exports.find = function find(arr, cb) {
  var returnVal = undefined;

  each(arr, function (item) {
    if (cb(item)) {
      returnVal = item;
      return;
    }
  });

  return returnVal;
};

var some = exports.some = function some(arr, predicate) {
  for (var i = 0, len = arr.length; i < len; i++) {
    if (predicate(arr[i])) {
      return true;
    }
  }

  return false;
};

var filter = exports.filter = function filter(arr, predicate) {
  var results = [];

  for (var i = 0, len = arr.length; i < len; i++) {
    var item = arr[i];

    if (predicate(item)) {
      results.push(item);
    }
  }

  return results;
};

var isEmpty = exports.isEmpty = function isEmpty(obj) {
  if (isArray(obj)) {
    return obj.length > 0 ? false : true;
  }

  return true;
};

var contains = exports.contains = function contains(arr, item) {
  return arr.indexOf(item) >= 0;
};

var has = exports.has = function has(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
};

var bind = exports.bind = function bind(func, context) {
  if (!isFunction(func)) {
    throw new TypeError('Cannot bind non-callable function.');
  }

  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return func.apply(context, args);
  };
};

var keys = exports.keys = function keys(obj) {
  var nativeKeys = Object.keys;
  if (!isObject(obj)) return [];
  if (nativeKeys) return nativeKeys(obj);
  var keyArr = [];
  // FIXME: this will not work in IE < 8
  for (var key in obj) {
    if (has(obj, key)) keyArr.push(key);
  }return keys;
};

var extend = exports.extend = function extend(dest, source) {
  var keyArr = keys(source);
  for (var i = 0, length = keyArr.length; i < length; i++) {
    var key = keyArr[i];
    var prop = source[key];

    if (has(source, key)) {
      dest[key] = isFunction(prop) ? bind(prop, dest) : prop;
    }
  }
};

},{"../governesses/head-governess":5,"../sandbox":11}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var VERSION = exports.VERSION = '0.1.0';

},{}],16:[function(require,module,exports){
//  Hookies.JS v1.0.7
//  Jiri Chara <me@jirichara.com>
//  Copyright (c) 2014 Jiri Chara. All Rights Reserved.
//  The MIT License (MIT) - See file 'LICENSE' in this project

(function (root, factory) {
    "use strict";
    // Set up Hookies appropriately for the environment.

    // AMD
    if (typeof define === 'function' && define.amd) {
        define(['exports'], function(exports) {
            root.Hookies = factory(root, exports);
        });
    } else if (typeof exports !== 'undefined') {
        factory(root, exports);
    // Regular browser
    } else {
        root.Hookies = factory(root, {});
    }
} (this, function(root, Hookies) {
    "use strict";

    // Save the previous value of the `Hookies` variable, so that it can be
    // restored later on, if `noConflict` is used.
    var previousHookies = root.Hookies;

    // Current version of the library.
    Hookies.VERSION = '1.0.7';

    // Runs Hookies.js in *noConflict* mode, returning the `Hookies` variable
    // to its previous owner. Returns a reference to this Hookies object.
    Hookies.noConflict = function () {
        root.Hookies = previousHookies;
        return this;
    };

    // Helper functions
    // ----------------

    // Is given variable an array?
    var isArray = Array.isArray || function (obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    };

    // Is given variable an string?
    var isString = function (obj) {
        return Object.prototype.toString.call(obj) === '[object String]';
    };

    // Is given variable an function?
    var isFunction = function (obj) {
        return Object.prototype.toString.call(obj) === '[object Function]';
    };

    // Optimize `isFunction` if appropriate. Work around an IE 11 bug.
    if (typeof /./ !== 'function') {
        isFunction = function (obj) {
            return typeof obj === 'function' || false;
        };
    }

    // Is a given variable an object?
    var isObject = function (obj) {
        var type = typeof obj;
        return type === 'function' || type === 'object' && !!obj;
    };

    // Exec given callback
    var exec = function (callback, context, sync, customAsyncMethod, args) {
        if (isFunction(callback)) {
            var deliver = function () {
                callback.apply(context, args);
            };

            if (sync === true) {
                deliver();
            } else {
                (customAsyncMethod || setTimeout)(deliver, 0);
            }
        }
    };

    // Add hooks to the given object
    Hookies.mixin = function (base, options) {
        if (!isObject(base)) {
            throw new Error('Base object must be an object. Got: ' + base);
        }

        base.hookies = new Hookies.Hooks(base, options);

        return this;
    };

    // Hookies.Hooks class definition
    // -----------------------------

    // Definition of a Hookies.Hooks class
    Hookies.Hooks = function (base, options) {
        options = options || {};

        // Variable for hooks storage
        this.hooks = {};

        // Base object to add hooks to
        this.hookiesBase = base || {};

        // Custom async method (useful if you wanna use Angular $timeout)
        this.customAsyncMethod = options.customAsyncMethod || null;
    };

    var validateEvent = function (event) {
        if (!isString(event)) {
            throw new Error('Event name must be a string. Got: ' + event + '.');
        }
    };

    // Subscribe to an event
    Hookies.Hooks.prototype.on = function (event) {
        var args = Array.prototype.slice.call(arguments, 0),
            cb,
            base;

        args.shift(); // get rid of event

        validateEvent(event);

        if (args.length === 0 || args.length > 2) {
            throw new Error('Wrong number of arguments.');
        }

        if (args.length === 2) {
            if (!isObject(args[0])) {
                throw new Error('Second argument must be an object.');
            }

            base = args[0];

            args.shift();
        }

        if (!isFunction(args[0])) {
            throw new Error((base ? 'Third' : 'Second') + ' argument must be a function.');
        }

        cb = {
            context: base || null,
            fn: args[0]
        };

        if (!isArray(this.hooks[event])) {
            this.hooks[event] = [];
        }

        this.hooks[event].push(cb);
    };

    // Trigger an event
    // First argument must be an event object or string
    // Rest of the arguments will be passed to callback function
    Hookies.Hooks.prototype.trigger = function (event) {
        // Convert arguments to an array
        var args = Array.prototype.slice.call(arguments, 0),
            base,
            i,
            cb,
            self = this,
            sync,
            events,
            eventsLength;

        if (isObject(event)) {
            if (isString(event.name)) {
                base = event.context;
                sync = event.sync;
                event = event.name;
            } else {
                throw new Error('Event object must contain name.');
            }
        }

        args.shift(); // get rid of event

        validateEvent(event);

        for (
            i = 0,
            events = (this.hooks[event] || []),
            eventsLength = events.length;
            i < eventsLength;
            i++
        ) {
            cb = events[i];

            if (isObject(cb)) {
                exec.call(
                    this,
                    cb.fn, base || cb.context || self.hookiesBase,
                    !!sync,
                    self.customAsyncMethod,
                    args
                );
            }
        }
    };

    // Unsubscribe to an event
    // Event must be a string
    // Return the count of removed subscription methods
    Hookies.Hooks.prototype.off = function (event, callback) {
        var eventHooks = this.hooks[event],
            index,
            i,
            eventsLength = isArray(eventHooks) ? eventHooks.length : 0,
            isNotEmptyEvents = eventsLength > 0,
            fnArray = [];

        if (!isString(event)) {
            throw new Error('Event must be a string');
        }

        if (!isFunction(callback) && callback !== undefined) {
            throw new Error('Callback must be a function');
        }

        if (isNotEmptyEvents && isFunction(callback)) {
            for (i = 0; i < eventsLength; i++) {
                fnArray.push(eventHooks[i].fn);
            }

            index = fnArray.indexOf(callback);

            if (index !== -1) {
                return this.hooks[event].splice(index, 1) && 1;
            }

            return 0;
        }

        return isNotEmptyEvents ?
            ((this.hooks[event] = []) && eventsLength) :
            0;
    };

    // Clear all hooks (unsubscribe all)
    Hookies.Hooks.prototype.offAll = function () {
        this.hooks = {};
    };

    return Hookies;
}));

},{}]},{},[1])(1)
});