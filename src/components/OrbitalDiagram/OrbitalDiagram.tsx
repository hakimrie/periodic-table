import React from 'react';
import type { ChemicalElement } from '../../types/element';
import { useI18n } from '../../utils/i18n';

interface OrbitalDiagramProps {
  element: ChemicalElement;
  className?: string;
}

interface OrbitalBox {
  name: string; // e.g. "1s", "2s", "2p", "3s", "3p", "4s", "3d", "4p"
  n: number;
  type: 's' | 'p' | 'd' | 'f';
  boxes: {
    label: string; // e.g. "px", "py", "pz"
    electrons: ('up' | 'down')[];
  }[];
  isValence: boolean;
}

// Calculate orbital boxes for any element based on atomic number and configuration
function getOrbitalStructure(element: ChemicalElement): OrbitalBox[] {
  const Z = element.atomicNumber;
  let remainingElectrons = Z;

  // Standard energy order: 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d, 5p, 6s, 4f, 5d, 6p, 7s, 5f, 6d, 7p
  const subshells: { name: string; n: number; type: 's' | 'p' | 'd' | 'f'; maxElectrons: number; numBoxes: number; boxLabels: string[] }[] = [
    { name: '1s', n: 1, type: 's', maxElectrons: 2, numBoxes: 1, boxLabels: ['1s'] },
    { name: '2s', n: 2, type: 's', maxElectrons: 2, numBoxes: 1, boxLabels: ['2s'] },
    { name: '2p', n: 2, type: 'p', maxElectrons: 6, numBoxes: 3, boxLabels: ['2px', '2py', '2pz'] },
    { name: '3s', n: 3, type: 's', maxElectrons: 2, numBoxes: 1, boxLabels: ['3s'] },
    { name: '3p', n: 3, type: 'p', maxElectrons: 6, numBoxes: 3, boxLabels: ['3px', '3py', '3pz'] },
    { name: '4s', n: 4, type: 's', maxElectrons: 2, numBoxes: 1, boxLabels: ['4s'] },
    { name: '3d', n: 3, type: 'd', maxElectrons: 10, numBoxes: 5, boxLabels: ['3d₁', '3d₂', '3d₃', '3d₄', '3d₅'] },
    { name: '4p', n: 4, type: 'p', maxElectrons: 6, numBoxes: 3, boxLabels: ['4px', '4py', '4pz'] },
    { name: '5s', n: 5, type: 's', maxElectrons: 2, numBoxes: 1, boxLabels: ['5s'] },
    { name: '4d', n: 4, type: 'd', maxElectrons: 10, numBoxes: 5, boxLabels: ['4d₁', '4d₂', '4d₃', '4d₄', '4d₅'] },
    { name: '5p', n: 5, type: 'p', maxElectrons: 6, numBoxes: 3, boxLabels: ['5px', '5py', '5pz'] },
    { name: '6s', n: 6, type: 's', maxElectrons: 2, numBoxes: 1, boxLabels: ['6s'] },
    { name: '4f', n: 4, type: 'f', maxElectrons: 14, numBoxes: 7, boxLabels: ['4f₁', '4f₂', '4f₃', '4f₄', '4f₅', '4f₆', '4f₇'] },
    { name: '5d', n: 5, type: 'd', maxElectrons: 10, numBoxes: 5, boxLabels: ['5d₁', '5d₂', '5d₃', '5d₄', '5d₅'] },
    { name: '6p', n: 6, type: 'p', maxElectrons: 6, numBoxes: 3, boxLabels: ['6px', '6py', '6pz'] },
    { name: '7s', n: 7, type: 's', maxElectrons: 2, numBoxes: 1, boxLabels: ['7s'] },
    { name: '5f', n: 5, type: 'f', maxElectrons: 14, numBoxes: 7, boxLabels: ['5f₁', '5f₂', '5f₃', '5f₄', '5f₅', '5f₆', '5f₇'] },
    { name: '6d', n: 6, type: 'd', maxElectrons: 10, numBoxes: 5, boxLabels: ['6d₁', '6d₂', '6d₃', '6d₄', '6d₅'] },
    { name: '7p', n: 7, type: 'p', maxElectrons: 6, numBoxes: 3, boxLabels: ['7px', '7py', '7pz'] },
  ];

  // Specific exceptions handling (Cr: 3d5 4s1, Cu: 3d10 4s1, Mo: 4d5 5s1, Pd: 4d10 5s0, Ag: 4d10 5s1, Au: 5d10 6s1, Pt: 5d9 6s1)
  const exceptions: Record<number, Record<string, number>> = {
    24: { '4s': 1, '3d': 5 },
    29: { '4s': 1, '3d': 10 },
    41: { '5s': 1, '4d': 4 },
    42: { '5s': 1, '4d': 5 },
    44: { '5s': 1, '4d': 7 },
    45: { '5s': 1, '4d': 8 },
    46: { '5s': 0, '4d': 10 },
    47: { '5s': 1, '4d': 10 },
    78: { '6s': 1, '5d': 9 },
    79: { '6s': 1, '5d': 10 },
  };

  const result: OrbitalBox[] = [];

  for (const sub of subshells) {
    if (remainingElectrons <= 0) break;

    let subElectrons = 0;
    if (exceptions[Z] && sub.name in exceptions[Z]) {
      subElectrons = exceptions[Z][sub.name];
    } else {
      subElectrons = Math.min(sub.maxElectrons, remainingElectrons);
    }
    remainingElectrons -= subElectrons;

    // Apply Hund's rule: fill singly first with up spins, then pair up with down spins
    const boxesData = sub.boxLabels.map((lbl) => ({ label: lbl, electrons: [] as ('up' | 'down')[] }));

    for (let e = 0; e < subElectrons; e++) {
      const boxIndex = e % sub.numBoxes;
      if (e < sub.numBoxes) {
        boxesData[boxIndex].electrons.push('up');
      } else {
        boxesData[boxIndex].electrons.push('down');
      }
    }

    const isValence = sub.n === element.period || (sub.type === 'd' && subElectrons < sub.maxElectrons);

    result.push({
      name: sub.name,
      n: sub.n,
      type: sub.type,
      boxes: boxesData,
      isValence,
    });
  }

  return result;
}

export const OrbitalDiagram: React.FC<OrbitalDiagramProps> = ({ element, className = '' }) => {
  const { t } = useI18n();
  const orbitals = getOrbitalStructure(element);

  return (
    <div className={`bg-slate-900/90 rounded-2xl border border-slate-800 p-5 ${className}`}>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-base font-semibold text-slate-100 flex items-center gap-2">
            <span>{t('orbital.title', 'Electron Orbital Diagram')}</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono">
              {element.electronConfiguration.shorthand}
            </span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            {t('orbital.subtitle', 'Aufbau subshell filling order & electron spins [↑↓]')}
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-cyan-500/20 border border-cyan-500/60 inline-flex items-center justify-center text-[10px] text-cyan-300">
              ↑
            </span>
            <span>{t('orbital.spinUp', 'Spin Up (+½)')}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-cyan-500/20 border border-cyan-500/60 inline-flex items-center justify-center text-[10px] text-pink-400">
              ↓
            </span>
            <span>{t('orbital.spinDown', 'Spin Down (-½)')}</span>
          </div>
        </div>
      </div>

      {/* Orbital Rows */}
      <div role="list" aria-label="Orbital subshell energy levels" className="py-4 space-y-3 overflow-x-auto">
        {orbitals.map((orb) => (
          <div role="listitem" key={orb.name} className="flex items-center gap-3 min-w-[280px]">
            {/* Subshell Label */}
            <div className="w-12 text-right">
              <span
                className={`font-mono text-xs font-semibold px-1.5 py-0.5 rounded ${
                  orb.isValence
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'text-slate-300'
                }`}
              >
                {orb.name}
              </span>
            </div>

            {/* Orbital Boxes */}
            <div className="flex items-center gap-1.5" role="group" aria-label={`Subshell ${orb.name} orbitals`}>
              {orb.boxes.map((box, bIdx) => {
                const boxStateText =
                  box.electrons.length === 2
                    ? 'paired (spin up, spin down)'
                    : box.electrons.length === 1
                    ? 'unpaired (spin up)'
                    : 'empty';

                return (
                  <div
                    key={bIdx}
                    role="img"
                    aria-label={`Orbital ${box.label}: ${boxStateText}`}
                    className={`w-9 h-11 rounded-lg flex items-center justify-center gap-1 font-mono text-sm border transition-all ${
                      box.electrons.length === 2
                        ? 'bg-slate-800/80 border-cyan-500/50 text-cyan-200'
                        : box.electrons.length === 1
                        ? 'bg-slate-800/50 border-amber-500/50 text-amber-300'
                        : 'bg-slate-950/40 border-slate-700/60 text-slate-400'
                    }`}
                    title={`${box.label}: ${box.electrons.length} electron(s)`}
                  >
                    {box.electrons.includes('up') && (
                      <span className="text-cyan-400 font-bold text-base leading-none" aria-hidden="true">↑</span>
                    )}
                    {box.electrons.includes('down') && (
                      <span className="text-pink-400 font-bold text-base leading-none" aria-hidden="true">↓</span>
                    )}
                    {box.electrons.length === 0 && (
                      <span className="text-slate-500 text-xs font-bold" aria-hidden="true">-</span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Electron count for subshell */}
            <div className="text-xs text-slate-300 font-mono">
              ({orb.boxes.reduce((acc, b) => acc + b.electrons.length, 0)} e⁻)
            </div>
          </div>
        ))}
      </div>

      {/* Educational Quantum Rules Explanations Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-4 border-t border-slate-800 text-xs">
        <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
          <div className="font-semibold text-cyan-300 mb-1 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" aria-hidden="true" />
            {t('orbital.aufbau', 'Aufbau Principle')}
          </div>
          <p className="text-slate-300 leading-relaxed text-[11px]">
            {t('orbital.aufbauDesc', 'Electrons fill lower-energy atomic orbitals (1s → 2s → 2p → 3s...) before filling higher-energy subshells to minimize total energy.')}
          </p>
        </div>

        <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
          <div className="font-semibold text-pink-300 mb-1 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-pink-400" aria-hidden="true" />
            {t('orbital.pauli', 'Pauli Exclusion Principle')}
          </div>
          <p className="text-slate-300 leading-relaxed text-[11px]">
            {t('orbital.pauliDesc', 'No two electrons in an atom can have the same four quantum numbers. Each orbital holds at most 2 electrons with opposing spins (↑↓).')}
          </p>
        </div>

        <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
          <div className="font-semibold text-amber-300 mb-1 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" aria-hidden="true" />
            {t('orbital.hund', "Hund's Rule of Maximum Multiplicity")}
          </div>
          <p className="text-slate-300 leading-relaxed text-[11px]">
            {t('orbital.hundDesc', 'Degenerate orbitals of equal energy (e.g. 2px, 2py, 2pz) are each occupied by one electron with parallel spins (↑) before any orbital is paired up.')}
          </p>
        </div>
      </div>
    </div>
  );
};
