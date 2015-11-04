function Accordion(state) {
  const wireUp = (settings) => {
    $(state.target).colorbox(settings);
  };

  wireUp(JSON.parse(state.target.getAttribute('data-settings')));
}

export default Accordion;
