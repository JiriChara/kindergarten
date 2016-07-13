import Kindergarten from '../../src/Kindergarten';

import { _ } from 'lodash';

import FactoryGirl from '../support/FactoryGirl';

describe('ChildModule integration spec', () => {
  beforeEach(function () {
    this.child = new FactoryGirl('child', 'watch', 'eat', 'sleep');
    this.Tv = new FactoryGirl('Tv');
    this.CableTv = new FactoryGirl('CableTv');
    this.Netflix = new FactoryGirl('Netflix');
    this.Candy = new FactoryGirl('Candy');

    this.Kindergarten = Kindergarten;
  });

  it('must work', function () {
    const childModule = new this.Kindergarten.Perimeter(
      'playing', // purpose
      {
        govern: {
          'can watch': [this.Tv],
          'cannot watch': [this.CableTv],
          'can eat': (candy) => this.child.quotum.allows(candy)
        },
        expose: [
          'watchTv',
          'eat'
        ]
      }
    );

    _.extend(childModule, {
      watchTv(tv) {
        this.guard('watch', tv);

        this.child.watch(tv);

        this.sleep(4);
      },

      eat(candy) {
        this.guard('eat', candy);

        this.child.eat(candy);
      },

      sleep(len) {
        this.child.sleep(len);
      }
    });

    const sandbox = this.Kindergarten.sandbox(this.child);
    sandbox.loadModule(childModule);
    sandbox.loadModule(childModule); // should just skip
    sandbox.loadPerimeter(childModule); // should just skip

    expect(() => {
      sandbox.playing.watchTv(new this.CableTv());
    }).toThrowError('Child is not allowed to watch the target.');

    try {
      sandbox.playing.watchTv(new this.CableTv());
    } catch (e) {
      expect(e instanceof this.Kindergarten.AccessDenied).toBe(true);
    }

    // Both should be allowed allowed
    sandbox.playing.watchTv(this.Tv);
    sandbox.playing.watchTv(new this.Tv());

    expect(() => {
      sandbox.playing.watchTv(this.Netflix);
    }).toThrowError('Child is not allowed to watch the target.');

    expect(sandbox.isAllowed('watch', new this.Tv())).toBe(true);
    expect(sandbox.isAllowed('watch', this.Tv)).toBe(true);
    expect(sandbox.isAllowed('watch', this.CableTv)).toBe(false);
    expect(sandbox.isAllowed('watch', this.Netflix)).toBe(false);
  });
});
