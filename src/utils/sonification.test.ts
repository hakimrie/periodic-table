import { describe, it, expect } from 'vitest';
import { elementSynthesizer } from './sonification';

describe('Spectral Sonification Synthesizer', () => {
  it('converts optical wavelengths into valid human audible frequencies', () => {
    // Sodium D line (589 nm)
    const naFreq = elementSynthesizer.wavelengthToAudioFrequency(589);
    expect(naFreq).toBeGreaterThan(450);
    expect(naFreq).toBeLessThan(480);

    // Hydrogen H-alpha (656.3 nm)
    const hAlphaFreq = elementSynthesizer.wavelengthToAudioFrequency(656.3);
    expect(hAlphaFreq).toBeGreaterThan(400);
    expect(hAlphaFreq).toBeLessThan(430);

    // Violet edge (400 nm)
    const violetFreq = elementSynthesizer.wavelengthToAudioFrequency(400);
    expect(violetFreq).toBeGreaterThan(650);
    expect(violetFreq).toBeLessThan(710);
  });

  it('manages mute states gracefully', () => {
    expect(elementSynthesizer.getIsMuted()).toBe(false);
    elementSynthesizer.setMuted(true);
    expect(elementSynthesizer.getIsMuted()).toBe(true);
    elementSynthesizer.setMuted(false);
    expect(elementSynthesizer.getIsMuted()).toBe(false);
  });

  it('does not crash when triggering audio methods in node/test environment', () => {
    expect(() => {
      elementSynthesizer.playSingleLine(589, 0.1);
      elementSynthesizer.playElementChord([{ wavelength: 589, intensity: 100 }], 0.1);
      elementSynthesizer.playFlameFlare();
      elementSynthesizer.stopAll();
    }).not.toThrow();
  });
});
