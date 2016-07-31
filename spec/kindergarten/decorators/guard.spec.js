import FactoryGirl from '../../support/FactoryGirl';

describe('guard', () => {
  let guard;
  let perimeter;
  let Tv;
  let CableTv;
  let sandbox;
  let foo;

  beforeEach(() => {
    const Perimeter = new FactoryGirl('Perimeter');
    const Sandbox = new FactoryGirl('Sandbox');

    Tv = new FactoryGirl('Television');
    CableTv = new FactoryGirl('CableTv');
    guard = new FactoryGirl('guard');
    perimeter = new Perimeter({
      purpose: 'testing',

      govern: {
        'can watch': [Tv],
        'cannot watch': [CableTv],
        'cannot game': () => true
      },

      expose: [
        'watch',
        'play'
      ],

      @guard
      watch() {
        return true;
      },

      @guard('game')
      play() {
        return true;
      }
    });

    sandbox = new Sandbox({}, {
      perimeters: [
        perimeter
      ]
    });

    foo = {
      @guard()
      foo() {
        return true;
      }
    };
  });

  it('throw error if child is not allowed to do the action', () => {
    expect(() => {
      sandbox.testing.watch(CableTv);
    }).toThrowError('Child is not allowed to watch the target.');
  });

  it('doesn\'t throw error if child is allowed to do the action', () => {
    expect(sandbox.testing.watch(Tv)).toBeTrue();
  });

  it('throws an error if used outside of perimeter', () => {
    expect(() => {
      foo.foo();
    }).toThrowError('Guard decorator can only be used within perimeter or sandbox.');
  });

  it('throws error if child is not allowed to do specific action', () => {
    expect(() => {
      sandbox.testing.play();
    }).toThrowError('Child is not allowed to game the target.');
  });
});
