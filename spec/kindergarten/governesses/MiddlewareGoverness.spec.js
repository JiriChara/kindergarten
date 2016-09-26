import FactoryGirl from '../../support/FactoryGirl';

describe('MiddlewareGoverness', () => {
  let child;
  let Tv;
  let tv;
  let MiddlewareGoverness;
  let Perimeter;
  let Sandbox;
  let middlewareGoverness;
  let perimeter;
  let sandbox;
  let middleware;

  beforeEach(() => {
    child = new FactoryGirl('child');
    Tv = new FactoryGirl('Tv');
    tv = new Tv();
    middleware = jasmine.createSpy('middleware');

    MiddlewareGoverness = new FactoryGirl('MiddlewareGoverness');
    Perimeter = new FactoryGirl('Perimeter');
    Sandbox = new FactoryGirl('Sandbox');

    middlewareGoverness = new MiddlewareGoverness(
      middleware
    );

    perimeter = new Perimeter({
      purpose: 'playing',

      govern: {
        'can watch': [Tv]
      },

      expose: [
        'watch'
      ],

      watch() {
        return true;
      }
    });

    sandbox = new Sandbox(child);
    sandbox.loadPerimeter(perimeter);

    sandbox.governess = middlewareGoverness;
  });

  afterEach(() => {
    middleware.calls.reset();
  });

  it('calls the middleware method', () => {
    sandbox.playing.watch(tv);

    expect(middleware).toHaveBeenCalled();
  });

  it('passes instance of governess as a first argument', () => {
    sandbox.playing.watch(tv);

    const allArgs = middleware.calls.allArgs()[0];

    expect(allArgs[0]).toBe(middlewareGoverness);
  });

  it('passes the exposed method as second argument', () => {
    sandbox.playing.watch(tv);

    const allArgs = middleware.calls.allArgs()[0];
    expect(allArgs[1]).toBe(perimeter.watch);
  });

  it('passes argumets passed to exposed method call as a third arg', () => {
    sandbox.playing.watch(tv);

    const allArgs = middleware.calls.allArgs()[0];
    expect(allArgs[2]).toEqual([tv]);
  });

  it('passes perimeter as a fourth argument', () => {
    sandbox.playing.watch(tv);

    const allArgs = middleware.calls.allArgs()[0];
    expect(allArgs[3]).toBe(perimeter);
  });
});
