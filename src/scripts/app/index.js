import R from 'ramda';
import guid from './utils/guid';

// import Dispatcher from './utils/dispatcher';
// import Requester from './utils/requester';

// const dispatcher = new Dispatcher();

export default class Hi {
  // Initialization code
  constructor() {
    this.channels = {};
    this.registeredModules = {};
  }

  // Module Registration
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

  unregister(module) {
    const name = module.name.toLowerCase();
    if (this.isRegistered(name)) {
      delete this.registeredModules[name];
    }
  }

  isRegistered(key) {
    return R.curry((registered, item) => {
      return R.has(item, registered);
    })(this.registeredModules || {})(key);
  }

  instantiateModules(module) {
    const moduleName = module.getAttribute('data-module');
    if (this.isRegistered(moduleName)) {
      this.registeredModules[moduleName](module, guid());
    }
  }

  wireupModule(key) {
    // run handlers and enhancers
    R.forEach(this.instantiateModules.bind(this), document.querySelectorAll('[data-module="' + key + '"]'));
  }

  // Mediator || Pub/Sub
  installTo(obj) {
    obj.subscribe = this.subscribe;
    obj.publish = this.publish;
  }

  subscribe(channel, callback) {
    if (!this.channels[channel]) this.channels[channel] = [];
    this.channels[channel].push({context: this, receive: callback});
    return this;
  }

  publish(channel, data) {
    if (!this.channels[channel]) return false;
    this.channels[channel].forEach((subscriber) => {
      subscriber.receive(subscriber.context, data);
    });
  }
}
