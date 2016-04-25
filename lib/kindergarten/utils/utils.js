'use strict';

exports.__esModule = true;
exports.isSandbox = exports.isGoverness = undefined;

var _isObject = require('lodash/isObject');

var _isObject2 = _interopRequireDefault(_isObject);

var _sandbox = require('../sandbox');

var _sandbox2 = _interopRequireDefault(_sandbox);

var _headGoverness = require('../governesses/head-governess');

var _headGoverness2 = _interopRequireDefault(_headGoverness);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isGoverness = exports.isGoverness = function isGoverness(obj) {
  return (0, _isObject2.default)(obj) && obj instanceof _headGoverness2.default;
};

var isSandbox = exports.isSandbox = function isSandbox(obj) {
  return (0, _isObject2.default)(obj) && obj instanceof _sandbox2.default;
};