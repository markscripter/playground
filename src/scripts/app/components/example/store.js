import dispatcher from '../../utils/dispatcher';
import EVENTS from './events';

const exampleStore = {
  data: [],

  update(data) {
    Array.isArray(data) ?
      (this.data = data,
        dispatcher.trigger(EVENTS.EXAMPLE_STORE_UPDATED)) :
      0;
  },

  setupEvents() {
    dispatcher.on(EVENTS.NEW_EXAMPLE_DATA, async (data) => this.update(data));
  },
};

export default exampleStore;
