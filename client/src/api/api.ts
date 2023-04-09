import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api';

const createApiInstance = (baseURL: string) => {
  return axios.create({
    baseURL,
  });
};

const api = createApiInstance(BASE_URL);

export const Txt = {
  recognize(file: File) {
    const formData = new FormData();

    formData.append('file', file);

    return api.post('/txt', formData);
  },
};

export const Pdf = {
  recognize(file: File) {
    const formData = new FormData();

    formData.append('file', file);

    return api.post('/pdf', formData);
  },
};

export const Docx = {
  recognize(file: File) {
    const formData = new FormData();

    formData.append('file', file);

    return api.post('/docx', formData);
  },
};

export const Image = {
  recognize(file: File) {
    const formData = new FormData();

    formData.append('file', file);

    return api.post('/ocr', formData);
  },
};
