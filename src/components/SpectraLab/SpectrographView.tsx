import React, { useState, useMemo, useRef } from 'react';
import {
  getElementSpectra,
  wavelengthToRGB,
  type SpectralLine,
} from '../../data/spectra';
import { allElements, getElementById } from '../../data/elements';
import { getLocalizedElementName } from '../../data/elements/translations';
import { useI18n } from '../../utils/i18n';
import { elementSynthesizer } from '../../utils/sonification';
import {
  Volume2,
  VolumeX,
  Sparkles,
  Layers,
  ArrowRightLeft,
  Zap,
} from 'lucide-react';

interface SpectrographViewProps {
  initialElementZ?: number;
  onSelectElementById?: (z: number) => void;
}

export const SpectrographView: React.FC<SpectrographViewProps> = ({
  initialElementZ = 1,
  onSelectElementById,
}) => {
  const { t, lang } = useI18n();

  // Active element
  const [selectedZ, setSelectedZ] = useState<number>(initialElementZ);
  // Comparison element (optional)
  const [compareZ, setCompareZ] = useState<number | null>(2); // Helium by default
  const [isCompareActive, setIsCompareActive] = useState<boolean>(false);

  // Spectrum display mode: 'emission' (black bg with bright lines) vs 'absorption' (rainbow with dark Fraunhofer lines)
  const [spectrumMode, setSpectrumMode] = useState<'emission' | 'absorption'>('emission');
  const [minIntensity, setMinIntensity] = useState<number>(0);
  const [hoveredWavelength, setHoveredWavelength] = useState<number | null>(null);
  const [isPlayingSound, setIsPlayingSound] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(elementSynthesizer.getIsMuted());

  const spectrographRef = useRef<HTMLDivElement>(null);

  const element1 = useMemo(() => getElementById(selectedZ) || allElements[0], [selectedZ]);
  const element2 = useMemo(() => (compareZ ? getElementById(compareZ) : null), [compareZ]);

  const lines1 = useMemo(() => {
    return getElementSpectra(selectedZ).filter((l) => l.intensity >= minIntensity);
  }, [selectedZ, minIntensity]);

  const lines2 = useMemo(() => {
    if (!compareZ) return [];
    return getElementSpectra(compareZ).filter((l) => l.intensity >= minIntensity);
  }, [compareZ, minIntensity]);

  // Sonification play
  const handlePlaySound = (lines: SpectralLine[]) => {
    setIsPlayingSound(true);
    elementSynthesizer.playElementChord(lines, 2.2);
    setTimeout(() => setIsPlayingSound(false), 2200);
  };

  const toggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    elementSynthesizer.setMuted(next);
  };

  // Inspect hovering on the spectrograph bar (380nm - 750nm)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
    const percent = x / rect.width;
    const wl = Math.round((380 + percent * (750 - 380)) * 10) / 10;
    setHoveredWavelength(wl);
  };

  const handleMouseLeave = () => {
    setHoveredWavelength(null);
  };

  // Photon physics for hovered wavelength
  const hoverPhysics = useMemo(() => {
    if (!hoveredWavelength) return null;
    const c = 2.99792458e8;
    const h = 6.62607015e-34;
    const q = 1.602176634e-19;
    const lambdaM = hoveredWavelength * 1e-9;
    const freqTHz = (c / lambdaM) / 1e12;
    const energyEv = (h * (c / lambdaM)) / q;
    const rgb = wavelengthToRGB(hoveredWavelength);

    // Find closest line
    const closest1 = lines1.reduce((prev, curr) => {
      return Math.abs(curr.wavelength - hoveredWavelength) < Math.abs(prev.wavelength - hoveredWavelength)
        ? curr
        : prev;
    }, lines1[0]);

    return {
      wavelength: hoveredWavelength,
      freqTHz: freqTHz.toFixed(1),
      energyEv: energyEv.toFixed(2),
      hex: rgb.hex,
      closest: closest1 && Math.abs(closest1.wavelength - hoveredWavelength) < 2.5 ? closest1 : null,
    };
  }, [hoveredWavelength, lines1]);

  return (
    <div className="space-y-4">
      {/* Top Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl backdrop-blur-md">
        <div className="flex flex-wrap items-center gap-2">
          {/* Element 1 Selector */}
          <div className="flex items-center gap-2 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700">
            <span className="text-xs font-medium text-slate-400">Primary:</span>
            <select
              value={selectedZ}
              onChange={(e) => setSelectedZ(Number(e.target.value))}
              aria-label="Select primary element for spectrograph"
              className="bg-transparent text-cyan-300 font-bold text-xs focus:outline-none cursor-pointer"
            >
              {allElements.map((el) => (
                <option key={el.atomicNumber} value={el.atomicNumber} className="bg-slate-900 text-slate-100">
                  {el.atomicNumber}. {getLocalizedElementName(el.atomicNumber, lang)} ({el.symbol})
                </option>
              ))}
            </select>
          </div>

          {/* Toggle Dual Comparison */}
          <button
            type="button"
            onClick={() => setIsCompareActive(!isCompareActive)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
              isCompareActive
                ? 'bg-indigo-600 text-white border-indigo-400 shadow'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'
            }`}
          >
            <ArrowRightLeft className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{isCompareActive ? 'Comparing 2 Elements' : 'Compare Second Element'}</span>
          </button>

          {/* Element 2 Selector if comparison active */}
          {isCompareActive && (
            <div className="flex items-center gap-2 bg-indigo-950/50 px-3 py-1.5 rounded-xl border border-indigo-800/60">
              <span className="text-xs font-medium text-indigo-300">Compare with:</span>
              <select
                value={compareZ || 2}
                onChange={(e) => setCompareZ(Number(e.target.value))}
                aria-label="Select comparison element"
                className="bg-transparent text-indigo-200 font-bold text-xs focus:outline-none cursor-pointer"
              >
                {allElements.map((el) => (
                  <option key={el.atomicNumber} value={el.atomicNumber} className="bg-slate-900 text-slate-100">
                    {el.atomicNumber}. {getLocalizedElementName(el.atomicNumber, lang)} ({el.symbol})
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Right Action Controls */}
        <div className="flex items-center gap-2">
          {/* Mode Switch (Emission vs Absorption) */}
          <div className="flex items-center p-1 rounded-xl bg-slate-800 border border-slate-700 text-xs">
            <button
              type="button"
              onClick={() => setSpectrumMode('emission')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                spectrumMode === 'emission'
                  ? 'bg-cyan-500/25 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {t('spectra.spectrograph.emission', 'Emission')}
            </button>
            <button
              type="button"
              onClick={() => setSpectrumMode('absorption')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                spectrumMode === 'absorption'
                  ? 'bg-amber-500/25 text-amber-300 border border-amber-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {t('spectra.spectrograph.absorption', 'Absorption')}
            </button>
          </div>

          {/* Hear Sonification Button */}
          <button
            type="button"
            onClick={() => handlePlaySound(lines1)}
            disabled={isPlayingSound}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 border border-cyan-500/50 shadow transition-all active:scale-95 disabled:opacity-50"
          >
            <Sparkles className={`w-3.5 h-3.5 ${isPlayingSound ? 'animate-spin' : ''}`} aria-hidden="true" />
            <span>{isPlayingSound ? t('spectra.soundPlaying', 'Playing...') : t('spectra.soundButton', 'Hear Element')}</span>
          </button>

          {/* Mute button */}
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

      {/* Main Optical Spectrograph Chamber */}
      <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-6">
        {/* Title & Stats */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-3">
            {onSelectElementById ? (
              <button
                type="button"
                onClick={() => onSelectElementById(element1.atomicNumber)}
                title="Inspect element in table"
                className="w-8 h-8 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 flex items-center justify-center font-bold text-cyan-300 font-mono text-sm transition-colors cursor-pointer"
              >
                {element1.symbol}
              </button>
            ) : (
              <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center font-bold text-cyan-300 font-mono text-sm">
                {element1.symbol}
              </div>
            )}
            <div>
              <h4 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <span>{getLocalizedElementName(element1.atomicNumber, lang)} ({element1.name})</span>
                <span className="text-xs font-normal text-slate-400 font-mono">Z = {element1.atomicNumber}</span>
              </h4>
              <p className="text-[11px] text-slate-400">
                {lines1.length} visible spectral emission lines between 380 nm and 750 nm
              </p>
            </div>
          </div>

          {/* Intensity filter slider */}
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Filter Threshold:</span>
            <input
              type="range"
              min={0}
              max={80}
              value={minIntensity}
              onChange={(e) => setMinIntensity(Number(e.target.value))}
              aria-label="Filter lines by minimum intensity"
              className="w-24 accent-cyan-400 cursor-pointer"
            />
            <span className="font-mono text-slate-300 w-8">{minIntensity}%</span>
          </div>
        </div>

        {/* Primary Element Spectrograph Bar */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-cyan-300 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" aria-hidden="true" />
              {element1.name} ({element1.symbol}) Spectrum
            </span>
            <span className="text-[10px] text-slate-400 font-mono">
              Mode: {spectrumMode === 'emission' ? 'Dark Absorption Chamber' : 'Continuous Fraunhofer Dispersion'}
            </span>
          </div>

          <div
            ref={spectrographRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`relative w-full h-20 sm:h-24 rounded-xl border border-slate-700/80 shadow-inner overflow-hidden cursor-crosshair select-none ${
              spectrumMode === 'emission' ? 'bg-black' : 'bg-gradient-to-r from-violet-600 via-green-400 to-red-600'
            }`}
          >
            {/* Spectral Lines for Element 1 */}
            {lines1.map((line, idx) => {
              const leftPercent = ((line.wavelength - 380) / (750 - 380)) * 100;
              const rgb = wavelengthToRGB(line.wavelength);
              const isHovered = hoveredWavelength && Math.abs(hoveredWavelength - line.wavelength) < 1.5;

              return (
                <div
                  key={`${line.wavelength}-${idx}`}
                  style={{
                    left: `${leftPercent}%`,
                    backgroundColor: spectrumMode === 'emission' ? rgb.hex : '#000000',
                    width: spectrumMode === 'emission' ? `${Math.max(2, (line.intensity / 100) * 4)}px` : '2.5px',
                    boxShadow:
                      spectrumMode === 'emission'
                        ? `0 0 ${isHovered ? '12px' : '6px'} ${rgb.hex}`
                        : 'none',
                    opacity: spectrumMode === 'emission' ? Math.max(0.4, line.intensity / 100) : 0.95,
                  }}
                  className={`absolute top-0 bottom-0 pointer-events-none transition-transform ${
                    isHovered ? 'scale-y-110 z-20 brightness-150' : 'z-10'
                  }`}
                  title={`${line.wavelength} nm (${line.label || ''})`}
                />
              );
            })}

            {/* Scrubber reticle line */}
            {hoverPhysics && (
              <div
                style={{
                  left: `${((hoverPhysics.wavelength - 380) / (750 - 380)) * 100}%`,
                }}
                className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg shadow-cyan-400 z-30 pointer-events-none"
              />
            )}
          </div>
        </div>

        {/* Optional Comparison Spectrograph Bar */}
        {isCompareActive && element2 && (
          <div className="space-y-1.5 pt-2 border-t border-slate-800">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-indigo-300 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" aria-hidden="true" />
                {element2.name} ({element2.symbol}) Comparison Spectrum
              </span>
              <button
                type="button"
                onClick={() => handlePlaySound(lines2)}
                className="text-[11px] text-indigo-300 hover:text-indigo-200 underline font-semibold"
              >
                Hear {element2.symbol} Sound
              </button>
            </div>

            <div
              className={`relative w-full h-16 sm:h-20 rounded-xl border border-indigo-900/80 shadow-inner overflow-hidden select-none ${
                spectrumMode === 'emission' ? 'bg-black' : 'bg-gradient-to-r from-violet-600 via-green-400 to-red-600'
              }`}
            >
              {lines2.map((line, idx) => {
                const leftPercent = ((line.wavelength - 380) / (750 - 380)) * 100;
                const rgb = wavelengthToRGB(line.wavelength);

                return (
                  <div
                    key={`comp-${line.wavelength}-${idx}`}
                    style={{
                      left: `${leftPercent}%`,
                      backgroundColor: spectrumMode === 'emission' ? rgb.hex : '#000000',
                      width: spectrumMode === 'emission' ? `${Math.max(2, (line.intensity / 100) * 4)}px` : '2.5px',
                      boxShadow: spectrumMode === 'emission' ? `0 0 6px ${rgb.hex}` : 'none',
                      opacity: spectrumMode === 'emission' ? Math.max(0.4, line.intensity / 100) : 0.95,
                    }}
                    className="absolute top-0 bottom-0 pointer-events-none z-10"
                    title={`${line.wavelength} nm`}
                  />
                );
              })}
            </div>
          </div>
        )}

        {/* Wavelength Scale Axis (380 nm - 750 nm) */}
        <div className="space-y-1">
          <div className="relative w-full h-5 text-[10px] text-slate-400 font-mono">
            {[380, 400, 450, 500, 550, 600, 650, 700, 750].map((wl) => {
              const leftPercent = ((wl - 380) / (750 - 380)) * 100;
              return (
                <div
                  key={wl}
                  style={{ left: `${leftPercent}%` }}
                  className="absolute -translate-x-1/2 flex flex-col items-center"
                >
                  <div className="w-px h-1.5 bg-slate-600 mb-0.5" />
                  <span>{wl} nm</span>
                </div>
              );
            })}
          </div>
          <div className="flex justify-between text-[10px] text-slate-400 uppercase tracking-widest font-mono pt-1">
            <span className="text-violet-400">Near Ultraviolet (380 nm)</span>
            <span className="text-cyan-400">Blue-Green (500 nm)</span>
            <span className="text-amber-400">Yellow-Orange (590 nm)</span>
            <span className="text-rose-400">Near Infrared (750 nm)</span>
          </div>
        </div>

        {/* Live Scrubber Inspection Data Box */}
        {hoverPhysics ? (
          <div className="flex flex-wrap items-center justify-between gap-4 p-3.5 rounded-xl bg-slate-800/90 border border-slate-700 font-mono text-xs">
            <div className="flex items-center gap-3">
              <span
                className="w-4 h-4 rounded-full shadow-lg"
                style={{ backgroundColor: hoverPhysics.hex }}
              />
              <span className="font-bold text-slate-100 text-sm">
                λ = {hoverPhysics.wavelength} nm ({hoverPhysics.wavelength * 10} Å)
              </span>
            </div>

            <div className="flex items-center gap-4 text-slate-300">
              <div>
                <span className="text-slate-400 text-[10px] block">FREQUENCY</span>
                <span className="text-cyan-300 font-bold">{hoverPhysics.freqTHz} THz</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">PHOTON ENERGY</span>
                <span className="text-amber-300 font-bold">{hoverPhysics.energyEv} eV</span>
              </div>
              {hoverPhysics.closest && (
                <div className="border-l border-slate-700 pl-3">
                  <span className="text-slate-400 text-[10px] block">ATOMIC LINE MATCH</span>
                  <span className="text-emerald-300 font-bold">
                    {hoverPhysics.closest.wavelength} nm ({hoverPhysics.closest.label || hoverPhysics.closest.transition || 'Line'})
                  </span>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/60 text-center text-xs text-slate-400 font-mono">
            {t('spectra.spectrograph.hoverTip', 'Hover over the spectrograph to inspect exact photon energy, wavelength, and frequency')}
          </div>
        )}
      </div>

      {/* Prominent Spectral Lines List Table */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs shadow-lg space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-bold text-slate-200 text-sm">
            Prominent Visible Lines for {element1.name} ({lines1.length} lines)
          </span>
          <span className="text-[11px] text-slate-400 font-mono">NIST Atomic Spectral Database</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {lines1.map((line, idx) => {
            const rgb = wavelengthToRGB(line.wavelength);
            return (
              <button
                key={`line-${line.wavelength}-${idx}`}
                type="button"
                onClick={() => elementSynthesizer.playSingleLine(line.wavelength)}
                className="flex items-center justify-between p-2 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/70 hover:border-cyan-400/50 transition-all text-left group"
                title="Click to play optical frequency tone"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0 group-hover:scale-125 transition-transform"
                    style={{ backgroundColor: rgb.hex }}
                  />
                  <div>
                    <div className="font-mono font-bold text-slate-200 text-xs">{line.wavelength} nm</div>
                    <div className="text-[10px] text-slate-400 truncate max-w-[80px]">
                      {line.label || line.transition || `Int: ${line.intensity}%`}
                    </div>
                  </div>
                </div>
                <Volume2 className="w-3 h-3 text-slate-500 group-hover:text-cyan-300 shrink-0" aria-hidden="true" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
