import { FactoryGirl } from '../../support/factory-girl';

describe('EasyGoverness', function () {
  beforeEach(function () {
    this.child = new FactoryGirl('child');

    this.Tv = new FactoryGirl('Tv');
    this.CableTv = new FactoryGirl('CableTv');

    this.tv = new this.Tv();
    this.cableTv = new this.CableTv();

    this.EasyGoverness = new FactoryGirl('EasyGoverness');

    this.Rule = new FactoryGirl('Rule');

    this.easyGoverness = new this.EasyGoverness(
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

    this.easyGoverness.addRule(this.rule1, this.rule2);
  });

  describe('constructor', function () {
    it('stores reference to child', function () {
      expect(this.easyGoverness.child).toBe(this.child);
    });

    it('sets unguarded flag to true', function () {
      expect(this.easyGoverness.unguarded).toBe(true);
      expect(this.easyGoverness.isUnguarded()).toBe(true);
      expect(this.easyGoverness.isGuarded()).toBe(false);
    });
  });

  describe('guard', function () {
    it('let child to watch TV', function () {
      expect(this.easyGoverness.guard('watch', this.tv)).toBe(this.tv);
    });

    it('let child to watch Cable TV (even if rule disallows that)', function () {
      expect(this.easyGoverness.guard('watch', this.cableTv)).toBe(this.cableTv);
    });
  });
});
