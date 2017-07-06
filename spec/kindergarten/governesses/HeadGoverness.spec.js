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
  let rule3;
  let spiedRuleFn;

  beforeEach(() => {
    child = new FactoryGirl('child');
    Tv = new FactoryGirl('Tv');
    CableTv = new FactoryGirl('CableTv');

    tv = new Tv();
    cableTv = new CableTv();

    HeadGoverness = new FactoryGirl('HeadGoverness');
    Rule = new FactoryGirl('Rule');

    headGoverness = new HeadGoverness();

    rule1 = new Rule(
      'can watch', [Tv]
    );

    rule2 = new Rule(
      'cannot watch', [CableTv]
    );

    spiedRuleFn = jasmine.createSpy('rule').and.returnValue(true);

    rule3 = new Rule(
      'can doSomething', spiedRuleFn
    );

    headGoverness.addRule(rule1, rule2, rule3);
  });

  describe('constructor', () => {
    it('initializes rules to empty array', () => {
      const myGoverness = new HeadGoverness({});
      expect(myGoverness.rules).toBeEmptyArray();
    });
  });

  describe('guard() method', () => {
    it('it allows watch tv and returns tv', () => {
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

    it('doesn\'t throw error if unguarded', () => {
      headGoverness.unguarded = true;
      expect(() => {
        headGoverness.guard('watch', cableTv);
      }).not.toThrowError();
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

  describe('governed() method', () => {
    it('calls given method with given arguments', () => {
      const myCb = jasmine.createSpy();
      headGoverness.governed(myCb, ['foo', 'bar']);
      expect(myCb).toHaveBeenCalledWith('foo', 'bar');
    });

    it('calls the method in the given context', () => {
      const context = {
        name: 'foo'
      };
      const cb = function () { return this.name; };
      const returnValue = headGoverness.governed(cb, ['foo', 'bar'], context);
      expect(returnValue).toBe('foo');
    });
  });

  describe('isAllowed() method', () => {
    it('always returns true if not unguarded is set to true', () => {
      headGoverness.unguarded = true;
      expect(headGoverness.isAllowed('watch', cableTv)).toBeTrue();
      expect(headGoverness.isAllowed('watch', tv)).toBeTrue();
    });

    it('returns true if child is allowed to do some action', () => {
      expect(headGoverness.isAllowed('watch', tv)).toBeTrue();
    });

    it('returns false if child is not allowed to do some action', () => {
      expect(headGoverness.isAllowed('watch', cableTv)).toBeFalse();
      expect(headGoverness.isAllowed('watch', {})).toBeFalse();
    });

    it('calls rule function just once', () => {
      expect(headGoverness.isAllowed('doSomething')).toBeTrue();
      expect(spiedRuleFn.calls.count()).toBe(1);
    });
  });

  describe('isNotAllowed() method', () => {
    it('always returns false if not unguarded is set to true', () => {
      headGoverness.unguarded = true;
      expect(headGoverness.isNotAllowed('watch', cableTv)).toBeFalse();
      expect(headGoverness.isNotAllowed('watch', tv)).toBeFalse();
    });

    it('returns false if child is allowed to do some action', () => {
      expect(headGoverness.isNotAllowed('watch', tv)).toBeFalse();
    });

    it('returns true if child is not allowed to do some action', () => {
      expect(headGoverness.isNotAllowed('watch', cableTv)).toBeTrue();
      expect(headGoverness.isNotAllowed('watch', {})).toBeTrue();
    });
  });

  describe('unguarded() getter', () => {
    it('returns true value of _unguarded', () => {
      headGoverness._unguarded = true;
      expect(headGoverness.unguarded).toBeTrue();
      headGoverness._unguarded = {};
      expect(headGoverness.unguarded).toBeTrue();
    });

    it('returns false value of _unguarded', () => {
      headGoverness._unguarded = false;
      expect(headGoverness.unguarded).toBeFalse();
      headGoverness._unguarded = null;
      expect(headGoverness.unguarded).toBeFalse();
    });
  });

  describe('unguarded() setter', () => {
    it('sets _unguarded to true', () => {
      headGoverness.unguarded = true;
      expect(headGoverness._unguarded).toBeTrue();
      headGoverness.unguarded = {};
      expect(headGoverness._unguarded).toBeTrue();
    });

    it('sets _unguarded to false', () => {
      headGoverness.unguarded = false;
      expect(headGoverness._unguarded).toBeFalse();
      headGoverness.unguarded = null;
      expect(headGoverness._unguarded).toBeFalse();
    });
  });

  describe('getRules() method', () => {
    it('returns list of rules added to governess', () => {
      expect(headGoverness.getRules()).toContain(rule1, rule2);
    });

    it('returns empty array by default', () => {
      const myGoverness = new HeadGoverness();
      expect(myGoverness.getRules()).toBeEmptyArray();
    });

    it('return rules by type', () => {
      const myRule = new Rule(
        'cannot foo', /foo/
      );
      headGoverness.addRule(myRule);
      expect(headGoverness.getRules('watch')).toContain(rule1, rule2);
      expect(headGoverness.getRules('watch')).not.toContain(myRule);
    });

    it('returns empty array if no rules found', () => {
      expect(headGoverness.getRules('foo')).toBeEmptyArray();
      expect(headGoverness.getRules({})).toBeEmptyArray();
    });
  });

  describe('learnRules() method', () => {
    let myGoverness;
    let myPerimeter;

    beforeEach(() => {
      const Perimeter = new FactoryGirl('Perimeter');
      myGoverness = new HeadGoverness();
      myPerimeter = new Perimeter({
        purpose: 'foo',
        govern: {
          'can watch': /tv/,
          'cannot watch': [cableTv],
          'can play': () => true
        }
      });
      myGoverness.learnRules(myPerimeter);
    });

    it('learns rules from perimeter', () => {
      expect(myGoverness.rules).toBeArrayOfObjects();
      expect(myGoverness.rules.length).toBe(3);
    });

    it('returns the count of added rules', () => {
      const myVeryOwnG = new HeadGoverness();
      expect(myVeryOwnG.learnRules(myPerimeter)).toBe(3);
      expect(myVeryOwnG.learnRules(myPerimeter)).toBe(0);
      expect(myVeryOwnG.rules.length).toBe(3);
    });
  });

  describe('addRule() method', () => {
    it('throws an error if given argument is not rule', () => {
      expect(() => {
        headGoverness.addRule('foo');
      }).toThrowError('Governess cannot learn the rule. Does it inherit from Rule class?');

      expect(() => {
        headGoverness.addRule(rule1, 'foo');
      }).toThrowError('Governess cannot learn the rule. Does it inherit from Rule class?');
    });

    it('can add multiple rules at once', () => {
      const myGoverness = new HeadGoverness();
      myGoverness.addRule(rule1, rule2);
      expect(myGoverness.rules).toContain(rule1);
      expect(myGoverness.rules).toContain(rule2);
    });

    it('returns count of added rules', () => {
      const myGoverness = new HeadGoverness();
      expect(myGoverness.addRule(rule1, rule2)).toBe(2);
    });
  });

  describe('hasAnyRules() method', () => {
    it('returns true if governess has some rules', () => {
      expect(headGoverness.hasAnyRules()).toBeTrue();
    });

    it('returns false if governess has no rules', () => {
      const myGoverness = new HeadGoverness();
      expect(myGoverness.hasAnyRules()).toBeFalse();
    });
  });

  describe('doUnguarded() method', () => {
    it('performs some action unguarded', () => {
      expect(() => {
        headGoverness.doUnguarded(() => {
          headGoverness.guard('watch', cableTv);
        }).not.toThrowError();
      });
    });

    it('calling context can be passed', () => {
      const myMethod = function () { return this.name; };

      expect(
        headGoverness.doUnguarded(myMethod, {
          name: 'foo'
        })
      ).toBe('foo');
    });
  });

  describe('isUnguarded() method', () => {
    it('returns true if unguarded property is set to true', () => {
      headGoverness._unguarded = true;
      expect(headGoverness.isUnguarded()).toBeTrue();
    });

    it('returns false if unguarded property is set to false', () => {
      headGoverness._unguarded = false;
      expect(headGoverness.isUnguarded()).toBeFalse();
    });
  });

  describe('isUnguarded() method', () => {
    it('returns false if unguarded property is set to true', () => {
      headGoverness._unguarded = true;
      expect(headGoverness.isGuarded()).toBeFalse();
    });

    it('returns true if unguarded property is set to false', () => {
      headGoverness._unguarded = false;
      expect(headGoverness.isGuarded()).toBeTrue();
    });
  });
});
