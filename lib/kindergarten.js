import {Perimeter} from './kindergarten/perimeter';
import {Sandbox} from './kindergarten/sandbox';
import {HeadGoverness} from './kindergarten/governesses/head-governess';
import {EasyGoverness} from './kindergarten/governesses/easy-governess';
import {Rule} from './kindergarten/rule';
import {Logger} from './kindergarten/logger';
import {VERSION} from './kindergarten/version';
import {
  AccessDenied,
  ArgumentError,
  NoExposedMethodsError,
  NoPurposeError,
  NoSanboxError,
  RestrictedMethodError,
  WrongRuleDefinition
} from './kindergarten/errors';

/**
 * The base namespace for the library
 */
const Kindergarten = {
  Perimeter: Perimeter,
  Sandbox: Sandbox,
  HeadGoverness: HeadGoverness,
  EasyGoverness: EasyGoverness,
  Rule: Rule,
  Logger: Logger,

  // expose all the possible errors so user can catch them
  AccessDenied: AccessDenied,
  ArgumentError: ArgumentError,
  NoExposedMethodsError: NoExposedMethodsError,
  NoPurposeError: NoPurposeError,
  NoSanboxError: NoSanboxError,
  RestrictedMethodError: RestrictedMethodError,
  WrongRuleDefinition: WrongRuleDefinition,

  VERSION: VERSION,

  /**
   * Create and return new sandbox
   */
  sandbox: (child) => {
    return new Kindergarten.Sandbox(child);
  }
};

module.exports = Kindergarten;
