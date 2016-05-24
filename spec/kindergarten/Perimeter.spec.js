import { _ } from 'lodash';

import FactoryGirl from '../support/FactoryGirl';
import Perimeter from '../../src/kindergarten/Perimeter';
import {
  NoPurposeError
} from '../../src/kindergarten/errors';

describe('Perimeter', () => {
  let child;
  let sandbox;
  let governess;
  let Television;
  let CableTv;
  let purpose;
  let options;
  let myPerimeter;

  beforeEach(() => {
    child = new FactoryGirl('child');

    sandbox = new FactoryGirl('sandbox', child);

    governess = new FactoryGirl('headGoverness', child);

    Television = new FactoryGirl('Television');

    CableTv = new FactoryGirl('CableTv');

    purpose = 'foo';

    options = {
      govern: {
        'can watch': [Television],
        'cannot watch': [CableTv]
      },

      expose: [
        'watchTv'
      ]
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

    it('sets _purpose to purpose', () => {
      expect(myPerimeter._purpose).toBe(purpose);
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
});
