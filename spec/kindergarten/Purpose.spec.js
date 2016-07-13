import { _ } from 'lodash';

import FactoryGirl from '../support/FactoryGirl';

describe('Purpose', () => {
  let Purpose;
  let Perimeter;
  let Logger;
  let HeadGoverness;
  let ArgumentError;
  let RestrictedMethodError;
  let NoExposedMethodError;
  let sandbox;
  let purposeName;
  let purpose;

  beforeEach(() => {
    Purpose = new FactoryGirl('Purpose');
    Perimeter = new FactoryGirl('Perimeter');
    Logger = new FactoryGirl('Logger');
    HeadGoverness = new FactoryGirl('HeadGoverness');
    ArgumentError = new FactoryGirl('ArgumentError');
    RestrictedMethodError = new FactoryGirl('RestrictedMethodError');
    NoExposedMethodError = new FactoryGirl('NoExposedMethodError');
    sandbox = new FactoryGirl('sandbox');
    purposeName = 'foo';
    purpose = new Purpose(
      purposeName,
      sandbox
    );
  });

  describe('constructor', () => {
    it('stores reference to name', () => {
      expect(purpose._name).toEqual(purposeName);
    });

    it('stores reference to sandbox', () => {
      expect(purpose._sandbox).toBe(sandbox);
    });

    it('throws an error if sandbox is not a sandbox', () => {
      expect(() => new Purpose('foo', {}))
        .toThrowError('Purpose must have a sandbox.');
    });

    it('throws an error if name is missing', () => {
      expect(() => new Purpose(undefined, sandbox))
        .toThrowError('Purpose must have a name.');
    });
  });

  describe('_loadPerimeter() method', () => {
    it('throws an error when perimeter is no a perimeter', () => {
      const nonPerimeter = new FactoryGirl('fake');

      const noPerimeterArg = () => {
        purpose._loadPerimeter(nonPerimeter);
      };

      expect(noPerimeterArg).toThrowError('Cannot load perimeter. Is it an instance of perimeter?');

      try {
        noPerimeterArg();
      } catch (e) {
        expect(e instanceof ArgumentError).toBe(true);
      }
    });

    it('throws an error if method name is restricted', () => {
      _.each([
        '1', '^^', 'constructor', 'class'
      ], (restricted) => {
        const restrictedLambda = () => {
          purpose._loadPerimeter(
            new Perimeter(
              purposeName,
              {
                expose: [restricted]
              }
            )
          );
        };

        expect(restrictedLambda).toThrowError(
          `Cannot create a method ${restricted}. It is restricted.`
        );

        try {
          restrictedLambda();
        } catch (e) {
          expect(e instanceof RestrictedMethodError);
        }
      });
    });

    it('shows warning when method already exists', () => {
      spyOn(Logger, 'warn');

      const perimeter = new Perimeter(
        purposeName,
        {
          expose: ['foo', 'foo']
        }
      );

      perimeter.foo = _.noop;

      purpose._loadPerimeter(perimeter);

      expect(Logger.warn).toHaveBeenCalledWith(
        `Overriding already sandboxed method ${purpose._name}.foo.`
      );
    });

    it('exposes all methods to purpose with right context', () => {
      const perimeter = new Perimeter(
        purposeName,
        {
          expose: ['foo', 'bar']
        }
      );

      const childName = 'Bob';

      perimeter.child = {
        name: childName
      };

      perimeter.governess = new HeadGoverness(perimeter.child);

      _.extend(perimeter, {
        foo() {
          return `foo ${this.child.name}`;
        },

        bar() {
          return `bar ${this.child.name}`;
        }
      });

      purpose._loadPerimeter(perimeter);

      expect(purpose.foo()).toEqual(
        `foo ${childName}`
      );

      expect(purpose.bar()).toEqual(
        `bar ${childName}`
      );
    });

    it('throws an error if exposed method does not exist', () => {
      const nonExistingMethodName = 'foo';

      const perimeter = new Perimeter(
        purposeName,
        {
          expose: [nonExistingMethodName]
        }
      );

      const assumption = () => { purpose._loadPerimeter(perimeter); };

      expect(assumption).toThrowError(
        `The exposed method ${nonExistingMethodName}` +
        ` is not defined on perimeter ${purposeName}.`
      );

      try {
        assumption();
      } catch (e) {
        expect(e instanceof NoExposedMethodError).toBe(true);
      }
    });
  });

  describe('isAllowed() method', () => {
    let perimeter;
    let mySandbox;

    beforeEach(() => {
      mySandbox = new (new FactoryGirl('Sandbox'))({});

      perimeter = new Perimeter({
        purpose: 'foo',
        govern: {
          'can watch': () => true,
          'cannot play': () => true
        }
      });

      mySandbox.loadModule(perimeter);
    });

    it('should return true if child is allowed', () => {
      expect(mySandbox.foo.isAllowed('watch')).toBeTrue();
    });

    it('should return false if child is not allowed', () => {
      expect(mySandbox.foo.isAllowed('play')).toBeFalse();
    });
  });

  describe('isNotAllowed() method', () => {
    let perimeter;
    let mySandbox;

    beforeEach(() => {
      mySandbox = new (new FactoryGirl('Sandbox'))({});

      perimeter = new Perimeter({
        purpose: 'foo',
        govern: {
          'can watch': () => true,
          'cannot play': () => true
        }
      });

      mySandbox.loadModule(perimeter);
    });

    it('should return false if child is allowed', () => {
      expect(mySandbox.foo.isNotAllowed('watch')).toBeFalse();
    });

    it('should return true if child is not allowed', () => {
      expect(mySandbox.foo.isNotAllowed('play')).toBeTrue();
    });
  });
});
