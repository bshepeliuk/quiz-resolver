import { createContext, ReactNode, useState } from "react";

export interface IContent {
  id: string;
  items: string[];
}

interface IStateContext {
  content: IContent | null;
  isRecognizing: boolean;
  setIsRecognizing: React.Dispatch<React.SetStateAction<boolean>>;
  setContent: React.Dispatch<React.SetStateAction<IContent | null>>;
  solution: IContent | null;
  setSolution: React.Dispatch<React.SetStateAction<IContent | null>>;
}

export const StateContext = createContext<IStateContext | undefined>(undefined);

interface IProps {
  children: ReactNode;
}

export function StateProvider({ children }: IProps) {
  const [content, setContent] = useState<IContent | null>(null);
  const [isRecognizing, setIsRecognizing] = useState(false);
  const [solution, setSolution] = useState<IContent | null>(null);

  return (
    <StateContext.Provider value={{ content, setContent, isRecognizing, setIsRecognizing, solution, setSolution }}>
      {children}
    </StateContext.Provider>
  );
}
