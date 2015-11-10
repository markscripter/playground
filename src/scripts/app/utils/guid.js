/**
 * This function creates a unique guid and returns it.
 * @module guid
 * @author Mark Scripter [mscripter@horizontalintegration.com]
 * @returns {guid} - A unique string similar to "aa1bbed7-f92e-da44-a5c5-54b23e170f2f"
 * @example
 * import guid from './guid';
 * var res = guid();
 * console.log(res);
 * // outputs a string similar to "aa1bbed7-f92e-da44-a5c5-54b23e170f2f"
 */
const guid = () => {
  /**
  * Our 's4' method which returns a unique 4 character long string.
  * @function s4
  * @returns {string}
  * @private
  */
  const s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };

  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
};

export default guid;
