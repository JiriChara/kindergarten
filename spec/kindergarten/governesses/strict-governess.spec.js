import FactoryGirl from '../../support/factory-girl';

describe('StrictGoverness', () => {
  beforeEach(function () {
    this.child = new FactoryGirl('child');
    this.Tv = new FactoryGirl('Tv');
    this.CableTv = new FactoryGirl('CableTv');

    this.tv = new this.Tv();
    this.cableTv = new this.CableTv();

    this.StrictGoverness = new FactoryGirl('StrictGoverness');
    this.Rule = new FactoryGirl('Rule');

    this.strictGoverness = new this.StrictGoverness(
      this.child
    );

    this.rule1 = new this.Rule('can watch', [this.Tv]);
    this.rule2 = new this.Rule('cannot watch', [this.CableTv]);

    this.strictGoverness.addRule(this.rule1, this.rule2);
  });

  describe('constructor', () => {
    it('stores reference to child', function () {
      expect(this.strictGoverness.child).toBe(this.child);
      expect(this.strictGoverness.unguarded).toBe(false);
    });

    it('initialises `_guardCount` to 0', function () {
      expect(this.strictGoverness._guardCount).toBe(0);
    });

    it('initialises `_governedCount` to 0', function () {
      expect(this.strictGoverness._governedCount).toBe(0);
    });
  });

  describe('governed() method', () => {
    it('throws an error if calling unprotected method', function () {
      expect(() => {
        this.strictGoverness.governed(() => ({}));
      }).toThrowError(
        'All exposed methods must call guard method.'
      );
    });

    it('does not throw an error if calling protected method', function () {
      expect(() => {
        this.strictGoverness.governed(() => {
          this.strictGoverness.guard('watch', this.tv);
        });
      }).not.toThrowError();
    });

    it('still throws an error if child is not allowed', function () {
      expect(() => {
        this.strictGoverness.governed(() => {
          this.strictGoverness.guard('watch', this.cableTv);
        });
      }).toThrowError(
        `Child is not allowed to watch the target.`
      );
    });
  });

  describe('guard() method', () => {
    it('increases the `_guardCount`', function () {
      expect(this.strictGoverness._guardCount).toBe(0);
      this.strictGoverness.guard('watch', this.tv);
      expect(this.strictGoverness._guardCount).toBe(1);
    });
  });
});
