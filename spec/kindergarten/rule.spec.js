import { _ } from 'lodash';

import { Rule } from '../../src/kindergarten/rule';
import { WrongRuleDefinition } from '../../src/kindergarten/errors';

xdescribe('Rule', () => {
  beforeEach(function () {
    this.Rule = Rule;
    this.Television = function () {};
    this.CableTV = function () {};
  });

  describe('create() static method', () => {
    describe('correct definition', () => {
      beforeEach(function () {
        this.rule1 = new this.Rule('can watch', [this.Television]);

        this.rule2 = new this.Rule('cannot watch', [this.Television]);

        this.rule3 = new this.Rule('cannot watch', [this.Television, this.CableTV]);

        this.customTruthyMethod = function () {
          return true;
        };

        this.customFalsyMethod = function () {
          return false;
        };

        this.rule4 = new this.Rule('can watch', this.customTruthyMethod);

        this.rule5 = new this.Rule('cannot watch', this.customTruthyMethod);

        this.rule6 = new this.Rule('can watch', this.customFalsyMethod);

        this.rule7 = new this.Rule('cannot watch', this.customFalsyMethod);
      });

      it('creates new rule with type', function () {
        expect(this.rule1.type).toEqual('watch');
      });

      it('creates new rule with items', function () {
        expect(this.rule1.items).toEqual([this.Television]);

        expect(this.rule3.items).toEqual([
          this.Television,
          this.CableTV
        ]);

        expect(this.rule4.items).toEqual([]);
      });

      it('creates new rule with verifyMethod', function () {
        expect(this.rule1.verifyMethod()).toEqual(true);
        expect(this.rule2.verifyMethod()).toEqual(true);
        expect(this.rule4.verifyMethod()).toEqual(this.customTruthyMethod());
        expect(this.rule5.verifyMethod()).toEqual(!this.customTruthyMethod());
        expect(this.rule6.verifyMethod()).toEqual(this.customFalsyMethod());
        expect(this.rule7.verifyMethod()).toEqual(!this.customFalsyMethod());
      });

      it('creates new rule with isPositive flag', function () {
        expect(this.rule1.isPositive).toEqual(true);
        expect(this.rule2.isPositive).toEqual(false);
        expect(this.rule3.isPositive).toEqual(false);
        expect(this.rule4.isPositive).toEqual(true);
        expect(this.rule5.isPositive).toEqual(false);
        expect(this.rule6.isPositive).toEqual(true);
        expect(this.rule7.isPositive).toEqual(false);
      });

      it('creates new rule with isStrict flag', function () {
        expect(this.rule1.isStrict).toEqual(false);
        expect(this.rule2.isStrict).toEqual(true);
        expect(this.rule3.isStrict).toEqual(true);
        expect(this.rule4.isStrict).toEqual(true);
        expect(this.rule5.isStrict).toEqual(true);
        expect(this.rule6.isStrict).toEqual(true);
        expect(this.rule7.isStrict).toEqual(true);
      });

      it('creates new rule with isCustom flag', function () {
        expect(this.rule1.isCustom).toEqual(false);
        expect(this.rule2.isCustom).toEqual(false);
        expect(this.rule3.isCustom).toEqual(false);
        expect(this.rule4.isCustom).toEqual(true);
        expect(this.rule5.isCustom).toEqual(true);
        expect(this.rule6.isCustom).toEqual(true);
        expect(this.rule7.isCustom).toEqual(true);
      });
    });

    describe('wrong definition', () => {
      it('throws an WrongRuleDefinition error when no items or rule given', function () {
        _.each([
          {}, [], 'string', undefined, null
        ], (item) => {
          expect(() => {
            this.rule1 = new this.Rule('can watch', item);
          }).toThrowError('Cannot create a new rule "can watch". No items or rule given.');

          try {
            this.rule1 = new this.Rule('can watch', item);
          } catch (e) {
            expect(e instanceof WrongRuleDefinition).toEqual(true);
          }
        });
      });

      it('throws an WrongRuleDefinition error rule string is wrong', function () {
        _.each(['canot watch', 'can', 'foo bar', 'can $', 'cannot //\\'], (item) => {
          expect(() => {
            this.rule1 = new this.Rule(item, {
              rule: () => ({})
            });
          }).toThrowError(`Cannot parse following rule definition "${item}".`);

          try {
            this.rule1 = new this.Rule(item, {
              rule: () => ({})
            });
          } catch (e) {
            expect(e instanceof WrongRuleDefinition).toEqual(true);
          }
        });
      });

      it('throws WrongRuleDefinition error when both rule and items given', function () {
        expect(() => {
          this.rule1 = new this.Rule('can view', {
            rule: () => ({}),
            items: [this.Television]
          });
        }).toThrowError(`Cannot create a new rule "can view". Both the items and rule given.`);

        try {
          this.rule1 = new this.Rule('can view', {
            rule: () => ({}),
            items: [this.Television]
          });
        } catch (e) {
          expect(e instanceof WrongRuleDefinition).toEqual(true);
        }
      });
    });
  });


  describe('constructor', () => {
    beforeEach(function () {
      this.type = 'foo';
      this.items = [];
      this.verifyObj = {
        isPositive: true,
        isCustom: false,
        isStrict: false,
        rule() {
          return true;
        }
      };
    });

    describe('success', () => {
      beforeEach(function () {
        this.rule = new this.Rule(
          this.type,
          this.items,
          this.verifyObj
        );
      });

      it('stores reference to type', function () {
        expect(this.rule.type).toBe(this.type);
      });

      it('stores reference to items', function () {
        expect(this.rule.items).toBe(this.items);
      });

      it('stores reference to verifyMethod', function () {
        expect(this.rule.verifyMethod).toBe(this.verifyObj.rule);
      });

      it('stores reference to isPositive', function () {
        expect(this.rule.isPositive).toBe(this.verifyObj.isPositive);
      });

      it('stores reference to isCustom', function () {
        expect(this.rule.isCustom).toBe(this.verifyObj.isCustom);
      });

      it('stores reference to isStrict', function () {
        expect(this.rule.isStrict).toBe(this.verifyObj.isStrict);
      });
    });

    describe('failure', () => {
      it('validates type of the rule', function () {
        const errorSufix = 'Use create() to create new rule.';

        _.each([
          'const', '1foo', 'abc def'
        ], (type) => {
          expect(() => {
            this.rule = new this.Rule(
              type,
              this.items,
              this.verifyObj
            );
          }).toThrowError(`${type} can't be used as a type of the rule. ${errorSufix}`);

          try {
            this.rule = new this.Rule(
              type,
              this.items,
              this.verifyObj
            );
          } catch (e) {
            expect(e instanceof WrongRuleDefinition).toEqual(true);
          }
        });
      });

      it('only accepts array of items', function () {
        expect(() => {
          this.rule = new this.Rule(
            this.type,
            {},
            this.verifyObj
          );
        }).toThrowError('items must be an array. Use create() to create new rule.');

        try {
          this.rule = new this.Rule(
            {},
            this.items,
            this.verifyObj
          );
        } catch (e) {
          expect(e instanceof WrongRuleDefinition).toEqual(true);
        }
      });

      it('only accepts function verifyMethod', function () {
        expect(() => {
          this.rule = new this.Rule(
            this.type,
            this.items,
            {
              isPositive: true,
              isCustom: true,
              isStrict: true,
              rule: {}
            }
          );
        }).toThrowError('verifyMethod must be a function. Use create() to create new rule.');

        try {
          this.rule = new this.Rule(
            this.type,
            this.items,
            {
              isPositive: true,
              isCustom: true,
              isStrict: true,
              rule: {}
            }
          );
        } catch (e) {
          expect(e instanceof WrongRuleDefinition).toEqual(true);
        }
      });

      it('only accepts boolean isPositive', function () {
        const wrongVerifyObj = {
          isPositive: {},
          isCustom: true,
          isStrict: true,
          rule() {}
        };

        expect(() => {
          this.rule = new this.Rule(
            this.type,
            this.items,
            wrongVerifyObj
          );
        }).toThrowError('isPositive must be a boolean. Use create() to create new rule.');

        try {
          this.rule = new this.Rule(
            this.type,
            this.items,
            wrongVerifyObj
          );
        } catch (e) {
          expect(e instanceof WrongRuleDefinition).toEqual(true);
        }
      });

      it('only accepts boolean isStrict', function () {
        const wrongVerifyObj = {
          isPositive: true,
          isStrict: {},
          isCustom: true,
          rule() {}
        };

        expect(() => {
          this.rule = new this.Rule(
            this.type,
            this.items,
            wrongVerifyObj
          );
        }).toThrowError('isStrict must be a boolean. Use create() to create new rule.');

        try {
          this.rule = new this.Rule(
            this.type,
            this.items,
            wrongVerifyObj
          );
        } catch (e) {
          expect(e instanceof WrongRuleDefinition).toEqual(true);
        }
      });

      it('only accepts boolean isCustom', function () {
        const wrongVerifyObj = {
          isPositive: true,
          isStrict: true,
          isCustom: {},
          rule() {}
        };

        expect(() => {
          this.rule = new this.Rule(
            this.type,
            this.items,
            wrongVerifyObj
          );
        }).toThrowError('isCustom must be a boolean. Use create() to create new rule.');

        try {
          this.rule = new this.Rule(
            this.type,
            this.items,
            wrongVerifyObj
          );
        } catch (e) {
          expect(e instanceof WrongRuleDefinition).toEqual(true);
        }
      });

      it('cannot be custom and not strict', function () {
        const wrongVerifyObj = {
          isPositive: true,
          isStrict: false,
          isCustom: true,
          rule() {}
        };

        expect(() => {
          this.rule = new this.Rule(
            this.type,
            this.items,
            wrongVerifyObj
          );
        }).toThrowError('Rule can\'t be custom and not strict. Use create() to create new rule.');

        try {
          this.rule = new this.Rule(
            this.type,
            this.items,
            wrongVerifyObj
          );
        } catch (e) {
          expect(e instanceof WrongRuleDefinition).toEqual(true);
        }
      });

      it('cannot be negative and not strict', function () {
        const wrongVerifyObj = {
          isPositive: false,
          isStrict: false,
          isCustom: false,
          rule() {}
        };

        expect(() => {
          this.rule = new this.Rule(
            this.type,
            this.items,
            wrongVerifyObj
          );
        }).toThrowError('Rule can\'t be negative and not strict. Use create() to create new rule.');

        try {
          this.rule = new this.Rule(
            this.type,
            this.items,
            wrongVerifyObj
          );
        } catch (e) {
          expect(e instanceof WrongRuleDefinition).toEqual(true);
        }
      });
    });
  });

  describe('verify() method', () => {
    describe('normal', () => {
      beforeEach(function () {
        this.rule1 = new this.Rule(
          'can watch', {
            items: [
              this.CableTV,
              this.Television
            ]
          }
        );

        this.rule2 = new this.Rule(
          'cannot watch', {
            items: [
              this.CableTV,
              this.Television
            ]
          }
        );
      });

      it('allows to proceed items', function () {
        expect(this.rule1.verify(new this.CableTV)).toBe(true);
        expect(this.rule1.verify(new this.Television)).toBe(true);
        expect(this.rule1.verify('foo')).toBe(false);
      });

      it('disallows to proceed items', function () {
        expect(this.rule2.verify(new this.CableTV)).toBe(false);
        expect(this.rule2.verify(new this.Television)).toBe(false);
        expect(this.rule1.verify('foo')).toBe(false);
      });

      it('calls does not call verifyMethod', function () {
        const subject = 'foo';

        const spy1 = spyOn(this.rule1, 'verifyMethod').and.callThrough();
        const spy2 = spyOn(this.rule2, 'verifyMethod').and.callThrough();

        this.rule1.verify(subject);
        expect(spy1).not.toHaveBeenCalled();

        this.rule1.verify(this.Television, 'something');
        expect(spy1).not.toHaveBeenCalled();

        this.rule2.verify(this.Television);
        expect(spy2).not.toHaveBeenCalled();
      });
    });

    describe('custom', () => {
      beforeEach(function () {
        this.rule1 = new this.Rule(
          'can destroy', {
            rule(item1, item2) {
              return item1 !== item2;
            }
          }
        );

        this.rule2 = new this.Rule(
          'cannot destroy', {
            rule(item1, item2) {
              return item1 !== item2;
            }
          }
        );

        this.context = {
          name: 'foo'
        };

        this.rule3 = new this.Rule(
          'can destroy', {
            rule(item) {
              return item === this.name;
            },
            ruleContext: this.context
          }
        );
      });

      it('calls verify method', function () {
        const spy1 = spyOn(this.rule1, 'verifyMethod').and.callThrough();
        const spy2 = spyOn(this.rule2, 'verifyMethod').and.callThrough();

        this.rule1.verify('foo', 'bar');
        expect(spy1).toHaveBeenCalledWith('foo', 'bar');

        this.rule1.verify('bar');
        expect(spy1).toHaveBeenCalledWith('bar');

        this.rule2.verify('bar');
        expect(spy2).toHaveBeenCalledWith('bar');
      });

      it('returns true if is positive and rule cb is truthy', function () {
        expect(this.rule1.verify('foo', 'bar')).toBe(true);
      });

      it('returns false if is positive and rule cb is falsy', function () {
        expect(this.rule1.verify('foo', 'foo')).toBe(false);
      });

      it('returns true if is negative and rule cb is false', function () {
        expect(this.rule2.verify('foo', 'foo')).toBe(true);
      });

      it('returns false if is negative and rule cb is truthy', function () {
        expect(this.rule2.verify('foo', 'bar')).toBe(false);
      });

      it('calls the rule cb in the right context', function () {
        expect(this.rule3.verify('foo')).toBe(true);
      });
    });
  });
});
