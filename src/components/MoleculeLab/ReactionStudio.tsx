import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  REACTIONS_DATABASE,
  calculateReactionStoichiometry,
  formatFormulaSubscripts,
  type ChemicalReaction,
} from '../../data/molecules';
import { useI18n } from '../../utils/i18n';
import { elementSynthesizer } from '../../utils/sonification';
import confetti from 'canvas-confetti';
import {
  Flame,
  Snowflake,
  Play,
  RotateCcw,
  Scale,
  Zap,
} from 'lucide-react';

interface ReactionStudioProps {
  onPreviewMolecule?: (formula: string) => void;
  isDarkTheme?: boolean;
}

export const ReactionStudio: React.FC<ReactionStudioProps> = ({
  onPreviewMolecule,
}) => {
  const { t, lang } = useI18n();

  // Active Reaction
  const [selectedReactionId, setSelectedReactionId] = useState<string>(
    REACTIONS_DATABASE[0].id
  );

  const activeReaction = useMemo<ChemicalReaction>(() => {
    return (
      REACTIONS_DATABASE.find((r) => r.id === selectedReactionId) ||
      REACTIONS_DATABASE[0]
    );
  }, [selectedReactionId]);

  // Initial moles for each reactant (defaults to stoichiometric coefficients)
  const [reactantMoles, setReactantMoles] = useState<number[]>(() =>
    activeReaction.reactants.map((r) => r.coefficient)
  );

  const handleSelectReaction = (rxn: ChemicalReaction) => {
    setSelectedReactionId(rxn.id);
    setReactantMoles(rxn.reactants.map((r) => r.coefficient));
  };

  // Stoichiometry Calculations
  const stoichiometry = useMemo(() => {
    return calculateReactionStoichiometry(activeReaction, reactantMoles);
  }, [activeReaction, reactantMoles]);

  // Canvas ref for animated reaction chamber
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isReacting, setIsReacting] = useState<boolean>(false);

  // Handle changing moles of reactant i
  const handleMolesChange = (index: number, val: number) => {
    const updated = [...reactantMoles];
    updated[index] = Math.max(0, Math.min(20, Math.round(val * 10) / 10));
    setReactantMoles(updated);
  };

  // Quick Presets
  const setPresetStoichiometric = () => {
    setReactantMoles(activeReaction.reactants.map((r) => r.coefficient));
  };

  const setPresetExcessFirst = () => {
    setReactantMoles(
      activeReaction.reactants.map((r, idx) =>
        idx === 0 ? r.coefficient * 2.5 : r.coefficient
      )
    );
  };

  // Trigger Reaction Animation
  const handleTriggerReaction = () => {
    if (isReacting || stoichiometry.extentMoles <= 0) return;
    setIsReacting(true);

    // Audio flare
    try {
      elementSynthesizer.playFlameFlare();
    } catch {
      // Audio context might need user gesture
    }

    // Sparkle confetti effect
    try {
      const isExo = activeReaction.deltaHkJPerMol < 0;
      confetti({
        particleCount: 40,
        spread: 70,
        origin: { y: 0.65 },
        colors: isExo
          ? ['#f97316', '#ef4444', '#fbbf24']
          : ['#06b6d4', '#3b82f6', '#a855f7'],
      });
    } catch {
      // Confetti fallback
    }

    setTimeout(() => {
      setIsReacting(false);
    }, 1800);
  };

  // 2D Canvas chamber particles animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrame: number;
    let t = 0;

    // Generate random particle positions
    const reactantParticles = activeReaction.reactants.flatMap((r, rIdx) => {
      const count = Math.min(12, Math.max(2, Math.round(reactantMoles[rIdx] * 2)));
      return Array.from({ length: count }, () => ({
        x: 40 + Math.random() * (canvas.width * 0.35 - 60),
        y: 30 + Math.random() * (canvas.height - 60),
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,
        label: r.formula,
        color: rIdx === 0 ? '#38bdf8' : '#a855f7',
      }));
    });

    const productParticles = activeReaction.products.flatMap((p, pIdx) => {
      const count = Math.min(
        12,
        Math.max(2, Math.round((stoichiometry.products[pIdx]?.molesProduced || 1) * 2))
      );
      return Array.from({ length: count }, () => ({
        x: canvas.width * 0.65 + Math.random() * (canvas.width * 0.3 - 20),
        y: 30 + Math.random() * (canvas.height - 60),
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,
        label: p.formula,
        color: pIdx === 0 ? '#34d399' : '#fbbf24',
      }));
    });

    const render = () => {
      t += 0.02;
      ctx.fillStyle = '#030712';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const w = canvas.width;
      const h = canvas.height;

      // Divider Barrier in the center
      const barrierX = w * 0.5;
      const isExo = activeReaction.deltaHkJPerMol < 0;

      // Gradient zone in center
      const grad = ctx.createLinearGradient(barrierX - 40, 0, barrierX + 40, 0);
      grad.addColorStop(0, 'rgba(15, 23, 42, 0)');
      grad.addColorStop(
        0.5,
        isExo
          ? isReacting
            ? 'rgba(239, 68, 68, 0.45)'
            : 'rgba(249, 115, 22, 0.15)'
          : isReacting
          ? 'rgba(6, 182, 212, 0.45)'
          : 'rgba(59, 130, 246, 0.15)'
      );
      grad.addColorStop(1, 'rgba(15, 23, 42, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(barrierX - 40, 0, 80, h);

      // Reaction Barrier Arrow or Energy Line
      ctx.strokeStyle = isExo ? '#f97316' : '#06b6d4';
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(barrierX, 20);
      ctx.lineTo(barrierX, h - 20);
      ctx.stroke();
      ctx.setLineDash([]);

      // Reaction progress wave when reacting
      if (isReacting) {
        ctx.fillStyle = isExo ? 'rgba(249, 115, 22, 0.25)' : 'rgba(6, 182, 212, 0.25)';
        ctx.beginPath();
        ctx.arc(barrierX, h / 2, 45 + Math.sin(t * 8) * 15, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = isExo ? '#fbbf24' : '#67e8f9';
        ctx.font = 'bold 12px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(isExo ? '💥 ΔH < 0 EXOTHERMIC' : '❄️ ΔH > 0 ENDOTHERMIC', barrierX, h / 2 + 4);
      } else {
        ctx.fillStyle = '#64748b';
        ctx.font = '10px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('ACTIVATION BARRIER', barrierX, h / 2 - 8);
        ctx.fillText(
          `${activeReaction.deltaHkJPerMol > 0 ? '+' : ''}${activeReaction.deltaHkJPerMol} kJ/mol`,
          barrierX,
          h / 2 + 10
        );
      }

      // Draw Reactants
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      for (const p of reactantParticles) {
        // Simple Brownian motion bounded in left chamber
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 30 || p.x > barrierX - 25) p.vx *= -1;
        if (p.y < 25 || p.y > h - 25) p.vy *= -1;

        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 11, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.fillStyle = '#0f172a';
        ctx.font = 'bold 9px monospace';
        ctx.fillText(p.label, p.x, p.y);
      }

      // Draw Products
      for (const p of productParticles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < barrierX + 25 || p.x > w - 30) p.vx *= -1;
        if (p.y < 25 || p.y > h - 25) p.vy *= -1;

        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 11, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.fillStyle = '#0f172a';
        ctx.font = 'bold 9px monospace';
        ctx.fillText(p.label, p.x, p.y);
      }

      animFrame = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animFrame);
  }, [activeReaction, reactantMoles, stoichiometry, isReacting]);

  const isExothermic = activeReaction.deltaHkJPerMol < 0;

  return (
    <div className="space-y-6">
      {/* Reaction Selector Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-3 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl backdrop-blur-md">
        <span className="text-xs font-bold text-slate-400 px-2 font-mono uppercase">
          {t('lab.reactionSelect', 'Reactions:')}
        </span>
        <div className="flex flex-wrap gap-1.5">
          {REACTIONS_DATABASE.map((rxn) => {
            const isSelected = rxn.id === selectedReactionId;
            return (
              <button
                key={rxn.id}
                type="button"
                onClick={() => handleSelectReaction(rxn)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20'
                    : 'bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 border border-slate-700/60'
                }`}
              >
                {lang === 'id' ? rxn.nameId : rxn.nameEn}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Flagship Reaction Display Banner */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl relative overflow-hidden">
        {/* Ambient Top Glow */}
        <div
          className={`absolute top-0 left-0 right-0 h-1.5 ${
            isExothermic
              ? 'bg-gradient-to-r from-amber-500 via-rose-500 to-orange-500'
              : 'bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500'
          }`}
        />

        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-800 text-cyan-300 border border-slate-700 font-mono">
                {activeReaction.type}
              </span>
              <span
                className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono border ${
                  isExothermic
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                    : 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                }`}
              >
                {isExothermic ? (
                  <Flame className="w-3 h-3 text-rose-400" />
                ) : (
                  <Snowflake className="w-3 h-3 text-cyan-400" />
                )}
                <span>
                  ΔH = {activeReaction.deltaHkJPerMol > 0 ? '+' : ''}
                  {activeReaction.deltaHkJPerMol} kJ/mol
                </span>
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-100 mt-1">
              {lang === 'id' ? activeReaction.nameId : activeReaction.nameEn}
            </h2>
          </div>

          {/* Trigger Button */}
          <button
            type="button"
            onClick={handleTriggerReaction}
            disabled={isReacting || stoichiometry.extentMoles <= 0}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bold text-sm shadow-xl transition-all ${
              isReacting
                ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                : isExothermic
                ? 'bg-gradient-to-r from-orange-500 to-rose-600 hover:from-orange-400 hover:to-rose-500 text-white shadow-rose-500/25 active:scale-95'
                : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-cyan-500/25 active:scale-95'
            }`}
          >
            <Play className={`w-4 h-4 ${isReacting ? 'animate-spin' : ''}`} />
            <span>
              {isReacting
                ? 'Reacting...'
                : t('lab.triggerReaction', 'Ignite / Trigger Reaction')}
            </span>
          </button>
        </div>

        {/* Balanced Chemical Formula Card with Clickable Molecules */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 shadow-inner flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-center">
          {/* Reactants */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {activeReaction.reactants.map((r, idx) => (
              <React.Fragment key={`r-${r.formula}`}>
                {idx > 0 && <span className="text-xl font-black text-slate-600">+</span>}
                <button
                  type="button"
                  onClick={() => onPreviewMolecule?.(r.formula)}
                  className="group flex items-baseline gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-700/80 hover:border-cyan-400 transition-all font-mono"
                  title={`Preview ${r.nameEn} 3D model`}
                >
                  {r.coefficient > 1 && (
                    <span className="text-xl font-black text-cyan-400">
                      {r.coefficient}
                    </span>
                  )}
                  <span className="text-xl font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
                    {formatFormulaSubscripts(r.formula)}
                  </span>
                  <span className="text-xs text-slate-400 font-sans">
                    ({r.phase})
                  </span>
                </button>
              </React.Fragment>
            ))}
          </div>

          {/* Reaction Arrow */}
          <div className="flex items-center gap-2 text-2xl font-black text-amber-400 px-2">
            →
          </div>

          {/* Products */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {activeReaction.products.map((p, idx) => (
              <React.Fragment key={`p-${p.formula}`}>
                {idx > 0 && <span className="text-xl font-black text-slate-600">+</span>}
                <button
                  type="button"
                  onClick={() => onPreviewMolecule?.(p.formula)}
                  className="group flex items-baseline gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-700/80 hover:border-emerald-400 transition-all font-mono"
                  title={`Preview ${p.nameEn} 3D model`}
                >
                  {p.coefficient > 1 && (
                    <span className="text-xl font-black text-emerald-400">
                      {p.coefficient}
                    </span>
                  )}
                  <span className="text-xl font-bold text-slate-100 group-hover:text-emerald-300 transition-colors">
                    {formatFormulaSubscripts(p.formula)}
                  </span>
                  <span className="text-xs text-slate-400 font-sans">
                    ({p.phase})
                  </span>
                </button>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Two-Column Workspace: Left Stoichiometry Controller, Right Particle Chamber */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Stoichiometry Input & Mass Balance Card (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Scale className="w-4 h-4 text-cyan-400" />
                <h3 className="font-bold text-slate-100 text-sm">
                  {t('lab.stoichiometryTitle', 'Stoichiometry & Mass Balance')}
                </h3>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={setPresetStoichiometric}
                  className="px-2 py-0.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-[10px] text-slate-300 border border-slate-700"
                >
                  1x Exact
                </button>
                <button
                  type="button"
                  onClick={setPresetExcessFirst}
                  className="px-2 py-0.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-[10px] text-slate-300 border border-slate-700"
                >
                  Excess 1
                </button>
              </div>
            </div>

            {/* Reactant Inputs */}
            <div className="space-y-3 font-mono">
              <span className="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-wider block">
                Initial Reactant Quantities
              </span>

              {activeReaction.reactants.map((r, idx) => {
                const isLimiting =
                  stoichiometry.limitingReactantIndex === idx &&
                  stoichiometry.extentMoles > 0;
                return (
                  <div
                    key={`input-${r.formula}`}
                    className={`p-3 rounded-xl border ${
                      isLimiting
                        ? 'bg-amber-500/10 border-amber-500/40'
                        : 'bg-slate-800/60 border-slate-700/70'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-slate-100 text-sm">
                          {formatFormulaSubscripts(r.formula)}
                        </span>
                        <span className="text-[10px] text-slate-400 font-sans">
                          {r.nameEn}
                        </span>
                      </div>
                      {isLimiting && (
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-400 text-slate-950">
                          {t('lab.limitingReactant', 'LIMITING')}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      <input
                        type="range"
                        min="0"
                        max="10"
                        step="0.5"
                        value={reactantMoles[idx] || 0}
                        onChange={(e) =>
                          handleMolesChange(idx, parseFloat(e.target.value))
                        }
                        className="flex-1 accent-cyan-400 cursor-pointer"
                        aria-label={`Initial moles of ${r.formula}`}
                      />
                      <div className="flex items-center gap-1 bg-slate-900 px-2 py-1 rounded-lg border border-slate-700">
                        <span className="font-bold text-cyan-300 w-8 text-right">
                          {reactantMoles[idx] || 0}
                        </span>
                        <span className="text-[10px] text-slate-400">mol</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Mass Yield & Remaining Reagents Table */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block font-sans">
                Yielded Products & Heat
              </span>

              <div className="grid grid-cols-2 gap-2 font-mono text-[11px]">
                {stoichiometry.products.map((p) => (
                  <div
                    key={`prod-${p.formula}`}
                    className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30"
                  >
                    <span className="text-[10px] text-emerald-300 block font-sans font-bold">
                      {p.formula} Yield
                    </span>
                    <span className="text-sm font-black text-slate-100 block">
                      {p.molesProduced.toFixed(2)} mol
                    </span>
                    <span className="text-[10px] text-slate-400">
                      ≈ {p.gramsProduced.toFixed(1)} g
                    </span>
                  </div>
                ))}

                <div
                  className={`p-2.5 rounded-xl border ${
                    isExothermic
                      ? 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                      : 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300'
                  }`}
                >
                  <span className="text-[10px] block font-sans font-bold">
                    Net Enthalpy ΔH
                  </span>
                  <span className="text-sm font-black text-slate-100 block">
                    {stoichiometry.netEnergyKJ >= 0 ? '+' : ''}
                    {stoichiometry.netEnergyKJ.toFixed(1)} kJ
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {isExothermic ? 'Heat Released' : 'Heat Absorbed'}
                  </span>
                </div>
              </div>
            </div>

            {/* Reset Button */}
            <div className="flex justify-end pt-1">
              <button
                type="button"
                onClick={setPresetStoichiometric}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                <span>{t('lab.resetReactants', 'Reset Quantities')}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right: Animated Reaction Chamber & Real-World Application (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Reaction Chamber Canvas */}
          <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl">
            <div className="absolute top-3 left-4 flex items-center gap-1.5 text-[10px] font-mono font-bold text-slate-400 bg-slate-900/80 px-2 py-0.5 rounded-full border border-slate-800">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>REACTANTS CHAMBER</span>
            </div>
            <div className="absolute top-3 right-4 flex items-center gap-1.5 text-[10px] font-mono font-bold text-slate-400 bg-slate-900/80 px-2 py-0.5 rounded-full border border-slate-800">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>PRODUCTS CHAMBER</span>
            </div>

            <canvas
              ref={canvasRef}
              width={640}
              height={320}
              className="w-full h-[280px] sm:h-[320px] block"
              aria-label="2D Molecular Reaction Chamber Animation"
            />
          </div>

          {/* Real-World Application & Mechanism Card */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-3 text-xs">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-2.5">
              <Zap className="w-4 h-4 text-amber-400" />
              <h4 className="font-bold text-slate-100 text-sm">
                {t('lab.applicationTitle', 'Real-World Chemistry & Industrial Impact')}
              </h4>
            </div>

            <p className="text-slate-300 leading-relaxed">
              {lang === 'id'
                ? activeReaction.descriptionId
                : activeReaction.descriptionEn}
            </p>

            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1">
              <span className="text-[10px] font-bold text-cyan-300 uppercase tracking-wider block font-mono">
                Key Industrial / Biological Role
              </span>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                {lang === 'id'
                  ? activeReaction.realWorldApplicationId
                  : activeReaction.realWorldApplicationEn}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
