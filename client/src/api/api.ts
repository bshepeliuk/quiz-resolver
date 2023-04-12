import { BASE_URL } from '../constants';
import { LanguagesType } from '../context/LanguageContext';
import { RecognitionFileType } from '../hooks/useRecognize';
import { createApiInstance } from '../utils/createApiInstance';

const api = createApiInstance(BASE_URL);

interface IRecognizeParams {
  file: File;
  language: LanguagesType;
  type: RecognitionFileType;
}

export const File = {
  recognize({ file, language, type }: IRecognizeParams) {
    const formData = new FormData();

    formData.append('file', file);
    formData.append('language', language);

    return api.post(`/${type}`, formData);
  },
};

export const Quiz = {
  resolve(quiz: string) {
    return api.post('/resolve', { quiz });
  },
};
