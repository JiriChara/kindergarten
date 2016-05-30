import _ from 'lodash';

import FactoryGirl from '../../support/FactoryGirl';

describe('Type', () => {
  let Type;
  let type;

  beforeEach(() => {
    Type = new FactoryGirl('Type');
    type = new Type({}, 'can watch');
  });

  describe('constructor', () => {
    describe('success', () => {
      it('extract the type of the rule', () => {
        _.each([
          'can watch',
          'cannot watch'
        ], (str) => {
          expect((new Type({}, str)).type).toBe('watch');
        });
      });

      it('stores reference to given string', () => {
        _.each([
          'can watch',
          'cannot watch',
          'can see',
          'cannot updateSomeStuff123',
          'can $'
        ], (str) => {
          expect((new Type({}, str)).raw).toBe(str);
        });
      });
    });

    describe('failure', () => {
      it('throws an error if string is not parsable', () => {
        _.each([
          'foo',
          'can foo bar',
          'can ###',
          'can 123foo',
          'cannnot foo'
        ], (str) => {
          const persumption = () => new Type({}, str);

          expect(persumption).toThrowError(
            `Cannot create a rule ${str}. ` +
            'The type of the rule cannot be parsed.'
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

  describe('validate() method', () => {
    describe('success', () => {
      it('returns true if type can be a method name', () => {
        const myType = new Type({}, 'can something');

        _.each([
          'foo',
          'barBaz',
          '$',
          '_foo',
          'foo1'
        ], (t) => {
          myType.type = t;

          expect(myType.validate()).toBe(true);
        });
      });
    });

    describe('failure', () => {
      it('throws an error if type cannot be a function name', () => {
        const myType = new Type({}, 'can something');

        _.each([
          '123foo',
          '>',
          '@',
          '$$$$$:',
          {},
          'abc&'
        ], (t) => {
          myType.type = t;

          const persumption = () => myType.validate();

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
    it('returns true if rule is positive', () => {
      type._isPositive = true;
      expect(type.isPositive()).toBe(true);
    });

    it('returns false if rule is not positive', () => {
      type._isPositive = false;
      expect(type.isPositive()).toBe(false);
    });
  });
});
