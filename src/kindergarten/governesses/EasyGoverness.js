import HeadGoverness from './HeadGoverness';

/**
 * Very easy governess who lets everything happen unguarded.
 */
export default class EasyGoverness extends HeadGoverness {
  constructor(...args) {
    super(...args);

    this.unguarded = true;
  }
}
