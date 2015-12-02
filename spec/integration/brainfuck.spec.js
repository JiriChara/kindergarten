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

  it('The brainfuck perimeter #1 must work', function () {
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

  it('The brainfuck perimeter #2 must work', function () {
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

  it('The brainfuck perimeter #3 must work', function () {
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
});
