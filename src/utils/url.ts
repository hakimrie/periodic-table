import type { ChemicalElement } from '../types/element';
import { getElementById } from '../data/elements';

export function parseElementFromPath(): ChemicalElement | undefined {
  if (typeof window === 'undefined') return undefined;
  const path = window.location.pathname;
  const match = path.match(/\/elements\/([^/?#]+)/i);
  if (match && match[1]) {
    return getElementById(match[1]);
  }
  return undefined;
}
