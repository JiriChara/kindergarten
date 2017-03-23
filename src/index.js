import Logger from './Logger';
import Perimeter from './Perimeter';
import Purpose from './Purpose';
import Rule from './Rule';
import Sandbox from './Sandbox';
import VERSION from './VERSION';
import createPerimeter from './createPerimeter';
import createRule from './createRule';
import createSandbox from './createSandbox';

import {
  isGoverness,
  isPerimeter,
  isPurpose,
  isRule,
  isSandbox,
  PubSub
} from './utils';

import {
  EasyGoverness,
  GermanGoverness,
  HeadGoverness,
  MiddlewareGoverness,
  StrictGoverness
} from './governesses';

import {
  AccessDenied,
  ArgumentError,
  NoExposedMethodError,
  NoGovernessError,
  NoPurposeError,
  NoSandboxError,
  RestrictedMethodError,
  WrongRuleDefinition
} from './errors';

export {
  AccessDenied,
  ArgumentError,
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
  isGoverness,
  isPerimeter,
  isPurpose,
  isRule,
  isSandbox
};

const Kindergarten = {
  AccessDenied,
  ArgumentError,
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
  isGoverness,
  isPerimeter,
  isPurpose,
  isRule,
  isSandbox
};

export default Kindergarten;
