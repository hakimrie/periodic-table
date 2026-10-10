import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import type { ChemicalElement } from '../../types/element';
import {
  ALL_ORBITALS,
  type OrbitalDef,
  type SubshellType,
  sampleOrbitalPoints,
  getRadialCurveData,
} from './wavefunctions';
import { getLocalizedElementName } from '../../data/elements/translations';
import { useI18n } from '../../utils/i18n';
import {
  Atom,
  RotateCcw,
  Scissors,
  Layers,
  Sparkles,
  Maximize2,
  BookOpen,
} from 'lucide-react';

interface OrbitalCloudProps {
  element?: ChemicalElement;
  isDarkTheme?: boolean;
}

interface OccupiedSubshell {
  n: number;
  subshell: SubshellType;
  electrons: number;
  raw: string; // e.g. "2p⁶"
}

// Parse electron configuration e.g. "1s² 2s² 2p⁶ 3s¹"
function parseOccupiedSubshells(fullConfig: string): OccupiedSubshell[] {
  const superscriptMap: Record<string, number> = {
    '¹': 1, '²': 2, '³': 3, '⁴': 4, '⁵': 5,
    '⁶': 6, '⁷': 7, '⁸': 8, '⁹': 9, '⁰': 0,
    '1': 1, '2': 2, '3': 3, '4': 4, '5': 5,
    '6': 6, '7': 7, '8': 8, '9': 9, '0': 0,
  };

  const tokens = fullConfig.split(/\s+/).filter(Boolean);
  const result: OccupiedSubshell[] = [];

  for (const token of tokens) {
    const match = token.match(/^(\d)([spdf])([¹²³⁴⁵⁶⁷⁸⁹⁰\d]+)$/);
    if (match) {
      const n = parseInt(match[1], 10);
      const subshell = match[2] as SubshellType;
      const digits = match[3];
      let count = 0;
      for (const ch of digits) {
        count = count * 10 + (superscriptMap[ch] ?? 0);
      }
      result.push({ n, subshell, electrons: count, raw: token });
    }
  }

  return result;
}

function checkWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

export const OrbitalCloud: React.FC<OrbitalCloudProps> = ({
  element,
  isDarkTheme = true,
}) => {
  const { t, lang } = useI18n();
  const mountRef = useRef<HTMLDivElement>(null);

  // Parse occupied subshells for the element
  const occupiedSubshells = useMemo(() => {
    if (!element) return [];
    return parseOccupiedSubshells(element.electronConfiguration.full);
  }, [element]);

  // Default valence orbital
  const defaultValenceOrbital = useMemo(() => {
    if (occupiedSubshells.length > 0) {
      const last = occupiedSubshells[occupiedSubshells.length - 1];
      const match = ALL_ORBITALS.find((o) => o.n === last.n && o.subshell === last.subshell);
      if (match) return match;
    }
    return ALL_ORBITALS[2]; // 2p_z
  }, [occupiedSubshells]);

  // Track manual user override; if null, defaults to element's valence orbital
  const [manualOrbital, setManualOrbital] = useState<{ elementZ?: number; orbital: OrbitalDef } | null>(null);

  const selectedOrbital = useMemo(() => {
    if (manualOrbital && manualOrbital.elementZ === element?.atomicNumber) {
      return manualOrbital.orbital;
    }
    return defaultValenceOrbital;
  }, [manualOrbital, element?.atomicNumber, defaultValenceOrbital]);

  const setSelectedOrbital = (orb: OrbitalDef) => {
    setManualOrbital({ elementZ: element?.atomicNumber, orbital: orb });
  };

  const [isCrossSection, setIsCrossSection] = useState(false);
  const [isCombineSubshell, setIsCombineSubshell] = useState(false);
  const [isAutoRotate, setIsAutoRotate] = useState(true);
  const isAutoRotateRef = useRef(isAutoRotate);
  useEffect(() => {
    isAutoRotateRef.current = isAutoRotate;
  }, [isAutoRotate]);

  const [webglSupported] = useState(checkWebGL);

  // Three.js References
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const pointsRef = useRef<THREE.Points | null>(null);

  // Compute nodal numbers
  const radialNodes = selectedOrbital.n - selectedOrbital.l - 1;
  const angularNodes = selectedOrbital.l;
  const totalNodes = selectedOrbital.n - 1;

  // Compute 2D radial distribution curve data
  const radialCurve = useMemo(() => {
    return getRadialCurveData(selectedOrbital.n, selectedOrbital.l, 1, 60);
  }, [selectedOrbital.n, selectedOrbital.l]);

  // Soft circular sprite texture for electron points
  const pointTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d')!;

    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.3, 'rgba(255, 255, 255, 0.8)');
    grad.addColorStop(0.8, 'rgba(255, 255, 255, 0.15)');
    grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);

    const tex = new THREE.CanvasTexture(canvas);
    return tex;
  }, []);

  // Initialize Three.js scene
  useEffect(() => {
    const container = mountRef.current;
    if (!container || !webglSupported) return;

    const width = container.clientWidth || 700;
    const height = container.clientHeight || 550;

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(isDarkTheme ? 0x020617 : 0xf8fafc);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 500);
    camera.position.set(0, 8, 22);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 4;
    controls.maxDistance = 80;
    controlsRef.current = controls;

    // Glowing Nucleus at origin
    const nucGeo = new THREE.SphereGeometry(0.35, 24, 24);
    const nucMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const nucleus = new THREE.Mesh(nucGeo, nucMat);
    scene.add(nucleus);

    // Subtle coordinate axes
    const axes = new THREE.AxesHelper(6);
    scene.add(axes);

    // Animation Loop
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      controls.autoRotate = isAutoRotateRef.current;
      controls.autoRotateSpeed = 0.6;
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

  // Generate and update the point cloud when orbital or modes change
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    // Remove old point cloud
    if (pointsRef.current) {
      scene.remove(pointsRef.current);
      pointsRef.current.geometry.dispose();
      (pointsRef.current.material as THREE.Material).dispose();
      pointsRef.current = null;
    }

    const { n, l, mKey } = selectedOrbital;
    const TARGET_COUNT = isCombineSubshell ? 50000 : 35000;

    let allPositions: Float32Array;
    let allPhases: Float32Array;
    let rMax = 15;

    if (isCombineSubshell) {
      // Sample all degenerate orbitals in subshell
      const siblings = ALL_ORBITALS.filter((o) => o.n === n && o.l === l);
      const perSibling = Math.floor(TARGET_COUNT / siblings.length);
      const posArr: number[] = [];
      const phaseArr: number[] = [];

      for (const sib of siblings) {
        const { positions, phases, rMax: rm } = sampleOrbitalPoints(n, l, sib.mKey, perSibling);
        rMax = Math.max(rMax, rm);
        for (let i = 0; i < positions.length; i++) posArr.push(positions[i]);
        for (let i = 0; i < phases.length; i++) phaseArr.push(phases[i]);
      }

      allPositions = new Float32Array(posArr);
      allPhases = new Float32Array(phaseArr);
    } else {
      const res = sampleOrbitalPoints(n, l, mKey, TARGET_COUNT);
      allPositions = res.positions;
      allPhases = res.phases;
      rMax = res.rMax;
    }

    // Apply cross-section slice if toggled: filter points near the slice plane
    let finalPositions: number[] = [];
    let finalColors: number[] = [];

    const totalPts = allPhases.length;
    for (let i = 0; i < totalPts; i++) {
      const idx3 = i * 3;
      const x = allPositions[idx3];
      const y = allPositions[idx3 + 1];
      const z = allPositions[idx3 + 2];
      const phase = allPhases[i];

      // Slice through z = 0 plane (keep points where y > 0 or abs(z) < slice width)
      if (isCrossSection && z < 0) {
        continue;
      }

      finalPositions.push(x, y, z);

      // Phase colors: positive = vibrant cyan, negative = glowing rose/magenta
      if (phase > 0) {
        finalColors.push(0.13, 0.83, 0.93); // #22d3ee
      } else {
        finalColors.push(0.96, 0.25, 0.37); // #f43f5e
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(finalPositions, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(finalColors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.28,
      map: pointTexture,
      transparent: true,
      opacity: 0.65,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);
    pointsRef.current = points;

    // Adjust camera distance to fit rMax comfortably
    if (cameraRef.current && controlsRef.current) {
      const dist = Math.max(14, rMax * 0.9);
      cameraRef.current.position.set(0, dist * 0.35, dist);
      controlsRef.current.target.set(0, 0, 0);
      controlsRef.current.update();
    }
  }, [selectedOrbital, isCrossSection, isCombineSubshell, pointTexture]);

  const resetCamera = () => {
    if (!cameraRef.current || !controlsRef.current) return;
    cameraRef.current.position.set(0, 8, 22);
    controlsRef.current.target.set(0, 0, 0);
  };

  return (
    <div className="flex flex-col gap-4 animate-fade-in text-slate-100">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl backdrop-blur-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-cyan-500/20 text-cyan-400">
              <Atom className="w-4 h-4" aria-hidden="true" />
            </span>
            <h2 className="text-base sm:text-lg font-bold text-slate-100">
              {t('orbitals.title', 'Quantum Orbital Lab')}
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            {t('orbitals.subtitle', 'Real 3D electron probability clouds derived from the Schrödinger wave equation')}
          </p>
        </div>

        {/* View Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Slice Toggle */}
          <button
            type="button"
            onClick={() => setIsCrossSection(!isCrossSection)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
              isCrossSection
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-slate-100'
            }`}
            title={t('orbitals.sliceHint', 'Reveals internal radial nodes & nested shells')}
          >
            <Scissors className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{t('orbitals.sliceView', 'Cross-Section Slice')}</span>
          </button>

          {/* Combine Subshell Toggle */}
          <button
            type="button"
            onClick={() => setIsCombineSubshell(!isCombineSubshell)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
              isCombineSubshell
                ? 'bg-purple-500/20 text-purple-300 border-purple-500/50 shadow'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-slate-100'
            }`}
            title={t('orbitals.combineHint', 'Combines all degenerate orbitals (e.g. px + py + pz)')}
          >
            <Layers className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{t('orbitals.combineSubshell', 'Full Subshell Overlay')}</span>
          </button>

          {/* Auto-Rotate */}
          <button
            type="button"
            onClick={() => setIsAutoRotate(!isAutoRotate)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
              isAutoRotate
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-slate-100'
            }`}
          >
            <RotateCcw className={`w-3.5 h-3.5 ${isAutoRotate ? 'animate-spin' : ''}`} aria-hidden="true" />
            <span>{t('orbitals.autoRotate', 'Auto-Rotate')}</span>
          </button>

          {/* Reset Camera */}
          <button
            type="button"
            onClick={resetCamera}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-semibold transition-colors"
          >
            <Maximize2 className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{t('orbitals.resetView', 'Reset Camera')}</span>
          </button>
        </div>
      </div>

      {/* Subshell Chips for the Selected Element */}
      {element && occupiedSubshells.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 p-3 rounded-2xl bg-slate-900/70 border border-slate-800 text-xs">
          <span className="text-slate-400 font-medium mr-1.5">
            {t('orbitals.occupiedTitle', 'Occupied Subshells for')}{' '}
            <strong className="text-cyan-300">
              {getLocalizedElementName(element.atomicNumber, lang) || element.name} ({element.symbol})
            </strong>
            :
          </span>
          {occupiedSubshells.map((sub, idx) => {
            const isValence = idx === occupiedSubshells.length - 1;
            const isCurrent =
              selectedOrbital.n === sub.n && selectedOrbital.subshell === sub.subshell;

            return (
              <button
                key={sub.raw}
                type="button"
                onClick={() => {
                  const match = ALL_ORBITALS.find(
                    (o) => o.n === sub.n && o.subshell === sub.subshell
                  );
                  if (match) setSelectedOrbital(match);
                }}
                className={`px-2.5 py-1 rounded-xl border font-mono font-bold transition-all ${
                  isCurrent
                    ? 'bg-cyan-500/25 text-cyan-200 border-cyan-400 ring-1 ring-cyan-400 shadow-md scale-105'
                    : isValence
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 hover:bg-amber-500/30'
                    : 'bg-slate-800/60 text-slate-300 border-slate-700/80 hover:bg-slate-800 hover:text-slate-100'
                }`}
              >
                <span>{sub.raw}</span>
                {isValence && <span className="ml-1 text-[10px] text-amber-400 font-sans">★</span>}
              </button>
            );
          })}
        </div>
      )}

      {/* Main Grid: 3D Cloud Canvas on Left, Quantum Metrics & Orbitals on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Left: 3D Point Cloud Canvas */}
        <div
          ref={mountRef}
          role="region"
          aria-label={t('orbitals.title', '3D Quantum Orbital Canvas')}
          className="lg:col-span-8 relative w-full h-[540px] sm:h-[620px] rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl cursor-grab active:cursor-grabbing"
        >
          {!webglSupported && (
            <div className="absolute inset-0 flex items-center justify-center p-6 text-center text-slate-400 text-sm">
              WebGL is not available in your browser.
            </div>
          )}

          {/* Current Orbital Badge Overlay */}
          <div className="absolute top-4 left-4 p-3 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl backdrop-blur-md">
            <div className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">
              {isCombineSubshell ? 'Subshell Overlay' : 'Atomic Orbital'}
            </div>
            <div className="text-2xl font-black text-cyan-300 font-mono tracking-tight">
              {isCombineSubshell ? `${selectedOrbital.n}${selectedOrbital.subshell} (all variants)` : selectedOrbital.displayName}
            </div>
          </div>

          {/* Phase Legend Overlay */}
          <div className="absolute top-4 right-4 p-3 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl backdrop-blur-md text-xs space-y-1.5 font-mono">
            <div className="text-slate-400 font-bold text-[10px] uppercase">
              {t('orbitals.phaseLegend.title', 'Wavefunction Phase')}
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400" />
              <span className="text-cyan-300 text-[11px] font-bold">ψ &gt; 0 (+)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500 shadow-sm shadow-rose-500" />
              <span className="text-rose-300 text-[11px] font-bold">ψ &lt; 0 (−)</span>
            </div>
          </div>

          {/* Canvas Bottom Instruction */}
          <div className="absolute bottom-3 left-3 pointer-events-none flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] text-slate-300 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" aria-hidden="true" />
            <span>35,000 points sampled by |ψ|² probability density. Drag to rotate.</span>
          </div>
        </div>

        {/* Right: Orbital Picker & Quantum Metrics */}
        <div className="lg:col-span-4 space-y-4">
          {/* Orbital Picker Grid */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs shadow-lg space-y-3">
            <div className="font-bold text-slate-200 text-sm flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" aria-hidden="true" />
              <span>{t('orbitals.selectOrbital', 'Choose Orbital')}</span>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5 max-h-56 overflow-y-auto pr-1">
              {ALL_ORBITALS.map((orb) => {
                const isSelected =
                  selectedOrbital.n === orb.n &&
                  selectedOrbital.l === orb.l &&
                  selectedOrbital.mKey === orb.mKey;

                return (
                  <button
                    key={`${orb.n}-${orb.l}-${orb.mKey}`}
                    type="button"
                    onClick={() => {
                      setSelectedOrbital(orb);
                      setIsCombineSubshell(false);
                    }}
                    className={`p-2 rounded-xl border text-center font-mono font-bold transition-all ${
                      isSelected
                        ? 'bg-cyan-500/25 text-cyan-200 border-cyan-400 ring-1 ring-cyan-400 shadow'
                        : 'bg-slate-800/60 text-slate-300 border-slate-700/60 hover:bg-slate-800 hover:text-slate-100'
                    }`}
                  >
                    {orb.displayName}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quantum Numbers & Nodal Structure */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs shadow-lg space-y-2.5">
            <div className="font-bold text-slate-200 text-sm">
              {t('orbitals.quantumNumbers', 'Quantum Numbers & Nodes')}
            </div>

            <div className="grid grid-cols-3 gap-2 text-center font-mono">
              <div className="p-2 rounded-xl bg-slate-800/60 border border-slate-700/60">
                <span className="block text-[10px] text-slate-400">n (energy)</span>
                <span className="text-base font-black text-cyan-300">{selectedOrbital.n}</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-800/60 border border-slate-700/60">
                <span className="block text-[10px] text-slate-400">l (shape)</span>
                <span className="text-base font-black text-amber-300">{selectedOrbital.l} ({selectedOrbital.subshell})</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-800/60 border border-slate-700/60">
                <span className="block text-[10px] text-slate-400">mₗ (variant)</span>
                <span className="text-base font-black text-purple-300">{selectedOrbital.mKey}</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center font-mono pt-1">
              <div className="p-2 rounded-xl bg-slate-800/40 border border-slate-800">
                <span className="block text-[10px] text-slate-400">Radial Nodes</span>
                <span className="text-sm font-bold text-slate-200">{radialNodes}</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-800/40 border border-slate-800">
                <span className="block text-[10px] text-slate-400">Angular Nodes</span>
                <span className="text-sm font-bold text-slate-200">{angularNodes}</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-800/40 border border-slate-800">
                <span className="block text-[10px] text-slate-400">Total Nodes</span>
                <span className="text-sm font-bold text-cyan-400">{totalNodes}</span>
              </div>
            </div>
          </div>

          {/* 2D Radial Probability Density Chart P(r) = r² R² */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs shadow-lg space-y-2">
            <div className="font-bold text-slate-200 flex items-center justify-between">
              <span>{t('orbitals.radialChartTitle', 'Radial Probability Density P(r) = r²·R²')}</span>
            </div>
            <p className="text-[11px] text-slate-400">
              {t('orbitals.radialChartDesc', 'Probability of finding the electron in a spherical shell at distance r.')}
            </p>

            {/* SVG Chart */}
            <div className="h-28 w-full bg-slate-950/60 rounded-xl border border-slate-800/80 p-2 flex items-center justify-center">
              <svg viewBox="0 0 200 80" className="w-full h-full overflow-visible">
                {/* Axes */}
                <line x1="10" y1="70" x2="195" y2="70" stroke="#475569" strokeWidth="1" />
                <line x1="10" y1="10" x2="10" y2="70" stroke="#475569" strokeWidth="1" />

                {/* Curve path */}
                {(() => {
                  const maxP = Math.max(...radialCurve.map((d) => d.p), 1e-6);
                  const pts = radialCurve
                    .map((d, i) => {
                      const x = 10 + (i / (radialCurve.length - 1)) * 185;
                      const y = 70 - (d.p / maxP) * 55;
                      return `${x.toFixed(1)},${y.toFixed(1)}`;
                    })
                    .join(' ');
                  return (
                    <polyline
                      fill="none"
                      stroke="#22d3ee"
                      strokeWidth="2"
                      points={pts}
                    />
                  );
                })()}

                {/* X axis labels */}
                <text x="10" y="79" fill="#94a3b8" fontSize="6" fontFamily="monospace">0</text>
                <text x="185" y="79" fill="#94a3b8" fontSize="6" fontFamily="monospace">r (a₀)</text>
              </svg>
            </div>
          </div>

          {/* Educational Insight Card */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs shadow-lg space-y-2">
            <div className="flex items-center gap-2 text-cyan-300 font-bold">
              <BookOpen className="w-4 h-4" aria-hidden="true" />
              <span>{t('orbitals.educationalNote.title', 'Bohr Model vs Quantum Mechanics')}</span>
            </div>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              {t('orbitals.educationalNote.text')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
