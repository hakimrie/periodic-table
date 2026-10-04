# ⚛️ Interactive Periodic Table of Elements & Chemistry Learning Suite

An interactive, production-quality Periodic Table application and atomic visualization suite designed for **high-school and university chemistry students**.

Built with **React 19, TypeScript, Tailwind CSS, Vite 8, and Three.js**, this application goes beyond static charts to deliver a comprehensive learning platform: 3D subatomic modeling, quantum orbital spin diagrams, periodic trends heatmaps, comparative element analysis, and deterministic quiz evaluation.

> 🌐 **Live Demo & Experiments Portal:** Part of the interactive experiments suite hosted at [experiment.bukuanak.id](https://experiment.bukuanak.id/). Explore all interactive science and education experiments there.

---

## 🌟 Key Features

### 1. Complete & Verified 118-Element Dataset
- **100% IUPAC-Accurate:** Contains full entries for all 118 chemical elements (Hydrogen through Oganesson).
- **Rich Chemical & Physical Metrics:** Standard atomic weights, CAS numbers, electronegativity (Pauling), ionization energy, electron affinity, oxidation states, atomic/covalent/van der Waals radii, density, melting & boiling points (Kelvin), triple & critical points, and crystal structures (FCC, BCC, HCP, DHCP, Diamond, etc.).
- **Subatomic Breakdown:** Exact counts of protons, neutrons (most common isotope), and electrons.
- **Isotopes & Abundances:** Natural abundances, half-lives, decay modes, and stability flags.
- **Common Ions:** Electron configurations, charges, and step-by-step chemical explanations of why each ion forms.
- **Real-World Compounds & Applications:** Everyday and industrial compounds (with bond types), human biological roles, historical discovery context, etymology, and GHS laboratory hazard classifications.
- **"Understand This Element" Pedagogical Section:** Plain-English explanations tailored for students connecting atomic structure to chemical behavior.

---

### 2. Interactive Periodic Table Grid
- **Conventional 18-Column Layout:** Period 1–7 structure with properly positioned Lanthanide (57–71) and Actinide (89–103) series rows.
- **Keyboard Navigation:** Full accessibility via arrow keys (`←`, `→`, `↑`, `↓`) with automatic period transitions and column alignment.
- **Instant Search & Multi-Attribute Filtering:** Real-time search by name, symbol, or atomic number. Filter simultaneously by:
  - Chemical Category (Alkali, Alkaline Earth, Transition, Post-Transition, Metalloid, Reactive Nonmetal, Noble Gas, Lanthanide, Actinide)
  - Phase at STP (Solid, Liquid, Gas)
  - Subshell Block ($s$, $p$, $d$, $f$)
  - Radioactivity & Origin (Natural vs. Synthetic)
- **Interactive Legend:** Hover and click filtering by element category with high-contrast, accessible color coding.

---

### 3. Interactive 3D Bohr Atom Visualization (Three.js WebGL)
- **Interactive Orbital Simulation:** Realistic concentric electron shells ($K, L, M, N, O, P, Q$) with revolving electrons at dynamically calculated orbital speeds.
- **Distinguishable Nucleus:** Clustered protons ($+$ red) and neutrons ($0$ blue) packed with a subtle energy glow.
- **Full View Controls:** 360° orbit rotation, mouse-wheel zooming, pan controls, camera orientation reset, and animation pause/play.
- **Ion Mode Simulator:** Toggle between the neutral atom and common ions (e.g., $\text{Na} \leftrightarrow \text{Na}^+$, $\text{Cl} \leftrightarrow \text{Cl}^-$) to watch outer electrons get removed or added in real time.
- **Reduced Motion & Accessibility:** Honors `prefers-reduced-motion` operating system settings automatically.
- **Robust 2D Canvas Fallback:** One-click toggle and automated fallback to an interactive high-DPI 2D HTML5 canvas for environments without WebGL hardware acceleration.
- **Scientific Caveat Callout:** Explicitly educates students on the historical Bohr model vs. modern quantum mechanical wave orbitals.

---

### 4. Quantum Orbital Energy Diagram
- **Aufbau & Electron Spin Display:** Visual energy boxes for all subshells ($1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, \dots$).
- **Spin Arrow Notation:** Visualizes paired ($\uparrow\downarrow$) and unpaired ($\uparrow$) electrons in degenerate orbitals.
- **Educational Quantum Principles:** Callout cards explaining:
  - **Aufbau Principle:** Minimum-energy subshell filling order.
  - **Pauli Exclusion Principle:** No two electrons share the same four quantum numbers.
  - **Hund's Rule:** Degenerate orbitals singly occupied with parallel spins before pairing up.
  - **Anomalous Configurations:** Identifies stability exceptions (e.g., $\text{Cr}$ $[3d^5 4s^1]$, $\text{Cu}$ $[3d^{10} 4s^1]$).

---

### 5. Periodic Trends Heatmap Explorer
- **Visualized Trends:**
  1. Atomic Radius ($\text{pm}$)
  2. First Ionization Energy ($\text{kJ/mol}$)
  3. Electronegativity (Pauling Scale)
  4. Electron Affinity ($\text{kJ/mol}$)
  5. Density ($\text{g/cm}^3$)
  6. Melting Point ($\text{K}$)
  7. Metallic Character
- **Dynamic Heatmap Tiles:** Directly renders normalized quantitative color gradients across all 118 tiles on the periodic table.
- **Educational Trend Guidelines & Exceptions:** Explains general periodic directions (e.g., effective nuclear charge, atomic size shielding) and details notable exceptions (such as half-filled shell stability in $\text{N}$ vs $\text{O}$, or lanthanide contraction).

---

### 6. Side-by-Side Element Comparison Tool
- Compare any two chemical elements side by side.
- Visual delta indicators highlighting higher/lower values for atomic mass, period, group, density, melting/boiling points, electronegativity, ionization energy, and valence electrons.
- Pre-set comparisons (e.g., Hydrogen vs Helium, Sodium vs Chlorine, Carbon vs Silicon).

---

### 7. Interactive Chemistry Quiz
- **Multiple Question Categories:** Atomic numbers, chemical symbols, valence electrons, electron configurations, periodic trends, and true/false properties.
- **Configurable Difficulty:** High School and University educational levels.
- **Instant Explanations:** Educational rationale displayed immediately following each answer.
- **Deterministic & Replayable:** Seeded random generator guarantees deterministic test runs for classroom assignments.
- **Celebration Confetti:** Score tracking with victory confetti upon completion.

---

### 8. Accessibility, Internationalization & Customization
- **Educational Level Selector:** High School, University, and Quick Reference modes adjust the complexity of displayed properties.
- **Temperature Unit Conversion:** Switch between Kelvin ($\text{K}$), Celsius ($^\circ\text{C}$), and Fahrenheit ($^\circ\text{F}$) dynamically.
- **Dark & Light Mode:** Tailored modern themes with persistent user preferences in `localStorage`.
- **URL Deep Linking:** Direct linkable URLs for every element (e.g., `/elements/O`, `/elements/Au`, `/elements/26`).
- **i18n Ready:** Structured translation keys with English and Indonesian support.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Core Framework** | React 19, TypeScript |
| **Styling & Design** | Tailwind CSS v4, Lucide React icons |
| **3D Graphics** | Three.js (WebGL renderer, OrbitControls) |
| **Build Tooling** | Vite 8, Rolldown engine with optimized chunk splitting |
| **Testing** | Vitest, Testing Library, jsdom |
| **Linting & Quality** | Oxlint (0 warnings, 0 errors) |

---

## 📂 Project Architecture

```
src/
├── types/
│   └── element.ts                # TypeScript interfaces for elements, properties, trends, and quiz
├── data/
│   ├── elements/
│   │   ├── helper.ts             # Element builder with default fallback values
│   │   ├── period1.ts ... period7.ts # Full 118 element records
│   │   ├── index.ts              # Aggregator, lookup maps, and search/filter engine
│   │   └── elements.test.ts      # Vitest suite verifying all 118 elements
│   ├── trends.ts                 # Trend definitions, heatmaps, and exception notes
│   ├── trends.test.ts            # Unit tests for periodic trends
│   ├── quizQuestions.ts          # Deterministic quiz question bank and generator
│   └── quizQuestions.test.ts     # Unit tests for quiz generator and determinism
├── components/
│   ├── Atom3D/
│   │   └── Atom3D.tsx            # Three.js 3D Bohr model & 2D canvas fallback
│   ├── OrbitalDiagram/
│   │   └── OrbitalDiagram.tsx    # Quantum orbital diagram with electron spin arrows
│   ├── PeriodicTable/
│   │   ├── ElementTile.tsx       # Individual periodic grid cell with heatmap support
│   │   ├── PeriodicTable.tsx     # 18-column grid layout, navigation, and legend
│   │   └── PeriodicTable.test.ts # Grid position and temperature conversion tests
│   ├── ElementDetails/
│   │   └── ElementDetails.tsx    # Comprehensive scientific element inspector panel
│   ├── TrendVisualization/
│   │   └── TrendVisualization.tsx# Trends explorer with full-table heatmap integration
│   ├── CompareElements/
│   │   └── CompareElements.tsx   # Side-by-side comparative inspection tool
│   ├── Quiz/
│   │   └── QuizMode.tsx          # Educational chemistry quiz with feedback
│   ├── Header/
│   │   └── Header.tsx            # Search, filter drawer, tab navigation, theme, & help
│   └── HelpModal/
│       └── HelpModal.tsx         # Educational guide and scientific accuracy reference
├── utils/
│   ├── grid.ts                   # Grid coordinate calculations for elements
│   ├── temperature.ts            # Kelvin / Celsius / Fahrenheit conversions
│   ├── url.ts                    # Path parsing and deep link resolution
│   └── i18n.ts                   # Internationalization helper
└── App.tsx                       # Main application shell and tab coordination
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js `v20.0.0` or higher
- npm `v10.0.0` or higher

### Installation
```bash
# Clone or enter repository
cd periodic-table

# Install dependencies
npm install
```

### Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Run Tests
```bash
# Run all Vitest suites
npx vitest run

# Run in watch mode
npm test
```

### Production Build
```bash
# Type-check and build optimized bundle
npm run build

# Preview production build locally
npm run preview
```

### Linting
```bash
npx oxlint src/
```

---

## 🔬 Scientific Limitations & Accuracy Note

### Bohr Model vs. Quantum Mechanics
In standard high-school chemistry pedagogy, the **Bohr planetary model** (concentric circular shells labeled $K, L, M, N\dots$) is taught first because it provides an intuitive visual bridge to valence electrons, octet stability, and basic periodic groups.

However, in modern **quantum mechanics**:
- Electrons do not travel in deterministic circular orbits.
- Electrons exist in **three-dimensional probability wave distributions (atomic orbitals: $s, p, d, f$)** dictated by the Schrödinger wave equation:
  $$\hat{H}\psi = E\psi$$
- The position and momentum of an electron cannot be simultaneously determined with arbitrary precision, as governed by the **Heisenberg Uncertainty Principle**:
  $$\Delta x \cdot \Delta p \ge \frac{\hbar}{2}$$

This application presents both the **interactive 3D Bohr model** for valence electron visualization and the **Quantum Orbital Energy Diagram** with Pauli/Hund spin arrows, ensuring students understand both models and their appropriate contexts.

---

## 📚 Data Sources & Standards
- **IUPAC:** International Union of Pure and Applied Chemistry (Periodic Table of Elements 2024 Release).
- **NIST:** National Institute of Standards and Technology Physical Measurement Laboratory.
- **PubChem:** National Center for Biotechnology Information (NCBI) Compound & Element Database.
- **WebElements:** Periodic Table reference data for thermodynamic and physical constants.

---

## 📄 License
MIT License. Created for chemistry students, educators, and science enthusiasts worldwide.
