import { Logger } from '../../lib/kindergarten/logger';

describe('Logger', function () {
  beforeEach(function () {
    this.Logger = Logger;
    this.oldConsoleLog = console.log;
  });

  afterEach(function () {
    console.log = this.oldConsoleLog;
  });

  describe('_log() static method', function () {
    it('calls console.log with the given message', function () {
      const msg = 'foo';

      spyOn(console, 'log');

      Logger._log(msg);

      /* eslint no-console: 0 */
      expect(console.log).toHaveBeenCalledWith(msg);
    });

    it('does not call console.log if not defined', function () {
      /* eslint no-native-reassign: 0 */
      console.log = undefined;

      const msg = 'foo';

      Logger._log(msg); // does not throw an error
    });
  });

  describe('log() static method', function () {
    it('works', function () {
      const msg = 'foo';
      Logger.log(msg);
    });

    it('calls _log() static method', function () {
      const msg = 'foo';

      spyOn(Logger, '_log');

      Logger.log(msg);

      expect(Logger._log).toHaveBeenCalledWith(msg);
    });
  });

  describe('warn() static method', function () {
    it('works', function () {
      const msg = 'foo';
      Logger.warn(msg);
    });

    it('calls _log() static method', function () {
      const msg = 'foo';

      spyOn(Logger, '_log');

      Logger.warn(msg);

      expect(Logger._log).toHaveBeenCalledWith(`WARN ${msg}`);
    });
  });
});
