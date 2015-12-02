import {_} from 'lodash';

import {Perimeter} from '../../lib/kindergarten/perimeter';
import {Sandbox} from '../../lib/kindergarten/sandbox';
import {HeadGoverness} from '../../lib/kindergarten/governesses/head-governess';

export class FactoryGirl {
  constructor(obj, ...args) {
    const objFactory = `${obj}Factory`;

    return _.isFunction(this[objFactory]) ?
      this[objFactory].apply(this, args) :
      jasmine.createSpyObj(args[0], (args.shift() ? args : ['foo']));
  }

  TelevisionFactory() {
    return class {};
  }

  CableTvFactory() {
    return class {};
  }

  perimeterFactory(...args) {
    return (args.length === 2) ?
      (new Perimeter(...args)) :
      (new Perimeter('playing', {
        govern: {
          'can watch': {
            items: [new FactoryGirl('television')]
          },
          'cannot watch': {
            items: [new FactoryGirl('cableTv')]
          }
        }
      }));
  }

  sandboxFactory(...args) {
    return (args.length === 1) ?
      (new Sandbox(args[0])) :
      (new Sandbox(new FactoryGirl('child')));
  }

  headGovernessFactory(...args) {
    return (args.length === 1) ?
      (new HeadGoverness(args[0])) :
      (new HeadGoverness(new FactoryGirl('child')));
  }
}
