import { _ } from 'lodash';

import {
  isString,
  isFunction,
  isUndefined,
  isArray,
  isObject,
  isBoolean,
  isGoverness,
  isSandbox,
  isEmpty,
  each,
  find,
  some,
  filter,
  contains,
  has,
  bind,
  keys,
  extend
} from '../../../lib/kindergarten/utils/utils';

import { FactoryGirl } from '../../support/factory-girl';

describe('utils', function () {
  describe('isString', function () {
    it('should return true if given arg is a string', function () {
      _.each([
        'foo', '$'
      ], (s) => {
        expect(isString(s)).toBe(true);
      });
    });

    it('should return false if given arg is not a string', function () {
      _.each([
        [], {}, 1, null, undefined, isString
      ], (s) => {
        expect(isString(s)).toBe(false);
      });
    });
  });

  describe('isFunction', function () {
    it('should return true if given arg is a function', function () {
      _.each([
        isFunction, function () {}, () => {}
      ], (s) => {
        expect(isFunction(s)).toBe(true);
      });
    });

    it('should return false if given arg is not a function', function () {
      _.each([
        null, [], {}, 1, 'foo'
      ], (s) => {
        expect(isFunction(s)).toBe(false);
      });
    });
  });

  describe('isUndefined', function () {
    it('should return true if given arg is a undefined', function () {
      expect(isUndefined(undefined)).toBe(true);
    });

    it('should return false if given arg is not a string', function () {
      _.each([
        null, [], {}, 1, 'foo', isUndefined
      ], (s) => {
        expect(isUndefined(s)).toBe(false);
      });
    });
  });

  describe('isArray', function () {
    it('should return true if given arg is a array', function () {
      _.each([
        [], [1, 2, 3], new Array()
      ], (s) => {
        expect(isArray(s)).toBe(true);
      });
    });

    it('should return false if given arg is not a array', function () {
      _.each([
        null, {}, 1, 'foo', function () {}, () => { return []; }
      ], (s) => {
        expect(isArray(s)).toBe(false);
      });
    });
  });

  describe('isObject', function () {
    it('should return true if given arg is a object', function () {
      _.each([
        {}, { foo: 'bar' }, [], function () {}, new Error()
      ], (s) => {
        expect(isObject(s)).toBe(true);
      });
    });

    it('should return false if given arg is not a object', function () {
      _.each([
        null, undefined, true, 1, ''
      ], (s) => {
        expect(isObject(s)).toBe(false);
      });
    });
  });

  describe('isBoolean', function () {
    it('should return true if given arg is a boolean', function () {
      _.each([
        true, false
      ], (s) => {
        expect(isBoolean(s)).toBe(true);
      });
    });

    it('should return false if given arg is not a boolean', function () {
      _.each([
        null, undefined, [], 1, 0, -1, function () {}, {}
      ], (s) => {
        expect(isBoolean(s)).toBe(false);
      });
    });
  });

  describe('isGoverness', function () {
    it('should return true if given arg is a governess', function () {
      _.each([
        new (new FactoryGirl('HeadGoverness'))({}),
        new (new FactoryGirl('StrictGoverness'))({}),
        new (new FactoryGirl('EasyGoverness'))({}),
        new (new FactoryGirl('GermanGoverness'))({})
      ], (s) => {
        expect(isGoverness(s)).toBe(true);
      });
    });

    it('should return false if given arg is not a governess', function () {
      _.each([
        null, undefined, [], 1, 0, -1, function () {}, {},
        new FactoryGirl('Sandbox')
      ], (s) => {
        expect(isGoverness(s)).toBe(false);
      });
    });
  });

  describe('isSandbox', function () {
    it('should return true if given arg is a sandbox', function () {
      _.each([
        new (new FactoryGirl('Sandbox'))({})
      ], (s) => {
        expect(isSandbox(s)).toBe(true);
      });
    });

    it('should return false if given arg is not a sandbox', function () {
      _.each([
        null, undefined, [], 1, 0, -1, function () {}, {},
        new FactoryGirl('GermanGoverness')
      ], (s) => {
        expect(isSandbox(s)).toBe(false);
      });
    });
  });

  describe('isEmpty', function () {
    it(
      'should return true if given obj is an empty array or something else than array'
      , function () {
        _.each([
          [], true, 1, function () {}
        ], (s) => {
          expect(isEmpty(s)).toBe(true);
        });
      }
    );

    it('should return true if given obj is not an empty array', function () {
      _.each([
        [1], ['foo'], [[]]
      ], (s) => {
        expect(isEmpty(s)).toBe(false);
      });
    });
  });

  describe('each', function () {
    it('should exec a callback on each element in an array', function () {
      const a = [1, 2, 3];
      let i = 0;

      each(a, (el) => {
        expect(el === a[i]).toBe(true);
        ++i;
      });

      expect(i).toBe(3);
    });
  });

  describe('find', function () {
    it('finds a first item in the array that matches the criteria', function () {
      const a = [1, 2, 3];

      expect(find(a, (i) => {
        return i > 1;
      })).toBe(2);
    });

    it('returns undefined if nothing found', function () {
      const a = [1, 2, 3];

      expect(find(a, (i) => {
        return i > 3;
      })).toBe(undefined);
    });
  });

  describe('some', function () {
    it('returns true if prediction is matched', function () {
      const a = [1, 2, 3];

      expect(some(a, (i) => {
        return i > 2;
      })).toBe(true);
    });

    it('returns false if prediction is not matched', function () {
      const a = [1, 2, 3];

      expect(some(a, (i) => {
        return i > 3;
      })).toBe(false);
    });
  });

  describe('filter', function () {
    it('returns array of items that match prediction', function () {
      const a = [1, 2, 3];

      expect(filter(a, (i) => {
        return i > 1;
      })).toEqual([2, 3]);
    });

    it('returns an empty array if nothing found', function () {
      const a = [1, 2, 3];

      expect(filter(a, (i) => {
        return i > 3;
      })).toEqual([]);
    });
  });

  describe('contains', function () {
    it('returns true if array contains an item', function () {
      const a = [1, 2, 3];

      expect(contains(a, 1)).toBe(true);
      expect(contains(a, 2)).toBe(true);
      expect(contains(a, 3)).toBe(true);
    });

    it('returns false if array does not contain an item', function () {
      const a = [1, 2, 3];

      expect(contains(a, 0)).toBe(false);
      expect(contains(a, 'foo')).toBe(false);
      expect(contains(a, function () { return true; })).toBe(false);
    });
  });

  describe('has', function () {
    it('returns true if object has a property', function () {
      const foo = {
        foo: 1,
        bar: 2
      };

      expect(has(foo, 'foo')).toBe(true);
      expect(has(foo, 'bar')).toBe(true);
    });

    it('returns true if object has a property', function () {
      const foo = {
        foo: 1,
        bar: 2
      };

      expect(has(foo, 'x')).toBe(false);
      expect(has(foo, undefined)).toBe(false);
      expect(has(foo, 1)).toBe(false);
      expect(has(foo, function () {})).toBe(false);
    });
  });

  describe('bind', function () {
    it('executes function in the given context', function () {
      const foo = {
        foo: 1
      };
      let counter = 0;

      const prediction = bind(function () {
        expect(this.foo).toBe(1);
        ++counter;
      }, foo);

      prediction();

      expect(counter).toBe(1);
    });

    it('throws an error if object is not callable', function () {
      expect(() => {
        bind('foo', {});
      }).toThrowError('Cannot bind non-callable function.');

      try {
        bind('foo', {});
      } catch (e) {
        expect(e instanceof TypeError).toBe(true);
      }
    });
  });

  describe('keys', function () {
    it('returns all keys of given object', function () {
      const o = {
        foo: 1,
        bar: 2
      };

      expect(keys(o)).toEqual(['foo', 'bar']);
    });

    it('returns empty array if no keys found', function () {
      const o = {};

      expect(keys(o)).toEqual([]);
    });

    it('returns empty array if given object is not object', function () {
      const o = 'foo';

      expect(keys(o)).toEqual([]);
    });
  });

  describe('extend', function () {
    it('extends object with properties', function () {
      const dest = {};
      const source = { foo: 1 };

      extend(dest, source);

      expect(dest).toEqual(source);
    });

    it('overrides the existing properties', function () {
      const dest = { foo: 0, bar: 1 };
      const source = { foo: 1 };

      extend(dest, source);

      expect(dest.foo).toBe(1);
      expect(dest.bar).toBe(1);
    });
  });
});
