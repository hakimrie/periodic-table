import { describe, it, expect } from 'vitest';
import { allElements, getElementById } from '../index';
import { indonesianElementNames } from './elementNamesId';
import { getLocalizedElement, getLocalizedElementName } from './index';

describe('Indonesian Chemical Elements Localization', () => {
  it('contains IUPAC Indonesian names for all 118 chemical elements', () => {
    expect(Object.keys(indonesianElementNames).length).toBe(118);
    for (let z = 1; z <= 118; z++) {
      const nameId = indonesianElementNames[z];
      expect(nameId, `Missing Indonesian name for element Z=${z}`).toBeTruthy();
      expect(typeof nameId).toBe('string');
    }
  });

  it('correctly maps prominent traditional and IUPAC names', () => {
    expect(indonesianElementNames[1]).toBe('Hidrogen');
    expect(indonesianElementNames[6]).toBe('Karbon');
    expect(indonesianElementNames[7]).toBe('Nitrogen');
    expect(indonesianElementNames[8]).toBe('Oksigen');
    expect(indonesianElementNames[11]).toBe('Natrium');
    expect(indonesianElementNames[19]).toBe('Kalium');
    expect(indonesianElementNames[26]).toBe('Besi');
    expect(indonesianElementNames[29]).toBe('Tembaga');
    expect(indonesianElementNames[47]).toBe('Perak');
    expect(indonesianElementNames[50]).toBe('Timah');
    expect(indonesianElementNames[74]).toBe('Wolfram');
    expect(indonesianElementNames[79]).toBe('Emas');
    expect(indonesianElementNames[80]).toBe('Raksa');
    expect(indonesianElementNames[82]).toBe('Timbal');
    expect(indonesianElementNames[92]).toBe('Uranium');
    expect(indonesianElementNames[118]).toBe('Oganeson');
  });

  it('localizes Iron (Besi, Z=26) educational descriptions accurately in Indonesian', () => {
    const fe = getElementById(26)!;
    expect(fe).toBeDefined();

    const feId = getLocalizedElement(fe, 'id');
    expect(feId.name).toBe('Besi');

    // Understanding section (reported in user issue)
    expect(feId.understanding.simpleTerms).toContain('Raja dari segala logam');
    expect(feId.understanding.whyItBehavesThisWay).toContain('elektron valensi');
    expect(feId.understanding.keyTakeaways.length).toBeGreaterThan(0);
    expect(feId.understanding.keyTakeaways.some((k) => k.toLowerCase().includes('feromagnetik'))).toBe(true);

    // Compounds, Applications, Safety, Biological
    expect(feId.compounds.length).toBeGreaterThan(0);
    expect(feId.compounds[0].description).toBeTruthy();
    expect(feId.applications.length).toBeGreaterThan(0);
    expect(feId.applications[0]).toContain('baja');
    expect(feId.biologicalRole.humanImportance).toContain('hemoglobin');
    expect(feId.safety.handlingConcerns).toContain('Serbuk besi');
  });

  it('preserves 100% original English data when lang is en', () => {
    const fe = getElementById(26)!;
    const feEn = getLocalizedElement(fe, 'en');
    expect(feEn.name).toBe('Iron');
    expect(feEn.understanding.simpleTerms).toContain('The king of metals');
    expect(getLocalizedElementName(26, 'en')).toBe('Iron');
  });

  it('ensures getLocalizedElementName returns the correct name for any element', () => {
    allElements.forEach((el) => {
      const idName = getLocalizedElementName(el.atomicNumber, 'id');
      const enName = getLocalizedElementName(el.atomicNumber, 'en');

      expect(idName).toBeTruthy();
      expect(enName).toBe(el.name);
    });
  });
});
