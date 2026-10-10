import type { TranslationBundle } from '../../utils/i18n';

const bundle: TranslationBundle = {
  en: {
    lenses: {
      title: 'Interactive Lenses',
      modes: {
        category: 'Categories',
        temperature: 'State of Matter @ Temp',
        discovery: 'Discovery Timeline',
        block: 'Electron Blocks',
        origin: 'Origin & Radioactivity',
        trend: 'Trends Heatmap',
      },
      temp: {
        sliderLabel: 'Simulation Temperature',
        solid: 'Solid',
        liquid: 'Liquid',
        gas: 'Gas',
        unknown: 'Predicted / Unknown',
        play: 'Play temperature sweep',
        pause: 'Pause temperature sweep',
        presets: 'Presets',
        liveSummary: '{solid} solids · {liquid} liquids · {gas} gases',
      },
      discovery: {
        sliderLabel: 'Discovery Year',
        play: 'Play historical timeline',
        pause: 'Pause timeline',
        ancient: 'Ancient',
        knownCount: '{count} of 118 elements discovered',
        latestTitle: 'Latest discovered at this era:',
      },
      block: {
        s: 's-block (alkali & alkaline earths)',
        p: 'p-block (main group nonmetals, halogens, metalloids)',
        d: 'd-block (transition metals)',
        f: 'f-block (lanthanides & actinides)',
      },
      origin: {
        natural: 'Primordial / Natural (90)',
        synthetic: 'Synthetic / Collider (24)',
        radioactive: 'Radioactive elements (38)',
        stable: 'Stable elements (80)',
      },
    },
  },
  id: {
    lenses: {
      title: 'Lensa Interaktif',
      modes: {
        category: 'Kategori',
        temperature: 'Wujud Zat @ Suhu',
        discovery: 'Garis Waktu Penemuan',
        block: 'Blok Elektron',
        origin: 'Asal & Radioaktivitas',
        trend: 'Peta Panas Tren',
      },
      temp: {
        sliderLabel: 'Suhu Simulasi',
        solid: 'Padat',
        liquid: 'Cair',
        gas: 'Gas',
        unknown: 'Prediksi / Belum Diketahui',
        play: 'Putar sapuan suhu',
        pause: 'Jeda sapuan suhu',
        presets: 'Titik Acuan',
        liveSummary: '{solid} padat · {liquid} cair · {gas} gas',
      },
      discovery: {
        sliderLabel: 'Tahun Penemuan',
        play: 'Putar garis waktu sejarah',
        pause: 'Jeda garis waktu',
        ancient: 'Zaman Kuno',
        knownCount: '{count} dari 118 unsur ditemukan',
        latestTitle: 'Unsur terbaru yang ditemukan pada era ini:',
      },
      block: {
        s: 'blok-s (alkali & alkali tanah)',
        p: 'blok-p (nonlogam golongan utama, halogen, metaloid)',
        d: 'blok-d (logam transisi)',
        f: 'blok-f (lantanida & aktinida)',
      },
      origin: {
        natural: 'Alami / Primordial (90)',
        synthetic: 'Sintetis / Akselerator (24)',
        radioactive: 'Unsur radioaktif (38)',
        stable: 'Unsur stabil (80)',
      },
    },
  },
};

export default bundle;
