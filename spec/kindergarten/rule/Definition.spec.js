import FactoryGirl from '../../support/FactoryGirl';

describe('Definition', () => {
  let Definition;
  let Rule;
  let rule1;
  let rule2;
  let rule3;
  let def1;
  let def2;
  let def3;
  let defRule1;
  let defRule2;
  let defRule3;
  let Tv;

  beforeEach(() => {
    Tv = new FactoryGirl('Television');
    Definition = new FactoryGirl('Definition');
    Rule = new FactoryGirl('Rule');

    def1 = [Tv];
    def2 = /regex/;
    def3 = () => true;

    rule1 = new Rule('cannot watch', def1);
    rule2 = new Rule('cannot read', def2);
    rule3 = new Rule('cannot work', def3);

    defRule1 = new Definition(rule1, def1);
    defRule2 = new Definition(rule2, def2);
    defRule3 = new Definition(rule3, def3);
  });

  describe('constructor', () => {
    it('sets rule to the given one', () => {
      expect(defRule1.rule).toBe(rule1);
      expect(defRule2.rule).toBe(rule2);
      expect(defRule3.rule).toBe(rule3);
    });

    it('sets the raw definition', () => {
      expect(defRule1.raw).toBe(def1);
      expect(defRule2.raw).toBe(def2);
      expect(defRule3.raw).toBe(def3);
    });

    it('sets ruleContext if given', () => {
      const context = {
        name: 'foo'
      };
      const method = function () { return this.name; };
      method.ruleContext = context;
      const myRuleDef = new Definition(
        rule1,
        method
      );
      expect(myRuleDef.ruleContext).toBe(context);
    });

    it('sets ruleContext to perimeter if used in sandbox', () => {
      const child = new FactoryGirl('child');
      const Perimeter = new FactoryGirl('Perimeter');
      const perimeter = new Perimeter({
        purpose: 'foo',
        govern: {
          'can watch'() {
            return this;
          }
        }
      });
      const Sandbox = new FactoryGirl('Sandbox');
      const sandbox = new Sandbox(child);
      sandbox.loadModule(perimeter);

      expect(
        sandbox.governess.getRules()[0].definition.raw.ruleContext
      ).toBe(perimeter);
    });

    it('sets type of the definition to items', () => {
      expect(defRule1.type).toBe('items');
    });

    it('sets type of the definition to regex', () => {
      expect(defRule2.type).toBe('regex');
    });

    it('sets type of the definition to customMethod', () => {
      expect(defRule3.type).toBe('customMethod');
    });

    it('sets items to raw value', () => {
      expect(defRule1.items).toBe(def1);
    });

    it('sets regex to raw value', () => {
      expect(defRule2.regex).toBe(def2);
    });

    it('sets customMethod to raw value', () => {
      expect(defRule3.customMethod).toBe(def3);
    });
  });

  describe('isStrict() method', () => {
    it('returns true if rule is not positive', () => {
      expect(rule1.definition.isStrict()).toBe(true);
      expect(rule2.definition.isStrict()).toBe(true);
      expect(rule3.definition.isStrict()).toBe(true);
    });

    it('returns false for positive items rule', () => {
      const myRule = new Rule('can watch', def1);
      expect(myRule.definition.isStrict()).toBe(false);
    });

    it('returns true for positive regex rule', () => {
      const myRule = new Rule('can watch', def2);
      expect(myRule.definition.isStrict()).toBe(true);
    });

    it('returns true for positive customMethod rule', () => {
      const myRule = new Rule('can watch', def3);
      expect(myRule.definition.isStrict()).toBe(true);
    });
  });

  describe('_resolve() method', () => {
    it('throws an error if the rule def doesn\'t meet any type', () => {
      expect(() => new Definition(rule1, 'foo')).toThrowError(
        `Cannot create a new rule "${rule1.type.type}". Wrong rule definition.`
      );

      expect(() => new Definition(rule1, null)).toThrowError(
        `Cannot create a new rule "${rule1.type.type}". Wrong rule definition.`
      );

      expect(() => new Definition(rule1, undefined)).toThrowError(
        `Cannot create a new rule "${rule1.type.type}". Wrong rule definition.`
      );

      expect(() => new Definition(rule1, {})).toThrowError(
        `Cannot create a new rule "${rule1.type.type}". Wrong rule definition.`
      );
    });
  });

  describe('_isStrict() method', () => {
    it('returns the value of isStrict for items', () => {
      expect(defRule1._isStrict('items')).toBe(defRule1.TYPES[0][2]);
    });

    it('returns the value of isStrict for regex', () => {
      expect(defRule2._isStrict('regex')).toBe(defRule2.TYPES[1][2]);
    });

    it('returns the value of isStrict for customMethod', () => {
      expect(defRule3._isStrict('customMethod')).toBe(defRule3.TYPES[1][2]);
    });

    it('returns false if no such definition type', () => {
      expect(defRule1._isStrict('foobarbaz')).toBeFalse();
    });
  });
});
