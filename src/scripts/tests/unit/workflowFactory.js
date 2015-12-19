import workflowFactory from '../../app/utils/workflowFactory';
import test from 'blue-tape';
import Promise from 'bluebird';

const workflow = workflowFactory();

// Tasks to run through
const introduction = () => new Promise((resolve) => {
  setTimeout(() => resolve(0), 1000);
});

const partOne = () => new Promise((resolve) => {
  setTimeout(() => resolve(1), 1000);
});

const partTwo = () => new Promise((resolve) => {
  setTimeout(() => resolve(2), 1000);
});

const partThree = () => new Promise((resolve) => {
  setTimeout(() => resolve(3), 1000);
});

const workflowFactoryTest = () => {
  test('workflow: workflow is an object', (assert) => new Promise((resolve) => {
    assert.ok(typeof workflow === 'object');
    assert.ok(!!workflow.runSync, 'workflow: runSync() exists.');
    assert.ok(!!workflow.runAsync, 'workflow: runAsync() exists.');
    resolve();
  }));

  test('workflow: runSync()', (assert) => new Promise((resolve) => {
    workflow.runSync([introduction, partOne, partTwo, partThree]).then((results) => {
      assert.ok(results.length > 0, 'workflow: runSync() returns more than 0 items');
      assert.ok(results.length === 4, 'workflow: runSync() matches the length of promises.');
    });

    workflow.runSync([]).then((results) => {
      assert.ok(results.length === 0, 'workflow: runSync() returns more than 0 items');
    });

    resolve();
  }));

  test('workflow: runASync()', (assert) => new Promise((resolve) => {
    workflow.runAsync([introduction, partOne, partTwo, partThree]).then((results) => {
      assert.ok(results.length > 0, 'workflow: runAsync() returns more than 0 items');
      assert.ok(results.length === 4, 'workflow: runAsync() matches the length of promises.');
    });

    workflow.runAsync([]).then((results) => {
      assert.ok(results.length === 0, 'workflow: runAsync() returns more than 0 items');
    });

    resolve();
  }));
};

export default workflowFactoryTest;
