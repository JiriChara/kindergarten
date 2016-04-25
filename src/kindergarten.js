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

  AccessDenied,
  ArgumentError,
  NoExposedMethodError,
  NoPurposeError,
  NoSanboxError,
  RestrictedMethodError,
  WrongRuleDefinition,

  sandbox(child) {
    return new Kindergarten.Sandbox(child);
  }
};

export default Kindergarten;

export {
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

  AccessDenied,
  ArgumentError,
  NoExposedMethodError,
  NoPurposeError,
  NoSanboxError,
  RestrictedMethodError,
  WrongRuleDefinition
};
