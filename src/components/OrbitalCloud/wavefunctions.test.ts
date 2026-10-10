import { describe, it, expect } from 'vitest';
import {
  radialR,
  laguerre,
  factorial,
  evaluatePsi,
  sampleOrbitalPoints,
  radialProbabilityP,
} from './wavefunctions';

describe('Quantum Orbital Wavefunctions', () => {
  it('computes factorials correctly', () => {
    expect(factorial(0)).toBe(1);
    expect(factorial(1)).toBe(1);
    expect(factorial(4)).toBe(24);
    expect(factorial(5)).toBe(120);
  });

  it('computes Laguerre polynomials', () => {
    expect(laguerre(0, 1, 5)).toBe(1);
    // L_1^1(x) = 1 + 1 - x = 2 - x
    expect(laguerre(1, 1, 2)).toBe(0);
  });

  it('evaluates 1s orbital radial function (pure exponential, no radial nodes)', () => {
    const r0 = radialR(1, 0, 0);
    const r1 = radialR(1, 0, 1);
    const r5 = radialR(1, 0, 5);
    expect(r0).toBeGreaterThan(r1);
    expect(r1).toBeGreaterThan(r5);
    expect(r5).toBeGreaterThan(0);
  });

  it('has radial node for 2s orbital at r = 2 a_0 (where R_2s changes sign)', () => {
    // For n=2, l=0, Z=1: rho = r, p=1, k=1 -> L_1^1(r) = 2 - r. Node is at r = 2.
    const rBefore = radialR(2, 0, 1.0);
    const rAt = radialR(2, 0, 2.0);
    const rAfter = radialR(2, 0, 3.0);
    expect(rBefore).toBeGreaterThan(0);
    expect(Math.abs(rAt)).toBeLessThan(1e-6);
    expect(rAfter).toBeLessThan(0);
  });

  it('verifies angular symmetry of p_z orbital (odd with respect to z)', () => {
    const psiPos = evaluatePsi(2, 1, 'pz', 0, 0, 2);
    const psiNeg = evaluatePsi(2, 1, 'pz', 0, 0, -2);
    expect(psiPos).toBeGreaterThan(0);
    expect(psiNeg).toBeLessThan(0);
    expect(Math.abs(psiPos + psiNeg)).toBeLessThan(1e-6); // Antisymmetric
  });

  it('verifies nodal plane on xy plane for p_z (z = 0)', () => {
    const psiNode = evaluatePsi(2, 1, 'pz', 2, 2, 0);
    expect(Math.abs(psiNode)).toBeLessThan(1e-9);
  });

  it('calculates non-zero radial probability density P(r) with peak', () => {
    // 1s peak is at r = 1 a_0 (Bohr radius)
    const p0 = radialProbabilityP(1, 0, 0);
    const p1 = radialProbabilityP(1, 0, 1);
    const p5 = radialProbabilityP(1, 0, 5);
    expect(p0).toBe(0); // r^2 = 0 at nucleus
    expect(p1).toBeGreaterThan(0);
    expect(p1).toBeGreaterThan(p5);
  });

  it('samples valid points with both positive and negative phases for p orbital', () => {
    const { positions, phases } = sampleOrbitalPoints(2, 1, 'pz', 500);
    expect(positions.length).toBe(1500);
    expect(phases.length).toBe(500);

    let hasPos = false;
    let hasNeg = false;
    for (let i = 0; i < phases.length; i++) {
      if (phases[i] === 1) hasPos = true;
      if (phases[i] === -1) hasNeg = true;
    }
    expect(hasPos).toBe(true);
    expect(hasNeg).toBe(true);
  });
});
