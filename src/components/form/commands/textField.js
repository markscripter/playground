import Bacon from 'baconjs';

export default textFieldValue = (textField) => {
  const value = () => textField.value;
  return Bacon.fromEventTarget(textField, 'keyup').map(value).toProperty(value);
};
