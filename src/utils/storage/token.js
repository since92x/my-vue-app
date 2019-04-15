import Cookies from 'js-cookie';

const TOKEN_KEY = 'token';

export const getToken = (key = TOKEN_KEY) => {
  return Cookies.get(key);
};
export const setToken = (key = TOKEN_KEY, value, opts = {}) => {
  Cookies.set(key, value, {
    path: '',
    ...opts,
  });
};
export const removeToken = (key = TOKEN_KEY, opts = {}) => {
  Cookies.remove(key, {
    path: '',
    ...opts,
  });
};
