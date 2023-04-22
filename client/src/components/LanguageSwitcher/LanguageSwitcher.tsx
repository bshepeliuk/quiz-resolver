import { LanguagesType } from "../../context/LanguageContext";
import { useLanguageContext } from "../../hooks/useLanguageContext";
import { LanguageButton, List } from "./languageSwitcher.styled";

interface ILanguage {
  label: string;
  value: LanguagesType;
}

const languages: Array<ILanguage> = [
  { label: "ENG", value: "eng" },
  { label: "UA", value: "ukr" },
];

function LanguageSwitcher() {
  const context = useLanguageContext();

  const handleClick = (value: LanguagesType) => {
    context.toggleLanguages(value);
  };

  return (
    <List>
      {languages.map((language) => (
        <li key={language.value}>
          <LanguageButton
            type="button"
            onClick={() => handleClick(language.value)}
            isActive={context.languages.includes(language.value)}
          >
            {language.label}
          </LanguageButton>
        </li>
      ))}
    </List>
  );
}

export default LanguageSwitcher;
