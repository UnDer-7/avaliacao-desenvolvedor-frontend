const TOKEN_KEY = 'jwt-token';

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const removeToken = () => localStorage.removeItem(TOKEN_KEY);

export const saveUser = token => {
  localStorage.setItem(TOKEN_KEY, token);
};
