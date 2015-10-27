import test from 'blue-tape';
import storyBuilder from './index';

const storyBuilderTest = () => {
  test('storyBuilder:', (assert) => new Promise((resolve) => {
    assert.ok(true, 'storyBuilderTest okay');
    resolve();
  }));
};

export default storyBuilderTest;
