import upperFirst from 'lodash/upperFirst';
import some from 'lodash/some';

import BaseObject from './base-object';
import Type from './rule/type';
import Definition from './rule/definition';

/**
 * The definition of Rule class.
 *
 * Rules are used by a governess. Governess can learn many rules and they are
 * defined in perimeter in most of the cases.
 */
export default class Rule extends BaseObject {
  constructor(str, def) {
    super();

    this.type = new Type(str);
    this.definition = new Definition(this, def);
  }

  verify(...args) {
    const verifyMethodName = `_verify${upperFirst(this.definition.type)}`;

    const result = this[verifyMethodName](...args);

    return this.type.isPositive() ?
      result : !result;
  }

  _verifyItems(...args) {
    const subject = args[0];

    return some(this.definition.items, (item) => {
      let isInstance = false;

      try {
        isInstance = subject instanceof item;
      } catch (ignore) {
        // Ignore if instanceof is not applicable
      }

      return isInstance || item === subject;
    });
  }

  _verifyRegex(...args) {
    const subject = args[0];

    return this.definition.regex.test(subject);
  }

  _verifyCustomMethod(...args) {
    const definition = this.definition;

    return definition.customMethod.apply(definition.ruleContext, args);
  }
}
