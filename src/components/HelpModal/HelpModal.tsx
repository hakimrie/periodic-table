import React, { useEffect, useRef } from 'react';
import { X, BookOpen, Info, Keyboard } from 'lucide-react';
import { useI18n } from '../../utils/i18n';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  const { t } = useI18n();
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      previouslyFocusedElementRef.current = document.activeElement as HTMLElement | null;

      // Focus close button on open
      requestAnimationFrame(() => {
        closeButtonRef.current?.focus();
      });

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          e.preventDefault();
          onClose();
          return;
        }

        if (e.key === 'Tab' && modalRef.current) {
          const focusable = modalRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          if (focusable.length === 0) return;

          const first = focusable[0];
          const last = focusable[focusable.length - 1];

          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        if (previouslyFocusedElementRef.current) {
          previouslyFocusedElementRef.current.focus();
        }
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="help-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in"
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl text-slate-100 space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300 font-bold" aria-hidden="true">
              ?
            </div>
            <div>
              <h2 id="help-modal-title" className="text-xl font-bold">{t('help.title', 'Interactive Periodic Table Guide')}</h2>
              <p className="text-xs text-slate-300">{t('help.subtitle', 'Everything you need to master elements and atomic structure')}</p>
            </div>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label={t('app.closeDialog', 'Close guide')}
            className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-slate-100 focus-visible:ring-2 focus-visible:ring-cyan-400 transition-colors"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Section 1: Bohr Model vs Quantum Mechanics */}
        <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-800/40 space-y-2 text-xs">
          <h3 className="text-sm font-semibold text-cyan-300 flex items-center gap-2">
            <Info className="w-4 h-4 text-cyan-400" aria-hidden="true" />
            <span>{t('help.accuracyTitle', 'Important Scientific Accuracy Note: Bohr vs Quantum Orbitals')}</span>
          </h3>
          <p className="text-slate-200 leading-relaxed">
            {t('help.bohrPara1')}
          </p>
          <p className="text-slate-200 leading-relaxed">
            {t('help.bohrPara2')}
          </p>
        </div>

        {/* Section 2: Educational Modes */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-amber-400" aria-hidden="true" />
            <span>{t('help.levelsTitle', 'Educational Levels')}</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <strong className="text-cyan-300 block mb-1">{t('app.highSchoolMode', 'High School')}</strong>
              <p className="text-slate-300 leading-tight">{t('help.highSchoolDesc')}</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <strong className="text-pink-300 block mb-1">{t('app.universityMode', 'University')}</strong>
              <p className="text-slate-300 leading-tight">{t('help.universityDesc')}</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <strong className="text-emerald-300 block mb-1">{t('app.quickRefMode', 'Quick Reference')}</strong>
              <p className="text-slate-300 leading-tight">{t('help.quickRefDesc')}</p>
            </div>
          </div>
        </div>

        {/* Section 3: Keyboard Shortcuts */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
            <Keyboard className="w-4 h-4 text-purple-400" aria-hidden="true" />
            <span>{t('help.keyboardTitle', 'Keyboard Navigation')}</span>
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
            <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800 flex items-center justify-between">
              <span className="text-slate-300">{t('help.nextEl', 'Next Element:')}</span>
              <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-100 border border-slate-700">Right Arrow</kbd>
            </div>
            <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800 flex items-center justify-between">
              <span className="text-slate-300">{t('help.prevEl', 'Prev Element:')}</span>
              <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-100 border border-slate-700">Left Arrow</kbd>
            </div>
            <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800 flex items-center justify-between">
              <span className="text-slate-300">{t('help.periodUp', 'Period Up:')}</span>
              <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-100 border border-slate-700">Up Arrow</kbd>
            </div>
            <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800 flex items-center justify-between">
              <span className="text-slate-300">{t('help.periodDown', 'Period Down:')}</span>
              <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-100 border border-slate-700">Down Arrow</kbd>
            </div>
          </div>
        </div>

        {/* Section 4: Data Sources */}
        <div className="space-y-2 text-xs text-slate-300 border-t border-slate-800 pt-4">
          <strong className="text-slate-200 block">{t('element.sources', 'Scientific sources')}:</strong>
          <p className="leading-relaxed">
            Data verified against IUPAC (International Union of Pure and Applied Chemistry 2024 Release), NIST Physical Measurement Laboratory, WebElements, and PubChem database.
          </p>
        </div>
      </div>
    </div>
  );
};
