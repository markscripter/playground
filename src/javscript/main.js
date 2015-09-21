import Hi from './app/index.js';
import Accordion from '../components/accordion';
import Modal from '../components/modal';
import Carousel from '../components/carousel';

const app = new Hi();

// register modules
app.register(Accordion);
app.register(Modal);
app.register(Carousel);

// test events
app.publish('destroy', 'hi');
