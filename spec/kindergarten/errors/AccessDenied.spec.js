import FactoryGirl from '../../support/FactoryGirl';

describe('AccessDenied', () => {
  let AccessDenied;

  beforeEach(() => {
    AccessDenied = new FactoryGirl('AccessDenied');
  });

  it('has name AccessDenied', () => {
    expect((new AccessDenied()).name).toEqual('AccessDenied');
  });

  it('accepts message', () => {
    const msg = 'foo';
    expect((new AccessDenied(msg)).message).toEqual(msg);
  });

  it('iherits from Error', () => {
    expect((new AccessDenied()) instanceof Error).toBe(true);
  });

  it('has default message', () => {
    expect((new AccessDenied()).message).toBeUndefined();
  });
});
