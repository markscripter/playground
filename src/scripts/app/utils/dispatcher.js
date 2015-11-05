import stores from '../stores';

/**
 * This object defines our dispatcher. It has a few methods & keys that extend onto a store implementation.
 * @module dispatcher
 * @author Mark Scripter [mscripter@horizontalintegration.com]
 * @requires stores
 * @returns {dispatch} - A dispatcher object
 */
const dispatcher = {

  /**
  * This stores all of our data stores which can be accessible through the dispatcher.
  * @public
  * @example
  * this.dispatcher.stores
  */
  stores: stores,

  /**
  * Our internal stores, used to iterate through and call each store.
  * @private
  */
  _stores: Object.keys(stores).map((key) => {
    return stores[key];
  }),

  /**
  * Our 'on' method which allows us to subscribe|listen to an event.
  * @function on
  */
  on() {
    this._stores.forEach((el) => {
      el.on.apply(null, [].slice.call(arguments));
    });
  },

  /**
  * Our 'one' method which allows us to listen to an event, once.
  * @function one
  */
  one() {
    this._stores.forEach((el) => {
      el.one.apply(null, [].slice.call(arguments));
    });
  },

  /**
  * Our 'off' method which allows us to unsubscribe|unlisten to an event.
  * @function off
  */
  off() {
    this._stores.forEach((el) => {
      el.off.apply(null, [].slice.call(arguments));
    });
  },

  /**
  * Our 'trigger' method which allows us to trigger an event.
  * @function trigger
  */
  trigger() {
    this._stores.forEach((el) => {
      el.trigger.apply(null, [].slice.call(arguments));
    });
  },

};

export default dispatcher;
