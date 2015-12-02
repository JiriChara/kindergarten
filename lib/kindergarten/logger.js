import { isFunction } from './utils/utils';

export const Logger = {
  _log(msg) {
    if (console && isFunction(console.log)) {
      /* eslint no-console: 0 */
      console.log(msg);
    }
  },

  log(msg) {
    Logger._log(msg);
  },

  warn(msg) {
    Logger._log(`WARN ${msg}`);
  }
};
