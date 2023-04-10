import { Quiz } from '../api/api';

export const useResolveQuiz = () => {
  const resolve = (quiz: string) => {
    return Quiz.resolve(quiz);
  };

  return { resolve };
};
