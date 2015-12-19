import riot from 'riot';
import template from './template';

export default riot.tag('list-item', template, (opts) => {
  this.on('mount', () => {});
  this.on('update', () => {});

  this.data = opts.data;
});
