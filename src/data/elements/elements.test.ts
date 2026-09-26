import { describe, it, expect } from 'vitest';
import { allElements, getElementById, searchElements } from './index';

describe('118 Chemical Elements Dataset Validation', () => {
  it('contains exactly 118 elements', () => {
    expect(allElements.length).toBe(118);
  });

  it('contains contiguous atomic numbers from 1 to 118', () => {
    for (let i = 1; i <= 118; i++) {
      const element = allElements[i - 1];
      expect(element.atomicNumber).toBe(i);
    }
  });

  it('contains unique chemical symbols', () => {
    const symbols = allElements.map((el) => el.symbol);
    const uniqueSymbols = new Set(symbols);
    expect(uniqueSymbols.size).toBe(118);
  });

  it('contains unique names', () => {
    const names = allElements.map((el) => el.name);
    const uniqueNames = new Set(names);
    expect(uniqueNames.size).toBe(118);
  });

  it('verifies that electron shell sums match atomic number for neutral atoms', () => {
    for (const el of allElements) {
      const shellSum = el.electronConfiguration.shells.reduce((acc, count) => acc + count, 0);
      expect(shellSum).toBe(el.atomicNumber);
      expect(el.protons).toBe(el.atomicNumber);
      expect(el.electrons).toBe(el.atomicNumber);
    }
  });

  it('validates periods and blocks consistency', () => {
    for (const el of allElements) {
      expect(el.period).toBeGreaterThanOrEqual(1);
      expect(el.period).toBeLessThanOrEqual(7);
      expect(['s', 'p', 'd', 'f']).toContain(el.block);

      if (el.group !== null) {
        expect(el.group).toBeGreaterThanOrEqual(1);
        expect(el.group).toBeLessThanOrEqual(18);
      }
    }
  });

  it('accurately looks up elements by ID (number, symbol, and name)', () => {
    const oxygenByNum = getElementById(8);
    const oxygenBySymbol = getElementById('O');
    const oxygenByName = getElementById('Oxygen');

    expect(oxygenByNum?.name).toBe('Oxygen');
    expect(oxygenBySymbol?.atomicNumber).toBe(8);
    expect(oxygenByName?.symbol).toBe('O');

    const gold = getElementById('Au');
    expect(gold?.atomicNumber).toBe(79);
    expect(gold?.name).toBe('Gold');

    const oganesson = getElementById(118);
    expect(oganesson?.symbol).toBe('Og');
  });

  it('searches elements with fuzzy matching and filters', () => {
    const gases = searchElements('', { phase: 'gas' });
    expect(gases.map((g) => g.symbol)).toContain('O');
    expect(gases.map((g) => g.symbol)).toContain('He');
    expect(gases.map((g) => g.symbol)).toContain('N');

    const halogens = searchElements('halogen');
    expect(halogens.length).toBeGreaterThan(0);

    const queryResults = searchElements('iron');
    expect(queryResults.length).toBeGreaterThanOrEqual(1);
    expect(queryResults[0].symbol).toBe('Fe');
  });
});
