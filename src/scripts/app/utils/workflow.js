/**
 * @module Workflow Factory
 * @classdesc This object creates a workflow, using Promises.
 * @author Mark Scripter [mscripter@horizontalintegration.com]
 * @requires
 */
const workflowFactory = () => {
  /**
   * @private {Array} tasks - This property is what holds the tasks to be ran.
   */
  let tasks = [];

  /**
   * @module Workflow Factory
   * @classdesc This object creates a workflow, using Promises.
   * @author Mark Scripter [mscripter@horizsontalintegration.com]
   * @requires
   */
  const workflow = {

    /**
    * This method sets the tasks associated with this workflow.
    * @param {array} _tasks - an array of tasks you associated with this workflow.
    * @return {boolean} true if successful, false if unsuccessful
    * @example
    * workflow.setTasks([taskArray])
    */
    setTasks(_tasks = []) {
      if (_tasks.length >= 0) {
        tasks = _tasks;
        return true;
      }

      return false;
    },

    /**
    * This method returns the tasks associated with this workflow.
    * @return {array} An array of tasks associated with this workflow.
    * @example
    * var tasks = workflow.getTasks();
    */
    getTasks() {
      return tasks;
    },

    /**
    * This will run through the tasks syncronously.
    * Use this method when the tasks depend on eachother. They will be
    * iterated through one after another.
    * @example
    * workflow.tasks = [func1, func2, func3];
    * workflow.sync();
    * // func 1 will run. once completed,
    * // func 2 will run. once completed,
    * // func 3 will fun. once completed,
    * // they will be returned
    */
    runSync() {
      const _tasks = tasks.getTasks();
      for (let i = 0; i < _tasks.length; i++) {
        _tasks[i]();
      }
    },

    /**
    * The async() method will run through the tasks asyncronously.
    * Use this method when none of the tasks depend on eachother but all
    * need to be completed before continuing.
    * @example
    * workflow.tasks = [func1, func2, func3];
    * workflow.async();
    * // func 1 will be triggered
    * // func 2 will be triggered
    * // func 3 will be triggered
    * // when any of the items returns,
    * // it will check and keep count of how many of the tasks were completed.
    * // once all are done, they will be returned.
    */
    runAsync() {

    },

  };

  return workflow;
};

export default workflowFactory;
