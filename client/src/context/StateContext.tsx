import { createContext, ReactNode, useState } from "react";

interface IStateContext {
  lines: string[];
  hasLines: boolean;
  setLines: React.Dispatch<React.SetStateAction<string[]>>;
}

export const StateContext = createContext<IStateContext | undefined>(undefined);

interface IProps {
  children: ReactNode;
}

export function StateProvider({ children }: IProps) {
  const [lines, setLines] = useState<string[]>([]);

  const hasLines = lines.length > 0;

  return <StateContext.Provider value={{ lines, setLines, hasLines }}>{children}</StateContext.Provider>;
}
