import dispatcherTest from './dispatcher';
import workflowTest from './workflow';
import guidTest from './guid';

const unit = () => {
  dispatcherTest();
  workflowTest();
  guidTest();
};

export default unit;
