import FactoryGirl from '../support/factory-girl';

describe('Rules integration specs', () => {
  beforeEach(function () {
    this.Rule = new FactoryGirl('Rule');
  });

  describe('custom rules', () => {
    it('must work', function () {
      const ruleDef = () => true;

      const positiveRule = new this.Rule('can watch', ruleDef);
      const negativeRule = new this.Rule('cannot watch', ruleDef);

      expect(positiveRule.verify()).toBe(true);
      expect(negativeRule.verify()).toBe(false);
    });
  });

  describe('array of items rules', () => {
    it('must work', function () {
      const Tv = new FactoryGirl('Tv');
      const CableTv = new FactoryGirl('CableTv');

      const positiveRule = new this.Rule('can watch', [
        Tv
      ]);

      const negativeRule = new this.Rule('cannot watch', [
        CableTv
      ]);

      expect(positiveRule.verify(new Tv())).toBe(true);
      expect(positiveRule.verify(new CableTv())).toBe(false);
      expect(positiveRule.type.isPositive()).toBe(true);
      expect(positiveRule.definition.isStrict()).toBe(false);
      expect(positiveRule.definition.isCustom()).toBe(false);

      expect(negativeRule.verify(new Tv())).toBe(true);
      expect(negativeRule.verify(new CableTv())).toBe(false);
      expect(negativeRule.type.isPositive()).toBe(false);
      expect(negativeRule.definition.isStrict()).toBe(true);
      expect(negativeRule.definition.isCustom()).toBe(false);
    });
  });
});
