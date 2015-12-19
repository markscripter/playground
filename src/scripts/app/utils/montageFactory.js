import schemaExtractor from './schemaExtractor';

/**
 * A factory object that returns a Montage object.
 * @module montageFactory
 * @author Mark Scripter [markscript@gmail.com]
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
   * @example
   * import montageFactory from './montageFactory';
   * const montageRunner = montageFactory(schema);
   * montageRunner.init(settings)
   */
  const montage = (extractFn, endpoint = '') => {
    const schemaFunction = schemaExtractor(extractFn);

    return endpoint.length ?
      fetch(endpoint)
      .then(schemaFunction)
      : 0;
  };

  return montage;
}

export default montageFactory;
