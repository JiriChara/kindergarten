'use strict';

exports.__esModule = true;

var _headGoverness = require('./head-governess');

var _headGoverness2 = _interopRequireDefault(_headGoverness);

var _errors = require('../errors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var StrictGoverness = function (_HeadGoverness) {
  _inherits(StrictGoverness, _HeadGoverness);

  function StrictGoverness(child) {
    _classCallCheck(this, StrictGoverness);

    var _this = _possibleConstructorReturn(this, _HeadGoverness.call(this, child));

    _this._guardCount = 0;
    _this._governedCount = 0;
    return _this;
  }

  StrictGoverness.prototype.governed = function governed() {
    var returnVal = _headGoverness2.default.prototype.governed.apply(this, arguments);

    if (++this._governedCount > this._guardCount && !this.unguarded) {
      throw new _errors.AccessDenied('All exposed methods must call guard method.');
    }

    // TODO: test for return value
    return returnVal;
  };

  StrictGoverness.prototype.guard = function guard() {
    ++this._guardCount;

    // TODO: test for return value
    return _headGoverness2.default.prototype.guard.apply(this, arguments);
  };

  return StrictGoverness;
}(_headGoverness2.default);

exports.default = StrictGoverness;