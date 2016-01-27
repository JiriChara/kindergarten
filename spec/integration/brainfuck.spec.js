const Kindergarten = require('../../lib/kindergarten');

import { _ } from 'lodash';

import { FactoryGirl } from '../support/factory-girl';

// Edge case tests
describe('ChildModule integration spec', function () {
  beforeEach(function () {
    this.child = new FactoryGirl('child', 'watch', 'eat', 'sleep');
    this.Tv = new FactoryGirl('Tv');
    this.CableTv = new FactoryGirl('CableTv');
    this.Netflix = new FactoryGirl('Netflix');
    this.Candy = new FactoryGirl('Candy');

    this.Kindergarten = Kindergarten;
  });

  it('The brainfuck #1 should work', function () {
    const brainFuckPerimeter = new Kindergarten.Perimeter({
      purpose: 'playing',

      'can watch': {
        items: [
          this.Tv,
          this.CableTv
        ]
      },
      'cannot watch': { // cannot has higher priority than can
        items: [
          this.Tv,
          this.CableTv
        ]
      },

      expose: [
        'watchTv',
        'eat'
      ],

      watchTv(item) {
        this.guard('watch', item);
      },

      eat() {}
    });

    const sandbox = this.Kindergarten.sandbox(this.child);
    sandbox.loadModule(brainFuckPerimeter);

    _.each([this.Tv, this.CableTv], (Thing) => {
      expect(() => {
        sandbox.playing.watchTv(new Thing());
      }).toThrowError('Child is not allowed to watch the target.');
    });
  });

  it('The brainfuck #2 should work', function () {
    const brainFuckPerimeter = new Kindergarten.Perimeter({
      purpose: 'playing',

      'can watch': {
        items: [
          this.Tv,
          this.CableTv
        ]
      },
      'cannot watch': { // cannot has higher priority than can
        items: [
          this.Tv,
          this.CableTv
        ]
      },

      expose: [
        'watch'
      ],

      watch(item) {
        return item;
      }
    });

    brainFuckPerimeter.governess = new Kindergarten.GermanGoverness(this.child);

    const sandbox = this.Kindergarten.sandbox(this.child);
    sandbox.loadModule(brainFuckPerimeter);

    _.each([this.Tv, this.CableTv], (Thing) => {
      expect(() => {
        sandbox.playing.watch(new Thing());
      }).toThrowError('Child is not allowed to watch the target.');
    });
  });

  it('The brainfuck #3 should work', function () {
    const brainFuckPerimeter = new Kindergarten.Perimeter({
      purpose: 'playing',

      'can watch': {
        rule() {
          return true;
        }
      },
      'cannot watch': { // cannot has higher priority than can
        rule() {
          return true;
        }
      },

      expose: [
        'watch'
      ],

      watch(item) {
        return item;
      }
    });

    brainFuckPerimeter.governess = new Kindergarten.GermanGoverness(this.child);

    const sandbox = this.Kindergarten.sandbox(this.child);
    sandbox.loadModule(brainFuckPerimeter);

    _.each([this.Tv, this.CableTv], (Thing) => {
      expect(() => {
        sandbox.playing.watch(new Thing());
      }).toThrowError('Child is not allowed to watch the target.');
    });
  });

  it('The brainfuck #4 should work', function () {
    const TV = function () {};
    const user = {};

    const perimeter1 = new Kindergarten.Perimeter({
      purpose: 'perimeter1',
      govern: {
        'can watch': {
          items: [TV]
        }
      },
      governess: new Kindergarten.HeadGoverness(user)
    });

    const perimeter2 = new Kindergarten.Perimeter({
      purpose: 'perimeter2',
      govern: {
        'cannot watch': {
          items: [TV]
        }
      },
      governess: new Kindergarten.HeadGoverness(user)
    });

    const sandbox = Kindergarten.sandbox(user);

    expect(sandbox.loadModule(perimeter1, perimeter2)).toBe(2);

    expect(sandbox.perimeter1.isAllowed('watch', new TV())).toBe(true);
    expect(sandbox.perimeter2.isAllowed('watch', new TV())).toBe(false);
    expect(sandbox.isAllowed('watch', new TV())).toBe(false);
  });

  it('The brainfuck #5 should work', function () {
    const TV = function () {};
    const user = {};

    const perimeter1 = new Kindergarten.Perimeter({
      purpose: 'perimeter1',
      govern: {
        'can watch': {
          items: [TV]
        }
      }
    });

    const perimeter2 = new Kindergarten.Perimeter({
      purpose: 'perimeter2',
      govern: {
        'cannot watch': {
          items: [TV]
        }
      }
    });

    const sandbox = Kindergarten.sandbox(user);

    expect(sandbox.loadModule(perimeter1, perimeter2)).toBe(2);

    expect(sandbox.perimeter1.isAllowed('watch', new TV())).toBe(false);
    expect(sandbox.perimeter2.isAllowed('watch', new TV())).toBe(false);
    expect(sandbox.isAllowed('watch', new TV())).toBe(false);
  });

  it('The brainfuck #6 should work', function () {
    const user = {};

    const perimeter = new Kindergarten.Perimeter({
      purpose: 'perimeter1',
      govern: {
        'can proceed': {
          rule: /^\S+@\S+\.\w+$/
        }
      }
    });

    const sandbox = Kindergarten.sandbox(user);

    expect(sandbox.loadModule(perimeter)).toBe(1);

    expect(sandbox.isAllowed('proceed', 'foo@bar.com')).toBe(true);
    expect(sandbox.isAllowed('proceed', 'not-email@')).toBe(false);
  });
});
