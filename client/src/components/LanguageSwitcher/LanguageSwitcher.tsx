import { LanguagesType } from "../../context/LanguageContext";
import { useLanguageContext } from "../../hooks/useLanguageContext";
import { LanguageButton, List } from "./languageSwitcher.styled";

const languages: Array<{ label: string; value: LanguagesType }> = [
  { label: "ENG", value: "eng" },
  { label: "UA", value: "ukr" },
];

function LanguageSwitcher() {
  const context = useLanguageContext();

  const handleClick = (value: LanguagesType) => {
    context.setLanguage(value);
  };

  return (
    <List>
      {languages.map((language) => (
        <li key={language.value}>
          <LanguageButton
            type="button"
            onClick={() => handleClick(language.value)}
            isActive={language.value === context.language}
          >
            {language.label}
          </LanguageButton>
        </li>
      ))}
    </List>
  );
}

export default LanguageSwitcher;
