import workflowFactory from '../../app/utils/workflow';
import test from 'blue-tape';

const workflow = workflowFactory();

const workflowTest = () => {
  test('workflow: workflow is an object', (assert) => new Promise((resolve) => {
    assert.ok(typeof workflow === 'object');
    resolve();
  }));

  test('workflow: setTasks()', (assert) => new Promise((resolve) => {
    assert.ok(workflow.setTasks(), 'setTasks(): Instantiation with no args successful');
    assert.ok(workflow.setTasks([]), 'setTasks([]): Instantiation with empty array successful');
    assert.ok(workflow.setTasks([1, 2, 3]), 'setTasks([1, 2, 3]): Instantiation with an array successful');
    assert.notOk(workflow.setTasks({}), 'setTasks({}): Instantiation with an object is unsuccessful');
    assert.notOk(workflow.setTasks(5), 'setTasks(5): Instantiation with a number, not array, is unsuccessful');
    assert.notOk(workflow.setTasks(6, 7, 8), 'setTasks(6, 7, 8): Instantiation with multiple number, not array, is unsuccessful');
    resolve();
  }));

  test('workflow: getTasks()', (assert) => new Promise((resolve) => {
    assert.ok(workflow.getTasks().length >= 0, 'getTasks(): returned an array');
    workflow.setTasks([1, 2, 3, 4, 5]);
    assert.equal(workflow.getTasks().length, 5, 'getTasks(): returns expected length of tasks');
    resolve();
  }));
};

export default workflowTest;
