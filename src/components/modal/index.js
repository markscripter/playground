/**
 * Instantiate's a modal window.
 * @module modalFactory
 * @author Mark Scripter [mscripter@horizontalintegration.com]
 * @param {object} settingsObj - A settings object for a given instance of a modal.
 * @requires Velocity, R
 * @returns {modal} - A modal object.
 * @example
 * import modalFactory from './components/modal';
 */
const modalFactory = (settingsObj = {target: document.querySelector('.modal')}) => {
  /**
  * Our state object.
  * @private
  * @example
  * const state = {
  *   target: document.querySelector,
  * }
  */
  const state = settingsObj;

  /**
   * A modal object.
   * @module modal
   * @author Mark Scripter [mscripter@horizontalintegration.com]
   * @example
   * import modalFactory from './components/modal';
   * const modal = modalFactory();
   */
  const modal = {

    /**
    * The open() method will open the modal by looking at state.target
    * @return {boolean} true
    * @example
    * modal.open()
    */
    open() {
      return $(state.target).velocity('fadeIn', {duration: 350}) ? 1 : 0;
    },

    /**
    * The close() method will close the modal by looking at state.target
    * @return {boolean} true
    * @example
    * modal.close()
    */
    close() {
      return $(state.target).velocity('fadeOut', {duration: 350}) ? 1 : 0;
    },

    /**
    * The renderContent() method inject a given HTML chunk to the modal's content area.
    * @return {boolean} true
    * @example
    * modal.renderContent(template)
    */
    renderContent(content) {
      state.target.querySelector('.content').innerHTML = content;
      return true;
    },
  };

  // events for closing the modal window
  // - close button
  state.target.querySelector('.close').addEventListener('click', () => modal.close());
  state.target.querySelector('.close').addEventListener('touch', () => modal.close());
  // - overlay container
  state.target.querySelector('.overlay').addEventListener('click', () => modal.close());
  state.target.querySelector('.overlay').addEventListener('touch', () => modal.close());

  return modal;
};

export default modalFactory;
