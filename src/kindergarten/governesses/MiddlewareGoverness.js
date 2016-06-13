import HeadGoverness from './HeadGoverness';

export default class MiddlewareGoverness extends HeadGoverness {
  constructor(child, middleware) {
    super(child);

    this.middleware = middleware;
  }

  governed(...args) {
    this.middleware(this, ...args);

    HeadGoverness.prototype.governed.apply(this, args);
  }
}
