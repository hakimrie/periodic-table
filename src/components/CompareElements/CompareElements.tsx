import React, { useState } from 'react';
import type { ChemicalElement, TemperatureUnit } from '../../types/element';
import { allElements, categoryMetadata } from '../../data/elements';
import { convertTemperature } from '../../utils/temperature';
import { Scale } from 'lucide-react';
import { useI18n } from '../../utils/i18n';
import { getLocalizedElementName } from '../../data/elements/translations';

interface CompareElementsProps {
  initialElementA?: ChemicalElement;
  initialElementB?: ChemicalElement;
  tempUnit: TemperatureUnit;
  className?: string;
}

export const CompareElements: React.FC<CompareElementsProps> = ({
  initialElementA,
  initialElementB,
  tempUnit,
  className = '',
}) => {
  const { t, lang } = useI18n();
  const [elementA, setElementA] = useState<ChemicalElement>(
    initialElementA || allElements[0] // Hydrogen default
  );
  const [elementB, setElementB] = useState<ChemicalElement>(
    initialElementB || allElements[7] // Oxygen default
  );

  const catA = categoryMetadata[elementA.category];
  const catB = categoryMetadata[elementB.category];

  // Helper comparison rows
  interface ComparisonRow {
    label: string;
    valA: string | number;
    valB: string | number;
    higher?: 'A' | 'B' | 'equal';
    unit?: string;
  }

  const numCompare = (
    a: number | undefined,
    b: number | undefined,
    label: string,
    unit: string = '',
    formatter?: (n: number) => string
  ): ComparisonRow => {
    const valAStr = a !== undefined ? (formatter ? formatter(a) : `${a} ${unit}`) : 'N/A';
    const valBStr = b !== undefined ? (formatter ? formatter(b) : `${b} ${unit}`) : 'N/A';
    let higher: 'A' | 'B' | 'equal' | undefined = undefined;

    if (a !== undefined && b !== undefined) {
      if (a > b) higher = 'A';
      else if (b > a) higher = 'B';
      else higher = 'equal';
    }

    return { label, valA: valAStr, valB: valBStr, higher, unit };
  };

  const rows: ComparisonRow[] = [
    numCompare(elementA.atomicNumber, elementB.atomicNumber, t('element.atomicNumber', 'Atomic Number')),
    numCompare(
      typeof elementA.atomicMass === 'number' ? elementA.atomicMass : undefined,
      typeof elementB.atomicMass === 'number' ? elementB.atomicMass : undefined,
      t('element.atomicMass', 'Standard Atomic Weight'),
      '',
      (n) => n.toFixed(3)
    ),
    {
      label: t('element.category', 'Category'),
      valA: t(`categories.${elementA.category}`, catA.name),
      valB: t(`categories.${elementB.category}`, catB.name),
    },
    numCompare(elementA.period, elementB.period, t('element.period', 'Period')),
    {
      label: t('element.group', 'Group'),
      valA: elementA.group !== null ? `${t('element.group', 'Group')} ${elementA.group}` : t('element.fBlock', 'f-block'),
      valB: elementB.group !== null ? `${t('element.group', 'Group')} ${elementB.group}` : t('element.fBlock', 'f-block'),
    },
    {
      label: t('element.block', 'Block'),
      valA: `${elementA.block.toUpperCase()}-${t('element.block', 'block')}`,
      valB: `${elementB.block.toUpperCase()}-${t('element.block', 'block')}`,
    },
    {
      label: t('element.phase', 'Phase at STP'),
      valA: t(`phase.${elementA.physicalProperties.phase}`, elementA.physicalProperties.phase),
      valB: t(`phase.${elementB.physicalProperties.phase}`, elementB.physicalProperties.phase),
    },
    numCompare(
      elementA.chemicalProperties.atomicRadius,
      elementB.chemicalProperties.atomicRadius,
      t('element.atomicRadius', 'Atomic Radius'),
      'pm'
    ),
    numCompare(
      elementA.chemicalProperties.electronegativity,
      elementB.chemicalProperties.electronegativity,
      `${t('element.electronegativity', 'Electronegativity')} (Pauling)`,
      '',
      (n) => n.toFixed(2)
    ),
    numCompare(
      elementA.chemicalProperties.firstIonizationEnergy,
      elementB.chemicalProperties.firstIonizationEnergy,
      t('element.firstIonizationEnergy', '1st Ionization Energy'),
      'kJ/mol',
      (n) => n.toFixed(1)
    ),
    numCompare(
      elementA.chemicalProperties.electronAffinity,
      elementB.chemicalProperties.electronAffinity,
      t('element.electronAffinity', 'Electron Affinity'),
      'kJ/mol',
      (n) => n.toFixed(1)
    ),
    numCompare(
      elementA.electronConfiguration.valenceElectrons,
      elementB.electronConfiguration.valenceElectrons,
      t('element.valenceElectrons', 'Valence Electrons')
    ),
    {
      label: t('element.configShorthand', 'Condensed Configuration'),
      valA: elementA.electronConfiguration.shorthand,
      valB: elementB.electronConfiguration.shorthand,
    },
    {
      label: t('element.meltingPoint', 'Melting Point'),
      valA: convertTemperature(elementA.physicalProperties.meltingPointKelvin, tempUnit),
      valB: convertTemperature(elementB.physicalProperties.meltingPointKelvin, tempUnit),
      higher:
        elementA.physicalProperties.meltingPointKelvin && elementB.physicalProperties.meltingPointKelvin
          ? elementA.physicalProperties.meltingPointKelvin > elementB.physicalProperties.meltingPointKelvin
            ? 'A'
            : 'B'
          : undefined,
    },
    {
      label: t('element.boilingPoint', 'Boiling Point'),
      valA: convertTemperature(elementA.physicalProperties.boilingPointKelvin, tempUnit),
      valB: convertTemperature(elementB.physicalProperties.boilingPointKelvin, tempUnit),
      higher:
        elementA.physicalProperties.boilingPointKelvin && elementB.physicalProperties.boilingPointKelvin
          ? elementA.physicalProperties.boilingPointKelvin > elementB.physicalProperties.boilingPointKelvin
            ? 'A'
            : 'B'
          : undefined,
    },
    numCompare(
      elementA.physicalProperties.density,
      elementB.physicalProperties.density,
      t('element.density', 'Density'),
      elementA.physicalProperties.densityUnit || 'g/cm³'
    ),
    {
      label: t('element.oxidationStates', 'Common Oxidation States'),
      valA: elementA.chemicalProperties.oxidationStates.join(', ') || 'None',
      valB: elementB.chemicalProperties.oxidationStates.join(', ') || 'None',
    },
  ];

  return (
    <div className={`flex flex-col gap-6 text-slate-100 ${className}`}>
      {/* Header */}
      <div className="flex flex-col gap-2 p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl">
        <div className="flex items-center gap-2">
          <Scale className="w-5 h-5 text-cyan-400" aria-hidden="true" />
          <h1 className="text-xl font-bold text-slate-100">{t('compare.title', 'Element Comparison Tool')}</h1>
        </div>
        <p className="text-xs text-slate-300">
          {t('compare.subtitle', 'Compare physical, chemical, and atomic properties side-by-side')}
        </p>
      </div>

      {/* Selector Pickers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Element A Selector */}
        <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 flex items-center gap-4">
          <div
            data-category-symbol
            className="w-14 h-14 rounded-xl flex flex-col items-center justify-center font-bold text-xl border shrink-0 text-slate-100"
            style={{ backgroundColor: catA.colorBg, borderColor: catA.colorBorder }}
          >
            <span className="text-[10px] opacity-80 font-mono text-slate-300">{elementA.atomicNumber}</span>
            <span>{elementA.symbol}</span>
          </div>

          <div className="flex-1">
            <label htmlFor="compare-select-a" className="text-xs text-slate-300 font-semibold block mb-1">
              {t('compare.selectElementA', 'Element A')}:
            </label>
            <select
              id="compare-select-a"
              value={elementA.atomicNumber}
              onChange={(e) => {
                const el = allElements.find((x) => x.atomicNumber === parseInt(e.target.value, 10));
                if (el) setElementA(el);
              }}
              className="w-full bg-slate-950 text-slate-100 border border-slate-700/80 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-cyan-400 outline-none"
            >
              {allElements.map((el) => (
                <option key={el.atomicNumber} value={el.atomicNumber}>
                  {el.atomicNumber}. {getLocalizedElementName(el.atomicNumber, lang) || el.name} ({el.symbol})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Element B Selector */}
        <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 flex items-center gap-4">
          <div
            data-category-symbol
            className="w-14 h-14 rounded-xl flex flex-col items-center justify-center font-bold text-xl border shrink-0 text-slate-100"
            style={{ backgroundColor: catB.colorBg, borderColor: catB.colorBorder }}
          >
            <span className="text-[10px] opacity-80 font-mono text-slate-300">{elementB.atomicNumber}</span>
            <span>{elementB.symbol}</span>
          </div>

          <div className="flex-1">
            <label htmlFor="compare-select-b" className="text-xs text-slate-300 font-semibold block mb-1">
              {t('compare.selectElementB', 'Element B')}:
            </label>
            <select
              id="compare-select-b"
              value={elementB.atomicNumber}
              onChange={(e) => {
                const el = allElements.find((x) => x.atomicNumber === parseInt(e.target.value, 10));
                if (el) setElementB(el);
              }}
              className="w-full bg-slate-950 text-slate-100 border border-slate-700/80 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-cyan-400 outline-none"
            >
              {allElements.map((el) => (
                <option key={el.atomicNumber} value={el.atomicNumber}>
                  {el.atomicNumber}. {getLocalizedElementName(el.atomicNumber, lang) || el.name} ({el.symbol})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Side-by-Side Comparison Table with Visual Differences */}
      <div className="rounded-2xl bg-slate-900/90 border border-slate-800 overflow-hidden shadow-xl overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[500px]">
          <caption className="sr-only">
            {t('compare.title', 'Element Comparison Tool')}: {elementA.name} vs {elementB.name}
          </caption>
          <thead>
            <tr className="bg-slate-950/80 border-b border-slate-800 text-xs font-semibold text-slate-300 uppercase tracking-wider">
              <th scope="col" className="p-4 w-5/12 sm:w-5/12">{t('compare.property', 'Property')}</th>
              <th scope="col" className="p-4 w-3.5/12 sm:w-3.5/12 text-cyan-300 font-mono text-sm">
                {getLocalizedElementName(elementA.atomicNumber, lang) || elementA.name} ({elementA.symbol})
              </th>
              <th scope="col" className="p-4 w-3.5/12 sm:w-3.5/12 text-pink-300 font-mono text-sm">
                {getLocalizedElementName(elementB.atomicNumber, lang) || elementB.name} ({elementB.symbol})
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-sm">
            {rows.map((row, idx) => (
              <tr
                key={idx}
                className={`transition-colors ${idx % 2 === 0 ? 'bg-slate-900/40' : 'bg-slate-900/80'}`}
              >
                {/* Property Name */}
                <th scope="row" className="p-3.5 sm:p-4 text-xs sm:text-sm text-slate-200 font-medium">
                  {row.label}
                </th>

                {/* Value A */}
                <td className="p-3.5 sm:p-4 font-mono text-xs sm:text-sm">
                  <span
                    className={`inline-flex items-center gap-1.5 ${
                      row.higher === 'A'
                        ? 'text-cyan-300 font-bold bg-cyan-950/40 px-2 py-1 rounded border border-cyan-800/50'
                        : 'text-slate-200'
                    }`}
                  >
                    <span>{row.valA}</span>
                    {row.higher === 'A' && (
                      <span aria-label={`Higher value for ${elementA.name}`} className="text-[10px] text-cyan-400 font-bold">▲</span>
                    )}
                  </span>
                </td>

                {/* Value B */}
                <td className="p-3.5 sm:p-4 font-mono text-xs sm:text-sm">
                  <span
                    className={`inline-flex items-center gap-1.5 ${
                      row.higher === 'B'
                        ? 'text-pink-300 font-bold bg-pink-950/40 px-2 py-1 rounded border border-pink-800/50'
                        : 'text-slate-200'
                    }`}
                  >
                    <span>{row.valB}</span>
                    {row.higher === 'B' && (
                      <span aria-label={`Higher value for ${elementB.name}`} className="text-[10px] text-pink-400 font-bold">▲</span>
                    )}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
