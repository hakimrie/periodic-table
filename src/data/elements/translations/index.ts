import { indonesianElementNames } from './elementNamesId';
import { period1TranslationsId } from './period1Id';
import { period2TranslationsId } from './period2Id';
import { period3TranslationsId } from './period3Id';
import { period4TranslationsId } from './period4Id';
import { period5TranslationsId } from './period5Id';
import { period6TranslationsId } from './period6Id';
import { period7TranslationsId } from './period7Id';
import type { ElementTranslationId } from './types';
import type { ChemicalElement } from '../../../types/element';
import { getElementById } from '../index';

export { indonesianElementNames };
export type { ElementTranslationId };

export const elementTranslationsId: Record<number, ElementTranslationId> = {
  ...period1TranslationsId,
  ...period2TranslationsId,
  ...period3TranslationsId,
  ...period4TranslationsId,
  ...period5TranslationsId,
  ...period6TranslationsId,
  ...period7TranslationsId,
};

/**
 * Returns the localized element name.
 */
export function getLocalizedElementName(atomicNumber: number, lang: 'en' | 'id'): string {
  if (lang === 'id') {
    return indonesianElementNames[atomicNumber] || '';
  }
  const el = getElementById(atomicNumber);
  return el ? el.name : '';
}

/**
 * Returns a localized ChemicalElement object with accurate translations
 * for understanding, appearance, applications, biologicalRole, safety, discovery,
 * commonIons, and compounds when lang === 'id'.
 */
export function getLocalizedElement(element: ChemicalElement, lang: 'en' | 'id'): ChemicalElement {
  if (lang !== 'id') {
    return element;
  }

  const idData = elementTranslationsId[element.atomicNumber];
  const indonesianName = indonesianElementNames[element.atomicNumber] || element.name;

  // Localize common ions
  const localizedIons = element.commonIons.map((ion) => {
    const idExplanation = idData?.commonIons?.[ion.formula];
    return {
      ...ion,
      explanation: idExplanation || ion.explanation,
    };
  });

  // Localize compounds
  const localizedCompounds = element.compounds.map((comp) => {
    const idComp = idData?.compounds?.[comp.formula];
    return {
      ...comp,
      name: idComp?.name || comp.name,
      description: idComp?.description || comp.description,
    };
  });

  // Fallback understanding if not explicitly specified
  const simpleTerms =
    idData?.understanding?.simpleTerms ||
    `Unsur ${indonesianName} (simbol ${element.symbol}, nomor atom ${element.atomicNumber}) adalah unsur ${
      element.isMetal ? 'logam' : element.isMetalloid ? 'metaloid' : 'nonlogam'
    } pada Periode ${element.period} ${element.group !== null ? `Golongan ${element.group}` : 'blok-f'}.`;

  const whyItBehavesThisWay =
    idData?.understanding?.whyItBehavesThisWay ||
    `Memiliki ${element.electronConfiguration.valenceElectrons} elektron valensi pada kulit ${element.electronConfiguration.valenceShellNumber} dengan konfigurasi elektron ${element.electronConfiguration.shorthand}.`;

  const keyTakeaways = idData?.understanding?.keyTakeaways || [
    `Nomor atom ${element.atomicNumber} dengan massa atom standar ${element.atomicMassString} u.`,
    `Terletak pada blok-${element.block} tabel periodik dengan fase ${element.phaseAtSTP === 'solid' ? 'padat' : element.phaseAtSTP === 'liquid' ? 'cair' : 'gas'}.`,
    element.isRadioactive
      ? 'Merupakan unsur radioaktif yang meluruh secara spontan memancarkan radiasi inti.'
      : 'Memiliki konfigurasi elektron stabil pada kondisi standar.',
  ];

  return {
    ...element,
    name: indonesianName,
    appearance: idData?.appearance || element.appearance,
    understanding: {
      simpleTerms,
      whyItBehavesThisWay,
      keyTakeaways,
    },
    applications: idData?.applications && idData.applications.length > 0 ? idData.applications : element.applications,
    biologicalRole: {
      ...element.biologicalRole,
      humanImportance: idData?.biologicalRole?.humanImportance || (element.biologicalRole.isEssential ? 'Nutrisi mikro esensial yang diperlukan dalam metabolisme fisiologis tubuh manusia.' : 'Bukan unsur esensial yang memiliki fungsi metabolik pada tubuh manusia.'),
      dietarySources: idData?.biologicalRole?.dietarySources || element.biologicalRole.dietarySources,
    },
    safety: {
      ...element.safety,
      handlingConcerns: idData?.safety?.handlingConcerns || (element.isRadioactive ? 'Unsur radioaktif: patuhi protokol keselamatan proteksi radiasi pengion.' : 'Ikuti prosedur standar keselamatan kerja laboratorium kimia.'),
    },
    discovery: {
      ...element.discovery,
      year: idData?.discovery?.year ?? (element.discovery.year === 'Ancient' ? 'Zaman Kuno' : element.discovery.year),
      discoverer: idData?.discovery?.discoverer || element.discovery.discoverer,
      etymology: idData?.discovery?.etymology || element.discovery.etymology,
    },
    commonIons: localizedIons,
    compounds: localizedCompounds,
  };
}
