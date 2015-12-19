import app from '../../app';
import test from 'blue-tape';

const appTest = () => {
  test('app: app is an object', (assert) => new Promise((resolve) => {
    assert.ok(typeof app === 'object');
    resolve();
  }));
};

export default appTest;
