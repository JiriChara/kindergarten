import { _ } from 'lodash';

import FactoryGirl from '../support/FactoryGirl';
import Sandbox from '../../src/kindergarten/Sandbox';

describe('Sandbox', () => {
  beforeEach(function () {
    this.Sandbox = Sandbox;
    this.child = new FactoryGirl('child', 'watch', 'eat', 'sleep');
    this.HeadGoverness = new FactoryGirl('HeadGoverness');
    this.EasyGoverness = new FactoryGirl('EasyGoverness');
    this.Television = new FactoryGirl('Television');
    this.governess = new FactoryGirl('headGoverness', this.child);
    this.perimeter = new FactoryGirl('perimeter', 'foo', {
      govern: {
        'can watch': [this.Television]
      },

      expose: [
        'watchTv'
      ]
    });

    _.extend(this.perimeter, {
      watchTv() {},
      secretMethod() {}
    });

    this.perimeter1 = new FactoryGirl('perimeter', {
      purpose: 'foo1',

      govern: {
        'can watch': [this.Television]
      },

      expose: [
        'watchTv'
      ],

      watchTv() {},

      secretMethod() {}
    });

    this.perimeter2 = new FactoryGirl('perimeter', {
      purpose: 'foo2',

      govern: {
        'can watch': [this.Television]
      },

      expose: [
        'watchTv'
      ],

      watchTv() {},

      secretMethod() {}
    });

    this.sandbox = new this.Sandbox(this.child);
  });

  describe('constructor', () => {
    it('stores reference to child', function () {
      expect(this.sandbox.child).toBe(this.child);
      expect(this.sandbox._child).toBe(this.child);
    });

    it('set child to null by default', function () {
      const sandbox = new this.Sandbox();
      expect(sandbox.child).toBeNull();
      expect(sandbox._child).toBeNull();
    });

    it('initializes governess to head governess', function () {
      expect(this.sandbox.governess instanceof this.HeadGoverness).toBe(true);
    });

    it('initializes perimeters to empty array', function () {
      expect(this.sandbox._perimeters).toEqual([]);
    });
  });

  describe('child getter', () => {
    it('returns _child', function () {
      expect(this.sandbox.child).toBe(this.sandbox._child);
    });

    it('returns null if _child is undefined', function () {
      this.sandbox._child = undefined;
      expect(this.sandbox.child).toBeNull();
    });
  });

  describe('child setter', () => {
    it('sets _child to given one', function () {
      const customChild = 'foo';

      this.sandbox.child = customChild;

      expect(this.sandbox._child).toBe(customChild);
    });

    it('sets child to null by default', function () {
      this.sandbox.child = undefined;

      expect(this.sandbox._child).toBe(null);
    });

    it('returns given value', function () {
      const customChild = 'foo';

      expect(this.sandbox.child = customChild).toBe(customChild);
    });
  });

  describe('governess getter', () => {
    it('returns _governess', function () {
      this.sandbox._governess = this.governess;
      expect(this.sandbox.governess).toBe(this.governess);
    });

    it('returns HeadGoverness by default', function () {
      this.sandbox._governess = {};
      expect(this.sandbox.governess instanceof this.HeadGoverness).toBe(true);
    });
  });

  describe('governess setter', () => {
    it('sets _governess to given one', function () {
      this.sandbox.governess = this.governess;
      expect(this.sandbox.governess).toBe(this.governess);
    });

    it('returns the given value', function () {
      expect(this.sandbox.governess = this.governess).toEqual(
        this.governess
      );
    });

    it('set governess to HeadGoverness by default', function () {
      this.sandbox.governess = 'foo';
      expect(this.sandbox._governess instanceof this.HeadGoverness).toBe(true);

      this.sandbox.governess = {};
      expect(this.sandbox._governess instanceof this.HeadGoverness).toBe(true);
    });
  });

  describe('loadPerimeter() method', () => {
    it('throws an error if perimeter is not perimeter', function () {
      _.each([
        {}, [], 'foo', undefined, null
      ], (notAPerimeter) => {
        const assumption = () => this.sandbox.loadPerimeter(notAPerimeter);

        expect(assumption).toThrowError(
          'Module must be instance of Kindergarten.Perimeter.'
        );
      });
    });

    it('skips the perimeter if sandbox already has it', function () {
      this.sandbox.loadPerimeter(this.perimeter);
      expect(this.sandbox.loadPerimeter(this.perimeter)).toEqual(0);
      expect(this.sandbox._perimeters.length).toEqual(1);
    });

    it('adds perimeter into _perimeters array', function () {
      expect(_.includes(this.sandbox._perimeters, this.perimeter)).toBe(false);
      this.sandbox.loadPerimeter(this.perimeter);
      expect(_.includes(this.sandbox._perimeters, this.perimeter)).toBe(true);
    });

    it('sets the governess of perimeter if it does\'t have one', function () {
      expect(this.perimeter.governess).toBeNull();
      this.sandbox.loadModule(this.perimeter);
      expect(this.perimeter.governess instanceof this.HeadGoverness).toBe(true);

      this.sandbox.governess = this.EasyGoverness;
    });

    it('returns the count of addded perimeters', function () {
      expect(this.sandbox.loadPerimeter(this.perimeter)).toBe(1);
      expect(this.sandbox.loadPerimeter(this.perimeter)).toBe(0);
      expect(this.sandbox.loadPerimeter(this.perimeter1, this.perimeter2)).toBe(2);
    });
  });

  describe('loadModule() method', () => {
    it('calls loadPerimeter() method', function () {
      spyOn(this.sandbox, 'loadPerimeter');

      this.sandbox.loadModule(this.perimeter);

      expect(this.sandbox.loadPerimeter).toHaveBeenCalledWith(
        this.perimeter
      );
    });

    it('returns the count of addded perimeters', function () {
      expect(this.sandbox.loadModule(this.perimeter)).toBe(1);
    });
  });
});
