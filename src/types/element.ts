export type ElementCategory =
  | 'alkali-metal'
  | 'alkaline-earth-metal'
  | 'transition-metal'
  | 'post-transition-metal'
  | 'metalloid'
  | 'reactive-nonmetal'
  | 'noble-gas'
  | 'lanthanide'
  | 'actinide'
  | 'unknown';

export type ElementBlock = 's' | 'p' | 'd' | 'f';

export type ElementPhase = 'solid' | 'liquid' | 'gas' | 'unknown';

export type CrystalStructure =
  | 'fcc' // Face-centered cubic
  | 'bcc' // Body-centered cubic
  | 'hcp' // Hexagonal close-packed
  | 'dhcp' // Double hexagonal close-packed
  | 'sc' // Simple cubic
  | 'cubic'
  | 'hexagonal'
  | 'diamond'
  | 'orthorhombic'
  | 'tetragonal'
  | 'rhombohedral'
  | 'monoclinic'
  | 'triclinic'
  | 'amorphous'
  | 'unknown';

export interface Isotope {
  massNumber: number;
  symbol: string;
  neutrons: number;
  isStable: boolean;
  halfLife?: string; // e.g. "5730 years", "stable", "12.3 years", "20.3 minutes"
  abundance?: number; // percentage, e.g. 99.98
  decayMode?: string; // e.g. "beta-minus", "alpha", "electron capture"
}

export interface CommonIon {
  formula: string; // e.g. "Na⁺", "Fe²⁺", "Fe³⁺"
  charge: number; // e.g. +1, +2, -1
  electronCount: number;
  configuration: string; // e.g. "[Ne]"
  explanation: string; // why it forms, e.g. "Loses its single 3s valence electron to attain a stable octet (Ne configuration)."
}

export interface Compound {
  formula: string; // e.g. "NaCl"
  name: string; // e.g. "Sodium Chloride"
  bondType: 'ionic' | 'covalent' | 'metallic' | 'polar-covalent' | 'coordinate';
  description: string; // e.g. "Table salt, essential electrolyte in human biology and major chemical feedstock."
}

export interface DiscoveryInfo {
  year: number | 'Ancient' | string;
  discoverer: string;
  location?: string;
  etymology: string;
  historicalContext?: string;
}

export interface PhysicalProperties {
  phase: ElementPhase;
  density?: number; // g/cm³ for solid/liquid, g/L for gas at STP
  densityUnit?: 'g/cm³' | 'g/L';
  meltingPointKelvin?: number;
  boilingPointKelvin?: number;
  triplePoint?: {
    temperatureKelvin?: number;
    pressureKPa?: number;
  };
  criticalPoint?: {
    temperatureKelvin?: number;
    pressureMPa?: number;
  };
  crystalStructure?: CrystalStructure;
  electricalConductivity?: number; // MS/m (Siemens/meter x 10^6)
  thermalConductivity?: number; // W/(m·K)
  mohsHardness?: number;
  colorAppearance?: string;
}

export interface ChemicalProperties {
  electronegativity?: number; // Pauling scale
  firstIonizationEnergy?: number; // kJ/mol
  electronAffinity?: number; // kJ/mol
  oxidationStates: number[];
  mainOxidationState?: number;
  atomicRadius?: number; // pm (empirical/calculated)
  covalentRadius?: number; // pm
  vanDerWaalsRadius?: number; // pm
  ionicRadius?: number; // pm (most common ion)
  reactivity?: string;
  bondingBehavior?: string;
}

export interface ElementUnderstanding {
  simpleTerms: string; // What makes this element distinctive for high school
  whyItBehavesThisWay: string; // Connect electron config / position to physical/chemical behavior
  keyTakeaways: string[]; // 3-5 high-yield learning points
}

export interface SafetyInfo {
  flammability: 'low' | 'moderate' | 'high' | 'extreme' | 'non-flammable';
  toxicity: 'non-toxic' | 'low' | 'moderate' | 'high' | 'extreme';
  corrosiveness?: boolean;
  radioactivity: boolean;
  reactivityWarning?: string;
  handlingConcerns: string;
  ghsSignalWord?: 'Warning' | 'Danger' | 'None';
}

export interface BiologicalRole {
  isEssential: boolean;
  humanImportance: string;
  dietarySources?: string[];
  toxicityRisk?: string;
}

export interface ChemicalElement {
  atomicNumber: number;
  symbol: string;
  name: string;
  atomicMass: number; // standard atomic weight or mass number of longest-lived isotope [xxx]
  atomicMassString: string; // e.g. "1.008" or "[294]" for synthetics
  category: ElementCategory;
  group: number | null; // 1-18, null for f-block
  period: number; // 1-7
  block: ElementBlock;
  phaseAtSTP: ElementPhase;
  appearance: string;
  casNumber?: string;

  // Subatomic
  protons: number;
  neutronsMostCommon: number;
  neutronNote?: string;
  electrons: number;

  // Electron Configuration
  electronConfiguration: {
    full: string; // e.g. "1s² 2s² 2p⁶ 3s¹"
    shorthand: string; // e.g. "[Ne] 3s¹"
    shells: number[]; // [2, 8, 1] (K, L, M, N, O, P, Q)
    valenceElectrons: number;
    valenceShellNumber: number;
  };

  // Detailed breakdown
  physicalProperties: PhysicalProperties;
  chemicalProperties: ChemicalProperties;
  understanding: ElementUnderstanding;
  applications: string[];
  biologicalRole: BiologicalRole;
  safety: SafetyInfo;
  discovery: DiscoveryInfo;

  isotopes: Isotope[];
  commonIons: CommonIon[];
  compounds: Compound[];

  // Origin: natural / synthetic
  isRadioactive: boolean;
  isSynthetic: boolean;
  isMetal: boolean;
  isMetalloid: boolean;
  isNonmetal: boolean;

  sources: string[];
}

export type EducationalMode = 'high-school' | 'university' | 'quick-reference';

export type TemperatureUnit = 'K' | 'C' | 'F';

export type PeriodicTrendKey =
  | 'atomicRadius'
  | 'ionizationEnergy'
  | 'electronegativity'
  | 'electronAffinity'
  | 'density'
  | 'meltingPoint'
  | 'metallicCharacter';
