import fetch from 'isomorphic-fetch';
import getJSONResponse from './getJSONResponse';
import schemaExtractor from './schemaExtractor';

/**
 * A factory object that returns a Montage object.
 * @module montageFactory
 * @author Mark Scripter [mscripter@horizontalintegration.com]
 * @requires fetch, workflowFactory, schemaExtractor
 * @returns {montage}
 * @example
 * import montageFactory from './montageFactory';
 * const montageRunner = montageFactory(schema);
 */
function montageFactory() {
  /**
   * Our montage object
   * @module montage
   * @namespace montage
   * @param {function} extractFn - A function that returns a destructured schema
   * @param {string} endpoint - the endpoint you want to hit for JSON data
   * @author Mark Scripter [mscripter@horizontalintegration.com]
   * @example
   * import montageFactory from './montageFactory';
   * const montageRunner = montageFactory(schema);
   * montageRunner.init(settings)
   */
  const Montage = (extractFn, endpoint = '') => {
    return endpoint.length ?
      fetch(endpoint)
      .then(getJSONResponse)
      .then(schemaExtractor(extractFn))
      : 0;
  };

  return Montage;
}

export default montageFactory;
