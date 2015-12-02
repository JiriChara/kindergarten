import { FactoryGirl } from '../../support/factory-girl';

describe('StrictGoverness', function () {
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

    this.rule1 = this.Rule.create(
      'can watch', {
        items: [this.Tv]
      }
    );

    this.rule2 = this.Rule.create(
      'cannot watch', {
        items: [this.CableTv]
      }
    );

    this.strictGoverness.addRule(this.rule1, this.rule2);
  });

  describe('constructor', function () {
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

  describe('governed() method', function () {
    it('throws an error if calling unprotected method', function () {
      expect(() => {
        this.strictGoverness.governed(() => {});
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

  describe('guard() method', function () {
    it('increases the `_guardCount`', function () {
      expect(this.strictGoverness._guardCount).toBe(0);
      this.strictGoverness.guard('watch', this.tv);
      expect(this.strictGoverness._guardCount).toBe(1);
    });
  });
});
