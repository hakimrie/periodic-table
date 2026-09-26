import React from 'react';
import type { ChemicalElement, PeriodicTrendKey } from '../../types/element';
import { categoryMetadata } from '../../data/elements';
import { getLocalizedElementName } from '../../data/elements/translations';
import { periodicTrends } from '../../data/trends';
import { useI18n } from '../../utils/i18n';

interface ElementTileProps {
  element: ChemicalElement;
  isSelected: boolean;
  onSelect: (el: ChemicalElement) => void;
  onHover?: (el: ChemicalElement | null) => void;
  activeTrend?: PeriodicTrendKey | null;
  dimmed?: boolean;
}

export const ElementTile: React.FC<ElementTileProps> = ({
  element,
  isSelected,
  onSelect,
  onHover,
  activeTrend,
  dimmed = false,
}) => {
  const { t, lang } = useI18n();
  const localizedName = getLocalizedElementName(element.atomicNumber, lang) || element.name;
  const cat = categoryMetadata[element.category] || categoryMetadata.unknown;

  // Trend heatmap value and coloring if trend mode active
  let trendDisplayValue: string | null = null;
  let customStyle: React.CSSProperties = {
    backgroundColor: cat.colorBg,
    borderColor: isSelected ? '#38bdf8' : cat.colorBorder,
  };

  if (activeTrend && periodicTrends[activeTrend]) {
    const trendDef = periodicTrends[activeTrend];
    const val = trendDef.getValue(element);
    trendDisplayValue = trendDef.formatValue(val);

    // Calculate normalized value for coloring
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
      customStyle = {
        backgroundColor: color + '33', // 20% opacity
        borderColor: isSelected ? '#38bdf8' : color,
      };
    }
  }

  return (
    <button
      id={`element-tile-${element.atomicNumber}`}
      type="button"
      role="gridcell"
      aria-selected={isSelected}
      aria-label={`${localizedName} (${element.symbol}), ${t('element.atomicNumber', 'atomic number')} ${element.atomicNumber}, ${element.atomicMassString} u, ${t(`categories.${element.category}`, cat.name)}.${trendDisplayValue ? ` ${t('trends.trendMode', 'Trend')}: ${trendDisplayValue}.` : ''}`}
      tabIndex={0}
      onClick={() => onSelect(element)}
      onMouseEnter={() => onHover && onHover(element)}
      onMouseLeave={() => onHover && onHover(null)}
      onFocus={() => onHover && onHover(element)}
      onBlur={() => onHover && onHover(null)}
      style={customStyle}
      className={`relative flex flex-col justify-between p-1.5 rounded-lg border text-left transition-transform duration-100 select-none outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 focus-visible:z-20 ${
        isSelected
          ? 'ring-2 ring-cyan-400 shadow-lg shadow-cyan-500/25 scale-[1.05] z-10 font-bold'
          : 'hover:scale-[1.02] hover:z-10 hover:shadow-md hover:border-cyan-400/80'
      } ${dimmed ? 'opacity-25 grayscale-[60%]' : 'opacity-100'} w-full h-full min-h-[58px] sm:min-h-[64px] will-change-transform`}
    >
      {/* Top Row: Atomic Number + Trend or Block */}
      <div className="flex items-center justify-between w-full text-[10px] sm:text-[11px] leading-none font-mono">
        <span className="font-bold text-slate-200">{element.atomicNumber}</span>
        {trendDisplayValue ? (
          <span className="text-[9px] font-bold text-cyan-300 truncate max-w-[42px]">
            {trendDisplayValue}
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
};
