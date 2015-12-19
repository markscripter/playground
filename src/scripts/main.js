import app from './app';
import Menu from '../components/menu';
import dispatcher from './app/utils/dispatcher';
import APP_EVENTS from './app/events/appEvents';

dispatcher.on(APP_EVENTS.APP_STARTED, () => {
  app.registerModule(Menu);
});
