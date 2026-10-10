/**
 * Real hydrogenic wavefunctions ψ_nlm for atomic orbitals (s, p, d, f).
 * Based on solutions to the Schrödinger equation with Coulomb potential:
 *   ψ_nlm(r, θ, φ) = R_nl(r) * Y_lm(θ, φ)
 */

export type SubshellType = 's' | 'p' | 'd' | 'f';

export interface OrbitalDef {
  n: number;
  l: number;
  subshell: SubshellType;
  mKey: string;
  label: string; // e.g. "3d_{z²}"
  displayName: string;
}

export const ALL_ORBITALS: OrbitalDef[] = [
  // n = 1
  { n: 1, l: 0, subshell: 's', mKey: 's', label: '1s', displayName: '1s' },

  // n = 2
  { n: 2, l: 0, subshell: 's', mKey: 's', label: '2s', displayName: '2s' },
  { n: 2, l: 1, subshell: 'p', mKey: 'pz', label: '2p_z', displayName: '2p_z' },
  { n: 2, l: 1, subshell: 'p', mKey: 'px', label: '2p_x', displayName: '2p_x' },
  { n: 2, l: 1, subshell: 'p', mKey: 'py', label: '2p_y', displayName: '2p_y' },

  // n = 3
  { n: 3, l: 0, subshell: 's', mKey: 's', label: '3s', displayName: '3s' },
  { n: 3, l: 1, subshell: 'p', mKey: 'pz', label: '3p_z', displayName: '3p_z' },
  { n: 3, l: 1, subshell: 'p', mKey: 'px', label: '3p_x', displayName: '3p_x' },
  { n: 3, l: 1, subshell: 'p', mKey: 'py', label: '3p_y', displayName: '3p_y' },
  { n: 3, l: 2, subshell: 'd', mKey: 'dz2', label: '3d_{z²}', displayName: '3d_z²' },
  { n: 3, l: 2, subshell: 'd', mKey: 'dxz', label: '3d_{xz}', displayName: '3d_xz' },
  { n: 3, l: 2, subshell: 'd', mKey: 'dyz', label: '3d_{yz}', displayName: '3d_yz' },
  { n: 3, l: 2, subshell: 'd', mKey: 'dx2y2', label: '3d_{x²-y²}', displayName: '3d_x²-y²' },
  { n: 3, l: 2, subshell: 'd', mKey: 'dxy', label: '3d_{xy}', displayName: '3d_xy' },

  // n = 4
  { n: 4, l: 0, subshell: 's', mKey: 's', label: '4s', displayName: '4s' },
  { n: 4, l: 1, subshell: 'p', mKey: 'pz', label: '4p_z', displayName: '4p_z' },
  { n: 4, l: 1, subshell: 'p', mKey: 'px', label: '4p_x', displayName: '4p_x' },
  { n: 4, l: 1, subshell: 'p', mKey: 'py', label: '4p_y', displayName: '4p_y' },
  { n: 4, l: 2, subshell: 'd', mKey: 'dz2', label: '4d_{z²}', displayName: '4d_z²' },
  { n: 4, l: 2, subshell: 'd', mKey: 'dxz', label: '4d_{xz}', displayName: '4d_xz' },
  { n: 4, l: 2, subshell: 'd', mKey: 'dyz', label: '4d_{yz}', displayName: '4d_yz' },
  { n: 4, l: 2, subshell: 'd', mKey: 'dx2y2', label: '4d_{x²-y²}', displayName: '4d_x²-y²' },
  { n: 4, l: 2, subshell: 'd', mKey: 'dxy', label: '4d_{xy}', displayName: '4d_xy' },
  { n: 4, l: 3, subshell: 'f', mKey: 'fz3', label: '4f_{z³}', displayName: '4f_z³' },
  { n: 4, l: 3, subshell: 'f', mKey: 'fxz2', label: '4f_{xz²}', displayName: '4f_xz²' },
  { n: 4, l: 3, subshell: 'f', mKey: 'fyz2', label: '4f_{yz²}', displayName: '4f_yz²' },
  { n: 4, l: 3, subshell: 'f', mKey: 'fzx2y2', label: '4f_{z(x²-y²)}', displayName: '4f_z(x²-y²)' },
  { n: 4, l: 3, subshell: 'f', mKey: 'fxyz', label: '4f_{xyz}', displayName: '4f_xyz' },
  { n: 4, l: 3, subshell: 'f', mKey: 'fxx23y2', label: '4f_{x(x²-3y²)}', displayName: '4f_x(x²-3y²)' },
  { n: 4, l: 3, subshell: 'f', mKey: 'fy3x2y2', label: '4f_{y(3x²-y²)}', displayName: '4f_y(3x²-y²)' },

  // n = 5
  { n: 5, l: 0, subshell: 's', mKey: 's', label: '5s', displayName: '5s' },
  { n: 5, l: 1, subshell: 'p', mKey: 'pz', label: '5p_z', displayName: '5p_z' },
  { n: 5, l: 2, subshell: 'd', mKey: 'dz2', label: '5d_{z²}', displayName: '5d_z²' },
  { n: 5, l: 3, subshell: 'f', mKey: 'fz3', label: '5f_{z³}', displayName: '5f_z³' },
];

/** Factorial helper */
export function factorial(k: number): number {
  if (k <= 1) return 1;
  let res = 1;
  for (let i = 2; i <= k; i++) res *= i;
  return res;
}

/** Associated Laguerre polynomial L_p^k(x) */
export function laguerre(p: number, k: number, x: number): number {
  if (p === 0) return 1;
  if (p === 1) return 1 + k - x;
  let lPrev2 = 1;
  let lPrev1 = 1 + k - x;
  let lCurr = lPrev1;
  for (let i = 1; i < p; i++) {
    lCurr = ((2 * i + 1 + k - x) * lPrev1 - (i + k) * lPrev2) / (i + 1);
    lPrev2 = lPrev1;
    lPrev1 = lCurr;
  }
  return lCurr;
}

/** Radial wavefunction R_nl(r) in units of a_0 */
export function radialR(n: number, l: number, r: number, Z = 1): number {
  if (r < 0) return 0;
  const rho = (2 * Z * r) / n;
  const p = n - l - 1;
  const k = 2 * l + 1;
  const norm =
    Math.pow((2 * Z) / n, 1.5) *
    Math.sqrt(factorial(p) / (2 * n * factorial(n + l)));
  const lag = laguerre(p, k, rho);
  return norm * Math.exp(-rho / 2) * Math.pow(rho, l) * lag;
}

/** Real Angular factor Y_lm(x, y, z) where r = sqrt(x^2 + y^2 + z^2) */
export function angularY(l: number, mKey: string, x: number, y: number, z: number, r: number): number {
  if (r < 1e-9) return l === 0 ? 1 / (2 * Math.sqrt(Math.PI)) : 0;
  const invR = 1 / r;
  const nx = x * invR;
  const ny = y * invR;
  const nz = z * invR;

  if (l === 0) {
    // s orbital: spherically symmetric
    return 1 / (2 * Math.sqrt(Math.PI));
  }

  if (l === 1) {
    // p orbitals
    const c = Math.sqrt(3 / (4 * Math.PI));
    if (mKey === 'pz') return c * nz;
    if (mKey === 'px') return c * nx;
    if (mKey === 'py') return c * ny;
  }

  if (l === 2) {
    // d orbitals
    if (mKey === 'dz2') {
      return 0.25 * Math.sqrt(5 / Math.PI) * (3 * nz * nz - 1);
    }
    const c = 0.5 * Math.sqrt(15 / Math.PI);
    if (mKey === 'dxz') return c * nx * nz;
    if (mKey === 'dyz') return c * ny * nz;
    if (mKey === 'dxy') return c * nx * ny;
    if (mKey === 'dx2y2') return 0.5 * c * (nx * nx - ny * ny);
  }

  if (l === 3) {
    // f orbitals
    if (mKey === 'fz3') {
      return 0.25 * Math.sqrt(7 / Math.PI) * nz * (5 * nz * nz - 3);
    }
    if (mKey === 'fxz2') {
      return 0.25 * Math.sqrt(21 / (2 * Math.PI)) * nx * (5 * nz * nz - 1);
    }
    if (mKey === 'fyz2') {
      return 0.25 * Math.sqrt(21 / (2 * Math.PI)) * ny * (5 * nz * nz - 1);
    }
    if (mKey === 'fzx2y2') {
      return 0.25 * Math.sqrt(105 / Math.PI) * nz * (nx * nx - ny * ny);
    }
    if (mKey === 'fxyz') {
      return Math.sqrt(105 / (4 * Math.PI)) * nx * ny * nz;
    }
    if (mKey === 'fxx23y2') {
      return 0.25 * Math.sqrt(35 / (2 * Math.PI)) * nx * (nx * nx - 3 * ny * ny);
    }
    if (mKey === 'fy3x2y2') {
      return 0.25 * Math.sqrt(35 / (2 * Math.PI)) * ny * (3 * nx * nx - ny * ny);
    }
  }

  return 0;
}

/** Full wavefunction evaluation ψ_nlm(x, y, z) */
export function evaluatePsi(
  n: number,
  l: number,
  mKey: string,
  x: number,
  y: number,
  z: number,
  Z = 1
): number {
  const r = Math.sqrt(x * x + y * y + z * z);
  const R = radialR(n, l, r, Z);
  const Y = angularY(l, mKey, x, y, z, r);
  return R * Y;
}

/** Radial probability density P(r) = r^2 * [R_nl(r)]^2 */
export function radialProbabilityP(n: number, l: number, r: number, Z = 1): number {
  const R = radialR(n, l, r, Z);
  return r * r * R * R;
}

/**
 * Monte Carlo rejection sampling of electron probability density |ψ|²
 * Returns Float32Array of [x, y, z] points and Float32Array of signs (+1 or -1).
 */
export function sampleOrbitalPoints(
  n: number,
  l: number,
  mKey: string,
  targetCount = 35000,
  Z = 1
): { positions: Float32Array; phases: Float32Array; rMax: number } {
  // Determine bounding box based on principal quantum number n
  const rMax = Math.max(12, n * n * 5.0);
  const boxRadius = rMax * 0.85;

  const positions = new Float32Array(targetCount * 3);
  const phases = new Float32Array(targetCount);

  // Approximate peak probability density to set envelope for rejection sampling
  let peakPsi2 = 0;
  for (let i = 0; i < 300; i++) {
    const testR = (i / 300) * (n * n * 2.5) + 0.05;
    const psi = evaluatePsi(n, l, mKey, testR, 0, testR * 0.5, Z);
    const psi2 = psi * psi;
    if (psi2 > peakPsi2) peakPsi2 = psi2;
  }
  if (peakPsi2 <= 1e-12) peakPsi2 = 0.05;

  let collected = 0;
  let attempts = 0;
  const maxAttempts = targetCount * 70;

  while (collected < targetCount && attempts < maxAttempts) {
    attempts++;
    // Uniform point in box
    const x = (Math.random() * 2 - 1) * boxRadius;
    const y = (Math.random() * 2 - 1) * boxRadius;
    const z = (Math.random() * 2 - 1) * boxRadius;
    const r = Math.sqrt(x * x + y * y + z * z);
    if (r > boxRadius || r < 1e-4) continue;

    const psi = evaluatePsi(n, l, mKey, x, y, z, Z);
    const prob = psi * psi;

    if (Math.random() * peakPsi2 < prob) {
      const idx3 = collected * 3;
      positions[idx3] = x;
      positions[idx3 + 1] = y;
      positions[idx3 + 2] = z;
      phases[collected] = psi >= 0 ? 1 : -1;
      collected++;
    }
  }

  return { positions, phases, rMax };
}

/** Compute data points for the 2D radial probability curve */
export function getRadialCurveData(
  n: number,
  l: number,
  Z = 1,
  steps = 80
): Array<{ r: number; p: number }> {
  const rMax = Math.max(10, n * n * 4.5);
  const data: Array<{ r: number; p: number }> = [];
  for (let i = 0; i <= steps; i++) {
    const r = (i / steps) * rMax;
    data.push({ r, p: radialProbabilityP(n, l, r, Z) });
  }
  return data;
}
