import Hi from './app/index.js';
import Accordion from '../components/accordion';
import Modal from '../components/modal';
import Carousel from '../components/carousel';

const app = new Hi();

// register modules
app.registerModule(Accordion);
app.registerModule(Modal);
app.registerModule(Carousel);

// test events
// app.publish('destroy', 'hi');
