import FactoryGirl from '../../support/FactoryGirl';

describe('NoSandboxError', () => {
  let NoSandboxError;

  beforeEach(() => {
    NoSandboxError = new FactoryGirl('NoSandboxError');
  });

  it('has name NoSandboxError', () => {
    expect((new NoSandboxError()).name).toEqual('NoSandboxError');
  });

  it('accepts message', () => {
    const msg = 'foo';
    expect((new NoSandboxError(msg)).message).toEqual(msg);
  });

  it('iherits from Error', () => {
    expect((new NoSandboxError()) instanceof Error).toBe(true);
  });

  it('has default message', () => {
    expect((new NoSandboxError()).message).toBe('Perimeter must be imported into a sandbox.');
  });
});
