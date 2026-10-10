import { elementsBySymbol } from './elements';

export type MolecularGeometry =
  | 'linear'
  | 'bent'
  | 'trigonal-planar'
  | 'trigonal-pyramidal'
  | 'tetrahedral'
  | 'octahedral'
  | 'crystal-lattice'
  | 'complex';

export interface MoleculeAtom {
  symbol: string;
  x: number;
  y: number;
  z: number;
}

// [atomIndexA, atomIndexB, bondOrder (1, 2, 3)]
export type MoleculeBond = [number, number, number];

export interface Molecule {
  id: string;
  formula: string; // e.g. "H2O"
  nameEn: string;
  nameId: string;
  commonNameEn: string;
  commonNameId: string;
  elementCounts: Record<string, number>;
  geometry: MolecularGeometry;
  bondType: 'covalent' | 'polar-covalent' | 'ionic';
  polarity: 'polar' | 'nonpolar' | 'ionic';
  funFactEn: string;
  funFactId: string;
  useEn: string;
  useId: string;
  atoms: MoleculeAtom[];
  bonds: MoleculeBond[];
}

/** Standard CPK Colors for 3D molecular modeling */
export const CPK_COLORS: Record<string, number> = {
  H: 0xffffff, // White
  C: 0x334155, // Dark slate
  N: 0x3b82f6, // Blue
  O: 0xef4444, // Red
  F: 0x22c55e, // Green
  Cl: 0x10b981, // Emerald green
  Br: 0x92400e, // Brown
  I: 0x7e22ce, // Purple
  He: 0x06b6d4,
  Ne: 0x06b6d4,
  Ar: 0x06b6d4,
  P: 0xf97316, // Orange
  S: 0xeab308, // Yellow
  B: 0xf472b6, // Pink
  Li: 0xa855f7, // Violet
  Na: 0x8b5cf6, // Violet-blue
  K: 0x7c3aed,
  Mg: 0x14b8a6, // Teal
  Ca: 0x0d9488,
  Al: 0x94a3b8, // Silver
  Si: 0x64748b,
  Fe: 0xd97706, // Rust orange
  Cu: 0xb45309,
};

/** Compute molar mass (g/mol) from real element masses */
export function computeMolarMass(counts: Record<string, number>): number {
  let total = 0;
  for (const [sym, count] of Object.entries(counts)) {
    const el = elementsBySymbol.get(sym.toLowerCase());
    if (el) total += el.atomicMass * count;
  }
  return total;
}

const SUBSCRIPT_MAP: Record<string, string> = {
  '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄',
  '5': '₅', '6': '₆', '7': '₇', '8': '₈', '9': '₉',
};

/** Formats chemical formulas with proper subscripts (e.g. H2O -> H₂O, CO2 -> CO₂) */
export function formatFormulaSubscripts(formula: string): string {
  return formula.replace(/\d+/g, (match) => {
    return match.split('').map((char) => SUBSCRIPT_MAP[char] || char).join('');
  });
}

/** Curated dataset of 42 real molecules */
export const MOLECULES_DATABASE: Molecule[] = [
  // 1. Water
  {
    id: 'h2o',
    formula: 'H2O',
    nameEn: 'Water (Dihydrogen Monoxide)',
    nameId: 'Air (Dihidrogen Monoksida)',
    commonNameEn: 'Water',
    commonNameId: 'Air',
    elementCounts: { H: 2, O: 1 },
    geometry: 'bent',
    bondType: 'polar-covalent',
    polarity: 'polar',
    funFactEn: 'Water expands when it freezes into ice due to its open hexagonal hydrogen-bonded crystal lattice.',
    funFactId: 'Air mengembang saat membeku menjadi es karena membentuk kisi kristal heksagonal berikatan hidrogen.',
    useEn: 'Universal solvent essential for all known life.',
    useId: 'Pelarut universal yang esensial bagi seluruh kehidupan.',
    atoms: [
      { symbol: 'O', x: 0, y: 0.12, z: 0 },
      { symbol: 'H', x: -0.76, y: -0.48, z: 0 },
      { symbol: 'H', x: 0.76, y: -0.48, z: 0 },
    ],
    bonds: [[0, 1, 1], [0, 2, 1]],
  },

  // 2. Carbon Dioxide
  {
    id: 'co2',
    formula: 'CO2',
    nameEn: 'Carbon Dioxide',
    nameId: 'Karbon Dioksida',
    commonNameEn: 'Carbon Dioxide',
    commonNameId: 'Karbon Dioksida',
    elementCounts: { C: 1, O: 2 },
    geometry: 'linear',
    bondType: 'covalent',
    polarity: 'nonpolar',
    funFactEn: 'Sublimes directly from solid dry ice to gas at -78.5 °C without passing through a liquid phase at atmospheric pressure.',
    funFactId: 'Menyublim langsung dari es kering padat menjadi gas pada -78,5 °C pada tekanan atmosfer.',
    useEn: 'Photosynthesis reactant, carbonation in drinks, and fire extinguishers.',
    useId: 'Reaktan fotosintesis, karbonasi minuman, dan pemadam kebakaran.',
    atoms: [
      { symbol: 'C', x: 0, y: 0, z: 0 },
      { symbol: 'O', x: -1.16, y: 0, z: 0 },
      { symbol: 'O', x: 1.16, y: 0, z: 0 },
    ],
    bonds: [[0, 1, 2], [0, 2, 2]],
  },

  // 3. Methane
  {
    id: 'ch4',
    formula: 'CH4',
    nameEn: 'Methane',
    nameId: 'Metana',
    commonNameEn: 'Natural Gas',
    commonNameId: 'Gas Alam',
    elementCounts: { C: 1, H: 4 },
    geometry: 'tetrahedral',
    bondType: 'covalent',
    polarity: 'nonpolar',
    funFactEn: 'The simplest hydrocarbon with perfect 109.5° tetrahedral bond angles.',
    funFactId: 'Hidrokarbon paling sederhana dengan sudut ikatan tetrahedral sempurna 109,5°.',
    useEn: 'Primary component of natural gas used for heating and electricity.',
    useId: 'Komponen utama gas alam untuk pemanas dan pembangkit listrik.',
    atoms: [
      { symbol: 'C', x: 0, y: 0, z: 0 },
      { symbol: 'H', x: 0.63, y: 0.63, z: 0.63 },
      { symbol: 'H', x: -0.63, y: -0.63, z: 0.63 },
      { symbol: 'H', x: -0.63, y: 0.63, z: -0.63 },
      { symbol: 'H', x: 0.63, y: -0.63, z: -0.63 },
    ],
    bonds: [[0, 1, 1], [0, 2, 1], [0, 3, 1], [0, 4, 1]],
  },

  // 4. Ammonia
  {
    id: 'nh3',
    formula: 'NH3',
    nameEn: 'Ammonia',
    nameId: 'Amonia',
    commonNameEn: 'Ammonia',
    commonNameId: 'Amonia',
    elementCounts: { N: 1, H: 3 },
    geometry: 'trigonal-pyramidal',
    bondType: 'polar-covalent',
    polarity: 'polar',
    funFactEn: 'Produced industrially via the Haber-Bosch process, which sustains global food agriculture.',
    funFactId: 'Diproduksi melalui proses Haber-Bosch yang menopang pertanian pangan dunia.',
    useEn: 'Agricultural nitrogen fertilizers and household cleaners.',
    useId: 'Pupuk nitrogen pertanian dan pembersih rumah tangga.',
    atoms: [
      { symbol: 'N', x: 0, y: 0.2, z: 0 },
      { symbol: 'H', x: 0, y: -0.2, z: 0.94 },
      { symbol: 'H', x: 0.81, y: -0.2, z: -0.47 },
      { symbol: 'H', x: -0.81, y: -0.2, z: -0.47 },
    ],
    bonds: [[0, 1, 1], [0, 2, 1], [0, 3, 1]],
  },

  // 5. Molecular Oxygen
  {
    id: 'o2',
    formula: 'O2',
    nameEn: 'Dioxygen',
    nameId: 'Dioksigen',
    commonNameEn: 'Oxygen Gas',
    commonNameId: 'Gas Oksigen',
    elementCounts: { O: 2 },
    geometry: 'linear',
    bondType: 'covalent',
    polarity: 'nonpolar',
    funFactEn: 'Liquid oxygen is pale blue and paramagnetic (attracted to magnets) due to two unpaired electrons in antibonding π* orbitals.',
    funFactId: 'Oksigen cair berwarna biru muda dan bersifat paramagnetik karena memiliki 2 elektron tak berpasangan pada orbital antibonding π*.',
    useEn: 'Cellular respiration in aerobic organisms and hospital respiratory therapy.',
    useId: 'Respirasi seluler makhluk aerob dan terapi pernapasan medis.',
    atoms: [
      { symbol: 'O', x: -0.6, y: 0, z: 0 },
      { symbol: 'O', x: 0.6, y: 0, z: 0 },
    ],
    bonds: [[0, 1, 2]],
  },

  // 6. Molecular Nitrogen
  {
    id: 'n2',
    formula: 'N2',
    nameEn: 'Dinitrogen',
    nameId: 'Dinitrogen',
    commonNameEn: 'Nitrogen Gas',
    commonNameId: 'Gas Nitrogen',
    elementCounts: { N: 2 },
    geometry: 'linear',
    bondType: 'covalent',
    polarity: 'nonpolar',
    funFactEn: 'Has one of the strongest chemical bonds in nature: a triple bond with dissociation energy of 945 kJ/mol.',
    funFactId: 'Memiliki ikatan rangkap tiga terkuat dengan energi disosiasi 945 kJ/mol.',
    useEn: 'Makes up 78% of Earth’s atmosphere; inert food packaging gas.',
    useId: 'Menyusun 78% atmosfer Bumi; gas pengisi kemasan makanan.',
    atoms: [
      { symbol: 'N', x: -0.55, y: 0, z: 0 },
      { symbol: 'N', x: 0.55, y: 0, z: 0 },
    ],
    bonds: [[0, 1, 3]],
  },

  // 7. Hydrogen Gas
  {
    id: 'h2',
    formula: 'H2',
    nameEn: 'Dihydrogen',
    nameId: 'Dihidrogen',
    commonNameEn: 'Hydrogen Gas',
    commonNameId: 'Gas Hidrogen',
    elementCounts: { H: 2 },
    geometry: 'linear',
    bondType: 'covalent',
    polarity: 'nonpolar',
    funFactEn: 'The most abundant chemical molecule in the universe, fueling stellar nuclear fusion.',
    funFactId: 'Molekul paling melimpah di alam semesta, bahan bakar fusi nuklir bintang.',
    useEn: 'Zero-emission fuel cells and petroleum hydrocracking.',
    useId: 'Sel bahan bakar bebas emisi dan hidrogenasi minyak bumi.',
    atoms: [
      { symbol: 'H', x: -0.37, y: 0, z: 0 },
      { symbol: 'H', x: 0.37, y: 0, z: 0 },
    ],
    bonds: [[0, 1, 1]],
  },

  // 8. Table Salt (NaCl - rock salt lattice fragment)
  {
    id: 'nacl',
    formula: 'NaCl',
    nameEn: 'Sodium Chloride',
    nameId: 'Natrium Klorida',
    commonNameEn: 'Table Salt',
    commonNameId: 'Garam Dapur',
    elementCounts: { Na: 1, Cl: 1 },
    geometry: 'crystal-lattice',
    bondType: 'ionic',
    polarity: 'ionic',
    funFactEn: 'Formed from violently reactive soft sodium metal and choking poisonous chlorine gas.',
    funFactId: 'Terbentuk dari reaksi logam natrium yang sangat reaktif dan gas klorin yang beracun.',
    useEn: 'Dietary seasoning, physiological electrolyte balance, food preservation.',
    useId: 'Bumbu makanan, elektrolit tubuh, dan pengawet makanan.',
    atoms: [
      { symbol: 'Na', x: -0.8, y: 0, z: 0 },
      { symbol: 'Cl', x: 0.8, y: 0, z: 0 },
    ],
    bonds: [[0, 1, 1]],
  },

  // 9. Hydrogen Peroxide
  {
    id: 'h2o2',
    formula: 'H2O2',
    nameEn: 'Hydrogen Peroxide',
    nameId: 'Hidrogen Peroksida',
    commonNameEn: 'Hydrogen Peroxide',
    commonNameId: 'Hidrogen Peroksida',
    elementCounts: { H: 2, O: 2 },
    geometry: 'complex',
    bondType: 'polar-covalent',
    polarity: 'polar',
    funFactEn: 'Contains a weak and unstable single O-O peroxide bond that readily decomposes into water and oxygen gas.',
    funFactId: 'Memiliki ikatan tunggal O-O peroksida yang mudah terurai menjadi air dan gas oksigen.',
    useEn: 'Antiseptic disinfectant, teeth whitening, bleaching agent.',
    useId: 'Antiseptik luka, pemutih gigi, dan pemutih pakaian.',
    atoms: [
      { symbol: 'O', x: -0.7, y: 0, z: 0 },
      { symbol: 'O', x: 0.7, y: 0, z: 0 },
      { symbol: 'H', x: -1.1, y: 0.8, z: 0 },
      { symbol: 'H', x: 1.1, y: -0.5, z: 0.6 },
    ],
    bonds: [[0, 1, 1], [0, 2, 1], [1, 3, 1]],
  },

  // 10. Carbon Monoxide
  {
    id: 'co',
    formula: 'CO',
    nameEn: 'Carbon Monoxide',
    nameId: 'Karbon Monoksida',
    commonNameEn: 'Carbon Monoxide',
    commonNameId: 'Karbon Monoksida',
    elementCounts: { C: 1, O: 1 },
    geometry: 'linear',
    bondType: 'polar-covalent',
    polarity: 'polar',
    funFactEn: 'Binds to hemoglobin over 200 times more tightly than oxygen, preventing oxygen transport in the blood.',
    funFactId: 'Mengikat hemoglobin 200 kali lebih kuat dibanding oksigen sehingga menghambat oksigenasi darah.',
    useEn: 'Industrial syngas production and metallurgical reducing agent.',
    useId: 'Bahan baku syngas dan reduktor pada peleburan logam.',
    atoms: [
      { symbol: 'C', x: -0.56, y: 0, z: 0 },
      { symbol: 'O', x: 0.56, y: 0, z: 0 },
    ],
    bonds: [[0, 1, 3]],
  },

  // 11. Ethanol
  {
    id: 'c2h5oh',
    formula: 'C2H6O',
    nameEn: 'Ethanol',
    nameId: 'Etanol',
    commonNameEn: 'Alcohol',
    commonNameId: 'Alkohol',
    elementCounts: { C: 2, H: 6, O: 1 },
    geometry: 'complex',
    bondType: 'polar-covalent',
    polarity: 'polar',
    funFactEn: 'Its hydroxyl group (-OH) allows it to form hydrogen bonds with water, making it miscible in all proportions.',
    funFactId: 'Gugus hidroksil (-OH) memungkinkannya membentuk ikatan hidrogen dan larut sempurna dalam air.',
    useEn: 'Hand sanitizer, laboratory solvent, renewable biofuel (E10/E85).',
    useId: 'Pembersih tangan (sanitizer), pelarut laboratorium, dan biofuel.',
    atoms: [
      { symbol: 'C', x: -0.9, y: 0, z: 0 },
      { symbol: 'C', x: 0.4, y: 0.3, z: 0 },
      { symbol: 'O', x: 1.4, y: -0.6, z: 0 },
      { symbol: 'H', x: 2.2, y: -0.2, z: 0 },
      { symbol: 'H', x: -1.3, y: -0.5, z: 0.8 },
      { symbol: 'H', x: -1.3, y: -0.5, z: -0.8 },
      { symbol: 'H', x: -1.1, y: 1.0, z: 0 },
      { symbol: 'H', x: 0.5, y: 0.9, z: 0.8 },
      { symbol: 'H', x: 0.5, y: 0.9, z: -0.8 },
    ],
    bonds: [
      [0, 1, 1],
      [1, 2, 1],
      [2, 3, 1],
      [0, 4, 1],
      [0, 5, 1],
      [0, 6, 1],
      [1, 7, 1],
      [1, 8, 1],
    ],
  },

  // 12. Glucose
  {
    id: 'c6h12o6',
    formula: 'C6H12O6',
    nameEn: 'D-Glucose',
    nameId: 'D-Glukosa',
    commonNameEn: 'Blood Sugar / Glucose',
    commonNameId: 'Gula Darah / Glukosa',
    elementCounts: { C: 6, H: 12, O: 6 },
    geometry: 'complex',
    bondType: 'covalent',
    polarity: 'polar',
    funFactEn: 'The primary chemical fuel synthesized by plants through photosynthesis and metabolized by human brain cells.',
    funFactId: 'Bahan bakar kimia utama yang disintesis tumbuhan lewat fotosintesis dan dikonsumsi sel otak manusia.',
    useEn: 'Universal cellular energy currency (glycolysis & ATP production).',
    useId: 'Sumber energi utama seluler tubuh manusia dan hewan.',
    atoms: [
      { symbol: 'C', x: -1.2, y: 0.6, z: 0 },
      { symbol: 'C', x: 0, y: 1.2, z: 0 },
      { symbol: 'C', x: 1.2, y: 0.6, z: 0 },
      { symbol: 'C', x: 1.2, y: -0.8, z: 0 },
      { symbol: 'C', x: 0, y: -1.4, z: 0 },
      { symbol: 'O', x: -1.2, y: -0.8, z: 0 },
      { symbol: 'O', x: 0, y: 2.4, z: 0 },
      { symbol: 'O', x: 2.2, y: 1.2, z: 0 },
      { symbol: 'O', x: 2.2, y: -1.4, z: 0 },
      { symbol: 'O', x: 0, y: -2.6, z: 0 },
      { symbol: 'C', x: -2.4, y: 1.2, z: 0 },
      { symbol: 'O', x: -3.4, y: 0.6, z: 0 },
      { symbol: 'H', x: -1.2, y: 0.6, z: 1.0 },
      { symbol: 'H', x: 0, y: 1.2, z: 1.0 },
      { symbol: 'H', x: 1.2, y: 0.6, z: 1.0 },
      { symbol: 'H', x: 1.2, y: -0.8, z: 1.0 },
      { symbol: 'H', x: 0, y: -1.4, z: 1.0 },
      { symbol: 'H', x: 0.6, y: 2.8, z: 0 },
      { symbol: 'H', x: 2.8, y: 1.6, z: 0 },
      { symbol: 'H', x: 2.8, y: -1.0, z: 0 },
      { symbol: 'H', x: 0.6, y: -3.0, z: 0 },
      { symbol: 'H', x: -2.4, y: 2.0, z: 0 },
      { symbol: 'H', x: -2.8, y: 1.2, z: 0.8 },
      { symbol: 'H', x: -3.8, y: 1.1, z: 0 },
    ],
    bonds: [
      [0, 1, 1], [1, 2, 1], [2, 3, 1], [3, 4, 1], [4, 5, 1], [5, 0, 1],
      [1, 6, 1], [2, 7, 1], [3, 8, 1], [4, 9, 1], [0, 10, 1], [10, 11, 1],
      [0, 12, 1], [1, 13, 1], [2, 14, 1], [3, 15, 1], [4, 16, 1],
      [6, 17, 1], [7, 18, 1], [8, 19, 1], [9, 20, 1], [10, 21, 1], [10, 22, 1], [11, 23, 1],
    ],
  },

  // 13. Hydrochloric Acid
  {
    id: 'hcl',
    formula: 'HCl',
    nameEn: 'Hydrogen Chloride',
    nameId: 'Asam Klorida',
    commonNameEn: 'Muriatic Acid',
    commonNameId: 'Asam Lambung',
    elementCounts: { H: 1, Cl: 1 },
    geometry: 'linear',
    bondType: 'polar-covalent',
    polarity: 'polar',
    funFactEn: 'Produced naturally in the human stomach lining to activate digestive enzymes (pepsin).',
    funFactId: 'Diproduksi di lambung manusia untuk mengaktifkan enzim pencernaan pepsin.',
    useEn: 'Gastric digestion, metal pickling, chemical synthesis.',
    useId: 'Pencernaan lambung, pembersihan logam karat, dan sintesis kimia.',
    atoms: [
      { symbol: 'Cl', x: 0.4, y: 0, z: 0 },
      { symbol: 'H', x: -0.9, y: 0, z: 0 },
    ],
    bonds: [[0, 1, 1]],
  },

  // 14. Hydrogen Fluoride
  {
    id: 'hf',
    formula: 'HF',
    nameEn: 'Hydrogen Fluoride',
    nameId: 'Hidrogen Fluorida',
    commonNameEn: 'Hydrofluoric Acid',
    commonNameId: 'Asam Fluorida',
    elementCounts: { H: 1, F: 1 },
    geometry: 'linear',
    bondType: 'polar-covalent',
    polarity: 'polar',
    funFactEn: 'One of the few acids that dissolves glass (silicon dioxide) by reacting to form silicon tetrafluoride.',
    funFactId: 'Salah satu dari sedikit asam yang dapat melarutkan kaca dengan bereaksi membentuk silikon tetrafluorida.',
    useEn: 'Glass etching and semiconductor silicon wafer cleaning.',
    useId: 'Etsa kaca dan pembersihan wafer silikon semikonduktor.',
    atoms: [
      { symbol: 'F', x: 0.35, y: 0, z: 0 },
      { symbol: 'H', x: -0.65, y: 0, z: 0 },
    ],
    bonds: [[0, 1, 1]],
  },

  // 15. Sodium Hydroxide
  {
    id: 'naoh',
    formula: 'NaOH',
    nameEn: 'Sodium Hydroxide',
    nameId: 'Natrium Hidroksida',
    commonNameEn: 'Lye / Caustic Soda',
    commonNameId: 'Soda Api',
    elementCounts: { Na: 1, O: 1, H: 1 },
    geometry: 'linear',
    bondType: 'ionic',
    polarity: 'ionic',
    funFactEn: 'Reacts with animal fats in the saponification reaction to produce traditional soap.',
    funFactId: 'Bereaksi dengan lemak dalam reaksi saponifikasi untuk menghasilkan sabun.',
    useEn: 'Drain cleaner, soap making, paper pulping.',
    useId: 'Pembersih pipa mampet, pembuatan sabun, dan industri kertas.',
    atoms: [
      { symbol: 'Na', x: -1.2, y: 0, z: 0 },
      { symbol: 'O', x: 0.4, y: 0, z: 0 },
      { symbol: 'H', x: 1.3, y: 0, z: 0 },
    ],
    bonds: [[0, 1, 1], [1, 2, 1]],
  },

  // 16. Sulfuric Acid
  {
    id: 'h2so4',
    formula: 'H2SO4',
    nameEn: 'Sulfuric Acid',
    nameId: 'Asam Sulfat',
    commonNameEn: 'Battery Acid',
    commonNameId: 'Air Aki',
    elementCounts: { H: 2, S: 1, O: 4 },
    geometry: 'tetrahedral',
    bondType: 'covalent',
    polarity: 'polar',
    funFactEn: 'Known as the "King of Chemicals" because global industrial production volume directly tracks economic activity.',
    funFactId: 'Dijuluki "Raja Bahan Kimia" karena volume produksinya menjadi barometer aktivitas industri dunia.',
    useEn: 'Lead-acid car batteries, fertilizer production, chemical refining.',
    useId: 'Aki kendaraan bermotor, produksi pupuk fosfat, dan pengilangan.',
    atoms: [
      { symbol: 'S', x: 0, y: 0, z: 0 },
      { symbol: 'O', x: 0, y: 1.4, z: 0 },
      { symbol: 'O', x: 0, y: -1.4, z: 0 },
      { symbol: 'O', x: 1.4, y: 0, z: 0.5 },
      { symbol: 'O', x: -1.4, y: 0, z: 0.5 },
      { symbol: 'H', x: 1.9, y: 0, z: 1.2 },
      { symbol: 'H', x: -1.9, y: 0, z: 1.2 },
    ],
    bonds: [
      [0, 1, 2],
      [0, 2, 2],
      [0, 3, 1],
      [0, 4, 1],
      [3, 5, 1],
      [4, 6, 1],
    ],
  },

  // 17. Nitric Acid
  {
    id: 'hno3',
    formula: 'HNO3',
    nameEn: 'Nitric Acid',
    nameId: 'Asam Nitrat',
    commonNameEn: 'Aqua Fortis',
    commonNameId: 'Asam Sendawa',
    elementCounts: { H: 1, N: 1, O: 3 },
    geometry: 'trigonal-planar',
    bondType: 'covalent',
    polarity: 'polar',
    funFactEn: 'Mix with hydrochloric acid (1:3 ratio) to create Aqua Regia (Royal Water), the only acid solution that dissolves gold and platinum.',
    funFactId: 'Campuran asam nitrat dan asam klorida (1:3) membentuk Air Raja (Aqua Regia) yang dapat melarutkan emas.',
    useEn: 'Manufacturing ammonium nitrate fertilizer and explosives.',
    useId: 'Bahan baku pupuk amonium nitrat dan industri pertambangan.',
    atoms: [
      { symbol: 'N', x: 0, y: 0, z: 0 },
      { symbol: 'O', x: -1.1, y: 0.6, z: 0 },
      { symbol: 'O', x: 1.1, y: 0.6, z: 0 },
      { symbol: 'O', x: 0, y: -1.2, z: 0 },
      { symbol: 'H', x: -1.8, y: 0.1, z: 0 },
    ],
    bonds: [[0, 1, 1], [0, 2, 2], [0, 3, 1], [1, 4, 1]],
  },

  // 18. Ozone
  {
    id: 'o3',
    formula: 'O3',
    nameEn: 'Ozone',
    nameId: 'Ozon',
    commonNameEn: 'Ozone',
    commonNameId: 'Ozon',
    elementCounts: { O: 3 },
    geometry: 'bent',
    bondType: 'covalent',
    polarity: 'polar',
    funFactEn: 'Forms the stratospheric ozone layer protecting Earth from lethal solar ultraviolet (UV-C) radiation.',
    funFactId: 'Membentuk lapisan ozon stratosfer yang menyerap radiasi ultraviolet matahari mematikan.',
    useEn: 'Atmospheric UV shielding and drinking water sterilization.',
    useId: 'Perisai radiasi UV bumi dan sterilisasi air minum.',
    atoms: [
      { symbol: 'O', x: 0, y: 0.4, z: 0 },
      { symbol: 'O', x: -1.1, y: -0.3, z: 0 },
      { symbol: 'O', x: 1.1, y: -0.3, z: 0 },
    ],
    bonds: [[0, 1, 1], [0, 2, 2]],
  },

  // 19. Benzene
  {
    id: 'c6h6',
    formula: 'C6H6',
    nameEn: 'Benzene',
    nameId: 'Benzena',
    commonNameEn: 'Benzene',
    commonNameId: 'Benzena',
    elementCounts: { C: 6, H: 6 },
    geometry: 'trigonal-planar',
    bondType: 'covalent',
    polarity: 'nonpolar',
    funFactEn: 'Its ring of 6 delocalized π electrons gives it extraordinary aromatic stability (Kekulé structure).',
    funFactId: 'Cincin 6 elektron π terdelokalisasi memberikan kestabilan aromatik yang luar biasa.',
    useEn: 'Fundamental petrochemical building block for plastics, resins, and nylon.',
    useId: 'Bahan dasar industri petrokimia untuk plastik, nilon, dan resin.',
    atoms: [
      { symbol: 'C', x: 1.4, y: 0, z: 0 },
      { symbol: 'C', x: 0.7, y: 1.21, z: 0 },
      { symbol: 'C', x: -0.7, y: 1.21, z: 0 },
      { symbol: 'C', x: -1.4, y: 0, z: 0 },
      { symbol: 'C', x: -0.7, y: -1.21, z: 0 },
      { symbol: 'C', x: 0.7, y: -1.21, z: 0 },
      { symbol: 'H', x: 2.4, y: 0, z: 0 },
      { symbol: 'H', x: 1.2, y: 2.1, z: 0 },
      { symbol: 'H', x: -1.2, y: 2.1, z: 0 },
      { symbol: 'H', x: -2.4, y: 0, z: 0 },
      { symbol: 'H', x: -1.2, y: -2.1, z: 0 },
      { symbol: 'H', x: 1.2, y: -2.1, z: 0 },
    ],
    bonds: [
      [0, 1, 2], [1, 2, 1], [2, 3, 2], [3, 4, 1], [4, 5, 2], [5, 0, 1],
      [0, 6, 1], [1, 7, 1], [2, 8, 1], [3, 9, 1], [4, 10, 1], [5, 11, 1],
    ],
  },

  // 20. Calcium Carbonate (Limestone)
  {
    id: 'caco3',
    formula: 'CaCO3',
    nameEn: 'Calcium Carbonate',
    nameId: 'Kalsium Karbonat',
    commonNameEn: 'Limestone / Chalk',
    commonNameId: 'Batu Kapur / Kalsit',
    elementCounts: { Ca: 1, C: 1, O: 3 },
    geometry: 'crystal-lattice',
    bondType: 'ionic',
    polarity: 'ionic',
    funFactEn: 'Forms seashells, coral reefs, eggshells, and the majestic stalactites and stalagmites in caves.',
    funFactId: 'Menyusun cangkang kerang, terumbu karang, cangkang telur, dan stalaktit di dalam gua.',
    useEn: 'Building cement, dietary calcium supplements, chalkboard chalk.',
    useId: 'Bahan baku semen bangunan, suplemen kalsium, dan kapur tulis.',
    atoms: [
      { symbol: 'Ca', x: -1.5, y: 0, z: 0 },
      { symbol: 'C', x: 0.8, y: 0, z: 0 },
      { symbol: 'O', x: 0.8, y: 1.25, z: 0 },
      { symbol: 'O', x: 1.9, y: -0.6, z: 0 },
      { symbol: 'O', x: -0.3, y: -0.6, z: 0 },
    ],
    bonds: [[1, 2, 2], [1, 3, 1], [1, 4, 1]],
  },

  // 21. Silicon Dioxide (Quartz / Sand)
  {
    id: 'sio2',
    formula: 'SiO2',
    nameEn: 'Silicon Dioxide',
    nameId: 'Silikon Dioksida',
    commonNameEn: 'Quartz / Silica Sand',
    commonNameId: 'Pasir Kuarsa',
    elementCounts: { Si: 1, O: 2 },
    geometry: 'tetrahedral',
    bondType: 'covalent',
    polarity: 'nonpolar',
    funFactEn: 'Makes up the vast majority of beach sand and forms glass when melted at 1713 °C and rapidly cooled.',
    funFactId: 'Merupakan komponen utama pasir pantai dan bahan pembuat kaca ketika dilelehkan pada 1713 °C.',
    useEn: 'Glassware manufacturing, optical fiber cables, silica gel desiccants.',
    useId: 'Pembuatan kaca, serat optik internet, dan pengering silika gel.',
    atoms: [
      { symbol: 'Si', x: 0, y: 0, z: 0 },
      { symbol: 'O', x: -1.2, y: 0.5, z: 0 },
      { symbol: 'O', x: 1.2, y: -0.5, z: 0 },
    ],
    bonds: [[0, 1, 2], [0, 2, 2]],
  },

  // 22. Rust (Iron(III) Oxide)
  {
    id: 'fe2o3',
    formula: 'Fe2O3',
    nameEn: 'Iron(III) Oxide',
    nameId: 'Besi(III) Oksida',
    commonNameEn: 'Rust / Hematite',
    commonNameId: 'Karat Besi',
    elementCounts: { Fe: 2, O: 3 },
    geometry: 'crystal-lattice',
    bondType: 'ionic',
    polarity: 'ionic',
    funFactEn: 'Gives the planet Mars its reddish hue, earning it the moniker "The Red Planet".',
    funFactId: 'Memberikan warna merah khas pada planet Mars sehingga dijuluki "Planet Merah".',
    useEn: 'Iron smelting metallurgy, magnetic recording tapes, artist pigments.',
    useId: 'Peleburan bijih besi, pigmen merah cat, dan pita kaset magnetik.',
    atoms: [
      { symbol: 'Fe', x: -1.2, y: 0, z: 0 },
      { symbol: 'Fe', x: 1.2, y: 0, z: 0 },
      { symbol: 'O', x: 0, y: 1.1, z: 0 },
      { symbol: 'O', x: 0, y: -1.1, z: 0 },
      { symbol: 'O', x: 0, y: 0, z: 1.2 },
    ],
    bonds: [[0, 2, 1], [1, 2, 1], [0, 3, 1], [1, 3, 1], [0, 4, 1], [1, 4, 1]],
  },

  // 23. Ethylene / Ethene
  {
    id: 'c2h4',
    formula: 'C2H4',
    nameEn: 'Ethylene (Ethene)',
    nameId: 'Etilena (Etena)',
    commonNameEn: 'Ethylene',
    commonNameId: 'Etilena',
    elementCounts: { C: 2, H: 4 },
    geometry: 'trigonal-planar',
    bondType: 'covalent',
    polarity: 'nonpolar',
    funFactEn: 'Acts as a natural plant hormone that triggers fruit ripening.',
    funFactId: 'Berfungsi sebagai hormon alami tumbuhan yang memicu pematangan buah.',
    useEn: 'Production of polyethylene plastics and synthetic chemical feedstocks.',
    useId: 'Bahan baku pembuatan plastik polietilena dan industri kimia sintetis.',
    atoms: [
      { symbol: 'C', x: -0.67, y: 0, z: 0 },
      { symbol: 'C', x: 0.67, y: 0, z: 0 },
      { symbol: 'H', x: -1.23, y: 0.92, z: 0 },
      { symbol: 'H', x: -1.23, y: -0.92, z: 0 },
      { symbol: 'H', x: 1.23, y: 0.92, z: 0 },
      { symbol: 'H', x: 1.23, y: -0.92, z: 0 },
    ],
    bonds: [[0, 1, 2], [0, 2, 1], [0, 3, 1], [1, 4, 1], [1, 5, 1]],
  },

  // 24. Acetylene / Ethyne
  {
    id: 'c2h2',
    formula: 'C2H2',
    nameEn: 'Acetylene (Ethyne)',
    nameId: 'Asetilena (Etuna)',
    commonNameEn: 'Acetylene',
    commonNameId: 'Gas Karbit',
    elementCounts: { C: 2, H: 2 },
    geometry: 'linear',
    bondType: 'covalent',
    polarity: 'nonpolar',
    funFactEn: 'Burns with oxygen at over 3,300 °C, producing the hottest chemical flame of all hydrocarbons.',
    funFactId: 'Membakar dengan oksigen pada suhu lebih dari 3.300 °C, api kimia terpanas dari semua hidrokarbon.',
    useEn: 'Oxy-acetylene metal welding and chemical synthesis.',
    useId: 'Pengelasan logam oksi-asetilena dan sintesis kimia organik.',
    atoms: [
      { symbol: 'C', x: -0.6, y: 0, z: 0 },
      { symbol: 'C', x: 0.6, y: 0, z: 0 },
      { symbol: 'H', x: -1.66, y: 0, z: 0 },
      { symbol: 'H', x: 1.66, y: 0, z: 0 },
    ],
    bonds: [[0, 1, 3], [0, 2, 1], [1, 3, 1]],
  },

  // 25. Methanol
  {
    id: 'ch4o',
    formula: 'CH4O',
    nameEn: 'Methanol (Methyl Alcohol)',
    nameId: 'Metanol (Metil Alkohol)',
    commonNameEn: 'Wood Alcohol',
    commonNameId: 'Alkohol Kayu',
    elementCounts: { C: 1, H: 4, O: 1 },
    geometry: 'tetrahedral',
    bondType: 'polar-covalent',
    polarity: 'polar',
    funFactEn: 'Extremely toxic if ingested; human liver enzymes oxidize it to formic acid causing blindness.',
    funFactId: 'Sangat beracun jika tertelan; enzim hati mengoksidasinya menjadi asam format yang memicu kebutaan.',
    useEn: 'Industrial feedstock, racing fuel, and solvent.',
    useId: 'Bahan baku industri kimia, bahan bakar balap, dan pelarut organik.',
    atoms: [
      { symbol: 'C', x: -0.6, y: 0, z: 0 },
      { symbol: 'O', x: 0.75, y: 0.15, z: 0 },
      { symbol: 'H', x: -0.95, y: -0.5, z: 0.88 },
      { symbol: 'H', x: -0.95, y: -0.5, z: -0.88 },
      { symbol: 'H', x: -0.95, y: 1.02, z: 0 },
      { symbol: 'H', x: 1.15, y: -0.7, z: 0 },
    ],
    bonds: [[0, 1, 1], [0, 2, 1], [0, 3, 1], [0, 4, 1], [1, 5, 1]],
  },

  // 26. Acetic Acid
  {
    id: 'c2h4o2',
    formula: 'C2H4O2',
    nameEn: 'Acetic Acid (Ethanoic Acid)',
    nameId: 'Asam Asetat (Asam Etanoat)',
    commonNameEn: 'Vinegar',
    commonNameId: 'Cuka',
    elementCounts: { C: 2, H: 4, O: 2 },
    geometry: 'complex',
    bondType: 'polar-covalent',
    polarity: 'polar',
    funFactEn: 'Gives vinegar its sour taste and pungent smell; forms glacial crystals at 16.6 °C.',
    funFactId: 'Memberikan rasa asam dan aroma tajam pada cuka; membeku membentuk kristal glasial pada 16,6 °C.',
    useEn: 'Food condiment and preservative, production of vinyl acetate monomer.',
    useId: 'Bumbu dan pengawet makanan, bahan baku vinil asetat.',
    atoms: [
      { symbol: 'C', x: -1.0, y: -0.2, z: 0 },
      { symbol: 'C', x: 0.4, y: 0.2, z: 0 },
      { symbol: 'O', x: 0.8, y: 1.35, z: 0 },
      { symbol: 'O', x: 1.25, y: -0.85, z: 0 },
      { symbol: 'H', x: 2.15, y: -0.6, z: 0 },
      { symbol: 'H', x: -1.15, y: -1.25, z: 0 },
      { symbol: 'H', x: -1.45, y: 0.25, z: 0.88 },
      { symbol: 'H', x: -1.45, y: 0.25, z: -0.88 },
    ],
    bonds: [[0, 1, 1], [1, 2, 2], [1, 3, 1], [3, 4, 1], [0, 5, 1], [0, 6, 1], [0, 7, 1]],
  },

  // 27. Formaldehyde
  {
    id: 'ch2o',
    formula: 'CH2O',
    nameEn: 'Formaldehyde (Methanal)',
    nameId: 'Formaldehida (Metanal)',
    commonNameEn: 'Formalin',
    commonNameId: 'Formalin',
    elementCounts: { C: 1, H: 2, O: 1 },
    geometry: 'trigonal-planar',
    bondType: 'polar-covalent',
    polarity: 'polar',
    funFactEn: 'The simplest aldehyde; an aqueous solution called formalin preserves biological specimens.',
    funFactId: 'Aldehida paling sederhana; larutan encernya disebut formalin untuk mengawetkan spesimen biologi.',
    useEn: 'Disinfectant, biological tissue fixative, resins and adhesives.',
    useId: 'Disinfektan, pengawet spesimen anatomi, lem dan resin kayu.',
    atoms: [
      { symbol: 'C', x: 0, y: -0.2, z: 0 },
      { symbol: 'O', x: 0, y: 1.0, z: 0 },
      { symbol: 'H', x: -0.94, y: -0.75, z: 0 },
      { symbol: 'H', x: 0.94, y: -0.75, z: 0 },
    ],
    bonds: [[0, 1, 2], [0, 2, 1], [0, 3, 1]],
  },

  // 28. Hydrogen Cyanide
  {
    id: 'hcn',
    formula: 'HCN',
    nameEn: 'Hydrogen Cyanide',
    nameId: 'Hidrogen Sianida',
    commonNameEn: 'Prussic Acid',
    commonNameId: 'Asam Prusiat',
    elementCounts: { H: 1, C: 1, N: 1 },
    geometry: 'linear',
    bondType: 'polar-covalent',
    polarity: 'polar',
    funFactEn: 'Smells of bitter almonds to some individuals, though the ability to smell it is genetically determined.',
    funFactId: 'Memiliki aroma khas kacang almond pahit bagi orang yang memiliki gen reseptor penciumannya.',
    useEn: 'Precursor to polymers (nylon), electroplating, and mining gold extraction.',
    useId: 'Bahan polimer nilon, penyepuhan logam (elektroplating), dan ekstraksi emas.',
    atoms: [
      { symbol: 'H', x: -1.6, y: 0, z: 0 },
      { symbol: 'C', x: -0.55, y: 0, z: 0 },
      { symbol: 'N', x: 0.6, y: 0, z: 0 },
    ],
    bonds: [[0, 1, 1], [1, 2, 3]],
  },

  // 29. Carbon Tetrachloride
  {
    id: 'ccl4',
    formula: 'CCl4',
    nameEn: 'Carbon Tetrachloride',
    nameId: 'Karbon Tetraklorida',
    commonNameEn: 'Carbon Tetrachloride',
    commonNameId: 'Karbon Tetraklorida',
    elementCounts: { C: 1, Cl: 4 },
    geometry: 'tetrahedral',
    bondType: 'polar-covalent',
    polarity: 'nonpolar',
    funFactEn: 'Though each C-Cl bond is polar, the symmetric tetrahedral geometry cancels dipole moments to 0.',
    funFactId: 'Meski setiap ikatan C-Cl polar, bentuk tetrahedral yang simetris membuat momen dipol totalnya 0 (nonpolar).',
    useEn: 'Historically used in fire extinguishers and dry cleaning solvent.',
    useId: 'Pernah digunakan sebagai cairan pemadam api dan pelarut dry cleaning.',
    atoms: [
      { symbol: 'C', x: 0, y: 0, z: 0 },
      { symbol: 'Cl', x: 1.02, y: 1.02, z: 1.02 },
      { symbol: 'Cl', x: -1.02, y: -1.02, z: 1.02 },
      { symbol: 'Cl', x: -1.02, y: 1.02, z: -1.02 },
      { symbol: 'Cl', x: 1.02, y: -1.02, z: -1.02 },
    ],
    bonds: [[0, 1, 1], [0, 2, 1], [0, 3, 1], [0, 4, 1]],
  },

  // 30. Hydrogen Sulfide
  {
    id: 'h2s',
    formula: 'H2S',
    nameEn: 'Hydrogen Sulfide',
    nameId: 'Hidrogen Sulfida',
    commonNameEn: 'Sewer Gas',
    commonNameId: 'Gas Rawa / Telur Busuk',
    elementCounts: { H: 2, S: 1 },
    geometry: 'bent',
    bondType: 'polar-covalent',
    polarity: 'polar',
    funFactEn: 'Infamous for its pungent smell of rotten eggs, emitted by volcanic vents and anaerobic bacteria.',
    funFactId: 'Terkenal dengan bau menyengat khas telur busuk, dikeluarkan oleh kawah vulkanik dan bakteri anaerob.',
    useEn: 'Precursor to elemental sulfur and sulfuric acid.',
    useId: 'Bahan baku produksi belerang elemental dan asam sulfat.',
    atoms: [
      { symbol: 'S', x: 0, y: 0.15, z: 0 },
      { symbol: 'H', x: -0.96, y: -0.6, z: 0 },
      { symbol: 'H', x: 0.96, y: -0.6, z: 0 },
    ],
    bonds: [[0, 1, 1], [0, 2, 1]],
  },

  // 31. Sulfur Dioxide
  {
    id: 'so2',
    formula: 'SO2',
    nameEn: 'Sulfur Dioxide',
    nameId: 'Belerang Dioksida',
    commonNameEn: 'Sulfur Dioxide',
    commonNameId: 'Belerang Dioksida',
    elementCounts: { S: 1, O: 2 },
    geometry: 'bent',
    bondType: 'polar-covalent',
    polarity: 'polar',
    funFactEn: 'Released in massive quantities by volcanic eruptions and coal combustion; causes acid rain.',
    funFactId: 'Dilepaskan dalam jumlah besar oleh letusan gunung berapi dan pembakaran batu bara; penyebab hujan asam.',
    useEn: 'Wine preservative (E220) and precursor to sulfuric acid.',
    useId: 'Pengawet anggur/minuman fermentasi dan bahan baku asam sulfat.',
    atoms: [
      { symbol: 'S', x: 0, y: 0.25, z: 0 },
      { symbol: 'O', x: -1.25, y: -0.5, z: 0 },
      { symbol: 'O', x: 1.25, y: -0.5, z: 0 },
    ],
    bonds: [[0, 1, 2], [0, 2, 2]],
  },

  // 32. Nitrous Oxide
  {
    id: 'n2o',
    formula: 'N2O',
    nameEn: 'Nitrous Oxide',
    nameId: 'Dinitrogen Monoksida',
    commonNameEn: 'Laughing Gas',
    commonNameId: 'Gas Gelak',
    elementCounts: { N: 2, O: 1 },
    geometry: 'linear',
    bondType: 'polar-covalent',
    polarity: 'polar',
    funFactEn: 'Produces mild euphoria and analgesia when inhaled; also used as an oxidizer in rocket engines.',
    funFactId: 'Menimbulkan euforia ringan dan efek mati rasa saat dihirup; juga digunakan sebagai oksidator roket.',
    useEn: 'Dental anesthesia, whipped cream aerosol propellant, motorsport NOS boost.',
    useId: 'Anestesi dokter gigi, propelan krim kocok kaleng, peningkat tenaga mesin balap.',
    atoms: [
      { symbol: 'N', x: -1.15, y: 0, z: 0 },
      { symbol: 'N', x: 0, y: 0, z: 0 },
      { symbol: 'O', x: 1.2, y: 0, z: 0 },
    ],
    bonds: [[0, 1, 2], [1, 2, 2]],
  },

  // 33. Nitrogen Dioxide
  {
    id: 'no2',
    formula: 'NO2',
    nameEn: 'Nitrogen Dioxide',
    nameId: 'Nitrogen Dioksida',
    commonNameEn: 'Nitrogen Dioxide',
    commonNameId: 'Nitrogen Dioksida',
    elementCounts: { N: 1, O: 2 },
    geometry: 'bent',
    bondType: 'polar-covalent',
    polarity: 'polar',
    funFactEn: 'A toxic reddish-brown gas with an unpaired odd electron (paramagnetic radical).',
    funFactId: 'Gas cokelat kemerahan beracun dengan elektron ganjil tak berpasangan (radikal paramagnetik).',
    useEn: 'Intermediate in nitric acid manufacture and rocket propellant oxidizer.',
    useId: 'Zat antara dalam produksi asam nitrat dan oksidator bahan bakar roket.',
    atoms: [
      { symbol: 'N', x: 0, y: 0.3, z: 0 },
      { symbol: 'O', x: -1.05, y: -0.4, z: 0 },
      { symbol: 'O', x: 1.05, y: -0.4, z: 0 },
    ],
    bonds: [[0, 1, 2], [0, 2, 1]],
  },

  // 34. Magnesium Oxide
  {
    id: 'mgo',
    formula: 'MgO',
    nameEn: 'Magnesium Oxide',
    nameId: 'Magnesium Oksida',
    commonNameEn: 'Magnesia',
    commonNameId: 'Magnesia',
    elementCounts: { Mg: 1, O: 1 },
    geometry: 'crystal-lattice',
    bondType: 'ionic',
    polarity: 'ionic',
    funFactEn: 'Has an extremely high melting point of 2,852 °C, making it premier refractory brick for blast furnaces.',
    funFactId: 'Memiliki titik leleh luar biasa tinggi pada 2.852 °C, menjadikannya bata tahan api untuk tungku baja.',
    useEn: 'Refractory furnace linings, antacid tablets, and gymnastics grip chalk.',
    useId: 'Pelapis tungku peleburan logam, obat maag antasida, dan kapur cengkeram senam.',
    atoms: [
      { symbol: 'Mg', x: -0.85, y: 0, z: 0 },
      { symbol: 'O', x: 0.85, y: 0, z: 0 },
    ],
    bonds: [[0, 1, 1]],
  },

  // 35. Calcium Oxide
  {
    id: 'cao',
    formula: 'CaO',
    nameEn: 'Calcium Oxide',
    nameId: 'Kalsium Oksida',
    commonNameEn: 'Quicklime',
    commonNameId: 'Kapur Tohor',
    elementCounts: { Ca: 1, O: 1 },
    geometry: 'crystal-lattice',
    bondType: 'ionic',
    polarity: 'ionic',
    funFactEn: 'Slakes vigorously with water in a violently exothermic reaction producing boiling steam and slaked lime.',
    funFactId: 'Bereaksi sangat eksotermik dengan air menghasilkan uap panas mendidih dan kapur padam.',
    useEn: 'Steelmaking flux, cement production, and soil acidity neutralization.',
    useId: 'Peleburan baja, pembuatan semen portland, dan menetralkan keasaman tanah pertanian.',
    atoms: [
      { symbol: 'Ca', x: -0.95, y: 0, z: 0 },
      { symbol: 'O', x: 0.95, y: 0, z: 0 },
    ],
    bonds: [[0, 1, 1]],
  },

  // 36. Sodium Bicarbonate
  {
    id: 'nahco3',
    formula: 'NaHCO3',
    nameEn: 'Sodium Bicarbonate',
    nameId: 'Natrium Bikarbonat',
    commonNameEn: 'Baking Soda',
    commonNameId: 'Soda Kue',
    elementCounts: { Na: 1, H: 1, C: 1, O: 3 },
    geometry: 'complex',
    bondType: 'ionic',
    polarity: 'ionic',
    funFactEn: 'Reacts with culinary acids to release bubbly CO2 gas, leavening cakes and bread.',
    funFactId: 'Bereaksi dengan asam menghasilkan gelembung gas CO2 yang mengembangkan adonan kue dan roti.',
    useEn: 'Baking leavening agent, antacid for heartburn, household deodorizer.',
    useId: 'Pengembang kue, obat pereda sakit maag, pembersih dan penetral bau kulkas.',
    atoms: [
      { symbol: 'Na', x: -2.0, y: 0, z: 0 },
      { symbol: 'C', x: 0.4, y: 0, z: 0 },
      { symbol: 'O', x: 0.4, y: 1.25, z: 0 },
      { symbol: 'O', x: -0.65, y: -0.65, z: 0 },
      { symbol: 'O', x: 1.55, y: -0.65, z: 0 },
      { symbol: 'H', x: 2.3, y: -0.1, z: 0 },
    ],
    bonds: [[1, 2, 2], [1, 3, 1], [1, 4, 1], [4, 5, 1]],
  },

  // 37. Boron Trifluoride
  {
    id: 'bf3',
    formula: 'BF3',
    nameEn: 'Boron Trifluoride',
    nameId: 'Boron Trifluorida',
    commonNameEn: 'Boron Trifluoride',
    commonNameId: 'Boron Trifluorida',
    elementCounts: { B: 1, F: 3 },
    geometry: 'trigonal-planar',
    bondType: 'polar-covalent',
    polarity: 'nonpolar',
    funFactEn: 'Classic textbook example of an electron-deficient Lewis acid with an empty 2p orbital.',
    funFactId: 'Contoh klasik asam Lewis dengan orbital 2p kosong yang sangat ingin menerima pasangan elektron.',
    useEn: 'Catalyst in organic synthesis for Friedel-Crafts and polymerization reactions.',
    useId: 'Katalis asam Lewis dalam sintesis organik dan polimerisasi industri.',
    atoms: [
      { symbol: 'B', x: 0, y: 0, z: 0 },
      { symbol: 'F', x: 0, y: 1.3, z: 0 },
      { symbol: 'F', x: 1.13, y: -0.65, z: 0 },
      { symbol: 'F', x: -1.13, y: -0.65, z: 0 },
    ],
    bonds: [[0, 1, 1], [0, 2, 1], [0, 3, 1]],
  },

  // 38. Phosphorus Trichloride
  {
    id: 'pcl3',
    formula: 'PCl3',
    nameEn: 'Phosphorus Trichloride',
    nameId: 'Fosfor Triklorida',
    commonNameEn: 'Phosphorus Trichloride',
    commonNameId: 'Fosfor Triklorida',
    elementCounts: { P: 1, Cl: 3 },
    geometry: 'trigonal-pyramidal',
    bondType: 'polar-covalent',
    polarity: 'polar',
    funFactEn: 'Has a lone pair of electrons on phosphorus that pushes the three P-Cl bonds into a pyramid.',
    funFactId: 'Memiliki pasangan elektron bebas pada atom fosfor yang mendorong ketiga ikatan P-Cl menjadi piramida.',
    useEn: 'Synthesis of organophosphates, pesticides, and plasticizers.',
    useId: 'Sintesis senyawa organofosfat, pestisida pertanian, dan aditif plastik.',
    atoms: [
      { symbol: 'P', x: 0, y: 0.45, z: 0 },
      { symbol: 'Cl', x: 0, y: -0.3, z: 1.7 },
      { symbol: 'Cl', x: 1.47, y: -0.3, z: -0.85 },
      { symbol: 'Cl', x: -1.47, y: -0.3, z: -0.85 },
    ],
    bonds: [[0, 1, 1], [0, 2, 1], [0, 3, 1]],
  },

  // 39. Copper(II) Sulfate
  {
    id: 'cuso4',
    formula: 'CuSO4',
    nameEn: 'Copper(II) Sulfate',
    nameId: 'Tembaga(II) Sulfat',
    commonNameEn: 'Blue Vitriol',
    commonNameId: 'Terusi / Vitriol Biru',
    elementCounts: { Cu: 1, S: 1, O: 4 },
    geometry: 'crystal-lattice',
    bondType: 'ionic',
    polarity: 'ionic',
    funFactEn: 'Forms brilliant azure blue pentahydrate crystals that turn chalky white when dehydrated by heat.',
    funFactId: 'Membentuk kristal pentahidrat biru cerah yang berubah menjadi bubuk putih saat dipanaskan.',
    useEn: 'Agricultural fungicide (Bordeaux mixture), pool algaecide, and electroplating.',
    useId: 'Fungisida pertanian (campuran Bordeaux), pembasmi lumut kolam, dan elektroplating.',
    atoms: [
      { symbol: 'Cu', x: -1.8, y: 0, z: 0 },
      { symbol: 'S', x: 0.8, y: 0, z: 0 },
      { symbol: 'O', x: 0.8, y: 1.45, z: 0 },
      { symbol: 'O', x: 0.8, y: -0.5, z: 1.35 },
      { symbol: 'O', x: 2.05, y: -0.4, z: -0.65 },
      { symbol: 'O', x: -0.45, y: -0.5, z: -0.7 },
    ],
    bonds: [[1, 2, 2], [1, 3, 2], [1, 4, 1], [1, 5, 1]],
  },

  // 40. Caffeine
  {
    id: 'c8h10n4o2',
    formula: 'C8H10N4O2',
    nameEn: 'Caffeine (1,3,7-Trimethylxanthine)',
    nameId: 'Kafein (1,3,7-Trimetilsantina)',
    commonNameEn: 'Caffeine',
    commonNameId: 'Kafein',
    elementCounts: { C: 8, H: 10, N: 4, O: 2 },
    geometry: 'complex',
    bondType: 'polar-covalent',
    polarity: 'polar',
    funFactEn: 'The world\'s most widely consumed psychoactive substance; acts by competitively blocking adenosine receptors.',
    funFactId: 'Zat psikoaktif paling banyak dikonsumsi di dunia; bekerja dengan memblokir reseptor adenosin di otak.',
    useEn: 'Central nervous system stimulant found in coffee, tea, and energy beverages.',
    useId: 'Stimulan sistem saraf pusat yang terkandung dalam kopi, teh, dan minuman energi.',
    atoms: [
      { symbol: 'C', x: -0.7, y: 0.8, z: 0 },
      { symbol: 'C', x: 0.7, y: 0.8, z: 0 },
      { symbol: 'C', x: 1.2, y: -0.4, z: 0 },
      { symbol: 'C', x: -1.2, y: -0.4, z: 0 },
      { symbol: 'C', x: 0, y: -1.2, z: 0 },
      { symbol: 'C', x: -2.5, y: 1.5, z: 0.3 },
      { symbol: 'C', x: 2.5, y: 1.5, z: -0.3 },
      { symbol: 'C', x: 0, y: -2.6, z: 0.2 },
      { symbol: 'N', x: -1.4, y: 1.8, z: 0 },
      { symbol: 'N', x: 1.4, y: 1.8, z: 0 },
      { symbol: 'N', x: 0, y: 2.3, z: 0 },
      { symbol: 'N', x: -0.6, y: -1.9, z: 0 },
      { symbol: 'O', x: -2.3, y: -0.8, z: 0 },
      { symbol: 'O', x: 2.3, y: -0.8, z: 0 },
      { symbol: 'H', x: -2.4, y: 2.4, z: 0.7 },
      { symbol: 'H', x: -3.2, y: 0.9, z: 0.8 },
      { symbol: 'H', x: -2.8, y: 1.6, z: -0.7 },
      { symbol: 'H', x: 2.4, y: 2.4, z: -0.7 },
      { symbol: 'H', x: 3.2, y: 0.9, z: -0.8 },
      { symbol: 'H', x: 2.8, y: 1.6, z: 0.7 },
      { symbol: 'H', x: -0.8, y: -3.0, z: 0.7 },
      { symbol: 'H', x: 0.8, y: -3.0, z: 0.7 },
      { symbol: 'H', x: 0, y: -2.8, z: -0.8 },
      { symbol: 'H', x: 1.9, y: -0.9, z: 0 },
    ],
    bonds: [
      [0, 1, 1], [1, 2, 2], [2, 4, 1], [4, 3, 2], [3, 0, 1],
      [0, 8, 1], [8, 10, 1], [10, 9, 1], [9, 1, 1],
      [8, 5, 1], [9, 6, 1], [4, 11, 1], [11, 7, 1],
      [3, 12, 2], [2, 13, 2],
      [5, 14, 1], [5, 15, 1], [5, 16, 1],
      [6, 17, 1], [6, 18, 1], [6, 19, 1],
      [7, 20, 1], [7, 21, 1], [7, 22, 1],
      [2, 23, 1],
    ],
  },

  // 41. Aspirin
  {
    id: 'c9h8o4',
    formula: 'C9H8O4',
    nameEn: 'Acetylsalicylic Acid',
    nameId: 'Asam Asetilsalisilat',
    commonNameEn: 'Aspirin',
    commonNameId: 'Aspirin',
    elementCounts: { C: 9, H: 8, O: 4 },
    geometry: 'complex',
    bondType: 'polar-covalent',
    polarity: 'polar',
    funFactEn: 'First synthesized in 1897 by Felix Hoffmann at Bayer; one of the most widely used analgesic drugs in history.',
    funFactId: 'Pertama kali disintesis tahun 1897 oleh Felix Hoffmann di Bayer; salah satu obat pereda nyeri tertua di dunia.',
    useEn: 'Analgesic painkiller, fever reducer, and antiplatelet cardioprotective medicine.',
    useId: 'Obat pereda nyeri dan demam, serta pencegah penggumpalan darah untuk serangan jantung.',
    atoms: [
      { symbol: 'C', x: -1.2, y: 0.7, z: 0 },
      { symbol: 'C', x: 0, y: 1.4, z: 0 },
      { symbol: 'C', x: 1.2, y: 0.7, z: 0 },
      { symbol: 'C', x: 1.2, y: -0.7, z: 0 },
      { symbol: 'C', x: 0, y: -1.4, z: 0 },
      { symbol: 'C', x: -1.2, y: -0.7, z: 0 },
      { symbol: 'C', x: -2.5, y: 1.5, z: 0 },
      { symbol: 'C', x: -0.5, y: -2.8, z: 0 },
      { symbol: 'C', x: -0.2, y: -4.2, z: 0 },
      { symbol: 'O', x: -2.7, y: 2.7, z: 0 },
      { symbol: 'O', x: -3.4, y: 0.6, z: 0 },
      { symbol: 'O', x: -1.7, y: -2.3, z: 0 },
      { symbol: 'O', x: 0.4, y: -2.2, z: 0 },
      { symbol: 'H', x: 0, y: 2.5, z: 0 },
      { symbol: 'H', x: 2.1, y: 1.2, z: 0 },
      { symbol: 'H', x: 2.1, y: -1.2, z: 0 },
      { symbol: 'H', x: -2.1, y: -1.2, z: 0 },
      { symbol: 'H', x: -4.2, y: 1.1, z: 0 },
      { symbol: 'H', x: 0.8, y: -4.4, z: 0.4 },
      { symbol: 'H', x: -0.8, y: -4.6, z: 0.8 },
      { symbol: 'H', x: -0.5, y: -4.6, z: -0.8 },
    ],
    bonds: [
      [0, 1, 2], [1, 2, 1], [2, 3, 2], [3, 4, 1], [4, 5, 2], [5, 0, 1],
      [0, 6, 1], [6, 9, 2], [6, 10, 1], [10, 17, 1],
      [4, 12, 1], [12, 7, 1], [7, 11, 2], [7, 8, 1],
      [1, 13, 1], [2, 14, 1], [3, 15, 1], [5, 16, 1],
      [8, 18, 1], [8, 19, 1], [8, 20, 1],
    ],
  },

  // 42. TNT
  {
    id: 'c7h5n3o6',
    formula: 'C7H5N3O6',
    nameEn: 'Trinitrotoluene (TNT)',
    nameId: 'Trinitrotoluena (TNT)',
    commonNameEn: 'TNT',
    commonNameId: 'TNT',
    elementCounts: { C: 7, H: 5, N: 3, O: 6 },
    geometry: 'complex',
    bondType: 'covalent',
    polarity: 'polar',
    funFactEn: 'Relatively insensitive to friction and shock; requires a blasting cap detonator to explode, making it safe to handle.',
    funFactId: 'Cukup stabil terhadap gesekan dan guncangan mekanis; memerlukan detonator khusus untuk meledakkannya.',
    useEn: 'Industrial demolition, military explosive munitions, and underwater blasting.',
    useId: 'Bahan peledak pembongkaran industri pertambangan dan amunisi militer.',
    atoms: [
      { symbol: 'C', x: 0, y: 1.4, z: 0 },
      { symbol: 'C', x: 1.2, y: 0.7, z: 0 },
      { symbol: 'C', x: 1.2, y: -0.7, z: 0 },
      { symbol: 'C', x: 0, y: -1.4, z: 0 },
      { symbol: 'C', x: -1.2, y: -0.7, z: 0 },
      { symbol: 'C', x: -1.2, y: 0.7, z: 0 },
      { symbol: 'C', x: 0, y: 2.9, z: 0 },
      { symbol: 'N', x: 2.4, y: 1.4, z: 0 },
      { symbol: 'N', x: 0, y: -2.8, z: 0 },
      { symbol: 'N', x: -2.4, y: 1.4, z: 0 },
      { symbol: 'O', x: 3.4, y: 0.8, z: 0.3 },
      { symbol: 'O', x: 2.4, y: 2.6, z: -0.3 },
      { symbol: 'O', x: 1.0, y: -3.5, z: 0.3 },
      { symbol: 'O', x: -1.0, y: -3.5, z: -0.3 },
      { symbol: 'O', x: -3.4, y: 0.8, z: -0.3 },
      { symbol: 'O', x: -2.4, y: 2.6, z: 0.3 },
      { symbol: 'H', x: 2.1, y: -1.2, z: 0 },
      { symbol: 'H', x: -2.1, y: -1.2, z: 0 },
      { symbol: 'H', x: 0, y: 3.3, z: 1.0 },
      { symbol: 'H', x: 0.9, y: 3.3, z: -0.5 },
      { symbol: 'H', x: -0.9, y: 3.3, z: -0.5 },
    ],
    bonds: [
      [0, 1, 2], [1, 2, 1], [2, 3, 2], [3, 4, 1], [4, 5, 2], [5, 0, 1],
      [0, 6, 1],
      [1, 7, 1], [7, 10, 2], [7, 11, 1],
      [3, 8, 1], [8, 12, 2], [8, 13, 1],
      [5, 9, 1], [9, 14, 2], [9, 15, 1],
      [2, 16, 1], [4, 17, 1],
      [6, 18, 1], [6, 19, 1], [6, 20, 1],
    ],
  },
];

/**
 * Checks if the current atom counts match a molecule exactly.
 */
export function matchMolecule(counts: Record<string, number>): Molecule | undefined {
  const cleanCounts: Record<string, number> = {};
  for (const [sym, count] of Object.entries(counts)) {
    if (count > 0) cleanCounts[sym] = count;
  }

  const cleanKeys = Object.keys(cleanCounts);
  if (cleanKeys.length === 0) return undefined;

  for (const mol of MOLECULES_DATABASE) {
    const molKeys = Object.keys(mol.elementCounts);
    if (molKeys.length !== cleanKeys.length) continue;
    let match = true;
    for (const k of molKeys) {
      if (mol.elementCounts[k] !== cleanCounts[k]) {
        match = false;
        break;
      }
    }
    if (match) return mol;
  }
  return undefined;
}

/**
 * Generates hints for molecules that could be synthesized by adding a small number of atoms.
 */
export function getSynthesisHints(
  currentCounts: Record<string, number>,
  maxMissing = 2
): Array<{ molecule: Molecule; needed: Record<string, number> }> {
  const hints: Array<{ molecule: Molecule; needed: Record<string, number> }> = [];

  for (const mol of MOLECULES_DATABASE) {
    let missingTotal = 0;
    const needed: Record<string, number> = {};
    let possible = true;

    // Check if any element in currentCounts exceeds what mol requires
    for (const [sym, currentVal] of Object.entries(currentCounts)) {
      if (currentVal <= 0) continue;
      const targetVal = mol.elementCounts[sym] || 0;
      if (currentVal > targetVal) {
        possible = false;
        break;
      }
    }
    if (!possible) continue;

    for (const [sym, targetVal] of Object.entries(mol.elementCounts)) {
      const currentVal = currentCounts[sym] || 0;
      if (targetVal > currentVal) {
        const diff = targetVal - currentVal;
        missingTotal += diff;
        needed[sym] = diff;
      }
    }

    if (missingTotal > 0 && missingTotal <= maxMissing) {
      hints.push({ molecule: mol, needed });
    }
  }

  return hints.slice(0, 4);
}

export interface ReactionComponent {
  formula: string;
  coefficient: number;
  nameEn: string;
  nameId: string;
  phase: 'g' | 'l' | 's' | 'aq';
}

export interface ChemicalReaction {
  id: string;
  nameEn: string;
  nameId: string;
  type: 'combustion' | 'synthesis' | 'decomposition' | 'neutralization' | 'precipitation' | 'biochemical';
  reactants: ReactionComponent[];
  products: ReactionComponent[];
  deltaHkJPerMol: number; // Enthalpy in kJ/mol (negative = exothermic, positive = endothermic)
  descriptionEn: string;
  descriptionId: string;
  realWorldApplicationEn: string;
  realWorldApplicationId: string;
}

export const REACTIONS_DATABASE: ChemicalReaction[] = [
  {
    id: 'synthesis-water',
    nameEn: 'Synthesis of Water',
    nameId: 'Sintesis Air',
    type: 'synthesis',
    reactants: [
      { formula: 'H2', coefficient: 2, nameEn: 'Hydrogen Gas', nameId: 'Gas Hidrogen', phase: 'g' },
      { formula: 'O2', coefficient: 1, nameEn: 'Oxygen Gas', nameId: 'Gas Oksigen', phase: 'g' },
    ],
    products: [
      { formula: 'H2O', coefficient: 2, nameEn: 'Water', nameId: 'Air', phase: 'l' },
    ],
    deltaHkJPerMol: -571.6,
    descriptionEn: 'Hydrogen and oxygen combine violently in a classic highly exothermic rocket fuel combustion.',
    descriptionId: 'Hidrogen dan oksigen bergabung secara dahsyat menghasilkan air dan energi eksotermik besar.',
    realWorldApplicationEn: 'Cryogenic rocket engines (Space Shuttle Main Engines, SLS, Saturn V upper stages) and fuel cells.',
    realWorldApplicationId: 'Mesin propulsi roket kriogenik dan sel bahan bakar hidrogen kendaraan nol emisi.',
  },
  {
    id: 'combustion-methane',
    nameEn: 'Complete Combustion of Methane',
    nameId: 'Pembakaran Sempurna Metana',
    type: 'combustion',
    reactants: [
      { formula: 'CH4', coefficient: 1, nameEn: 'Methane', nameId: 'Metana', phase: 'g' },
      { formula: 'O2', coefficient: 2, nameEn: 'Oxygen Gas', nameId: 'Gas Oksigen', phase: 'g' },
    ],
    products: [
      { formula: 'CO2', coefficient: 1, nameEn: 'Carbon Dioxide', nameId: 'Karbon Dioksida', phase: 'g' },
      { formula: 'H2O', coefficient: 2, nameEn: 'Water Vapor', nameId: 'Uap Air', phase: 'g' },
    ],
    deltaHkJPerMol: -890.7,
    descriptionEn: 'The primary energetic reaction fueling natural gas stoves, thermal power plants, and Bunsen burners.',
    descriptionId: 'Reaksi pembakaran utama pada kompor gas alam, pembangkit listrik termal, dan pembakar Bunsen.',
    realWorldApplicationEn: 'Clean domestic heating, gas turbine power stations, and industrial boilers.',
    realWorldApplicationId: 'Pemanas rumah tangga, turbin gas pembangkit listrik, dan boiler industri.',
  },
  {
    id: 'photosynthesis',
    nameEn: 'Oxygenic Photosynthesis',
    nameId: 'Fotosintesis Oksigenik',
    type: 'biochemical',
    reactants: [
      { formula: 'CO2', coefficient: 6, nameEn: 'Carbon Dioxide', nameId: 'Karbon Dioksida', phase: 'g' },
      { formula: 'H2O', coefficient: 6, nameEn: 'Water', nameId: 'Air', phase: 'l' },
    ],
    products: [
      { formula: 'C6H12O6', coefficient: 1, nameEn: 'Glucose', nameId: 'Glukosa', phase: 's' },
      { formula: 'O2', coefficient: 6, nameEn: 'Oxygen Gas', nameId: 'Gas Oksigen', phase: 'g' },
    ],
    deltaHkJPerMol: 2803.0,
    descriptionEn: 'Plants harness photons of sunlight to fix atmospheric carbon dioxide into high-energy organic glucose.',
    descriptionId: 'Tumbuhan menyerap foton cahaya matahari untuk mengubah CO2 atmosfer menjadi glukosa berenergi tinggi.',
    realWorldApplicationEn: 'The fundamental biological engine providing oxygen and chemical energy for the entire biosphere.',
    realWorldApplicationId: 'Mesin biologis utama penyedia oksigen dan makanan bagi seluruh rantai kehidupan di Bumi.',
  },
  {
    id: 'cellular-respiration',
    nameEn: 'Aerobic Cellular Respiration',
    nameId: 'Respirasi Seluler Aerobik',
    type: 'biochemical',
    reactants: [
      { formula: 'C6H12O6', coefficient: 1, nameEn: 'Glucose', nameId: 'Glukosa', phase: 's' },
      { formula: 'O2', coefficient: 6, nameEn: 'Oxygen Gas', nameId: 'Gas Oksigen', phase: 'g' },
    ],
    products: [
      { formula: 'CO2', coefficient: 6, nameEn: 'Carbon Dioxide', nameId: 'Karbon Dioksida', phase: 'g' },
      { formula: 'H2O', coefficient: 6, nameEn: 'Water', nameId: 'Air', phase: 'l' },
    ],
    deltaHkJPerMol: -2803.0,
    descriptionEn: 'Mitochondria oxidize dietary carbohydrates to generate 30-32 ATP molecules per glucose molecule.',
    descriptionId: 'Mitokondria mengoksidasi karbohidrat untuk menghasilkan energi ATP bagi metabolisme tubuh.',
    realWorldApplicationEn: 'Cellular metabolism and biological mechanical work in all eukaryotic organisms.',
    realWorldApplicationId: 'Metabolisme seluler dan kerja otot mekanis pada seluruh makhluk hidup eukariotik.',
  },
  {
    id: 'haber-bosch',
    nameEn: 'Haber-Bosch Ammonia Synthesis',
    nameId: 'Sintesis Amonia Haber-Bosch',
    type: 'synthesis',
    reactants: [
      { formula: 'N2', coefficient: 1, nameEn: 'Nitrogen Gas', nameId: 'Gas Nitrogen', phase: 'g' },
      { formula: 'H2', coefficient: 3, nameEn: 'Hydrogen Gas', nameId: 'Gas Hidrogen', phase: 'g' },
    ],
    products: [
      { formula: 'NH3', coefficient: 2, nameEn: 'Ammonia', nameId: 'Amonia', phase: 'g' },
    ],
    deltaHkJPerMol: -92.4,
    descriptionEn: 'Fixes inert atmospheric N2 gas over an iron catalyst at 450 °C and 200 atm into bioavailable ammonia.',
    descriptionId: 'Mengikat gas N2 atmosfer yang stabil dengan katalis besi pada suhu 450 °C dan 200 atm menjadi amonia.',
    realWorldApplicationEn: 'Sustains global agricultural fertilizer production feeding over 4 billion people.',
    realWorldApplicationId: 'Menghasilkan pupuk nitrogen sintetis yang menopang ketahanan pangan separuh populasi bumi.',
  },
  {
    id: 'neutralization',
    nameEn: 'Hydrochloric Acid & Sodium Hydroxide',
    nameId: 'Netralisasi Asam Klorida & Natrium Hidroksida',
    type: 'neutralization',
    reactants: [
      { formula: 'HCl', coefficient: 1, nameEn: 'Hydrochloric Acid', nameId: 'Asam Klorida', phase: 'aq' },
      { formula: 'NaOH', coefficient: 1, nameEn: 'Sodium Hydroxide', nameId: 'Natrium Hidroksida', phase: 'aq' },
    ],
    products: [
      { formula: 'NaCl', coefficient: 1, nameEn: 'Sodium Chloride (Table Salt)', nameId: 'Natrium Klorida (Garam)', phase: 'aq' },
      { formula: 'H2O', coefficient: 1, nameEn: 'Water', nameId: 'Air', phase: 'l' },
    ],
    deltaHkJPerMol: -57.3,
    descriptionEn: 'The quintessential Arrhenius strong acid-strong base neutralization yielding benign salt water.',
    descriptionId: 'Contoh klasik netralisasi asam kuat dan basa kuat menghasilkan larutan garam netral.',
    realWorldApplicationEn: 'Industrial wastewater treatment, acid spill remediation, and chemical titrations.',
    realWorldApplicationId: 'Pengolahan air limbah industri, remediasi tumpahan asam, dan titrasi laboratorium.',
  },
  {
    id: 'limestone-calcination',
    nameEn: 'Thermal Calcination of Limestone',
    nameId: 'Kalsinasi Termal Batu Kapur',
    type: 'decomposition',
    reactants: [
      { formula: 'CaCO3', coefficient: 1, nameEn: 'Calcium Carbonate', nameId: 'Kalsium Karbonat', phase: 's' },
    ],
    products: [
      { formula: 'CaO', coefficient: 1, nameEn: 'Calcium Oxide (Quicklime)', nameId: 'Kalsium Oksida (Kapur Tohor)', phase: 's' },
      { formula: 'CO2', coefficient: 1, nameEn: 'Carbon Dioxide', nameId: 'Karbon Dioksida', phase: 'g' },
    ],
    deltaHkJPerMol: 178.3,
    descriptionEn: 'Heating limestone to ~900 °C in kilns drives off CO2 gas to yield quicklime for cement manufacturing.',
    descriptionId: 'Memanaskan batu kapur hingga ~900 °C melepaskan gas CO2 menghasilkan kapur tohor untuk semen.',
    realWorldApplicationEn: 'Manufacture of Portland cement and concrete foundations across the construction industry.',
    realWorldApplicationId: 'Bahan baku vital pembuatan semen Portland dan beton infrastruktur dunia.',
  },
  {
    id: 'peroxide-decomposition',
    nameEn: 'Hydrogen Peroxide Catalytic Decomposition',
    nameId: 'Dekomposisi Katalitik Hidrogen Peroksida',
    type: 'decomposition',
    reactants: [
      { formula: 'H2O2', coefficient: 2, nameEn: 'Hydrogen Peroxide', nameId: 'Hidrogen Peroksida', phase: 'aq' },
    ],
    products: [
      { formula: 'H2O', coefficient: 2, nameEn: 'Water', nameId: 'Air', phase: 'l' },
      { formula: 'O2', coefficient: 1, nameEn: 'Oxygen Gas', nameId: 'Gas Oksigen', phase: 'g' },
    ],
    deltaHkJPerMol: -196.1,
    descriptionEn: 'Catalyzed rapidly by potassium iodide (the famous "Elephant\'s Toothpaste" demo) or biological catalase.',
    descriptionId: 'Didekomposisi secara cepat oleh katalis kalium iodida ("Pasta Gigi Gajah") atau enzim katalase sel.',
    realWorldApplicationEn: 'Chemical oxygen generators in submarines, rocket monopropellant thrusters, and wound disinfection.',
    realWorldApplicationId: 'Generator oksigen kapal selam, pendorong monopropelan roket, dan disinfektan medis.',
  },
  {
    id: 'ozone-destruction',
    nameEn: 'Ozone Dissociation / Chapman Cycle',
    nameId: 'Disosiasi Ozon / Siklus Chapman',
    type: 'decomposition',
    reactants: [
      { formula: 'O3', coefficient: 2, nameEn: 'Ozone', nameId: 'Ozon', phase: 'g' },
    ],
    products: [
      { formula: 'O2', coefficient: 3, nameEn: 'Dioxygen Gas', nameId: 'Gas Oksigen', phase: 'g' },
    ],
    deltaHkJPerMol: -285.4,
    descriptionEn: 'High-energy stratospheric ultraviolet radiation (UV-C) is absorbed by ozone, converting it to diatomic oxygen.',
    descriptionId: 'Radiasi sinar ultraviolet (UV-C) diserap oleh lapisan ozon stratosfer, melindunginya dari permukaan bumi.',
    realWorldApplicationEn: 'The natural planetary shield shielding terrestrial organisms from carcinogenic solar ultraviolet flux.',
    realWorldApplicationId: 'Perisai pelindung biologis alami bumi dari radiasi radiasi ultraviolet karsinogenik.',
  },
  {
    id: 'baking-soda-vinegar',
    nameEn: 'Baking Soda & Vinegar Volcano Reaction',
    nameId: 'Reaksi Gunung Berapi Soda Kue & Cuka',
    type: 'neutralization',
    reactants: [
      { formula: 'NaHCO3', coefficient: 1, nameEn: 'Sodium Bicarbonate', nameId: 'Natrium Bikarbonat', phase: 's' },
      { formula: 'C2H4O2', coefficient: 1, nameEn: 'Acetic Acid', nameId: 'Asam Asetat', phase: 'aq' },
    ],
    products: [
      { formula: 'CO2', coefficient: 1, nameEn: 'Carbon Dioxide Gas', nameId: 'Gas Karbon Dioksida', phase: 'g' },
      { formula: 'H2O', coefficient: 1, nameEn: 'Water', nameId: 'Air', phase: 'l' },
    ],
    deltaHkJPerMol: 28.0,
    descriptionEn: 'The famous fizzing science fair volcano: acid proton transfer forms unstable carbonic acid, rapidly degassing CO2.',
    descriptionId: 'Reaksi gunung berapi sains populer: pembentukan asam karbonat yang segera terurai menjadi buih gas CO2.',
    realWorldApplicationEn: 'Baking culinary chemistry, foam fire extinguishers, and interactive chemistry education.',
    realWorldApplicationId: 'Pengembang kue kuliner, busa pemadam kebakaran, dan demonstrasi kimia edukatif.',
  },
];

export interface StoichiometryResult {
  limitingReactantIndex: number;
  extentMoles: number;
  reactants: Array<{
    formula: string;
    initialMoles: number;
    initialGrams: number;
    molesUsed: number;
    molesRemaining: number;
    gramsRemaining: number;
  }>;
  products: Array<{
    formula: string;
    molesProduced: number;
    gramsProduced: number;
  }>;
  netEnergyKJ: number;
}

export function calculateReactionStoichiometry(
  reaction: ChemicalReaction,
  reactantMoles: number[]
): StoichiometryResult {
  let minRatio = Infinity;
  let limitingIndex = 0;

  reaction.reactants.forEach((r, idx) => {
    const moles = Math.max(0, reactantMoles[idx] ?? 0);
    const ratio = moles / r.coefficient;
    if (ratio < minRatio) {
      minRatio = ratio;
      limitingIndex = idx;
    }
  });

  const extent = Number.isFinite(minRatio) ? minRatio : 0;

  const reactants = reaction.reactants.map((r, idx) => {
    const initial = Math.max(0, reactantMoles[idx] ?? 0);
    const used = extent * r.coefficient;
    const remaining = Math.max(0, initial - used);
    const mol = MOLECULES_DATABASE.find((m) => m.formula === r.formula);
    const mm = mol ? computeMolarMass(mol.elementCounts) : 18.0;
    return {
      formula: r.formula,
      initialMoles: initial,
      initialGrams: initial * mm,
      molesUsed: used,
      molesRemaining: remaining,
      gramsRemaining: remaining * mm,
    };
  });

  const products = reaction.products.map((p) => {
    const produced = extent * p.coefficient;
    const mol = MOLECULES_DATABASE.find((m) => m.formula === p.formula);
    const mm = mol ? computeMolarMass(mol.elementCounts) : 18.0;
    return {
      formula: p.formula,
      molesProduced: produced,
      gramsProduced: produced * mm,
    };
  });

  const netEnergyKJ = -reaction.deltaHkJPerMol * extent;

  return {
    limitingReactantIndex: limitingIndex,
    extentMoles: extent,
    reactants,
    products,
    netEnergyKJ,
  };
}
