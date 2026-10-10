import React, { useState } from 'react';
import { FlameTestView } from './FlameTestView';
import { SpectrographView } from './SpectrographView';
import { BohrTransitionsView } from './BohrTransitionsView';
import { getElementById } from '../../data/elements';
import type { ChemicalElement } from '../../types/element';
import { useI18n } from '../../utils/i18n';
import {
  Flame,
  Activity,
  Zap,
} from 'lucide-react';

interface SpectraLabProps {
  selectedElement?: ChemicalElement;
  onSelectElement?: (el: ChemicalElement) => void;
  isDarkTheme?: boolean;
}

type SpectraSubView = 'flame' | 'spectrograph' | 'bohr';

export const SpectraLab: React.FC<SpectraLabProps> = ({
  selectedElement,
  onSelectElement,
}) => {
  const [activeSubView, setActiveSubView] = useState<SpectraSubView>(() => {
    try {
      const param = new URLSearchParams(window.location.search).get('spectraView');
      if (param === 'spectrograph' || param === 'bohr' || param === 'flame') {
        return param;
      }
    } catch {
      // Ignore in non-browser context
    }
    return 'flame';
  });

  const { t } = useI18n();
  const initialZ = selectedElement?.atomicNumber || 11;

  return (
    <div className="space-y-6">
      {/* Flagship Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-md">
        <div className="flex items-center gap-3.5">
          <div className="p-3 rounded-2xl bg-gradient-to-tr from-rose-500/20 via-amber-500/20 to-cyan-500/20 text-amber-300 border border-amber-500/30 shadow-inner">
            <Flame className="w-6 h-6 animate-pulse" aria-hidden="true" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-100 tracking-tight flex items-center gap-2">
              <span>{t('spectra.tabTitle', 'Spectra & Flame Lab')}</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase tracking-widest font-mono">
                Atomic Optics & Quantum Physics
              </span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {t('spectra.subtitle', 'Interactive optical emission spectrograph, 3D Bunsen burner flame test, and quantum Rydberg jumps')}
            </p>
          </div>
        </div>

        {/* View Mode Switcher Pills */}
        <div className="flex items-center p-1 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs shadow-inner">
          <button
            type="button"
            onClick={() => setActiveSubView('flame')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl font-bold transition-all ${
              activeSubView === 'flame'
                ? 'bg-amber-500/25 text-amber-300 border border-amber-500/50 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Flame className="w-4 h-4" aria-hidden="true" />
            <span>{t('spectra.views.flameTest', 'Flame Test')}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSubView('spectrograph')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl font-bold transition-all ${
              activeSubView === 'spectrograph'
                ? 'bg-cyan-500/25 text-cyan-300 border border-cyan-500/50 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Activity className="w-4 h-4" aria-hidden="true" />
            <span>{t('spectra.views.spectrograph', 'Spectrograph & Sound')}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSubView('bohr')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl font-bold transition-all ${
              activeSubView === 'bohr'
                ? 'bg-violet-500/25 text-violet-300 border border-violet-500/50 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Zap className="w-4 h-4" aria-hidden="true" />
            <span>{t('spectra.views.bohr', 'Quantum Ladder')}</span>
          </button>
        </div>
      </div>

      {/* Render Active Sub-View */}
      {activeSubView === 'flame' && (
        <FlameTestView
          initialElementZ={initialZ}
          onSelectElementById={(z) => {
            if (onSelectElement) {
              const el = getElementById(z);
              if (el) onSelectElement(el);
            }
          }}
        />
      )}

      {activeSubView === 'spectrograph' && (
        <SpectrographView
          initialElementZ={initialZ}
          onSelectElementById={(z) => {
            if (onSelectElement) {
              const el = getElementById(z);
              if (el) onSelectElement(el);
            }
          }}
        />
      )}

      {activeSubView === 'bohr' && <BohrTransitionsView />}
    </div>
  );
};
