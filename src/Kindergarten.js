import {
  AccessDenied,
  ArgumentError,
  BaseObject,
  EasyGoverness,
  GermanGoverness,
  HeadGoverness,
  Logger,
  NoExposedMethodError,
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
  createSandbox
} from './kindergarten';

const Kindergarten = {
  AccessDenied,
  ArgumentError,
  BaseObject,
  EasyGoverness,
  GermanGoverness,
  HeadGoverness,
  Logger,
  NoExposedMethodError,
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
  NoExposedMethodError,
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
  createSandbox
};
