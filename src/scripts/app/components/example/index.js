import riot from 'riot';
import template from './template';
import dispatcher from '../../utils/dispatcher';

import store from './store';
import EVENTS from './events';

export default riot.tag('list-item', template, (opts) => {
  this.on('mount', () => {});
  this.on('update', () => {});

  this.data = opts.data;

  dispatcher.on(EVENTS.EXAMPLE_STORE_UPDATED, () => {
    this.data = store.data;
  });
});
