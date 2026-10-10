import type { TranslationBundle } from '../../utils/i18n';

const bundle: TranslationBundle = {
  en: {
    orbitals: {
      title: 'Quantum Orbital Lab',
      subtitle: 'Real 3D electron probability clouds derived from the Schrödinger wave equation',
      occupiedTitle: 'Occupied Subshells for',
      selectOrbital: 'Choose Orbital',
      quantumNumbers: 'Quantum Numbers',
      principalN: 'Principal Quantum Number (n)',
      azimuthalL: 'Azimuthal / Angular Momentum (l)',
      magneticM: 'Magnetic Quantum Number (mₗ)',
      radialNodes: 'Radial Nodes (n - l - 1)',
      angularNodes: 'Angular Nodal Planes (l)',
      totalNodes: 'Total Nodes (n - 1)',
      sliceView: 'Cross-Section Slice',
      sliceHint: 'Reveals internal radial nodes & nested shells',
      combineSubshell: 'Full Subshell Overlay',
      combineHint: 'Combines all degenerate orbitals (e.g. px + py + pz)',
      autoRotate: 'Auto-Rotate',
      resetView: 'Reset Camera',
      radialChartTitle: 'Radial Probability Density P(r) = r²·R²',
      radialChartDesc: 'Probability of locating the electron in a spherical shell at distance r from the nucleus.',
      phaseLegend: {
        title: 'Wavefunction Phase Sign',
        positive: 'Positive Phase (ψ > 0)',
        negative: 'Negative Phase (ψ < 0)',
        desc: 'Phase signs are critical for chemical bonding. Constructive overlap (+ with +) forms bonding molecular orbitals; destructive overlap (+ with −) forms antibonding nodes.',
      },
      educationalNote: {
        title: 'Scientific Context: Probability Density vs Classical Paths',
        text: "Unlike the circular planetary orbits of the Bohr model, quantum mechanics dictates that electrons exist as three-dimensional probability wave distributions (orbitals). By Heisenberg's Uncertainty Principle, we can never pinpoint both the exact position and momentum simultaneously. The cloud of glowing points visualizes |ψ|², where point density is directly proportional to the likelihood of finding the electron.",
      },
    },
  },
  id: {
    orbitals: {
      title: 'Laboratorium Orbital Kuantum',
      subtitle: 'Awan probabilitas elektron 3D nyata berdasarkan persamaan gelombang Schrödinger',
      occupiedTitle: 'Subkulit Terisi untuk',
      selectOrbital: 'Pilih Orbital',
      quantumNumbers: 'Bilangan Kuantum',
      principalN: 'Bilangan Kuantum Utama (n)',
      azimuthalL: 'Bilangan Kuantum Azimut (l)',
      magneticM: 'Bilangan Kuantum Magnetik (mₗ)',
      radialNodes: 'Simpul Radial (n - l - 1)',
      angularNodes: 'Bidang Simpul Sudut (l)',
      totalNodes: 'Total Simpul (n - 1)',
      sliceView: 'Irisan Penampang Melintang',
      sliceHint: 'Membuka simpul radial internal & kulit bersarang',
      combineSubshell: 'Tumpukan Subkulit Lengkap',
      combineHint: 'Menggabungkan seluruh orbital terdegenerasi (cth. px + py + pz)',
      autoRotate: 'Rotasi Otomatis',
      resetView: 'Atur Ulang Kamera',
      radialChartTitle: 'Kerapatan Probabilitas Radial P(r) = r²·R²',
      radialChartDesc: 'Peluang menemukan elektron dalam kulit bola pada jarak r dari inti atom.',
      phaseLegend: {
        title: 'Tanda Fase Fungsi Gelombang',
        positive: 'Fase Positif (ψ > 0)',
        negative: 'Fase Negatif (ψ < 0)',
        desc: 'Tanda fase sangat krusial dalam ikatan kimia. Tumpang-tindih sefase (+ dengan +) menghasilkan ikatan, sedangkan beda-fase (+ dengan −) membentuk simpul antibonding.',
      },
      educationalNote: {
        title: 'Konteks Ilmiah: Kerapatan Probabilitas vs Lintasan Klasik',
        text: 'Berbeda dengan orbit lingkaran model Bohr, mekanika kuantum menyatakan bahwa elektron hadir sebagai distribusi gelombang probabilitas tiga dimensi. Berdasarkan Asas Ketidakpastian Heisenberg, posisi dan momentum elektron tidak dapat ditentukan serentak secara presisi. Kerapatan titik memperlihatkan nilai |ψ|².',
      },
    },
  },
};

export default bundle;
