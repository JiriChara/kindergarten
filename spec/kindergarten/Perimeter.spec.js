import { _ } from 'lodash';

import FactoryGirl from '../support/FactoryGirl';
import Perimeter from '../../src/Perimeter';
import {
  NoPurposeError
} from '../../src/errors';

describe('Perimeter', () => {
  let child;
  let sandbox;
  let governess;
  let Television;
  let CableTv;
  let purpose;
  let options;
  let myPerimeter;
  let govern;
  let expose;
  let method1;
  let method2;

  beforeEach(() => {
    child = new FactoryGirl('child');

    sandbox = new FactoryGirl('sandbox', child);

    governess = new FactoryGirl('headGoverness', child);

    Television = new FactoryGirl('Television');

    CableTv = new FactoryGirl('CableTv');

    purpose = 'foo';

    govern = {
      'can watch': [Television],
      'cannot watch': [CableTv]
    };

    expose = [
      'watchTv'
    ];

    method1 = () => true;
    method2 = () => false;

    options = {
      govern,

      expose,

      governess,

      method1,

      method2
    };

    myPerimeter = new Perimeter(
      purpose,
      options
    );
  });

  describe('constructor', () => {
    it('returns new instanceof perimeter', () => {
      expect(myPerimeter instanceof Perimeter).toBe(true);
    });

    it('sets purpose to given one', () => {
      expect(myPerimeter.purpose).toBe(purpose);
    });

    it('throws an NoPurposeError if purpose is not string', () => {
      _.each([
        {}, [], null, undefined, Perimeter
      ], (x) => {
        expect(() => {
          myPerimeter = new Perimeter(x);
        }).toThrowError('Perimeter must have a purpose.');

        try {
          myPerimeter = new Perimeter(x);
        } catch (e) {
          expect(e instanceof NoPurposeError).toBe(true);
        }
      });
    });

    it('sets govern', () => {
      expect(myPerimeter.govern).toBe(govern);
    });

    it('sets expose', () => {
      expect(myPerimeter.expose).toBe(expose);
    });

    it('sets governess', () => {
      expect(myPerimeter.governess).toBe(governess);
    });

    it('teaches governess rules', () => {
      expect(myPerimeter.governess.isAllowed('watch', Television)).toBeTrue();
      expect(myPerimeter.governess.isAllowed('watch', CableTv)).toBeFalse();
    });

    it('adds all methods to perimeter', () => {
      expect(myPerimeter.method1).toBe(method1);
      expect(myPerimeter.method2).toBe(method2);
    });

    it('adds govern rules from can', () => {
      const method = () => true;
      const regex = /foo/;
      const obj = {};

      const perimeter = new Perimeter({
        purpose: 'foo',

        can: {
          method,
          regex,
          obj
        }
      });

      expect(perimeter.govern['can method']).toBe(method);
      expect(perimeter.govern['can regex']).toBe(regex);
      expect(perimeter.govern['can obj']).toBe(obj);
    });

    it('adds govern rules from cannot', () => {
      const method = () => true;
      const regex = /foo/;
      const obj = {};

      const perimeter = new Perimeter({
        purpose: 'foo',

        cannot: {
          method,
          regex,
          obj
        }
      });

      expect(perimeter.govern['cannot method']).toBe(method);
      expect(perimeter.govern['cannot regex']).toBe(regex);
      expect(perimeter.govern['cannot obj']).toBe(obj);
    });
  });

  describe('purpose getter', () => {
    it('returns _purpose', () => {
      myPerimeter._purpose = 'heyHou';

      expect(myPerimeter.purpose).toEqual(myPerimeter.purpose);
    });
  });

  describe('purpose setter', () => {
    it('throws an error if purpose is not a string', () => {
      expect(() => {
        myPerimeter.purpose = {};
      }).toThrowError('Perimeter must have a purpose.');

      try {
        myPerimeter.purpose = {};
      } catch (e) {
        expect(e instanceof NoPurposeError).toBe(true);
      }
    });

    it('must match a regex', () => {
      const wrong = [
        '123', 'A', 'abc12$?', '_!'
      ];

      const funky = [
        '_foo', '$123', 'a'
      ];

      _.each(wrong, (x) => {
        expect(() => {
          myPerimeter = new Perimeter(x);
        }).toThrowError('Perimeter must have a purpose.');

        try {
          myPerimeter = new Perimeter(x);
        } catch (e) {
          expect(e instanceof NoPurposeError).toBe(true);
        }
      });

      _.each(funky, (x) => {
        expect(() => {
          myPerimeter = new Perimeter(x);
        }).not.toThrowError();
      });
    });

    it('returns the given value', () => {
      expect(myPerimeter.purpose = 'foo').toEqual('foo');
    });
  });

  describe('getPurpose() method', () => {
    it('returns purpose', () => {
      expect(myPerimeter.getPurpose()).toBe(purpose);
    });
  });

  describe('sandbox getter', () => {
    it('returns value of _sandbox', () => {
      myPerimeter._sandbox = sandbox;
      expect(myPerimeter.sandbox).toBe(myPerimeter._sandbox);
    });
  });

  describe('sandbox setter', () => {
    it('sets _sandbox to given one', () => {
      myPerimeter.sandbox = sandbox;
      expect(myPerimeter._sandbox).toBe(sandbox);
    });

    it('sets child to child of the sandbox', () => {
      myPerimeter.sandbox = sandbox;
      expect(myPerimeter.child).toBe(sandbox.child);
    });

    it('returns the given value', () => {
      expect(myPerimeter.sandbox = sandbox).toEqual(sandbox);
    });

    it('throw an error if sandbox is not sanbox', () => {
      expect(() => {
        myPerimeter.sandbox = {};
      }).toThrowError('Perimeter must be imported into a sandbox.');
    });
  });

  describe('getSandbox() method', () => {
    it('returns the sandbox of the perimeter', () => {
      myPerimeter._sandbox = sandbox;
      expect(myPerimeter.getSandbox()).toBe(sandbox);
    });
  });

  describe('governess getter', () => {
    it('returns _governess', () => {
      myPerimeter._governess = governess;
      expect(myPerimeter.governess).toBe(governess);
    });

    it('returns null by default', () => {
      myPerimeter._governess = {};
      expect(myPerimeter.governess).toBeNull();
    });
  });

  describe('governess setter', () => {
    it('sets _governess to given one', () => {
      myPerimeter.governess = governess;
      expect(myPerimeter.governess).toBe(governess);
    });

    it('returns the given value', () => {
      expect(myPerimeter.governess = governess).toEqual(
        governess
      );
    });

    it('set governess to null by default', () => {
      myPerimeter.governess = 'foo';
      expect(myPerimeter._governess).toBeNull();

      myPerimeter.governess = {};
      expect(myPerimeter._governess).toBeNull();
    });
  });

  describe('getGoverness() method', () => {
    it('returns governess', () => {
      myPerimeter._governess = governess;
      expect(myPerimeter.getGoverness()).toBe(governess);
    });

    it('returns null by default', () => {
      myPerimeter._governess = {};
      expect(myPerimeter.getGoverness()).toBeNull();
    });
  });

  describe('guard() method', () => {
    it('throws an error if child cannot do the action', () => {
      expect(() => {
        myPerimeter.guard('watch', CableTv);
      }).toThrowError('Child is not allowed to watch the target.');
    });

    it('calls guard method of the governess', () => {
      spyOn(governess, 'guard');
      myPerimeter.guard('watch', CableTv);
      expect(governess.guard).toHaveBeenCalledWith('watch', CableTv);
    });

    it('does not throw an error if child can perfom an action', () => {
      expect(() => {
        myPerimeter.guard('watch', Television);
      }).not.toThrowError();
    });
  });

  describe('governed() method', () => {
    it('delegates call to governess', () => {
      const cb = () => true;
      const args = [];
      spyOn(governess, 'governed');
      myPerimeter.governed(cb, args);
      expect(governess.governed).toHaveBeenCalledWith(cb, args);
    });

    it('returs the result of the callback', () => {
      const cb = () => true;
      const args = [];
      expect(myPerimeter.governed(cb, args)).toBe(cb());
    });
  });

  describe('isAllowed() method', () => {
    it('returns false if child cannot do the action', () => {
      expect(myPerimeter.isAllowed('watch', CableTv)).toBeFalse();
    });

    it('returns true if child can do the action', () => {
      expect(myPerimeter.isAllowed('watch', Television)).toBeTrue();
    });

    it('calls isAllowed method of the governess', () => {
      spyOn(governess, 'isAllowed');
      myPerimeter.isAllowed('watch', CableTv);
      expect(governess.isAllowed).toHaveBeenCalledWith('watch', CableTv);
    });
  });

  describe('isNotAllowed() method', () => {
    it('returns false if child cannot do the action', () => {
      expect(myPerimeter.isNotAllowed('watch', CableTv)).toBeTrue();
    });

    it('returns true if child can do the action', () => {
      expect(myPerimeter.isNotAllowed('watch', Television)).toBeFalse();
    });

    it('calls isNotAllowed method of the governess', () => {
      spyOn(governess, 'isNotAllowed');
      myPerimeter.isNotAllowed('watch', CableTv);
      expect(governess.isNotAllowed).toHaveBeenCalledWith('watch', CableTv);
    });
  });
});
