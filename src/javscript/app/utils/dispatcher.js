import Bacon from 'baconjs';

const busCache = {};

function bus(name) {
  return busCache[name] = busCache[name] || new Bacon.Bus();
}

export default class Dispatcher {
  constructor() {}

  stream(name) {
    return bus(name);
  }

  push(name, value) {
    bus(name).push(value);
  }

  plug(name, value) {
    bus(name).plug(value);
  }
}
