import React, { useEffect, useRef, useState } from 'react';
import {
  FLAME_TEST_ELEMENTS,
  type FlameTestElement,
} from '../../data/spectra';
import { useI18n } from '../../utils/i18n';
import { elementSynthesizer } from '../../utils/sonification';
import {
  Flame,
  Sparkles,
  Volume2,
  VolumeX,
  RotateCcw,
  Eye,
  Info,
  Sliders,
} from 'lucide-react';

interface FlameTestViewProps {
  onSelectElementById?: (z: number) => void;
  initialElementZ?: number;
}

export const FlameTestView: React.FC<FlameTestViewProps> = ({
  onSelectElementById,
  initialElementZ = 11, // Sodium by default
}) => {
  const { t, lang } = useI18n();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Selected flame element
  const [selectedZ, setSelectedZ] = useState<number>(() => {
    return FLAME_TEST_ELEMENTS[initialElementZ] ? initialElementZ : 11;
  });

  // Bunsen Burner state
  const [isWireInFlame, setIsWireInFlame] = useState<boolean>(true);
  const [useCobaltGlass, setUseCobaltGlass] = useState<boolean>(false);
  const [isRoaringFlame, setIsRoaringFlame] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(elementSynthesizer.getIsMuted());

  const currentFlameInfo: FlameTestElement = FLAME_TEST_ELEMENTS[selectedZ] || FLAME_TEST_ELEMENTS[11];

  // Select salt from rack
  const handleSelectSalt = (z: number) => {
    setSelectedZ(z);
    setIsWireInFlame(true);
    elementSynthesizer.playFlameFlare();
  };

  // Clean wire in HCl
  const handleCleanWire = () => {
    setIsWireInFlame(false);
  };

  // Toggle mute
  const toggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    elementSynthesizer.setMuted(next);
  };

  // 60FPS Realistic Procedural Flame Simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;

    // Spark / ember particles
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
      size: number;
      color: string;
    }
    const particles: Particle[] = [];

    const render = () => {
      time += 0.04;
      const width = canvas.width;
      const height = canvas.height;

      // Dark laboratory backdrop with subtle radial glow
      ctx.fillStyle = '#050b14';
      ctx.fillRect(0, 0, width, height);

      const burnerX = width / 2;
      const burnerTopY = height - 110;

      // Base Bunsen Burner Apparatus Drawing
      // Base plate
      ctx.fillStyle = '#1e293b';
      ctx.beginPath();
      ctx.ellipse(burnerX, height - 20, 75, 18, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Metallic stem / barrel
      const barrelWidth = 24;
      const barrelHeight = 90;
      const barrelGradient = ctx.createLinearGradient(burnerX - barrelWidth / 2, 0, burnerX + barrelWidth / 2, 0);
      barrelGradient.addColorStop(0, '#334155');
      barrelGradient.addColorStop(0.3, '#94a3b8');
      barrelGradient.addColorStop(0.7, '#64748b');
      barrelGradient.addColorStop(1, '#1e293b');

      ctx.fillStyle = barrelGradient;
      ctx.fillRect(burnerX - barrelWidth / 2, burnerTopY, barrelWidth, barrelHeight);
      ctx.strokeRect(burnerX - barrelWidth / 2, burnerTopY, barrelWidth, barrelHeight);

      // Air collar ring
      ctx.fillStyle = isRoaringFlame ? '#0284c7' : '#eab308';
      ctx.fillRect(burnerX - barrelWidth / 2 - 2, burnerTopY + 45, barrelWidth + 4, 12);

      // Gas intake nozzle (left)
      ctx.fillStyle = '#475569';
      ctx.beginPath();
      ctx.roundRect(burnerX - 55, height - 38, 45, 10, 4);
      ctx.fill();

      // Determine Flame Color based on wire & cobalt glass state
      let primaryFlameColor = isRoaringFlame ? '#0284c7' : '#f59e0b';
      let glowColor = isRoaringFlame ? '#38bdf8' : '#fbbf24';

      if (isWireInFlame) {
        if (useCobaltGlass && currentFlameInfo.cobaltGlassColorHex) {
          primaryFlameColor = currentFlameInfo.cobaltGlassColorHex;
          glowColor = '#3b82f6';
        } else {
          primaryFlameColor = currentFlameInfo.flameColorHex;
          glowColor = currentFlameInfo.flameGlowHex;
        }
      }

      // Environmental Glow
      const ambientGlow = ctx.createRadialGradient(burnerX, burnerTopY - 90, 10, burnerX, burnerTopY - 90, 220);
      ambientGlow.addColorStop(0, `${glowColor}33`);
      ambientGlow.addColorStop(0.5, `${primaryFlameColor}18`);
      ambientGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = ambientGlow;
      ctx.beginPath();
      ctx.arc(burnerX, burnerTopY - 90, 220, 0, Math.PI * 2);
      ctx.fill();

      // Draw Main Flame Body (Organic Bezier flame with harmonic turbulence)
      const flameHeight = isRoaringFlame ? 170 : 130;
      const sway1 = Math.sin(time * 3.5) * 6 + Math.cos(time * 7.1) * 3;
      const sway2 = Math.cos(time * 4.2) * 5 + Math.sin(time * 9.3) * 2;
      const tipX = burnerX + sway1 * 0.9;
      const tipY = burnerTopY - flameHeight + Math.sin(time * 5.0) * 8;

      ctx.save();
      ctx.globalCompositeOperation = 'screen';

      // Outer Flame Plume
      const flameGradient = ctx.createLinearGradient(burnerX, burnerTopY, tipX, tipY);
      flameGradient.addColorStop(0, '#0284c7');
      flameGradient.addColorStop(0.2, primaryFlameColor);
      flameGradient.addColorStop(0.85, glowColor);
      flameGradient.addColorStop(1, '#ffffff');

      ctx.fillStyle = flameGradient;
      ctx.beginPath();
      ctx.moveTo(burnerX - barrelWidth / 2, burnerTopY);
      ctx.bezierCurveTo(
        burnerX - 42 + sway2,
        burnerTopY - 50,
        tipX - 25 + sway1,
        tipY + 45,
        tipX,
        tipY
      );
      ctx.bezierCurveTo(
        tipX + 25 + sway1,
        tipY + 45,
        burnerX + 42 + sway2,
        burnerTopY - 50,
        burnerX + barrelWidth / 2,
        burnerTopY
      );
      ctx.closePath();
      ctx.fill();

      // Inner Hot Core Flame Cone (pale blue / white)
      const innerCoreY = burnerTopY - flameHeight * 0.45;
      const innerGradient = ctx.createLinearGradient(burnerX, burnerTopY, burnerX, innerCoreY);
      innerGradient.addColorStop(0, '#38bdf8');
      innerGradient.addColorStop(0.7, '#e0f2fe');
      innerGradient.addColorStop(1, '#ffffff');

      ctx.fillStyle = innerGradient;
      ctx.beginPath();
      ctx.moveTo(burnerX - barrelWidth / 3, burnerTopY);
      ctx.quadraticCurveTo(burnerX - 12 + sway1 * 0.4, innerCoreY + 20, burnerX + sway1 * 0.4, innerCoreY);
      ctx.quadraticCurveTo(burnerX + 12 + sway1 * 0.4, innerCoreY + 20, burnerX + barrelWidth / 3, burnerTopY);
      ctx.closePath();
      ctx.fill();

      // Nichrome / Platinum Wire Loop Tool (introduced from the right side)
      if (isWireInFlame) {
        const loopCenterX = burnerX + 6 + sway1 * 0.3;
        const loopCenterY = burnerTopY - 60;

        // Wire handle rod
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(width - 40, loopCenterY - 40);
        ctx.lineTo(loopCenterX + 16, loopCenterY);
        ctx.stroke();

        // Glowing hot loop tip
        ctx.strokeStyle = primaryFlameColor;
        ctx.lineWidth = 3.5;
        ctx.shadowColor = glowColor;
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(loopCenterX, loopCenterY, 10, 0, Math.PI * 2);
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Glowing chemical salt residue inside the loop
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(loopCenterX, loopCenterY, 5, 0, Math.PI * 2);
        ctx.fill();

        // Spawn thermal sparks/embers from excitation
        if (Math.random() < 0.6) {
          particles.push({
            x: loopCenterX + (Math.random() - 0.5) * 12,
            y: loopCenterY + (Math.random() - 0.5) * 12,
            vx: (Math.random() - 0.5) * 1.8 + sway1 * 0.1,
            vy: -(Math.random() * 3.5 + 2.0),
            life: 0,
            maxLife: 25 + Math.random() * 30,
            size: Math.random() * 2.5 + 1.2,
            color: Math.random() > 0.3 ? primaryFlameColor : '#ffffff',
          });
        }
      }

      // Update & Render Sparks
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy *= 0.98; // Drag
        p.life++;

        const alpha = Math.max(0, 1 - p.life / p.maxLife);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * alpha, 0, Math.PI * 2);
        ctx.fill();

        if (p.life >= p.maxLife) {
          particles.splice(i, 1);
        }
      }

      ctx.restore();

      // Cobalt Blue Glass Filter Effect Overlay
      if (useCobaltGlass) {
        ctx.fillStyle = 'rgba(30, 58, 138, 0.45)';
        ctx.fillRect(0, 0, width, height);

        // Cobalt Glass vignette frame
        ctx.strokeStyle = '#1d4ed8';
        ctx.lineWidth = 14;
        ctx.strokeRect(7, 7, width - 14, height - 14);

        ctx.fillStyle = '#93c5fd';
        ctx.font = 'bold 11px monospace';
        ctx.fillText('COBALT GLASS FILTER (OPTICAL BLUE BANDPASS)', 20, 28);
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [isWireInFlame, useCobaltGlass, isRoaringFlame, currentFlameInfo]);

  return (
    <div className="space-y-4">
      {/* Top Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40">
            <Flame className="w-5 h-5 animate-pulse" aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              {t('spectra.views.flameTest', 'Flame Test Simulator')}
              <span className="text-[11px] font-normal text-slate-400 font-mono">
                {currentFlameInfo.symbol} — {currentFlameInfo.sampleSalt}
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              {t('spectra.flameRackDesc', 'Select an analytical salt sample and introduce it into the burner flame')}
            </p>
          </div>
        </div>

        {/* Action Toggles */}
        <div className="flex items-center gap-2">
          {/* Cobalt Glass Filter Toggle */}
          <button
            type="button"
            onClick={() => setUseCobaltGlass(!useCobaltGlass)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
              useCobaltGlass
                ? 'bg-blue-600 text-white border-blue-400 shadow-lg shadow-blue-500/30'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'
            }`}
            title={t('spectra.cobaltGlassDesc', 'Absorbs persistent yellow sodium flare')}
          >
            <Eye className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{useCobaltGlass ? t('spectra.cobaltGlassActive', 'Cobalt Glass ON') : t('spectra.cobaltGlassInactive', 'Cobalt Glass OFF')}</span>
          </button>

          {/* Clean Wire in HCl */}
          <button
            type="button"
            onClick={handleCleanWire}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
              !isWireInFlame
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'
            }`}
            title={t('spectra.cleanWire', 'Clean Wire (HCl Bath)')}
          >
            <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{t('spectra.cleanWire', 'Clean Wire (HCl)')}</span>
          </button>

          {/* Air Hole Collar Toggle */}
          <button
            type="button"
            onClick={() => setIsRoaringFlame(!isRoaringFlame)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-750 transition-all"
            title={t('spectra.airHole', 'Bunsen Air Hole Collar')}
          >
            <Sliders className="w-3.5 h-3.5 text-cyan-400" aria-hidden="true" />
            <span>{isRoaringFlame ? 'Roaring Flame' : 'Safety Flame'}</span>
          </button>

          {/* Audio Mute/Unmute */}
          <button
            type="button"
            onClick={toggleMute}
            aria-label={isMuted ? t('spectra.soundUnmute', 'Unmute Audio') : t('spectra.soundMute', 'Mute Audio')}
            className={`p-2 rounded-xl border text-xs transition-colors ${
              !isMuted
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
            }`}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Canvas and Salt Rack Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Left: 60FPS Bunsen Flame Canvas */}
        <div className="lg:col-span-8 relative w-full h-[460px] sm:h-[500px] rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl">
          <canvas
            ref={canvasRef}
            width={740}
            height={500}
            className="w-full h-full object-cover block"
          />

          {/* Top Left Flame Info Overlay */}
          <div className="absolute top-4 left-4 p-3 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl backdrop-blur-md space-y-1">
            <div className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full shadow-lg"
                style={{ backgroundColor: currentFlameInfo.flameColorHex }}
              />
              <span className="text-sm font-bold text-slate-100">
                {lang === 'id' ? currentFlameInfo.nameId : currentFlameInfo.nameEn} ({currentFlameInfo.symbol})
              </span>
            </div>
            <div className="text-xs text-cyan-300 font-mono">
              λ = {currentFlameInfo.dominantWavelength} nm
            </div>
          </div>

          {/* Bottom Banner Instruction */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between p-2.5 rounded-xl bg-slate-900/85 border border-slate-800 text-xs text-slate-300 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" aria-hidden="true" />
              <span>{lang === 'id' ? currentFlameInfo.descriptionId : currentFlameInfo.descriptionEn}</span>
            </div>
            {onSelectElementById && (
              <button
                type="button"
                onClick={() => onSelectElementById(currentFlameInfo.atomicNumber)}
                className="px-2 py-0.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-[11px] font-semibold transition-colors"
              >
                Inspect Element
              </button>
            )}
          </div>
        </div>

        {/* Right: Salt Rack & Analytical Spectroscopy Card */}
        <div className="lg:col-span-4 space-y-4">
          {/* Chemical Salts Rack */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs shadow-lg space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-200 text-sm">{t('spectra.flameRack', 'Chemical Salt Rack')}</span>
              <span className="text-[11px] font-mono text-slate-400">{Object.keys(FLAME_TEST_ELEMENTS).length} Salts</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-2">
              {Object.values(FLAME_TEST_ELEMENTS).map((item) => {
                const isSelected = item.atomicNumber === selectedZ;
                return (
                  <button
                    key={item.atomicNumber}
                    type="button"
                    onClick={() => handleSelectSalt(item.atomicNumber)}
                    className={`flex items-center gap-2.5 p-2 rounded-xl text-left border transition-all ${
                      isSelected
                        ? 'bg-slate-800 border-cyan-400 ring-1 ring-cyan-400/50 shadow-md'
                        : 'bg-slate-800/50 hover:bg-slate-800 border-slate-700/80 hover:border-slate-600'
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full shrink-0 shadow-sm"
                      style={{ backgroundColor: item.flameColorHex }}
                    />
                    <div className="min-w-0">
                      <div className="font-bold text-slate-200 truncate">{item.symbol} — {item.sampleSalt}</div>
                      <div className="text-[10px] text-slate-400 truncate">
                        {lang === 'id' ? item.nameId : item.nameEn}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Analytical Science Details Card */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs shadow-lg space-y-3">
            <div className="flex items-center gap-2 font-bold text-slate-200 text-sm">
              <Info className="w-4 h-4 text-cyan-400" aria-hidden="true" />
              <span>{t('spectra.excitationPhysics', 'Excitation Mechanics')}</span>
            </div>

            <div className="space-y-2 text-slate-300">
              <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                  {t('spectra.sampleUsed', 'Laboratory Salt Sample')}
                </span>
                <span className="font-bold text-slate-200 block text-xs">
                  {currentFlameInfo.sampleSalt} ({lang === 'id' ? currentFlameInfo.sampleSaltNameId : currentFlameInfo.sampleSaltNameEn})
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                  {t('spectra.dominantLine', 'Dominant Spectral Line')}
                </span>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-cyan-300 font-bold text-sm">
                    {currentFlameInfo.dominantWavelength} nm
                  </span>
                  <span
                    className="px-2 py-0.5 rounded text-[10px] font-bold"
                    style={{
                      backgroundColor: `${currentFlameInfo.flameColorHex}22`,
                      color: currentFlameInfo.flameColorHex,
                    }}
                  >
                    Visible Emission
                  </span>
                </div>
              </div>

              <p className="text-[11px] leading-relaxed text-slate-300">
                {lang === 'id' ? currentFlameInfo.excitationMechanismId : currentFlameInfo.excitationMechanismEn}
              </p>

              {currentFlameInfo.cobaltGlassNoteEn && (
                <div className="p-2 rounded-xl bg-blue-950/40 border border-blue-900/60 text-[11px] text-blue-200">
                  <strong className="text-blue-300 block mb-0.5">Cobalt Glass Behavior:</strong>
                  {lang === 'id' ? currentFlameInfo.cobaltGlassNoteId : currentFlameInfo.cobaltGlassNoteEn}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
