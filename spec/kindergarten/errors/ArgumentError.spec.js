import FactoryGirl from '../../support/FactoryGirl';

describe('ArgumentError', () => {
  let ArgumentError;

  beforeEach(() => {
    ArgumentError = new FactoryGirl('ArgumentError');
  });

  it('has name ArgumentError', () => {
    expect((new ArgumentError()).name).toEqual('ArgumentError');
  });

  it('accepts message', () => {
    const msg = 'foo';
    expect((new ArgumentError(msg)).message).toEqual(msg);
  });

  it('iherits from Error', () => {
    expect((new ArgumentError()) instanceof Error).toBe(true);
  });

  it('has default message', () => {
    expect((new ArgumentError()).message).toBeUndefined();
  });
});
