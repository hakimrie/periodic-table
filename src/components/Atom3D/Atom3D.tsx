import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import type { ChemicalElement, CommonIon } from '../../types/element';
import { Play, Pause, RotateCcw, Info, Sparkles, Layers } from 'lucide-react';
import { useI18n } from '../../utils/i18n';
import { getLocalizedElementName } from '../../data/elements/translations';

interface Atom3DProps {
  element: ChemicalElement;
  selectedIon?: CommonIon | null;
  onToggleIon?: () => void;
  className?: string;
}

const SHELL_NAMES = ['K (n=1)', 'L (n=2)', 'M (n=3)', 'N (n=4)', 'O (n=5)', 'P (n=6)', 'Q (n=7)'];
const SHELL_RADII = [3.5, 5.8, 8.2, 10.8, 13.5, 16.2, 19.0];

export const Atom3D: React.FC<Atom3DProps> = ({
  element,
  selectedIon,
  onToggleIon,
  className = '',
}) => {
  const { t, lang } = useI18n();
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return true;
  });
  const [showShellLabels, setShowShellLabels] = useState(true);
  const [use2DFallback, setUse2DFallback] = useState(false);
  const [webglError, setWebglError] = useState(false);

  // Listen for prefers-reduced-motion changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (e: MediaQueryListEvent) => {
      setIsPlaying(!e.matches);
    };
    mediaQuery.addEventListener?.('change', handleChange);
    return () => mediaQuery.removeEventListener?.('change', handleChange);
  }, []);

  // Determine current active shells and electron counts (neutral vs ion)
  const activeShells = useMemo(() => {
    if (!selectedIon) {
      return element.electronConfiguration.shells;
    }
    // If ion is selected, adjust shells based on ion electron count
    let remaining = selectedIon.electronCount;
    const ionShells: number[] = [];

    // For cations (lost electrons), outer shells are depleted
    for (let i = 0; i < element.electronConfiguration.shells.length; i++) {
      if (remaining <= 0) break;
      const count = Math.min(element.electronConfiguration.shells[i], remaining);
      ionShells.push(count);
      remaining -= count;
    }
    return ionShells;
  }, [element, selectedIon]);

  const totalElectrons = useMemo(() => {
    return activeShells.reduce((a, b) => a + b, 0);
  }, [activeShells]);

  // Controls reset reference
  const controlsRef = useRef<OrbitControls | null>(null);

  // WebGL 3D implementation
  useEffect(() => {
    if (use2DFallback) return;
    const container = containerRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    } catch (e) {
      console.warn('WebGL initialization failed, switching to 2D canvas fallback:', e);
      setTimeout(() => {
        setWebglError(true);
        setUse2DFallback(true);
      }, 0);
      return;
    }

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 16, 26);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxDistance = 60;
    controls.minDistance = 6;
    controlsRef.current = controls;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x60a5fa, 1.2);
    dirLight1.position.set(10, 20, 15);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xf472b6, 0.8);
    dirLight2.position.set(-10, -10, -10);
    scene.add(dirLight2);

    const nucleusGlow = new THREE.PointLight(0xf59e0b, 1.5, 20);
    nucleusGlow.position.set(0, 0, 0);
    scene.add(nucleusGlow);

    // Build Nucleus
    const nucleusGroup = new THREE.Group();
    const protonCount = element.protons;
    const neutronCount = element.neutronsMostCommon;

    // If particles are > 40, render representative clustered spheres + glowing central core to preserve 60fps
    const maxParticles = Math.min(protonCount + neutronCount, 40);
    const protonRatio = protonCount / (protonCount + neutronCount || 1);

    const sphereGeom = new THREE.SphereGeometry(0.32, 16, 16);
    const protonMat = new THREE.MeshStandardMaterial({
      color: 0xef4444, // Red for protons (+)
      emissive: 0x991b1b,
      roughness: 0.3,
      metalness: 0.2,
    });
    const neutronMat = new THREE.MeshStandardMaterial({
      color: 0x3b82f6, // Blue for neutrons (0)
      emissive: 0x1e3a8a,
      roughness: 0.3,
      metalness: 0.2,
    });

    const nucleusRadius = Math.min(1.8, 0.5 + Math.cbrt(protonCount + neutronCount) * 0.25);

    // Glowing core
    const coreGeom = new THREE.SphereGeometry(nucleusRadius * 0.9, 24, 24);
    const coreMat = new THREE.MeshBasicMaterial({
      color: selectedIon ? (selectedIon.charge > 0 ? 0xec4899 : 0x06b6d4) : 0xf59e0b,
      transparent: true,
      opacity: 0.25,
      wireframe: true,
    });
    const coreMesh = new THREE.Mesh(coreGeom, coreMat);
    nucleusGroup.add(coreMesh);

    // Clustered nucleons
    for (let i = 0; i < maxParticles; i++) {
      const isProton = Math.random() < protonRatio;
      const mesh = new THREE.Mesh(sphereGeom, isProton ? protonMat : neutronMat);

      // Fibonacci sphere packing distribution in nucleus
      const phi = Math.acos(-1 + (2 * i) / maxParticles);
      const theta = Math.sqrt(maxParticles * Math.PI) * phi;
      const r = nucleusRadius * (0.4 + Math.random() * 0.55);

      mesh.position.set(
        r * Math.cos(theta) * Math.sin(phi),
        r * Math.sin(theta) * Math.sin(phi),
        r * Math.cos(phi)
      );
      nucleusGroup.add(mesh);
    }
    scene.add(nucleusGroup);

    // Build Electron Shells & Orbiting Electrons
    const shellGroup = new THREE.Group();
    const electronMeshes: { mesh: THREE.Mesh; shellIndex: number; angle: number; speed: number; radius: number }[] = [];

    const electronGeom = new THREE.SphereGeometry(0.24, 16, 16);
    const electronMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8, // Electric cyan
      emissive: 0x0284c7,
      roughness: 0.2,
      metalness: 0.8,
    });

    activeShells.forEach((electronCount, shellIdx) => {
      const radius = SHELL_RADII[shellIdx] || (shellIdx + 1) * 3.0;

      // Orbit ring line
      const points: THREE.Vector3[] = [];
      const segments = 64;
      for (let s = 0; s <= segments; s++) {
        const theta = (s / segments) * Math.PI * 2;
        points.push(new THREE.Vector3(Math.cos(theta) * radius, 0, Math.sin(theta) * radius));
      }
      const ringGeom = new THREE.BufferGeometry().setFromPoints(points);
      const ringMat = new THREE.LineBasicMaterial({
        color: shellIdx === activeShells.length - 1 ? 0x38bdf8 : 0x475569,
        transparent: true,
        opacity: shellIdx === activeShells.length - 1 ? 0.75 : 0.35,
      });
      const ringLine = new THREE.Line(ringGeom, ringMat);

      // Tilt each shell slightly for a dynamic 3D gyroscope appearance
      const tiltX = (shellIdx * 0.15) - 0.2;
      const tiltZ = (shellIdx * 0.12) - 0.15;
      ringLine.rotation.x = tiltX;
      ringLine.rotation.z = tiltZ;
      shellGroup.add(ringLine);

      // Distribute electrons along this shell
      const baseSpeed = (1.5 / Math.sqrt(radius)) * (shellIdx % 2 === 0 ? 1 : -1);

      for (let e = 0; e < electronCount; e++) {
        const angle = (e / electronCount) * Math.PI * 2;
        const eMesh = new THREE.Mesh(electronGeom, electronMat);
        ringLine.add(eMesh);

        electronMeshes.push({
          mesh: eMesh,
          shellIndex: shellIdx,
          angle,
          speed: baseSpeed,
          radius,
        });
      }
    });

    scene.add(shellGroup);

    // Animation Loop
    let animationFrameId: number;
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      if (isPlaying) {
        // Rotate nucleus slowly
        nucleusGroup.rotation.y += 0.008;
        nucleusGroup.rotation.x += 0.004;

        // Move electrons along rings
        electronMeshes.forEach((eObj) => {
          eObj.angle += eObj.speed * delta * 1.5;
          eObj.mesh.position.x = Math.cos(eObj.angle) * eObj.radius;
          eObj.mesh.position.z = Math.sin(eObj.angle) * eObj.radius;
        });

        // Slow gyro drift
        shellGroup.rotation.y += 0.002;
      }

      controls.update();
      renderer.render(scene, camera);
    };

    animationFrameId = requestAnimationFrame(animate);

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth || 400;
      const newH = container.clientHeight || 400;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      controls.dispose();
      renderer.dispose();
      sphereGeom.dispose();
      protonMat.dispose();
      neutronMat.dispose();
      electronGeom.dispose();
      electronMat.dispose();
      coreGeom.dispose();
      coreMat.dispose();
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [element, activeShells, isPlaying, use2DFallback, selectedIon]);

  // 2D Canvas Fallback Implementation
  useEffect(() => {
    if (!use2DFallback) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let angle = 0;

    const render = () => {
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;

      ctx.clearRect(0, 0, w, h);

      // Background ambient
      const grad = ctx.createRadialGradient(cx, cy, 10, cx, cy, w / 2);
      grad.addColorStop(0, 'rgba(56, 189, 248, 0.08)');
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Nucleus
      ctx.beginPath();
      ctx.arc(cx, cy, 14, 0, Math.PI * 2);
      ctx.fillStyle = selectedIon ? '#ec4899' : '#f59e0b';
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 10px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`${element.protons}+`, cx, cy);

      // Draw shells
      const maxRadius = Math.min(cx, cy) - 20;
      const radiusStep = maxRadius / (activeShells.length + 0.5);

      activeShells.forEach((eCount, sIdx) => {
        const r = (sIdx + 1) * radiusStep;

        // Shell circle
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = sIdx === activeShells.length - 1 ? 'rgba(56, 189, 248, 0.7)' : 'rgba(100, 116, 139, 0.35)';
        ctx.lineWidth = sIdx === activeShells.length - 1 ? 2 : 1;
        ctx.stroke();

        // Label
        if (showShellLabels) {
          ctx.fillStyle = 'rgba(148, 163, 184, 0.6)';
          ctx.font = '9px sans-serif';
          ctx.fillText(`n=${sIdx + 1}`, cx + r, cy - 4);
        }

        // Electrons
        const speed = (0.015 / (sIdx + 1)) * (sIdx % 2 === 0 ? 1 : -1);
        const currentAngle = angle * speed;

        for (let e = 0; e < eCount; e++) {
          const eAngle = currentAngle + (e / eCount) * Math.PI * 2;
          const ex = cx + Math.cos(eAngle) * r;
          const ey = cy + Math.sin(eAngle) * r;

          ctx.beginPath();
          ctx.arc(ex, ey, 4.5, 0, Math.PI * 2);
          ctx.fillStyle = '#38bdf8';
          ctx.shadowColor = '#0284c7';
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      if (isPlaying) {
        angle += 1;
      }
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [use2DFallback, activeShells, element, isPlaying, showShellLabels, selectedIon]);

  const handleResetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  return (
    <div className={`relative flex flex-col bg-slate-900/90 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl ${className}`}>
      {/* Top Header / Status bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-950/60 z-10">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-sm font-semibold text-slate-100 flex items-center gap-1.5">
            {getLocalizedElementName(element.atomicNumber, lang) || element.name} ({element.symbol})
            {selectedIon && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30">
                Ion {selectedIon.formula}
              </span>
            )}
          </span>
        </div>

        {/* View neutral / ion toggle button */}
        {element.commonIons.length > 0 && onToggleIon && (
          <button
            type="button"
            onClick={onToggleIon}
            aria-pressed={!!selectedIon}
            aria-label={selectedIon ? `Switch to neutral atom from ion ${selectedIon.formula}` : `Simulate ion ${element.commonIons[0]?.formula} in 3D`}
            className={`text-xs px-3 py-1 rounded-lg font-medium transition-all flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-cyan-400 ${
              selectedIon
                ? 'bg-pink-600 text-white shadow-lg shadow-pink-500/30'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            {selectedIon ? `${t('element.viewingIn3D')} (${selectedIon.formula})` : t('element.simulateIn3D')}
          </button>
        )}
      </div>

      {/* Main 3D Canvas / 2D Canvas Area */}
      <div
        role="img"
        aria-label={`${element.name} (${element.symbol}) atomic model with ${element.protons} protons, ${element.neutronsMostCommon} neutrons, and ${totalElectrons} electrons across ${activeShells.length} shells`}
        className="relative w-full h-80 sm:h-96 flex items-center justify-center bg-radial from-slate-900 via-slate-950 to-slate-950"
      >
        {use2DFallback ? (
          <canvas
            ref={canvasRef}
            width={400}
            height={400}
            aria-hidden="true"
            className="w-full h-full max-w-[400px] max-h-[400px]"
          />
        ) : (
          <div ref={containerRef} aria-hidden="true" className="w-full h-full cursor-grab active:cursor-grabbing" />
        )}

        {/* Nucleus & Electrons Quick Overlay Badge */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 pointer-events-none">
          <div className="flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-md text-xs border border-slate-700/60 text-slate-200">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500" aria-hidden="true" />
            <span>{t('element.protons', 'Protons')}: <strong className="text-slate-100">{element.protons}</strong></span>
          </div>
          <div className="flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-md text-xs border border-slate-700/60 text-slate-200">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500" aria-hidden="true" />
            <span>{t('element.neutrons', 'Neutrons')}: <strong className="text-slate-100">{element.neutronsMostCommon}</strong></span>
          </div>
          <div className="flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-md text-xs border border-slate-700/60 text-slate-200">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" aria-hidden="true" />
            <span>{t('element.electrons', 'Electrons')}: <strong className="text-slate-100">{totalElectrons}</strong></span>
          </div>
        </div>

        {/* 2D / 3D Mode Toggle Switch */}
        <div role="group" aria-label="Renderer mode" className="absolute top-3 right-3 flex items-center gap-1 bg-slate-900/80 backdrop-blur-md p-1 rounded-lg border border-slate-700/60">
          {webglError && (
            <span className="text-[10px] text-amber-400 font-medium px-1">2D Fallback Active</span>
          )}
          <button
            type="button"
            onClick={() => setUse2DFallback(false)}
            disabled={webglError}
            aria-pressed={!use2DFallback}
            aria-label="3D WebGL Visualization"
            className={`px-2 py-1 text-xs rounded font-medium transition-colors focus-visible:ring-2 focus-visible:ring-cyan-400 ${
              !use2DFallback ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
            } ${webglError ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            3D
          </button>
          <button
            type="button"
            onClick={() => setUse2DFallback(true)}
            aria-pressed={use2DFallback}
            aria-label="2D High-DPI Canvas Fallback"
            className={`px-2 py-1 text-xs rounded font-medium transition-colors focus-visible:ring-2 focus-visible:ring-cyan-400 ${
              use2DFallback ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
            }`}
          >
            2D
          </button>
        </div>
      </div>

      {/* Interactive Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 bg-slate-950/80 border-t border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          {/* Pause / Play */}
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? 'Pause orbital animation' : 'Resume orbital animation'}
            aria-pressed={!isPlaying}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5 text-amber-400" aria-hidden="true" /> : <Play className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />}
            <span>{isPlaying ? t('atom3D.pause', 'Pause') : t('atom3D.play', 'Resume')}</span>
          </button>

          {/* Reset Camera */}
          {!use2DFallback && (
            <button
              type="button"
              onClick={handleResetCamera}
              aria-label="Reset 3D camera orientation"
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{t('atom3D.resetCamera', 'Reset View')}</span>
            </button>
          )}

          {/* Toggle Shell Labels */}
          <button
            type="button"
            onClick={() => setShowShellLabels(!showShellLabels)}
            aria-pressed={showShellLabels}
            aria-label={showShellLabels ? 'Hide electron shell labels' : 'Show electron shell labels'}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-cyan-400 ${
              showShellLabels ? 'bg-cyan-900/40 text-cyan-300 border border-cyan-800/60' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Layers className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{t('atom3D.toggleShells', 'Shells')}</span>
          </button>
        </div>

        {/* Shell configuration badges */}
        <div role="list" aria-label="Electron shell configuration" className="flex items-center gap-1.5 overflow-x-auto py-1 text-[11px]">
          {activeShells.map((count, idx) => (
            <span
              role="listitem"
              key={idx}
              className={`px-2 py-0.5 rounded-md font-mono border ${
                idx === activeShells.length - 1
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 font-bold'
                  : 'bg-slate-800/80 text-slate-200 border-slate-700/60'
              }`}
              title={`Shell ${SHELL_NAMES[idx] || idx + 1}: ${count} electrons`}
              aria-label={`Shell ${SHELL_NAMES[idx] || idx + 1}: ${count} electrons`}
            >
              {['K', 'L', 'M', 'N', 'O', 'P', 'Q'][idx] || idx + 1}:{count}
            </span>
          ))}
        </div>
      </div>

      {/* Prominent Scientific Accuracy Note */}
      <div className="flex items-start gap-2 px-4 py-2.5 bg-slate-950/95 border-t border-slate-800/80 text-[11px] text-slate-300">
        <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" aria-hidden="true" />
        <p className="leading-relaxed">
          <strong className="text-slate-100">{t('atom3D.scientificNoteTitle', 'Educational Bohr-Style Model:')}</strong>{' '}
          {t('atom3D.scientificNote')}
        </p>
      </div>
    </div>
  );
};
