import { useState } from 'react';
import { Image } from '../api/api';

const useRecognizeImage = () => {
  const [isRecognizing, setIsRecognizing] = useState(false);
  const [isError, setIsError] = useState(false);

  const recognize = async (file: File): Promise<string[]> => {
    try {
      setIsRecognizing(true);
      setIsError(false);

      const result = await Image.recognize(file);

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

export default useRecognizeImage;
