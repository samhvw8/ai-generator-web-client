import { useAtom } from 'jotai';
import { useTranslation } from 'react-i18next';
import { languageAtom, languages } from '../atoms/language';

export function useLanguage() {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useAtom(languageAtom);

  const changeLanguage = (newLanguage: string) => {
    i18n.changeLanguage(newLanguage);
    setLanguage(newLanguage);
  };

  return {
    currentLanguage: language,
    languages,
    changeLanguage
  };
}