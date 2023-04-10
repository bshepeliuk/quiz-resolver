import { AxiosResponse } from 'axios';
import { useState } from 'react';
import { Docx, Image, Pdf, Txt } from '../api/api';
import { IContent } from '../context/StateContext';

type FileType = 'txt' | 'ocr' | 'pdf' | 'docx';
type RecognitionMethod = (file: File) => Promise<AxiosResponse<IContent>>;

const recognition: Record<FileType, RecognitionMethod> = {
  txt: Txt.recognize,
  pdf: Pdf.recognize,
  ocr: Image.recognize,
  docx: Docx.recognize,
};

const useRecognize = (type: FileType) => {
  const [isRecognizing, setIsRecognizing] = useState(false);
  const [isError, setIsError] = useState(false);

  const recognize = async (file: File): Promise<IContent | null> => {
    try {
      setIsRecognizing(true);
      setIsError(false);

      const result = await recognition[type](file);

      setIsRecognizing(false);

      return result.data;
    } catch (error) {
      setIsError(true);
      setIsRecognizing(false);
    }

    return null;
  };

  return {
    recognize,
    isError,
    isRecognizing,
  };
};

export default useRecognize;
