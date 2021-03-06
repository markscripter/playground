import riot from 'riot';

/**
* @constant {observable} riot.observable - Uses riot.observable to create a new, controlled observable.
* @private
*/
const control = riot.observable({});

/**
 * This Object defines our base store. It is used within actual stores to extend the store functionality.
 * @module store
 * @author Mark Scripter [markscript@gmail.com]
 * @requires riot
 * @returns {store} - Returns a store object to extend onto an actual store, giving it the store functionality.
 */
const dispatcher = {
  /**
  * Our 'on' method which allows us to subscribe|listen to an event.
  * @function on
  */
  on() {
    control.on.apply(this, [].slice.call(arguments));
  },

  /**
  * Our 'one' method which allows us to listen to an event, once.
  * @function one
  */
  one() {
    control.one.apply(this, [].slice.call(arguments));
  },

  /**
  * Our 'off' method which allows us to unsubscribe|unlisten to an event.
  * @function off
  */
  off() {
    control.off.apply(this, [].slice.call(arguments));
  },

  /**
  * Our 'trigger' method which allows us to trigger an event.
  * @function trigger
  */
  trigger() {
    control.trigger.apply(this, [].slice.call(arguments));
  },
};

export default dispatcher;
