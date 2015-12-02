import {_} from 'lodash';

import {Sandbox} from '../../lib/kindergarten/sandbox';
import {HeadGoverness} from '../../lib/kindergarten/governesses/head-governess';
import {Perimeter} from '../../lib/kindergarten/perimeter';

xdescribe('Sandbox', function() {
  beforeEach(function() {
    this.Sandbox = Sandbox;
    this.HeadGoverness = HeadGoverness;
    this.Perimeter = Perimeter;
    this.Television = function() {};

    this.child = function() {};

    this.sandbox = new this.Sandbox(this.child);

    this.MyCoolPerimeter = this.Perimeter.create(
      'foo', {
        govern: {
          'can watch': {
            items: [this.Television]
          }
        },

        expose: [
          'watchTv'
        ]
      }
    );

    this.MyCoolPerimeter.watchTv = function() {};
    this.MyCoolPerimeter.secretMethod = function() {};
  });

  describe('constructor', function() {
    it('stores reference to child', function() {
      expect(this.sandbox.child).toBe(this.child);
    });

    it('initializes governess to head governess', function() {
      expect(this.sandbox.governess instanceof this.HeadGoverness).toBe(true);
    });

    it('initializes purpose to empty object', function() {
      expect(this.sandbox.purpose).toEqual({});
    });

    it('initializes perimeters to empty array', function() {
      expect(this.sandbox.perimeters).toEqual([]);
    });

    it('initializes _unguarded to false', function() {
      expect(this.sandbox._unguarded).toBe(false);
    });
  });

  describe('extendPerimeter', function() {
    it('throws ArgumentError if perimeter is not Perimeter', function() {
      _.each([
        'foo', {}, [], undefined, null
      ], (wrong) => {
        expect(() => {
          this.sandbox.extendPerimeter(wrong);
        }).toThrowError(
          'Module must inherit from Kindergarten.Perimeter.'
        );
      });
    });

    it('calls _extendPurpose with the given perimeter', function() {
      spyOn(this.sandbox, '_extendPurpose');

      this.sandbox.extendPerimeter(this.MyCoolPerimeter);

      expect(this.sandbox._extendPurpose).toHaveBeenCalledWith(
        this.MyCoolPerimeter
      );
    });
  });
});
