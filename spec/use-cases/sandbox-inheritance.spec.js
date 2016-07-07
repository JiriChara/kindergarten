import FactoryGirl from '../support/FactoryGirl';

describe('Sandbox Inheritance', () => {
  let child;
  let Sandbox;
  let TestingClass;
  let testingInstance;
  let HeadGoverness;
  let GermanGoverness;
  let createPerimeter;

  beforeEach(() => {
    child = new FactoryGirl('child');
    Sandbox = new FactoryGirl('Sandbox');
    HeadGoverness = new FactoryGirl('HeadGoverness');
    GermanGoverness = new FactoryGirl('GermanGoverness');
    createPerimeter = new FactoryGirl('createPerimeter');
    TestingClass = class extends Sandbox {};
    testingInstance = new TestingClass(child);
  });

  it('inherits loadModule method from sandbox', () => {
    expect(testingInstance.loadModule).toBeFunction();
  });

  it('inherits loadPerimeter method from sandbox', () => {
    expect(testingInstance.loadPerimeter).toBeFunction();
  });

  it('inherits gets governess', () => {
    expect(testingInstance.governess instanceof HeadGoverness).toBeTrue();
  });

  it('acts as sandbox', () => {
    const Tv = new FactoryGirl('Television');

    const customPerimeter = createPerimeter({
      purpose: 'home',

      govern: {
        'cannot watch': [Tv]
      },

      expose: [
        'watch'
      ],

      watch() {},

      governess: new GermanGoverness(child)
    });

    testingInstance.loadModule(customPerimeter);

    expect(() => {
      testingInstance.home.watch(Tv);
    }).toThrowError('Child is not allowed to watch the target.');
  });
});
