import axios from 'axios';

export const createApiInstance = (baseURL: string) => {
  return axios.create({
    baseURL,
  });
};
