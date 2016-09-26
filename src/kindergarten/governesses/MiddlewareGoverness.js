import HeadGoverness from './HeadGoverness';

export default class MiddlewareGoverness extends HeadGoverness {
  constructor(...args) {
    super(args);

    this.middleware = args[0];
  }

  governed(...args) {
    this.middleware(this, ...args);

    HeadGoverness.prototype.governed.apply(this, args);
  }
}
