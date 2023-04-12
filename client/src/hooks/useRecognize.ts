import { useState } from 'react';
import * as Api from '../api/api';
import { LanguagesType } from '../context/LanguageContext';
import { IContent } from '../context/StateContext';
import { isError } from '../utils/isError';
import useNotifications from './useNotifications';

export type RecognitionFileType = 'txt' | 'ocr' | 'pdf' | 'docx';

type DocumentFileType =
  | 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  | 'text/plain'
  | 'application/pdf'
  | 'image/png'
  | 'image/jpeg';

interface IRecognizeParams {
  file: File;
  language: LanguagesType;
}

const recognition: Record<DocumentFileType, RecognitionFileType> = {
  'text/plain': 'txt',
  'application/pdf': 'pdf',
  'image/png': 'ocr',
  'image/jpeg': 'ocr',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
};

const useRecognize = () => {
  const [isRecognizing, setIsRecognizing] = useState(false);
  const [hasError, setHasError] = useState(false);
  const notifications = useNotifications();

  const recognize = async ({ file, language }: IRecognizeParams): Promise<IContent | null> => {
    try {
      setIsRecognizing(true);
      setHasError(false);

      if (isNotSupportedFile(file)) {
        throw Error('Unsupported type!');
      }

      const type = recognition[file.type as DocumentFileType];

      const result = await Api.File.recognize({ file, language, type });

      setIsRecognizing(false);

      return result.data;
    } catch (error) {
      if (isError(error)) notifications.error(error.message);

      setHasError(true);
      setIsRecognizing(false);
    }

    return null;
  };

  return {
    recognize,
    hasError,
    isRecognizing,
  };
};

const isNotSupportedFile = (file: File): boolean => {
  return !Object.keys(recognition).includes(file.type);
};

export default useRecognize;
