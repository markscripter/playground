export default class Accordion {
  constructor(target, id) {
    this.id = id;
    this.target = target;
    this.settings = JSON.parse(target.getAttribute('data-settings'));
  }

  init() {
    // do something
  }
}
