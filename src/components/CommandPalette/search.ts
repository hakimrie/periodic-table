import type { ChemicalElement } from '../../types/element';
import { allElements } from '../../data/elements';
import { indonesianElementNames } from '../../data/elements/translations/elementNamesId';

/**
 * Lightweight fuzzy scorer: rewards exact matches, prefixes, and in-order
 * subsequence matches. Returns 0 for no match.
 */
export function fuzzyScore(query: string, target: string): number {
  const q = query.trim().toLowerCase();
  const t = target.toLowerCase();
  if (!q) return 1;
  if (t === q) return 1000;
  if (t.startsWith(q)) return 700 - (t.length - q.length);
  const idx = t.indexOf(q);
  if (idx >= 0) return 450 - idx;

  // Subsequence match (e.g. "hlm" -> "helium")
  let ti = 0;
  let score = 0;
  let streak = 0;
  for (const ch of q) {
    const found = t.indexOf(ch, ti);
    if (found < 0) return 0;
    streak = found === ti ? streak + 1 : 0;
    score += 10 + streak * 6 - (found - ti);
    ti = found + 1;
  }
  return Math.max(1, Math.min(300, score));
}

export function scoreElement(query: string, el: ChemicalElement): number {
  const q = query.trim().toLowerCase();
  if (!q) return 1;
  if (/^\d+$/.test(q)) {
    return el.atomicNumber === parseInt(q, 10) ? 2000 : 0;
  }
  if (el.symbol.toLowerCase() === q) return 1500;
  const idName = indonesianElementNames[el.atomicNumber] || '';
  return Math.max(
    fuzzyScore(q, el.name),
    idName ? fuzzyScore(q, idName) : 0,
    fuzzyScore(q, el.symbol) * 0.8
  );
}

export interface Superlative {
  id: string;
  keywords: string[];
  labelKey: string;
  label: string;
  pick: () => ChemicalElement | undefined;
}

function extreme(
  getter: (el: ChemicalElement) => number | undefined,
  mode: 'max' | 'min'
): ChemicalElement | undefined {
  let best: ChemicalElement | undefined;
  let bestVal = mode === 'max' ? -Infinity : Infinity;
  for (const el of allElements) {
    const v = getter(el);
    if (v === undefined || Number.isNaN(v)) continue;
    if ((mode === 'max' && v > bestVal) || (mode === 'min' && v < bestVal)) {
      best = el;
      bestVal = v;
    }
  }
  return best;
}

/** "Smart" natural-language superlative queries for the command palette. */
export const superlatives: Superlative[] = [
  {
    id: 'densest',
    keywords: ['densest', 'heaviest material', 'most dense', 'paling padat', 'massa jenis tertinggi'],
    labelKey: 'palette.sup.densest',
    label: 'Densest element',
    pick: () =>
      extreme(
        (el) => (el.physicalProperties.densityUnit === 'g/L' ? undefined : el.physicalProperties.density),
        'max'
      ),
  },
  {
    id: 'lightest',
    keywords: ['lightest', 'least massive', 'paling ringan', 'teringan'],
    labelKey: 'palette.sup.lightest',
    label: 'Lightest element',
    pick: () => extreme((el) => el.atomicMass, 'min'),
  },
  {
    id: 'heaviest',
    keywords: ['heaviest', 'most massive', 'paling berat', 'terberat'],
    labelKey: 'palette.sup.heaviest',
    label: 'Heaviest element',
    pick: () => extreme((el) => el.atomicMass, 'max'),
  },
  {
    id: 'most-en',
    keywords: ['most electronegative', 'highest electronegativity', 'elektronegatif'],
    labelKey: 'palette.sup.mostEN',
    label: 'Most electronegative element',
    pick: () => extreme((el) => el.chemicalProperties.electronegativity, 'max'),
  },
  {
    id: 'least-en',
    keywords: ['least electronegative', 'most electropositive', 'elektropositif'],
    labelKey: 'palette.sup.leastEN',
    label: 'Least electronegative element',
    pick: () => extreme((el) => el.chemicalProperties.electronegativity, 'min'),
  },
  {
    id: 'hottest-mp',
    keywords: ['highest melting', 'hardest to melt', 'titik leleh tertinggi', 'most heat resistant'],
    labelKey: 'palette.sup.highestMP',
    label: 'Highest melting point',
    pick: () => extreme((el) => el.physicalProperties.meltingPointKelvin, 'max'),
  },
  {
    id: 'coldest-mp',
    keywords: ['lowest melting', 'lowest boiling', 'coldest', 'titik leleh terendah', 'titik didih terendah'],
    labelKey: 'palette.sup.lowestBP',
    label: 'Lowest boiling point',
    pick: () => extreme((el) => el.physicalProperties.boilingPointKelvin, 'min'),
  },
  {
    id: 'biggest',
    keywords: ['biggest atom', 'largest atom', 'largest radius', 'atom terbesar', 'jari-jari terbesar'],
    labelKey: 'palette.sup.largestRadius',
    label: 'Largest atomic radius',
    pick: () => extreme((el) => el.chemicalProperties.atomicRadius, 'max'),
  },
  {
    id: 'smallest',
    keywords: ['smallest atom', 'smallest radius', 'atom terkecil', 'jari-jari terkecil'],
    labelKey: 'palette.sup.smallestRadius',
    label: 'Smallest atomic radius',
    pick: () => extreme((el) => el.chemicalProperties.atomicRadius, 'min'),
  },
  {
    id: 'highest-ie',
    keywords: ['highest ionization', 'hardest to ionize', 'energi ionisasi tertinggi'],
    labelKey: 'palette.sup.highestIE',
    label: 'Highest ionization energy',
    pick: () => extreme((el) => el.chemicalProperties.firstIonizationEnergy, 'max'),
  },
  {
    id: 'best-conductor',
    keywords: ['best conductor', 'most conductive', 'konduktor terbaik', 'electrical conductivity'],
    labelKey: 'palette.sup.bestConductor',
    label: 'Best electrical conductor',
    pick: () => extreme((el) => el.physicalProperties.electricalConductivity, 'max'),
  },
  {
    id: 'hardest',
    keywords: ['hardest', 'mohs', 'paling keras', 'terkeras'],
    labelKey: 'palette.sup.hardest',
    label: 'Hardest element (Mohs)',
    pick: () => extreme((el) => el.physicalProperties.mohsHardness, 'max'),
  },
  {
    id: 'newest',
    keywords: ['newest', 'most recent discovery', 'latest discovered', 'terbaru'],
    labelKey: 'palette.sup.newest',
    label: 'Most recently discovered',
    pick: () =>
      extreme((el) => {
        const y = el.discovery.year;
        if (typeof y === 'number') return y;
        const m = String(y).match(/\d{3,4}/);
        return m ? parseInt(m[0], 10) : undefined;
      }, 'max'),
  },
];

export function matchSuperlatives(query: string): Superlative[] {
  const q = query.trim().toLowerCase();
  if (q.length < 3) return [];
  return superlatives
    .map((s) => ({
      s,
      score: Math.max(...s.keywords.map((k) => (k.includes(q) ? 600 : fuzzyScore(q, k) > 200 ? 200 : 0))),
    }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((x) => x.s);
}
