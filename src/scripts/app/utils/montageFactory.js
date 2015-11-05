import fetch from 'isomorphic-fetch';
import workflowFactory from './workflowFactory';
import schemaExtractor from './schemaExtractor';

/**
 * A factory object that returns a Montage object.
 * @module montageFactory
 * @author Mark Scripter [mscripter@horizontalintegration.com]
 * @param {array} schema - an schema to use with the schemaExtractor
 * @requires fetch, workflowFactory, schemaExtractor
 * @returns {montage}
 * @example
 * import montageFactory from './montageFactory';
 * const montageRunner = montageFactory(schema);
 */
function montageFactory(schema = []) {
  const wkfl = workflowFactory();

  const getResponse = (res) => res.json();

  const runExtraction = (data) => new Promise((resolve, reject) => {
    const res = schemaExtractor.extract(data, schema);
    return res.length ? resolve(res) : reject(res);
  });

  const promiseWrapper = (item) => {
    // return the item wrapped in a promiseWrapper

  };

  /**
   * Our montage object
   * @module montage
   * @namespace montage
   * @author Mark Scripter [mscripter@horizontalintegration.com]
   * @example
   * import montageFactory from './montageFactory';
   * const montageRunner = montageFactory(schema);
   * montageRunner.init(settings)
   */
  const Montage = {
    /**
    * Our 'init' method which initializes and runs our montage.
    * @lends init
    */
    init(settings) {
      const dataFeed = settings.endpoint || '';
      dataFeed.length ? fetch(dataFeed)
        .then(getResponse)
        .then(runExtraction)
        .then((data) => {
          console.log(data);
        }) : 0;
    },
  };

  return Montage;
}

export default montageFactory;
