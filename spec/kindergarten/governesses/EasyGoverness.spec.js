import FactoryGirl from '../../support/FactoryGirl';

describe('EasyGoverness', () => {
  let Tv;
  let CableTv;
  let tv;
  let cableTv;
  let EasyGoverness;
  let Rule;
  let easyGoverness;
  let rule1;
  let rule2;

  beforeEach(() => {
    Tv = new FactoryGirl('Tv');
    CableTv = new FactoryGirl('CableTv');

    tv = new Tv();
    cableTv = new CableTv();

    EasyGoverness = new FactoryGirl('EasyGoverness');

    Rule = new FactoryGirl('Rule');

    easyGoverness = new EasyGoverness(
    );

    rule1 = new Rule('can watch', [Tv]);
    rule2 = new Rule('cannot watch', [CableTv]);

    easyGoverness.addRule(rule1, rule2);
  });

  describe('constructor', () => {
    it('sets unguarded flag to true', () => {
      expect(easyGoverness.unguarded).toBe(true);
      expect(easyGoverness.isUnguarded()).toBe(true);
      expect(easyGoverness.isGuarded()).toBe(false);
    });
  });

  describe('guard', () => {
    it('let child to watch TV', () => {
      expect(easyGoverness.guard('watch', tv)).toBe(tv);
    });

    it('let child to watch Cable TV (even if rule disallows that)', () => {
      expect(easyGoverness.guard('watch', cableTv)).toBe(cableTv);
    });
  });
});
