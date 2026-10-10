import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import type { ChemicalElement } from '../../types/element';
import { allElements, categoryMetadata } from '../../data/elements';
import { getGridPosition } from '../../utils/grid';
import { getLocalizedElementName } from '../../data/elements/translations';
import { useI18n } from '../../utils/i18n';
import {
  RotateCcw,
  Sparkles,
  TrendingUp,
  TrendingDown,
  Info,
  Maximize2,
} from 'lucide-react';
import { parseDiscoveryYear } from '../PeriodicTable/lenses';

export type SkylineMetric =
  | 'category'
  | 'atomicMass'
  | 'atomicRadius'
  | 'ionizationEnergy'
  | 'electronegativity'
  | 'electronAffinity'
  | 'density'
  | 'meltingPoint'
  | 'boilingPoint'
  | 'discoveryYear';

interface Skyline3DProps {
  selectedElement: ChemicalElement;
  onSelectElement: (el: ChemicalElement) => void;
  isDarkTheme?: boolean;
}

interface ColumnEntry {
  element: ChemicalElement;
  mesh: THREE.Mesh;
  topSprite?: THREE.Sprite;
  currentHeight: number;
  targetHeight: number;
  targetColor: THREE.Color;
}

function checkWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

export const Skyline3D: React.FC<Skyline3DProps> = ({
  selectedElement,
  onSelectElement,
  isDarkTheme = true,
}) => {
  const { t, lang } = useI18n();
  const mountRef = useRef<HTMLDivElement>(null);
  const [metric, setMetric] = useState<SkylineMetric>('ionizationEnergy');
  const [isAutoRotate, setIsAutoRotate] = useState(false);
  const isAutoRotateRef = useRef(isAutoRotate);
  useEffect(() => {
    isAutoRotateRef.current = isAutoRotate;
  }, [isAutoRotate]);

  const [hoveredElement, setHoveredElement] = useState<ChemicalElement | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);
  const [webglSupported] = useState(checkWebGL);

  // References preserved across renders
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const columnsRef = useRef<Map<number, ColumnEntry>>(new Map());
  const selectionBeamRef = useRef<THREE.Mesh | null>(null);
  const raycasterRef = useRef(new THREE.Raycaster());
  const mouseRef = useRef(new THREE.Vector2(-1000, -1000));
  const hoveredMeshRef = useRef<THREE.Mesh | null>(null);

  // Compute numeric values for the chosen metric for each element
  const metricValues = useMemo(() => {
    const map = new Map<number, number | undefined>();
    for (const el of allElements) {
      let val: number | undefined;
      switch (metric) {
        case 'atomicMass':
          val = el.atomicMass;
          break;
        case 'atomicRadius':
          val = el.chemicalProperties.atomicRadius;
          break;
        case 'ionizationEnergy':
          val = el.chemicalProperties.firstIonizationEnergy;
          break;
        case 'electronegativity':
          val = el.chemicalProperties.electronegativity;
          break;
        case 'electronAffinity':
          val = el.chemicalProperties.electronAffinity;
          break;
        case 'density':
          val = el.physicalProperties.densityUnit === 'g/L' ? undefined : el.physicalProperties.density;
          break;
        case 'meltingPoint':
          val = el.physicalProperties.meltingPointKelvin;
          break;
        case 'boilingPoint':
          val = el.physicalProperties.boilingPointKelvin;
          break;
        case 'discoveryYear':
          val = 2024 - parseDiscoveryYear(el.discovery.year); // older elements = taller!
          break;
        case 'category':
        default:
          val = 3;
          break;
      }
      map.set(el.atomicNumber, val);
    }
    return map;
  }, [metric]);

  // Compute min / max for normalization
  const { minVal, maxVal } = useMemo(() => {
    let min = Infinity;
    let max = -Infinity;
    for (const v of metricValues.values()) {
      if (v !== undefined && !Number.isNaN(v)) {
        if (v < min) min = v;
        if (v > max) max = v;
      }
    }
    if (min === Infinity || max === -Infinity || min === max) {
      return { minVal: 0, maxVal: 1 };
    }
    return { minVal: min, maxVal: max };
  }, [metricValues]);

  // Top 5 and Bottom 5 rankings
  const { topFive, bottomFive } = useMemo(() => {
    if (metric === 'category') return { topFive: [], bottomFive: [] };
    const valid = allElements
      .map((el) => ({ el, val: metricValues.get(el.atomicNumber) }))
      .filter((x): x is { el: ChemicalElement; val: number } => x.val !== undefined && !Number.isNaN(x.val))
      .sort((a, b) => b.val - a.val);

    return {
      topFive: valid.slice(0, 5),
      bottomFive: valid.slice(-5).reverse(),
    };
  }, [metric, metricValues]);

  // Helper to format values
  const formatMetricVal = useCallback((val: number | undefined): string => {
    if (val === undefined || Number.isNaN(val)) return '—';
    switch (metric) {
      case 'atomicMass': return `${val.toFixed(2)} u`;
      case 'atomicRadius': return `${val} pm`;
      case 'ionizationEnergy': return `${val.toFixed(1)} kJ/mol`;
      case 'electronegativity': return val.toFixed(2);
      case 'electronAffinity': return `${val.toFixed(1)} kJ/mol`;
      case 'density': return `${val.toFixed(2)} g/cm³`;
      case 'meltingPoint': return `${Math.round(val)} K`;
      case 'boilingPoint': return `${Math.round(val)} K`;
      case 'discoveryYear': {
        const y = 2024 - val;
        return y <= 0 ? 'Ancient' : `${y}`;
      }
      default: return '';
    }
  }, [metric]);

  // Texture generator for column top faces (Symbol + Z)
  const createTopTexture = (el: ChemicalElement): THREE.CanvasTexture => {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d')!;

    // Background fill
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, 128, 128);

    // Border
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 6;
    ctx.strokeRect(3, 3, 122, 122);

    // Atomic Number (small, top-left)
    ctx.fillStyle = '#94a3b8';
    ctx.font = 'bold 22px system-ui, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(`${el.atomicNumber}`, 12, 30);

    // Symbol (large, center)
    ctx.fillStyle = '#f8fafc';
    ctx.font = '900 52px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(el.symbol, 64, 86);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  };

  // Initialize Three.js scene
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 800;
    let height = container.clientHeight || 560;

    if (!webglSupported) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(isDarkTheme ? 0x020617 : 0xf1f5f9);
    scene.fog = new THREE.FogExp2(isDarkTheme ? 0x020617 : 0xf1f5f9, 0.015);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.5, 300);
    camera.position.set(0, 24, 28);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2.05; // Prevent dipping beneath floor
    controls.minDistance = 8;
    controls.maxDistance = 65;
    controls.target.set(0, 2, 0);
    controlsRef.current = controls;

    // Lighting
    const ambient = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambient);

    const dirLight = new THREE.DirectionalLight(0x38bdf8, 1.2);
    dirLight.position.set(15, 35, 20);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    scene.add(dirLight);

    const fillLight = new THREE.DirectionalLight(0xa855f7, 0.6);
    fillLight.position.set(-20, 20, -15);
    scene.add(fillLight);

    // Reflective floor grid
    const grid = new THREE.GridHelper(40, 40, 0x06b6d4, isDarkTheme ? 0x1e293b : 0xcbd5e1);
    grid.position.y = -0.01;
    scene.add(grid);

    // Floor plane
    const floorGeo = new THREE.PlaneGeometry(80, 80);
    const floorMat = new THREE.MeshStandardMaterial({
      color: isDarkTheme ? 0x050b18 : 0xe2e8f0,
      roughness: 0.8,
      metalness: 0.2,
    });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.position.y = -0.02;
    floorMesh.receiveShadow = true;
    scene.add(floorMesh);

    // Selection Pulsing Beam
    const beamGeo = new THREE.CylinderGeometry(0.85, 0.85, 20, 16, 1, true);
    const beamMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.35,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
    });
    const beam = new THREE.Mesh(beamGeo, beamMat);
    beam.visible = false;
    scene.add(beam);
    selectionBeamRef.current = beam;

    // Build all 118 element column meshes
    const SPACING = 1.35;
    const BOX_WIDTH = 1.1;
    const boxGeo = new THREE.BoxGeometry(BOX_WIDTH, 1, BOX_WIDTH);

    const columns = new Map<number, ColumnEntry>();

    for (const el of allElements) {
      const pos = getGridPosition(el);
      // Map 18 columns to -11.5 .. +11.5
      const posX = (pos.col - 9.5) * SPACING;
      // Map 10 rows to -6 .. +6
      const posZ = (pos.row - 5.5) * SPACING;

      const topTex = createTopTexture(el);

      // Create materials: sides are standard, top face has the texture
      const sideMat = new THREE.MeshStandardMaterial({
        color: 0x06b6d4,
        roughness: 0.3,
        metalness: 0.4,
      });

      const topMat = new THREE.MeshStandardMaterial({
        map: topTex,
        roughness: 0.2,
        metalness: 0.1,
      });

      // Box face order: +x, -x, +y (top), -y, +z, -z
      const materials = [sideMat, sideMat, topMat, sideMat, sideMat, sideMat];

      const mesh = new THREE.Mesh(boxGeo, materials);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.position.set(posX, 0.5, posZ);
      mesh.userData = { atomicNumber: el.atomicNumber, element: el };

      scene.add(mesh);

      columns.set(el.atomicNumber, {
        element: el,
        mesh,
        currentHeight: 1,
        targetHeight: 1,
        targetColor: new THREE.Color(0x06b6d4),
      });
    }

    columnsRef.current = columns;

    // Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);

      const elapsed = clock.getElapsedTime();

      // Lerp column heights and colors smoothly
      for (const entry of columns.values()) {
        entry.currentHeight += (entry.targetHeight - entry.currentHeight) * 0.1;
        entry.mesh.scale.y = Math.max(0.1, entry.currentHeight);
        entry.mesh.position.y = entry.mesh.scale.y / 2;

        const sideMat = (entry.mesh.material as THREE.Material[])[0] as THREE.MeshStandardMaterial;
        sideMat.color.lerp(entry.targetColor, 0.1);
      }

      // Pulse selection beam
      if (beam.visible) {
        beamMat.opacity = 0.25 + Math.sin(elapsed * 4) * 0.15;
      }

      controls.autoRotate = isAutoRotateRef.current;
      controls.autoRotateSpeed = 0.8;
      controls.update();

      renderer.render(scene, camera);
    };

    animate();

    // Resize observer
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

  // Update target heights and colors whenever metric changes
  useEffect(() => {
    const columns = columnsRef.current;
    if (columns.size === 0) return;

    for (const [z, entry] of columns.entries()) {
      const el = entry.element;
      const val = metricValues.get(z);

      if (metric === 'category') {
        const cat = categoryMetadata[el.category] || categoryMetadata.unknown;
        entry.targetHeight = 2.5;
        entry.targetColor.set(cat.colorBorder);
      } else if (val === undefined || Number.isNaN(val)) {
        entry.targetHeight = 0.25; // Ghost slab for missing data
        entry.targetColor.set(0x334155);
      } else {
        const tVal = Math.max(0, Math.min(1, (val - minVal) / (maxVal - minVal || 1)));
        // Height ranges from 0.5 to 12 units
        entry.targetHeight = 0.5 + tVal * 11.5;

        // Vivid color ramp: cyan -> blue -> purple -> amber -> crimson
        const hue = (0.6 - tVal * 0.6 + 1) % 1; // 0.6 (blue) down to 0.0 (red)
        entry.targetColor.setHSL(hue, 0.9, 0.35 + tVal * 0.25);
      }
    }
  }, [metric, metricValues, minVal, maxVal]);

  // Position selection beam over the selected element
  useEffect(() => {
    const entry = columnsRef.current.get(selectedElement.atomicNumber);
    const beam = selectionBeamRef.current;
    if (!entry || !beam) return;

    beam.visible = true;
    beam.position.set(entry.mesh.position.x, 10, entry.mesh.position.z);
  }, [selectedElement]);

  // Raycasting for hover tooltip & click selection
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const container = mountRef.current;
    const camera = cameraRef.current;
    const scene = sceneRef.current;
    if (!container || !camera || !scene) return;

    const rect = container.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    mouseRef.current.set(x, y);

    raycasterRef.current.setFromCamera(mouseRef.current, camera);
    const meshes = Array.from(columnsRef.current.values()).map((c) => c.mesh);
    const hits = raycasterRef.current.intersectObjects(meshes);

    if (hits.length > 0) {
      const hit = hits[0].object as THREE.Mesh;
      const el = hit.userData.element as ChemicalElement;
      setHoveredElement(el);
      setTooltipPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });

      if (hoveredMeshRef.current && hoveredMeshRef.current !== hit) {
        // Reset previous emissive
        const prevMats = hoveredMeshRef.current.material as THREE.MeshStandardMaterial[];
        prevMats.forEach((m) => m.emissive?.set(0x000000));
      }

      hoveredMeshRef.current = hit;
      const mats = hit.material as THREE.MeshStandardMaterial[];
      mats.forEach((m) => m.emissive?.set(0x38bdf8).multiplyScalar(0.4));
    } else {
      if (hoveredMeshRef.current) {
        const mats = hoveredMeshRef.current.material as THREE.MeshStandardMaterial[];
        mats.forEach((m) => m.emissive?.set(0x000000));
        hoveredMeshRef.current = null;
      }
      setHoveredElement(null);
      setTooltipPos(null);
    }
  };

  const handleClick = () => {
    if (hoveredElement) {
      onSelectElement(hoveredElement);
    }
  };

  const resetCamera = () => {
    if (!cameraRef.current || !controlsRef.current) return;
    cameraRef.current.position.set(0, 24, 28);
    controlsRef.current.target.set(0, 2, 0);
  };

  return (
    <div className="flex flex-col gap-4 animate-fade-in text-slate-100">
      {/* Header & Controls Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl backdrop-blur-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-cyan-500/20 text-cyan-400">
              <Sparkles className="w-4 h-4" aria-hidden="true" />
            </span>
            <h2 className="text-base sm:text-lg font-bold text-slate-100">
              {t('skyline.title', '3D Atomic Skyline')}
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            {t('skyline.subtitle', 'Periodic properties extruded into an interactive 3D chemical metropolis')}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
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
            <span>{t('skyline.autoRotate', 'Auto-Rotate')}</span>
          </button>

          <button
            type="button"
            onClick={resetCamera}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-semibold transition-colors"
          >
            <Maximize2 className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{t('skyline.resetView', 'Reset Camera')}</span>
          </button>
        </div>
      </div>

      {/* Property Selector Pills */}
      <div className="flex flex-wrap items-center gap-1.5 p-3 rounded-2xl bg-slate-900/70 border border-slate-800 text-xs">
        <span className="text-slate-400 font-medium mr-1.5">{t('skyline.property', 'Metric:')}</span>
        {(
          [
            'ionizationEnergy',
            'electronegativity',
            'atomicRadius',
            'density',
            'meltingPoint',
            'boilingPoint',
            'electronAffinity',
            'atomicMass',
            'discoveryYear',
            'category',
          ] as SkylineMetric[]
        ).map((m) => {
          const isSelected = metric === m;
          return (
            <button
              key={m}
              type="button"
              onClick={() => setMetric(m)}
              className={`px-2.5 py-1 rounded-xl border font-semibold transition-all ${
                isSelected
                  ? 'bg-cyan-500/25 text-cyan-200 border-cyan-400 ring-1 ring-cyan-400 shadow-md scale-102'
                  : 'bg-slate-800/60 text-slate-300 border-slate-700/80 hover:bg-slate-800 hover:text-slate-100'
              }`}
            >
              {t(`skyline.properties.${m}`)}
            </button>
          );
        })}
      </div>

      {/* Main 3D Canvas Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        <div
          ref={mountRef}
          onPointerMove={handlePointerMove}
          onClick={handleClick}
          role="region"
          aria-label={t('skyline.title', '3D Atomic Skyline Canvas')}
          className="lg:col-span-9 relative w-full h-[580px] sm:h-[660px] rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl cursor-grab active:cursor-grabbing"
        >
          {!webglSupported && (
            <div className="absolute inset-0 flex items-center justify-center p-6 text-center text-slate-400 text-sm">
              WebGL is not available in your browser. Please ensure hardware acceleration is enabled.
            </div>
          )}

          {/* Interactive Tooltip Overlay */}
          {hoveredElement && tooltipPos && (
            <div
              style={{
                left: `${Math.max(12, tooltipPos.x + 14)}px`,
                top: `${Math.max(12, tooltipPos.y - 70)}px`,
              }}
              className="pointer-events-none absolute z-20 p-2.5 rounded-xl bg-slate-900/95 border border-cyan-500/50 shadow-2xl backdrop-blur-md text-xs space-y-1 min-w-[190px] animate-fade-in"
            >
              <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-1">
                <span className="font-bold text-slate-100">
                  {getLocalizedElementName(hoveredElement.atomicNumber, lang) || hoveredElement.name}
                </span>
                <span className="font-mono text-cyan-300 font-extrabold px-1.5 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30">
                  {hoveredElement.symbol}
                </span>
              </div>
              <div className="text-[11px] text-slate-300 flex items-center justify-between">
                <span className="text-slate-400">Z = {hoveredElement.atomicNumber}</span>
                <span className="font-mono text-amber-300 font-bold">
                  {formatMetricVal(metricValues.get(hoveredElement.atomicNumber))}
                </span>
              </div>
              <div className="text-[10px] text-slate-400 truncate">
                {t(`categories.${hoveredElement.category}`, categoryMetadata[hoveredElement.category]?.name)}
              </div>
            </div>
          )}

          {/* Canvas Bottom-Left Instruction Badge */}
          <div className="absolute bottom-3 left-3 pointer-events-none flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] text-slate-300 backdrop-blur-sm">
            <Info className="w-3.5 h-3.5 text-cyan-400 shrink-0" aria-hidden="true" />
            <span>{t('skyline.clickHint', 'Click any column to inspect. Drag to orbit, scroll to zoom.')}</span>
          </div>

          {/* Color Gradient Legend on Top-Right */}
          {metric !== 'category' && (
            <div className="absolute top-3 right-3 pointer-events-none p-2.5 rounded-xl bg-slate-900/85 border border-slate-800 text-[10px] font-mono text-slate-300 backdrop-blur-sm space-y-1.5">
              <div className="text-slate-400 font-bold uppercase tracking-wider">{t(`skyline.properties.${metric}`)}</div>
              <div className="flex items-center gap-2">
                <span>{formatMetricVal(minVal)}</span>
                <div className="w-24 h-2.5 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-amber-400" />
                <span>{formatMetricVal(maxVal)}</span>
              </div>
            </div>
          )}
        </div>

        {/* Right Leaderboard & Educational Insights Panel */}
        <div className="lg:col-span-3 space-y-4">
          {/* Scientific Insight Card */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs shadow-lg space-y-2">
            <div className="flex items-center gap-2 text-cyan-300 font-bold">
              <Sparkles className="w-4 h-4" aria-hidden="true" />
              <span>{t('trends.trendMode', 'Chemical Pattern')}</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              {t(`skyline.insights.${metric}`)}
            </p>
          </div>

          {/* Top 5 Leaderboard */}
          {topFive.length > 0 && (
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs shadow-lg space-y-2.5">
              <div className="flex items-center gap-2 text-amber-300 font-bold">
                <TrendingUp className="w-4 h-4" aria-hidden="true" />
                <span>{t('skyline.topFive', 'Top 5 Peaks')}</span>
              </div>
              <div className="space-y-1.5">
                {topFive.map(({ el, val }, idx) => (
                  <button
                    key={el.atomicNumber}
                    type="button"
                    onClick={() => onSelectElement(el)}
                    className="w-full flex items-center justify-between p-2 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 transition-all text-left group"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="w-4 text-center font-mono font-bold text-amber-400 text-[11px]">{idx + 1}</span>
                      <span className="font-mono text-cyan-400 font-black">{el.symbol}</span>
                      <span className="text-slate-200 font-medium truncate">
                        {getLocalizedElementName(el.atomicNumber, lang) || el.name}
                      </span>
                    </div>
                    <span className="font-mono text-slate-300 font-bold text-[11px] shrink-0 ml-2">
                      {formatMetricVal(val)}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Bottom 5 Leaderboard */}
          {bottomFive.length > 0 && (
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs shadow-lg space-y-2.5">
              <div className="flex items-center gap-2 text-blue-300 font-bold">
                <TrendingDown className="w-4 h-4" aria-hidden="true" />
                <span>{t('skyline.bottomFive', 'Lowest 5 Valleys')}</span>
              </div>
              <div className="space-y-1.5">
                {bottomFive.map(({ el, val }, idx) => (
                  <button
                    key={el.atomicNumber}
                    type="button"
                    onClick={() => onSelectElement(el)}
                    className="w-full flex items-center justify-between p-2 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 transition-all text-left group"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="w-4 text-center font-mono font-bold text-blue-400 text-[11px]">{idx + 1}</span>
                      <span className="font-mono text-cyan-400 font-black">{el.symbol}</span>
                      <span className="text-slate-200 font-medium truncate">
                        {getLocalizedElementName(el.atomicNumber, lang) || el.name}
                      </span>
                    </div>
                    <span className="font-mono text-slate-300 font-bold text-[11px] shrink-0 ml-2">
                      {formatMetricVal(val)}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
