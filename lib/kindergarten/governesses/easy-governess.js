'use strict';

exports.__esModule = true;

var _headGoverness = require('./head-governess');

var _headGoverness2 = _interopRequireDefault(_headGoverness);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Very easy governess who lets everything happen unguarded.
 */

var EasyGoverness = function (_HeadGoverness) {
  _inherits(EasyGoverness, _HeadGoverness);

  function EasyGoverness(child) {
    _classCallCheck(this, EasyGoverness);

    var _this = _possibleConstructorReturn(this, _HeadGoverness.call(this, child));

    _this.unguarded = true;
    return _this;
  }

  return EasyGoverness;
}(_headGoverness2.default);

exports.default = EasyGoverness;