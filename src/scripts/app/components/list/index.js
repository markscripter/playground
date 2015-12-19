import riot from 'riot';
import dispatcher from '../../utils/dispatcher';
import template from './template';

export default riot.tag('list', template, (opts) => {
  this.on('mount', () => {});
  this.on('update', () => {});

  this.data = opts.data;

  dispatcher.on()
});
