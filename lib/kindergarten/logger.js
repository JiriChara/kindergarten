export class Logger {
  static _log(msg) {
    /* eslint no-console: 0 */
    console.log(msg);
  }

  static log(msg) {
    Logger._log(msg);
  }

  static warn(msg) {
    Logger._log(`WARN ${msg}`);
  }
}
