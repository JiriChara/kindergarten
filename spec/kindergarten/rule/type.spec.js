import _ from 'lodash';

import FactoryGirl from '../../support/FactoryGirl';

describe('Type', () => {
  beforeEach(function () {
    this.Type = new FactoryGirl('Type');
    this.type = new this.Type('can watch');
  });

  describe('constructor', () => {
    describe('success', () => {
      it('extract the type of the rule', function () {
        _.each([
          'can watch',
          'cannot watch'
        ], (str) => {
          expect((new this.Type(str))._type).toBe('watch');
        });
      });

      it('stores reference to given string', function () {
        _.each([
          'can watch',
          'cannot watch',
          'can see',
          'cannot updateSomeStuff123',
          'can $'
        ], (str) => {
          expect((new this.Type(str))._str).toBe(str);
        });
      });
    });

    describe('failure', () => {
      it('throws an error if string is not parsable', function () {
        _.each([
          'foo',
          'can foo bar',
          'can ###',
          'can 123foo',
          'cannnot foo'
        ], (str) => {
          const persumption = () => new this.Type(str);

          expect(persumption).toThrowError(
            `Cannot create a rule ${str}. ` +
            `The type of the rule cannot be parsed.`
          );

          try {
            persumption();
          } catch (e) {
            expect(
              e instanceof (new FactoryGirl('WrongRuleDefinition'))
            ).toBe(true);
          }
        });
      });
    });
  });

  describe('_validate() method', () => {
    describe('success', () => {
      it('returns true if type can be a method name', function () {
        const myType = new this.Type('can something');

        _.each([
          'foo',
          'barBaz',
          '$',
          '_foo',
          'foo1'
        ], (type) => {
          myType._type = type;

          expect(myType._validate()).toBe(true);
        });
      });
    });

    describe('failure', () => {
      it('throws an error if type cannot be a function name', function () {
        const myType = new this.Type('can something');

        _.each([
          '123foo',
          '>',
          '@',
          '$$$$$:',
          {},
          'abc&'
        ], (type) => {
          myType._type = type;

          const persumption = () => myType._validate();

          expect(persumption).toThrowError(/^Cannot create a rule.+$/);

          try {
            persumption();
          } catch (e) {
            expect(
              e instanceof (new FactoryGirl('WrongRuleDefinition'))
            ).toBe(true);
          }
        });
      });
    });
  });

  describe('isPositive() method', () => {
    it('returns true if rule is positive', function () {
      this.type._isPositive = true;
      expect(this.type.isPositive()).toBe(true);
    });

    it('returns false if rule is not positive', function () {
      this.type._isPositive = false;
      expect(this.type.isPositive()).toBe(false);
    });
  });

  describe('getType() method', () => {
    it('returns the _type', function () {
      const customType = 'foo';
      this.type._type = customType;
      expect(this.type.getType()).toBe(customType);
    });
  });
});
