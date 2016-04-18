import { _ } from 'lodash';

import BaseObject from '../../lib/kindergarten/base-object';
import PubSub from '../../lib/kindergarten/utils/pub-sub';
import Perimeter from '../../lib/kindergarten/perimeter';
import Logger from '../../lib/kindergarten/logger';
import Sandbox from '../../lib/kindergarten/sandbox';
import HeadGoverness from '../../lib/kindergarten/governesses/head-governess';
import EasyGoverness from '../../lib/kindergarten/governesses/easy-governess';
import StrictGoverness from '../../lib/kindergarten/governesses/strict-governess';
import GermanGoverness from '../../lib/kindergarten/governesses/german-governess';
import Rule from '../../lib/kindergarten/rule';
import Type from '../../lib/kindergarten/rule/type';
import {
  AccessDenied,
  ArgumentError,
  NoExposedMethodsError,
  NoExposedMethodError,
  NoPurposeError,
  NoSanboxError,
  RestrictedMethodError,
  WrongRuleDefinition
} from '../../lib/kindergarten/errors';

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
