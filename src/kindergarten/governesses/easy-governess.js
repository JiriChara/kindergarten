import HeadGoverness from './head-governess';

/**
 * Very easy governess who lets everything happen unguarded.
 */
export default class EasyGoverness extends HeadGoverness {
  constructor(child) {
    super(child);
    this.unguarded = true;
  }
}
