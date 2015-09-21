import R from 'ramda';

function baseModal(target, id) {
  this.id = id;
  this.target = target;
  this.settings = JSON.parse(this.target.getAttribute('data-settings'));

  function init() {
    $(this.target).colorbox(R.merge(this.settings, {href: $(this.target).parent().find('.modal-content')}));
  }

  init();
}

export default function Modal(target, id) {
  return baseModal(target, id);
}
