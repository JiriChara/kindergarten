import FactoryGirl from '../../support/FactoryGirl';

describe('NoPurposeError', () => {
  let NoPurposeError;

  beforeEach(() => {
    NoPurposeError = new FactoryGirl('NoPurposeError');
  });

  it('has name NoPurposeError', () => {
    expect((new NoPurposeError()).name).toEqual('NoPurposeError');
  });

  it('accepts message', () => {
    const msg = 'foo';
    expect((new NoPurposeError(msg)).message).toEqual(msg);
  });

  it('iherits from Error', () => {
    expect((new NoPurposeError()) instanceof Error).toBe(true);
  });

  it('has default message', () => {
    expect((new NoPurposeError()).message).toBe('Perimeter must have a purpose.');
  });
});
