const Kindergarten = require('../../lib/kindergarten');

import {_} from 'lodash';

import {FactoryGirl} from '../support/factory-girl';

describe('ChildModule integration spec', function() {
  beforeEach(function() {
    this.child = new FactoryGirl('child', 'watch', 'eat', 'sleep');
    this.Television = new FactoryGirl('Television');
    this.CableTv = new FactoryGirl('CableTv');
    this.Candy = new FactoryGirl('Candy');

    this.Kindergarten = Kindergarten;
  });

  it('must work', function() {
    const childModule = new this.Kindergarten.Perimeter(
      'playing', // purpose
      {
        govern: {
          'can watch': {
            items: [this.Television]
          },
          'cannot watch': {
            items: [this.CableTv]
          },
          'can eat': {
            items: [this.Candy],
            rule: (candy) => {
              return this.child.quotum.allows(candy);
            }
          }
        },
        expose: [
          'watchTv',
          'eat'
        ]
      }
    );

    _.extend(childModule, {
      watchTv: function(tv) {
        this.guard('watch', tv);

        this.child.watch(tv);

        this.sleep(4);
      },

      eat: function(candy) {
        this.guard('eat', candy);

        this.child.eat(candy);
      },

      sleep: function(len) {
        this.child.sleep(len);
      }
    });

    const sandbox = this.Kindergarten.sandbox(this.child);
    sandbox.loadModule(childModule);

    expect(() => {
      sandbox.playing.watchTv(new this.CableTv());
    }).toThrowError('Child is not allowed to watch the target.');

    try {
      sandbox.playing.watchTv(new this.CableTv());
    } catch (e) {
      expect(e instanceof this.Kindergarten.AccessDenied).toBe(true);
    }
  });
});
