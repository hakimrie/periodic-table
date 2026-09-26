import { allElements, getElementById } from './elements/index';
import type { ChemicalElement } from '../types/element';
import { getLocalizedElementName } from './elements/translations';

export interface QuizQuestion {
  id: string;
  category: 'atomic-number' | 'symbol-name' | 'electron-config' | 'valence' | 'period-group' | 'trends' | 'true-false';
  difficulty: 'high-school' | 'university';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  relatedElementId?: number;
}

// Deterministic pseudo-random number generator
function pseudoRandom(seed: number): () => number {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function shuffleWithRng<T>(array: T[], rng: () => number): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function generateQuizQuestions(
  count: number = 10,
  seed: number = Date.now(),
  difficulty: 'all' | 'high-school' | 'university' = 'all',
  lang: 'en' | 'id' = 'en'
): QuizQuestion[] {
  const rng = pseudoRandom(seed);
  const questions: QuizQuestion[] = [];
  const isId = lang === 'id';

  const getName = (el: ChemicalElement) =>
    isId ? getLocalizedElementName(el.atomicNumber, 'id') || el.name : el.name;

  // Pool of common high school elements (1-36 + prominent heavier elements)
  const highSchoolPool = allElements.filter((el) => el.atomicNumber <= 36 || [47, 79, 80, 82, 92].includes(el.atomicNumber));
  const fullPool = allElements;

  // 1. Atomic Number questions
  for (let i = 0; i < 3; i++) {
    const target = highSchoolPool[Math.floor(rng() * highSchoolPool.length)];
    const distractors: ChemicalElement[] = [];
    while (distractors.length < 3) {
      const candidate = highSchoolPool[Math.floor(rng() * highSchoolPool.length)];
      if (candidate.atomicNumber !== target.atomicNumber && !distractors.some((d) => d.atomicNumber === candidate.atomicNumber)) {
        distractors.push(candidate);
      }
    }
    const choices = shuffleWithRng([target, ...distractors], rng);
    const correctIndex = choices.findIndex((c) => c.atomicNumber === target.atomicNumber);
    const targetName = getName(target);

    questions.push({
      id: `atomic-num-${target.atomicNumber}-${i}`,
      category: 'atomic-number',
      difficulty: 'high-school',
      question: isId
        ? `Unsur kimia manakah yang memiliki nomor atom ${target.atomicNumber}?`
        : `Which chemical element has the atomic number ${target.atomicNumber}?`,
      options: choices.map((c) => `${getName(c)} (${c.symbol})`),
      correctIndex,
      explanation: isId
        ? `${targetName} (${target.symbol}) memiliki ${target.atomicNumber} proton di dalam inti atomnya, yang mendefinisikan nomor atomnya sebagai ${target.atomicNumber}.`
        : `${target.name} (${target.symbol}) has ${target.atomicNumber} protons in its nucleus, defining its atomic number as ${target.atomicNumber}.`,
      relatedElementId: target.atomicNumber,
    });
  }

  // 2. Electron Configuration questions
  for (let i = 0; i < 3; i++) {
    const pool = difficulty === 'university' ? fullPool.slice(0, 54) : highSchoolPool.slice(0, 20);
    const target = pool[Math.floor(rng() * pool.length)];
    const distractors: ChemicalElement[] = [];
    while (distractors.length < 3) {
      const candidate = pool[Math.floor(rng() * pool.length)];
      if (candidate.atomicNumber !== target.atomicNumber && !distractors.some((d) => d.atomicNumber === candidate.atomicNumber)) {
        distractors.push(candidate);
      }
    }
    const choices = shuffleWithRng([target, ...distractors], rng);
    const correctIndex = choices.findIndex((c) => c.atomicNumber === target.atomicNumber);
    const targetName = getName(target);

    questions.push({
      id: `config-${target.atomicNumber}-${i}`,
      category: 'electron-config',
      difficulty: target.atomicNumber > 20 ? 'university' : 'high-school',
      question: isId
        ? `Unsur manakah yang memiliki konfigurasi elektron ringkas ${target.electronConfiguration.shorthand}?`
        : `Which element has the condensed electron configuration ${target.electronConfiguration.shorthand}?`,
      options: choices.map((c) => `${getName(c)} (${c.symbol})`),
      correctIndex,
      explanation: isId
        ? `${targetName} (${target.symbol}, Z = ${target.atomicNumber}) memiliki konfigurasi elektron ${target.electronConfiguration.full}, disingkat menjadi ${target.electronConfiguration.shorthand}.`
        : `${target.name} (${target.symbol}, Z = ${target.atomicNumber}) has electron configuration ${target.electronConfiguration.full}, condensed as ${target.electronConfiguration.shorthand}.`,
      relatedElementId: target.atomicNumber,
    });
  }

  // 3. Valence electrons questions
  for (let i = 0; i < 2; i++) {
    const mainGroupElements = highSchoolPool.filter((el) => el.group !== null && [1, 2, 13, 14, 15, 16, 17, 18].includes(el.group));
    const target = mainGroupElements[Math.floor(rng() * mainGroupElements.length)];
    const correctVal = target.electronConfiguration.valenceElectrons;
    const allPossible = [1, 2, 3, 4, 5, 6, 7, 8].filter((v) => v !== correctVal);
    const chosenDistractors = shuffleWithRng(allPossible, rng).slice(0, 3);
    const options = shuffleWithRng([correctVal.toString(), ...chosenDistractors.map(String)], rng);
    const correctIndex = options.indexOf(correctVal.toString());
    const targetName = getName(target);

    questions.push({
      id: `valence-${target.atomicNumber}-${i}`,
      category: 'valence',
      difficulty: 'high-school',
      question: isId
        ? `Berapa jumlah elektron valensi yang dimiliki oleh atom netral ${targetName} (${target.symbol})?`
        : `How many valence electrons does a neutral ${target.name} (${target.symbol}) atom have?`,
      options,
      correctIndex,
      explanation: isId
        ? `${targetName} terletak pada Golongan ${target.group} (Periode ${target.period}) dan memiliki ${correctVal} elektron valensi pada kulit ke-${target.electronConfiguration.valenceShellNumber}.`
        : `${target.name} is in Group ${target.group} (Period ${target.period}) and has ${correctVal} valence electron${correctVal > 1 ? 's' : ''} in shell ${target.electronConfiguration.valenceShellNumber}.`,
      relatedElementId: target.atomicNumber,
    });
  }

  // 4. Period and Group questions
  const nobleGasP3 = getElementById('Ar')!;
  questions.push({
    id: 'period-group-ar',
    category: 'period-group',
    difficulty: 'high-school',
    question: isId
      ? 'Unsur kimia manakah yang merupakan gas mulia yang terletak pada Periode 3 tabel periodik?'
      : 'Which chemical element is a noble gas located in Period 3 of the periodic table?',
    options: isId
      ? ['Neon (Ne)', 'Argon (Ar)', 'Kripton (Kr)', 'Helium (He)']
      : ['Neon (Ne)', 'Argon (Ar)', 'Krypton (Kr)', 'Helium (He)'],
    correctIndex: 1,
    explanation: isId
      ? 'Argon (Ar, nomor atom 18) adalah gas mulia yang terletak pada Periode 3 dan Golongan 18, dengan konfigurasi elektron [Ne] 3s² 3p⁶.'
      : 'Argon (Ar, atomic number 18) is the noble gas located in Period 3 and Group 18, with electron configuration [Ne] 3s² 3p⁶.',
    relatedElementId: nobleGasP3.atomicNumber,
  });

  const alkaliP4 = getElementById('K')!;
  questions.push({
    id: 'period-group-k',
    category: 'period-group',
    difficulty: 'high-school',
    question: isId
      ? 'Logam alkali manakah yang terletak pada Periode 4 tabel periodik?'
      : 'Which alkali metal is situated in Period 4 of the periodic table?',
    options: isId
      ? ['Natrium (Na)', 'Kalium (K)', 'Rubidium (Rb)', 'Kalsium (Ca)']
      : ['Sodium (Na)', 'Potassium (K)', 'Rubidium (Rb)', 'Calcium (Ca)'],
    correctIndex: 1,
    explanation: isId
      ? 'Kalium (K, nomor atom 19) adalah logam alkali pada Periode 4 dan Golongan 1, dengan konfigurasi elektron [Ar] 4s¹.'
      : 'Potassium (K, atomic number 19) is the alkali metal in Period 4 and Group 1, with configuration [Ar] 4s¹.',
    relatedElementId: alkaliP4.atomicNumber,
  });

  // 5. Periodic Trends questions
  questions.push({
    id: 'trend-radius-na-cl',
    category: 'trends',
    difficulty: 'high-school',
    question: isId
      ? 'Di antara unsur-unsur berikut, manakah yang memiliki jari-jari atom LEBIH BESAR?'
      : 'Which of the following elements has the LARGER atomic radius?',
    options: isId
      ? ['Natrium (Na)', 'Klorin (Cl)', 'Keduanya identik', 'Argon (Ar)']
      : ['Sodium (Na)', 'Chlorine (Cl)', 'Both are identical', 'Argon (Ar)'],
    correctIndex: 0,
    explanation: isId
      ? 'Natrium (Na, 186 pm) memiliki jari-jari atom yang jauh lebih besar daripada Klorin (Cl, 79 pm) karena melintasi satu periode dari kiri ke kanan meningkatkan muatan inti efektif, sehingga menarik elektron valensi lebih dekat ke inti.'
      : 'Sodium (Na, 186 pm) has a significantly larger atomic radius than Chlorine (Cl, 79 pm) because moving across a period increases nuclear charge, drawing valence electrons closer to the nucleus.',
    relatedElementId: 11,
  });

  questions.push({
    id: 'trend-electronegativity-f',
    category: 'trends',
    difficulty: 'high-school',
    question: isId
      ? 'Unsur manakah yang memiliki nilai elektronegativitas TERTINGGI pada skala Pauling?'
      : 'Which element possesses the HIGHEST electronegativity on the Pauling scale?',
    options: isId
      ? ['Oksigen (O)', 'Klorin (Cl)', 'Fluorin (F)', 'Fransium (Fr)']
      : ['Oxygen (O)', 'Chlorine (Cl)', 'Fluorine (F)', 'Francium (Fr)'],
    correctIndex: 2,
    explanation: isId
      ? 'Fluorin (F) memiliki elektronegativitas tertinggi dari semua unsur (3,98 pada skala Pauling) karena jari-jari atomnya yang sangat kecil dan tarikan inti yang kuat terhadap elektron ikatan.'
      : 'Fluorine (F) has the highest electronegativity of any element (3.98 on the Pauling scale) due to its small atomic radius and strong nuclear attraction for bonding electrons.',
    relatedElementId: 9,
  });

  questions.push({
    id: 'trend-ionization-n-o',
    category: 'trends',
    difficulty: 'university',
    question: isId
      ? 'Mengapa Nitrogen (N) memiliki energi ionisasi pertama yang lebih tinggi daripada Oksigen (O), berlawanan dengan tren umum periode?'
      : 'Why does Nitrogen (N) have a higher first ionization energy than Oxygen (O), contrary to the general period trend?',
    options: isId
      ? [
          'Nitrogen memiliki subkulit 2p³ setengah penuh dengan stabilitas energi pertukaran kuantum khusus',
          'Oksigen memiliki lebih sedikit proton di intinya daripada nitrogen',
          'Nitrogen berada pada periode yang lebih tinggi daripada oksigen',
          'Oksigen memiliki subkulit 2p yang kosong',
        ]
      : [
          'Nitrogen has a half-filled 2p³ subshell with special exchange energy stability',
          'Oxygen has fewer protons in its nucleus than nitrogen',
          'Nitrogen is in a higher period than oxygen',
          'Oxygen has an empty 2p subshell',
        ],
    correctIndex: 0,
    explanation: isId
      ? 'Nitrogen ([He] 2s² 2p³) memiliki subkulit 2p setengah penuh yang stabil di mana setiap elektron menempati orbitalnya sendiri. Oksigen ([He] 2s² 2p⁴) memiliki sepasang elektron pada salah satu orbital 2p yang tolakan timbal-baliknya membuat elektron tersebut lebih mudah dilepaskan.'
      : 'Nitrogen ([He] 2s² 2p³) has a stable half-filled 2p subshell where each electron occupies its own orbital. Oxygen ([He] 2s² 2p⁴) has a paired electron in one 2p orbital whose mutual repulsion makes it easier to remove.',
    relatedElementId: 7,
  });

  questions.push({
    id: 'trend-aufbau-cr-cu',
    category: 'trends',
    difficulty: 'university',
    question: isId
      ? 'Manakah konfigurasi elektron tingkat dasar (ground-state) yang benar untuk Kromium (Cr, Z = 24)?'
      : 'What is the ground-state electron configuration of Chromium (Cr, Z = 24)?',
    options: ['[Ar] 3d⁴ 4s²', '[Ar] 3d⁵ 4s¹', '[Ar] 3d⁶ 4s⁰', '[Ne] 3d⁵ 4s²'],
    correctIndex: 1,
    explanation: isId
      ? 'Kromium adalah pengecualian Aufbau klasik: mengadopsi [Ar] 3d⁵ 4s¹ alih-alih [Ar] 3d⁴ 4s² karena subkulit 3d⁵ dan 4s¹ yang setengah penuh memaksimalkan stabilitas energi pertukaran kuantum dan menurunkan tolakan antar-elektron.'
      : 'Chromium is a classic Aufbau exception: it adopts [Ar] 3d⁵ 4s¹ rather than [Ar] 3d⁴ 4s² because half-filled 3d⁵ and 4s¹ subshells maximize quantum exchange energy and lower electron-electron repulsion.',
    relatedElementId: 24,
  });

  // 6. True / False questions
  questions.push({
    id: 'tf-mercury-bromine',
    category: 'true-false',
    difficulty: 'high-school',
    question: isId
      ? 'Benar atau Salah: Raksa (Hg) dan Bromin (Br) adalah dua satu-satunya unsur kimia yang berwujud cair pada suhu dan tekanan kamar standar.'
      : 'True or False: Mercury (Hg) and Bromine (Br) are the only two chemical elements that are liquids at standard room temperature and pressure.',
    options: isId ? ['Benar', 'Salah'] : ['True', 'False'],
    correctIndex: 0,
    explanation: isId
      ? 'Benar! Pada suhu kamar standar (25 °C) dan 1 atmosfer, Raksa adalah satu-satunya logam cair, dan Bromin adalah satu-satunya nonlogam cair. (Galium, sesium, dan rubidium meleleh sedikit di atas suhu kamar).'
      : 'True! At standard room temperature (25 °C) and 1 atmosphere, Mercury is the only liquid metal, and Bromine is the only liquid nonmetal. (Gallium, cesium, and rubidium melt just above room temperature).',
    relatedElementId: 80,
  });

  questions.push({
    id: 'tf-bohr-orbitals',
    category: 'true-false',
    difficulty: 'high-school',
    question: isId
      ? 'Benar atau Salah: Dalam mekanika kuantum nyata, elektron beredar di sepanjang lintasan lingkaran kaku seperti rel planet mengitari inti atom.'
      : 'True or False: In real quantum mechanics, electrons travel along fixed circular railway-like planetary tracks around the nucleus.',
    options: isId ? ['Benar', 'Salah'] : ['True', 'False'],
    correctIndex: 1,
    explanation: isId
      ? 'Salah! Model orbit planet Bohr adalah model pembelajaran historis yang disederhanakan. Mekanika kuantum modern menjelaskan elektron sebagai awan kerapatan probabilitas 3 dimensi (orbital: s, p, d, f) yang dijelaskan oleh persamaan gelombang Schrödinger dan prinsip ketidakpastian Heisenberg.'
      : 'False! The Bohr planetary orbit model is a simplified historical teaching model. Modern quantum mechanics describes electrons as three-dimensional probability density clouds (atomic orbitals: s, p, d, f) dictated by the Schrödinger wave equation and Heisenberg uncertainty principle.',
    relatedElementId: 1,
  });

  // Filter by requested difficulty if applicable
  const filtered = difficulty === 'all'
    ? questions
    : questions.filter((q) => q.difficulty === difficulty);

  // Return shuffled subset of requested count
  return shuffleWithRng(filtered, rng).slice(0, count);
}
