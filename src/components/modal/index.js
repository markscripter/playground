// import R from 'ramda';

function Modal(state) {
  const wireUp = (settings) => {
    $(state.target).colorbox(settings);
  };

  wireUp(R.merge(JSON.parse(state.target.getAttribute('data-settings')), {href: $(state.target).parent().find('.modal-content')}));
}

export default Modal;
