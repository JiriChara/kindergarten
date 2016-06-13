import FactoryGirl from '../support/FactoryGirl';

describe('createRule', () => {
  let createRule;
  let Rule;
  let Type;
  let Definition;
  let rule;
  let regex;

  beforeEach(() => {
    regex = /xxx/;
    createRule = new FactoryGirl('createRule');
    Rule = new FactoryGirl('Rule');
    Type = new FactoryGirl('Type');
    Definition = new FactoryGirl('Definition');
    rule = createRule('cannot visit', regex);
  });

  it('Creates new instance of Rule', () => {
    expect(rule instanceof Rule).toBe(true);
  });

  it('passes the type', () => {
    expect(rule.type instanceof Type).toBe(true);
  });

  it('passes the type raw value', () => {
    expect(rule.type.raw).toBe('cannot visit');
  });

  it('passes the definition', () => {
    expect(rule.definition instanceof Definition).toBe(true);
  });

  it('passes the definition raw value', () => {
    expect(rule.definition.raw).toBe(regex);
  });
});
