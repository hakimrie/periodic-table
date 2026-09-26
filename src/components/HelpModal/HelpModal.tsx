import React from 'react';
import { X, BookOpen, Info, Keyboard } from 'lucide-react';
import { useI18n } from '../../utils/i18n';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  const { t } = useI18n();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl text-slate-100 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300 font-bold">
              ?
            </div>
            <div>
              <h2 className="text-xl font-bold">{t('help.title', 'Interactive Periodic Table Guide')}</h2>
              <p className="text-xs text-slate-400">{t('help.subtitle', 'Everything you need to master elements and atomic structure')}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Section 1: Bohr Model vs Quantum Mechanics */}
        <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-800/40 space-y-2 text-xs">
          <h3 className="text-sm font-semibold text-cyan-300 flex items-center gap-2">
            <Info className="w-4 h-4 text-cyan-400" />
            <span>{t('help.accuracyTitle', 'Important Scientific Accuracy Note: Bohr vs Quantum Orbitals')}</span>
          </h3>
          <p className="text-slate-300 leading-relaxed">
            {t('help.bohrPara1')}
          </p>
          <p className="text-slate-300 leading-relaxed">
            {t('help.bohrPara2')}
          </p>
        </div>

        {/* Section 2: Educational Modes */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span>{t('help.levelsTitle', 'Educational Levels')}</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <strong className="text-cyan-400 block mb-1">{t('app.highSchoolMode', 'High School')}</strong>
              <p className="text-slate-400 leading-tight">{t('help.highSchoolDesc')}</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <strong className="text-pink-400 block mb-1">{t('app.universityMode', 'University')}</strong>
              <p className="text-slate-400 leading-tight">{t('help.universityDesc')}</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <strong className="text-emerald-400 block mb-1">{t('app.quickRefMode', 'Quick Reference')}</strong>
              <p className="text-slate-400 leading-tight">{t('help.quickRefDesc')}</p>
            </div>
          </div>
        </div>

        {/* Section 3: Keyboard Shortcuts */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
            <Keyboard className="w-4 h-4 text-purple-400" />
            <span>{t('help.keyboardTitle', 'Keyboard Navigation')}</span>
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
            <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800 flex items-center justify-between">
              <span className="text-slate-400">{t('help.nextEl', 'Next Element:')}</span>
              <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 border border-slate-700">Right Arrow</kbd>
            </div>
            <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800 flex items-center justify-between">
              <span className="text-slate-400">{t('help.prevEl', 'Prev Element:')}</span>
              <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 border border-slate-700">Left Arrow</kbd>
            </div>
            <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800 flex items-center justify-between">
              <span className="text-slate-400">{t('help.periodUp', 'Period Up:')}</span>
              <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 border border-slate-700">Up Arrow</kbd>
            </div>
            <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800 flex items-center justify-between">
              <span className="text-slate-400">{t('help.periodDown', 'Period Down:')}</span>
              <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 border border-slate-700">Down Arrow</kbd>
            </div>
          </div>
        </div>

        {/* Section 4: Data Sources */}
        <div className="space-y-2 text-xs text-slate-400 border-t border-slate-800 pt-4">
          <strong className="text-slate-300 block">{t('element.sources', 'Scientific sources')}:</strong>
          <p className="leading-relaxed">
            Data verified against IUPAC (International Union of Pure and Applied Chemistry 2024 Release), NIST Physical Measurement Laboratory, WebElements, and PubChem database.
          </p>
        </div>
      </div>
    </div>
  );
};
