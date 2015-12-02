import { FactoryGirl } from '../../support/factory-girl';

describe('GermanGoverness', function () {
  beforeEach(function () {
    this.child = new FactoryGirl('child');
    this.Tv = new FactoryGirl('Tv');
    this.CableTv = new FactoryGirl('CableTv');

    this.tv = new this.Tv();
    this.cableTv = new this.CableTv();

    this.GermanGoverness = new FactoryGirl('GermanGoverness');
    this.Perimeter = new FactoryGirl('Perimeter');
    this.Sandbox = new FactoryGirl('Sandbox');

    this.germanGoverness = new this.GermanGoverness(
      this.child
    );

    this.perimeter = new this.Perimeter({
      purpose: 'playing',

      govern: {
        'can watch': {
          items: [this.Tv]
        },
        'cannot watch': {
          items: [this.CableTv]
        }
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

    this.sandbox = new this.Sandbox(this.child);
    this.sandbox.loadPerimeter(this.perimeter);

    this.sandbox.governess = this.germanGoverness;
  });

  describe('constructor', function () {
    it('stores reference to child', function () {
      expect(this.germanGoverness.child).toBe(this.child);
      expect(this.germanGoverness.unguarded).toBe(false);
    });
  });

  describe('governed() method', function () {
    it('calls guard method with correct arguments', function () {
      spyOn(this.germanGoverness, 'guard');

      expect(this.sandbox.playing.watch(this.tv)).toBe(true);

      expect(this.germanGoverness.guard).toHaveBeenCalledWith(
        'watch',
        this.tv
      );
    });

    it('throws an error when guard method is not happy', function () {
      expect(() => {
        this.sandbox.playing.watch(this.cableTv);
      }).toThrowError(
        'Child is not allowed to watch the target.'
      );
    });

    it('throws an access denied error if rule is missing', function () {
      expect(() => {
        this.sandbox.playing.destroy(this.cableTv);
      }).toThrowError(
        'Child is not allowed to destroy the target.'
      );
    });
  });
});
