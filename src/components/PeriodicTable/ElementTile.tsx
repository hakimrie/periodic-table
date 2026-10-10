import React, { useMemo } from 'react';
import type { ChemicalElement, ElementBlock, PeriodicTrendKey } from '../../types/element';
import { categoryMetadata } from '../../data/elements';
import { getLocalizedElementName } from '../../data/elements/translations';
import { periodicTrends } from '../../data/trends';
import { useI18n } from '../../utils/i18n';
import {
  type TableLensKey,
  getPhaseAtTemperature,
  parseDiscoveryYear,
} from './lenses';

interface ElementTileProps {
  element: ChemicalElement;
  isSelected: boolean;
  onSelect: (el: ChemicalElement) => void;
  onHover?: (el: ChemicalElement | null) => void;
  activeTrend?: PeriodicTrendKey | null;
  dimmed?: boolean;

  // New Lens props
  lens?: TableLensKey;
  temperatureKelvin?: number;
  discoveryYear?: number;
  highlightedBlock?: ElementBlock | null;
  originFilter?: 'all' | 'natural' | 'synthetic' | 'radioactive' | null;
}

const BLOCK_COLORS: Record<ElementBlock, { bg: string; border: string }> = {
  s: { bg: '#ef444425', border: '#ef4444' },
  p: { bg: '#10b98125', border: '#10b981' },
  d: { bg: '#3b82f625', border: '#3b82f6' },
  f: { bg: '#d946ef25', border: '#d946ef' },
};

export const ElementTile: React.FC<ElementTileProps> = React.memo(({
  element,
  isSelected,
  onSelect,
  onHover,
  activeTrend,
  dimmed = false,
  lens = 'category',
  temperatureKelvin = 298,
  discoveryYear = 2020,
  highlightedBlock = null,
  originFilter = null,
}) => {
  const { t, lang } = useI18n();
  const localizedName = getLocalizedElementName(element.atomicNumber, lang) || element.name;
  const cat = categoryMetadata[element.category] || categoryMetadata.unknown;

  // Compute tile appearance based on active lens
  const { customStyle, badgeText, isGhost, isRadioactivePulse } = useMemo(() => {
    let bg = cat.colorBg;
    let border = isSelected ? '#38bdf8' : cat.colorBorder;
    let badge: string | null = null;
    let ghost = false;
    let pulseRadio = false;

    // 1. Trend Heatmap
    if (activeTrend && periodicTrends[activeTrend]) {
      const trendDef = periodicTrends[activeTrend];
      const val = trendDef.getValue(element);
      badge = trendDef.formatValue(val);

      if (val !== undefined && typeof val === 'number') {
        let min = 0;
        let max = 1;
        if (activeTrend === 'atomicRadius') { min = 30; max = 270; }
        else if (activeTrend === 'ionizationEnergy') { min = 350; max = 2400; }
        else if (activeTrend === 'electronegativity') { min = 0.7; max = 4.0; }
        else if (activeTrend === 'electronAffinity') { min = 0; max = 350; }
        else if (activeTrend === 'density') { min = 0; max = 23; }
        else if (activeTrend === 'meltingPoint') { min = 0; max = 3900; }
        else if (activeTrend === 'metallicCharacter') { min = 1; max = 3; }

        const tVal = Math.max(0, Math.min(1, (val - min) / (max - min || 1)));
        const color = trendDef.colorScale(tVal);
        bg = color + '33';
        border = isSelected ? '#38bdf8' : color;
      }
    }
    // 2. Temperature Lens
    else if (lens === 'temperature') {
      const phase = getPhaseAtTemperature(element, temperatureKelvin);
      if (phase === 'solid') {
        bg = '#1e3a8a30'; // deep blue
        border = isSelected ? '#38bdf8' : '#3b82f6';
        badge = '🧊';
      } else if (phase === 'liquid') {
        bg = '#f59e0b35'; // warm amber
        border = isSelected ? '#38bdf8' : '#f59e0b';
        badge = '💧';
      } else if (phase === 'gas') {
        bg = '#f43f5e35'; // glowing rose
        border = isSelected ? '#38bdf8' : '#f43f5e';
        badge = '💨';
      } else {
        bg = '#33415525';
        border = isSelected ? '#38bdf8' : '#64748b';
        badge = '❓';
      }
    }
    // 3. Discovery Timeline Lens
    else if (lens === 'discovery') {
      const elYear = parseDiscoveryYear(element.discovery.year);
      if (elYear > discoveryYear) {
        ghost = true;
        bg = 'transparent';
        border = '#33415540';
        badge = elYear === 0 ? 'Ancient' : `${elYear}`;
      } else {
        badge = elYear === 0 ? 'Ancient' : `${elYear}`;
      }
    }
    // 4. Block Lens
    else if (lens === 'block') {
      const bc = BLOCK_COLORS[element.block];
      bg = bc.bg;
      border = isSelected ? '#38bdf8' : bc.border;
      badge = `${element.block}`;
    }
    // 5. Origin / Radioactivity Lens
    else if (lens === 'origin') {
      if (element.isRadioactive) {
        pulseRadio = true;
        border = isSelected ? '#38bdf8' : '#f59e0b';
        badge = '☢️';
      } else if (element.isSynthetic) {
        border = isSelected ? '#38bdf8' : '#d946ef';
        badge = '⚗️';
      } else {
        border = isSelected ? '#38bdf8' : '#10b981';
      }
    }

    return {
      customStyle: {
        backgroundColor: bg,
        borderColor: border,
      },
      badgeText: badge,
      isGhost: ghost,
      isRadioactivePulse: pulseRadio,
    };
  }, [
    element,
    isSelected,
    cat,
    activeTrend,
    lens,
    temperatureKelvin,
    discoveryYear,
  ]);

  // Handle block highlight filtering
  let effectiveDimmed = dimmed || isGhost;
  if (lens === 'block' && highlightedBlock && element.block !== highlightedBlock) {
    effectiveDimmed = true;
  }
  if (lens === 'origin' && originFilter) {
    if (originFilter === 'radioactive' && !element.isRadioactive) effectiveDimmed = true;
    if (originFilter === 'synthetic' && !element.isSynthetic) effectiveDimmed = true;
    if (originFilter === 'natural' && element.isSynthetic) effectiveDimmed = true;
  }

  return (
    <button
      id={`element-tile-${element.atomicNumber}`}
      type="button"
      role="gridcell"
      aria-selected={isSelected}
      aria-label={`${localizedName} (${element.symbol}), ${t('element.atomicNumber', 'atomic number')} ${element.atomicNumber}, ${element.atomicMassString} u, ${t(`categories.${element.category}`, cat.name)}.${badgeText ? ` (${badgeText})` : ''}`}
      tabIndex={0}
      onClick={() => onSelect(element)}
      onMouseEnter={() => onHover && onHover(element)}
      onMouseLeave={() => onHover && onHover(null)}
      onFocus={() => onHover && onHover(element)}
      onBlur={() => onHover && onHover(null)}
      style={customStyle}
      className={`relative flex flex-col justify-between p-1.5 rounded-lg border text-left transition-all duration-200 select-none outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 focus-visible:z-20 ${
        isSelected
          ? 'ring-2 ring-cyan-400 shadow-lg shadow-cyan-500/25 scale-[1.05] z-10 font-bold'
          : 'hover:scale-[1.03] hover:-translate-y-0.5 hover:z-10 hover:shadow-md hover:border-cyan-400/80'
      } ${
        effectiveDimmed ? 'opacity-25 grayscale-[60%]' : 'opacity-100'
      } ${
        isRadioactivePulse ? 'ring-1 ring-amber-400/60 shadow-sm shadow-amber-500/30' : ''
      } w-full h-full min-h-[58px] sm:min-h-[64px] will-change-transform`}
    >
      {/* Top Row: Atomic Number + Badge / Block */}
      <div className="flex items-center justify-between w-full text-[10px] sm:text-[11px] leading-none font-mono">
        <span className="font-bold text-slate-200">{element.atomicNumber}</span>
        {badgeText ? (
          <span className="text-[9px] font-bold text-cyan-300 truncate max-w-[44px]">
            {badgeText}
          </span>
        ) : (
          <span className="text-[9px] text-slate-300 font-semibold uppercase">{element.block}</span>
        )}
      </div>

      {/* Center: Symbol */}
      <div className="flex flex-col items-center justify-center my-0.5">
        <span className="text-sm sm:text-base font-extrabold tracking-tight text-slate-100 leading-none">
          {element.symbol}
        </span>
      </div>

      {/* Bottom: Name + Mass */}
      <div className="flex flex-col w-full text-[9px] sm:text-[10px] leading-tight text-center truncate">
        <span className="truncate text-slate-100 font-semibold">{localizedName}</span>
        <span className="text-[8px] sm:text-[9px] text-slate-300 font-mono font-medium truncate">
          {element.atomicMassString}
        </span>
      </div>
    </button>
  );
});

ElementTile.displayName = 'ElementTile';
