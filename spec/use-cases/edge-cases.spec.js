import Kindergarten from '../../src/index';

import { _ } from 'lodash';

import FactoryGirl from '../support/FactoryGirl';

// Edge case tests
describe('ChildModule integration spec', () => {
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

      'can watch': [this.Tv, this.CableTv],
      'cannot watch': [this.Tv, this.CableTv],

      expose: [
        'watchTv',
        'eat'
      ],

      watchTv(item) {
        this.guard('watch', item);
      },

      eat() {}
    });

    const sandbox = this.Kindergarten.createSandbox(this.child);
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

      'can watch': [this.Tv, this.CableTv],
      // cannot has higher priority than can
      'cannot watch': [this.Tv, this.CableTv],

      expose: [
        'watch'
      ],

      watch(item) {
        return item;
      }
    });

    brainFuckPerimeter.governess = new Kindergarten.GermanGoverness(this.child);

    const sandbox = this.Kindergarten.createSandbox(this.child);
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

      'can watch': () => true,
      // cannot has higher priority than can
      'cannot watch': () => true,

      expose: [
        'watch'
      ],

      watch(item) {
        return item;
      }
    });

    brainFuckPerimeter.governess = new Kindergarten.GermanGoverness(this.child);

    const sandbox = this.Kindergarten.createSandbox(this.child);
    sandbox.loadModule(brainFuckPerimeter);

    _.each([this.Tv, this.CableTv], (Thing) => {
      expect(() => {
        sandbox.playing.watch(new Thing());
      }).toThrowError('Child is not allowed to watch the target.');
    });
  });

  it('The brainfuck #4 should work', () => {
    const TV = function () {};
    const user = {};

    const perimeter1 = new Kindergarten.Perimeter({
      purpose: 'perimeter1',
      govern: {
        'can watch': [TV]
      },
      governess: new Kindergarten.HeadGoverness(user)
    });

    const perimeter2 = new Kindergarten.Perimeter({
      purpose: 'perimeter2',
      govern: {
        'cannot watch': [TV]
      },
      governess: new Kindergarten.HeadGoverness(user)
    });

    const sandbox = Kindergarten.createSandbox(user);

    expect(sandbox.loadModule(perimeter1, perimeter2)).toBe(2);

    expect(sandbox.perimeter1.isAllowed('watch', new TV())).toBe(true);
    expect(sandbox.perimeter2.isAllowed('watch', new TV())).toBe(false);
    expect(sandbox.isAllowed('watch', new TV())).toBe(false);
  });

  it('The brainfuck #5 should work', () => {
    const TV = function () {};
    const user = {};

    const perimeter1 = new Kindergarten.Perimeter({
      purpose: 'perimeter1',
      govern: {
        'can watch': [TV]
      }
    });

    const perimeter2 = new Kindergarten.Perimeter({
      purpose: 'perimeter2',
      govern: {
        'cannot watch': [TV]
      }
    });

    const sandbox = Kindergarten.createSandbox(user);

    expect(sandbox.loadModule(perimeter1, perimeter2)).toBe(2);

    expect(sandbox.perimeter1.isAllowed('watch', new TV())).toBe(false);
    expect(sandbox.perimeter2.isAllowed('watch', new TV())).toBe(false);
    expect(sandbox.isAllowed('watch', new TV())).toBe(false);
  });

  it('The brainfuck #6 should work', () => {
    const user = {};

    const perimeter = new Kindergarten.Perimeter({
      purpose: 'perimeter1',
      govern: {
        'can proceed': /^\S+@\S+\.\w+$/
      }
    });

    const sandbox = Kindergarten.createSandbox(user);

    expect(sandbox.loadModule(perimeter)).toBe(1);

    expect(sandbox.isAllowed('proceed', 'foo@bar.com')).toBe(true);
    expect(sandbox.isAllowed('proceed', 'not-email@')).toBe(false);
  });
});
