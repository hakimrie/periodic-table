import type {
  ChemicalElement,
  ElementCategory,
  ElementBlock,
  ElementPhase,
  PhysicalProperties,
  ChemicalProperties,
  SafetyInfo,
} from '../../types/element';

export function createElement(
  data: Omit<Partial<ChemicalElement>, 'physicalProperties' | 'chemicalProperties' | 'safety'> & {
    atomicNumber: number;
    symbol: string;
    name: string;
    atomicMass: number;
    atomicMassString: string;
    category: ElementCategory;
    group: number | null;
    period: number;
    block: ElementBlock;
    phaseAtSTP: ElementPhase;
    appearance: string;
    neutronsMostCommon: number;
    electronConfiguration: {
      full: string;
      shorthand: string;
      shells: number[];
      valenceElectrons: number;
      valenceShellNumber: number;
    };
    understanding: {
      simpleTerms: string;
      whyItBehavesThisWay: string;
      keyTakeaways: string[];
    };
    physicalProperties?: Partial<PhysicalProperties>;
    chemicalProperties?: Partial<ChemicalProperties>;
    safety?: Partial<SafetyInfo>;
  }
): ChemicalElement {
  const isMetalloid = data.category === 'metalloid';
  const isNonmetal = ['reactive-nonmetal', 'noble-gas'].includes(data.category);
  const isMetal = [
    'alkali-metal',
    'alkaline-earth-metal',
    'transition-metal',
    'post-transition-metal',
    'lanthanide',
    'actinide',
  ].includes(data.category);

  const isSynthetic = data.atomicNumber >= 95 || [43, 61].includes(data.atomicNumber);
  const isRadioactive = data.atomicNumber >= 84 || [43, 61].includes(data.atomicNumber);

  return {
    ...data,
    protons: data.atomicNumber,
    electrons: data.atomicNumber,
    neutronsMostCommon: data.neutronsMostCommon,
    casNumber: data.casNumber ?? '',
    isRadioactive,
    isSynthetic,
    isMetal,
    isMetalloid,
    isNonmetal,
    sources: data.sources ?? ['IUPAC Periodic Table (2024)', 'NIST Physical Measurement Laboratory', 'PubChem Compound & Element DB'],
    physicalProperties: {
      phase: data.phaseAtSTP,
      colorAppearance: data.appearance,
      ...data.physicalProperties,
    },
    chemicalProperties: {
      oxidationStates: [],
      reactivity: 'Typical for its group',
      bondingBehavior: 'Standard periodic behavior',
      ...data.chemicalProperties,
    },
    applications: data.applications ?? [],
    biologicalRole: {
      isEssential: false,
      humanImportance: 'Not known to be essential to human biology.',
      ...data.biologicalRole,
    },
    safety: {
      flammability: 'non-flammable',
      toxicity: 'non-toxic',
      radioactivity: isRadioactive,
      handlingConcerns: isRadioactive ? 'Handle with radioactive precautions.' : 'Standard laboratory precautions.',
      ghsSignalWord: isRadioactive ? 'Danger' : 'None',
      ...data.safety,
    },
    discovery: {
      year: 'Ancient',
      discoverer: 'Known since antiquity',
      etymology: `Derived from roots associated with ${data.name.toLowerCase()}`,
      ...data.discovery,
    },
    isotopes: data.isotopes ?? [],
    commonIons: data.commonIons ?? [],
    compounds: data.compounds ?? [],
  } as ChemicalElement;
}
