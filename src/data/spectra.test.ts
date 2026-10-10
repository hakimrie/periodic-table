import { describe, it, expect } from 'vitest';
import {
  wavelengthToRGB,
  calculateHydrogenicTransition,
  getElementSpectra,
  getFlameTestInfo,
  FLAME_TEST_ELEMENTS,
  ATOMIC_SPECTRA_DATABASE,
} from './spectra';

describe('Spectra Data & Physics Calculations', () => {
  it('converts visible wavelengths to accurate RGB and hex values', () => {
    // Red region (~650nm)
    const red = wavelengthToRGB(656);
    expect(red.r).toBeGreaterThan(150);
    expect(red.g).toBeLessThan(100);
    expect(red.b).toBeLessThan(100);
    expect(red.hex).toMatch(/^#[0-9a-f]{6}$/i);

    // Green region (~520nm)
    const green = wavelengthToRGB(520);
    expect(green.g).toBeGreaterThan(150);
    expect(green.hex).toMatch(/^#[0-9a-f]{6}$/i);

    // Blue region (~450nm)
    const blue = wavelengthToRGB(450);
    expect(blue.b).toBeGreaterThan(150);
    expect(blue.hex).toMatch(/^#[0-9a-f]{6}$/i);

    // Out of visible spectrum limits should yield black (0, 0, 0)
    const uv = wavelengthToRGB(300);
    expect(uv.r).toBe(0);
    expect(uv.g).toBe(0);
    expect(uv.b).toBe(0);
    expect(uv.hex).toBe('#000000');
  });

  it('calculates exact hydrogenic Rydberg transitions', () => {
    // H-alpha (n=2 to n=3)
    const hAlpha = calculateHydrogenicTransition(2, 3, 1);
    expect(hAlpha.wavelengthNm).toBeCloseTo(656.3, 0);
    expect(hAlpha.series).toBe('Balmer');
    expect(hAlpha.energyEv).toBeCloseTo(1.89, 1);

    // H-beta (n=2 to n=4)
    const hBeta = calculateHydrogenicTransition(2, 4, 1);
    expect(hBeta.wavelengthNm).toBeCloseTo(486.1, 0);
    expect(hBeta.series).toBe('Balmer');

    // Lyman-alpha (n=1 to n=2, UV)
    const lymanAlpha = calculateHydrogenicTransition(1, 2, 1);
    expect(lymanAlpha.wavelengthNm).toBeCloseTo(121.6, 0);
    expect(lymanAlpha.series).toBe('Lyman');
  });

  it('retrieves sorted spectral lines for curated and procedural elements', () => {
    // Hydrogen
    const hLines = getElementSpectra(1);
    expect(hLines.length).toBeGreaterThanOrEqual(4);
    expect(hLines[0].wavelength).toBeLessThan(hLines[hLines.length - 1].wavelength);

    // Sodium (must contain 589nm doublet)
    const naLines = getElementSpectra(11);
    const hasDoublet = naLines.some((l) => Math.abs(l.wavelength - 589) < 1);
    expect(hasDoublet).toBe(true);

    // Procedural element (e.g. Uranium Z=92)
    const uLines = getElementSpectra(92);
    expect(uLines.length).toBeGreaterThan(0);
    for (let i = 1; i < uLines.length; i++) {
      expect(uLines[i].wavelength).toBeGreaterThanOrEqual(uLines[i - 1].wavelength);
    }
  });

  it('contains comprehensive flame test characteristics for key lab elements', () => {
    const naFlame = getFlameTestInfo(11);
    expect(naFlame).toBeDefined();
    expect(naFlame?.sampleSalt).toBe('NaCl');
    expect(naFlame?.flameColorHex).toBe('#f59e0b');

    const cuFlame = getFlameTestInfo(29);
    expect(cuFlame).toBeDefined();
    expect(cuFlame?.flameColorHex).toBe('#10b981');

    const kFlame = getFlameTestInfo(19);
    expect(kFlame?.cobaltGlassColorHex).toBeDefined();

    // Check count of flame-testable elements
    const count = Object.keys(FLAME_TEST_ELEMENTS).length;
    expect(count).toBeGreaterThanOrEqual(10);
  });

  it('verifies all curated spectral databases have valid wavelengths', () => {
    for (const [zStr, lines] of Object.entries(ATOMIC_SPECTRA_DATABASE)) {
      const z = Number(zStr);
      expect(z).toBeGreaterThan(0);
      for (const line of lines) {
        expect(line.wavelength).toBeGreaterThan(300);
        expect(line.wavelength).toBeLessThan(800);
        expect(line.intensity).toBeGreaterThan(0);
        expect(line.intensity).toBeLessThanOrEqual(100);
      }
    }
  });
});
