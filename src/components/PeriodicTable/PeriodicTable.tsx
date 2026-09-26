import React, { useCallback } from 'react';
import type { ChemicalElement, ElementCategory, PeriodicTrendKey } from '../../types/element';
import { allElements, categoryMetadata, elementsByNumber } from '../../data/elements';
import { ElementTile } from './ElementTile';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { periodicTrends } from '../../data/trends';

interface PeriodicTableProps {
  selectedElement: ChemicalElement;
  onSelectElement: (el: ChemicalElement) => void;
  onHoverElement?: (el: ChemicalElement | null) => void;
  hoveredElement?: ChemicalElement | null;
  activeTrend?: PeriodicTrendKey | null;
  highlightedCategory?: ElementCategory | null;
  onSelectCategory?: (cat: ElementCategory | null) => void;
  matchedElementIds?: Set<number>;
  className?: string;
}

import { getGridPosition } from '../../utils/grid';
import { useI18n } from '../../utils/i18n';
import { getLocalizedElementName } from '../../data/elements/translations';

export const PeriodicTable: React.FC<PeriodicTableProps> = ({
  selectedElement,
  onSelectElement,
  onHoverElement,
  hoveredElement,
  activeTrend = null,
  highlightedCategory = null,
  onSelectCategory,
  matchedElementIds,
  className = '',
}) => {
  const { t, lang } = useI18n();

  // Keyboard navigation between elements
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      let nextZ = selectedElement.atomicNumber;
      if (e.key === 'ArrowRight') {
        nextZ = Math.min(118, selectedElement.atomicNumber + 1);
      } else if (e.key === 'ArrowLeft') {
        nextZ = Math.max(1, selectedElement.atomicNumber - 1);
      } else if (e.key === 'ArrowDown') {
        // Move to element below in period
        const pos = getGridPosition(selectedElement);
        const candidates = allElements.filter((el) => {
          const p = getGridPosition(el);
          return p.col === pos.col && p.row > pos.row;
        });
        if (candidates.length > 0) {
          nextZ = candidates[0].atomicNumber;
        }
      } else if (e.key === 'ArrowUp') {
        const pos = getGridPosition(selectedElement);
        const candidates = allElements.filter((el) => {
          const p = getGridPosition(el);
          return p.col === pos.col && p.row < pos.row;
        });
        if (candidates.length > 0) {
          nextZ = candidates[candidates.length - 1].atomicNumber;
        }
      }

      if (nextZ !== selectedElement.atomicNumber) {
        e.preventDefault();
        const nextEl = elementsByNumber.get(nextZ);
        if (nextEl) {
          onSelectElement(nextEl);
          requestAnimationFrame(() => {
            const tileBtn = document.getElementById(`element-tile-${nextZ}`);
            tileBtn?.focus();
          });
        }
      }
    },
    [selectedElement, onSelectElement]
  );

  const trendDef = activeTrend ? periodicTrends[activeTrend] : null;

  return (
    <div
      className={`flex flex-col gap-4 select-none ${className}`}
      onKeyDown={handleKeyDown}
      role="region"
      aria-label="Interactive Periodic Table of the Elements"
    >
      {/* Trend Directional Summary Banner if Trend mode is active */}
      {trendDef && (
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-slate-900/90 border border-cyan-500/40 rounded-xl shadow-lg">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" aria-hidden="true" />
            <span className="font-semibold text-sm text-cyan-300">
              {t('trends.trendMode', 'Trend Mode:')} {t(`trends.${trendDef.key}.name`, trendDef.label)} ({trendDef.unit})
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-200">
            <span className="flex items-center gap-1 bg-slate-800/80 px-2 py-1 rounded border border-slate-700">
              <ArrowRight className="w-3.5 h-3.5 text-cyan-400" aria-hidden="true" />
              {trendDef.horizontalSummary}
            </span>
            <span className="flex items-center gap-1 bg-slate-800/80 px-2 py-1 rounded border border-slate-700">
              <ArrowDown className="w-3.5 h-3.5 text-cyan-400" aria-hidden="true" />
              {trendDef.verticalSummary}
            </span>
          </div>
        </div>
      )}

      {/* Main Grid Wrapper with responsive horizontal scroll */}
      <div className="overflow-x-auto pb-4 pt-1 rounded-2xl bg-slate-950/60 border border-slate-800/80 p-3 sm:p-5 shadow-inner">
        <div
          role="grid"
          aria-rowcount={10}
          aria-colcount={18}
          className="grid gap-1 sm:gap-1.5 min-w-[1040px]"
          style={{
            gridTemplateColumns: 'repeat(18, minmax(56px, 1fr))',
            gridTemplateRows: 'repeat(10, minmax(60px, auto))',
          }}
        >
          {/* Group Numbers Header (1 to 18) */}
          {Array.from({ length: 18 }, (_, i) => i + 1).map((groupNum) => (
            <div
              key={`group-${groupNum}`}
              style={{ gridRow: 1, gridColumn: groupNum }}
              aria-hidden="true"
              className="flex items-start justify-center pt-0 text-[10px] font-mono font-bold text-slate-400 pointer-events-none select-none"
            >
              {groupNum}
            </div>
          ))}

          {/* Period Numbers (1 to 7) */}
          {Array.from({ length: 7 }, (_, i) => i + 1).map((periodNum) => (
            <div
              key={`period-${periodNum}`}
              style={{ gridRow: periodNum, gridColumn: 1 }}
              aria-hidden="true"
              className="absolute -left-5 text-[10px] font-mono font-bold text-slate-400 pointer-events-none select-none"
            >
              {periodNum}
            </div>
          ))}

          {/* Lanthanide Anchor in main grid (Row 6, Col 3) */}
          <div
            style={{ gridRow: 6, gridColumn: 3 }}
            role="note"
            aria-label={`${t('table.lanthanides', 'Lanthanides')} series elements 57 to 71, continued in bottom f-block series`}
            className="flex flex-col items-center justify-center p-1 rounded-lg border border-pink-500/40 bg-pink-500/10 text-pink-300 text-[10px] font-mono text-center"
            title={`${t('table.lanthanides', 'Lanthanides')} (57–71)`}
          >
            <span className="font-bold">57–71</span>
            <span className="text-[9px]">La–Lu</span>
            <span className="text-[8px] text-pink-400/80 mt-0.5">*</span>
          </div>

          {/* Actinide Anchor in main grid (Row 7, Col 3) */}
          <div
            style={{ gridRow: 7, gridColumn: 3 }}
            role="note"
            aria-label={`${t('table.actinides', 'Actinides')} series elements 89 to 103, continued in bottom f-block series`}
            className="flex flex-col items-center justify-center p-1 rounded-lg border border-fuchsia-500/40 bg-fuchsia-500/10 text-fuchsia-300 text-[10px] font-mono text-center"
            title={`${t('table.actinides', 'Actinides')} (89–103)`}
          >
            <span className="font-bold">89–103</span>
            <span className="text-[9px]">Ac–Lr</span>
            <span className="text-[8px] text-fuchsia-400/80 mt-0.5">**</span>
          </div>

          {/* F-Block Series Label: Lanthanides (Row 9, Col 2-3) */}
          <div
            style={{ gridRow: 9, gridColumn: '2 / span 2' }}
            aria-hidden="true"
            className="flex items-center justify-end pr-2 text-xs font-bold text-pink-400 font-mono"
          >
            * {t('table.lanthanides', 'Lanthanides')}
          </div>

          {/* F-Block Series Label: Actinides (Row 10, Col 2-3) */}
          <div
            style={{ gridRow: 10, gridColumn: '2 / span 2' }}
            aria-hidden="true"
            className="flex items-center justify-end pr-2 text-xs font-bold text-fuchsia-400 font-mono"
          >
            ** {t('table.actinides', 'Actinides')}
          </div>

          {/* Render All 118 Elements */}
          {allElements.map((el) => {
            const { row, col } = getGridPosition(el);
            const isSelected = selectedElement.atomicNumber === el.atomicNumber;

            // Check if dimmed by category filter or search query
            let isDimmed = false;
            if (highlightedCategory && el.category !== highlightedCategory) {
              isDimmed = true;
            }
            if (matchedElementIds && !matchedElementIds.has(el.atomicNumber)) {
              isDimmed = true;
            }

            return (
              <div
                key={el.atomicNumber}
                style={{
                  gridRow: row,
                  gridColumn: col,
                }}
                className="w-full h-full"
              >
                <ElementTile
                  element={el}
                  isSelected={isSelected}
                  onSelect={onSelectElement}
                  onHover={onHoverElement}
                  activeTrend={activeTrend}
                  dimmed={isDimmed}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Category Legend & Filter Bar */}
      <div
        role="group"
        aria-label={t('table.legend', 'Element Categories')}
        className="flex flex-wrap items-center gap-2 p-3 bg-slate-900/70 border border-slate-800 rounded-xl text-xs"
      >
        <span className="text-slate-300 font-medium mr-1">{t('table.categories', 'Categories:')}</span>
        {(Object.keys(categoryMetadata) as ElementCategory[]).map((catKey) => {
          const meta = categoryMetadata[catKey];
          const isFilterActive = highlightedCategory === catKey;
          const localizedName = t(`categories.${catKey}`, meta.name);

          return (
            <button
              key={catKey}
              type="button"
              data-category-tag={catKey}
              aria-pressed={isFilterActive}
              aria-label={`${localizedName} filter: ${meta.description}`}
              onClick={() => onSelectCategory && onSelectCategory(isFilterActive ? null : catKey)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border transition-all ${
                isFilterActive
                  ? 'ring-2 ring-cyan-400 scale-105 font-bold shadow-md'
                  : 'hover:scale-102 hover:border-slate-600'
              }`}
              style={{
                backgroundColor: meta.colorBg,
                borderColor: isFilterActive ? '#38bdf8' : meta.colorBorder,
                color: meta.colorText,
              }}
              title={`${localizedName}: ${meta.description}`}
            >
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: meta.colorBorder }}
                aria-hidden="true"
              />
              <span>{localizedName}</span>
            </button>
          );
        })}

        {highlightedCategory && (
          <button
            type="button"
            onClick={() => onSelectCategory && onSelectCategory(null)}
            aria-label={t('table.clearFilter', 'Clear Filter')}
            className="text-xs px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 font-medium transition-colors ml-auto"
          >
            {t('table.clearFilter', 'Clear Filter')}
          </button>
        )}
      </div>

      {/* Fixed-Height Stable Preview & Status Bar (prevents layout shifts on hover) */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="h-9 px-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs overflow-hidden shrink-0 transition-colors"
      >
        {hoveredElement ? (
          <div className="flex items-center gap-2.5 text-slate-200 overflow-hidden truncate">
            <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0" aria-hidden="true" />
            <span className="text-slate-300 font-medium shrink-0">{t('table.quickPreview', 'Preview:')}</span>
            <span className="font-bold text-slate-100 shrink-0">{getLocalizedElementName(hoveredElement.atomicNumber, lang) || hoveredElement.name}</span>
            <span className="font-mono text-cyan-300 font-bold px-1.5 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30 shrink-0">
              {hoveredElement.symbol}
            </span>
            <span className="font-mono text-slate-300 shrink-0">Z={hoveredElement.atomicNumber}</span>
            <span className="text-slate-500 hidden sm:inline" aria-hidden="true">•</span>
            <span className="text-slate-200 hidden sm:inline shrink-0">{t(`categories.${hoveredElement.category}`, categoryMetadata[hoveredElement.category]?.name)}</span>
            <span className="text-slate-500 hidden md:inline" aria-hidden="true">•</span>
            <span className="text-slate-300 font-mono hidden md:inline shrink-0">{hoveredElement.atomicMassString} u</span>
            <span className="text-slate-500 hidden lg:inline" aria-hidden="true">•</span>
            <span className="text-slate-300 font-mono hidden lg:inline shrink-0">{hoveredElement.electronConfiguration.shorthand}</span>
            <span className="text-slate-500 hidden xl:inline" aria-hidden="true">•</span>
            <span className="text-slate-300 hidden xl:inline capitalize shrink-0">{t(`phase.${hoveredElement.phaseAtSTP}`, hoveredElement.phaseAtSTP)}</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-slate-300 text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/80 animate-pulse shrink-0" aria-hidden="true" />
            <span className="truncate">{t('table.hoverHint')}</span>
          </div>
        )}

        <div className="text-[11px] text-slate-300 shrink-0 ml-4 hidden sm:flex items-center gap-1.5">
          <span className="text-slate-400">{t('table.selected', 'Selected:')}</span>
          <span className="font-bold text-cyan-300">{getLocalizedElementName(selectedElement.atomicNumber, lang) || selectedElement.name} ({selectedElement.symbol})</span>
        </div>
      </div>
    </div>
  );
};
