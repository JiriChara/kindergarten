import Hookies from 'hookies';

/**
 * Override trigger method from hookies to be synchronous by default
 */
export class PubSub extends Hookies.Hooks {
  constructor(...args) {
    super(...args);
  }

  /**
   * Trigger all events synchronously by default
   */
  trigger(name, ...args) {
    Hookies.Hooks.prototype.trigger.call(this, {
      name,
      sync: true,
      context: this
    }, ...args);
  }

  /**
   * Trigger asynchronously
   */
  triggerAsyc() {
    Hookies.Hooks.prototype.trigger.apply(this, arguments);
  }
}
