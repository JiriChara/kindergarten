import FactoryGirl from '../../support/FactoryGirl';

describe('WrongRuleDefinition', () => {
  let WrongRuleDefinition;

  beforeEach(() => {
    WrongRuleDefinition = new FactoryGirl('WrongRuleDefinition');
  });

  it('has name WrongRuleDefinition', () => {
    expect((new WrongRuleDefinition()).name).toEqual('WrongRuleDefinition');
  });

  it('accepts message', () => {
    const msg = 'foo';
    expect((new WrongRuleDefinition(msg)).message).toEqual(msg);
  });

  it('iherits from Error', () => {
    expect((new WrongRuleDefinition()) instanceof Error).toBe(true);
  });

  it('has default message', () => {
    expect((new WrongRuleDefinition()).message).toBeUndefined();
  });
});
