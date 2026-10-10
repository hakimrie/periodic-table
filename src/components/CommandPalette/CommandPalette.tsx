import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Search,
  Layers,
  Sparkles,
  Building2,
  Atom,
  Flame,
  FlaskConical,
  Scale,
  GraduationCap,
  Sun,
  Moon,
  Globe,
  HelpCircle,
  Shuffle,
  Trophy,
  CornerDownLeft,
} from 'lucide-react';
import type { ChemicalElement } from '../../types/element';
import type { AppTab } from '../../types/navigation';
import { allElements, categoryMetadata } from '../../data/elements';
import { getLocalizedElementName } from '../../data/elements/translations';
import { useI18n } from '../../utils/i18n';
import { matchSuperlatives, scoreElement, fuzzyScore } from './search';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectElement: (el: ChemicalElement) => void;
  onTabChange: (tab: AppTab) => void;
  onToggleTheme: () => void;
  onToggleLang: () => void;
  onOpenHelp: () => void;
  isDarkTheme: boolean;
}

type PaletteItem =
  | { kind: 'element'; id: string; el: ChemicalElement; hint?: string }
  | { kind: 'action'; id: string; label: string; icon: React.ReactNode; run: () => void; keywords: string };

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectElement,
  onTabChange,
  onToggleTheme,
  onToggleLang,
  onOpenHelp,
  isDarkTheme,
}) => {
  const { t, lang } = useI18n();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);

  // Open / close the native modal dialog (top layer, focus trap, Esc handling)
  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return;
    if (isOpen && !dlg.open) {
      setQuery('');
      setActive(0);
      dlg.showModal?.();
      requestAnimationFrame(() => inputRef.current?.focus());
    } else if (!isOpen && dlg.open) {
      dlg.close();
    }
  }, [isOpen]);

  // Light-dismiss fallback for browsers without <dialog closedby> (e.g. Safari)
  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg || 'closedBy' in HTMLDialogElement.prototype) return;
    const onClick = (event: MouseEvent) => {
      if (event.target !== dlg) return;
      const rect = dlg.getBoundingClientRect();
      const inside =
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width;
      if (!inside) dlg.close();
    };
    dlg.addEventListener('click', onClick);
    return () => dlg.removeEventListener('click', onClick);
  }, []);

  const actions = useMemo<PaletteItem[]>(() => {
    const go = (tab: AppTab) => () => onTabChange(tab);
    const random = () => onSelectElement(allElements[Math.floor(Math.random() * allElements.length)]);
    return [
      { kind: 'action', id: 'tab-table', label: t('nav.table', 'Periodic Table'), icon: <Layers />, run: go('table'), keywords: 'table grid tabel' },
      { kind: 'action', id: 'tab-trends', label: t('nav.trends', 'Periodic Trends'), icon: <Sparkles />, run: go('trends'), keywords: 'trends heatmap tren' },
      { kind: 'action', id: 'tab-skyline', label: t('nav.skyline', '3D Skyline'), icon: <Building2 />, run: go('skyline'), keywords: '3d skyline bars city' },
      { kind: 'action', id: 'tab-orbitals', label: t('nav.orbitals', 'Orbital Lab'), icon: <Atom />, run: go('orbitals'), keywords: 'orbital quantum cloud schrodinger' },
      { kind: 'action', id: 'tab-spectra', label: t('nav.spectra', 'Spectra & Flame Lab'), icon: <Flame />, run: go('spectra'), keywords: 'spectra flame emission bunsen burner spektrum nyala' },
      { kind: 'action', id: 'tab-lab', label: t('nav.lab', 'Molecule Lab'), icon: <FlaskConical />, run: go('lab'), keywords: 'molecule lab build compound molekul' },
      { kind: 'action', id: 'tab-compare', label: t('nav.compare', 'Compare Elements'), icon: <Scale />, run: go('compare'), keywords: 'compare versus banding' },
      { kind: 'action', id: 'tab-quiz', label: t('nav.quiz', 'Learning Quiz'), icon: <GraduationCap />, run: go('quiz'), keywords: 'quiz test kuis' },
      { kind: 'action', id: 'random', label: t('palette.random', 'Surprise me — random element'), icon: <Shuffle />, run: random, keywords: 'random surprise acak' },
      {
        kind: 'action',
        id: 'theme',
        label: isDarkTheme ? t('app.themeLight', 'Light Theme') : t('app.themeDark', 'Dark Theme'),
        icon: isDarkTheme ? <Sun /> : <Moon />,
        run: onToggleTheme,
        keywords: 'theme dark light tema gelap terang',
      },
      {
        kind: 'action',
        id: 'lang',
        label: lang === 'en' ? 'Beralih ke Bahasa Indonesia' : 'Switch to English',
        icon: <Globe />,
        run: onToggleLang,
        keywords: 'language bahasa english indonesia',
      },
      { kind: 'action', id: 'help', label: t('app.help', 'Help & Guide'), icon: <HelpCircle />, run: onOpenHelp, keywords: 'help guide bantuan shortcuts' },
    ];
  }, [t, lang, isDarkTheme, onTabChange, onSelectElement, onToggleTheme, onToggleLang, onOpenHelp]);

  const items = useMemo<PaletteItem[]>(() => {
    const q = query.trim();
    if (!q) {
      const featured = [8, 6, 79, 26, 1, 92].map((z) => allElements[z - 1]);
      return [
        ...actions.slice(0, 8),
        ...featured.map((el) => ({ kind: 'element' as const, id: `el-${el.atomicNumber}`, el })),
      ];
    }

    const sup: PaletteItem[] = matchSuperlatives(q).flatMap((s) => {
      const el = s.pick();
      return el ? [{ kind: 'element' as const, id: `sup-${s.id}`, el, hint: `✨ ${t(s.labelKey, s.label)}` }] : [];
    });

    const elementHits = allElements
      .map((el) => ({ el, score: scoreElement(q, el) }))
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8)
      .map((x) => ({ kind: 'element' as const, id: `el-${x.el.atomicNumber}`, el: x.el }));

    const actionHits = actions
      .map((a) => ({
        a,
        score: a.kind === 'action' ? Math.max(fuzzyScore(q, a.label), fuzzyScore(q, a.keywords) * 0.9) : 0,
      }))
      .filter((x) => x.score > 40)
      .sort((x, y) => y.score - x.score)
      .map((x) => x.a);

    return [...sup, ...elementHits, ...actionHits];
  }, [query, actions, t]);



  // Keep the active option scrolled into view
  useEffect(() => {
    const node = listRef.current?.querySelector<HTMLElement>(`[data-index="${active}"]`);
    node?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  const runItem = (item: PaletteItem) => {
    onClose();
    if (item.kind === 'element') {
      onTabChange('table');
      onSelectElement(item.el);
    } else {
      item.run();
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((i) => Math.min(items.length - 1, i + 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i) => Math.max(0, i - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const item = items[active];
      if (item) runItem(item);
    }
  };

  const activeId = items[active] ? `palette-opt-${items[active].id}` : undefined;

  return (
    <dialog
      ref={dialogRef}
      {...({ closedby: 'any' } as React.HTMLAttributes<HTMLDialogElement>)}
      aria-label={t('palette.title', 'Command palette')}
      onClose={onClose}
      className="command-palette p-0 m-auto mt-[12vh] w-[min(640px,92vw)] max-h-[70vh] rounded-2xl border border-slate-700/80 bg-slate-900/95 text-slate-100 shadow-2xl backdrop:bg-slate-950/70 backdrop:backdrop-blur-sm overflow-hidden"
    >
      <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-800">
        <Search className="w-5 h-5 text-cyan-400 shrink-0" aria-hidden="true" />
        <input
          ref={inputRef}
          type="text"
          role="combobox"
          aria-expanded="true"
          aria-controls="palette-listbox"
          aria-activedescendant={activeId}
          aria-autocomplete="list"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(0);
          }}
          onKeyDown={onKeyDown}
          placeholder={t('palette.placeholder', 'Search elements, or try "densest", "most electronegative"…')}
          className="flex-1 bg-transparent outline-none text-base placeholder-slate-500 text-slate-100"
          autoComplete="off"
          spellCheck={false}
        />
        <kbd className="hidden sm:inline text-[10px] font-mono px-1.5 py-0.5 rounded border border-slate-700 text-slate-400">ESC</kbd>
      </div>

      <ul
        ref={listRef}
        id="palette-listbox"
        role="listbox"
        aria-label={t('palette.results', 'Results')}
        className="max-h-[52vh] overflow-y-auto p-2"
      >
        {items.length === 0 && (
          <li className="px-3 py-8 text-center text-sm text-slate-400">{t('palette.empty', 'No matches. Try a symbol like "Fe" or a number like 26.')}</li>
        )}
        {items.map((item, i) => {
          const isActive = i === active;
          const base = `flex items-center gap-3 px-3 py-2 rounded-xl cursor-pointer transition-colors ${
            isActive ? 'bg-cyan-500/15 ring-1 ring-cyan-500/40' : 'hover:bg-slate-800/70'
          }`;
          if (item.kind === 'element') {
            const el = item.el;
            const cat = categoryMetadata[el.category];
            return (
              <li
                key={item.id}
                id={`palette-opt-${item.id}`}
                data-index={i}
                role="option"
                aria-selected={isActive}
                className={base}
                onMouseMove={() => setActive(i)}
                onClick={() => runItem(item)}
              >
                <span
                  className="w-10 h-10 rounded-lg border flex flex-col items-center justify-center shrink-0 font-black text-sm leading-none"
                  style={{ backgroundColor: cat.colorBg, borderColor: cat.colorBorder, color: cat.colorText }}
                  aria-hidden="true"
                >
                  <span className="text-[8px] font-mono opacity-80">{el.atomicNumber}</span>
                  {el.symbol}
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block text-sm font-semibold text-slate-100 truncate">
                    {getLocalizedElementName(el.atomicNumber, lang) || el.name}
                  </span>
                  <span className="block text-[11px] text-slate-400 truncate">
                    {item.hint ? <span className="text-amber-300 font-semibold">{item.hint} · </span> : null}
                    {t(`categories.${el.category}`, cat.name)} · {el.atomicMassString} u · {el.electronConfiguration.shorthand}
                  </span>
                </span>
                {isActive && <CornerDownLeft className="w-4 h-4 text-cyan-400 shrink-0" aria-hidden="true" />}
              </li>
            );
          }
          return (
            <li
              key={item.id}
              id={`palette-opt-${item.id}`}
              data-index={i}
              role="option"
              aria-selected={isActive}
              className={base}
              onMouseMove={() => setActive(i)}
              onClick={() => runItem(item)}
            >
              <span className="w-10 h-10 rounded-lg bg-slate-800/80 border border-slate-700 flex items-center justify-center text-cyan-300 shrink-0 [&>svg]:w-4 [&>svg]:h-4" aria-hidden="true">
                {item.icon}
              </span>
              <span className="flex-1 text-sm font-medium text-slate-200">{item.label}</span>
              {isActive && <CornerDownLeft className="w-4 h-4 text-cyan-400 shrink-0" aria-hidden="true" />}
            </li>
          );
        })}
      </ul>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 px-4 py-2 border-t border-slate-800 text-[11px] text-slate-400">
        <span className="flex items-center gap-1">
          <kbd className="font-mono px-1 rounded border border-slate-700">↑↓</kbd> {t('palette.navigate', 'navigate')}
        </span>
        <span className="flex items-center gap-1">
          <kbd className="font-mono px-1 rounded border border-slate-700">↵</kbd> {t('palette.open', 'open')}
        </span>
        <span className="flex items-center gap-1 ml-auto text-amber-300/90">
          <Trophy className="w-3 h-3" aria-hidden="true" /> {t('palette.tip', 'Tip: ask for superlatives like "hardest" or "best conductor"')}
        </span>
      </div>
    </dialog>
  );
};
