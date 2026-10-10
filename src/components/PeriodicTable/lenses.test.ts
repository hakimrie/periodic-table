import { describe, it, expect } from 'vitest';
import {
  parseDiscoveryYear,
  getEraForYear,
  getPhaseAtTemperature,
  DISCOVERY_ERAS,
} from './lenses';
import { getElementById } from '../../data/elements';

describe('Table Lenses - logic & physics', () => {
  it('parses discovery years correctly', () => {
    expect(parseDiscoveryYear('Ancient')).toBe(0);
    expect(parseDiscoveryYear(1869)).toBe(1869);
    expect(parseDiscoveryYear('1774')).toBe(1774);
    expect(parseDiscoveryYear('c. 1250')).toBe(1250);
  });

  it('maps years to historical eras', () => {
    expect(getEraForYear(0).id).toBe('antiquity');
    expect(getEraForYear(1700).id).toBe('alchemy');
    expect(getEraForYear(1780).id).toBe('pneumatic');
    expect(getEraForYear(1810).id).toBe('electrochemistry');
    expect(getEraForYear(1869).id).toBe('spectroscopy');
    expect(getEraForYear(1945).id).toBe('nuclear');
    expect(getEraForYear(2010).id).toBe('superheavy');
  });

  it('calculates water-like state transitions for Gallium (mp ~302.9 K)', () => {
    const ga = getElementById(31)!;
    expect(getPhaseAtTemperature(ga, 273)).toBe('solid'); // 0°C -> solid
    expect(getPhaseAtTemperature(ga, 310)).toBe('liquid'); // Hand temperature -> melts!
    expect(getPhaseAtTemperature(ga, 3000)).toBe('gas'); // Above boiling
  });

  it('handles Helium at cryo temperatures', () => {
    const he = getElementById(2)!;
    expect(getPhaseAtTemperature(he, 2)).toBe('liquid');
    expect(getPhaseAtTemperature(he, 300)).toBe('gas');
  });

  it('validates that all discovery eras have end years in ascending order', () => {
    for (let i = 1; i < DISCOVERY_ERAS.length; i++) {
      expect(DISCOVERY_ERAS[i].endYear).toBeGreaterThan(DISCOVERY_ERAS[i - 1].endYear);
    }
  });
});
