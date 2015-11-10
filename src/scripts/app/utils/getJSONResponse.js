/**
 * A resolver for Fetch JSON.
 * @module getJSONResponse
 * @author Mark Scripter [mscripter@horizontalintegration.com]
 * @param {object} res - A response object from Fetch.
 * @returns {promise} - res.json();
 * @example
 * import getJSONResponse from './getJSONResponse';
 * const data = fetch("/url").then(getJSONResponse);
 */
export default (res) => res.json();
