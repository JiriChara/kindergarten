import {_} from 'lodash';

import {FactoryGirl} from '../support/factory-girl';
import {Perimeter} from '../../lib/kindergarten/perimeter';
import {
  NoPurposeError
} from '../../lib/kindergarten/errors';

describe('Perimeter', function() {
  beforeEach(function() {
    this.child = new FactoryGirl('child');

    this.sandbox = new FactoryGirl('sandbox', this.child);
    this.governess = new FactoryGirl('headGoverness', this.child);
    this.Television = new FactoryGirl('Television');
    this.CableTv = new FactoryGirl('CableTv');

    this.Perimeter = Perimeter;

    this.purpose = 'foo';

    this.options = {
      govern: {
        'can watch': {
          items: [this.Television]
        },
        'cannot watch': {
          items: [this.CableTv]
        }
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

  describe('constructor', function() {
    it('returns new instanceof perimeter', function() {
      expect(this.myPerimeter instanceof this.Perimeter).toBe(true);
    });

    it('sets _purpose to purpose', function() {
      expect(this.myPerimeter._purpose).toBe(this.purpose);
    });

    it('throws an NoPurposeError if purpose is not string', function() {
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

    it('sets _govern to govern', function() {
      expect(this.myPerimeter._govern).toBe(this.options.govern);
    });

    it('defaults _govern to {}', function() {
      expect(this.myStupidPerimeter._govern).toEqual({});
    });

    it('sets _expose to expose', function() {
      expect(this.myPerimeter._expose).toBe(this.options.expose);
    });

    it('defaults _expose to []', function() {
      expect(this.myStupidPerimeter._expose).toEqual([]);
    });
  });

  describe('purpose getter', function() {
    it('returns _purpose', function() {
      this.myPerimeter._purpose = 'heyHou';

      expect(this.myPerimeter.purpose).toEqual(this.myPerimeter.purpose);
    });
  });

  describe('purpose setter', function() {
    it('throws an error if purpose is not a string', function() {
      expect(() => {
        this.myPerimeter.purpose = {};
      }).toThrowError('Perimeter must have a purpose.');

      try {
        this.myPerimeter.purpose = {};
      } catch (e) {
        expect(e instanceof NoPurposeError).toBe(true);
      }
    });

    it('must match a regex', function() {
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

    it('returns the given value', function() {
      expect(this.myPerimeter.purpose = 'foo').toEqual('foo');
    });
  });

  describe('govern getter', function() {
    it('returns _govern', function() {
      expect(this.myPerimeter.govern).toEqual(this.myPerimeter._govern);
    });

    it('returns {} if govern is not an object', function() {
      this.myPerimeter._govern = 'x';
      expect(this.myPerimeter.govern).toEqual({});
    });
  });

  describe('govern setter', function() {
    it('sets _govern to given value', function() {
      const obj = {};
      this.myPerimeter.govern = obj;
      expect(this.myPerimeter._govern).toBe(obj);
    });

    it('returns the given value', function() {
      const obj = {};
      expect(this.myPerimeter.govern = obj).toBe(obj);
    });

    it('sets _govern to {} if not object given', function() {
      const obj = 'x';
      this.myPerimeter.govern = obj;
      expect(this.myPerimeter._govern).toEqual({});
    });
  });

  // TODO: add more specs
});
