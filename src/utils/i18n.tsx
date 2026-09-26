import React, { useState, useEffect } from 'react';
import type { LanguageCode } from './i18n';
import {
  translations,
  getNestedTranslation,
  I18nContext,
} from './i18n';

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<LanguageCode>(() => {
    try {
      const stored = localStorage.getItem('pt_lang');
      if (stored === 'id' || stored === 'en') return stored;
      if (typeof navigator !== 'undefined' && navigator.language?.startsWith('id')) {
        return 'id';
      }
      return 'en';
    } catch {
      return 'en';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('pt_lang', lang);
      document.documentElement.lang = lang;
    } catch {
      // ignore
    }
  }, [lang]);

  const t = (path: string, fallback?: string): string => {
    const activeDict = translations[lang] || translations.en;
    const res = getNestedTranslation(activeDict, path);
    if (res !== path) return res;
    const fallbackRes = getNestedTranslation(translations.en, path);
    if (fallbackRes !== path) return fallbackRes;
    return fallback || path;
  };

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
};
