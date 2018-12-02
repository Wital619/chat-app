export default function validate (val) {
  const errors = {};

  if (!val.firstName) {
    errors.firstName = 'Required';
  }
  
  if (!val.lastName) {
    errors.lastName = 'Required';
  }

  if (!val.userName) {
    errors.userName = 'Required';
  }

  if (!val.password) {
    errors.password = 'Required';
  }

  return errors;
}