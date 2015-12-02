import { VERSION } from '../../lib/kindergarten/version';

describe('VERSION', function () {
  it('should have correct version number format', function () {
    expect(/^\d{1,2}\.\d{1,2}\.\d{1,2}$/.test(VERSION)).toBe(true);
  });
});
