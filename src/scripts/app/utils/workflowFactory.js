import Promise from 'bluebird';  // our Promises library

/**
 * This object creates a workflow, using Promises.
 * @module workflowFactory
 * @author Mark Scripter [mscripter@horizontalintegration.com]
 * @requires bluebird
 * @returns {workflow} - A workflow object
 * @example
 * import workflowFactory from './workflow';
 */
function workflowFactory() {
  /**
   * This object creates a workflow, using Promises.
   * @module workflow
   * @author Mark Scripter [mscripter@horizontalintegration.com]
   * @example
   * import workflowFactory from './workflow';
   * const workflow = workFlowFactory();
   */
  const workflow = {

    /**
    * The runSync() method will run through the tasks syncronously.
    * Use this method when the tasks depend on eachother. They will be
    * iterated through one after another.
    * @param {Array} tasks - An array of functions that return a promise.
    * @return {object} returns an object hash of the task results
    * @example
    * workflow.runSync([PromiseFunc, PromiseFunc, PromiseFunc]);
    * // func 1 will run. once completed,
    * // func 2 will run. once completed,
    * // func 3 will fun. once completed,
    * // they will be returned
    */
    runSync(tasks = [Promise.resolve()]) {
      const results = [];
      return Promise.resolve(tasks)
        .each((task) => task().then((res) => results.push(res)))
        .then(() => results);
    },

    /**
    * The runAsync() method will run through the tasks asyncronously.
    * Use this method when none of the tasks depend on eachother but all
    * need to be completed before continuing.
    * @param {Array} tasks - An array of functions that return a promise.
    * @example
    * workflow.async([PromiseFunc(), PromiseFunc(), PromiseFunc()]);
    * // func 1 will be triggered
    * // func 2 will be triggered
    * // func 3 will be triggered
    * // when any of the items returns,
    * // it will check and keep count of how many of the tasks were completed.
    * // once all are done, they will be returned.
    */
    runAsync(tasks = [Promise.resolve()]) {
      return Promise.all(tasks);
    },

  };

  return workflow;
}

export default workflowFactory;
