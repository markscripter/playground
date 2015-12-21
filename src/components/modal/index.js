import velocity from 'velocity-animate';
/**
 * Instantiate's a modal window.
 * @module modal
 * @author Mark Scripter [markscript@gmail.com]
 * @param {object} settingsObj - A settings object for a given instance of a modal.
 * @requires Velocity, R
 * @returns {modal} - A modal object.
 * @example
 * import modal from './components/modal';
 */
const modal = (settingsObj = {target: document.querySelector('.modal')}) => {
  /**
  * Our state object.
  * @private
  * @example
  * const state = {
  *   target: document.querySelector,
  * }
  */
  const { target } = settingsObj;

  /**
   * A modal object.
   * @module modal
   * @example
   * import modalFactory from './components/modal';
   * const modal = modalFactory();
   */
  return {
    /**
    * The open() method will open the modal by looking at state.target
    * @return {boolean} true
    * @example
    * modal.open()
    */
    open() {
      return velocity(target, 'fadeIn', {duration: 350}) ? 1 : 0;
    },

    /**
    * The close() method will close the modal by looking at state.target
    * @return {boolean} true
    * @example
    * modal.close()
    */
    close() {
      setTimeout(() => modal.renderContent(''), 500);
      return velocity(target, 'fadeOut', {duration: 350}) ? 1 : 0;
    },

    /**
    * The renderContent() method inject a given HTML chunk to the modal's content area.
    * @return {boolean} true
    * @example
    * modal.renderContent(template)
    */
    renderContent(content) {
      return new Promise((resolve, reject) => {
        try {
          target.querySelector('.content').innerHTML = content;
          resolve();
        } catch (e) {
          console.log('renderContent Error', e);
          reject(e);
        }
      });
    },
  };
};

export default modal;
