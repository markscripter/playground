import stores from '../stores';

/**
 * @module dispatcher
 * @classdesc This Object defines our dispatcher. It has a few methods & keys that extend a store implementation.
 * @author Mark Scripter [mscripter@horizontalintegration.com]
 * @requires 'stores'
 */
const dispatcher = {

  /**
  * @public {Object} stores - This stores all of our data stores which can be accessible through the dispatcher.
  * @example
  * this.dispatcher.stores
  */
  stores: stores,

  /**
  * This function creates an array of our stores keys this allows us to extend the observable that is attached to each store
  * @param {object} stores - The store object we imported.
  */
  _stores: Object.keys(stores).map((key) => {
    return stores[key];
  }),

  /**
  * This method is our 'on' facade for our stores.
  * It goes through our _stores and calls each functions 'on' method.
  * Usage: to add a listener for a given event.
  */
  on() {
    this._stores.forEach((el) => {
      el.on.apply(null, [].slice.call(arguments));
    });
  },

  /**
  * This method is our 'one' facade for our stores.
  * It goes through our _stores and calls each functions 'one' method.
  * Usage:
  */
  one() {
    this._stores.forEach((el) => {
      el.one.apply(null, [].slice.call(arguments));
    });
  },

  /**
  * This method is our 'off' facade for our stores.
  * It goes through our _stores and calls each functions 'off' method.
  * Usage: to remove a listener for a given event.
  */
  off() {
    this._stores.forEach((el) => {
      el.off.apply(null, [].slice.call(arguments));
    });
  },

  trigger() {
    this._stores.forEach((el) => {
      el.trigger.apply(null, [].slice.call(arguments));
    });
  },

};

export default dispatcher;
