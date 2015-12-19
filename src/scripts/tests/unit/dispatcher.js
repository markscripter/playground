import dispatcher from '../../app/utils/dispatcher';
import test from 'blue-tape';

const dispatcherTest = () => {
  test('dispatcher: dispatcher is an object', (assert) =>
    new Promise((resolve) => {
      assert.ok(typeof dispatcher === 'object', 'dispatcher === "object"');
      assert.ok(typeof dispatcher === 'object', 'dispatcher === "object"');
      resolve();
    }
  ));

  test('dispatcher: dispatcher has the methods we expect', (assert) =>
    new Promise((resolve) => {
      assert.ok(typeof dispatcher.on === 'function', 'dispatcher.on() exists');
      assert.ok(typeof dispatcher.one === 'function', 'dispatcher.one() exists');
      assert.ok(typeof dispatcher.off === 'function', 'dispatcher.off() exists');
      assert.ok(typeof dispatcher.trigger === 'function', 'dispatcher.trigger() exists');
      resolve();
    }
  ));

  test('dispatcher: dispatcher methods return undefined (as expected)', (assert) =>
    new Promise((resolve) => {
      assert.equal(dispatcher.on(''), undefined, 'dispatcher.on() exists');
      assert.equal(dispatcher.one(''), undefined, 'dispatcher.one() exists');
      assert.equal(dispatcher.off(''), undefined, 'dispatcher.off() exists');
      assert.equal(dispatcher.trigger(''), undefined, 'dispatcher.trigger() exists');
      resolve();
    }
  ));
};

export default dispatcherTest;
