import { AxiosResponse } from 'axios';
import { useState } from 'react';
import * as Api from '../api/api';
import { IContent } from '../context/StateContext';
import { isError } from '../utils/isError';
import useNotifications from './useNotifications';

export type RecognitionFileType = 'txt' | 'ocr' | 'pdf' | 'docx';
type RecognitionMethod = (file: File) => Promise<AxiosResponse<IContent>>;

type DocumentFileType =
  | 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  | 'text/plain'
  | 'application/pdf'
  | 'image/png'
  | 'image/jpeg';

const recognition: Record<DocumentFileType, RecognitionMethod> = {
  'text/plain': Api.Txt.recognize,
  'application/pdf': Api.Pdf.recognize,
  'image/png': Api.Image.recognize,
  'image/jpeg': Api.Image.recognize,
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': Api.Docx.recognize,
};

const useRecognize = () => {
  const [isRecognizing, setIsRecognizing] = useState(false);
  const [hasError, setHasError] = useState(false);
  const notifications = useNotifications();

  const recognize = async (file: File): Promise<IContent | null> => {
    try {
      setIsRecognizing(true);
      setHasError(false);

      if (isNotSupportedFile(file)) {
        throw Error('Unsupported type!');
      }

      const result = await recognition[file.type as DocumentFileType](file);

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
