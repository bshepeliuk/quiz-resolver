import { createContext, ReactNode, useState } from "react";

export type LanguagesType = "eng" | "ukr";

interface ILanguageContext {
  language: LanguagesType;
  setLanguage: React.Dispatch<React.SetStateAction<LanguagesType>>;
  languages: LanguagesType[];
  setLanguages: React.Dispatch<React.SetStateAction<LanguagesType[]>>;
  toggleLanguages: (language: LanguagesType) => void;
}

export const LanguageContext = createContext<ILanguageContext | undefined>(undefined);

interface IProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: IProps) {
  const [language, setLanguage] = useState<LanguagesType>("eng");
  const [languages, setLanguages] = useState<LanguagesType[]>(["eng"]);

  const toggleLanguages = (lang: LanguagesType): void => {
    const nextLanguages = languages.includes(lang) ? languages.filter((l) => l !== lang) : languages.concat(lang);

    setLanguages(nextLanguages);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, languages, setLanguages, toggleLanguages }}>
      {children}
    </LanguageContext.Provider>
  );
}
