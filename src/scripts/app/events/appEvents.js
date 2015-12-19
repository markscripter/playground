import mirrorkey from 'mirrorkey';

const APP_EVENTS = mirrorkey([
  'APP_STARTED',
  'APP_ENDED',
  'APP_MODULE_REGISTERED',
  'APP_MODULE_UNREGISTERED',
]);

export default APP_EVENTS;
