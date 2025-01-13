import { useLanguage } from '../hooks/useLanguage';
import { Button } from './ui/button';
import type { languages } from '../atoms/language';

type LanguageCode = typeof languages[number]['code'];

export function LanguageSwitcher() {
  const { currentLanguage, changeLanguage } = useLanguage();

  const toggleLanguage = () => {
    const nextLang: LanguageCode = currentLanguage === 'en' ? 'vi' : 'en';
    changeLanguage(nextLang);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleLanguage}
      className="bg-slate-100 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full w-8 h-8 text-slate-500 hover:text-slate-700 dark:text-slate-400"
    >
      <span className="text-sm font-medium">{currentLanguage.toUpperCase()}</span>
    </Button>
  );
}