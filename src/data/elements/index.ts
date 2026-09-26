import type { ChemicalElement, ElementCategory, ElementPhase } from '../../types/element';
import { period1Elements } from './period1';
import { period2Elements } from './period2';
import { period3Elements } from './period3';
import { period4Elements } from './period4';
import { period5Elements } from './period5';
import { period6Elements } from './period6';
import { period7Elements } from './period7';

export const allElements: ChemicalElement[] = [
  ...period1Elements,
  ...period2Elements,
  ...period3Elements,
  ...period4Elements,
  ...period5Elements,
  ...period6Elements,
  ...period7Elements,
].sort((a, b) => a.atomicNumber - b.atomicNumber);

export const elementsByNumber = new Map<number, ChemicalElement>(
  allElements.map((el) => [el.atomicNumber, el])
);

export const elementsBySymbol = new Map<string, ChemicalElement>(
  allElements.map((el) => [el.symbol.toLowerCase(), el])
);

export const elementsByName = new Map<string, ChemicalElement>(
  allElements.map((el) => [el.name.toLowerCase(), el])
);

export function getElementById(id: string | number): ChemicalElement | undefined {
  if (typeof id === 'number') {
    return elementsByNumber.get(id);
  }
  const clean = id.trim().toLowerCase();
  const parsedNum = parseInt(clean, 10);
  if (!isNaN(parsedNum) && parsedNum.toString() === clean) {
    return elementsByNumber.get(parsedNum);
  }
  return elementsBySymbol.get(clean) || elementsByName.get(clean);
}

export interface ElementFilterOptions {
  category?: ElementCategory | 'all';
  phase?: ElementPhase | 'all';
  metalType?: 'all' | 'metal' | 'metalloid' | 'nonmetal';
  radioactivity?: 'all' | 'radioactive' | 'stable';
  origin?: 'all' | 'natural' | 'synthetic';
  period?: number | 'all';
  group?: number | 'all';
  block?: 's' | 'p' | 'd' | 'f' | 'all';
}

import { indonesianElementNames } from './translations/elementNamesId';

export function searchElements(
  query: string,
  filters?: ElementFilterOptions
): ChemicalElement[] {
  const q = query.trim().toLowerCase();

  return allElements.filter((el) => {
    // Text search
    if (q) {
      const matchNumber = el.atomicNumber.toString() === q;
      const matchSymbol = el.symbol.toLowerCase() === q;
      const matchName = el.name.toLowerCase().includes(q);
      const idName = (indonesianElementNames[el.atomicNumber] || '').toLowerCase();
      const matchIdName = idName.includes(q);
      const matchCategory = el.category.toLowerCase().replace(/-/g, ' ').includes(q);
      const matchBlock = `${el.block}-block`.includes(q) || el.block === q;
      const matchGroup = el.group !== null && `group ${el.group}`.includes(q);
      const matchPeriod = `period ${el.period}`.includes(q) || `periode ${el.period}`.includes(q);
      const matchHalogen = (q === 'halogen' || q === 'halogens') && el.group === 17;
      const matchChalcogen = (q === 'chalcogen' || q === 'chalcogens' || q === 'kalkogen') && el.group === 16;
      const matchNoble = (q === 'noble gas' || q === 'noble' || q === 'gas mulia') && el.category === 'noble-gas';
      const matchAlkali = (q === 'alkali' || q === 'logam alkali') && el.category === 'alkali-metal';
      const matchAlkaline = (q === 'alkaline' || q === 'alkali tanah') && el.category === 'alkaline-earth-metal';
      const matchTransition = (q === 'transition metal' || q === 'logam transisi') && el.category === 'transition-metal';

      if (
        !matchNumber &&
        !matchSymbol &&
        !matchName &&
        !matchIdName &&
        !matchCategory &&
        !matchBlock &&
        !matchGroup &&
        !matchPeriod &&
        !matchHalogen &&
        !matchChalcogen &&
        !matchNoble &&
        !matchAlkali &&
        !matchAlkaline &&
        !matchTransition
      ) {
        return false;
      }
    }

    // Filters
    if (filters) {
      if (filters.category && filters.category !== 'all' && el.category !== filters.category) {
        return false;
      }
      if (filters.phase && filters.phase !== 'all' && el.phaseAtSTP !== filters.phase) {
        return false;
      }
      if (filters.metalType && filters.metalType !== 'all') {
        if (filters.metalType === 'metal' && !el.isMetal) return false;
        if (filters.metalType === 'metalloid' && !el.isMetalloid) return false;
        if (filters.metalType === 'nonmetal' && !el.isNonmetal) return false;
      }
      if (filters.radioactivity && filters.radioactivity !== 'all') {
        if (filters.radioactivity === 'radioactive' && !el.isRadioactive) return false;
        if (filters.radioactivity === 'stable' && el.isRadioactive) return false;
      }
      if (filters.origin && filters.origin !== 'all') {
        if (filters.origin === 'natural' && el.isSynthetic) return false;
        if (filters.origin === 'synthetic' && !el.isSynthetic) return false;
      }
      if (filters.period && filters.period !== 'all' && el.period !== filters.period) {
        return false;
      }
      if (filters.group && filters.group !== 'all' && el.group !== filters.group) {
        return false;
      }
      if (filters.block && filters.block !== 'all' && el.block !== filters.block) {
        return false;
      }
    }

    return true;
  });
}

export interface CategoryMetadata {
  id: ElementCategory;
  name: string;
  colorBg: string; // Tailwind class or hex
  colorBorder: string;
  colorText: string;
  badgeClass: string;
  description: string;
}

export const categoryMetadata: Record<ElementCategory, CategoryMetadata> = {
  'alkali-metal': {
    id: 'alkali-metal',
    name: 'Alkali Metal',
    colorBg: '#dc262622',
    colorBorder: '#ef4444',
    colorText: '#f87171',
    badgeClass: 'bg-red-500/20 text-red-400 border-red-500/40',
    description: 'Highly reactive Group 1 metals with 1 valence electron, soft and ready to react with water.',
  },
  'alkaline-earth-metal': {
    id: 'alkaline-earth-metal',
    name: 'Alkaline Earth Metal',
    colorBg: '#ea580c22',
    colorBorder: '#f97316',
    colorText: '#fb923c',
    badgeClass: 'bg-orange-500/20 text-orange-400 border-orange-500/40',
    description: 'Reactive Group 2 metals with 2 valence electrons, forming basic alkaline oxides and hydroxides.',
  },
  'transition-metal': {
    id: 'transition-metal',
    name: 'Transition Metal',
    colorBg: '#3b82f622',
    colorBorder: '#3b82f6',
    colorText: '#60a5fa',
    badgeClass: 'bg-blue-500/20 text-blue-400 border-blue-500/40',
    description: 'D-block metallic elements known for variable oxidation states, colorful ions, and catalytic activity.',
  },
  'post-transition-metal': {
    id: 'post-transition-metal',
    name: 'Post-Transition Metal',
    colorBg: '#06b6d422',
    colorBorder: '#06b6d4',
    colorText: '#22d3ee',
    badgeClass: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40',
    description: 'Soft metals located between the transition metals and metalloids, with relatively high electronegativity.',
  },
  metalloid: {
    id: 'metalloid',
    name: 'Metalloid',
    colorBg: '#10b98122',
    colorBorder: '#10b981',
    colorText: '#34d399',
    badgeClass: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
    description: 'Semiconducting elements straddling metals and nonmetals with intermediate chemical and physical properties.',
  },
  'reactive-nonmetal': {
    id: 'reactive-nonmetal',
    name: 'Reactive Nonmetal',
    colorBg: '#84cc1622',
    colorBorder: '#84cc16',
    colorText: '#a3e635',
    badgeClass: 'bg-lime-500/20 text-lime-400 border-lime-500/40',
    description: 'Diverse nonmetallic elements including carbon, nitrogen, oxygen, and halogens that form covalent and ionic bonds.',
  },
  'noble-gas': {
    id: 'noble-gas',
    name: 'Noble Gas',
    colorBg: '#8b5cf622',
    colorBorder: '#8b5cf6',
    colorText: '#a78bfa',
    badgeClass: 'bg-purple-500/20 text-purple-400 border-purple-500/40',
    description: 'Extremely stable, unreactive Group 18 gases possessing complete valence shell octets (or duet for He).',
  },
  lanthanide: {
    id: 'lanthanide',
    name: 'Lanthanide',
    colorBg: '#ec489922',
    colorBorder: '#ec4899',
    colorText: '#f472b6',
    badgeClass: 'bg-pink-500/20 text-pink-400 border-pink-500/40',
    description: '15 rare-earth metallic elements (La–Lu) filling the 4f subshell, vital for high-strength magnets and lasers.',
  },
  actinide: {
    id: 'actinide',
    name: 'Actinide',
    colorBg: '#d946ef22',
    colorBorder: '#d946ef',
    colorText: '#e879f9',
    badgeClass: 'bg-fuchsia-500/20 text-fuchsia-400 border-fuchsia-500/40',
    description: '15 radioactive metallic elements (Ac–Lr) filling the 5f subshell, including uranium and plutonium.',
  },
  unknown: {
    id: 'unknown',
    name: 'Unknown / Synthetic',
    colorBg: '#64748b22',
    colorBorder: '#64748b',
    colorText: '#94a3b8',
    badgeClass: 'bg-slate-500/20 text-slate-400 border-slate-500/40',
    description: 'Transient superheavy elements synthesized in particle colliders with short half-lives and predicted properties.',
  },
};
