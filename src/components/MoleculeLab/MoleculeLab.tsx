import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import confetti from 'canvas-confetti';
import {
  MOLECULES_DATABASE,
  type Molecule,
  CPK_COLORS,
  computeMolarMass,
  matchMolecule,
  getSynthesisHints,
  formatFormulaSubscripts,
} from '../../data/molecules';
import { elementsBySymbol } from '../../data/elements';
import { useI18n } from '../../utils/i18n';
import { ReactionStudio } from './ReactionStudio';
import {
  FlaskConical,
  Sparkles,
  RotateCcw,
  Plus,
  Minus,
  Trash2,
  Trophy,
  HelpCircle,
  Maximize2,
  Atom,
  ExternalLink,
  Zap,
} from 'lucide-react';

interface MoleculeLabProps {
  onSelectElementById?: (z: number) => void;
  isDarkTheme?: boolean;
}

const COMMON_ELEMENTS = [
  'H', 'C', 'N', 'O', 'F', 'Na', 'Mg', 'Al',
  'Si', 'P', 'S', 'Cl', 'K', 'Ca', 'Fe', 'Cu',
  'B', 'Li', 'Br', 'I',
];

function checkWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

export const MoleculeLab: React.FC<MoleculeLabProps> = ({
  onSelectElementById,
  isDarkTheme = true,
}) => {
  const { t, lang } = useI18n();
  const mountRef = useRef<HTMLDivElement>(null);

  // Active atoms in reactor
  const [atomCounts, setAtomCounts] = useState<Record<string, number>>({ H: 2, O: 1 });

  // Discovered molecules saved in localStorage
  const [discoveredIds, setDiscoveredIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('pt_lab_discovered');
      return stored ? JSON.parse(stored) : ['h2o'];
    } catch {
      return ['h2o'];
    }
  });

  // Selected molecule when clicked from collection or fallback
  const [selectedMolecule, setSelectedMolecule] = useState<Molecule>(
    () => MOLECULES_DATABASE[0] // Water
  );

  // Check for live match in reactor
  const matchedMol = useMemo(() => matchMolecule(atomCounts), [atomCounts]);

  // Current molecule displayed in 3D: prioritizes matched reactor molecule, then user selection
  const activeMolecule = matchedMol || selectedMolecule;

  const [viewMode, setViewMode] = useState<'ball-stick' | 'space-fill'>('ball-stick');
  const [labSubView, setLabSubView] = useState<'synthesis' | 'reactions'>(() => {
    try {
      const param = new URLSearchParams(window.location.search).get('moleculeView');
      if (param === 'reactions') return 'reactions';
    } catch {
      // Non-browser fallback
    }
    return 'synthesis';
  });

  const handlePreviewFromReaction = (formula: string) => {
    const mol = MOLECULES_DATABASE.find((m) => m.formula === formula);
    if (mol) {
      setSelectedMolecule(mol);
      setAtomCounts(mol.elementCounts);
      setLabSubView('synthesis');
    }
  };

  const [isAutoRotate, setIsAutoRotate] = useState(true);
  const isAutoRotateRef = useRef(isAutoRotate);
  useEffect(() => {
    isAutoRotateRef.current = isAutoRotate;
  }, [isAutoRotate]);

  const [activeHint, setActiveHint] = useState<string | null>(null);
  const [webglSupported] = useState(checkWebGL);

  // Three.js References
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const moleculeGroupRef = useRef<THREE.Group | null>(null);

  // Synthesis fireworks when a new molecule is discovered!
  useEffect(() => {
    if (matchedMol && !discoveredIds.includes(matchedMol.id)) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#22d3ee', '#38bdf8', '#a855f7', '#fbbf24'],
      });

      const id = matchedMol.id;
      const timer = setTimeout(() => {
        setDiscoveredIds((prev) => {
          if (prev.includes(id)) return prev;
          const next = [...prev, id];
          localStorage.setItem('pt_lab_discovered', JSON.stringify(next));
          return next;
        });
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [matchedMol, discoveredIds]);

  // Synthesis Hints
  const hints = useMemo(() => getSynthesisHints(atomCounts, 2), [atomCounts]);

  // Atom control handlers
  const addAtom = (sym: string) => {
    setAtomCounts((prev) => ({
      ...prev,
      [sym]: (prev[sym] || 0) + 1,
    }));
  };

  const removeAtom = (sym: string) => {
    setAtomCounts((prev) => {
      const current = prev[sym] || 0;
      if (current <= 1) {
        const copy = { ...prev };
        delete copy[sym];
        return copy;
      }
      return { ...prev, [sym]: current - 1 };
    });
  };

  const clearReactor = () => {
    setAtomCounts({});
  };

  const loadMolecule = (mol: Molecule) => {
    setSelectedMolecule(mol);
    setAtomCounts({ ...mol.elementCounts });
  };

  // Provide random hint for undiscovered molecule
  const handleRandomHint = () => {
    const undiscovered = MOLECULES_DATABASE.filter((m) => !discoveredIds.includes(m.id));
    if (undiscovered.length === 0) {
      setActiveHint(
        lang === 'id'
          ? '🎉 Selamat! Kamu telah menemukan semua molekul di laboratorium ini!'
          : '🎉 Congratulations! You have synthesized all molecules in this lab!'
      );
      return;
    }
    const target = undiscovered[Math.floor(Math.random() * undiscovered.length)];
    const elNames = Object.entries(target.elementCounts)
      .map(([sym, count]) => `${count}x ${sym}`)
      .join(' + ');

    setActiveHint(
      lang === 'id'
        ? `Petunjuk untuk ${target.commonNameId}: Coba campurkan ${elNames}!`
        : `Clue for ${target.commonNameEn}: Try combining ${elNames}!`
    );
  };

  // Initialize Three.js scene
  useEffect(() => {
    const container = mountRef.current;
    if (!container || !webglSupported) return;

    const width = container.clientWidth || 700;
    const height = container.clientHeight || 520;

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(isDarkTheme ? 0x020617 : 0xf8fafc);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 200);
    camera.position.set(0, 3, 10);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 3;
    controls.maxDistance = 35;
    controlsRef.current = controls;

    // Lighting
    const ambient = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambient);

    const dir1 = new THREE.DirectionalLight(0xffffff, 1.2);
    dir1.position.set(5, 10, 7);
    scene.add(dir1);

    const dir2 = new THREE.DirectionalLight(0x38bdf8, 0.6);
    dir2.position.set(-6, -4, -5);
    scene.add(dir2);

    const molGroup = new THREE.Group();
    scene.add(molGroup);
    moleculeGroupRef.current = molGroup;

    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      controls.autoRotate = isAutoRotateRef.current;
      controls.autoRotateSpeed = 1.0;
      controls.update();

      renderer.render(scene, camera);
    };
    animate();

    const resizeObserver = new ResizeObserver(() => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    });
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      controls.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [isDarkTheme, webglSupported]);

  // Re-build 3D Molecule Model when activeMolecule or viewMode changes
  useEffect(() => {
    const group = moleculeGroupRef.current;
    if (!group) return;

    // Clear previous atoms & bonds
    while (group.children.length > 0) {
      const child = group.children[0];
      group.remove(child);
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose();
        if (Array.isArray(child.material)) {
          child.material.forEach((m) => m.dispose());
        } else {
          child.material.dispose();
        }
      }
    }

    const { atoms, bonds } = activeMolecule;
    const isSpaceFill = viewMode === 'space-fill';

    // Sphere geometries
    const atomRadiusScale: Record<string, number> = {
      H: isSpaceFill ? 0.8 : 0.35,
      C: isSpaceFill ? 1.2 : 0.55,
      N: isSpaceFill ? 1.1 : 0.52,
      O: isSpaceFill ? 1.05 : 0.5,
      F: isSpaceFill ? 1.0 : 0.48,
      Cl: isSpaceFill ? 1.3 : 0.65,
      Na: isSpaceFill ? 1.4 : 0.7,
      S: isSpaceFill ? 1.35 : 0.65,
      Fe: isSpaceFill ? 1.4 : 0.7,
      Si: isSpaceFill ? 1.35 : 0.65,
      Ca: isSpaceFill ? 1.45 : 0.75,
    };

    const sphereGeo = new THREE.SphereGeometry(1, 32, 32);

    // Add Atoms
    for (let i = 0; i < atoms.length; i++) {
      const atom = atoms[i];
      const rad = atomRadiusScale[atom.symbol] || (isSpaceFill ? 1.1 : 0.5);
      const color = CPK_COLORS[atom.symbol] || 0x94a3b8;

      const mat = new THREE.MeshStandardMaterial({
        color,
        roughness: 0.25,
        metalness: 0.2,
      });

      const mesh = new THREE.Mesh(sphereGeo, mat);
      mesh.scale.set(rad, rad, rad);
      mesh.position.set(atom.x, atom.y, atom.z);
      group.add(mesh);
    }

    // Add Bonds (only in ball-and-stick mode)
    if (!isSpaceFill) {
      const bondMat = new THREE.MeshStandardMaterial({
        color: 0x94a3b8,
        roughness: 0.4,
        metalness: 0.3,
      });

      for (const [idxA, idxB, order] of bonds) {
        const atomA = atoms[idxA];
        const atomB = atoms[idxB];
        if (!atomA || !atomB) continue;

        const posA = new THREE.Vector3(atomA.x, atomA.y, atomA.z);
        const posB = new THREE.Vector3(atomB.x, atomB.y, atomB.z);
        const dist = posA.distanceTo(posB);
        const mid = new THREE.Vector3().addVectors(posA, posB).multiplyScalar(0.5);

        const dir = new THREE.Vector3().subVectors(posB, posA).normalize();
        const orientation = new THREE.Quaternion();
        orientation.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);

        // Single bond vs multiple bonds
        if (order === 1) {
          const cylGeo = new THREE.CylinderGeometry(0.12, 0.12, dist, 16);
          const cyl = new THREE.Mesh(cylGeo, bondMat);
          cyl.position.copy(mid);
          cyl.quaternion.copy(orientation);
          group.add(cyl);
        } else if (order === 2) {
          // Double bond: two parallel cylinders
          const offsetDist = 0.15;
          const normal = new THREE.Vector3(0, 0, 1).cross(dir).normalize().multiplyScalar(offsetDist);
          if (normal.length() === 0) normal.set(offsetDist, 0, 0);

          [-1, 1].forEach((sign) => {
            const cylGeo = new THREE.CylinderGeometry(0.09, 0.09, dist, 16);
            const cyl = new THREE.Mesh(cylGeo, bondMat);
            const pos = new THREE.Vector3().copy(mid).addScaledVector(normal, sign);
            cyl.position.copy(pos);
            cyl.quaternion.copy(orientation);
            group.add(cyl);
          });
        } else if (order === 3) {
          // Triple bond: three parallel cylinders
          const offsetDist = 0.18;
          const normal = new THREE.Vector3(0, 0, 1).cross(dir).normalize().multiplyScalar(offsetDist);
          if (normal.length() === 0) normal.set(offsetDist, 0, 0);

          [-1, 0, 1].forEach((sign) => {
            const cylGeo = new THREE.CylinderGeometry(0.08, 0.08, dist, 16);
            const cyl = new THREE.Mesh(cylGeo, bondMat);
            const pos = new THREE.Vector3().copy(mid).addScaledVector(normal, sign);
            cyl.position.copy(pos);
            cyl.quaternion.copy(orientation);
            group.add(cyl);
          });
        }
      }
    }

    // Adjust camera distance to accommodate molecule bounding box
    const box = new THREE.Box3().setFromObject(group);
    const size = new THREE.Vector3();
    box.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z, 2);

    if (cameraRef.current && controlsRef.current) {
      const targetDist = Math.max(5.5, maxDim * 2.2);
      cameraRef.current.position.set(0, targetDist * 0.3, targetDist);
      controlsRef.current.target.set(0, 0, 0);
      controlsRef.current.update();
    }
  }, [activeMolecule, viewMode]);

  const resetCamera = () => {
    if (!cameraRef.current || !controlsRef.current) return;
    cameraRef.current.position.set(0, 3, 10);
    controlsRef.current.target.set(0, 0, 0);
  };

  const molarMass = computeMolarMass(activeMolecule.elementCounts);

  return (
    <div className="flex flex-col gap-4 animate-fade-in text-slate-100">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl backdrop-blur-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-cyan-500/20 text-cyan-400">
              <FlaskConical className="w-5 h-5" aria-hidden="true" />
            </span>
            <h2 className="text-base sm:text-lg font-bold text-slate-100">
              {t('lab.title', 'Molecule & Reaction Lab')}
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            {t('lab.subtitle', 'Combine atomic elements into real chemical molecules and simulate balanced reactions in 3D')}
          </p>
        </div>

        {/* Subview Selector Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-950/70 border border-slate-800 shadow-inner">
          <button
            type="button"
            onClick={() => setLabSubView('synthesis')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
              labSubView === 'synthesis'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <FlaskConical className="w-3.5 h-3.5" />
            <span>{t('lab.subviewSynthesis', 'Synthesis Sandbox')}</span>
          </button>
          <button
            type="button"
            onClick={() => setLabSubView('reactions')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
              labSubView === 'reactions'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>{t('lab.subviewReactions', 'Reaction Studio')}</span>
          </button>
        </div>

        {/* Discovery Progress Badge & Clue */}
        {labSubView === 'synthesis' && (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/40 text-xs font-mono text-purple-200">
              <Trophy className="w-4 h-4 text-amber-400" aria-hidden="true" />
              <span className="font-bold">
                {discoveredIds.length} / {MOLECULES_DATABASE.length} (
                {Math.round((discoveredIds.length / MOLECULES_DATABASE.length) * 100)}%)
              </span>
            </div>

            <button
              type="button"
              onClick={handleRandomHint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 text-xs font-semibold transition-colors"
            >
              <HelpCircle className="w-3.5 h-3.5 text-amber-400" aria-hidden="true" />
              <span>{t('lab.hintButton', 'Get Clue')}</span>
            </button>
          </div>
        )}
      </div>

      {labSubView === 'reactions' ? (
        <ReactionStudio
          onPreviewMolecule={handlePreviewFromReaction}
          isDarkTheme={isDarkTheme}
        />
      ) : (
        <>

      {/* Clue Alert Banner if requested */}
      {activeHint && (
        <div className="flex items-center justify-between p-3 rounded-2xl bg-amber-500/15 border border-amber-500/40 text-amber-200 text-xs animate-fade-in shadow-md">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" aria-hidden="true" />
            <span>{activeHint}</span>
          </div>
          <button
            type="button"
            onClick={() => setActiveHint(null)}
            className="text-amber-300 hover:text-amber-100 font-bold ml-3"
          >
            ✕
          </button>
        </div>
      )}

      {/* Synthesis Bench: Element Palette + Active Flask */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs shadow-lg space-y-4">
        {/* Element Palette */}
        <div>
          <div className="font-bold text-slate-300 mb-2 flex items-center justify-between">
            <span>{t('lab.paletteTitle', 'Element Palette (Click to add atoms):')}</span>
            <span className="text-[11px] text-slate-500 font-mono">CPK Colors</span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {COMMON_ELEMENTS.map((sym) => {
              const hex = (CPK_COLORS[sym] || 0x64748b).toString(16).padStart(6, '0');
              const el = elementsBySymbol.get(sym.toLowerCase());
              return (
                <button
                  key={sym}
                  type="button"
                  onClick={() => addAtom(sym)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/90 hover:bg-slate-750 border border-slate-700 hover:border-cyan-400 hover:scale-105 active:scale-95 transition-all text-left font-mono shadow-sm group"
                  title={`Add ${el?.name || sym} atom`}
                >
                  <span
                    className="w-3 h-3 rounded-full border border-slate-500/50 shrink-0 group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: `#${hex}` }}
                    aria-hidden="true"
                  />
                  <span className="font-black text-slate-100">{sym}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Reaction Flask (Current Atom Counts & Live Detection) */}
        <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-bold text-slate-300 mr-2 flex items-center gap-1.5">
              <FlaskConical className="w-4 h-4 text-cyan-400" aria-hidden="true" />
              <span>{t('lab.reactorTitle', 'Flask:')}</span>
            </span>

            {Object.keys(atomCounts).length === 0 ? (
              <span className="text-slate-500 italic text-[11px]">
                {t('lab.emptyReactor', 'Flask is empty. Click elements above to start synthesizing.')}
              </span>
            ) : (
              Object.entries(atomCounts).map(([sym, count]) => (
                <div
                  key={sym}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 font-mono text-xs"
                >
                  <span className="font-black text-cyan-300">{sym}</span>
                  <span className="text-slate-400 text-[10px]">×</span>
                  <span className="font-bold text-slate-100">{count}</span>
                  <div className="flex items-center gap-0.5 ml-1.5 border-l border-slate-700 pl-1">
                    <button
                      type="button"
                      onClick={() => addAtom(sym)}
                      className="p-0.5 hover:text-cyan-300"
                      aria-label={`Add 1 ${sym}`}
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeAtom(sym)}
                      className="p-0.5 hover:text-rose-300"
                      aria-label={`Remove 1 ${sym}`}
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Live match notification badge */}
            {matchedMol && (
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 font-bold animate-pulse">
                <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{lang === 'id' ? matchedMol.nameId : matchedMol.nameEn} ({formatFormulaSubscripts(matchedMol.formula)})</span>
              </div>
            )}

            {Object.keys(atomCounts).length > 0 && (
              <button
                type="button"
                onClick={clearReactor}
                className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-rose-300 border border-slate-700 transition-colors"
                title="Clear all atoms"
              >
                <Trash2 className="w-3 h-3" aria-hidden="true" />
                <span>{t('lab.clearReactor', 'Clear')}</span>
              </button>
            )}
          </div>
        </div>

        {/* You Are Close Hints */}
        {!matchedMol && hints.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-slate-400">
            <span className="font-medium text-slate-300">{t('lab.closeHints', 'You are close to:')}</span>
            {hints.map(({ molecule, needed }) => {
              const neededText = Object.entries(needed)
                .map(([s, c]) => `+${c} ${s}`)
                .join(', ');
              return (
                <button
                  key={molecule.id}
                  type="button"
                  onClick={() => loadMolecule(molecule)}
                  className="px-2 py-0.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-cyan-500/40 text-slate-300 transition-all font-mono"
                >
                  <span className="font-bold text-cyan-300">{formatFormulaSubscripts(molecule.formula)}</span>
                  <span className="text-amber-300 ml-1">({neededText})</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Main 3D Molecule Visualizer & Molecule Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Left: 3D Molecule Canvas */}
        <div
          ref={mountRef}
          role="region"
          aria-label={t('lab.title', '3D Molecule Visualizer Canvas')}
          className="lg:col-span-8 relative w-full h-[500px] sm:h-[580px] rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl cursor-grab active:cursor-grabbing"
        >
          {!webglSupported && (
            <div className="absolute inset-0 flex items-center justify-center p-6 text-center text-slate-400 text-sm">
              WebGL is not available in your browser.
            </div>
          )}

          {/* Molecule Title Badge Overlay */}
          <div className="absolute top-4 left-4 p-3 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl backdrop-blur-md space-y-0.5">
            <div className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">
              {lang === 'id' ? activeMolecule.commonNameId : activeMolecule.commonNameEn}
            </div>
            <div className="text-2xl font-black text-cyan-300 font-mono tracking-tight">
              {formatFormulaSubscripts(activeMolecule.formula)}
            </div>
            <div className="text-xs text-slate-300 font-medium">
              {lang === 'id' ? activeMolecule.nameId : activeMolecule.nameEn}
            </div>
          </div>

          {/* 3D View Controls Overlay (Top-Right) */}
          <div className="absolute top-4 right-4 flex items-center gap-1.5 p-1 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl backdrop-blur-md">
            <button
              type="button"
              onClick={() => setViewMode('ball-stick')}
              className={`px-2.5 py-1 rounded-xl text-xs font-semibold transition-all ${
                viewMode === 'ball-stick'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {t('lab.ballStickView', 'Ball & Stick')}
            </button>
            <button
              type="button"
              onClick={() => setViewMode('space-fill')}
              className={`px-2.5 py-1 rounded-xl text-xs font-semibold transition-all ${
                viewMode === 'space-fill'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {t('lab.spaceFillView', 'Space Filling')}
            </button>
            <button
              type="button"
              onClick={() => setIsAutoRotate(!isAutoRotate)}
              aria-label={t('lab.autoRotate', 'Auto-Rotate')}
              className={`p-1.5 rounded-xl border text-xs transition-all ${
                isAutoRotate
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                  : 'bg-slate-800 text-slate-400 border-slate-700'
              }`}
            >
              <RotateCcw className={`w-3.5 h-3.5 ${isAutoRotate ? 'animate-spin' : ''}`} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={resetCamera}
              aria-label={t('lab.resetView', 'Reset Camera')}
              className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 border border-slate-700 transition-colors"
            >
              <Maximize2 className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>

          {/* Canvas Bottom Instruction */}
          <div className="absolute bottom-3 left-3 pointer-events-none flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] text-slate-300 backdrop-blur-sm">
            <Atom className="w-3.5 h-3.5 text-cyan-400 shrink-0" aria-hidden="true" />
            <span>Interactive 3D model with realistic bond angles. Drag to rotate, scroll to zoom.</span>
          </div>
        </div>

        {/* Right: Molecule Chemical Properties & Knowledge Card */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs shadow-lg space-y-3">
            <div className="font-bold text-slate-200 text-sm flex items-center justify-between">
              <span>{lang === 'id' ? activeMolecule.nameId : activeMolecule.nameEn}</span>
              <span className="font-mono text-cyan-400 font-black">{formatFormulaSubscripts(activeMolecule.formula)}</span>
            </div>

            {/* Scientific Properties Grid */}
            <div className="grid grid-cols-2 gap-2 text-center font-mono">
              <div className="p-2 rounded-xl bg-slate-800/60 border border-slate-700/60">
                <span className="block text-[10px] text-slate-400">{t('lab.molarMass', 'Molar Mass')}</span>
                <span className="text-sm font-bold text-amber-300">{molarMass.toFixed(3)} g/mol</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-800/60 border border-slate-700/60">
                <span className="block text-[10px] text-slate-400">{t('lab.geometry', 'Geometry')}</span>
                <span className="text-sm font-bold text-cyan-300 capitalize">{activeMolecule.geometry.replace('-', ' ')}</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-800/60 border border-slate-700/60">
                <span className="block text-[10px] text-slate-400">{t('lab.bondType', 'Bonding')}</span>
                <span className="text-sm font-bold text-purple-300 capitalize">{activeMolecule.bondType.replace('-', ' ')}</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-800/60 border border-slate-700/60">
                <span className="block text-[10px] text-slate-400">{t('lab.polarity', 'Polarity')}</span>
                <span className="text-sm font-bold text-emerald-300 capitalize">{activeMolecule.polarity}</span>
              </div>
            </div>

            {/* Constituent Atoms (Clickable links to table) */}
            <div className="pt-1">
              <span className="text-slate-400 font-medium block mb-1.5">Constituent Atoms:</span>
              <div className="flex flex-wrap gap-1.5">
                {Object.entries(activeMolecule.elementCounts).map(([sym, count]) => {
                  const el = elementsBySymbol.get(sym.toLowerCase());
                  return (
                    <button
                      key={sym}
                      type="button"
                      onClick={() => el && onSelectElementById && onSelectElementById(el.atomicNumber)}
                      className="flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 hover:border-cyan-400 transition-colors font-mono"
                      title={`Inspect ${el?.name || sym} in periodic table`}
                    >
                      <span className="font-bold text-cyan-300">{sym}</span>
                      <span className="text-slate-400">×{count}</span>
                      <ExternalLink className="w-2.5 h-2.5 text-slate-500 ml-0.5" />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Everyday Use */}
            <div className="pt-1 border-t border-slate-800 space-y-1">
              <span className="font-bold text-slate-300 block">Everyday & Industrial Use:</span>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                {lang === 'id' ? activeMolecule.useId : activeMolecule.useEn}
              </p>
            </div>

            {/* Fun Fact */}
            <div className="pt-1 border-t border-slate-800 space-y-1">
              <span className="font-bold text-amber-300 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-amber-400" aria-hidden="true" />
                <span>Chemistry Fun Fact:</span>
              </span>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                {lang === 'id' ? activeMolecule.funFactId : activeMolecule.funFactEn}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Discovery Collection Grid ("Pokedex" style) */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs shadow-lg space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-400" aria-hidden="true" />
            <h3 className="font-bold text-slate-200 text-sm">
              {t('lab.collectionTitle', 'Discovered Molecules')}
            </h3>
          </div>
          <span className="text-slate-400 font-mono text-[11px]">
            {discoveredIds.length} / {MOLECULES_DATABASE.length} synthesized
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {MOLECULES_DATABASE.map((mol) => {
            const isUnlocked = discoveredIds.includes(mol.id);
            const isCurrent = activeMolecule.id === mol.id;

            return (
              <button
                key={mol.id}
                type="button"
                onClick={() => isUnlocked && loadMolecule(mol)}
                disabled={!isUnlocked}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  isCurrent
                    ? 'bg-cyan-500/25 border-cyan-400 ring-1 ring-cyan-400 shadow-md font-bold'
                    : isUnlocked
                    ? 'bg-slate-800/60 hover:bg-slate-800 border-slate-700/80 hover:border-slate-600 cursor-pointer'
                    : 'bg-slate-950/40 border-slate-800/50 opacity-40 cursor-not-allowed'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-black text-sm text-cyan-300">
                    {isUnlocked ? formatFormulaSubscripts(mol.formula) : '???'}
                  </span>
                  <span className="text-[10px] text-slate-500">
                    {isUnlocked ? '✓' : '🔒'}
                  </span>
                </div>
                <div className="text-[11px] text-slate-300 truncate mt-0.5">
                  {isUnlocked
                    ? lang === 'id'
                      ? mol.commonNameId
                      : mol.commonNameEn
                    : 'Locked compound'}
                </div>
              </button>
            );
          })}
        </div>
      </div>
      </>
      )}
    </div>
  );
};
