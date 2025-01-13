import { atomWithStorage } from 'jotai/utils';
import i18n from '../i18n/i18n';

export const languageAtom = atomWithStorage('language', i18n.language);

export const languages = [
  { code: 'en', name: 'English' },
  { code: 'vi', name: 'Tiếng Việt' }
] as const;