import Promise from 'bluebird';  // our Promises library

/**
 * @module schemaExtractor Object
 * @classdesc
 * @author Mark Scripter [mscripter@horizontalintegration.com]
 * @requires bluebird
 * @example
 * import schemaExtractor from './schemaExtractor';
 */
const schemaExtractor = {
  /**
  * extract()
  * @desc
  * @param {object} data - a JSON data object to go through
  * @param {array} schema - An array of schema objects to use.
  * @return {array} - An array of items from 'data' that adhears to the given 'schema'
  * @example
  * import schemaExtractor from './schemaExtractor';
  * const data = {
  *   introduction: {
  *     text: "some text"
  *   },
  *   videos: [
  *     {
  *       url: "/path/to/src"
  *     }.
  *     {
  *       url: "/path/to/src"
  *     },
  *     {
  *       url: "/path/to/src"
  *     }
  *   ],
  *   fail: {
  *     text: "some text"
  *   }
  * };
  * const schema = [
  *   {
  *     order: 1,
  *     key: 'introduction',
  *     value: 'first',
  *     type: 'object',
  *   },
  *   {
  *     order: 2,
  *     key: 'videos',
  *     value: 'sequence',
  *     type: 'array',
  *   },
  *   {
  *     order: 3,
  *     key: 'fail',
  *     value: 'last',
  *     type: 'object',
  *   },
  * ];
  * const results = schemaExtractor.extract(data, schema);
  * console.log(results); // outputs: [
  *   {
  *     text: "some text"
  *   },
  *   [
  *     {
  *       url: "/path/to/src"
  *     }.
  *     {
  *       url: "/path/to/src"
  *     },
  *     {
  *       url: "/path/to/src"
  *     }
  *   ],
  *   {
  *     text: "some text"
  *   }
  * ]
  */
  extract(data, schema = []) {
    const schemaArr = [];
    schema.sort((a, b) => {
      return a.order < b.order ? -1 :
             a.order > b.order ?  1 : 0;
    });

    schema.map((curr) =>
      typeof data[curr.key] === curr.type || Array.isArray(data[curr.key]) ?
        schemaArr.push(data[curr.key]) :
        0);

    return schemaArr;
  },
};

export default schemaExtractor;
