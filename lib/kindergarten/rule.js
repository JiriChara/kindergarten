'use strict';

exports.__esModule = true;

var _upperFirst = require('lodash/upperFirst');

var _upperFirst2 = _interopRequireDefault(_upperFirst);

var _some = require('lodash/some');

var _some2 = _interopRequireDefault(_some);

var _baseObject = require('./base-object');

var _baseObject2 = _interopRequireDefault(_baseObject);

var _type = require('./rule/type');

var _type2 = _interopRequireDefault(_type);

var _definition = require('./rule/definition');

var _definition2 = _interopRequireDefault(_definition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The definition of Rule class.
 *
 * Rules are used by a governess. Governess can learn many rules and they are
 * defined in perimeter in most of the cases.
 */

var Rule = function (_BaseObject) {
  _inherits(Rule, _BaseObject);

  function Rule(str, def) {
    _classCallCheck(this, Rule);

    var _this = _possibleConstructorReturn(this, _BaseObject.call(this));

    _this.type = new _type2.default(str);
    _this.definition = new _definition2.default(_this, def);
    return _this;
  }

  Rule.prototype.verify = function verify() {
    var verifyMethodName = '_verify' + (0, _upperFirst2.default)(this.definition.type);

    var result = this[verifyMethodName].apply(this, arguments);

    return this.type.isPositive() ? result : !result;
  };

  Rule.prototype._verifyItems = function _verifyItems() {
    var subject = arguments.length <= 0 ? undefined : arguments[0];

    return (0, _some2.default)(this.definition.items, function (item) {
      var isInstance = false;

      try {
        isInstance = subject instanceof item;
      } catch (ignore) {
        // Ignore if instanceof is not applicable
      }

      return isInstance || item === subject;
    });
  };

  Rule.prototype._verifyRegex = function _verifyRegex() {
    var subject = arguments.length <= 0 ? undefined : arguments[0];

    return this.definition.regex.test(subject);
  };

  Rule.prototype._verifyCustomMethod = function _verifyCustomMethod() {
    var definition = this.definition;

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return definition.customMethod.apply(definition.ruleContext, args);
  };

  return Rule;
}(_baseObject2.default);

exports.default = Rule;