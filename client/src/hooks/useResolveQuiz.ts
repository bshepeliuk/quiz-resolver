import { AxiosResponse } from 'axios';
import { useState } from 'react';
import { Quiz } from '../api/api';
import { IContent } from '../context/StateContext';

export const useResolveQuiz = () => {
  const [isResolving, setIsResolving] = useState(false);
  const [hasError, setHasError] = useState(false);

  const resolve = async (quiz: string): Promise<AxiosResponse<IContent> | null> => {
    try {
      setIsResolving(true);
      setHasError(false);

      const result = await Quiz.resolve(quiz);

      setIsResolving(false);

      return result;
    } catch (error) {
      setHasError(true);
      setIsResolving(false);
    }

    return null;
  };

  return {
    resolve,
    isResolving,
    hasError,
  };
};
