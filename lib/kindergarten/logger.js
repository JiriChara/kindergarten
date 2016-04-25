'use strict';

exports.__esModule = true;

var _isFunction = require('lodash/isFunction');

var _isFunction2 = _interopRequireDefault(_isFunction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Logger = {
  _log: function _log(msg) {
    if (console && (0, _isFunction2.default)(console.log)) {
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

exports.default = Logger;