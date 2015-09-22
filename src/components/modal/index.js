import R from 'ramda';

function baseModal(targetElem, identifier) {
  const id = identifier;
  const target = targetElem;
  const settings = JSON.parse(target.getAttribute('data-settings'));
  $(target).colorbox(R.merge(settings, {href: $(target).parent().find('.modal-content')}));
}

export default function Modal(target, id) {
  return baseModal(target, id);
}
