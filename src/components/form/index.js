// import cmd from './commands';

function Form(state) {
  const wireUp = (settings) => {
    $(state.target).form(settings);
  };

  wireUp(JSON.parse(state.target.getAttribute('data-settings')));
}

export default Form;
