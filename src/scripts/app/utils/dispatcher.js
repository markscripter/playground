/**
* @requires 'baconjs'
*/
import Bacon from 'baconjs';

/**
* @private {Object} busCache - An empty object to hold all of the streams.
*/
let busCache;

/**
* @function bus
* @private {Object} busCache - An empty object to hold all of the streams.
*/
function bus(name) {
  busCache[name] = busCache[name] || new Bacon.Bus();
  return busCache[name];
}

/**
 * @class Dispatcher
 * @classdesc The dispatcher class allows you to create streams.
 * @author Mark Scripter [mscripter@horizontalintegration.com]
 */
class Dispatcher {

  /**
  * This is the constructor method for the Dispatcher class.
  * @param {object} currBusCache - An Bacon.Bus object that currently has already been created.
  */
  constructor(currBusCache = {}) {
    busCache = currBusCache;
  }

  /**
  * This is the stream function of the Dispatcher class. It is used to get a stream, by name. If one doesn't exist, it will create a new Bacon.Bus() object.
  * @param {string} name - The stream we want to get, by name.
  * @returns {object} Bacon.Bus() - A Bacon.bus object in the busCache.
  */
  stream(name = '') {
    return name !== '' ? bus(name) : null;
  }

  /**
  * This is the push function of the Dispatcher class. It is used to push an item (value), onto a given stream (name).
  * @param {string} name - The name of the steam you want to push something to.
  * @param {string} value - The value you want to send to the stream.
  * @returns
  */
  push(name = '', value = '') {
    bus(name).push(value);
  }

  /**
  * This is the stream function of the Dispatcher class.
  * @param {string} name - The name of the steam you want to plug.
  * @param {string} value - The value you want to plug the stream with.
  * @returns
  */
  plug(name = '', value = '') {
    bus(name).plug(value);
  }
}

export default Dispatcher;
