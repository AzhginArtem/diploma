import { $authHost, $host } from './index';
import jwt_decode from 'jwt-decode';

export const registration = async (fio, password, age, phone, email) => {
  const { data } = await $host.post('api/user/registration/', {
    fio,
    age,
    password,
    phone,
    email,
  });
  console.log(data.token);
  localStorage.setItem('token', data.token);
  return jwt_decode(data.token);
};

export const logIn = async (fio, password) => {
  const { data } = await $host.post('api/user/login/', { fio, password });
  localStorage.setItem('token', data.token);
  return jwt_decode(data.token);
};

export const check = async () => {
  const { data } = await $authHost.get('api/user/auth/');
  localStorage.setItem('token', data.token);
  return jwt_decode(data.token);
};

export const getSmth = async (table, id) => {
  const { data } = await $authHost.post(`api/${table}/`, { id });
  return data;
};
