import { createContext, ReactNode, useState } from "react";

export type LanguagesType = "eng" | "ukr";

interface ILanguageContext {
  language: LanguagesType;
  setLanguage: React.Dispatch<React.SetStateAction<LanguagesType>>;
}

export const LanguageContext = createContext<ILanguageContext | undefined>(undefined);

interface IProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: IProps) {
  const [language, setLanguage] = useState<LanguagesType>("eng");

  return <LanguageContext.Provider value={{ language, setLanguage }}>{children}</LanguageContext.Provider>;
}
