import guid from '../../app/utils/guid';
import test from 'blue-tape';

const guidTest = () => {
  test('guid: guid is a function', (assert) => new Promise((resolve) => {
    assert.ok(typeof guid === 'function');
    resolve();
  }));
};

export default guidTest;
