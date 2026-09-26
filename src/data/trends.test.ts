import { describe, it, expect } from 'vitest';
import { periodicTrends } from './trends';
import { getElementById } from './elements';
import type { PeriodicTrendKey } from '../types/element';

describe('Periodic Trends Definitions & Calculations', () => {
  const trendKeys: PeriodicTrendKey[] = [
    'atomicRadius',
    'ionizationEnergy',
    'electronegativity',
    'electronAffinity',
    'density',
    'meltingPoint',
    'metallicCharacter',
  ];

  it('contains all 7 required trend keys with descriptions and rules', () => {
    trendKeys.forEach((key) => {
      const def = periodicTrends[key];
      expect(def).toBeDefined();
      expect(def.label).toBeTruthy();
      expect(def.unit).toBeDefined();
      expect(def.shortDescription).toBeTruthy();
      expect(def.studentExplanation).toBeTruthy();
      expect(def.exceptionsExplanation).toBeTruthy();
      expect(def.horizontalSummary).toBeTruthy();
      expect(def.verticalSummary).toBeTruthy();
      expect(typeof def.getValue).toBe('function');
      expect(typeof def.formatValue).toBe('function');
      expect(typeof def.colorScale).toBe('function');
    });
  });

  it('correctly retrieves electronegativity for Fluorine (highest) and Francium/Cesium (lowest)', () => {
    const f = getElementById(9); // Fluorine
    const cs = getElementById(55); // Cesium
    const def = periodicTrends.electronegativity;

    expect(f).toBeDefined();
    expect(cs).toBeDefined();
    if (f && cs) {
      const fVal = def.getValue(f);
      const csVal = def.getValue(cs);
      expect(fVal).toBe(3.98);
      expect(csVal).toBe(0.79);
      expect(fVal!).toBeGreaterThan(csVal!);
    }
  });

  it('correctly retrieves atomic radius trend showing Helium smallest and Francium/Cesium largest', () => {
    const he = getElementById(2); // Helium
    const cs = getElementById(55); // Cesium
    const def = periodicTrends.atomicRadius;

    expect(he).toBeDefined();
    expect(cs).toBeDefined();
    if (he && cs) {
      const heRadius = def.getValue(he);
      const csRadius = def.getValue(cs);
      expect(heRadius).toBeDefined();
      expect(csRadius).toBeDefined();
      expect(csRadius!).toBeGreaterThan(heRadius!);
    }
  });

  it('computes valid colorScale values for min (0), mid (0.5), and max (1.0)', () => {
    const def = periodicTrends.electronegativity;
    [0, 0.5, 1.0].forEach((t) => {
      const color = def.colorScale(t);
      expect(typeof color).toBe('string');
      expect(color.startsWith('hsl(') || color.startsWith('#')).toBe(true);
    });
  });
});
