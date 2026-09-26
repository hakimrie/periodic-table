import { createContext, useContext } from 'react';
import enTranslations from '../locales/en.json';
import idTranslations from '../locales/id.json';

export type LanguageCode = 'en' | 'id';

export interface I18nContextType {
  lang: LanguageCode;
  setLang: (lang: LanguageCode) => void;
  t: (path: string, fallback?: string) => string;
}

export const translations: Record<LanguageCode, any> = {
  en: enTranslations,
  id: idTranslations,
};

export function getNestedTranslation(obj: any, path: string, fallback?: string): string {
  const parts = path.split('.');
  let current = obj;
  for (const part of parts) {
    if (current && typeof current === 'object' && part in current) {
      current = current[part];
    } else {
      return fallback || path;
    }
  }
  return typeof current === 'string' ? current : (fallback || path);
}

export const I18nContext = createContext<I18nContextType | null>(null);

export function useI18n(): I18nContextType {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    const tFallback = (path: string, fallback?: string) =>
      getNestedTranslation(translations.en, path, fallback);
    return {
      lang: 'en',
      setLang: () => {},
      t: tFallback,
    };
  }
  return ctx;
}
