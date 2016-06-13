import FactoryGirl from '../support/FactoryGirl';

describe('BaseObject', () => {
  let BaseObject;
  let PubSub;

  beforeEach(() => {
    BaseObject = new FactoryGirl('BaseObject');
    PubSub = new FactoryGirl('PubSub');
  });

  it('inherits from PubSub', () => {
    expect((new BaseObject()) instanceof PubSub).toBe(true);
  });

  it('can be used to inherit from', () => {
    class MyClass extends BaseObject {}

    const myObject = new MyClass();

    expect(myObject instanceof PubSub).toBe(true);
    expect(myObject.on).toBeDefined();
  });
});
