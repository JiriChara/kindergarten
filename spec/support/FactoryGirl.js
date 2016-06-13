import { _ } from 'lodash';

import BaseObject from '../../src/kindergarten/BaseObject';
import PubSub from '../../src/kindergarten/utils/PubSub';
import Perimeter from '../../src/kindergarten/Perimeter';
import Purpose from '../../src/kindergarten/Purpose';
import Logger from '../../src/kindergarten/Logger';
import Sandbox from '../../src/kindergarten/Sandbox';
import createRule from '../../src/kindergarten/createRule';
import {
  HeadGoverness,
  EasyGoverness,
  StrictGoverness,
  GermanGoverness,
  MiddlewareGoverness
} from '../../src/kindergarten/governesses';
import Rule from '../../src/kindergarten/Rule';
import Type from '../../src/kindergarten/rule/Type';
import Definition from '../../src/kindergarten/rule/Definition';
import {
  AccessDenied,
  ArgumentError,
  NoExposedMethodsError,
  NoExposedMethodError,
  NoGovernessError,
  NoPurposeError,
  NoSandboxError,
  RestrictedMethodError,
  WrongRuleDefinition
} from '../../src/kindergarten/errors';

export default class FactoryGirl {
  constructor(obj, ...args) {
    const objFactory = `${obj}Factory`;

    return _.isFunction(this[objFactory]) ?
      this[objFactory].apply(this, args) :
      jasmine.createSpyObj(obj, _.isEmpty(args) ? ['foo'] : args);
  }

  TelevisionFactory() {
    return class {};
  }

  TvFactory() {
    return class {};
  }

  CableTvFactory() {
    return class {};
  }

  LoggerFactory() {
    return Logger;
  }

  PerimeterFactory() {
    return Perimeter;
  }

  perimeterFactory(...args) {
    return (args.length >= 1) ?
      (new Perimeter(args[0], args[1])) :
      (new Perimeter('playing', {
        govern: {
          'can watch': {
            items: [new FactoryGirl('television')]
          },
          'cannot watch': {
            items: [new FactoryGirl('cableTv')]
          }
        }
      }));
  }

  PurposeFactory() {
    return Purpose;
  }

  BaseObjectFactory() {
    return BaseObject;
  }

  PubSubFactory() {
    return PubSub;
  }

  RuleFactory() {
    return Rule;
  }

  TypeFactory() {
    return Type;
  }

  DefinitionFactory() {
    return Definition;
  }

  SandboxFactory() {
    return Sandbox;
  }

  sandboxFactory(...args) {
    return (args.length === 1) ?
      (new Sandbox(args[0])) :
      (new Sandbox(new FactoryGirl('child')));
  }

  HeadGovernessFactory() {
    return HeadGoverness;
  }

  EasyGovernessFactory() {
    return EasyGoverness;
  }

  StrictGovernessFactory() {
    return StrictGoverness;
  }

  GermanGovernessFactory() {
    return GermanGoverness;
  }

  MiddlewareGovernessFactory() {
    return MiddlewareGoverness;
  }

  headGovernessFactory(...args) {
    return (args.length === 1) ?
      (new HeadGoverness(args[0])) :
      (new HeadGoverness(new FactoryGirl('child')));
  }

  AccessDeniedFactory() {
    return AccessDenied;
  }

  ArgumentErrorFactory() {
    return ArgumentError;
  }

  NoExposedMethodsErrorFactory() {
    return NoExposedMethodsError;
  }

  NoGovernessErrorFactory() {
    return NoGovernessError;
  }

  NoExposedMethodErrorFactory() {
    return NoExposedMethodError;
  }

  NoPurposeErrorFactory() {
    return NoPurposeError;
  }

  NoSandboxErrorFactory() {
    return NoSandboxError;
  }

  RestrictedMethodErrorFactory() {
    return RestrictedMethodError;
  }

  WrongRuleDefinitionFactory() {
    return WrongRuleDefinition;
  }

  createRuleFactory() {
    return createRule;
  }
}
