import { _ } from 'lodash';

import FactoryGirl from '../support/FactoryGirl';
import Perimeter from '../../src/kindergarten/Perimeter';
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

  describe('sandbox getter', () => {
    it('returns value of _sandbox', function () {
      this.myPerimeter._sandbox = this.sandbox;
      expect(this.myPerimeter.sandbox).toBe(this.myPerimeter._sandbox);
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
});
