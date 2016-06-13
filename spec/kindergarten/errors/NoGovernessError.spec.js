import FactoryGirl from '../../support/FactoryGirl';

describe('NoGovernessError', () => {
  let NoGovernessError;

  beforeEach(() => {
    NoGovernessError = new FactoryGirl('NoGovernessError');
  });

  it('has name NoGovernessError', () => {
    expect((new NoGovernessError()).name).toEqual('NoGovernessError');
  });

  it('accepts message', () => {
    const msg = 'foo';
    expect((new NoGovernessError(msg)).message).toEqual(msg);
  });

  it('iherits from Error', () => {
    expect((new NoGovernessError()) instanceof Error).toBe(true);
  });

  it('has default message', () => {
    expect((new NoGovernessError()).message).toBe(
      'Governess must be an instance of HeadGoverness.'
    );
  });
});
