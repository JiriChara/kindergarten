import FactoryGirl from '../../support/FactoryGirl';

describe('HeadGoverness', () => {
  let child;
  let Tv;
  let CableTv;
  let tv;
  let cableTv;
  let HeadGoverness;
  let Rule;
  let headGoverness;
  let rule1;
  let rule2;

  beforeEach(() => {
    child = new FactoryGirl('child');
    Tv = new FactoryGirl('Tv');
    CableTv = new FactoryGirl('CableTv');

    tv = new Tv();
    cableTv = new CableTv();

    HeadGoverness = new FactoryGirl('HeadGoverness');
    Rule = new FactoryGirl('Rule');

    headGoverness = new HeadGoverness(
      child
    );

    rule1 = new Rule(
      'can watch', [Tv]
    );

    rule2 = new Rule(
      'cannot watch', [CableTv]
    );

    headGoverness.addRule(rule1, rule2);
  });

  describe('constructor', () => {
    it('stores reference to child', () => {
      expect(headGoverness.child).toBe(child);
    });
  });

  describe('guard', () => {
    it('it allows watch tv', () => {
      expect(headGoverness.guard('watch', tv)).toBe(tv);
    });

    it('it disallows watch cable tv', () => {
      expect(() => {
        headGoverness.guard('watch', cableTv);
      }).toThrowError('Child is not allowed to watch the target.');

      try {
        headGoverness.guard('watch', child);
      } catch (e) {
        expect(e instanceof (new FactoryGirl('AccessDenied'))).toBe(true);
      }
    });

    it('it disallows to watch something else', () => {
      expect(() => {
        headGoverness.guard('watch', child);
      }).toThrowError('Child is not allowed to watch the target.');

      try {
        headGoverness.guard('watch', child);
      } catch (e) {
        expect(e instanceof (new FactoryGirl('AccessDenied'))).toBe(true);
      }
    });
  });
});
