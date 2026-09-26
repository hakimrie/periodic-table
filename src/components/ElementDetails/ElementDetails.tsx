import React, { useState, useMemo } from 'react';
import type {
  ChemicalElement,
  CommonIon,
  EducationalMode,
  TemperatureUnit,
} from '../../types/element';
import { categoryMetadata } from '../../data/elements';
import { getLocalizedElement, getLocalizedElementName } from '../../data/elements/translations';
import { convertTemperature } from '../../utils/temperature';
import { useI18n } from '../../utils/i18n';
import {
  Bookmark,
  Share2,
  ChevronLeft,
  ChevronRight,
  Flame,
  AlertTriangle,
  Biohazard,
  Radio,
  BookOpen,
  Atom,
  Thermometer,
  Zap,
  Clock,
  Sparkles,
  Shield,
  Layers,
  Check,
  GraduationCap,
  Microscope,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface ElementDetailsProps {
  element: ChemicalElement;
  onSelectElement: (el: ChemicalElement) => void;
  prevElement?: ChemicalElement;
  nextElement?: ChemicalElement;
  educationalMode: EducationalMode;
  onModeChange: (mode: EducationalMode) => void;
  tempUnit: TemperatureUnit;
  onTempUnitChange: (unit: TemperatureUnit) => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onSelectIon?: (ion: CommonIon | null) => void;
  selectedIon?: CommonIon | null;
  className?: string;
}

export const ElementDetails: React.FC<ElementDetailsProps> = ({
  element,
  onSelectElement,
  prevElement,
  nextElement,
  educationalMode,
  onModeChange,
  tempUnit,
  onTempUnitChange,
  isFavorite,
  onToggleFavorite,
  onSelectIon,
  selectedIon,
  className = '',
}) => {
  const { t, lang } = useI18n();
  const displayElement = useMemo(() => getLocalizedElement(element, lang), [element, lang]);
  const [copiedShare, setCopiedShare] = useState(false);
  const [showDeepMechanics, setShowDeepMechanics] = useState(false);
  const [showFullConfigInHighSchool, setShowFullConfigInHighSchool] = useState(false);
  const cat = categoryMetadata[displayElement.category] || categoryMetadata.unknown;

  const handleShare = () => {
    const basePath = window.location.pathname.replace(/\/$/, '');
    const url = `${window.location.origin}${basePath}/#elements/${element.symbol}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2500);
    });
  };

  return (
    <div className={`flex flex-col gap-6 text-slate-100 ${className}`}>
      {/* 1. Header Card */}
      <div
        className="p-5 sm:p-6 rounded-2xl border backdrop-blur-md relative overflow-hidden shadow-xl"
        style={{
          backgroundColor: cat.colorBg,
          borderColor: cat.colorBorder,
        }}
      >
        {/* Navigation & Action Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          {/* Prev / Next navigation */}
          <div className="flex items-center gap-1.5">
            {prevElement && (
              <button
                type="button"
                onClick={() => onSelectElement(prevElement)}
                className="flex items-center gap-1 px-2.5 py-1 text-xs rounded-lg bg-slate-900/60 hover:bg-slate-800 text-slate-200 border border-slate-700/60 transition-colors focus-visible:ring-2 focus-visible:ring-cyan-400"
                aria-label={`Previous element: ${getLocalizedElementName(prevElement.atomicNumber, lang) || prevElement.name} (${prevElement.symbol}, Z=${prevElement.atomicNumber})`}
              >
                <ChevronLeft className="w-3.5 h-3.5" aria-hidden="true" />
                <span className="hidden sm:inline">{getLocalizedElementName(prevElement.atomicNumber, lang) || prevElement.name}</span>
                <span className="font-mono">({prevElement.atomicNumber})</span>
              </button>
            )}

            {nextElement && (
              <button
                type="button"
                onClick={() => onSelectElement(nextElement)}
                className="flex items-center gap-1 px-2.5 py-1 text-xs rounded-lg bg-slate-900/60 hover:bg-slate-800 text-slate-200 border border-slate-700/60 transition-colors focus-visible:ring-2 focus-visible:ring-cyan-400"
                aria-label={`Next element: ${getLocalizedElementName(nextElement.atomicNumber, lang) || nextElement.name} (${nextElement.symbol}, Z=${nextElement.atomicNumber})`}
              >
                <span className="hidden sm:inline">{getLocalizedElementName(nextElement.atomicNumber, lang) || nextElement.name}</span>
                <span className="font-mono">({nextElement.atomicNumber})</span>
                <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            )}
          </div>

          {/* Educational Mode & Utilities */}
          <div className="flex items-center gap-2">
            {/* Mode switch */}
            <div role="group" aria-label="Educational mode" className="flex items-center bg-slate-900/80 p-0.5 rounded-lg border border-slate-700/60 text-xs shadow-inner">
              <button
                type="button"
                onClick={() => onModeChange('high-school')}
                aria-pressed={educationalMode === 'high-school'}
                className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                  educationalMode === 'high-school'
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow'
                    : 'text-slate-300 hover:text-white'
                }`}
                title={t('help.highSchoolDesc')}
              >
                <GraduationCap className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{t('app.highSchoolMode', 'High School')}</span>
              </button>
              <button
                type="button"
                onClick={() => onModeChange('university')}
                aria-pressed={educationalMode === 'university'}
                className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-purple-400 ${
                  educationalMode === 'university'
                    ? 'bg-purple-600 text-white font-bold shadow'
                    : 'text-slate-300 hover:text-white'
                }`}
                title={t('help.universityDesc')}
              >
                <Microscope className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{t('app.universityMode', 'University')}</span>
              </button>
              <button
                type="button"
                onClick={() => onModeChange('quick-reference')}
                aria-pressed={educationalMode === 'quick-reference'}
                className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-emerald-400 ${
                  educationalMode === 'quick-reference'
                    ? 'bg-emerald-500 text-slate-950 font-bold shadow'
                    : 'text-slate-300 hover:text-white'
                }`}
                title={t('help.quickRefDesc')}
              >
                <Zap className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{t('app.quickRefMode', 'Quick Ref')}</span>
              </button>
            </div>

            {/* Favorite button */}
            <button
              type="button"
              onClick={onToggleFavorite}
              aria-pressed={isFavorite}
              aria-label={isFavorite ? t('favoriteRemove', 'Remove from favorites') : t('favoriteAdd', 'Add to favorites')}
              className={`p-2 rounded-lg border transition-all focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                isFavorite
                  ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                  : 'bg-slate-900/60 text-slate-300 hover:text-white border-slate-700/60'
              }`}
              title={isFavorite ? t('favoriteRemove', 'Remove from favorites') : t('favoriteAdd', 'Add to favorites')}
            >
              <Bookmark className={`w-4 h-4 ${isFavorite ? 'fill-amber-400' : ''}`} aria-hidden="true" />
            </button>

            {/* Share button */}
            <button
              type="button"
              onClick={handleShare}
              aria-label={copiedShare ? t('element.linkCopied', 'Link copied to clipboard') : t('element.copyShare', 'Share / Copy Link')}
              className="flex items-center gap-1.5 p-2 rounded-lg bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60 transition-colors focus-visible:ring-2 focus-visible:ring-cyan-400"
              title={t('element.copyShare', 'Share / Copy Link')}
            >
              {copiedShare ? (
                <Check className="w-4 h-4 text-emerald-400" aria-hidden="true" />
              ) : (
                <Share2 className="w-4 h-4" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Main Element Identifier */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* Big Symbol Box */}
            <div
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex flex-col items-center justify-between p-2 shadow-2xl border"
              style={{
                backgroundColor: cat.colorBg,
                borderColor: cat.colorBorder,
              }}
            >
              <span className="font-mono text-xs text-slate-300 font-bold self-start">
                {element.atomicNumber}
              </span>
              <span className="font-black text-3xl sm:text-4xl text-slate-100 tracking-tight leading-none">
                {element.symbol}
              </span>
              <span className="font-mono text-[10px] text-slate-300">
                {element.atomicMassString}
              </span>
            </div>

            {/* Name, Category, Position */}
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
                  {displayElement.name}
                </h1>
                <span
                  data-category-badge
                  className="px-2.5 py-0.5 text-xs font-semibold rounded-full border"
                  style={{
                    backgroundColor: cat.colorBg,
                    borderColor: cat.colorBorder,
                    color: cat.colorText,
                  }}
                >
                  {t(`categories.${displayElement.category}`, cat.name)}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-xs text-slate-300 font-mono">
                <span>{t('element.period', 'Period')} {displayElement.period}</span>
                <span>•</span>
                <span>{t('element.group', 'Group')} {displayElement.group !== null ? displayElement.group : t('element.fBlock', 'f-block')}</span>
                <span>•</span>
                <span className="uppercase">{displayElement.block}-{t('element.block', 'block')}</span>
                <span>•</span>
                <span className="capitalize">{t(`phase.${displayElement.phaseAtSTP}`, displayElement.phaseAtSTP)} ({t('element.phase', 'STP')})</span>
              </div>

              {displayElement.appearance && (
                <p className="text-xs text-slate-400 mt-1 max-w-xl italic">
                  "{displayElement.appearance}"
                </p>
              )}
            </div>
          </div>

          {/* Quick Subatomic Particle Summary Badges */}
          <div className="flex sm:flex-col gap-2 shrink-0">
            <div className="flex items-center justify-between gap-3 px-3 py-1.5 rounded-lg bg-slate-950/70 border border-slate-800 text-xs font-mono">
              <span className="text-red-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-500" /> {t('element.protons', 'Protons')}
              </span>
              <strong className="text-slate-100">{displayElement.protons}</strong>
            </div>

            <div className="flex items-center justify-between gap-3 px-3 py-1.5 rounded-lg bg-slate-950/70 border border-slate-800 text-xs font-mono">
              <span className="text-blue-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-500" /> {t('element.neutrons', 'Neutrons')}
              </span>
              <strong className="text-slate-100">{displayElement.neutronsMostCommon}</strong>
            </div>

            <div className="flex items-center justify-between gap-3 px-3 py-1.5 rounded-lg bg-slate-950/70 border border-slate-800 text-xs font-mono">
              <span className="text-cyan-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400" /> {t('element.electrons', 'Electrons')}
              </span>
              <strong className="text-slate-100">{displayElement.electrons}</strong>
            </div>
          </div>
        </div>

        {displayElement.neutronNote && (
          <p className="text-[11px] text-slate-400 mt-3 pt-3 border-t border-slate-800/80">
            <strong>{t('element.isotopeNote', 'Isotope note:')}</strong> {displayElement.neutronNote}
          </p>
        )}
      </div>

      {/* Educational Mode Explanatory Banner */}
      <div
        className={`p-3.5 sm:p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all shadow-sm ${
          educationalMode === 'high-school'
            ? 'bg-slate-900/90 border-cyan-500/50 text-cyan-200'
            : educationalMode === 'university'
            ? 'bg-slate-900/90 border-purple-500/50 text-purple-200'
            : 'bg-slate-900/90 border-emerald-500/50 text-emerald-200'
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`p-2.5 rounded-xl shrink-0 ${
              educationalMode === 'high-school'
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                : educationalMode === 'university'
                ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
            }`}
          >
            {educationalMode === 'high-school' && <GraduationCap className="w-5 h-5" />}
            {educationalMode === 'university' && <Microscope className="w-5 h-5" />}
            {educationalMode === 'quick-reference' && <Zap className="w-5 h-5" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-slate-100">
                {educationalMode === 'high-school'
                  ? t('mode.highSchoolTitle', 'High School Mode')
                  : educationalMode === 'university'
                  ? t('mode.universityTitle', 'University Mode')
                  : t('mode.quickRefTitle', 'Quick Reference Mode')}
              </span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                  educationalMode === 'high-school'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                    : educationalMode === 'university'
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                    : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                }`}
              >
                {educationalMode === 'high-school'
                  ? t('mode.highSchoolBadge', 'Foundational Chemistry')
                  : educationalMode === 'university'
                  ? t('mode.universityBadge', 'Advanced & Quantum')
                  : t('mode.quickRefBadge', 'Data Sheet View')}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {educationalMode === 'high-school'
                ? t('mode.highSchoolSubtitle', 'Focuses on foundational concepts, subatomic particles, valence shells, everyday compounds & applications.')
                : educationalMode === 'university'
                ? t('mode.universitySubtitle', 'Comprehensive quantum configurations, orbital diagrams, thermodynamics & advanced chemical properties.')
                : t('mode.quickRefSubtitle', 'Compact data sheet with key physical and chemical constants for rapid lookup.')}
            </p>
          </div>
        </div>
      </div>

      {/* QUICK REFERENCE MODE: High-Density Scientific Data Sheet */}
      {educationalMode === 'quick-reference' ? (
        <div className="space-y-4 animate-fade-in">
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-lg text-xs font-mono">
            <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-slate-400 block mb-0.5 text-[11px] font-sans">{t('element.atomicNumber', 'Atomic Number')} (Z)</span>
              <strong className="text-cyan-300 text-base">{element.atomicNumber}</strong>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-slate-400 block mb-0.5 text-[11px] font-sans">{t('element.atomicMass', 'Standard Atomic Weight')}</span>
              <strong className="text-slate-100 text-base">{element.atomicMassString}</strong>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-slate-400 block mb-0.5 text-[11px] font-sans">{t('element.configShorthand', 'Condensed Configuration')}</span>
              <strong className="text-pink-300 text-sm">{element.electronConfiguration.shorthand}</strong>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-slate-400 block mb-0.5 text-[11px] font-sans">{t('element.valenceElectrons', 'Valence Electrons')}</span>
              <strong className="text-amber-300 text-base">{element.electronConfiguration.valenceElectrons} e⁻</strong>
            </div>
          </div>

          {/* Side-by-side Tables: Physical Constants & Chemical Constants */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Physical Constants */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-lg">
              <div className="flex items-center justify-between pb-2.5 border-b border-slate-800 mb-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <Thermometer className="w-3.5 h-3.5" />
                  {t('mode.physicalConstants', 'Physical Constants')}
                </h3>
                {/* Temp Switch */}
                <div role="group" aria-label="Temperature unit" className="flex items-center bg-slate-950 px-1 py-0.5 rounded border border-slate-800 text-[10px] font-mono">
                  {(['K', 'C', 'F'] as TemperatureUnit[]).map((u) => (
                    <button
                      type="button"
                      key={u}
                      onClick={() => onTempUnitChange(u)}
                      aria-pressed={tempUnit === u}
                      aria-label={`Degrees ${u}`}
                      className={`px-1.5 py-0.5 rounded transition-colors focus-visible:ring-1 focus-visible:ring-cyan-400 ${
                        tempUnit === u ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      °{u}
                    </button>
                  ))}
                </div>
              </div>
              <table className="w-full text-xs">
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  <tr>
                    <th scope="row" className="py-2 text-left font-normal text-slate-300 font-sans">{t('element.phase', 'Phase at STP')}</th>
                    <td className="py-2 text-right text-slate-200 capitalize font-bold">{t(`phase.${displayElement.physicalProperties.phase}`, displayElement.physicalProperties.phase)}</td>
                  </tr>
                  <tr>
                    <th scope="row" className="py-2 text-left font-normal text-slate-300 font-sans">{t('element.density', 'Density')}</th>
                    <td className="py-2 text-right text-slate-200">
                      {displayElement.physicalProperties.density !== undefined ? `${displayElement.physicalProperties.density} ${displayElement.physicalProperties.densityUnit || 'g/cm³'}` : 'N/A'}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row" className="py-2 text-left font-normal text-slate-300 font-sans">{t('element.meltingPoint', 'Melting Point')}</th>
                    <td className="py-2 text-right text-slate-200">{convertTemperature(displayElement.physicalProperties.meltingPointKelvin, tempUnit)}</td>
                  </tr>
                  <tr>
                    <th scope="row" className="py-2 text-left font-normal text-slate-300 font-sans">{t('element.boilingPoint', 'Boiling Point')}</th>
                    <td className="py-2 text-right text-slate-200">{convertTemperature(displayElement.physicalProperties.boilingPointKelvin, tempUnit)}</td>
                  </tr>
                  <tr>
                    <th scope="row" className="py-2 text-left font-normal text-slate-300 font-sans">{t('element.crystalStructure', 'Crystal Structure')}</th>
                    <td className="py-2 text-right text-slate-200 uppercase">{displayElement.physicalProperties.crystalStructure || 'N/A'}</td>
                  </tr>
                  <tr>
                    <th scope="row" className="py-2 text-left font-normal text-slate-300 font-sans">{t('element.mohsHardness', 'Mohs Hardness')}</th>
                    <td className="py-2 text-right text-slate-200">{displayElement.physicalProperties.mohsHardness ?? 'N/A'}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Chemical & Thermodynamic Constants */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-lg">
              <div className="pb-2.5 border-b border-slate-800 mb-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5" aria-hidden="true" />
                  {t('mode.chemicalConstants', 'Chemical & Thermodynamic Constants')}
                </h3>
              </div>
              <table className="w-full text-xs">
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  <tr>
                    <th scope="row" className="py-2 text-left font-normal text-slate-300 font-sans">{t('element.electronegativity', 'Electronegativity')}</th>
                    <td className="py-2 text-right text-slate-200">
                      {displayElement.chemicalProperties.electronegativity !== undefined ? `${displayElement.chemicalProperties.electronegativity} (Pauling)` : 'N/A'}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row" className="py-2 text-left font-normal text-slate-300 font-sans">{t('element.firstIonizationEnergy', '1st Ionization Energy')}</th>
                    <td className="py-2 text-right text-slate-200">
                      {displayElement.chemicalProperties.firstIonizationEnergy !== undefined ? `${displayElement.chemicalProperties.firstIonizationEnergy} kJ/mol` : 'N/A'}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row" className="py-2 text-left font-normal text-slate-300 font-sans">{t('element.electronAffinity', 'Electron Affinity')}</th>
                    <td className="py-2 text-right text-slate-200">
                      {displayElement.chemicalProperties.electronAffinity !== undefined ? `${displayElement.chemicalProperties.electronAffinity} kJ/mol` : 'N/A'}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row" className="py-2 text-left font-normal text-slate-300 font-sans">{t('element.atomicRadius', 'Atomic Radius')}</th>
                    <td className="py-2 text-right text-slate-200">
                      {displayElement.chemicalProperties.atomicRadius !== undefined ? `${displayElement.chemicalProperties.atomicRadius} pm` : 'N/A'}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row" className="py-2 text-left font-normal text-slate-300 font-sans">{t('element.mainOxidationState', 'Primary State')}</th>
                    <td className="py-2 text-right font-bold text-cyan-300">
                      {displayElement.chemicalProperties.mainOxidationState !== undefined
                        ? (displayElement.chemicalProperties.mainOxidationState > 0 ? `+${displayElement.chemicalProperties.mainOxidationState}` : displayElement.chemicalProperties.mainOxidationState)
                        : 'None'}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row" className="py-2 text-left font-normal text-slate-300 font-sans">{t('element.oxidationStates', 'All Oxidation States')}</th>
                    <td className="py-2 text-right text-slate-200">
                      {displayElement.chemicalProperties.oxidationStates.map(o => o > 0 ? `+${o}` : o).join(', ') || 'None'}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Shell Distribution & Safety Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Shell Distribution & Full Config */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-lg text-xs">
              <h3 className="font-bold text-slate-200 mb-2 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                {t('mode.atomicConstants', 'Atomic & Electronic Constants')}
              </h3>
              <div className="space-y-2 font-mono">
                <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-400 font-sans">{t('element.shellDistribution', 'Shells')}:</span>
                  <span className="text-cyan-300">[{element.electronConfiguration.shells.join(', ')}]</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-400 font-sans">{t('element.configFull', 'Full Config')}:</span>
                  <span className="text-slate-200 text-[11px] truncate max-w-[220px]" title={element.electronConfiguration.full}>
                    {element.electronConfiguration.full}
                  </span>
                </div>
                {element.casNumber && (
                  <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                    <span className="text-slate-400 font-sans">{t('element.casNumber', 'CAS Number')}:</span>
                    <span className="text-slate-300">{element.casNumber}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Safety & Key Ions Quick Badges */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-lg text-xs">
              <h3 className="font-bold text-slate-200 mb-2 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-amber-400" />
                {t('mode.safetySummary', 'Safety & Classification')}
              </h3>
              <div className="space-y-2">
                <div className="flex flex-wrap gap-1.5">
                  <span className="px-2 py-1 rounded bg-slate-950 border border-slate-800 text-[11px]">
                    {t('element.toxicity', 'Toxicity')}: <strong className="capitalize">{t(`toxicity.${displayElement.safety.toxicity}`, displayElement.safety.toxicity)}</strong>
                  </span>
                  <span className="px-2 py-1 rounded bg-slate-950 border border-slate-800 text-[11px]">
                    {t('element.flammable', 'Flammability')}: <strong className="capitalize">{t(`flammability.${displayElement.safety.flammability}`, displayElement.safety.flammability)}</strong>
                  </span>
                  {displayElement.safety.radioactivity && (
                    <span className="px-2 py-1 rounded bg-rose-500/20 text-rose-400 border border-rose-500/40 text-[11px] font-bold">
                      {t('element.radioactive', 'Radioactive')}
                    </span>
                  )}
                  {displayElement.safety.corrosiveness && (
                    <span className="px-2 py-1 rounded bg-purple-500/20 text-purple-400 border border-purple-500/40 text-[11px] font-bold">
                      {t('element.corrosive', 'Corrosive')}
                    </span>
                  )}
                </div>
                {displayElement.commonIons.length > 0 && (
                  <div className="pt-2 border-t border-slate-800/80">
                    <span className="text-slate-400 block mb-1 font-sans">{t('mode.commonIonsSummary', 'Common Ions')}:</span>
                    <div className="flex flex-wrap gap-1.5 font-mono">
                      {displayElement.commonIons.map((ion, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded bg-pink-950/60 text-pink-300 border border-pink-800/60 font-bold">
                          {ion.formula} ({ion.configuration})
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick Compounds List (if present) */}
          {displayElement.compounds.length > 0 && (
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-lg text-xs">
              <h3 className="font-bold text-slate-200 mb-2 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-indigo-400" />
                {t('mode.quickCompounds', 'Key Everyday Compounds')}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {displayElement.compounds.map((comp, idx) => (
                  <div key={idx} className="p-2 rounded-xl bg-slate-950/60 border border-slate-800">
                    <span className="font-mono font-bold text-cyan-300">{comp.formula}</span>
                    <span className="block text-[11px] text-slate-300 truncate">{comp.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reference Sources */}
          <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800 text-[11px] text-slate-400 flex flex-wrap items-center justify-between gap-2">
            <span>{t('element.sources', 'Scientific sources')}: {element.sources.join(' • ')}</span>
            <span>{t('element.units', 'Standard units: Kelvin (K), pm (picometers), kJ/mol, g/cm³')}</span>
          </div>
        </div>
      ) : (
        /* HIGH SCHOOL & UNIVERSITY MODES: Pedagogical / In-Depth Narrative Views */
        <div className="space-y-6 animate-fade-in">
          {/* 2. "Understand this element" (Educational Feature) */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-lg">
            <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2 mb-3">
              <BookOpen className="w-5 h-5 text-cyan-400" />
              <span>{t('element.understandTitle', 'Understand This Element')}: {displayElement.name}</span>
            </h2>

            {educationalMode === 'high-school' ? (
              <div className="space-y-4">
                {/* In simple terms */}
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                  <h3 className="text-xs font-semibold text-cyan-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                    {t('element.simpleTerms', 'In Simple Terms')}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {displayElement.understanding.simpleTerms}
                  </p>
                </div>

                {/* High-yield learning points */}
                <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800/80">
                  <h3 className="text-xs font-semibold text-amber-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    {t('element.whatToRemember', 'High-Yield Learning Points')}
                  </h3>
                  <ul className="space-y-1.5 text-sm text-slate-300">
                    {displayElement.understanding.keyTakeaways.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-cyan-400 font-bold mt-0.5">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Expandable deeper mechanics for curious high school students */}
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => setShowDeepMechanics(!showDeepMechanics)}
                    aria-expanded={showDeepMechanics}
                    aria-controls="deep-mechanics-panel"
                    className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-950/60 hover:bg-slate-950 border border-slate-800 text-xs transition-colors focus-visible:ring-2 focus-visible:ring-pink-400"
                  >
                    <span className="flex items-center gap-2 text-pink-300 font-semibold">
                      <Atom className="w-4 h-4" aria-hidden="true" />
                      {t('mode.deeperMechanics', 'Want to go deeper? (Quantum Subshell Mechanics)')}
                    </span>
                    {showDeepMechanics ? <ChevronUp className="w-4 h-4 text-slate-400" aria-hidden="true" /> : <ChevronDown className="w-4 h-4 text-slate-400" aria-hidden="true" />}
                  </button>
                  {showDeepMechanics && (
                    <div id="deep-mechanics-panel" className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-sm text-slate-300 leading-relaxed mt-2 animate-fade-in">
                      <h4 className="text-xs font-semibold text-pink-300 uppercase tracking-wider mb-1.5">
                        {t('element.whyItBehaves', 'Why It Behaves This Way')}
                      </h4>
                      <p>{displayElement.understanding.whyItBehavesThisWay}</p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* University Mode: side-by-side full quantum rigor */
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* In simple terms */}
                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                    <h3 className="text-xs font-semibold text-cyan-300 uppercase tracking-wider mb-1.5">
                      {t('element.simpleTerms', 'In Simple Terms')}
                    </h3>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {displayElement.understanding.simpleTerms}
                    </p>
                  </div>

                  {/* Why it behaves this way */}
                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                    <h3 className="text-xs font-semibold text-pink-300 uppercase tracking-wider mb-1.5">
                      {t('element.whyItBehaves', 'Why It Behaves This Way')}
                    </h3>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {displayElement.understanding.whyItBehavesThisWay}
                    </p>
                  </div>
                </div>

                {/* What to remember bullet points */}
                <div className="mt-4 p-4 rounded-xl bg-slate-950/40 border border-slate-800/80">
                  <h3 className="text-xs font-semibold text-amber-300 uppercase tracking-wider mb-2">
                    {t('element.whatToRemember', 'High-Yield Learning Points')}
                  </h3>
                  <ul className="space-y-1.5 text-sm text-slate-300">
                    {displayElement.understanding.keyTakeaways.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-cyan-400 font-bold mt-0.5">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>

      {/* 3. Electron Configuration & Shell Distribution */}
      <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-lg">
        <h2 className="text-base font-bold text-slate-100 flex items-center gap-2 mb-3">
          <Layers className="w-4 h-4 text-cyan-400" />
          <span>{t('element.configFull', 'Electron Configuration & Shells')}</span>
        </h2>

        {educationalMode === 'high-school' ? (
          <div className="space-y-4 mb-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="text-xs text-slate-400 block mb-1">{t('element.configShorthand', 'Condensed Configuration')}</span>
                <span className="font-mono text-sm sm:text-base font-bold text-cyan-300">
                  {element.electronConfiguration.shorthand}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="text-xs text-slate-400 block mb-1">{t('element.valenceElectrons', 'Valence Electrons')}</span>
                <span className="font-mono text-sm sm:text-base font-bold text-amber-300">
                  {element.electronConfiguration.valenceElectrons} ({t('element.valenceShell', 'Shell')} {element.electronConfiguration.valenceShellNumber})
                </span>
              </div>
            </div>

            <div>
              <button
                type="button"
                onClick={() => setShowFullConfigInHighSchool(!showFullConfigInHighSchool)}
                aria-expanded={showFullConfigInHighSchool}
                aria-controls="full-config-high-school-panel"
                className="text-xs text-cyan-400 hover:text-cyan-300 font-mono flex items-center gap-1.5 py-1 px-2 rounded-lg hover:bg-slate-950/60 transition-colors focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                <span>{showFullConfigInHighSchool ? t('mode.hideFullConfig', 'Hide full subshell configuration') : t('mode.fullConfigToggle', 'Show full subshell configuration')}</span>
                {showFullConfigInHighSchool ? <ChevronUp className="w-3.5 h-3.5" aria-hidden="true" /> : <ChevronDown className="w-3.5 h-3.5" aria-hidden="true" />}
              </button>
              {showFullConfigInHighSchool && (
                <div id="full-config-high-school-panel" className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 font-mono text-xs text-slate-200 mt-2 animate-fade-in break-words">
                  {element.electronConfiguration.full}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-xs text-slate-400 block mb-1">{t('element.configShorthand', 'Condensed Configuration')}</span>
              <span className="font-mono text-sm sm:text-base font-bold text-cyan-300">
                {element.electronConfiguration.shorthand}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-xs text-slate-400 block mb-1">{t('element.valenceElectrons', 'Valence Electrons')}</span>
              <span className="font-mono text-sm sm:text-base font-bold text-amber-300">
                {element.electronConfiguration.valenceElectrons} ({t('element.valenceShell', 'Shell')} {element.electronConfiguration.valenceShellNumber})
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-xs text-slate-400 block mb-1">{t('element.configFull', 'Full Configuration')}</span>
              <span className="font-mono text-xs sm:text-sm text-slate-200 break-words">
                {element.electronConfiguration.full}
              </span>
            </div>
          </div>
        )}

        {/* Visual Shell Progression Bar */}
        <div className="space-y-1.5">
          <span className="text-xs text-slate-400 font-semibold">{t('element.shellDistribution', 'Shell Distribution')}:</span>
          <div className="flex items-center gap-2 overflow-x-auto py-1">
            {element.electronConfiguration.shells.map((count, idx) => {
              const shellName = ['K (n=1)', 'L (n=2)', 'M (n=3)', 'N (n=4)', 'O (n=5)', 'P (n=6)', 'Q (n=7)'][idx] || `n=${idx + 1}`;
              const isValence = idx === element.electronConfiguration.shells.length - 1;

              return (
                <div
                  key={idx}
                  className={`flex flex-col items-center justify-center px-3 py-2 rounded-xl border text-center transition-colors ${
                    isValence
                      ? 'bg-cyan-500/20 border-cyan-400/60 ring-1 ring-cyan-400/30 font-bold'
                      : 'bg-slate-950/60 border-slate-800 text-slate-300'
                  }`}
                >
                  <span className="text-[10px] text-slate-400 font-mono">{shellName}</span>
                  <span className={`font-mono text-base font-bold ${isValence ? 'text-cyan-300' : 'text-slate-200'}`}>
                    {count} e⁻
                  </span>
                  {isValence && (
                    <span className="text-[9px] font-bold text-cyan-300 uppercase tracking-tighter mt-0.5">
                      {t('orbital.valence', 'Valence')}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4. Physical & Chemical Properties Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Physical Properties */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-lg">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
            <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <Thermometer className="w-4 h-4 text-emerald-400" />
              <span>{t('element.physicalProperties', 'Physical Properties')}</span>
            </h2>

            {/* Temperature unit switch */}
            <div role="group" aria-label="Temperature unit" className="flex items-center bg-slate-950 px-1 py-0.5 rounded-lg border border-slate-800 text-[11px] font-mono">
              {(['K', 'C', 'F'] as TemperatureUnit[]).map((u) => (
                <button
                  type="button"
                  key={u}
                  onClick={() => onTempUnitChange(u)}
                  aria-pressed={tempUnit === u}
                  aria-label={`Degrees ${u}`}
                  className={`px-1.5 py-0.5 rounded transition-colors focus-visible:ring-1 focus-visible:ring-cyan-400 ${
                    tempUnit === u ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  °{u}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">{t('element.phase', 'Phase at STP')}</span>
              <strong className="text-slate-200 capitalize">{t(`phase.${displayElement.physicalProperties.phase}`, displayElement.physicalProperties.phase)}</strong>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">{t('element.density', 'Density')}</span>
              <strong className="text-slate-200">
                {displayElement.physicalProperties.density !== undefined
                  ? `${displayElement.physicalProperties.density} ${displayElement.physicalProperties.densityUnit || 'g/cm³'}`
                  : 'N/A'}
              </strong>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">{t('element.meltingPoint', 'Melting Point')}</span>
              <strong className="text-slate-200">
                {convertTemperature(displayElement.physicalProperties.meltingPointKelvin, tempUnit)}
              </strong>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">{t('element.boilingPoint', 'Boiling Point')}</span>
              <strong className="text-slate-200">
                {convertTemperature(displayElement.physicalProperties.boilingPointKelvin, tempUnit)}
              </strong>
            </div>

            {educationalMode === 'university' && displayElement.physicalProperties.crystalStructure && (
              <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="text-slate-400 block mb-0.5">{t('element.crystalStructure', 'Crystal Structure')}</span>
                <strong className="text-slate-200 uppercase font-mono">
                  {displayElement.physicalProperties.crystalStructure}
                </strong>
              </div>
            )}

            {educationalMode === 'university' && displayElement.physicalProperties.mohsHardness !== undefined && (
              <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="text-slate-400 block mb-0.5">{t('element.mohsHardness', 'Mohs Hardness')}</span>
                <strong className="text-slate-200">{displayElement.physicalProperties.mohsHardness}</strong>
              </div>
            )}
          </div>
        </div>

        {/* Chemical Properties */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-lg">
          <div className="pb-3 border-b border-slate-800 mb-3">
            <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span>{t('element.chemicalProperties', 'Chemical Properties')}</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs mb-3">
            <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">{t('element.electronegativity', 'Electronegativity')}</span>
              <strong className="text-slate-200">
                {displayElement.chemicalProperties.electronegativity !== undefined
                  ? `${displayElement.chemicalProperties.electronegativity} (Pauling)`
                  : 'N/A'}
              </strong>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">{t('element.atomicRadius', 'Atomic Radius')}</span>
              <strong className="text-slate-200">
                {displayElement.chemicalProperties.atomicRadius !== undefined
                  ? `${displayElement.chemicalProperties.atomicRadius} pm`
                  : 'N/A'}
              </strong>
            </div>

            {educationalMode === 'university' && (
              <>
                <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="text-slate-400 block mb-0.5">{t('element.firstIonizationEnergy', '1st Ionization Energy')}</span>
                  <strong className="text-slate-200">
                    {displayElement.chemicalProperties.firstIonizationEnergy !== undefined
                      ? `${displayElement.chemicalProperties.firstIonizationEnergy} kJ/mol`
                      : 'N/A'}
                  </strong>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="text-slate-400 block mb-0.5">{t('element.electronAffinity', 'Electron Affinity')}</span>
                  <strong className="text-slate-200">
                    {displayElement.chemicalProperties.electronAffinity !== undefined
                      ? `${displayElement.chemicalProperties.electronAffinity} kJ/mol`
                      : 'N/A'}
                  </strong>
                </div>
              </>
            )}
          </div>

          <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs">
            <span className="text-slate-400 block mb-1">{t('element.oxidationStates', 'Common Oxidation States')}</span>
            <div className="flex flex-wrap gap-1.5 font-mono">
              {displayElement.chemicalProperties.oxidationStates.length > 0 ? (
                displayElement.chemicalProperties.oxidationStates.map((ox, idx) => (
                  <span
                    key={idx}
                    className={`px-2 py-0.5 rounded ${
                      ox === displayElement.chemicalProperties.mainOxidationState
                        ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40'
                        : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {ox > 0 ? `+${ox}` : ox}
                  </span>
                ))
              ) : (
                <span className="text-slate-500">None</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 5. Common Ions & Isotopes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Common Ions */}
        {displayElement.commonIons.length > 0 && (
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-lg">
            <h2 className="text-base font-bold text-slate-100 flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-pink-400" />
              <span>{t('element.commonIons', 'Common Ions')}</span>
            </h2>

            <div className="space-y-2.5">
              {displayElement.commonIons.map((ion, idx) => {
                const isSelected = selectedIon?.formula === ion.formula;

                return (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border transition-all ${
                      isSelected
                        ? 'bg-pink-950/40 border-pink-500/60 ring-1 ring-pink-500/30'
                        : 'bg-slate-950/60 border-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-base font-bold text-pink-400">
                          {ion.formula}
                        </span>
                        <span className="text-xs text-slate-400 font-mono">
                          ({ion.electronCount} e⁻, config: {ion.configuration})
                        </span>
                      </div>

                      {onSelectIon && (
                        <button
                          type="button"
                          onClick={() => onSelectIon(isSelected ? null : ion)}
                          aria-pressed={isSelected}
                          aria-label={isSelected ? `Viewing ion ${ion.formula} in 3D` : `Simulate ion ${ion.formula} in 3D`}
                          className={`text-xs px-2.5 py-1 rounded font-medium transition-colors focus-visible:ring-2 focus-visible:ring-pink-400 ${
                            isSelected
                              ? 'bg-pink-600 text-white'
                              : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                          }`}
                        >
                          {isSelected ? t('element.viewingIn3D', 'Viewing in 3D') : t('element.simulateIn3D', 'Simulate in 3D')}
                        </button>
                      )}
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {ion.explanation}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Isotopes */}
        {displayElement.isotopes.length > 0 && (
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-lg">
            <h2 className="text-base font-bold text-slate-100 flex items-center gap-2 mb-3">
              <Atom className="w-4 h-4 text-cyan-400" />
              <span>{t('element.isotopes', 'Key Isotopes')}</span>
            </h2>

            <div className="space-y-2">
              {displayElement.isotopes.map((iso, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs font-mono"
                >
                  <div className="flex items-center gap-2">
                    <strong className="text-slate-100 font-bold text-sm">{iso.symbol}</strong>
                    <span className="text-slate-400">({iso.neutrons} {t('element.neutrons', 'neutrons')})</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {iso.isStable ? (
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px]">
                        {t('element.stable', 'Stable')} {iso.abundance ? `(${iso.abundance}%)` : ''}
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[10px]">
                        t½: {iso.halfLife || t('element.radioactive', 'Radioactive')}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 6. Important Compounds */}
      {displayElement.compounds.length > 0 && (
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-lg">
          <h2 className="text-base font-bold text-slate-100 flex items-center gap-2 mb-3">
            <Layers className="w-4 h-4 text-indigo-400" />
            <span>{t('element.compounds', 'Important Chemical Compounds')}</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {displayElement.compounds.map((comp, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-sm font-bold text-cyan-300">{comp.formula}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 capitalize">
                    {t(`bondType.${comp.bondType}`, comp.bondType)}
                  </span>
                </div>
                <strong className="text-slate-200 block mb-1">{comp.name}</strong>
                <p className="text-slate-400 text-[11px] leading-relaxed">{comp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 7. Real-World Applications */}
      {displayElement.applications.length > 0 && (
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-lg">
          <h2 className="text-base font-bold text-slate-100 flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>{t('element.applications', 'Real-World Applications')}</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {displayElement.applications.map((app, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0 mt-1" />
                <span className="text-slate-300 leading-relaxed">{app}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 8. Biological Role & Safety Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Biological Importance */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-lg">
          <h2 className="text-base font-bold text-slate-100 flex items-center gap-2 mb-3">
            <Biohazard className="w-4 h-4 text-emerald-400" />
            <span>{t('element.biologicalRole', 'Biological Role & Human Health')}</span>
          </h2>

          <div className="space-y-3 text-xs">
            <div className="flex items-center gap-2">
              <span
                className={`px-2.5 py-0.5 rounded-full font-semibold border ${
                  displayElement.biologicalRole.isEssential
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    : 'bg-slate-800 text-slate-400 border-slate-700'
                }`}
              >
                {displayElement.biologicalRole.isEssential ? t('element.essential', 'Essential Nutrient') : t('element.nonEssential', 'Non-Essential')}
              </span>
            </div>

            <p className="text-slate-300 leading-relaxed">
              {displayElement.biologicalRole.humanImportance}
            </p>

            {displayElement.biologicalRole.dietarySources && displayElement.biologicalRole.dietarySources.length > 0 && (
              <div>
                <span className="text-slate-400 font-semibold block mb-1">{t('element.dietarySources', 'Common Dietary Sources:')}</span>
                <div className="flex flex-wrap gap-1.5">
                  {displayElement.biologicalRole.dietarySources.map((src, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800">
                      {src}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Safety & Hazards */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-lg">
          <h2 className="text-base font-bold text-slate-100 flex items-center gap-2 mb-3">
            <Shield className="w-4 h-4 text-rose-400" />
            <span>{t('element.safety', 'Safety & Hazards')}</span>
          </h2>

          <div className="space-y-3 text-xs">
            <div className="flex flex-wrap gap-2">
              {displayElement.safety.radioactivity && (
                <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/40 flex items-center gap-1 font-bold">
                  <Radio className="w-3 h-3" /> {t('element.radioactive', 'Radioactive')}
                </span>
              )}
              {displayElement.safety.flammability !== 'non-flammable' && (
                <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center gap-1 font-bold capitalize">
                  <Flame className="w-3 h-3" /> {t('element.flammable', 'Flammable')} ({t(`flammability.${displayElement.safety.flammability}`, displayElement.safety.flammability)})
                </span>
              )}
              {displayElement.safety.corrosiveness && (
                <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-400 border border-purple-500/40 flex items-center gap-1 font-bold">
                  <AlertTriangle className="w-3 h-3" /> {t('element.corrosive', 'Corrosive')}
                </span>
              )}
              <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 capitalize">
                {t('element.toxicity', 'Toxicity')}: {t(`toxicity.${displayElement.safety.toxicity}`, displayElement.safety.toxicity)}
              </span>
            </div>

            <p className="text-slate-300 leading-relaxed">
              {displayElement.safety.handlingConcerns}
            </p>
          </div>
        </div>
      </div>

      {/* 9. Discovery & History */}
      <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-lg text-xs">
        <h2 className="text-base font-bold text-slate-100 flex items-center gap-2 mb-3">
          <Clock className="w-4 h-4 text-cyan-400" />
          <span>{t('element.history', 'Discovery & History')}</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-slate-400 block mb-0.5">{t('element.yearDiscovered', 'Year Discovered')}</span>
            <strong className="text-slate-200 text-sm font-mono">{displayElement.discovery.year}</strong>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-slate-400 block mb-0.5">{t('element.discoverer', 'Discoverer(s)')}</span>
            <strong className="text-slate-200 text-sm">{displayElement.discovery.discoverer}</strong>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-slate-400 block mb-0.5">{t('element.etymology', 'Etymology')}</span>
            <span className="text-slate-300 leading-tight block">{displayElement.discovery.etymology}</span>
          </div>
        </div>
      </div>

      {/* 10. Scientific Sources & Units Reference */}
      <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800 text-[11px] text-slate-400 flex flex-wrap items-center justify-between gap-2">
        <span>{t('element.sources', 'Scientific sources')}: {element.sources.join(' • ')}</span>
        <span>{t('element.units', 'Standard units: Kelvin (K), pm (picometers), kJ/mol, g/cm³')}</span>
      </div>
        </div>
      )}
    </div>
  );
};
