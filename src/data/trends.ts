import type { ChemicalElement, PeriodicTrendKey } from '../types/element';

export interface PeriodicTrendDefinition {
  key: PeriodicTrendKey;
  label: string;
  unit: string;
  shortDescription: string;
  studentExplanation: string;
  horizontalDirection: 'increases-right' | 'increases-left';
  verticalDirection: 'increases-down' | 'increases-up';
  horizontalSummary: string; // e.g. "Increases as you move right across a period"
  verticalSummary: string; // e.g. "Decreases as you move down a group"
  exceptionsExplanation: string;
  getValue: (el: ChemicalElement) => number | undefined;
  formatValue: (val: number | undefined) => string;
  colorScale: (normalized: number) => string; // 0 (min) to 1 (max)
}

export const periodicTrends: Record<PeriodicTrendKey, PeriodicTrendDefinition> = {
  atomicRadius: {
    key: 'atomicRadius',
    label: 'Atomic Radius',
    unit: 'pm',
    shortDescription: 'The typical distance from the center of the nucleus to the boundary of the surrounding electron cloud.',
    studentExplanation:
      'Atomic radius decreases across a period because the growing positive nuclear charge pulls valence electrons closer. It increases down a group because new electron shells are added.',
    horizontalDirection: 'increases-left',
    verticalDirection: 'increases-down',
    horizontalSummary: '← Increases right to left (decreases across period)',
    verticalSummary: '↓ Increases top to bottom (down a group)',
    exceptionsExplanation:
      'Noble gases are sometimes measured via van der Waals radius instead of covalent radius, making their values appear larger. Transition metal contraction also causes radii in period 5 and 6 to be very similar (lanthanide contraction).',
    getValue: (el) => el.chemicalProperties.atomicRadius,
    formatValue: (val) => (val !== undefined ? `${val} pm` : 'N/A'),
    colorScale: (t) => `hsl(${220 - t * 180}, 85%, ${30 + t * 30}%)`,
  },

  ionizationEnergy: {
    key: 'ionizationEnergy',
    label: 'First Ionization Energy',
    unit: 'kJ/mol',
    shortDescription: 'The energy required to remove the most loosely held electron from an isolated gaseous atom.',
    studentExplanation:
      'Ionization energy increases across a period as effective nuclear charge increases and atomic radius shrinks, holding valence electrons tighter. It decreases down a group as valence electrons sit in shells farther from the nucleus.',
    horizontalDirection: 'increases-right',
    verticalDirection: 'increases-up',
    horizontalSummary: '→ Increases left to right across a period',
    verticalSummary: '↑ Increases bottom to top up a group',
    exceptionsExplanation:
      'Nitrogen has higher ionization energy than oxygen because nitrogen has a stable half-filled 2p³ subshell, whereas oxygen has a paired electron in 2p⁴ experiencing electron-electron repulsion. Similarly, beryllium (filled 2s²) has higher ionization energy than boron (2p¹).',
    getValue: (el) => el.chemicalProperties.firstIonizationEnergy,
    formatValue: (val) => (val !== undefined ? `${val.toFixed(1)} kJ/mol` : 'N/A'),
    colorScale: (t) => `hsl(${280 - t * 240}, 90%, ${35 + t * 25}%)`,
  },

  electronegativity: {
    key: 'electronegativity',
    label: 'Electronegativity',
    unit: 'Pauling scale',
    shortDescription: 'The relative ability of an atom in a chemical bond to attract shared electron pairs toward itself.',
    studentExplanation:
      'Fluorine is the most electronegative element (3.98). Electronegativity increases toward the top-right of the table as atoms have higher nuclear pull and smaller radii.',
    horizontalDirection: 'increases-right',
    verticalDirection: 'increases-up',
    horizontalSummary: '→ Increases left to right toward halogens',
    verticalSummary: '↑ Increases bottom to top',
    exceptionsExplanation:
      'Most noble gases have no assigned electronegativity because they rarely form chemical bonds. Transition metals have irregular minor variations due to d-orbital shielding.',
    getValue: (el) => el.chemicalProperties.electronegativity,
    formatValue: (val) => (val !== undefined ? `${val.toFixed(2)}` : 'N/A'),
    colorScale: (t) => `hsl(${140 - t * 140}, 90%, ${35 + t * 25}%)`,
  },

  electronAffinity: {
    key: 'electronAffinity',
    label: 'Electron Affinity',
    unit: 'kJ/mol',
    shortDescription: 'The amount of energy released when an electron is added to a neutral gaseous atom to form a negative ion.',
    studentExplanation:
      'Chlorine has the highest electron affinity in the entire periodic table (349 kJ/mol). Halogens release the most energy upon gaining an electron because it completes a noble gas octet.',
    horizontalDirection: 'increases-right',
    verticalDirection: 'increases-up',
    horizontalSummary: '→ Generally increases left to right',
    verticalSummary: '↑ Generally increases up groups',
    exceptionsExplanation:
      'Chlorine has higher electron affinity than fluorine (349 vs 328 kJ/mol) because fluorine’s compact 2p orbital experiences significant electron-electron repulsion. Group 2 (filled s²) and Group 15 (half-filled p³) elements also show anomalously low values.',
    getValue: (el) => el.chemicalProperties.electronAffinity,
    formatValue: (val) => (val !== undefined ? `${val.toFixed(1)} kJ/mol` : 'N/A'),
    colorScale: (t) => `hsl(${340 - t * 160}, 85%, ${35 + t * 25}%)`,
  },

  density: {
    key: 'density',
    label: 'Density',
    unit: 'g/cm³',
    shortDescription: 'Mass per unit volume at standard room temperature and pressure.',
    studentExplanation:
      'Density peaks in the middle of periods 5 and 6 among transition metals (osmium and iridium at ~22.6 g/cm³), where atoms are heavy and packed tightly.',
    horizontalDirection: 'increases-right',
    verticalDirection: 'increases-down',
    horizontalSummary: 'Peaks in transition metal centers (Group 8–10)',
    verticalSummary: '↓ Increases down a group as atomic mass grows',
    exceptionsExplanation:
      'Gases have densities thousands of times lower than solids at standard temperature and pressure.',
    getValue: (el) => el.physicalProperties.density,
    formatValue: (val) => (val !== undefined ? `${val.toFixed(3)}` : 'N/A'),
    colorScale: (t) => `hsl(${260 - t * 200}, 80%, ${30 + t * 30}%)`,
  },

  meltingPoint: {
    key: 'meltingPoint',
    label: 'Melting Point',
    unit: 'K',
    shortDescription: 'The temperature at which a substance transitions from solid to liquid under 1 atmosphere.',
    studentExplanation:
      'Melting points peak near group 6 (carbon at ~3823 K, tungsten at 3695 K) where covalent network or strong metallic bonding with many valence electrons exists.',
    horizontalDirection: 'increases-right',
    verticalDirection: 'increases-down',
    horizontalSummary: 'Peaks near group 6 where d-orbital bonding is maximized',
    verticalSummary: 'Varies by bonding type (metals vs nonmetals)',
    exceptionsExplanation:
      'Alkali metals decrease in melting point down the group, whereas halogens and noble gases increase in melting point down the group due to larger dispersion forces.',
    getValue: (el) => el.physicalProperties.meltingPointKelvin,
    formatValue: (val) => (val !== undefined ? `${val.toFixed(1)} K` : 'N/A'),
    colorScale: (t) => `hsl(${40 + t * 180}, 90%, ${35 + t * 25}%)`,
  },

  metallicCharacter: {
    key: 'metallicCharacter',
    label: 'Metallic Character',
    unit: 'qualitative',
    shortDescription: 'The tendency of an atom to lose electrons and exhibit typical metal properties (conductivity, luster, malleability).',
    studentExplanation:
      'Metallic character increases down a group as valence electrons are farther from the nucleus and easier to lose. It decreases left to right across a period as nonmetallic traits dominate.',
    horizontalDirection: 'increases-left',
    verticalDirection: 'increases-down',
    horizontalSummary: '← Increases right to left across periods',
    verticalSummary: '↓ Increases top to bottom down groups',
    exceptionsExplanation:
      'Separated by the diagonal staircase of metalloids (B, Si, Ge, As, Sb, Te).',
    getValue: (el) => (el.isMetal ? 3 : el.isMetalloid ? 2 : 1),
    formatValue: (val) => (val === 3 ? 'Metal' : val === 2 ? 'Metalloid' : 'Nonmetal'),
    colorScale: (t) => (t > 0.6 ? '#3b82f6' : t > 0.3 ? '#10b981' : '#f59e0b'),
  },
};
