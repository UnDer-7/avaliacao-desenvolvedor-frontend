import API from '../config/aixos.config';

const RESOURCE_URL = '/api/clientes';

export const getAllClientes = () => {
  return API.get(RESOURCE_URL).then(res => res.data);
};

export const createCliente = user => {
  return API.post(RESOURCE_URL, user).then(res => res.data);
};
