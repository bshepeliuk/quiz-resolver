import { useState } from 'react';
import { Docx } from '../api/api';

const useRecognizeDocx = () => {
  const [isRecognizing, setIsRecognizing] = useState(false);
  const [isError, setIsError] = useState(false);

  const recognize = async (file: File): Promise<string[]> => {
    try {
      setIsRecognizing(true);
      setIsError(false);

      const result = await Docx.recognize(file);

      setIsRecognizing(false);

      return result.data.content.split('\n').filter(Boolean);
    } catch (error) {
      setIsError(true);
      setIsRecognizing(false);
    }

    return [];
  };

  return {
    recognize,
    isError,
    isRecognizing,
  };
};

export default useRecognizeDocx;
