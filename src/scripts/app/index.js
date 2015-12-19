import R from 'ramda';
import riot from 'riot';
import dispatcher from './utils/dispatcher';
import APP_EVENTS from './events/appEvents';

// cache is for an internal cache of modules.
// This is used to restore a module if needed.
const cache = {};

// registeredModules holds all modules that have been registered
// with the application.
const registeredModules = {};

/**
* Takes an key and checks to see if it is registered within our registeredModules.
* @param {string} key - The name of the module you want to verify.
* @returns {boolean} boolean - Returns true if found, otherwise false.
*/
function objectContains(object) {
  return R.curry((obj, name) => R.has(name, obj))(object);
}

/**
* Takes an key and checks to see if it is registered within our registeredModules.
* @param {string} key - The name of the module you want to verify.
* @returns {boolean} boolean - Returns true if registered, otherwise false.
*/
function isRegistered(key) {
  return objectContains(registeredModules || {})(key);
}

/**
* Takes an key and checks to see if it is cached  within our application.
* @param {string} key - The name of the module you want to verify.
* @returns {boolean} boolean - Returns true if registered, otherwise false.
*/
function isCached(key) {
  return objectContains(cache || {})(key);
}

/**
* Takes a module that's referenced on the DOM, verifies the module is registered and instantiates it.
* @param {object} module - The DOM element to instantiate a module from.
* @returns
*/
function instantiateModules(module) {
  const moduleName = module.getAttribute('data-module');
  isRegistered(moduleName) ?
    registeredModules[moduleName]({target: module}) :
    0;
}

/**
* A method that get's an array of modules, by name, from the DOM, iterates through the array and calls instantiateModules for each item.
* @param {string} key - The name of the module you want to wireup.
* @returns
*/
function wireupModule(key) {
  // run handlers and enhancers
  R.forEach(instantiateModules, document.querySelectorAll('[data-module="' + key + '"]'));
}

/**
 * The main application for HI Projects.
 * @module Hi
 * @author Mark Scripter [markscript@gmail.com]
 * @requires 'ramda'
 * @requires './utils/dispatcher'
 */
const app = {
  registerModule(module) {
    const name = module.name.toLowerCase();

    if (!isRegistered(name)) {
      // if our module is not cached,
      if (!isCached(name)) {
        // Cache it,
        cache[name] = module;

        // register module
        registeredModules[name] = module;
      } else {
        // otherwise if it is cached, use cached module.
        registeredModules[name] = cache[name];
      }
    }

    wireupModule(name);
  },

  /**
  * This method takes a module, and unregisters it from the application.
  * @param {object} module - The module we want to unregister.
  * @returns {boolean} boolean - Returns true if successfully removed, otherwise false.
  */
  unregisterModule(module) {
    const name = module.name.toLowerCase();
    isRegistered(name) ?
      (delete registeredModules[name], 1) :
      0;
  },
};

window.onload = () => {
  dispatcher.trigger(APP_EVENTS.APP_STARTED);
  riot.route('/', () => console.log('homepage'));
  riot.route.start(true);
};

export default app;
