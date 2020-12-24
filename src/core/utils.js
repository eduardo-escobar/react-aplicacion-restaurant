import axios from 'axios'

export const emailValidator = (email) => {
  const re = /\S+@\S+\.\S+/;

  if (!email || email.length <= 0) return 'Email cannot be empty.';
  if (!re.test(email)) return 'Ooops! We need a valid email address.';

  return '';
};

export const passwordValidator = (password) => {
  if (!password || password.length <= 0) return 'Password no puede estar vacío..';

  return '';
};

export const rutValidator = (rut) => {
  if (!rut || rut.length <= 0) return 'Rut no puede estar vacío..';

  return '';
};

export const emptyValidator = (field) => {
  if (!field || field.length <= 0) return 'no puede estar vacío..';

  return '';
};
export const nameValidator = (name) => {
  if (!name || name.length <= 0) return 'Name cannot be empty.';

  return '';
};

export const APIKit = axios.create({
  baseURL: 'http://192.168.8.1:45457/api',
  //'http://restaurant-sigloxii-wb.azurewebsites.net/api',
});