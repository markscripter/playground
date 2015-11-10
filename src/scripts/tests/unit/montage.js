import montageFactory from '../../app/utils/montageFactory';
import test from 'blue-tape';
import Promise from 'bluebird';

const montage = montageFactory();

const montageTest = () => {
  test('montage: montage is an object', (assert) => new Promise((resolve) => {
    assert.ok(typeof montage === 'object');
    resolve();
  }));
};

export default montageTest;
