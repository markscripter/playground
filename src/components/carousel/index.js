function Carousel(state) {
  const wireUp = (settings) => {
    $(state.target).slick(settings);
  };

  wireUp(JSON.parse(state.target.getAttribute('data-settings')));
}

export default Carousel;
