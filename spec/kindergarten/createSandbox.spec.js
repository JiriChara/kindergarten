import FactoryGirl from '../support/FactoryGirl';

describe('createSandbox', () => {
  let createSandbox;
  let Sandbox;
  let sandbox;
  let child;
  let governess;
  let perimeters;

  beforeEach(() => {
    child = new FactoryGirl('child');
    governess = new (new FactoryGirl('HeadGoverness'))(child);
    Sandbox = new FactoryGirl('Sandbox');
    createSandbox = new FactoryGirl('createSandbox');
    perimeters = [
      (new FactoryGirl('createPerimeter'))({
        purpose: 'foo',
        govern: {
          'can watch': /tv/
        }
      })
    ];
    sandbox = createSandbox(child, {
      governess,
      perimeters
    });
  });

  it('creates new instance of Sandbox', () => {
    expect(sandbox instanceof Sandbox).toBe(true);
  });

  it('initializes child', () => {
    expect(sandbox.child).toBe(child);
  });

  it('initializes governess ', () => {
    expect(sandbox.governess).toBe(governess);
  });

  it('initializes perimeters ', () => {
    expect(sandbox.getPerimeters()).toEqual(perimeters);
  });
});
