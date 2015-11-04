import riot from 'riot';

const store = () => {
  const id  = Math.floor(Math.random() * 100);
  const control = riot.observable({});

  return {
    getId() {
      return id;
    },

    on() {
      control.on.apply(this, [].slice.call(arguments));
    },

    one() {
      control.one.apply(this, [].slice.call(arguments));
    },

    off() {
      control.off.apply(this, [].slice.call(arguments));
    },

    trigger() {
      control.trigger.apply(this, [].slice.call(arguments));
    },
  };
};

export default store();
