import React, { useState, useEffect, useRef } from 'react';
import type { ChemicalElement } from '../../types/element';
import {
  Search,
  SlidersHorizontal,
  Sun,
  Moon,
  HelpCircle,
  Bookmark,
  Clock,
  Sparkles,
  Layers,
  Scale,
  GraduationCap,
  X,
  Globe,
} from 'lucide-react';
import type { ElementFilterOptions } from '../../data/elements';
import { useI18n } from '../../utils/i18n';
import { getLocalizedElementName } from '../../data/elements/translations';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  filters: ElementFilterOptions;
  onFilterChange: (filters: ElementFilterOptions) => void;
  activeTab: 'table' | 'trends' | 'compare' | 'quiz';
  onTabChange: (tab: 'table' | 'trends' | 'compare' | 'quiz') => void;
  isDarkTheme: boolean;
  onToggleTheme: () => void;
  onOpenHelp: () => void;
  favorites: ChemicalElement[];
  recentElements: ChemicalElement[];
  onSelectElement: (el: ChemicalElement) => void;
  lang: 'en' | 'id';
  onLangChange: (lang: 'en' | 'id') => void;
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  filters,
  onFilterChange,
  activeTab,
  onTabChange,
  isDarkTheme,
  onToggleTheme,
  onOpenHelp,
  favorites,
  recentElements,
  onSelectElement,
  lang,
  onLangChange,
  className = '',
}) => {
  const { t } = useI18n();
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);
  const [showFavoritesDropdown, setShowFavoritesDropdown] = useState(false);
  const [showRecentDropdown, setShowRecentDropdown] = useState(false);

  const favoritesRef = useRef<HTMLDivElement>(null);
  const recentRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click or Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowFavoritesDropdown(false);
        setShowRecentDropdown(false);
        setShowFilterDrawer(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (favoritesRef.current && !favoritesRef.current.contains(e.target as Node)) {
        setShowFavoritesDropdown(false);
      }
      if (recentRef.current && !recentRef.current.contains(e.target as Node)) {
        setShowRecentDropdown(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const activeFilterCount = Object.values(filters).filter((v) => v && v !== 'all').length;

  return (
    <header className={`flex flex-col gap-3 py-3 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-30 ${className}`}>
      {/* Top Bar: Brand, Search, Tools */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 text-slate-950 font-black text-lg">
            Pt
          </div>
          <div>
            <span className="font-extrabold text-base sm:text-lg text-slate-100 tracking-tight block leading-tight">
              {t('app.title')}
            </span>
            <span className="text-[10px] text-cyan-400 font-medium tracking-wide uppercase block">
              {t('app.subtitle')}
            </span>
          </div>
        </div>

        {/* Search Field */}
        <div className="flex-1 max-w-md mx-2 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true" />
          <input
            id="element-search-input"
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={t('app.searchPlaceholder')}
            aria-label={t('app.searchPlaceholder')}
            autoComplete="off"
            className="w-full bg-slate-900/90 text-slate-100 placeholder-slate-400 text-xs sm:text-sm pl-9 pr-9 py-2 rounded-xl border border-slate-700/80 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400 outline-none transition-all shadow-inner"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              aria-label={t('app.clearSearch', 'Clear search input')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 focus-visible:ring-2 focus-visible:ring-cyan-400 p-0.5 rounded"
            >
              <X className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          )}
        </div>

        {/* Utilities: Filter, Favorites, Recent, Theme, Help */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Advanced Filter Toggle */}
          <button
            type="button"
            id="filter-drawer-toggle"
            aria-expanded={showFilterDrawer}
            aria-controls="advanced-filter-drawer"
            aria-label={`${t('table.filterBy')}${activeFilterCount > 0 ? ` (${activeFilterCount} active)` : ''}`}
            onClick={() => setShowFilterDrawer(!showFilterDrawer)}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-xl border transition-all ${
              activeFilterCount > 0
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                : 'bg-slate-900 text-slate-300 hover:text-slate-100 border-slate-800'
            }`}
            title="Filter elements"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" aria-hidden="true" />
            <span className="hidden sm:inline">{t('table.filterBy')}</span>
            {activeFilterCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-cyan-400 text-slate-950 font-bold text-[10px] flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* Favorites Button & Dropdown */}
          <div ref={favoritesRef} className="relative">
            <button
              type="button"
              aria-expanded={showFavoritesDropdown}
              aria-haspopup="dialog"
              aria-controls="favorites-dropdown-panel"
              aria-label={`${t('nav.favorites')} (${favorites.length})`}
              onClick={() => {
                setShowFavoritesDropdown(!showFavoritesDropdown);
                setShowRecentDropdown(false);
              }}
              className="p-2 rounded-xl bg-slate-900 text-slate-300 hover:text-slate-100 border border-slate-800 transition-colors"
              title={t('nav.favorites')}
            >
              <Bookmark className="w-4 h-4 text-amber-400" aria-hidden="true" />
            </button>

            {showFavoritesDropdown && (
              <div
                id="favorites-dropdown-panel"
                role="region"
                aria-label={t('nav.favorites')}
                className="absolute right-0 top-full mt-2 w-64 p-3 rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl z-50 text-xs animate-fade-in"
              >
                <div className="font-semibold text-slate-100 pb-2 border-b border-slate-800 mb-2 flex items-center justify-between">
                  <span>{t('nav.favorites')}</span>
                  <span className="text-[10px] text-slate-400 font-mono">({favorites.length})</span>
                </div>
                {favorites.length === 0 ? (
                  <p className="text-slate-400 py-2 text-center text-[11px]">{t('nav.noFavorites')}</p>
                ) : (
                  <div className="space-y-1 max-h-48 overflow-y-auto">
                    {favorites.map((el) => (
                      <button
                        key={el.atomicNumber}
                        type="button"
                        onClick={() => {
                          onSelectElement(el);
                          setShowFavoritesDropdown(false);
                        }}
                        className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-800 focus-visible:ring-2 focus-visible:ring-cyan-400 flex items-center justify-between text-slate-200"
                      >
                        <span className="font-medium">{getLocalizedElementName(el.atomicNumber, lang) || el.name}</span>
                        <span className="font-mono text-cyan-400 font-bold">{el.symbol}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Recent Elements Button & Dropdown */}
          <div ref={recentRef} className="relative">
            <button
              type="button"
              aria-expanded={showRecentDropdown}
              aria-haspopup="dialog"
              aria-controls="recent-dropdown-panel"
              aria-label={`${t('nav.recent', 'Recently Viewed Elements')} (${recentElements.length})`}
              onClick={() => {
                setShowRecentDropdown(!showRecentDropdown);
                setShowFavoritesDropdown(false);
              }}
              className="p-2 rounded-xl bg-slate-900 text-slate-300 hover:text-slate-100 border border-slate-800 transition-colors"
              title={t('nav.recent', 'Recently Viewed Elements')}
            >
              <Clock className="w-4 h-4 text-slate-300" aria-hidden="true" />
            </button>

            {showRecentDropdown && (
              <div
                id="recent-dropdown-panel"
                role="region"
                aria-label={t('nav.recent')}
                className="absolute right-0 top-full mt-2 w-64 p-3 rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl z-50 text-xs animate-fade-in"
              >
                <div className="font-semibold text-slate-100 pb-2 border-b border-slate-800 mb-2 flex items-center justify-between">
                  <span>{t('nav.recent')}</span>
                  <span className="text-[10px] text-slate-400 font-mono">({recentElements.length})</span>
                </div>
                {recentElements.length === 0 ? (
                  <p className="text-slate-400 py-2 text-center text-[11px]">{t('nav.noRecent')}</p>
                ) : (
                  <div className="space-y-1 max-h-48 overflow-y-auto">
                    {recentElements.map((el) => (
                      <button
                        key={el.atomicNumber}
                        type="button"
                        onClick={() => {
                          onSelectElement(el);
                          setShowRecentDropdown(false);
                        }}
                        className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-800 focus-visible:ring-2 focus-visible:ring-cyan-400 flex items-center justify-between text-slate-200"
                      >
                        <span className="font-medium">{getLocalizedElementName(el.atomicNumber, lang) || el.name}</span>
                        <span className="font-mono text-cyan-400 font-bold">{el.symbol}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={isDarkTheme ? t('app.themeLight') : t('app.themeDark')}
            className="p-2 rounded-xl bg-slate-900 text-slate-300 hover:text-slate-100 border border-slate-800 transition-colors"
            title={isDarkTheme ? t('app.themeLight') : t('app.themeDark')}
          >
            {isDarkTheme ? <Sun className="w-4 h-4 text-amber-400" aria-hidden="true" /> : <Moon className="w-4 h-4 text-cyan-400" aria-hidden="true" />}
          </button>

          {/* Language Toggle */}
          <button
            type="button"
            onClick={() => onLangChange(lang === 'en' ? 'id' : 'en')}
            aria-label={lang === 'en' ? 'Beralih ke Bahasa Indonesia' : 'Switch to English'}
            className="px-2.5 py-1.5 rounded-xl bg-slate-900 text-slate-300 hover:text-slate-100 border border-slate-800 transition-colors flex items-center gap-1 font-mono text-[11px]"
            title={lang === 'en' ? 'Beralih ke Bahasa Indonesia' : 'Switch to English'}
          >
            <Globe className="w-3.5 h-3.5 text-cyan-400" aria-hidden="true" />
            <span className="uppercase font-bold">{lang === 'en' ? 'EN' : 'ID'}</span>
          </button>

          {/* Help Modal Button */}
          <button
            type="button"
            onClick={onOpenHelp}
            aria-label={t('app.help')}
            className="p-2 rounded-xl bg-slate-900 text-slate-300 hover:text-slate-100 border border-slate-800 transition-colors"
            title={t('app.help')}
          >
            <HelpCircle className="w-4 h-4 text-slate-300" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Navigation Tabs (Periodic Table, Periodic Trends, Compare, Quiz) */}
      <nav aria-label={t('app.mainNav', 'Main navigation')} className="flex items-center gap-1 sm:gap-2 px-4 sm:px-6 overflow-x-auto text-xs font-semibold">
        <button
          type="button"
          onClick={() => onTabChange('table')}
          aria-current={activeTab === 'table' ? 'page' : undefined}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all ${
            activeTab === 'table'
              ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-md font-bold'
              : 'text-slate-400 hover:text-slate-200 border-transparent hover:border-slate-800'
          }`}
        >
          <Layers className="w-3.5 h-3.5" aria-hidden="true" />
          <span>{t('nav.table')}</span>
        </button>

        <button
          type="button"
          onClick={() => onTabChange('trends')}
          aria-current={activeTab === 'trends' ? 'page' : undefined}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all ${
            activeTab === 'trends'
              ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-md font-bold'
              : 'text-slate-400 hover:text-slate-200 border-transparent hover:border-slate-800'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
          <span>{t('nav.trends')}</span>
        </button>

        <button
          type="button"
          onClick={() => onTabChange('compare')}
          aria-current={activeTab === 'compare' ? 'page' : undefined}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all ${
            activeTab === 'compare'
              ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-md font-bold'
              : 'text-slate-400 hover:text-slate-200 border-transparent hover:border-slate-800'
          }`}
        >
          <Scale className="w-3.5 h-3.5" aria-hidden="true" />
          <span>{t('nav.compare')}</span>
        </button>

        <button
          type="button"
          onClick={() => onTabChange('quiz')}
          aria-current={activeTab === 'quiz' ? 'page' : undefined}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all ${
            activeTab === 'quiz'
              ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-md font-bold'
              : 'text-slate-400 hover:text-slate-200 border-transparent hover:border-slate-800'
          }`}
        >
          <GraduationCap className="w-3.5 h-3.5" aria-hidden="true" />
          <span>{t('nav.quiz')}</span>
        </button>
      </nav>

      {/* Advanced Filter Drawer (Expandable) */}
      {showFilterDrawer && (
        <div
          id="advanced-filter-drawer"
          role="region"
          aria-label={t('table.filterBy')}
          className="mx-4 sm:mx-6 p-4 rounded-2xl bg-slate-900 border border-slate-700 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 text-xs animate-fade-in shadow-xl"
        >
          {/* Phase Filter */}
          <div>
            <label htmlFor="filter-phase" className="text-slate-300 block mb-1 font-medium">{t('table.phaseFilter')}:</label>
            <select
              id="filter-phase"
              value={filters.phase || 'all'}
              onChange={(e) => onFilterChange({ ...filters, phase: e.target.value as any })}
              className="w-full bg-slate-950 text-slate-100 border border-slate-700 rounded-lg p-1.5 outline-none focus:ring-2 focus:ring-cyan-400"
            >
              <option value="all">{t('table.allPhases')}</option>
              <option value="solid">{t('table.solid')}</option>
              <option value="liquid">{t('table.liquid')}</option>
              <option value="gas">{t('table.gas')}</option>
            </select>
          </div>

          {/* Metal Type Filter */}
          <div>
            <label htmlFor="filter-metal" className="text-slate-300 block mb-1 font-medium">{t('element.category')}:</label>
            <select
              id="filter-metal"
              value={filters.metalType || 'all'}
              onChange={(e) => onFilterChange({ ...filters, metalType: e.target.value as any })}
              className="w-full bg-slate-950 text-slate-100 border border-slate-700 rounded-lg p-1.5 outline-none focus:ring-2 focus:ring-cyan-400"
            >
              <option value="all">{t('table.allCategories')}</option>
              <option value="metal">Metals</option>
              <option value="metalloid">Metalloids</option>
              <option value="nonmetal">Nonmetals</option>
            </select>
          </div>

          {/* Block Filter */}
          <div>
            <label htmlFor="filter-block" className="text-slate-300 block mb-1 font-medium">{t('element.block')}:</label>
            <select
              id="filter-block"
              value={filters.block || 'all'}
              onChange={(e) => onFilterChange({ ...filters, block: e.target.value as any })}
              className="w-full bg-slate-950 text-slate-100 border border-slate-700 rounded-lg p-1.5 outline-none focus:ring-2 focus:ring-cyan-400"
            >
              <option value="all">All Blocks</option>
              <option value="s">s-block</option>
              <option value="p">p-block</option>
              <option value="d">d-block</option>
              <option value="f">f-block</option>
            </select>
          </div>

          {/* Radioactivity Filter */}
          <div>
            <label htmlFor="filter-radioactivity" className="text-slate-300 block mb-1 font-medium">{t('element.radioactive')}:</label>
            <select
              id="filter-radioactivity"
              value={filters.radioactivity || 'all'}
              onChange={(e) => onFilterChange({ ...filters, radioactivity: e.target.value as any })}
              className="w-full bg-slate-950 text-slate-100 border border-slate-700 rounded-lg p-1.5 outline-none focus:ring-2 focus:ring-cyan-400"
            >
              <option value="all">All</option>
              <option value="stable">Stable</option>
              <option value="radioactive">{t('element.radioactive')}</option>
            </select>
          </div>

          {/* Origin Filter */}
          <div>
            <label htmlFor="filter-origin" className="text-slate-300 block mb-1 font-medium">Origin:</label>
            <select
              id="filter-origin"
              value={filters.origin || 'all'}
              onChange={(e) => onFilterChange({ ...filters, origin: e.target.value as any })}
              className="w-full bg-slate-950 text-slate-100 border border-slate-700 rounded-lg p-1.5 outline-none focus:ring-2 focus:ring-cyan-400"
            >
              <option value="all">All Origins</option>
              <option value="natural">Naturally Occurring</option>
              <option value="synthetic">Synthetic</option>
            </select>
          </div>

          {/* Reset Filters button */}
          <div className="flex items-end">
            <button
              type="button"
              onClick={() => onFilterChange({})}
              className="w-full p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium transition-colors focus:ring-2 focus:ring-cyan-400"
            >
              {t('table.resetFilters')}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
