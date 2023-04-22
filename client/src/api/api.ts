import { BASE_URL } from '../constants';
import { LanguagesType } from '../context/LanguageContext';
import { RecognitionFileType } from '../hooks/useRecognize';
import { createApiInstance } from '../utils/createApiInstance';

const api = createApiInstance(BASE_URL);

interface IRecognizeParams {
  file: File;
  languages: LanguagesType[];
  type: RecognitionFileType;
}

export const File = {
  recognize({ file, languages, type }: IRecognizeParams) {
    const formData = new FormData();

    formData.append('file', file);

    const params = new URLSearchParams();

    languages.forEach((language) => {
      params.append('language', language);
    });

    return api.post(`/${type}`, formData, { params });
  },
};

export const Quiz = {
  resolve(quiz: string) {
    return api.post('/resolve', { quiz });
  },
};
