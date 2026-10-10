import React, { useEffect, useRef } from 'react';
import type { ElementBlock, PeriodicTrendKey, TemperatureUnit } from '../../types/element';
import {
  Thermometer,
  Clock,
  Layers,
  Shapes,
  Radio,
  Sparkles,
  Play,
  Pause,
  RotateCcw,
} from 'lucide-react';
import {
  TEMPERATURE_PRESETS,
  DISCOVERY_ERAS,
  getEraForYear,
  type TableLensKey,
} from './lenses';
import { periodicTrends } from '../../data/trends';
import { useI18n } from '../../utils/i18n';
import { formatTemperature } from '../../utils/temperature';

export interface LensState {
  lens: TableLensKey;
  temperatureKelvin: number;
  isTempPlaying: boolean;
  discoveryYear: number;
  isDiscoveryPlaying: boolean;
  activeTrend: PeriodicTrendKey | null;
  highlightedBlock: ElementBlock | null;
  originFilter: 'all' | 'natural' | 'synthetic' | 'radioactive' | null;
}

interface TableLensesProps {
  state: LensState;
  onChange: (updater: (prev: LensState) => LensState) => void;
  tempCounts: { solid: number; liquid: number; gas: number; unknown: number };
  discoveredCount: number;
  latestDiscoveredNames: string[];
  tempUnit: TemperatureUnit;
}

export const TableLenses: React.FC<TableLensesProps> = ({
  state,
  onChange,
  tempCounts,
  discoveredCount,
  latestDiscoveredNames,
  tempUnit,
}) => {
  const { t, lang } = useI18n();
  const tempTimerRef = useRef<number | null>(null);
  const discoveryTimerRef = useRef<number | null>(null);

  // Temperature playback loop
  useEffect(() => {
    if (!state.isTempPlaying) {
      if (tempTimerRef.current) clearInterval(tempTimerRef.current);
      return;
    }
    tempTimerRef.current = window.setInterval(() => {
      onChange((prev) => {
        const next = prev.temperatureKelvin + (prev.temperatureKelvin < 1000 ? 50 : 150);
        if (next > 6000) {
          return { ...prev, temperatureKelvin: 0, isTempPlaying: false };
        }
        return { ...prev, temperatureKelvin: next };
      });
    }, 100);
    return () => {
      if (tempTimerRef.current) clearInterval(tempTimerRef.current);
    };
  }, [state.isTempPlaying, onChange]);

  // Discovery playback loop
  useEffect(() => {
    if (!state.isDiscoveryPlaying) {
      if (discoveryTimerRef.current) clearInterval(discoveryTimerRef.current);
      return;
    }
    discoveryTimerRef.current = window.setInterval(() => {
      onChange((prev) => {
        const step = prev.discoveryYear < 1700 ? 100 : prev.discoveryYear < 1900 ? 5 : 2;
        const next = prev.discoveryYear + step;
        if (next > 2020) {
          return { ...prev, discoveryYear: 2020, isDiscoveryPlaying: false };
        }
        return { ...prev, discoveryYear: next };
      });
    }, 120);
    return () => {
      if (discoveryTimerRef.current) clearInterval(discoveryTimerRef.current);
    };
  }, [state.isDiscoveryPlaying, onChange]);

  const setLens = (lens: TableLensKey) => {
    onChange((prev) => ({
      ...prev,
      lens,
      isTempPlaying: false,
      isDiscoveryPlaying: false,
    }));
  };

  const currentEra = getEraForYear(state.discoveryYear);

  return (
    <div className="flex flex-col gap-3 p-3.5 sm:p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl backdrop-blur-sm text-xs">
      {/* Lens Mode Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" aria-hidden="true" />
          <span className="font-bold text-slate-200 text-sm">{t('lenses.title', 'Interactive Lenses')}</span>
        </div>

        {/* Lens Selector Buttons */}
        <div className="flex flex-wrap items-center gap-1 sm:gap-1.5" role="radiogroup" aria-label={t('lenses.title')}>
          <button
            type="button"
            role="radio"
            aria-checked={state.lens === 'category'}
            onClick={() => setLens('category')}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border font-semibold transition-all ${
              state.lens === 'category'
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-md ring-1 ring-cyan-400'
                : 'bg-slate-800/60 text-slate-300 border-slate-700 hover:text-slate-100 hover:border-slate-600'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-cyan-400" aria-hidden="true" />
            <span>{t('lenses.modes.category', 'Categories')}</span>
          </button>

          <button
            type="button"
            role="radio"
            aria-checked={state.lens === 'temperature'}
            onClick={() => setLens('temperature')}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border font-semibold transition-all ${
              state.lens === 'temperature'
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-md ring-1 ring-amber-400'
                : 'bg-slate-800/60 text-slate-300 border-slate-700 hover:text-slate-100 hover:border-slate-600'
            }`}
          >
            <Thermometer className="w-3.5 h-3.5 text-amber-400" aria-hidden="true" />
            <span>{t('lenses.modes.temperature', 'State @ Temp')}</span>
          </button>

          <button
            type="button"
            role="radio"
            aria-checked={state.lens === 'discovery'}
            onClick={() => setLens('discovery')}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border font-semibold transition-all ${
              state.lens === 'discovery'
                ? 'bg-purple-500/20 text-purple-300 border-purple-500/50 shadow-md ring-1 ring-purple-400'
                : 'bg-slate-800/60 text-slate-300 border-slate-700 hover:text-slate-100 hover:border-slate-600'
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-purple-400" aria-hidden="true" />
            <span>{t('lenses.modes.discovery', 'Timeline')}</span>
          </button>

          <button
            type="button"
            role="radio"
            aria-checked={state.lens === 'block'}
            onClick={() => setLens('block')}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border font-semibold transition-all ${
              state.lens === 'block'
                ? 'bg-blue-500/20 text-blue-300 border-blue-500/50 shadow-md ring-1 ring-blue-400'
                : 'bg-slate-800/60 text-slate-300 border-slate-700 hover:text-slate-100 hover:border-slate-600'
            }`}
          >
            <Shapes className="w-3.5 h-3.5 text-blue-400" aria-hidden="true" />
            <span>{t('lenses.modes.block', 'Blocks')}</span>
          </button>

          <button
            type="button"
            role="radio"
            aria-checked={state.lens === 'origin'}
            onClick={() => setLens('origin')}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border font-semibold transition-all ${
              state.lens === 'origin'
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-md ring-1 ring-emerald-400'
                : 'bg-slate-800/60 text-slate-300 border-slate-700 hover:text-slate-100 hover:border-slate-600'
            }`}
          >
            <Radio className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
            <span>{t('lenses.modes.origin', 'Origin & Nuclear')}</span>
          </button>

          <button
            type="button"
            role="radio"
            aria-checked={state.lens === 'trend'}
            onClick={() => setLens('trend')}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border font-semibold transition-all ${
              state.lens === 'trend'
                ? 'bg-pink-500/20 text-pink-300 border-pink-500/50 shadow-md ring-1 ring-pink-400'
                : 'bg-slate-800/60 text-slate-300 border-slate-700 hover:text-slate-100 hover:border-slate-600'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-pink-400" aria-hidden="true" />
            <span>{t('lenses.modes.trend', 'Trends')}</span>
          </button>
        </div>
      </div>

      {/* Sub-Panel: Temperature Lens Controls */}
      {state.lens === 'temperature' && (
        <div className="flex flex-col gap-3 pt-1 animate-fade-in">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onChange((prev) => ({ ...prev, isTempPlaying: !prev.isTempPlaying }))}
                aria-label={state.isTempPlaying ? t('lenses.temp.pause') : t('lenses.temp.play')}
                className="p-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition-transform hover:scale-105 shadow-md flex items-center gap-1.5"
              >
                {state.isTempPlaying ? (
                  <>
                    <Pause className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
                    <span className="text-[11px]">{t('lenses.temp.pause', 'Pause')}</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
                    <span className="text-[11px]">{t('lenses.temp.play', 'Sweep Temp')}</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => onChange((prev) => ({ ...prev, temperatureKelvin: 298, isTempPlaying: false }))}
                aria-label="Reset temperature to 298 K"
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
                title="Reset to room temperature (298 K)"
              >
                <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              </button>

              <div className="flex items-baseline gap-1.5 font-mono">
                <span className="text-lg font-extrabold text-amber-300">
                  {formatTemperature(state.temperatureKelvin, tempUnit)}
                </span>
                <span className="text-slate-400 text-[11px]">
                  ({state.temperatureKelvin} K)
                </span>
              </div>
            </div>

            {/* Live counts badge */}
            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="px-2 py-0.5 rounded-lg bg-blue-500/20 text-blue-300 border border-blue-500/40">
                🧊 {tempCounts.solid} {t('lenses.temp.solid', 'Solid')}
              </span>
              <span className="px-2 py-0.5 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/40">
                💧 {tempCounts.liquid} {t('lenses.temp.liquid', 'Liquid')}
              </span>
              <span className="px-2 py-0.5 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/40">
                💨 {tempCounts.gas} {t('lenses.temp.gas', 'Gas')}
              </span>
            </div>
          </div>

          {/* Slider */}
          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] text-slate-400 w-8">0 K</span>
            <input
              type="range"
              min={0}
              max={6000}
              step={25}
              value={state.temperatureKelvin}
              onChange={(e) =>
                onChange((prev) => ({
                  ...prev,
                  temperatureKelvin: Number(e.target.value),
                  isTempPlaying: false,
                }))
              }
              aria-label={t('lenses.temp.sliderLabel', 'Simulation Temperature')}
              aria-valuetext={`${state.temperatureKelvin} Kelvin`}
              className="flex-1 accent-amber-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
            />
            <span className="font-mono text-[11px] text-slate-400 w-14 text-right">6000 K</span>
          </div>

          {/* Presets Chips */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-slate-400 font-medium mr-1">{t('lenses.temp.presets', 'Presets:')}</span>
            {TEMPERATURE_PRESETS.map((p) => {
              const isActive = Math.abs(state.temperatureKelvin - p.kelvin) < 20;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => onChange((prev) => ({ ...prev, temperatureKelvin: p.kelvin, isTempPlaying: false }))}
                  className={`px-2 py-0.5 rounded-lg border font-mono text-[11px] transition-all ${
                    isActive
                      ? 'bg-amber-500/20 text-amber-200 border-amber-400 ring-1 ring-amber-400 font-bold'
                      : 'bg-slate-800/50 text-slate-300 border-slate-700/80 hover:bg-slate-800 hover:text-slate-100'
                  }`}
                  title={lang === 'id' ? p.descriptionId : p.descriptionEn}
                >
                  {lang === 'id' ? p.labelId : p.labelEn}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Sub-Panel: Discovery Timeline Controls */}
      {state.lens === 'discovery' && (
        <div className="flex flex-col gap-3 pt-1 animate-fade-in">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onChange((prev) => ({ ...prev, isDiscoveryPlaying: !prev.isDiscoveryPlaying }))}
                aria-label={state.isDiscoveryPlaying ? t('lenses.discovery.pause') : t('lenses.discovery.play')}
                className="p-2 rounded-xl bg-purple-500 hover:bg-purple-400 text-slate-950 font-bold transition-transform hover:scale-105 shadow-md flex items-center gap-1.5"
              >
                {state.isDiscoveryPlaying ? (
                  <>
                    <Pause className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
                    <span className="text-[11px]">{t('lenses.discovery.pause', 'Pause')}</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
                    <span className="text-[11px]">{t('lenses.discovery.play', 'Animate History')}</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => onChange((prev) => ({ ...prev, discoveryYear: 0, isDiscoveryPlaying: false }))}
                aria-label="Reset to Ancient times"
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
                title="Reset to Ancient"
              >
                <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              </button>

              <div className="flex items-baseline gap-2 font-mono">
                <span className="text-lg font-extrabold text-purple-300">
                  {state.discoveryYear === 0 ? t('lenses.discovery.ancient', 'Ancient (Prehistory)') : `Year ${state.discoveryYear}`}
                </span>
                <span className="text-slate-400 text-[11px]">
                  ({discoveredCount} / 118 known)
                </span>
              </div>
            </div>

            {/* Current Era Badge */}
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-purple-500/15 border border-purple-500/40 text-purple-200">
              <span className="font-bold">{lang === 'id' ? currentEra.nameId : currentEra.nameEn}</span>
            </div>
          </div>

          {/* Slider */}
          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] text-slate-400 w-12">{t('lenses.discovery.ancient', 'Ancient')}</span>
            <input
              type="range"
              min={0}
              max={2020}
              step={1}
              value={state.discoveryYear}
              onChange={(e) =>
                onChange((prev) => ({
                  ...prev,
                  discoveryYear: Number(e.target.value),
                  isDiscoveryPlaying: false,
                }))
              }
              aria-label={t('lenses.discovery.sliderLabel', 'Discovery Year')}
              aria-valuetext={state.discoveryYear === 0 ? 'Ancient' : `Year ${state.discoveryYear}`}
              className="flex-1 accent-purple-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
            />
            <span className="font-mono text-[11px] text-slate-400 w-10 text-right">2020</span>
          </div>

          {/* Era Pills + Latest Discovery info */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
            <div className="flex flex-wrap items-center gap-1">
              {DISCOVERY_ERAS.map((era) => {
                const isSelected = currentEra.id === era.id;
                return (
                  <button
                    key={era.id}
                    type="button"
                    onClick={() => onChange((prev) => ({ ...prev, discoveryYear: era.endYear, isDiscoveryPlaying: false }))}
                    className={`px-2 py-0.5 rounded-lg border text-[11px] transition-all ${
                      isSelected
                        ? 'bg-purple-500/25 text-purple-200 border-purple-400 ring-1 ring-purple-400 font-bold'
                        : 'bg-slate-800/50 text-slate-400 border-slate-700/80 hover:bg-slate-800 hover:text-slate-200'
                    }`}
                  >
                    {lang === 'id' ? era.nameId : era.nameEn}
                  </button>
                );
              })}
            </div>

            {latestDiscoveredNames.length > 0 && (
              <div className="text-[11px] text-slate-300">
                <span className="text-slate-400 mr-1">{t('lenses.discovery.latestTitle', 'Latest:')}</span>
                <span className="font-bold text-purple-300">{latestDiscoveredNames.slice(0, 4).join(', ')}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Sub-Panel: Electron Blocks */}
      {state.lens === 'block' && (
        <div className="flex flex-wrap items-center gap-2 pt-1 animate-fade-in">
          {(['s', 'p', 'd', 'f'] as ElementBlock[]).map((block) => {
            const isActive = state.highlightedBlock === block;
            const blockColors: Record<ElementBlock, { bg: string; border: string; text: string }> = {
              s: { bg: 'bg-red-500/20', border: 'border-red-500', text: 'text-red-300' },
              p: { bg: 'bg-emerald-500/20', border: 'border-emerald-500', text: 'text-emerald-300' },
              d: { bg: 'bg-blue-500/20', border: 'border-blue-500', text: 'text-blue-300' },
              f: { bg: 'bg-fuchsia-500/20', border: 'border-fuchsia-500', text: 'text-fuchsia-300' },
            };
            const c = blockColors[block];
            return (
              <button
                key={block}
                type="button"
                onClick={() =>
                  onChange((prev) => ({
                    ...prev,
                    highlightedBlock: prev.highlightedBlock === block ? null : block,
                  }))
                }
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all ${c.bg} ${
                  isActive ? `ring-2 ring-cyan-400 font-bold scale-105 shadow-md` : 'hover:scale-102'
                }`}
                style={{ borderColor: isActive ? '#38bdf8' : undefined }}
              >
                <span className="font-mono font-black text-sm uppercase">{block}</span>
                <span className={`text-[11px] ${c.text}`}>{t(`lenses.block.${block}`)}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Sub-Panel: Origin & Radioactivity */}
      {state.lens === 'origin' && (
        <div className="flex flex-wrap items-center gap-2 pt-1 animate-fade-in">
          <button
            type="button"
            onClick={() =>
              onChange((prev) => ({
                ...prev,
                originFilter: prev.originFilter === 'radioactive' ? null : 'radioactive',
              }))
            }
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all bg-amber-500/15 border-amber-500/50 text-amber-300 ${
              state.originFilter === 'radioactive' ? 'ring-2 ring-amber-400 font-bold shadow-md' : 'hover:bg-amber-500/25'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" aria-hidden="true" />
            <Radio className="w-3.5 h-3.5 text-amber-400" aria-hidden="true" />
            <span>{t('lenses.origin.radioactive', 'Radioactive Elements (38)')}</span>
          </button>

          <button
            type="button"
            onClick={() =>
              onChange((prev) => ({
                ...prev,
                originFilter: prev.originFilter === 'synthetic' ? null : 'synthetic',
              }))
            }
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all bg-fuchsia-500/15 border-fuchsia-500/50 text-fuchsia-300 ${
              state.originFilter === 'synthetic' ? 'ring-2 ring-fuchsia-400 font-bold shadow-md' : 'hover:bg-fuchsia-500/25'
            }`}
          >
            <span>⚗️ {t('lenses.origin.synthetic', 'Synthetic / Particle Colliders (24)')}</span>
          </button>

          <button
            type="button"
            onClick={() =>
              onChange((prev) => ({
                ...prev,
                originFilter: prev.originFilter === 'natural' ? null : 'natural',
              }))
            }
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all bg-emerald-500/15 border-emerald-500/50 text-emerald-300 ${
              state.originFilter === 'natural' ? 'ring-2 ring-emerald-400 font-bold shadow-md' : 'hover:bg-emerald-500/25'
            }`}
          >
            <span>🌍 {t('lenses.origin.natural', 'Naturally Occurring (90)')}</span>
          </button>
        </div>
      )}

      {/* Sub-Panel: Trend Quick-Select */}
      {state.lens === 'trend' && (
        <div className="flex flex-wrap items-center gap-1.5 pt-1 animate-fade-in">
          {Object.keys(periodicTrends).map((tk) => {
            const key = tk as PeriodicTrendKey;
            const def = periodicTrends[key];
            const isSelected = state.activeTrend === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() =>
                  onChange((prev) => ({
                    ...prev,
                    activeTrend: key,
                  }))
                }
                className={`px-2.5 py-1 rounded-xl border text-[11px] font-medium transition-all ${
                  isSelected
                    ? 'bg-pink-500/25 text-pink-200 border-pink-400 ring-1 ring-pink-400 font-bold shadow'
                    : 'bg-slate-800/60 text-slate-300 border-slate-700 hover:text-slate-100 hover:bg-slate-800'
                }`}
              >
                {t(`trends.${key}.name`, def.label)} ({def.unit})
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
