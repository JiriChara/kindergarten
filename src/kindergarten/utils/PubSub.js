import { Hooks } from 'hookies';

/**
 * Override trigger method from hookies to be synchronous by default
 */
export default class PubSub extends Hooks {
  /**
   * Trigger all events synchronously by default
   */
  trigger(name, ...args) {
    return super.trigger({
      name,
      sync: true,
      context: this
    }, ...args);
  }

  /**
   * Trigger asynchronously
   */
  triggerAsync(...args) {
    return super.trigger(...args);
  }
}
