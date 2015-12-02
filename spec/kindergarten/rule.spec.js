import {_} from 'lodash';

import {Rule} from '../../lib/kindergarten/rule';
import {WrongRuleDefinition} from '../../lib/kindergarten/errors';
import {ArgumentError} from '../../lib/kindergarten/errors';

describe('Rule', function() {
  beforeEach(function() {
    this.Rule = Rule;
    this.Television = function() {};
    this.CableTV = function() {};
  });

  describe('create() static method', function() {
    describe('correct definition', function() {
      beforeEach(function() {
        this.rule1 = this.Rule.create('can watch', {
          items: [
            this.Television
          ]
        });

        this.rule2 = this.Rule.create('cannot watch', {
          items: [
            this.Television
          ]
        });

        this.rule3 = this.Rule.create('cannot watch', {
          items: [
            this.Television,
            this.CableTV
          ]
        });

        this.customVerifyMethod = function() {
          return true;
        };
        this.rule4 = this.Rule.create('can watch', {
          rule: this.customVerifyMethod
        });
        this.rule5 = this.Rule.create('cannot watch', {
          rule: this.customVerifyMethod
        });
      });

      it('creates new rule with type', function() {
        expect(this.rule1.type).toEqual('watch');
      });

      it('creates new rule with items', function() {
        expect(this.rule1.items).toEqual([this.Television]);

        expect(this.rule3.items).toEqual([
          this.Television,
          this.CableTV
        ]);

        expect(this.rule4.items).toEqual([]);
      });

      it('creates new rule with verifyMethod', function() {
        expect(this.rule1.verifyMethod()).toEqual(true);
        expect(this.rule2.verifyMethod()).toEqual(false);
        expect(this.rule4.verifyMethod()).toEqual(this.customVerifyMethod());
        expect(this.rule5.verifyMethod()).toEqual(!this.customVerifyMethod());
      });

      it('creates new rule with isPositive', function() {
        expect(this.rule1.isPositive).toEqual(true);
        expect(this.rule2.isPositive).toEqual(false);
      });
    });

    describe('wrong definition', function() {
      it('throws an WrongRuleDefinition error when no items or rule given', function() {
        _.each([
          {}, [], 'string', undefined, null
        ], (item) => {
          expect(() => {
            this.rule1 = this.Rule.create('can watch', item);
          }).toThrowError('Cannot parse rule "can watch". No items or rule given.');

          try {
            this.rule1 = this.Rule.create('can watch', item);
          } catch (e) {
            expect(e instanceof WrongRuleDefinition).toEqual(true);
          }
        });
      });

      it('throws an WrongRuleDefinition error rule string is wrong', function() {
        _.each(['canot watch', 'can', 'foo bar', 'can $', 'cannot //\\'], (item) => {
          expect(() => {
            this.rule1 = this.Rule.create(item, {
              rule: function() {}
            });
          }).toThrowError(`Cannot parse following rule definition "${item}".`);

          try {
            this.rule1 = this.Rule.create(item, {
              rule: function() {}
            });
          } catch (e) {
            expect(e instanceof WrongRuleDefinition).toEqual(true);
          }
        });
      });
    });
  });

  describe('_createVerifyMethod', function() {
    it('creates method which returns isPositive if no rule given', function() {
      _.each([false, true], (i) => {
        const fn = Rule._createVerifyMethod(
          undefined,
          i
        );
        expect(fn()).toEqual(i);
      });
    });

    it('creates method which returns result of rule', function() {
      _.each([false, true], (i) => {
        const fn = Rule._createVerifyMethod(
          () => {
            return i;
          },
          true
        );

        expect(fn()).toEqual(i);
      });
    });

    it('creates method which returns negative result of rule', function() {
      _.each([false, true], (i) => {
        const fn = Rule._createVerifyMethod(
          () => {
            return true;
          },
          i
        );

        expect(fn()).toEqual(i);
      });
    });

    it('calls the method with correct context', function() {
      class MyFakeContext {
        constructor() {
          this.type = 'foo';
        }
      }

      const myFakeContext = new MyFakeContext();

      const fn = Rule._createVerifyMethod(
        function() {
          return this.type === myFakeContext.type;
        },
        true,
        myFakeContext
      );

      expect(fn()).toEqual(true);
    });
  });

  describe('constructor', function() {
    beforeEach(function() {
      this.type = 'foo';
      this.items = [];
      this.verifyMethod = () => {};
      this.isPositive = true;
    });

    describe('success', function() {
      beforeEach(function() {
        this.rule = new this.Rule(
          this.type,
          this.items,
          this.verifyMethod,
          this.isPositive
        );
      });

      it('stores reference to type', function() {
        expect(this.rule.type).toBe(this.type);
      });

      it('stores reference to items', function() {
        expect(this.rule.items).toBe(this.items);
      });

      it('stores reference to verifyMethod', function() {
        expect(this.rule.verifyMethod).toBe(this.verifyMethod);
      });

      it('stores reference to isPositive', function() {
        expect(this.rule.isPositive).toBe(this.isPositive);
      });
    });

    describe('failure', function() {
      it('only accepts string type', function() {
        expect(() => {
          this.rule = new this.Rule(
            {},
            this.items,
            this.verifyMethod,
            this.isPositive
          );
        }).toThrowError('type must be a string. Use create() to create new rule.');

        try {
          this.rule = new this.Rule(
            {},
            this.items,
            this.verifyMethod,
            this.isPositive
          );
        } catch (e) {
          expect(e instanceof ArgumentError).toEqual(true);
        }
      });

      it('only accepts array items', function() {
        expect(() => {
          this.rule = new this.Rule(
            this.type,
            {},
            this.verifyMethod,
            this.isPositive
          );
        }).toThrowError('items must be an array. Use create() to create new rule.');

        try {
          this.rule = new this.Rule(
            {},
            this.items,
            this.verifyMethod,
            this.isPositive
          );
        } catch (e) {
          expect(e instanceof ArgumentError).toEqual(true);
        }
      });

      it('only accepts function verifyMethod', function() {
        expect(() => {
          this.rule = new this.Rule(
            this.type,
            this.items,
            {},
            this.isPositive
          );
        }).toThrowError('verifyMethod must be a function. Use create() to create new rule.');

        try {
          this.rule = new this.Rule(
            this.type,
            this.items,
            {},
            this.isPositive
          );
        } catch (e) {
          expect(e instanceof ArgumentError).toEqual(true);
        }
      });

      it('only accepts boolean isPositive', function() {
        expect(() => {
          this.rule = new this.Rule(
            this.type,
            this.items,
            this.verifyMethod,
            {}
          );
        }).toThrowError('isPositive must be a boolean. Use create() to create new rule.');

        try {
          this.rule = new this.Rule(
            this.type,
            this.items,
            this.verifyMethod,
            {}
          );
        } catch (e) {
          expect(e instanceof ArgumentError).toEqual(true);
        }
      });
    });
  });

  describe('verify() method', function() {
    beforeEach(function() {
      this.rule1 = this.Rule.create(
        'can watch', {
          items: [
            this.CableTV,
            this.Television
          ]
        }
      );

      this.rule2 = this.Rule.create(
        'cannot watch', {
          items: [
            this.CableTV,
            this.Television
          ]
        }
      );
    });

    it('allows to proceed items', function() {
      expect(this.rule1.verify(new this.CableTV)).toBe(true);
      expect(this.rule1.verify(new this.Television)).toBe(true);
      expect(this.rule1.verify('foo')).toBe(false);
    });

    it('disallows to proceed items', function() {
      expect(this.rule2.verify(new this.CableTV)).toBe(false);
      expect(this.rule2.verify(new this.Television)).toBe(false);
      expect(this.rule1.verify('foo')).toBe(false);
    });

    it('calls verifyMethod', function() {
      const subject = 'foo';

      const spy1 = spyOn(this.rule1, 'verifyMethod').and.callThrough();
      const spy2 = spyOn(this.rule2, 'verifyMethod').and.callThrough();

      this.rule1.verify(subject);
      expect(spy1).not.toHaveBeenCalled();

      this.rule1.verify(this.Television);
      expect(spy1).toHaveBeenCalledWith(this.Television);

      this.rule2.verify(this.Television);
      expect(spy2).not.toHaveBeenCalled();
    });
  });
});
