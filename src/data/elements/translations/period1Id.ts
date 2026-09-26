import type { ElementTranslationId } from './types';

export const period1TranslationsId: Record<number, ElementTranslationId> = {
  // 1: Hidrogen (H)
  1: {
    appearance: 'Gas tidak berwarna, tidak berbau, dan tidak berasa',
    understanding: {
      simpleTerms: 'Unsur kimia paling sederhana, paling ringan, dan paling melimpah di alam semesta, mencakup sekitar 75% dari seluruh massa barionik.',
      whyItBehavesThisWay: 'Dengan satu proton dan satu elektron pada orbital 1s, hidrogen dapat berbagi elektron untuk melengkapi kestabilan duet, melepaskan elektronnya menjadi proton bebas (H⁺), atau menangkap satu elektron membentuk hidrida (H⁻).',
      keyTakeaways: [
        'Nomor atom 1 dengan 1 proton dan pada umumnya 0 neutron (protium).',
        'Kerapatan energi per satuan massa tertinggi di antara semua bahan bakar kimiawi umum.',
        'Membentuk ikatan hidrogen, yang memberikan air sifat khas yang menopang kehidupan.',
        'Ditempatkan pada Golongan 1 karena konfigurasi 1s¹, namun secara kimiawi berperilaku sebagai nonlogam reaktif.',
      ],
    },
    applications: [
      'Bahan bakar sel bahan bakar energi bersih dan propelan roket nir-emisi.',
      'Sintesis amonia industri (proses Haber-Bosch) untuk produksi pupuk pertanian.',
      'Proses perlakuan hidrogen (hidrotreating) dan perengkahan (hidrocracking) dalam pemurnian minyak bumi.',
      'Hidrogenasi minyak nabati tak jenuh dalam industri pengolahan pangan.',
    ],
    biologicalRole: {
      humanImportance: 'Penyusun utama molekul air (60%+ berat tubuh manusia), DNA, enzim, karbohidrat, dan lipid. Gradien ion hidrogen menggerakkan sintesis energi seluler ATP.',
      dietarySources: ['Air minum', 'Seluruh karbohidrat, protein, dan lemak makanan'],
    },
    safety: {
      handlingConcerns: 'Jauhkan dari percikan api, nyala terbuka, dan panas. Simpan dalam tabung bertekanan tinggi yang terstandarisasi.',
    },
    discovery: {
      discoverer: 'Henry Cavendish',
      etymology: 'Dari bahasa Yunani "hydro" (air) dan "genes" (penghasil), dinamai oleh Antoine Lavoisier pada tahun 1783.',
    },
    commonIons: {
      'H⁺': 'Pelepasan elektron tunggalnya; dalam larutan air hadir sebagai ion hidronium (H₃O⁺) yang mendefinisikan derajat keasaman (pH).',
      'H⁻': 'Ion hidrida terbentuk ketika hidrogen menangkap elektron dari logam alkali atau alkali tanah yang sangat elektropositif.',
    },
    compounds: {
      'H₂O': { name: 'Air', description: 'Pelarut universal dan landasan utama seluruh sistem biologi di Bumi.' },
      'NH₃': { name: 'Amonia', description: 'Bahan baku primer untuk pupuk nitrogen di seluruh dunia.' },
      'CH₄': { name: 'Metana', description: 'Hidrokarbon paling sederhana dan komponen utama bahan bakar gas alam.' },
      'HCl': { name: 'Asam Klorida', description: 'Asam mineral kuat yang terdapat dalam asam lambung manusia dan digunakan luas dalam metalurgi.' },
    },
  },

  // 2: Helium (He)
  2: {
    appearance: 'Gas mulia lembam tidak berwarna, tidak berbau, dan tidak berasa; memancarkan pendar persik-violet dalam tabung lucutan',
    understanding: {
      simpleTerms: 'Unsur teringan kedua dan paling melimpah kedua di kosmos, terkenal untuk mengangkat balon dan mendinginkan magnet superkonduktor.',
      whyItBehavesThisWay: 'Kulit elektron 1s terisi penuh oleh sepasang elektron (duet stabil). Hal ini memberikan stabilitas luar biasa tanpa kecenderungan melepas, menangkap, atau berbagi elektron pada kondisi standar.',
      keyTakeaways: [
        'Satu-satunya unsur yang tidak dapat membeku pada tekanan standar bahkan pada titik nol mutlak (memerlukan tekanan minimal 25 atm).',
        'Menjadi superfluida (He-II) di bawah 2,17 K dengan viskositas nol dan konduktivitas termal tak terhingga.',
        'Diekstraksi secara komersial dari deposit gas alam bawah tanah tempat akumulasi peluruhan radioaktif alfa.',
        'Sumber daya tak terbarukan yang sangat krusial untuk mesin pemindai MRI dan kriogenik komputasi kuantum.',
      ],
    },
    applications: [
      'Pendingin kriogenik untuk magnet superkonduktor pada pemindai MRI dan spektrometer NMR.',
      'Gas pelindung lembam pada pengelasan busur listrik dan fabrikasi wafer semikonduktor.',
      'Komponen gas pernapasan (heliox/trimix) untuk penyelaman komersial dalam laut dalam guna mencegah narkosis nitrogen.',
      'Gas pengangkat untuk balon cuaca stratosfer dan kapal udara.',
    ],
    biologicalRole: {
      humanImportance: 'Lembam secara biologis tanpa peran metabolik. Digunakan dalam campuran pernapasan medis untuk mengurangi hambatan saluran napas pada pasien asma berat.',
      dietarySources: ['Tidak terdapat dalam makanan; unsur gas mulia lembam'],
    },
    safety: {
      handlingConcerns: 'Tidak beracun, tetapi menghirup helium murni dapat menyebabkan kehilangan kesadaran mendadak dan kematian akibat asfiksia kekurangan oksigen.',
    },
    discovery: {
      discoverer: 'Pierre Janssen & Norman Lockyer',
      etymology: 'Dari bahasa Yunani "Helios" yang berarti Dewa Matahari, pertama kali dideteksi sebagai garis serapan kuning spektral cahaya matahari pada gerhana 1868.',
    },
    commonIons: {},
    compounds: {},
  },
};
