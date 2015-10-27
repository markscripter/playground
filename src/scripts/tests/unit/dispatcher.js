import dispatcher from '../../app/utils/dispatcher';
import test from 'blue-tape';

const dispatcherTest = () => {
  test('dispatcher: dispatcher is an object', (assert) => new Promise((resolve) => {
    assert.ok(typeof dispatcher === 'object');
    resolve();
  }));
};

export default dispatcherTest;
