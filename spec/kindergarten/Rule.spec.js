import FactoryGirl from '../support/FactoryGirl';

describe('Rule', () => {
  let Rule;
  let rule;
  let Tv;
  let CableTv;
  let Type;
  let Definition;

  beforeEach(() => {
    Rule = new FactoryGirl('Rule');
    Type = new FactoryGirl('Type');
    Definition = new FactoryGirl('Definition');
    Tv = new FactoryGirl('Television');
    CableTv = new FactoryGirl('CableTv');
    rule = new Rule('cannot watch', CableTv);
  });

  describe('constructor', () => {
    it('sets the type', () => {
      expect(rule.type instanceof Type).toBe(true);
    });

    it('sets the definition', () => {
      expect(rule.definition instanceof Definition).toBe(true);
    });

    it('passes type', () => {
      const raw = 'can watch';
      const myRule = new Rule(raw, [CableTv]);
      expect(myRule.type.rule).toBe(myRule);
      expect(myRule.type.raw).toBe(raw);
    });

    it('passes definition', () => {
      const raw = [CableTv];
      const myRule = new Rule('can watch', raw);
      expect(myRule.definition.rule).toBe(myRule);
      expect(myRule.definition.raw).toBe(raw);
    });
  });

  describe('`verify()` method', () => {
    describe('items array', () => {
      describe('positive rules', () => {
        let myRule;

        beforeEach(() => {
          myRule = new Rule('can watch', [
            CableTv,
            Tv
          ]);
        });

        it('is positive if specified', () => {
          expect(myRule.verify(Tv)).toBe(true);
          expect(myRule.verify(CableTv)).toBe(true);
        });

        it('is negative for other objects', () => {
          expect(myRule.verify()).toBe(false);
          expect(myRule.verify({})).toBe(false);
        });

        it('is not strict', () => {
          expect(myRule.definition.isStrict()).toBe(false);
        });

        it('is positive', () => {
          expect(myRule.type.isPositive()).toBe(true);
        });
      });

      describe('negative rules', () => {
        let myRule;

        beforeEach(() => {
          myRule = new Rule('cannot watch', [
            CableTv
          ]);
        });

        it('is negative if specified', () => {
          expect(myRule.verify(CableTv)).toBe(false);
        });

        it('is positive for other objects', () => {
          expect(myRule.verify(Tv)).toBe(true);
          expect(myRule.verify({})).toBe(true);
        });

        it('is strict', () => {
          expect(myRule.definition.isStrict()).toBe(true);
        });

        it('is negative', () => {
          expect(myRule.type.isPositive()).toBe(false);
        });
      });
    });

    describe('regex', () => {
      describe('positive rules', () => {
        let myRule;

        beforeEach(() => {
          myRule = new Rule('can read', /foo/);
        });

        it('is positive if specified', () => {
          expect(myRule.verify('foo')).toBe(true);
        });

        it('is negative for other objects', () => {
          expect(myRule.verify()).toBe(false);
          expect(myRule.verify('bar')).toBe(false);
        });

        it('is strict', () => {
          expect(myRule.definition.isStrict()).toBe(true);
        });

        it('is positive', () => {
          expect(myRule.type.isPositive()).toBe(true);
        });
      });

      describe('negative rules', () => {
        let myRule;

        beforeEach(() => {
          myRule = new Rule('cannot read', /foo/);
        });

        it('is negative if specified', () => {
          expect(myRule.verify('foo')).toBe(false);
        });

        it('is positive for other objects', () => {
          expect(myRule.verify()).toBe(true);
          expect(myRule.verify('bar')).toBe(true);
        });

        it('is strict', () => {
          expect(myRule.definition.isStrict()).toBe(true);
        });

        it('is positive', () => {
          expect(myRule.type.isPositive()).toBe(false);
        });
      });
    });

    describe('custom', () => {
      describe('positive rules', () => {
        let myRule;
        let mySecondRule;

        beforeEach(() => {
          myRule = new Rule('can read', () => true);
          mySecondRule = new Rule('can read', (x) => !!x);
        });

        it('is positive if specified', () => {
          expect(myRule.verify()).toBe(true);
          expect(mySecondRule.verify(true)).toBe(true);
          expect(mySecondRule.verify(false)).toBe(false);
        });

        it('is strict', () => {
          expect(myRule.definition.isStrict()).toBe(true);
        });

        it('is positive', () => {
          expect(myRule.type.isPositive()).toBe(true);
        });
      });

      describe('negative rules', () => {
        let myRule;
        let mySecondRule;

        beforeEach(() => {
          myRule = new Rule('cannot read', () => true);
          mySecondRule = new Rule('cannot read', (x) => !!x);
        });

        it('is negative if specified', () => {
          expect(myRule.verify()).toBe(false);
          expect(mySecondRule.verify(true)).toBe(false);
          expect(mySecondRule.verify(false)).toBe(true);
        });


        it('is strict', () => {
          expect(myRule.definition.isStrict()).toBe(true);
        });

        it('is positive', () => {
          expect(myRule.type.isPositive()).toBe(false);
        });
      });
    });
  });
});
