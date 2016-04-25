import Perimeter from './kindergarten/perimeter';
import Sandbox from './kindergarten/sandbox';
import HeadGoverness from './kindergarten/governesses/head-governess';
import EasyGoverness from './kindergarten/governesses/easy-governess';
import StrictGoverness from './kindergarten/governesses/strict-governess';
import GermanGoverness from './kindergarten/governesses/german-governess';
import Rule from './kindergarten/rule';
import Purpose from './kindergarten/purpose';
import Logger from './kindergarten/logger';
import VERSION from './kindergarten/version';
import {
  AccessDenied,
  ArgumentError,
  NoExposedMethodError,
  NoPurposeError,
  NoSanboxError,
  RestrictedMethodError,
  WrongRuleDefinition
} from './kindergarten/errors';

/**
 * The base namespace of the library.
 * It expose all publicly available classes.
 */
const Kindergarten = {
  Perimeter,
  Sandbox,
  HeadGoverness,
  EasyGoverness,
  StrictGoverness,
  GermanGoverness,
  Rule,
  Purpose,
  Logger,
  VERSION,

  // expose all the possible errors so user can catch them
  AccessDenied,
  ArgumentError,
  NoExposedMethodError,
  NoPurposeError,
  NoSanboxError,
  RestrictedMethodError,
  WrongRuleDefinition,

  /**
   * Create and return new sandbox
   */
  sandbox(child) {
    return new Kindergarten.Sandbox(child);
  }
};

module.exports = Kindergarten;
