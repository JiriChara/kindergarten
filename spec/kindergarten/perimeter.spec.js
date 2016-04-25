import { _ } from 'lodash';

import FactoryGirl from '../support/factory-girl';
import Perimeter from '../../src/kindergarten/perimeter';
import {
  NoPurposeError
} from '../../src/kindergarten/errors';

describe('Perimeter', () => {
  beforeEach(function () {
    this.child = new FactoryGirl('child');

    this.sandbox = new FactoryGirl('sandbox', this.child);
    this.governess = new FactoryGirl('headGoverness', this.child);
    this.Television = new FactoryGirl('Television');
    this.CableTv = new FactoryGirl('CableTv');

    this.Perimeter = Perimeter;

    this.purpose = 'foo';

    this.options = {
      govern: {
        'can watch': [this.Television],
        'cannot watch': [this.CableTv]
      },

      expose: [
        'watchTv'
      ]
    };

    this.myPerimeter = new this.Perimeter(
      this.purpose,
      this.options
    );

    this.myStupidPerimeter = new this.Perimeter(
      this.purpose,
      {}
    );
  });

  describe('constructor', () => {
    it('returns new instanceof perimeter', function () {
      expect(this.myPerimeter instanceof this.Perimeter).toBe(true);
    });

    it('sets _purpose to purpose', function () {
      expect(this.myPerimeter._purpose).toBe(this.purpose);
    });

    it('throws an NoPurposeError if purpose is not string', function () {
      _.each([
        {}, [], null, undefined, this.Perimeter
      ], (x) => {
        expect(() => {
          this.myPerimeter = new this.Perimeter(x);
        }).toThrowError('Perimeter must have a purpose.');

        try {
          this.myPerimeter = new this.Perimeter(x);
        } catch (e) {
          expect(e instanceof NoPurposeError).toBe(true);
        }
      });
    });

    it('sets _govern to govern', function () {
      expect(this.myPerimeter._govern).toBe(this.options.govern);
    });

    it('defaults _govern to {}', function () {
      expect(this.myStupidPerimeter._govern).toEqual({});
    });

    it('sets _expose to expose', function () {
      expect(this.myPerimeter._expose).toBe(this.options.expose);
    });

    it('defaults _expose to []', function () {
      expect(this.myStupidPerimeter._expose).toEqual([]);
    });
  });

  describe('purpose getter', () => {
    it('returns _purpose', function () {
      this.myPerimeter._purpose = 'heyHou';

      expect(this.myPerimeter.purpose).toEqual(this.myPerimeter.purpose);
    });
  });

  describe('purpose setter', () => {
    it('throws an error if purpose is not a string', function () {
      expect(() => {
        this.myPerimeter.purpose = {};
      }).toThrowError('Perimeter must have a purpose.');

      try {
        this.myPerimeter.purpose = {};
      } catch (e) {
        expect(e instanceof NoPurposeError).toBe(true);
      }
    });

    it('must match a regex', function () {
      const wrong = [
        '123', 'A', 'abc12$?', '_!'
      ];

      const funky = [
        '_foo', '$123', 'a'
      ];

      _.each(wrong, (x) => {
        expect(() => {
          this.myPerimeter = new this.Perimeter(x);
        }).toThrowError('Perimeter must have a purpose.');

        try {
          this.myPerimeter = new this.Perimeter(x);
        } catch (e) {
          expect(e instanceof NoPurposeError).toBe(true);
        }
      });

      _.each(funky, (x) => {
        expect(() => {
          this.myPerimeter = new this.Perimeter(x);
        }).not.toThrowError();
      });
    });

    it('returns the given value', function () {
      expect(this.myPerimeter.purpose = 'foo').toEqual('foo');
    });
  });

  describe('govern getter', () => {
    it('returns _govern', function () {
      expect(this.myPerimeter.govern).toEqual(this.myPerimeter._govern);
    });

    it('returns {} if govern is not an object', function () {
      this.myPerimeter._govern = 'x';
      expect(this.myPerimeter.govern).toEqual({});
    });
  });

  describe('govern setter', () => {
    it('sets _govern to given value', function () {
      const obj = {};
      this.myPerimeter.govern = obj;
      expect(this.myPerimeter._govern).toBe(obj);
    });

    it('returns the given value', function () {
      const obj = {};
      expect(this.myPerimeter.govern = obj).toBe(obj);
    });

    it('sets _govern to {} if not object given', function () {
      const obj = 'x';
      this.myPerimeter.govern = obj;
      expect(this.myPerimeter._govern).toEqual({});
    });
  });

  describe('expose getter', () => {
    it('returns value of _expose', function () {
      const expose = ['foo', 'bar'];
      this.myPerimeter._expose = expose;
      expect(this.myPerimeter.expose).toBe(expose);
    });

    it('returns [] by default', function () {
      this.myPerimeter._expose = undefined;
      expect(this.myPerimeter.expose).toEqual([]);
    });
  });

  describe('expose setter', () => {
    it('sets _expose to given value', function () {
      const expose = ['foo', 'bar'];
      this.myPerimeter.expose = expose;
      expect(this.myPerimeter._expose).toBe(expose);
    });

    it('sets _expose to [] by default', function () {
      _.each(undefined, 'not array', {}, (notAllowed) => {
        this.myPerimeter.expose = notAllowed;
        expect(this.myPerimeter._expose).toEqual([]);
      });
    });

    it('returns the given value', function () {
      const expose = ['foo', 'bar'];
      expect(this.myPerimeter.expose = expose).toEqual(expose);
    });
  });

  describe('sandbox getter', () => {
    it('returns value of _sandbox', function () {
      this.myPerimeter._sandbox = this.sandbox;
      expect(this.myPerimeter.sandbox).toBe(this.myPerimeter._sandbox);
    });

    it('returns null by default', function () {
      expect(this.myPerimeter.sandbox).toBeNull();
    });
  });

  describe('sandbox setter', () => {
    it('sets _sandbox to given one', function () {
      this.myPerimeter.sandbox = this.sandbox;
      expect(this.myPerimeter._sandbox).toBe(this.sandbox);
    });

    it('sets child to child of the sandbox', function () {
      this.myPerimeter.sandbox = this.sandbox;
      expect(this.myPerimeter.child).toBe(this.sandbox.child);
    });

    it('returns the given value', function () {
      expect(this.myPerimeter.sandbox = this.sandbox).toEqual(this.sandbox);
    });
  });

  describe('governess getter', () => {
    it('returns _governess', function () {
      this.myPerimeter._governess = this.governess;
      expect(this.myPerimeter.governess).toBe(this.governess);
    });

    it('returns null by default', function () {
      this.myPerimeter._governess = {};
      expect(this.myPerimeter.governess).toBeNull();
    });
  });

  describe('governess setter', () => {
    it('sets _governess to given one', function () {
      this.myPerimeter.governess = this.governess;
      expect(this.myPerimeter.governess).toBe(this.governess);
    });

    it('returns the given value', function () {
      expect(this.myPerimeter.governess = this.governess).toEqual(
        this.governess
      );
    });

    it('set governess to null by default', function () {
      this.myPerimeter.governess = 'foo';
      expect(this.myPerimeter._governess).toBeNull();

      this.myPerimeter.governess = {};
      expect(this.myPerimeter._governess).toBeNull();
    });
  });

  describe('child getter', () => {
    it('returns _child', function () {
      const child = {};
      this.myPerimeter._child = child;
      expect(this.myPerimeter.child).toBe(child);
    });

    it('returns null by default', function () {
      this.myPerimeter._child = undefined;
      expect(this.myPerimeter.child).toBe(null);
    });
  });

  describe('child setter', () => {
    it('set _child to given child', function () {
      const child = {};
      this.myPerimeter.child = child;
      expect(this.myPerimeter._child).toBe(child);
    });

    it('returns the given value', function () {
      const child = {};
      expect(this.myPerimeter.child = child).toBe(child);
    });

    it('sets child to null by default', function () {
      this.myPerimeter.child = undefined;
      expect(this.myPerimeter._child).toBeNull();
    });
  });
});
