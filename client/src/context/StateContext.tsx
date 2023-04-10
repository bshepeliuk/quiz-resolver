import { createContext, ReactNode, useState } from "react";

export interface IContent {
  id: string;
  items: string[];
}

interface IStateContext {
  lines: IContent[];
  hasLines: boolean;
  content: IContent | null;
  setContent: React.Dispatch<React.SetStateAction<IContent | null>>;
  setLines: React.Dispatch<React.SetStateAction<IContent[]>>;
}

export const StateContext = createContext<IStateContext | undefined>(undefined);

interface IProps {
  children: ReactNode;
}

export function StateProvider({ children }: IProps) {
  const [lines, setLines] = useState<any>([]);
  const [content, setContent] = useState<IContent | null>(null);

  const hasLines = lines.length > 0;

  return (
    <StateContext.Provider value={{ lines, setLines, hasLines, content, setContent }}>{children}</StateContext.Provider>
  );
}
