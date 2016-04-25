'use strict';

exports.__esModule = true;

var _hookies = require('hookies');

var _hookies2 = _interopRequireDefault(_hookies);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Override trigger method from hookies to be synchronous by default
 */

var PubSub = function (_Hookies$Hooks) {
  _inherits(PubSub, _Hookies$Hooks);

  function PubSub() {
    _classCallCheck(this, PubSub);

    var _this = _possibleConstructorReturn(this, _Hookies$Hooks.call(this));

    _this.hookiesBase = _this;
    return _this;
  }

  /**
   * Trigger all events synchronously by default
   */


  PubSub.prototype.trigger = function trigger(name) {
    var _Hookies$Hooks$protot;

    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return (_Hookies$Hooks$protot = _Hookies$Hooks.prototype.trigger).call.apply(_Hookies$Hooks$protot, [this, {
      name: name,
      sync: true,
      context: this
    }].concat(args));
  };

  /**
   * Trigger asynchronously
   */


  PubSub.prototype.triggerAsync = function triggerAsync() {
    var _Hookies$Hooks$protot2;

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return (_Hookies$Hooks$protot2 = _Hookies$Hooks.prototype.trigger).call.apply(_Hookies$Hooks$protot2, [this].concat(args));
  };

  return PubSub;
}(_hookies2.default.Hooks);

exports.default = PubSub;