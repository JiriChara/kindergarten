import { _ } from 'lodash';

import BaseObject from '../../src/kindergarten/base-object';
import PubSub from '../../src/kindergarten/utils/pub-sub';
import Perimeter from '../../src/kindergarten/perimeter';
import Logger from '../../src/kindergarten/logger';
import Sandbox from '../../src/kindergarten/sandbox';
import HeadGoverness from '../../src/kindergarten/governesses/head-governess';
import EasyGoverness from '../../src/kindergarten/governesses/easy-governess';
import StrictGoverness from '../../src/kindergarten/governesses/strict-governess';
import GermanGoverness from '../../src/kindergarten/governesses/german-governess';
import Rule from '../../src/kindergarten/rule';
import Type from '../../src/kindergarten/rule/type';
import {
  AccessDenied,
  ArgumentError,
  NoExposedMethodsError,
  NoExposedMethodError,
  NoPurposeError,
  NoSanboxError,
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

  NoExposedMethodErrorFactory() {
    return NoExposedMethodError;
  }

  NoPurposeErrorFactory() {
    return NoPurposeError;
  }

  NoSanboxErrorFactory() {
    return NoSanboxError;
  }

  RestrictedMethodErrorFactory() {
    return RestrictedMethodError;
  }

  WrongRuleDefinitionFactory() {
    return WrongRuleDefinition;
  }
}
