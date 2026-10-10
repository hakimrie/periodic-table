/**
 * Web Audio Sonification of Atomic Emission Spectra & Laboratory Sound Effects
 *
 * Grounded in scientific octave transposition:
 * Optical light frequency f_light = c / lambda (~400 THz - 790 THz) is transposed
 * down by 40 octaves (2^40) into the human audible hearing range (~350 Hz - 720 Hz),
 * allowing users to "hear" the unique harmonic chord of each chemical element.
 */

import type { SpectralLine } from '../data/spectra';

class ElementAudioSynthesizer {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private activeOscillators: { osc: OscillatorNode; gain: GainNode }[] = [];
  private isMuted: boolean = false;

  private initContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;

    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(0.18, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    }

    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }

    return this.ctx;
  }

  /**
   * Convert optical wavelength (nm) to audible frequency (Hz) via 40-octave transposition.
   * f_audio = (c / (lambda * 1e-9)) / 2^40
   */
  public wavelengthToAudioFrequency(wavelengthNm: number): number {
    const c = 2.99792458e8;
    const fLight = c / (wavelengthNm * 1e-9);
    // 2^40 = 1,099,511,627,776
    const fAudio = fLight / Math.pow(2, 40);
    return Math.round(fAudio * 10) / 10;
  }

  /**
   * Stop any currently sounding oscillators with gentle release ramp.
   */
  public stopAll(): void {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    for (const { osc, gain } of this.activeOscillators) {
      try {
        gain.gain.cancelScheduledValues(now);
        gain.gain.setValueAtTime(gain.gain.value, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.15);
        osc.stop(now + 0.16);
      } catch {
        // Ignore if already stopped
      }
    }
    this.activeOscillators = [];
  }

  /**
   * Play the harmonic chord of an element's top spectral lines.
   */
  public playElementChord(lines: SpectralLine[], durationSec: number = 1.8): void {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx || !this.masterGain) return;

    this.stopAll();

    // Select the most intense lines (up to 7 prominent frequencies to prevent distortion)
    const sorted = [...lines].sort((a, b) => b.intensity - a.intensity).slice(0, 7);
    if (sorted.length === 0) return;

    const maxIntensity = Math.max(...sorted.map((l) => l.intensity), 1);
    const now = ctx.currentTime;

    for (const line of sorted) {
      const freq = this.wavelengthToAudioFrequency(line.wavelength);
      if (freq < 50 || freq > 5000) continue;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Soft sine waves with gentle harmonic character
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      const targetGain = (line.intensity / maxIntensity) * (0.35 / Math.sqrt(sorted.length));

      // Envelope: smooth attack, sustain, gentle exponential decay
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(targetGain, now + 0.12);
      gain.gain.setValueAtTime(targetGain, now + durationSec - 0.4);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + durationSec);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + durationSec + 0.05);

      this.activeOscillators.push({ osc, gain });
    }
  }

  /**
   * Play a single spectral line tone (e.g. on mouse hover or inspection).
   */
  public playSingleLine(wavelengthNm: number, durationSec: number = 0.6): void {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx || !this.masterGain) return;

    const freq = this.wavelengthToAudioFrequency(wavelengthNm);
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.25, now + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + durationSec);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + durationSec + 0.02);
  }

  /**
   * Generate an organic thermal sizzle/flare sound when an element is introduced to the Bunsen flame.
   */
  public playFlameFlare(): void {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx || !this.masterGain) return;

    const bufferSize = ctx.sampleRate * 0.4;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    // Filtered pink/brownian noise for realistic chemical flame hiss
    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      lastOut = (lastOut + 0.02 * white) / 1.02;
      data[i] = lastOut * 3.5;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(800, ctx.currentTime);
    filter.Q.setValueAtTime(2.0, ctx.currentTime);

    const gain = ctx.createGain();
    const now = ctx.currentTime;
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.2, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.38);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noise.start(now);
    noise.stop(now + 0.4);
  }

  public setMuted(muted: boolean): void {
    this.isMuted = muted;
    if (muted) this.stopAll();
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }
}

export const elementSynthesizer = new ElementAudioSynthesizer();
