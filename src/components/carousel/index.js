export default class Carousel {
  constructor(target, id) {
    this.id = id;
    this.target = target;
    this.settings = JSON.parse(target.getAttribute('data-settings'));
    this.init();
  }

  init() {
    $(this.target).slick(this.settings);
  }
}
