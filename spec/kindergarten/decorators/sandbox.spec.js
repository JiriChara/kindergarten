import { Component } from 'react';
import {
  sandbox,
  guard
} from '../../../src/kindergarten/decorators';
import FactoryGirl from '../../support/FactoryGirl';

describe('sandbox', () => {
  let testingInstance;
  let child;
  let Perimeter;
  let perimeter;
  let perimeter2;
  let HeadGoverness;

  beforeEach(() => {
    HeadGoverness = new FactoryGirl('HeadGoverness');
    Perimeter = new FactoryGirl('Perimeter');
    child = new FactoryGirl('child');

    perimeter = new Perimeter({
      purpose: 'foo',

      govern: {
        'can watch': () => true,
        'cannot play': () => true
      },

      @guard('play')
      coolMethod() {},

      expose: [
        'coolMethod'
      ],

      governess: HeadGoverness
    });

    perimeter2 = new Perimeter({
      purpose: 'bar',

      govern: {
        'can watch': () => true,
        'can play': () => true
      },

      @guard('play')
      coolMethod() {},

      expose: [
        'coolMethod'
      ],

      governess: HeadGoverness
    });

    @sandbox(child, {
      perimeters: [
        perimeter
      ]
    })
    class MyClass {
      @guard
      watch() {}

      @guard
      play() {}
    }

    testingInstance = new MyClass();
  });

  it('should inherit loadModule method', () => {
    expect(testingInstance.loadModule).toBeFunction();
  });

  it('should inherit guard method', () => {
    expect(testingInstance.guard).toBeFunction();
  });

  it('should inherit isAllowed method', () => {
    expect(testingInstance.isAllowed).toBeFunction();
  });

  it('should know the child', () => {
    expect(testingInstance.child).toBeDefined();
    expect(testingInstance.child).toBe(child);
  });

  it('should know the purpose of it\'s perimeter', () => {
    expect(testingInstance.foo).toBeDefined();
  });

  it('can watch', () => {
    expect(() => {
      testingInstance.watch();
    }).not.toThrowError();
  });

  it('cannot play', () => {
    expect(() => {
      testingInstance.play();
    }).toThrowError('Child is not allowed to play the target.');
  });

  it('should work well with react', () => {
    @sandbox(child, {
      perimeters: [
        perimeter,
        perimeter2
      ]
    })
    class TestingComponent extends Component {
      @guard
      play() {}

      @guard
      watch() {}

      @guard('play')
      someOtherMethod() {}

      @guard('play', 'foo')
      anotherMethod() {}

      @guard('play', () => 'bar')
      anotherCoolMethod() {}

      @guard('play', function (arg) {
        this.newValue = arg;
      })
      someOtherCoolMethod() {}
    }

    const testingComponent = new TestingComponent();

    expect(testingComponent.isAllowed('watch')).toBe(true);
    expect(testingComponent.isAllowed('play')).toBe(false);

    expect(() => {
      testingComponent.watch();
    }).not.toThrowError();

    expect(() => {
      testingComponent.play();
    }).toThrowError('Child is not allowed to play the target.');

    expect(() => {
      testingComponent.someOtherMethod();
    }).toThrowError('Child is not allowed to play the target.');

    expect(testingComponent.foo.coolMethod).toBeFunction();

    expect(() => {
      testingComponent.foo.coolMethod();
    }).toThrowError('Child is not allowed to play the target.');

    expect(() => {
      testingComponent.bar.coolMethod();
    }).not.toThrowError();

    expect(testingComponent.anotherMethod()).toEqual('foo');

    expect(testingComponent.anotherCoolMethod()).toEqual('bar');

    expect(testingComponent.newValue).toBeUndefined();
    testingComponent.someOtherCoolMethod(123);
    expect(testingComponent.newValue).toBe(123);
  });
});
