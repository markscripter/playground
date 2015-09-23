/**
* @requires 'ramda'
* @requires './utils/guid'
*/
import R from 'ramda';
import guid from './utils/guid';
import Dispatcher from './utils/dispatcher';

/**
* @private {Object} dispatcher - Our dispatcher object
*/
const dispatcher = new Dispatcher();

/**
 * @class Hi
 * @classdesc The main application for HI Projects.
 * @author Mark Scripter [mscripter@horizontalintegration.com]
 */
class Hi {

  /**
  * This is the constructor method for the Hi class.
  */
  constructor() {
    this.channels = {};
    this.registeredModules = {};
    this.dispatcher = dispatcher;
  }

  /**
  * This method takes a module, registers it if it doesn't exist and then wires up any DOM item that references the module.
  * @param {object} module - The module we want to register.
  * @returns
  */
  register(module) {
    const name = module.name.toLowerCase();
    if (!this.isRegistered(name)) {
      this.registeredModules[name] = module;
      this.wireupModule(name);
    } else {
      // module is registered
      // wireup any new instances that were added to the DOM
      this.wireupModule(name);
    }
  }

  /**
  * This method takes a module, and unregisters it from the application.
  * @param {object} module - The module we want to unregister.
  * @returns {boolean} boolean - Returns true if successfully removed, otherwise false.
  */
  unregister(module) {
    const name = module.name.toLowerCase();
    if (this.isRegistered(name)) {
      delete this.registeredModules[name];
    }
  }

  /**
  * Takes an key and checks to see if it is registered within out registeredModules.
  * @param {string} key - The name of the module you want to verify.
  * @returns {boolean} boolean - Returns true if registered, otherwise false.
  */
  isRegistered(key) {
    return R.curry((registered, item) => {
      return R.has(item, registered);
    })(this.registeredModules || {})(key);
  }

  /**
  * Takes a module that's referenced on the DOM, verifies the module is registered and instantiates it.
  * @param {object} module - The DOM element to instantiate a module from.
  * @returns
  */
  instantiateModules(module) {
    const moduleName = module.getAttribute('data-module');
    if (this.isRegistered(moduleName)) {
      this.registeredModules[moduleName]({target: module, id: guid()});
    }
  }

  /**
  * A method that get's an array of modules, by name, from the DOM, iterates through the array and calls instantiateModules for each item.
  * @param {string} key - The name of the module you want to wireup.
  * @returns
  */
  wireupModule(key) {
    // run handlers and enhancers
    R.forEach(this.instantiateModules.bind(this), document.querySelectorAll('[data-module="' + key + '"]'));
  }

  /**
  *
  * @param {object} module -
  * @returns
  */
  installTo(obj) {
    obj.subscribe = this.subscribe;
    obj.publish = this.publish;
  }

  /**
  * :
  * @param {object} module -
  * @returns
  */
  subscribe(channel, callback) {
    if (!this.channels[channel]) this.channels[channel] = [];
    this.channels[channel].push({context: this, receive: callback});
    return this;
  }

  /**
  * :
  * @param {object} module -
  * @returns
  */
  publish(channel, data) {
    if (!this.channels[channel]) return false;
    this.channels[channel].forEach((subscriber) => {
      subscriber.receive(subscriber.context, data);
    });
  }
}

export default Hi;
