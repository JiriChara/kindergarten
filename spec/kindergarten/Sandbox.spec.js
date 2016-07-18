import { _ } from 'lodash';

import FactoryGirl from '../support/FactoryGirl';
import Sandbox from '../../src/kindergarten/Sandbox';

describe('Sandbox', () => {
  let child;
  let HeadGoverness;
  let EasyGoverness;
  let Television;
  let governess;
  let perimeter;
  let perimeter1;
  let perimeter2;
  let sandbox;

  beforeEach(() => {
    child = new FactoryGirl('child', 'watch', 'eat', 'sleep');
    HeadGoverness = new FactoryGirl('HeadGoverness');
    EasyGoverness = new FactoryGirl('EasyGoverness');
    Television = new FactoryGirl('Television');
    governess = new FactoryGirl('headGoverness', child);
    perimeter = new FactoryGirl('perimeter', 'foo', {
      govern: {
        'can watch': [Television]
      },

      expose: [
        'watchTv'
      ]
    });

    _.extend(perimeter, {
      watchTv() {},
      secretMethod() {}
    });

    perimeter1 = new FactoryGirl('perimeter', {
      purpose: 'foo1',

      govern: {
        'can watch': [Television]
      },

      expose: [
        'watchTv'
      ],

      watchTv() {},

      secretMethod() {}
    });

    perimeter2 = new FactoryGirl('perimeter', {
      purpose: 'foo2',

      govern: {
        'can watch': [Television]
      },

      expose: [
        'watchTv'
      ],

      watchTv() {},

      secretMethod() {}
    });

    sandbox = new Sandbox(child);
  });

  describe('constructor', () => {
    it('stores reference to child', () => {
      expect(sandbox.child).toBe(child);
    });

    it('set child to null by default', () => {
      const mySand = new Sandbox();
      expect(mySand.child).toBeNull();
    });

    it('initializes governess to head governess', () => {
      expect(sandbox.governess instanceof HeadGoverness).toBe(true);
    });

    it('sets governess to the given one', () => {
      const myGoverness = new HeadGoverness(child);
      const mySandbox = new Sandbox(child, {
        governess: myGoverness
      });

      expect(mySandbox.governess).toBe(myGoverness);
    });

    it('initializes perimeters to empty array', () => {
      expect(sandbox._perimeters).toEqual([]);
    });

    it('sets perimeters if given', () => {
      const perimeters = [
        perimeter1,
        perimeter2
      ];

      const mySandbox = new Sandbox(child, {
        perimeters
      });

      expect(mySandbox._perimeters).toEqual(perimeters);
    });
  });

  describe('governess getter', () => {
    it('returns _governess', () => {
      sandbox._governess = governess;
      expect(sandbox.governess).toBe(governess);
    });
  });

  describe('governess setter', () => {
    it('sets _governess to given one', () => {
      sandbox.governess = governess;
      expect(sandbox.governess).toBe(governess);
    });

    it('returns the given value', () => {
      expect(sandbox.governess = governess).toEqual(
        governess
      );
    });

    it('throws an error if governess is not an instance of HeadGoverness', () => {
      expect(() => {
        sandbox.governess = 'foo';
      }).toThrowError('Governess must be an instance of HeadGoverness.');
    });
  });

  describe('loadPerimeter() method', () => {
    it('throws an error if perimeter is not perimeter', () => {
      _.each([
        {}, [], 'foo', undefined, null
      ], (notAPerimeter) => {
        const assumption = () => sandbox.loadPerimeter(notAPerimeter);

        expect(assumption).toThrowError(
          'Module must be instance of Kindergarten.Perimeter.'
        );
      });
    });

    it('skips the perimeter if sandbox already has it', () => {
      sandbox.loadPerimeter(perimeter);
      expect(sandbox.loadPerimeter(perimeter)).toEqual(0);
      expect(sandbox._perimeters.length).toEqual(1);
    });

    it('adds perimeter into _perimeters array', () => {
      expect(_.includes(sandbox._perimeters, perimeter)).toBe(false);
      sandbox.loadPerimeter(perimeter);
      expect(_.includes(sandbox._perimeters, perimeter)).toBe(true);
    });

    it('sets the governess of perimeter if it does\'t have one', () => {
      expect(perimeter.governess).toBeNull();
      sandbox.loadModule(perimeter);
      expect(perimeter.governess instanceof HeadGoverness).toBe(true);

      sandbox.governess = new EasyGoverness(sandbox.child);
      expect(perimeter.governess instanceof EasyGoverness).toBe(true);
    });

    it('returns the count of addded perimeters', () => {
      expect(sandbox.loadPerimeter(perimeter)).toBe(1);
      expect(sandbox.loadPerimeter(perimeter)).toBe(0);
      expect(sandbox.loadPerimeter(perimeter1, perimeter2)).toBe(2);
    });
  });

  describe('loadModule() method', () => {
    it('calls loadPerimeter() method', () => {
      spyOn(sandbox, 'loadPerimeter');

      sandbox.loadModule(perimeter);

      expect(sandbox.loadPerimeter).toHaveBeenCalledWith(
        perimeter
      );
    });

    it('returns the count of addded perimeters', () => {
      expect(sandbox.loadModule(perimeter)).toBe(1);
    });
  });

  describe('getPerimeters() method', () => {
    it('returns empty array by default', () => {
      expect(sandbox.getPerimeters()).toEqual([]);
    });

    it('returns list of loaded perimeters', () => {
      sandbox.loadModule(perimeter1, perimeter2);
      expect(sandbox.getPerimeters().length).toBe(2);
      expect(sandbox.getPerimeters()).toContain(perimeter1);
      expect(sandbox.getPerimeters()).toContain(perimeter2);
    });
  });

  describe('getPerimeter() method', () => {
    it('returns null if perimeter not found', () => {
      expect(sandbox.getPerimeter('foo')).toBeNull();
    });

    it('returns perimeter by it\'s purpose', () => {
      sandbox.loadModule(perimeter1, perimeter2);
      expect(sandbox.getPerimeter('foo1')).toBe(perimeter1);
      expect(sandbox.getPerimeter('foo2')).toBe(perimeter2);
    });
  });

  describe('hasPerimeter() method', () => {
    it('returns true if sandbox has a perimeter by purpose', () => {
      sandbox.loadModule(perimeter1);
      expect(sandbox.hasPerimeter('foo1')).toBeTrue();
    });

    it('returns true if sandbox has a perimeter', () => {
      sandbox.loadModule(perimeter1);
      expect(sandbox.hasPerimeter(perimeter1)).toBeTrue();
    });

    it('returns false if sandbox has a no such perimeter', () => {
      expect(sandbox.hasPerimeter('foo')).toBeFalse();
    });
  });

  describe('isAllowed', () => {
    it('delegates the call to governess', () => {
      spyOn(sandbox.governess, 'isAllowed');
      sandbox.isAllowed('watch', Television);

      expect(sandbox.governess.isAllowed).toHaveBeenCalledWith(
        'watch',
        Television
      );
    });
  });

  describe('isNotAllowed', () => {
    it('delegates the call to governess', () => {
      spyOn(sandbox.governess, 'isNotAllowed');
      sandbox.isNotAllowed('watch', Television);

      expect(sandbox.governess.isNotAllowed).toHaveBeenCalledWith(
        'watch',
        Television
      );
    });
  });

  describe('_extendPurpose() method', () => {
    it('creates new purpose on the sandbox', () => {
      const myPerimeter = new (new FactoryGirl('Perimeter'))('myPurpose');
      sandbox._extendPurpose(myPerimeter);
      expect(sandbox.myPurpose instanceof (new FactoryGirl('Purpose'))).toBeTrue();
    });

    it('throws an error if purpose name is not allowed', () => {
      const myPerimeter = new (new FactoryGirl('Perimeter'))('validPurpose');
      myPerimeter._purpose = '%%invalidPurpose';
      expect(() => {
        sandbox._extendPurpose(myPerimeter);
      }).toThrowError('Cannot expose purpose %%invalidPurpose to sandbox. Restricted method name.');
    });

    it('exposes methods to purpose', () => {
      const foo = () => 'foo';
      const myPerimeter = new (new FactoryGirl('Perimeter'))('foo', {
        expose: [
          'foo'
        ],

        foo,

        governess
      });

      sandbox._extendPurpose(myPerimeter);

      expect(sandbox.foo.foo()).toBe('foo');
    });
  });

  describe('_learnRules() method', () => {
    it('teaches governess rules from all perimeters', () => {
      const myPerimeter = new (new FactoryGirl('Perimeter'))({
        purpose: 'foo',

        govern: {
          'can play': () => true,
          'cannot watch': /TV/
        }
      });

      sandbox._perimeters = [
        myPerimeter
      ];

      expect(sandbox.governess.rules.length).toBe(0);

      sandbox._learnRules();

      expect(sandbox.governess.rules.length).toBe(2);
    });
  });
});
