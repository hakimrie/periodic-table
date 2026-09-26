import { useState, useEffect, useMemo, useCallback } from 'react';
import type {
  ChemicalElement,
  CommonIon,
  EducationalMode,
  ElementCategory,
  PeriodicTrendKey,
  TemperatureUnit,
} from './types/element';
import { allElements, getElementById, searchElements } from './data/elements';
import type { ElementFilterOptions } from './data/elements';
import { Header } from './components/Header/Header';
import { PeriodicTable } from './components/PeriodicTable/PeriodicTable';
import { Atom3D } from './components/Atom3D/Atom3D';
import { ElementDetails } from './components/ElementDetails/ElementDetails';
import { OrbitalDiagram } from './components/OrbitalDiagram/OrbitalDiagram';
import { TrendVisualization } from './components/TrendVisualization/TrendVisualization';
import { CompareElements } from './components/CompareElements/CompareElements';
import { QuizMode } from './components/Quiz/QuizMode';
import { HelpModal } from './components/HelpModal/HelpModal';
import { useI18n } from './utils/i18n';
import { parseElementFromPath } from './utils/url';
import { Microscope, Layers } from 'lucide-react';

export function App() {
  const { lang, setLang, t } = useI18n();

  // Selected Element state (default to Oxygen, Z=8, or from URL)
  const [selectedElement, setSelectedElement] = useState<ChemicalElement>(() => {
    return parseElementFromPath() || getElementById(8) || allElements[0];
  });

  const [hoveredElement, setHoveredElement] = useState<ChemicalElement | null>(null);
  const [selectedIon, setSelectedIon] = useState<CommonIon | null>(null);

  // App Navigation Tabs
  const [activeTab, setActiveTab] = useState<'table' | 'trends' | 'compare' | 'quiz'>('table');

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<ElementFilterOptions>({});
  const [highlightedCategory, setHighlightedCategory] = useState<ElementCategory | null>(null);

  // Educational mode & preferences
  const [educationalMode, setEducationalMode] = useState<EducationalMode>(() => {
    return (localStorage.getItem('pt_mode') as EducationalMode) || 'high-school';
  });

  const [tempUnit, setTempUnit] = useState<TemperatureUnit>(() => {
    return (localStorage.getItem('pt_temp_unit') as TemperatureUnit) || 'C';
  });

  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(() => {
    return localStorage.getItem('pt_theme') !== 'light';
  });

  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showOrbitalAnyway, setShowOrbitalAnyway] = useState(false);

  // Active trend for Trends Explorer
  const [activeTrend, setActiveTrend] = useState<PeriodicTrendKey>('atomicRadius');

  // Favorites & Recently viewed
  const [favoriteIds, setFavoriteIds] = useState<number[]>(() => {
    try {
      const stored = localStorage.getItem('pt_favorites');
      return stored ? JSON.parse(stored) : [1, 6, 8, 26, 79]; // H, C, O, Fe, Au
    } catch {
      return [1, 6, 8, 26, 79];
    }
  });

  const [recentIds, setRecentIds] = useState<number[]>(() => {
    try {
      const stored = localStorage.getItem('pt_recent');
      return stored ? JSON.parse(stored) : [8];
    } catch {
      return [8];
    }
  });

  // Synchronize Theme class on root
  useEffect(() => {
    if (isDarkTheme) {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
    localStorage.setItem('pt_theme', isDarkTheme ? 'dark' : 'light');
  }, [isDarkTheme]);

  // Synchronize educational mode & temp unit
  useEffect(() => {
    localStorage.setItem('pt_mode', educationalMode);
  }, [educationalMode]);

  useEffect(() => {
    localStorage.setItem('pt_temp_unit', tempUnit);
  }, [tempUnit]);

  // Handle URL deep linking & browser back/forward
  useEffect(() => {
    const handleUrlChange = () => {
      const el = parseElementFromPath();
      if (el) {
        setSelectedElement(el);
      }
    };
    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, []);

  const selectElement = useCallback(
    (el: ChemicalElement) => {
      setSelectedElement(el);
      setSelectedIon(null);

      // Update URL hash safely for both root and subpath hosting (e.g. /periodic-table/#elements/H)
      const newHash = `#elements/${el.symbol}`;
      if (window.location.hash !== newHash) {
        window.history.pushState(null, '', newHash);
      }

      // Add to recent elements
      setRecentIds((prev) => {
        const next = [el.atomicNumber, ...prev.filter((id) => id !== el.atomicNumber)].slice(0, 10);
        localStorage.setItem('pt_recent', JSON.stringify(next));
        return next;
      });
    },
    []
  );

  const toggleFavorite = useCallback(() => {
    setFavoriteIds((prev) => {
      const exists = prev.includes(selectedElement.atomicNumber);
      const next = exists
        ? prev.filter((id) => id !== selectedElement.atomicNumber)
        : [...prev, selectedElement.atomicNumber];
      localStorage.setItem('pt_favorites', JSON.stringify(next));
      return next;
    });
  }, [selectedElement]);

  const favorites = useMemo(() => {
    return favoriteIds.map((id) => getElementById(id)).filter(Boolean) as ChemicalElement[];
  }, [favoriteIds]);

  const recentElements = useMemo(() => {
    return recentIds.map((id) => getElementById(id)).filter(Boolean) as ChemicalElement[];
  }, [recentIds]);

  // Matched elements from search and filters
  const matchedElementIds = useMemo(() => {
    if (!searchQuery && Object.keys(filters).length === 0) {
      return undefined;
    }
    const results = searchElements(searchQuery, filters);
    return new Set(results.map((r) => r.atomicNumber));
  }, [searchQuery, filters]);

  // Neighbor elements in period sequence for prev/next
  const prevElement = useMemo(() => {
    const z = selectedElement.atomicNumber;
    return z > 1 ? getElementById(z - 1) : undefined;
  }, [selectedElement]);

  const nextElement = useMemo(() => {
    const z = selectedElement.atomicNumber;
    return z < 118 ? getElementById(z + 1) : undefined;
  }, [selectedElement]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Global Header */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filters={filters}
        onFilterChange={setFilters}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isDarkTheme={isDarkTheme}
        onToggleTheme={() => setIsDarkTheme(!isDarkTheme)}
        onOpenHelp={() => setShowHelpModal(true)}
        favorites={favorites}
        recentElements={recentElements}
        onSelectElement={selectElement}
        lang={lang}
        onLangChange={(l) => setLang(l)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto px-3 sm:px-6 py-6 space-y-8">
        {/* TAB 1: PERIODIC TABLE & EXPLORATION */}
        {activeTab === 'table' && (
          <div className="space-y-8 animate-fade-in">
            {/* Interactive Periodic Table Grid */}
            <section aria-label="Periodic Table Grid">
              <PeriodicTable
                selectedElement={selectedElement}
                onSelectElement={selectElement}
                onHoverElement={setHoveredElement}
                hoveredElement={hoveredElement}
                highlightedCategory={highlightedCategory}
                onSelectCategory={setHighlightedCategory}
                matchedElementIds={matchedElementIds}
              />
            </section>

            {/* Split Details Section: 3D Bohr Model + Comprehensive Details */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: 3D Bohr Model & Quantum Diagram */}
              <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
                <Atom3D
                  element={selectedElement}
                  selectedIon={selectedIon}
                  onToggleIon={() => {
                    if (selectedIon) {
                      setSelectedIon(null);
                    } else if (selectedElement.commonIons.length > 0) {
                      setSelectedIon(selectedElement.commonIons[0]);
                    }
                  }}
                />

                {/* Orbital Diagram (University / Detailed mode) */}
                {educationalMode === 'university' ? (
                  <OrbitalDiagram element={selectedElement} />
                ) : (
                  <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs shadow-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400">
                          <Layers className="w-4 h-4" />
                        </span>
                        <span className="font-bold text-slate-200 text-sm">
                          {t('mode.quantumOrbital', 'Quantum Orbital Spin Diagram')}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-semibold">
                        {t('app.universityMode', 'University')}
                      </span>
                    </div>

                    <p className="text-slate-400 leading-relaxed text-xs">
                      {t('mode.quantumOrbitalHint', "Subshell energy levels, Pauli exclusion, and Hund's rule spin arrows (↑↓) are featured in University Mode.")}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-2 pt-1">
                      <button
                        onClick={() => setEducationalMode('university')}
                        className="flex-1 py-2 px-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow"
                      >
                        <Microscope className="w-3.5 h-3.5" />
                        <span>{t('mode.switchToUniversity', 'Switch to University Mode')}</span>
                      </button>

                      <button
                        onClick={() => setShowOrbitalAnyway(!showOrbitalAnyway)}
                        className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs border border-slate-700/80 transition-colors"
                      >
                        {showOrbitalAnyway
                          ? t('mode.hideOrbital', 'Hide Orbital Diagram')
                          : t('mode.showOrbitalAnyway', 'Show Orbital Diagram')}
                      </button>
                    </div>

                    {showOrbitalAnyway && (
                      <div className="pt-3 border-t border-slate-800 animate-fade-in">
                        <OrbitalDiagram element={selectedElement} />
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Right Column: Complete Element Details */}
              <div className="lg:col-span-7">
                <ElementDetails
                  element={selectedElement}
                  onSelectElement={selectElement}
                  prevElement={prevElement}
                  nextElement={nextElement}
                  educationalMode={educationalMode}
                  onModeChange={setEducationalMode}
                  tempUnit={tempUnit}
                  onTempUnitChange={setTempUnit}
                  isFavorite={favoriteIds.includes(selectedElement.atomicNumber)}
                  onToggleFavorite={toggleFavorite}
                  selectedIon={selectedIon}
                  onSelectIon={setSelectedIon}
                />
              </div>
            </section>
          </div>
        )}

        {/* TAB 2: PERIODIC TRENDS */}
        {activeTab === 'trends' && (
          <div className="animate-fade-in">
            <TrendVisualization
              activeTrend={activeTrend}
              onTrendChange={setActiveTrend}
              selectedElement={selectedElement}
              onSelectElement={selectElement}
            />
          </div>
        )}

        {/* TAB 3: COMPARE ELEMENTS */}
        {activeTab === 'compare' && (
          <div className="animate-fade-in">
            <CompareElements
              initialElementA={selectedElement}
              initialElementB={allElements.find((e) => e.atomicNumber === 11) || allElements[0]} // Na comparison default
              tempUnit={tempUnit}
            />
          </div>
        )}

        {/* TAB 4: LEARNING QUIZ */}
        {activeTab === 'quiz' && (
          <div className="animate-fade-in">
            <QuizMode
              key={lang}
              onSelectElementById={(id) => {
                const el = getElementById(id);
                if (el) {
                  selectElement(el);
                  setActiveTab('table');
                }
              }}
            />
          </div>
        )}
      </main>

      {/* Global Footer */}
      <footer className="mt-auto border-t border-slate-900 bg-slate-950/90 py-6 px-4 text-center text-xs text-slate-500">
        <div className="max-w-4xl mx-auto space-y-2">
          <p className="leading-relaxed">
            {t('app.footerTitle', 'Interactive Periodic Table Learning Application — Designed for high-school & university chemistry education.')}
          </p>
          <p className="text-[11px] text-slate-600">
            {t('app.footerDesc', 'Scientific data compiled from IUPAC (2024 Periodic Table), NIST Physical Measurement Laboratory, and PubChem. All 118 chemical elements verified for atomic numbers, electron shells, masses, and periodic relationships.')}
          </p>
        </div>
      </footer>

      {/* Help Modal */}
      <HelpModal isOpen={showHelpModal} onClose={() => setShowHelpModal(false)} />
    </div>
  );
}

export default App;
