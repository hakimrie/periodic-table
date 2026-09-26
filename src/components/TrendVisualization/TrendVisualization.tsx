import React from 'react';
import type { ChemicalElement, PeriodicTrendKey } from '../../types/element';
import { periodicTrends } from '../../data/trends';
import { PeriodicTable } from '../PeriodicTable/PeriodicTable';
import { Sparkles, ArrowRight, AlertCircle, Info } from 'lucide-react';
import { useI18n } from '../../utils/i18n';
import { getLocalizedElementName } from '../../data/elements/translations';

interface TrendVisualizationProps {
  activeTrend: PeriodicTrendKey;
  onTrendChange: (trend: PeriodicTrendKey) => void;
  selectedElement: ChemicalElement;
  onSelectElement: (el: ChemicalElement) => void;
  className?: string;
}

export const TrendVisualization: React.FC<TrendVisualizationProps> = ({
  activeTrend,
  onTrendChange,
  selectedElement,
  onSelectElement,
  className = '',
}) => {
  const { t, lang } = useI18n();
  const trendDef = periodicTrends[activeTrend];
  const selectedVal = trendDef.getValue(selectedElement);

  return (
    <div className={`flex flex-col gap-6 text-slate-100 ${className}`}>
      {/* Top Selector & Info Banner */}
      <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <h2 className="text-xl font-bold">{t('trends.title', 'Periodic Trends Explorer')}</h2>
          </div>

          {/* Trend selector buttons */}
          <div className="flex flex-wrap gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            {(Object.keys(periodicTrends) as PeriodicTrendKey[]).map((tKey) => {
              const def = periodicTrends[tKey];
              const isActive = activeTrend === tKey;

              return (
                <button
                  key={tKey}
                  onClick={() => onTrendChange(tKey)}
                  className={`px-3 py-1.5 rounded-lg transition-all font-medium ${
                    isActive
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {t(`trends.${tKey}.name`, def.label)}
                </button>
              );
            })}
          </div>
        </div>

        {/* Detailed Explanation for Selected Trend */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3 border-t border-slate-800/80 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
            <strong className="text-cyan-300 font-semibold flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-cyan-400" /> {t('trends.whatItMeasures', 'What It Measures')}
            </strong>
            <p className="text-slate-300 leading-relaxed">{t(`trends.${activeTrend}.shortDescription`, trendDef.shortDescription)}</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
            <strong className="text-emerald-300 font-semibold flex items-center gap-1.5">
              <ArrowRight className="w-3.5 h-3.5 text-emerald-400" /> {t('trends.generalTrend', 'General Periodic Trend')}
            </strong>
            <p className="text-slate-300 leading-relaxed">{t(`trends.${activeTrend}.studentExplanation`, trendDef.studentExplanation)}</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
            <strong className="text-amber-300 font-semibold flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-amber-400" /> {t('trends.notableExceptions', 'Notable Exceptions')}
            </strong>
            <p className="text-slate-300 leading-relaxed">{t(`trends.${activeTrend}.exceptionsExplanation`, trendDef.exceptionsExplanation)}</p>
          </div>
        </div>
      </div>

      {/* Interactive Periodic Table in Heatmap Trend Mode */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-2 text-xs text-slate-400">
          <span>{t('trends.heatmapHint', 'Heatmap view: values are shown on each element tile')}</span>
          <span>
            {t('trends.selected', 'Selected:')} <strong className="text-slate-200">{getLocalizedElementName(selectedElement.atomicNumber, lang) || selectedElement.name}</strong> ={' '}
            <strong className="text-cyan-400 font-mono">{trendDef.formatValue(selectedVal)}</strong>
          </span>
        </div>

        <PeriodicTable
          selectedElement={selectedElement}
          onSelectElement={onSelectElement}
          activeTrend={activeTrend}
        />
      </div>
    </div>
  );
};
