import {HeadGoverness} from './head-governess';

/**
 * A very strict governess, forces all the sandbox methods to use the guard
 * methods.
 */
export class StrictGoverness extends HeadGoverness {
  constructor(child) {
    super(child);
    this.guardCount = 0;
  }

  // governed(method) {
  //   const before = this.guardCount;
  // }

  // guard(...args) {
  //   super(...args);
  //   ++this.guardCount;
  // }
}
