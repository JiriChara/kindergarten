import FactoryGirl from '../../support/FactoryGirl';

describe('NoExposedMethodError', () => {
  let NoExposedMethodError;

  beforeEach(() => {
    NoExposedMethodError = new FactoryGirl('NoExposedMethodError');
  });

  it('has name NoExposedMethodError', () => {
    expect((new NoExposedMethodError()).name).toEqual('NoExposedMethodError');
  });

  it('accepts message', () => {
    const msg = 'foo';
    expect((new NoExposedMethodError(msg)).message).toEqual(msg);
  });

  it('iherits from Error', () => {
    expect((new NoExposedMethodError()) instanceof Error).toBe(true);
  });

  it('has default message', () => {
    expect((new NoExposedMethodError()).message).toBeUndefined();
  });
});
