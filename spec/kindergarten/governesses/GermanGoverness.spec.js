import FactoryGirl from '../../support/FactoryGirl';

describe('GermanGoverness', () => {
  let child;
  let Tv;
  let CableTv;
  let tv;
  let cableTv;
  let GermanGoverness;
  let Perimeter;
  let Sandbox;
  let germanGoverness;
  let perimeter;
  let sandbox;

  beforeEach(() => {
    child = new FactoryGirl('child');
    Tv = new FactoryGirl('Tv');
    CableTv = new FactoryGirl('CableTv');

    tv = new Tv();
    cableTv = new CableTv();

    GermanGoverness = new FactoryGirl('GermanGoverness');
    Perimeter = new FactoryGirl('Perimeter');
    Sandbox = new FactoryGirl('Sandbox');

    germanGoverness = new GermanGoverness(
      child
    );

    perimeter = new Perimeter({
      purpose: 'playing',

      govern: {
        'can watch': [Tv],
        'cannot watch': [CableTv]
      },

      expose: [
        'watch',
        'destroy'
      ],

      watch() {
        return true;
      },

      destroy() {
        return true;
      }
    });

    sandbox = new Sandbox(child);
    sandbox.loadPerimeter(perimeter);

    sandbox.governess = germanGoverness;
  });

  describe('constructor', () => {
    it('stores reference to child', () => {
      expect(germanGoverness.child).toBe(child);
      expect(germanGoverness.unguarded).toBe(false);
    });
  });

  describe('governed() method', () => {
    it('calls guard method with correct arguments', () => {
      spyOn(germanGoverness, 'guard');

      expect(sandbox.playing.watch(tv)).toBe(true);

      expect(germanGoverness.guard).toHaveBeenCalledWith(
        'watch',
        tv
      );
    });

    it('throws an error if it has no reference to perimeter', () => {
      expect(() => {
        germanGoverness.governed(() => true, [], 'not a perimeter');
      }).toThrowError('German governess can only be used within sandbox.');
    });

    it('throws an error when guard method is not happy', () => {
      expect(() => {
        sandbox.playing.watch(cableTv);
      }).toThrowError(
        'Child is not allowed to watch the target.'
      );
    });

    it('throws an access denied error if rule is missing', () => {
      expect(() => {
        sandbox.playing.destroy(cableTv);
      }).toThrowError(
        'Child is not allowed to destroy the target.'
      );
    });
  });
});
