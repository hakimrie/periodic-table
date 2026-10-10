import { createContext, useContext } from 'react';
import enTranslations from '../locales/en.json';
import idTranslations from '../locales/id.json';

export type LanguageCode = 'en' | 'id';

export interface I18nContextType {
  lang: LanguageCode;
  setLang: (lang: LanguageCode) => void;
  t: (path: string, fallback?: string) => string;
}

export type TranslationBundle = Record<LanguageCode, Record<string, any>>;

function deepMerge(target: any, source: any): any {
  const out: any = Array.isArray(target) ? [...target] : { ...target };
  for (const key of Object.keys(source || {})) {
    const sv = source[key];
    if (sv && typeof sv === 'object' && !Array.isArray(sv) && typeof out[key] === 'object') {
      out[key] = deepMerge(out[key], sv);
    } else {
      out[key] = sv;
    }
  }
  return out;
}

// Feature translation bundles: each file in src/locales/features exports
// `default { en: {...}, id: {...} }` which is deep-merged into the base dictionaries.
const featureBundles = import.meta.glob<{ default: TranslationBundle }>('../locales/features/*.ts', {
  eager: true,
});

let mergedEn: any = enTranslations;
let mergedId: any = idTranslations;
for (const mod of Object.values(featureBundles)) {
  if (mod?.default) {
    mergedEn = deepMerge(mergedEn, mod.default.en || {});
    mergedId = deepMerge(mergedId, mod.default.id || {});
  }
}

export const translations: Record<LanguageCode, any> = {
  en: mergedEn,
  id: mergedId,
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
