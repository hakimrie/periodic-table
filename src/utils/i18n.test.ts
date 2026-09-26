import { describe, it, expect } from 'vitest';
import { getNestedTranslation, translations } from './i18n';
import enTranslations from '../locales/en.json';
import idTranslations from '../locales/id.json';

describe('i18n translations & getNestedTranslation', () => {
  it('resolves top-level and nested translation keys correctly', () => {
    expect(getNestedTranslation(enTranslations, 'app.title')).toBe('Interactive Periodic Table');
    expect(getNestedTranslation(idTranslations, 'app.title')).toBe('Tabel Periodik Interaktif');
    expect(getNestedTranslation(idTranslations, 'categories.alkali-metal')).toBe('Logam Alkali');
    expect(getNestedTranslation(idTranslations, 'element.atomicNumber')).toBe('Nomor Atom');
  });

  it('falls back to provided fallback or key path if key is missing', () => {
    expect(getNestedTranslation(enTranslations, 'nonexistent.key', 'Fallback Text')).toBe('Fallback Text');
    expect(getNestedTranslation(enTranslations, 'nonexistent.key')).toBe('nonexistent.key');
  });

  it('has comprehensive parity between en.json and id.json keys', () => {
    function getKeys(obj: any, prefix = ''): string[] {
      let keys: string[] = [];
      for (const k of Object.keys(obj)) {
        const fullKey = prefix ? `${prefix}.${k}` : k;
        if (typeof obj[k] === 'object' && obj[k] !== null && !Array.isArray(obj[k])) {
          keys = keys.concat(getKeys(obj[k], fullKey));
        } else {
          keys.push(fullKey);
        }
      }
      return keys;
    }

    const enKeys = getKeys(enTranslations);
    const idKeys = new Set(getKeys(idTranslations));

    for (const key of enKeys) {
      expect(idKeys.has(key), `Missing translation in id.json for key: ${key}`).toBe(true);
    }
  });

  it('contains expected language codes in translations registry', () => {
    expect(translations).toHaveProperty('en');
    expect(translations).toHaveProperty('id');
    expect(translations.en).toBeDefined();
    expect(translations.id).toBeDefined();
  });
});
