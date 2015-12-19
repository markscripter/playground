import dispatcherTest from './dispatcher';
import workflowTest from './workflowFactory';

const unit = () => {
  dispatcherTest();
  workflowTest();
};

export default unit;
