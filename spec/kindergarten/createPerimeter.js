import _ from 'lodash';
import FactoryGirl from '../support/FactoryGirl';

describe('createPerimeter', () => {
  let createPerimeter;
  let Perimeter;
  let perimeter;
  let purpose;
  let govern;
  let exposedMethod;

  beforeEach(() => {
    purpose = 'foo';

    govern = {
      'can watch': /tv/
    };

    exposedMethod = _.noop;

    createPerimeter = new FactoryGirl('createPerimeter');

    Perimeter = new FactoryGirl('Perimeter');
    perimeter = createPerimeter({
      purpose,
      govern,
      expose: [
        'exposedMethod'
      ],
      exposedMethod
    });
  });

  it('Creates new instance of Perimeter', () => {
    expect(perimeter instanceof Perimeter).toBe(true);
  });

  it('passes purpose', () => {
    expect(perimeter.purpose).toBe(purpose);
  });

  it('passes govern', () => {
    expect(perimeter.govern).toBe(govern);
  });

  it('passes expose', () => {
    expect(perimeter.expose[0]).toBe('exposedMethod');
  });

  it('passes exposedMethod', () => {
    expect(perimeter.exposedMethod).toBe(exposedMethod);
  });
});
