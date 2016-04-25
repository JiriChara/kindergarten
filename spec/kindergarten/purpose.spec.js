import { _ } from 'lodash';

import Purpose from '../../src/kindergarten/purpose';
import FactoryGirl from '../support/factory-girl';

describe('Purpose', () => {
  beforeEach(function () {
    this.Purpose = Purpose;
    this.Perimeter = new FactoryGirl('Perimeter');
    this.Logger = new FactoryGirl('Logger');
    this.HeadGoverness = new FactoryGirl('HeadGoverness');
    this.ArgumentError = new FactoryGirl('ArgumentError');
    this.RestrictedMethodError = new FactoryGirl('RestrictedMethodError');
    this.NoExposedMethodError = new FactoryGirl('NoExposedMethodError');
    this.NoExposedMethodsError = new FactoryGirl('NoExposedMethodsError');
    this.sandbox = new FactoryGirl('sandbox');
    this.purposeName = 'foo';
    this.purpose = new this.Purpose(
      this.purposeName,
      this.sandbox
    );
  });

  describe('constructor', () => {
    it('stores reference to name', function () {
      expect(this.purpose._name).toEqual(this.purposeName);
    });

    it('stores reference to sandbox', function () {
      expect(this.purpose._sandbox).toBe(this.sandbox);
    });
  });

  describe('_addPerimeter() method', () => {
    it('throws an error when perimeter is no a perimeter', function () {
      const nonPerimeter = new FactoryGirl('fake');

      const noPerimeterArg = () => {
        this.purpose._addPerimeter(nonPerimeter);
      };

      expect(noPerimeterArg).toThrowError('Cannot add perimeter. Is it a perimeter?');

      try {
        noPerimeterArg();
      } catch (e) {
        expect(e instanceof this.ArgumentError).toBe(true);
      }
    });

    it('throws an error if method name is restricted', function () {
      _.each([
        '1', '^^', 'constructor', 'class'
      ], (restricted) => {
        const restrictedLambda = () => {
          this.purpose._addPerimeter(
            new this.Perimeter(
              this.purposeName,
              {
                expose: [restricted]
              }
            )
          );
        };

        expect(restrictedLambda).toThrowError(
          `Method name ${restricted} is restricted.`
        );

        try {
          restrictedLambda();
        } catch (e) {
          expect(e instanceof this.RestrictedMethodError);
        }
      });
    });

    it('shows warning when method already exists', function () {
      spyOn(this.Logger, 'warn');

      const perimeter = new this.Perimeter(
        this.purposeName,
        {
          expose: ['foo', 'foo']
        }
      );

      perimeter.foo = _.noop;

      this.purpose._addPerimeter(perimeter);

      expect(this.Logger.warn).toHaveBeenCalledWith(
        `Overriding already sandboxed method ${this.purpose._name}.foo.`
      );
    });

    it('exposes all methods to purpose with right context', function () {
      const perimeter = new this.Perimeter(
        this.purposeName,
        {
          expose: ['foo', 'bar']
        }
      );

      const childName = 'Bob';

      perimeter.child = {
        name: childName
      };

      perimeter.governess = new this.HeadGoverness(perimeter.child);

      _.extend(perimeter, {
        foo() {
          return `foo ${this.child.name}`;
        },

        bar() {
          return `bar ${this.child.name}`;
        }
      });

      this.purpose._addPerimeter(perimeter);

      expect(this.purpose.foo()).toEqual(
        `foo ${childName}`
      );

      expect(this.purpose.bar()).toEqual(
        `bar ${childName}`
      );
    });

    it('throws an error if exposed method does not exist', function () {
      const nonExistingMethodName = 'foo';

      const perimeter = new this.Perimeter(
        this.purposeName,
        {
          expose: [nonExistingMethodName]
        }
      );

      const assumption = () => { this.purpose._addPerimeter(perimeter); };

      expect(assumption).toThrowError(
        `The exposed method ${nonExistingMethodName}` +
        ` is not defined on perimeter ${this.purposeName}`
      );

      try {
        assumption();
      } catch (e) {
        expect(e instanceof this.NoExposedMethodError).toBe(true);
      }
    });
  });
});
