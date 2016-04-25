'use strict';

var _perimeter = require('./kindergarten/perimeter');

var _perimeter2 = _interopRequireDefault(_perimeter);

var _sandbox = require('./kindergarten/sandbox');

var _sandbox2 = _interopRequireDefault(_sandbox);

var _headGoverness = require('./kindergarten/governesses/head-governess');

var _headGoverness2 = _interopRequireDefault(_headGoverness);

var _easyGoverness = require('./kindergarten/governesses/easy-governess');

var _easyGoverness2 = _interopRequireDefault(_easyGoverness);

var _strictGoverness = require('./kindergarten/governesses/strict-governess');

var _strictGoverness2 = _interopRequireDefault(_strictGoverness);

var _germanGoverness = require('./kindergarten/governesses/german-governess');

var _germanGoverness2 = _interopRequireDefault(_germanGoverness);

var _rule = require('./kindergarten/rule');

var _rule2 = _interopRequireDefault(_rule);

var _purpose = require('./kindergarten/purpose');

var _purpose2 = _interopRequireDefault(_purpose);

var _logger = require('./kindergarten/logger');

var _logger2 = _interopRequireDefault(_logger);

var _version = require('./kindergarten/version');

var _version2 = _interopRequireDefault(_version);

var _errors = require('./kindergarten/errors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * The base namespace of the library.
 * It expose all publicly available classes.
 */
var Kindergarten = {
  Perimeter: _perimeter2.default,
  Sandbox: _sandbox2.default,
  HeadGoverness: _headGoverness2.default,
  EasyGoverness: _easyGoverness2.default,
  StrictGoverness: _strictGoverness2.default,
  GermanGoverness: _germanGoverness2.default,
  Rule: _rule2.default,
  Purpose: _purpose2.default,
  Logger: _logger2.default,
  VERSION: _version2.default,

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