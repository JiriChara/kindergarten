import FactoryGirl from '../support/FactoryGirl';

describe('BaseObject', () => {
  beforeEach(function () {
    this.BaseObject = new FactoryGirl('BaseObject');
    this.PubSub = new FactoryGirl('PubSub');
  });

  it('inherits from PubSub', function () {
    expect((new this.BaseObject()) instanceof this.PubSub).toBe(true);
  });

  it('can be used to inherit from', function () {
    class MyClass extends this.BaseObject {}

    const myObject = new MyClass();

    expect(myObject instanceof this.PubSub).toBe(true);
    expect(myObject.on).toBeDefined();
  });
});
