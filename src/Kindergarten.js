import {
  AccessDenied,
  ArgumentError,
  BaseObject,
  EasyGoverness,
  GermanGoverness,
  HeadGoverness,
  Logger,
  MiddlewareGoverness,
  NoExposedMethodError,
  NoGovernessError,
  NoPurposeError,
  NoSandboxError,
  Perimeter,
  PubSub,
  Purpose,
  RestrictedMethodError,
  Rule,
  Sandbox,
  StrictGoverness,
  VERSION,
  WrongRuleDefinition,
  createPerimeter,
  createRule,
  createSandbox,
  guard,
  isGoverness,
  isPerimeter,
  isPurpose,
  isRule,
  isSandbox
} from './kindergarten';

/**
 * Main namespace is exported by default to keep Kindergarten compatible with
 * versions < 1.0 and for programmers that like to use the classes through the
 * namespace.
 */
const Kindergarten = {
  AccessDenied,
  ArgumentError,
  BaseObject,
  EasyGoverness,
  GermanGoverness,
  HeadGoverness,
  isGoverness,
  isPerimeter,
  isPurpose,
  isRule,
  isSandbox,
  Logger,
  MiddlewareGoverness,
  NoExposedMethodError,
  NoGovernessError,
  NoPurposeError,
  NoSandboxError,
  Perimeter,
  PubSub,
  Purpose,
  RestrictedMethodError,
  Rule,
  Sandbox,
  StrictGoverness,
  VERSION,
  WrongRuleDefinition,
  createPerimeter,
  createRule,
  createSandbox,

  sandbox(child) {
    return new Kindergarten.Sandbox(child);
  }
};

export default Kindergarten;

export {
  AccessDenied,
  ArgumentError,
  BaseObject,
  EasyGoverness,
  GermanGoverness,
  HeadGoverness,
  Logger,
  MiddlewareGoverness,
  NoExposedMethodError,
  NoGovernessError,
  NoPurposeError,
  NoSandboxError,
  Perimeter,
  PubSub,
  Purpose,
  RestrictedMethodError,
  Rule,
  Sandbox,
  StrictGoverness,
  VERSION,
  WrongRuleDefinition,
  createPerimeter,
  createRule,
  createSandbox,
  guard,
  isGoverness,
  isPerimeter,
  isPurpose,
  isRule,
  isSandbox
};
