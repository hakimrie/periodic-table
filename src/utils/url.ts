import type { ChemicalElement } from '../types/element';
import { getElementById } from '../data/elements';

export function parseElementFromPath(): ChemicalElement | undefined {
  if (typeof window === 'undefined') return undefined;

  // 1. Check hash first (e.g. #elements/H, #/elements/H, #elements/8, or #H)
  const hash = window.location.hash;
  if (hash) {
    const hashMatch = hash.match(/(?:#\/?(?:elements\/)?)([^/?#]+)/i);
    if (hashMatch && hashMatch[1]) {
      const el = getElementById(hashMatch[1]);
      if (el) return el;
    }
  }

  // 2. Check query parameter (e.g. ?element=H or ?el=H)
  try {
    const params = new URLSearchParams(window.location.search);
    const elementParam = params.get('element') || params.get('el');
    if (elementParam) {
      const el = getElementById(elementParam);
      if (el) return el;
    }
  } catch {
    // Ignore URLSearchParams parsing failure in restricted environments
  }

  // 3. Check pathname (e.g. /elements/H or /periodic-table/elements/H)
  const path = window.location.pathname;
  const match = path.match(/\/elements\/([^/?#]+)/i);
  if (match && match[1]) {
    return getElementById(match[1]);
  }

  return undefined;
}
