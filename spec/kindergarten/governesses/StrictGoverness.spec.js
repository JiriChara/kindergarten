import FactoryGirl from '../../support/FactoryGirl';

describe('StrictGoverness', () => {
  let Tv;
  let CableTv;
  let tv;
  let cableTv;
  let StrictGoverness;
  let Rule;
  let strictGoverness;
  let rule1;
  let rule2;

  beforeEach(() => {
    Tv = new FactoryGirl('Tv');
    CableTv = new FactoryGirl('CableTv');

    tv = new Tv();
    cableTv = new CableTv();

    StrictGoverness = new FactoryGirl('StrictGoverness');
    Rule = new FactoryGirl('Rule');

    strictGoverness = new StrictGoverness();

    rule1 = new Rule('can watch', [Tv]);
    rule2 = new Rule('cannot watch', [CableTv]);

    strictGoverness.addRule(rule1, rule2);
  });

  describe('constructor', () => {
    it('sets unguarded', () => {
      expect(strictGoverness.unguarded).toBe(false);
    });

    it('initialises `_guardCount` to 0', () => {
      expect(strictGoverness._guardCount).toBe(0);
    });

    it('initialises `_governedCount` to 0', () => {
      expect(strictGoverness._governedCount).toBe(0);
    });
  });

  describe('governed() method', () => {
    it('throws an error if calling unprotected method', () => {
      expect(() => {
        strictGoverness.governed(() => ({}));
      }).toThrowError(
        'All exposed methods must call guard method.'
      );
    });

    it('does not throw an error if calling protected method', () => {
      expect(() => {
        strictGoverness.governed(() => {
          strictGoverness.guard('watch', tv);
        });
      }).not.toThrowError();
    });

    it('still throws an error if child is not allowed', () => {
      expect(() => {
        strictGoverness.governed(() => {
          strictGoverness.guard('watch', cableTv);
        });
      }).toThrowError(
        'Child is not allowed to watch the target.'
      );
    });
  });

  describe('guard() method', () => {
    it('increases the `_guardCount`', () => {
      expect(strictGoverness._guardCount).toBe(0);
      strictGoverness.guard('watch', tv);
      expect(strictGoverness._guardCount).toBe(1);
    });
  });
});
