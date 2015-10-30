import Promise from 'bluebird';  // our Promises library
import workflowFactory from './utils/workflow';

const workflow = workflowFactory();

const introduction = () => new Promise((resolve) => {
  console.log('intro: called');
  setTimeout(() => {
    console.log('intro: inside timeout');
    resolve(0);
  }, 1000);
});

const partOne = () => new Promise((resolve) => {
  console.log('partOne: called');
  setTimeout(() => {
    console.log('partOne: inside timeout');
    resolve(1);
  }, 1000);
});

const partTwo = () => new Promise((resolve) => {
  console.log('partTwo: called');
  setTimeout(() => {
    console.log('partTwo: inside timeout');
    resolve(2);
  }, 1000);
});

const partThree = () => new Promise((resolve) => {
  console.log('partThree: called');
  setTimeout(() => {
    console.log('partThree: inside timeout');
    resolve(3);
  }, 1000);
});

workflow.runSync([introduction, partOne, partTwo, partThree]).then((res) => console.log('Sync response:', res));

workflow.runAsync([introduction(), partOne(), partTwo(), partThree()]).then((res) => console.log('Async response:', res));
