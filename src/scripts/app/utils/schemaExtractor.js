/**
 * A schema extraction function, given a schema and data.
 * @module schemaExtractor
 * @author Mark Scripter [markscript@gmail.com]
 * @param {function} extractFn - A function that returns a destructured schema
 * @param {object} data - A JSON object typically returned from a JSON endpoint
 * @requires R
 * @returns {function} R.curry(schemaExtractor);
 * @example
 *  import schemaExtractor from './schemaExtractor';
 *
 *  const schemaExtraction = (data) => {
 *    const {introduction, videos, fail, pass} = data;
 *    return [introduction, videos, fail, pass];
 *  };
 *
 *  const data = {
 *    introduction: "intro text",
 *    videos: [
 *      {
 *        id: 0,
 *        src: "/url/to/src"
 *      },
 *      {
 *        id: 1,
 *        src: "/url/to/src"
 *      }
 *    ],
 *    fail: "fail text",
 *    pass: "pass text"
 *  }
 *
 *  const runExtraction = schemaExtractor(schemaExtraction);
 *  const results = runExtraction(data);
 *  results.then((res)=>{
 *    console.log(res); // outputs: ["intro text", [{id: 0, src: "/url/to/src"}, {id: 1, src: "/url/to/src"}], "fail text", "pass text"]
 *  });
 */
const schemaExtractor =
  xfn =>
    data =>
      new Promise((resolve, reject) => {
        const res = xfn(data);
        return res.length ? resolve(res) : reject(new Error('schema Extractor issue'));
      });

export default schemaExtractor;
