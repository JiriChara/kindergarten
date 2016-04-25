'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.__esModule = true;

var _isFunction = require('lodash/isFunction');

var _isFunction2 = _interopRequireDefault(_isFunction);

var _isArray = require('lodash/isArray');

var _isArray2 = _interopRequireDefault(_isArray);

var _isRegExp = require('lodash/isRegExp');

var _isRegExp2 = _interopRequireDefault(_isRegExp);

var _isEmpty = require('lodash/isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _find = require('lodash/find');

var _find2 = _interopRequireDefault(_find);

var _baseObject = require('../base-object');

var _baseObject2 = _interopRequireDefault(_baseObject);

var _memoize = require('lodash/memoize');

var _memoize2 = _interopRequireDefault(_memoize);

var _errors = require('../errors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TYPES = [['items', function (def) {
  return (0, _isArray2.default)(def) && !(0, _isEmpty2.default)(def);
}, false // is not strict
], ['regex', function (def) {
  return (0, _isRegExp2.default)(def);
}, true // is strict
], ['customMethod', function (def) {
  return (0, _isFunction2.default)(def);
}, true // is strict
]];

var Definition = function (_BaseObject) {
  _inherits(Definition, _BaseObject);

  function Definition(rule, def) {
    _classCallCheck(this, Definition);

    var _this = _possibleConstructorReturn(this, _BaseObject.call(this));

    _this._rule = rule;
    _this._raw = def;

    _this._resolve();
    return _this;
  }

  Definition.prototype.getItems = function getItems() {
    return this.items;
  };

  Definition.prototype.setItems = function setItems(val) {
    this.items = val;

    return val;
  };

  Definition.prototype.getRegex = function getRegex() {
    return this.regex;
  };

  Definition.prototype.setRegex = function setRegex(val) {
    this.regex = val;

    return val;
  };

  Definition.prototype.getCustomMethod = function getCustomMethod() {
    return this.customMethod;
  };

  Definition.prototype.setCustomMethod = function setCustomMethod(val) {
    this.customMethod = val;

    return val;
  };

  Definition.prototype._resolve = function _resolve() {
    var _this2 = this;

    var definitionObj = (0, _find2.default)(TYPES, function (type) {
      var condition = type[1];

      return condition(_this2._raw);
    }) || null;

    if (!(0, _isArray2.default)(definitionObj)) {
      throw new _errors.WrongRuleDefinition('Cannot create a new rule "' + this._rule.type.type + '". Wrong rule definition.');
    }

    this.ruleContext = this._raw.ruleContext;

    this._type = definitionObj[0];


    this[this._type] = this._raw;
  };

  Definition.prototype.isStrict = function isStrict() {
    return !this._rule.type.isPositive() || this._isStrict(this._type);
  };

  Definition.prototype.isCustom = function isCustom() {
    return this._type === 'customMethod';
  };

  _createClass(Definition, [{
    key: 'items',
    get: function get() {
      return this._condition('items')(this._items) ? this._items : null;
    },
    set: function set(val) {
      this._items = this._condition('items')(val) ? val : null;

      return val;
    }
  }, {
    key: 'regex',
    get: function get() {
      return this._regex || null;
    },
    set: function set(val) {
      this._regex = this._condition('regex')(val) ? val : null;

      return val;
    }
  }, {
    key: 'customMethod',
    get: function get() {
      return this._customMethod || null;
    },
    set: function set(val) {
      this._customMethod = this._condition('customMethod')(val) ? val : null;

      return val;
    }
  }, {
    key: 'type',
    get: function get() {
      return this._type;
    }
  }]);

  return Definition;
}(_baseObject2.default);

exports.default = Definition;


Definition.prototype._condition = (0, _memoize2.default)(function (type) {
  return (0, _find2.default)(TYPES, function (t) {
    return type === t[0];
  })[1] || function () {
    return false;
  };
});

Definition.prototype._isStrict = (0, _memoize2.default)(function (type) {
  return (0, _find2.default)(TYPES, function (t) {
    return type === t[0];
  })[2] || function () {
    return false;
  }();
});