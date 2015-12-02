import { _ } from 'lodash';

import { FactoryGirl } from '../../support/factory-girl.js';
import {
  AllowedMethodsService
} from '../../../lib/kindergarten/utils/allowed-methods-service';

describe('AllowedMethodsService', function () {
  beforeEach(function () {
    this.myDummy1 = new FactoryGirl('my-dummy', 'foo', 'bar');

    this.MyDummy2 = function () {
      this.foo = 'bar';
    };

    this.MyDummy2.prototype.bar = function () {};

    this.MyDummy3 = class {
      constructor() {
      }
    };

    this.myDummy4 = {
      foo: 'bar',
      bar: () => {}
    };

    this.AllowedMethodsService = AllowedMethodsService;
    this.allowedMethodsService1 = new AllowedMethodsService(this.myDummy1);
    this.allowedMethodsService2 = new AllowedMethodsService(new this.MyDummy2());
    this.allowedMethodsService3 = new AllowedMethodsService(this.MyDummy2);
    this.allowedMethodsService4 = new AllowedMethodsService(new this.MyDummy3());
    this.allowedMethodsService5 = new AllowedMethodsService(this.myDummy4);

    this.reservedWords = [
      'abstract', 'arguments', 'boolean', 'break', 'byte', 'case', 'catch',
      'char', 'class', 'const', 'continue', 'debugger', 'default', 'delete',
      'do', 'double', 'else', 'enum', 'eval', 'export', 'extends', 'false',
      'final', 'finally', 'float', 'for', 'function', 'goto', 'if',
      'implements', 'import', 'in', 'instanceof', 'int', 'interface', 'let',
      'long', 'native', 'new', 'null', 'package', 'private', 'protected',
      'public', 'return', 'short', 'static', 'super*', 'switch',
      'synchronized', 'this', 'throw', 'throws', 'transient', 'true', 'try',
      'typeof', 'var', 'void', 'volatile', 'while', 'with', 'yield'
    ];
  });

  describe('isRestricted', function () {
    it('returns true if method is not safe', function () {
      _.each([
        'IAMnotSafe', '-', 'foo bar', '1_123', 'void', 'class', 'constructor'
      ], (unsafe) => {
        expect((new this.AllowedMethodsService()).isRestricted(unsafe)).toBe(true);
      });
    });

    it('returns true if method is safe', function () {
      _.each([
        'iAmSafe', 'foo', 'bar', '$_', '_123', 'fooBar'
      ], (safe) => {
        expect((new this.AllowedMethodsService()).isRestricted(safe)).toBe(false);
      });
    });
  });

  describe('constructor', function () {
    it('it stores a reference to dummy object', function () {
      expect(this.allowedMethodsService1.dummyObj).toBe(this.myDummy1);
    });
  });

  describe('_restrictedMethods', function () {
    it('returns array of properties and methods of the object', function () {
      expect(this.allowedMethodsService1._restrictedMethods()).toEqual(['foo', 'bar']);
      expect(this.allowedMethodsService2._restrictedMethods()).toEqual(['foo', 'bar']);
      expect(this.allowedMethodsService3._restrictedMethods()).toEqual([]);
      expect(this.allowedMethodsService4._restrictedMethods()).toEqual([]);
      expect(this.allowedMethodsService5._restrictedMethods()).toEqual(['foo', 'bar']);
    });
  });

  describe('_reservedWords', function () {
    it('returns list of reserved words', function () {
      expect(this.allowedMethodsService1._reservedWords()).toEqual(this.reservedWords);
    });
  });

  describe('_customUnsafeList', function () {
    it('returns list of custom unsafe words', function () {
      expect(this.allowedMethodsService1._customUnsafeList()).toEqual([
        'constructor', 'property', '__proto__'
      ]);
    });
  });
});
