const TOKEN_KEY = 'jwt-token';

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const isAuthenticate = () => true;

export const saveUser = token => {
  localStorage.setItem(TOKEN_KEY, token);
};
