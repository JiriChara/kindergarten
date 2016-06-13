import FactoryGirl from '../../support/FactoryGirl';

describe('RestrictedMethodError', () => {
  let RestrictedMethodError;

  beforeEach(() => {
    RestrictedMethodError = new FactoryGirl('RestrictedMethodError');
  });

  it('has name RestrictedMethodError', () => {
    expect((new RestrictedMethodError()).name).toEqual('RestrictedMethodError');
  });

  it('accepts message', () => {
    const msg = 'foo';
    expect((new RestrictedMethodError(msg)).message).toEqual(msg);
  });

  it('iherits from Error', () => {
    expect((new RestrictedMethodError()) instanceof Error).toBe(true);
  });

  it('has default message', () => {
    expect((new RestrictedMethodError()).message).toBeUndefined();
  });
});
