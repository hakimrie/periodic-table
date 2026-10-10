import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  calculateHydrogenicTransition,
  wavelengthToRGB,
} from '../../data/spectra';
import { useI18n } from '../../utils/i18n';
import { elementSynthesizer } from '../../utils/sonification';
import {
  Zap,
  Play,
} from 'lucide-react';

export const BohrTransitionsView: React.FC = () => {
  const { t } = useI18n();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [nInitial, setNInitial] = useState<number>(3);
  const [nFinal, setNFinal] = useState<number>(2); // Balmer series (visible)
  const [isJumping, setIsJumping] = useState<boolean>(false);

  // Transition physics
  const transition = useMemo(() => {
    const ni = Math.max(nInitial, nFinal);
    const nf = Math.min(nInitial, nFinal);
    return calculateHydrogenicTransition(nf, ni, 1);
  }, [nInitial, nFinal]);

  const rgb = useMemo(() => wavelengthToRGB(transition.wavelengthNm), [transition.wavelengthNm]);

  // Trigger quantum jump animation
  const triggerJump = () => {
    setIsJumping(true);
    if (transition.wavelengthNm >= 380 && transition.wavelengthNm <= 750) {
      elementSynthesizer.playSingleLine(transition.wavelengthNm);
    }
    setTimeout(() => setIsJumping(false), 2400);
  };

  // Preset Balmer series buttons
  const setPreset = (ni: number, nf: number) => {
    setNInitial(ni);
    setNFinal(nf);
    setIsJumping(true);
    const trans = calculateHydrogenicTransition(nf, ni, 1);
    if (trans.wavelengthNm >= 380 && trans.wavelengthNm <= 750) {
      elementSynthesizer.playSingleLine(trans.wavelengthNm);
    }
    setTimeout(() => setIsJumping(false), 2400);
  };

  // 60FPS Quantum Jump & Photon Wave Packet Animation Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let tProgress = 0;

    const render = () => {
      tProgress += 0.03;
      const width = canvas.width;
      const height = canvas.height;

      ctx.fillStyle = '#030712';
      ctx.fillRect(0, 0, width, height);

      // Energy Level Heights (Logarithmic / 1/n^2 spacing)
      // E_n = -13.6 / n^2
      // Top: 0 eV, Bottom: -13.6 eV
      const eLevels = [1, 2, 3, 4, 5, 6];
      const ladderLeft = 60;
      const ladderRight = width * 0.48;
      const ladderTop = 50;
      const ladderBottom = height - 50;

      const getYForN = (n: number) => {
        const energy = -13.6 / (n * n);
        // Map [-13.6, 0] to [ladderBottom, ladderTop]
        const norm = (energy - (-13.6)) / (0 - (-13.6));
        return ladderBottom - norm * (ladderBottom - ladderTop);
      };

      // Draw horizontal energy level lines
      ctx.lineWidth = 1.5;
      for (const n of eLevels) {
        const y = getYForN(n);
        const isTarget = n === nFinal;
        const isSource = n === nInitial;

        ctx.strokeStyle = isTarget ? '#06b6d4' : isSource ? '#f43f5e' : '#334155';
        ctx.beginPath();
        ctx.moveTo(ladderLeft, y);
        ctx.lineTo(ladderRight, y);
        ctx.stroke();

        // Label
        ctx.fillStyle = isTarget ? '#22d3ee' : isSource ? '#fb7185' : '#64748b';
        ctx.font = 'bold 11px monospace';
        ctx.fillText(`n = ${n}  (${(-13.6 / (n * n)).toFixed(2)} eV)`, ladderLeft - 50, y + 4);
      }

      // Draw Quantum Jump Electron
      const yStart = getYForN(nInitial);
      const yEnd = getYForN(nFinal);
      const electronX = ladderLeft + (ladderRight - ladderLeft) * 0.55;

      // Current electron position during jump
      let electronY = yStart;
      let jumpPhase = (tProgress * 1.5) % 3.0; // 0 to 3
      let isEmittingPhoton = false;

      if (isJumping) {
        if (jumpPhase <= 1.0) {
          // Jumping down with easeInOut
          const ease = jumpPhase * jumpPhase * (3 - 2 * jumpPhase);
          electronY = yStart + (yEnd - yStart) * ease;
        } else {
          electronY = yEnd;
          isEmittingPhoton = true;
        }
      } else {
        electronY = yStart;
      }

      // Draw downward jump vector arrow
      ctx.strokeStyle = '#f43f5e88';
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(electronX, yStart);
      ctx.lineTo(electronX, yEnd);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw Electron particle
      ctx.fillStyle = '#38bdf8';
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(electronX, electronY, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Draw Emitted Photon Wave Packet (propagating to the right)
      if (isJumping && isEmittingPhoton) {
        const waveStartX = electronX + 20;
        const waveLengthPx = 180;
        const waveSpeed = (jumpPhase - 1.0) * 160;
        const waveX = waveStartX + waveSpeed;
        const waveY = yEnd;

        ctx.strokeStyle = rgb.hex !== '#000000' ? rgb.hex : '#a855f7';
        ctx.lineWidth = 2.5;
        ctx.shadowColor = rgb.hex;
        ctx.shadowBlur = 12;
        ctx.beginPath();

        const cycles = 4;
        for (let x = 0; x <= waveLengthPx; x += 2) {
          // Gaussian envelope envelope: exp(-((x - waveLengthPx/2)^2) / 600)
          const normX = (x - waveLengthPx / 2) / 35;
          const envelope = Math.exp(-0.5 * normX * normX);
          const waveOsc = Math.sin((x / waveLengthPx) * cycles * Math.PI * 2 - tProgress * 15);
          const py = waveY + waveOsc * 16 * envelope;

          if (x === 0) ctx.moveTo(waveX + x, py);
          else ctx.lineTo(waveX + x, py);
        }
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Photon particle label
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 11px monospace';
        ctx.fillText(`γ (${transition.wavelengthNm.toFixed(1)} nm)`, waveX + waveLengthPx / 2 - 25, waveY - 25);
      }

      // Series annotations on the right side
      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px monospace';
      ctx.fillText('Visible Balmer Series (ends at n = 2)', ladderRight + 20, getYForN(2) - 8);
      ctx.fillText('UV Lyman Series (ends at n = 1)', ladderRight + 20, getYForN(1) - 8);
      ctx.fillText('IR Paschen Series (ends at n = 3)', ladderRight + 20, getYForN(3) - 8);

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [nInitial, nFinal, isJumping, rgb, transition]);

  return (
    <div className="space-y-4">
      {/* Top Header Card */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
            <Zap className="w-5 h-5 animate-pulse" aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              {t('spectra.bohr.title', 'Bohr Hydrogenic Energy Level Transitions')}
            </h3>
            <p className="text-xs text-slate-400">
              {t('spectra.bohr.desc', 'Electron transitions emit discrete photons satisfying ΔE = h·ν = h·c / λ')}
            </p>
          </div>
        </div>

        {/* Trigger Jump Button */}
        <button
          type="button"
          onClick={triggerJump}
          disabled={isJumping}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/30 transition-all active:scale-95 disabled:opacity-50"
        >
          <Play className="w-4 h-4 fill-current" aria-hidden="true" />
          <span>{t('spectra.bohr.jumpButton', 'Trigger Quantum Jump')}</span>
        </button>
      </div>

      {/* Main Grid: Interactive Ladder Canvas + Physics Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Left: 60FPS Quantum Jump Canvas */}
        <div className="lg:col-span-8 relative w-full h-[450px] sm:h-[480px] rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl">
          <canvas
            ref={canvasRef}
            width={740}
            height={480}
            className="w-full h-full object-cover block"
          />

          {/* Quick Balmer Preset Shortcuts Overlay (Top-Right) */}
          <div className="absolute top-4 right-4 flex flex-col gap-1.5 p-2 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl backdrop-blur-md text-[11px] font-mono">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider mb-0.5">Balmer Lines (Visible):</span>
            <button
              type="button"
              onClick={() => setPreset(3, 2)}
              className="flex items-center justify-between gap-3 px-2 py-1 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/40 hover:bg-rose-500/30 transition-colors font-bold"
            >
              <span>H-α (3 → 2)</span>
              <span>656.3 nm</span>
            </button>
            <button
              type="button"
              onClick={() => setPreset(4, 2)}
              className="flex items-center justify-between gap-3 px-2 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30 transition-colors font-bold"
            >
              <span>H-β (4 → 2)</span>
              <span>486.1 nm</span>
            </button>
            <button
              type="button"
              onClick={() => setPreset(5, 2)}
              className="flex items-center justify-between gap-3 px-2 py-1 rounded-lg bg-blue-500/20 text-blue-300 border border-blue-500/40 hover:bg-blue-500/30 transition-colors font-bold"
            >
              <span>H-γ (5 → 2)</span>
              <span>434.0 nm</span>
            </button>
            <button
              type="button"
              onClick={() => setPreset(6, 2)}
              className="flex items-center justify-between gap-3 px-2 py-1 rounded-lg bg-violet-500/20 text-violet-300 border border-violet-500/40 hover:bg-violet-500/30 transition-colors font-bold"
            >
              <span>H-δ (6 → 2)</span>
              <span>410.2 nm</span>
            </button>
          </div>
        </div>

        {/* Right: Quantum State Selector & Photon Energy Card */}
        <div className="lg:col-span-4 space-y-4">
          {/* Quantum Number Pickers */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs shadow-lg space-y-3">
            <span className="font-bold text-slate-200 text-sm block">Quantum Level Selection</span>

            <div className="grid grid-cols-2 gap-3 font-mono">
              <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700">
                <label className="text-[10px] text-slate-400 block mb-1">INITIAL STATE (ni)</label>
                <select
                  value={nInitial}
                  onChange={(e) => setNInitial(Number(e.target.value))}
                  className="w-full bg-slate-900 text-cyan-300 font-bold p-1 rounded border border-slate-700 focus:outline-none"
                >
                  {[2, 3, 4, 5, 6, 7].map((n) => (
                    <option key={`ni-${n}`} value={n}>
                      n = {n} ({(-13.6 / (n * n)).toFixed(2)} eV)
                    </option>
                  ))}
                </select>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700">
                <label className="text-[10px] text-slate-400 block mb-1">FINAL STATE (nf)</label>
                <select
                  value={nFinal}
                  onChange={(e) => setNFinal(Number(e.target.value))}
                  className="w-full bg-slate-900 text-cyan-300 font-bold p-1 rounded border border-slate-700 focus:outline-none"
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={`nf-${n}`} value={n}>
                      n = {n} ({(-13.6 / (n * n)).toFixed(2)} eV)
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Emitted Photon Properties Card */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs shadow-lg space-y-3 font-mono">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-200 text-sm">Emitted Photon Output</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-cyan-300 border border-slate-700">
                {transition.series} Series
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-[11px]">WAVELENGTH (λ):</span>
                <div className="flex items-center gap-2">
                  <span
                    className="w-3.5 h-3.5 rounded-full shadow"
                    style={{ backgroundColor: rgb.hex }}
                  />
                  <span className="font-bold text-slate-100 text-sm">
                    {transition.wavelengthNm.toFixed(1)} nm
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-slate-700/60 pt-2">
                <span className="text-slate-400 text-[11px]">ENERGY (ΔE):</span>
                <span className="font-bold text-amber-300">
                  {transition.energyEv.toFixed(3)} eV
                </span>
              </div>

              <div className="flex items-center justify-between border-t border-slate-700/60 pt-2">
                <span className="text-slate-400 text-[11px]">FREQUENCY (ν):</span>
                <span className="font-bold text-cyan-300">
                  {transition.frequencyTHz.toFixed(1)} THz
                </span>
              </div>
            </div>

            {/* Scientific Explanation */}
            <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/60 text-[11px] leading-relaxed text-slate-300 font-sans">
              <p>
                When an electron transitions from higher energy state <strong>n={nInitial}</strong> to <strong>n={nFinal}</strong>, the lost potential energy is emitted as a single photon of electromagnetic radiation with frequency ν = ΔE / h.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
