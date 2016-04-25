'use strict';

exports.__esModule = true;

var _isObject = require('lodash/isObject');

var _isObject2 = _interopRequireDefault(_isObject);

var _each = require('lodash/each');

var _each2 = _interopRequireDefault(_each);

var _perimeter = require('../perimeter');

var _perimeter2 = _interopRequireDefault(_perimeter);

var _headGoverness = require('./head-governess');

var _headGoverness2 = _interopRequireDefault(_headGoverness);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var GermanGoverness = function (_HeadGoverness) {
  _inherits(GermanGoverness, _HeadGoverness);

  function GermanGoverness() {
    _classCallCheck(this, GermanGoverness);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(this, _HeadGoverness.call.apply(_HeadGoverness, [this].concat(args)));
  }

  GermanGoverness.prototype.governed = function governed(callback) {
    var args = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];
    var callingContext = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

    var guardArgs = args;

    var exposedMethodName = this._detectNameOfExposedMethod(callingContext, callback);

    guardArgs.unshift(exposedMethodName);

    this.guard.apply(this, guardArgs);

    return _headGoverness2.default.prototype.governed.apply(this, arguments);
  };

  GermanGoverness.prototype._detectNameOfExposedMethod = function _detectNameOfExposedMethod(source, method) {
    if ((0, _isObject2.default)(source) && source instanceof _perimeter2.default) {
      var methodName = void 0;

      (0, _each2.default)(source.expose, function (m) {
        if (source[m] === method) {
          methodName = m;
          return;
        }
      });

      return methodName;
    }

    // TODO: throw a custom error
    throw new Error('German governess can only be used within sandbox.');
  };

  return GermanGoverness;
}(_headGoverness2.default);

exports.default = GermanGoverness;