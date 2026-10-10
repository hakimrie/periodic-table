import { describe, it, expect } from 'vitest';
import {
  MOLECULES_DATABASE,
  computeMolarMass,
  matchMolecule,
  getSynthesisHints,
  REACTIONS_DATABASE,
  calculateReactionStoichiometry,
} from './molecules';

describe('Molecule Database & Synthesis Engine', () => {
  it('has at least 40 curated molecules with valid data', () => {
    expect(MOLECULES_DATABASE.length).toBeGreaterThanOrEqual(40);
    for (const mol of MOLECULES_DATABASE) {
      expect(mol.id).toBeTruthy();
      expect(mol.formula).toBeTruthy();
      expect(mol.nameEn).toBeTruthy();
      expect(mol.nameId).toBeTruthy();
      expect(mol.atoms.length).toBeGreaterThan(0);
      expect(mol.bonds.length).toBeGreaterThanOrEqual(0);

      // Verify each bond references valid atom indices
      for (const [a, b, order] of mol.bonds) {
        expect(a).toBeGreaterThanOrEqual(0);
        expect(a).toBeLessThan(mol.atoms.length);
        expect(b).toBeGreaterThanOrEqual(0);
        expect(b).toBeLessThan(mol.atoms.length);
        expect(order).toBeGreaterThanOrEqual(1);
        expect(order).toBeLessThanOrEqual(3);
      }
    }
  });

  it('computes accurate molar mass for Water (H2O ~ 18.015 g/mol)', () => {
    const mass = computeMolarMass({ H: 2, O: 1 });
    expect(mass).toBeCloseTo(18.015, 1);
  });

  it('computes accurate molar mass for Carbon Dioxide (CO2 ~ 44.01 g/mol)', () => {
    const mass = computeMolarMass({ C: 1, O: 2 });
    expect(mass).toBeCloseTo(44.01, 1);
  });

  it('matches Water when H=2 and O=1 are synthesized', () => {
    const res = matchMolecule({ H: 2, O: 1 });
    expect(res).toBeDefined();
    expect(res?.id).toBe('h2o');
  });

  it('matches Table Salt (NaCl)', () => {
    const res = matchMolecule({ Na: 1, Cl: 1 });
    expect(res).toBeDefined();
    expect(res?.id).toBe('nacl');
  });

  it('matches Caffeine (C8H10N4O2)', () => {
    const res = matchMolecule({ C: 8, H: 10, N: 4, O: 2 });
    expect(res).toBeDefined();
    expect(res?.id).toBe('c8h10n4o2');
  });

  it('returns undefined for non-existent combinations', () => {
    const res = matchMolecule({ H: 5, C: 2 });
    expect(res).toBeUndefined();
  });

  it('generates synthesis hints when user has H2 and needs 1 more O for H2O', () => {
    const hints = getSynthesisHints({ H: 2 }, 1);
    expect(hints.some((h) => h.molecule.id === 'h2o')).toBe(true);
    const waterHint = hints.find((h) => h.molecule.id === 'h2o');
    expect(waterHint?.needed.O).toBe(1);
  });
});

describe('Chemical Reactions & Stoichiometry Engine', () => {
  it('contains at least 8 balanced chemical reactions', () => {
    expect(REACTIONS_DATABASE.length).toBeGreaterThanOrEqual(8);
    for (const rxn of REACTIONS_DATABASE) {
      expect(rxn.id).toBeTruthy();
      expect(rxn.reactants.length).toBeGreaterThan(0);
      expect(rxn.products.length).toBeGreaterThan(0);
      expect(rxn.deltaHkJPerMol).toBeTypeOf('number');
    }
  });

  it('correctly calculates stoichiometry and limiting reactant for water synthesis', () => {
    const waterRxn = REACTIONS_DATABASE.find((r) => r.id === 'synthesis-water')!;
    // 2 H2 + 1 O2 -> 2 H2O. If we supply 4 mol H2 and 1 mol O2, O2 is limiting!
    const res = calculateReactionStoichiometry(waterRxn, [4, 1]);
    expect(res.limitingReactantIndex).toBe(1); // O2 is limiting
    expect(res.extentMoles).toBe(1);
    expect(res.reactants[0].molesUsed).toBe(2);
    expect(res.reactants[0].molesRemaining).toBe(2);
    expect(res.reactants[1].molesRemaining).toBe(0);
    expect(res.products[0].molesProduced).toBe(2);
    // Exothermic: DeltaH = -571.6 kJ/mol, so 571.6 kJ released
    expect(res.netEnergyKJ).toBeCloseTo(571.6, 1);
  });
});
