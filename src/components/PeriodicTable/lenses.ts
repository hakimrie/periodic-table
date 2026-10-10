import type { ChemicalElement, ElementPhase } from '../../types/element';

export type TableLensKey =
  | 'category'
  | 'temperature'
  | 'discovery'
  | 'block'
  | 'origin'
  | 'trend';

export interface DiscoveryEra {
  id: string;
  nameEn: string;
  nameId: string;
  endYear: number;
  descriptionEn: string;
  descriptionId: string;
}

export const DISCOVERY_ERAS: DiscoveryEra[] = [
  {
    id: 'antiquity',
    nameEn: 'Antiquity',
    nameId: 'Zaman Kuno',
    endYear: 1200,
    descriptionEn: 'Metals known to ancient civilizations (Gold, Copper, Silver, Lead, Tin, Iron, Mercury, Carbon, Sulfur).',
    descriptionId: 'Logam yang dikenal peradaban kuno (Emas, Tembaga, Perak, Timbal, Timah, Besi, Merkuri, Karbon, Belerang).',
  },
  {
    id: 'alchemy',
    nameEn: 'Age of Alchemy',
    nameId: 'Era Alkimia',
    endYear: 1750,
    descriptionEn: 'Early alchemical isolation of metalloids (Arsenic, Antimony, Bismuth, Phosphorus, Zinc).',
    descriptionId: 'Isolasi alkimia awal metalloid (Arsen, Antimon, Bismut, Fosfor, Seng).',
  },
  {
    id: 'pneumatic',
    nameEn: 'Pneumatic Chemistry & Lavoisier',
    nameId: 'Kimia Gas & Lavoisier',
    endYear: 1800,
    descriptionEn: 'Discovery of atmospheric gases (Hydrogen, Oxygen, Nitrogen) and quantitative chemistry.',
    descriptionId: 'Penemuan gas atmosfer (Hidrogen, Oksigen, Nitrogen) dan kimia kuantitatif modern.',
  },
  {
    id: 'electrochemistry',
    nameEn: 'Electrochemistry (Davy)',
    nameId: 'Elektrokimia (Davy)',
    endYear: 1850,
    descriptionEn: 'Humphry Davy uses electrolysis to isolate alkali and alkaline earth metals (Na, K, Ca, Mg).',
    descriptionId: 'Humphry Davy memanfaatkan elektrolisis untuk mengisolasi logam alkali & alkali tanah.',
  },
  {
    id: 'spectroscopy',
    nameEn: 'Spectroscopy & Mendeleev',
    nameId: 'Spektroskopi & Mendeleev',
    endYear: 1900,
    descriptionEn: 'Bunsen & Kirchhoff spectral lines; Mendeleev formulates the Periodic Law (1869); Noble gases discovered.',
    descriptionId: 'Garis spektrum Bunsen & Kirchhoff; Mendeleev menyusun Tabel Periodik (1869); Penemuan gas mulia.',
  },
  {
    id: 'nuclear',
    nameEn: 'Radioactivity & Manhattan Project',
    nameId: 'Radioaktivitas & Proyek Manhattan',
    endYear: 1960,
    descriptionEn: 'Discovery of polonium/radium (Curies); particle colliders create first synthetic actinides (Seaborg).',
    descriptionId: 'Penemuan polonium/radium (Curie); siklotron melahirkan aktinida sintetis pertama (Seaborg).',
  },
  {
    id: 'superheavy',
    nameEn: 'Superheavy Particle Accelerator Era',
    nameId: 'Era Penumbuk Partikel Superberat',
    endYear: 2030,
    descriptionEn: 'Cold/hot fusion syntheses complete Period 7 up to Oganesson (Z=118) in Dubna, Darmstadt, and RIKEN.',
    descriptionId: 'Sintesis fusi dingin/panas melengkapi Periode 7 hingga Oganesson (Z=118) di Dubna, Darmstadt, & RIKEN.',
  },
];

/** Parse an element's discovery year into a numeric year (or 0 for Ancient). */
export function parseDiscoveryYear(raw: number | 'Ancient' | string | undefined): number {
  if (raw === undefined || raw === null) return 2000;
  if (raw === 'Ancient') return 0;
  if (typeof raw === 'number') return raw;
  const str = String(raw).trim();
  if (str.toLowerCase().includes('ancient')) return 0;
  const m = str.match(/\d{3,4}/);
  return m ? parseInt(m[0], 10) : 2000;
}

export function getEraForYear(year: number): DiscoveryEra {
  for (const era of DISCOVERY_ERAS) {
    if (year <= era.endYear) return era;
  }
  return DISCOVERY_ERAS[DISCOVERY_ERAS.length - 1];
}

/** Determine the phase of an element at a specified temperature (Kelvin). */
export function getPhaseAtTemperature(
  el: ChemicalElement,
  temperatureKelvin: number
): ElementPhase | 'unknown' {
  const mp = el.physicalProperties.meltingPointKelvin;
  const bp = el.physicalProperties.boilingPointKelvin;

  // If we have both MP and BP
  if (mp !== undefined && bp !== undefined) {
    if (temperatureKelvin < mp) return 'solid';
    if (temperatureKelvin < bp) return 'liquid';
    return 'gas';
  }

  // Helium special case (does not freeze at 1 atm without pressure)
  if (el.atomicNumber === 2) {
    return temperatureKelvin < 4.22 ? 'liquid' : 'gas';
  }

  // Only MP known
  if (mp !== undefined && bp === undefined) {
    return temperatureKelvin < mp ? 'solid' : 'liquid';
  }

  // Only BP known
  if (mp === undefined && bp !== undefined) {
    return temperatureKelvin >= bp ? 'gas' : 'liquid';
  }

  // Synthetics / superheavies without experimental data: fall back to STP prediction
  if (el.phaseAtSTP && temperatureKelvin >= 250 && temperatureKelvin <= 350) {
    return el.phaseAtSTP;
  }

  return 'unknown';
}

export interface TemperaturePreset {
  id: string;
  kelvin: number;
  labelEn: string;
  labelId: string;
  descriptionEn: string;
  descriptionId: string;
}

export const TEMPERATURE_PRESETS: TemperaturePreset[] = [
  {
    id: 'abs-zero',
    kelvin: 0,
    labelEn: 'Absolute Zero (0 K)',
    labelId: 'Nol Mutlak (0 K)',
    descriptionEn: 'All thermal motion stops. Every element except liquid helium solidifies.',
    descriptionId: 'Semua gerak termal berhenti. Semua unsur memadat kecuali helium.',
  },
  {
    id: 'liquid-n2',
    kelvin: 77,
    labelEn: 'Liquid Nitrogen (77 K)',
    labelId: 'Nitrogen Cair (77 K)',
    descriptionEn: 'Cryogenic cooling. Most gases except H₂, He, and Ne are frozen solid.',
    descriptionId: 'Pendinginan kriogenik. Sebagian besar gas membeku padat.',
  },
  {
    id: 'room-temp',
    kelvin: 298,
    labelEn: 'Standard Room Temp (298 K / 25°C)',
    labelId: 'Suhu Kamar Standar (298 K / 25°C)',
    descriptionEn: 'Standard state: 2 liquids (Hg, Br), 11 gases, 105 solids.',
    descriptionId: 'Kondisi standar: 2 cairan (Hg, Br), 11 gas, 105 padatan.',
  },
  {
    id: 'water-boils',
    kelvin: 373,
    labelEn: 'Water Boils (373 K / 100°C)',
    labelId: 'Air Mendidih (373 K / 100°C)',
    descriptionEn: 'Gallium and Cesium have melted into liquids; Francium would too.',
    descriptionId: 'Galium dan Sesium telah meleleh menjadi cair.',
  },
  {
    id: 'lava',
    kelvin: 1473,
    labelEn: 'Basaltic Lava (~1473 K / 1200°C)',
    labelId: 'Lava Basal (~1473 K / 1200°C)',
    descriptionEn: 'Over 30 elements are liquid or boiling into vapor.',
    descriptionId: 'Lebih dari 30 unsur berbentuk cair atau mendidih.',
  },
  {
    id: 'iron-melts',
    kelvin: 1811,
    labelEn: 'Iron Melts (1811 K / 1538°C)',
    labelId: 'Besi Meleleh (1811 K / 1538°C)',
    descriptionEn: 'Blast furnace metallurgy: iron liquefies.',
    descriptionId: 'Metalurgi tanur tiup: besi mencair.',
  },
  {
    id: 'sun-surface',
    kelvin: 5778,
    labelEn: "Sun's Photosphere (5778 K)",
    labelId: 'Fotosfer Matahari (5778 K)',
    descriptionEn: 'Surface of the Sun. Almost every element is vaporized; only Carbon and Tungsten remain solid/liquid.',
    descriptionId: 'Permukaan Matahari. Hampir seluruh unsur telah menguap menjadi gas.',
  },
];
