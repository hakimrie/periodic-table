import type { ElementTranslationId } from './types';

export const period7TranslationsId: Record<number, ElementTranslationId> = {
  // 87: Fransium (Fr)
  87: {
    appearance: 'Logam alkali radioaktif cair/padat yang sangat langka dan tidak stabil; seluruh kerak Bumi hanya mengandung sekitar 20–30 gram',
    understanding: {
      simpleTerms: 'Unsur alami paling langka kedua di Bumi; logam alkali radioaktif yang meluruh begitu cepat hingga tidak pernah dapat dilihat dengan mata telanjang.',
      whyItBehavesThisWay: 'Dengan 1 elektron valensi pada kulit 7s ([Rn] 7s¹), fransium sangat reaktif, namun waktu paruh isotop terpanjangnya (²²³Fr) hanya 22 menit sebelum meluruh.',
      keyTakeaways: [
        'Pada satu waktu tertentu, seluruh kerak planet Bumi hanya mengandung sekitar 20 hingga 30 gram fransium alami.',
        'Waktu paruh isotop paling stabilnya (Fransium-223) hanya 22 menit.',
        'Tidak pernah ada sampel fransium berukuran kasat mata yang pernah dikumpulkan atau dilihat oleh mata manusia.',
        'Diproduksi secara buatan di laboratorium fisika atom dengan menembakkan ion emas dengan sinar oksigen dalam perangkap magneto-optik.',
      ],
    },
    applications: [
      'Riset fisika atom dasar spektroskopi struktur kuantum dan interaksi gaya nuklir lemah (pelanggaran paritas).',
    ],
    biologicalRole: {
      humanImportance: 'Tidak ada peran biologis; radioaktif mematikan dan jumlahnya di alam semesta sangat kecil.',
      dietarySources: ['Tidak terdapat dalam makanan'],
    },
    safety: {
      handlingConcerns: 'Sangat radioaktif ekstrem dan memancarkan partikel radiasi pengion mematikan; hanya diteliti dalam jumlah atom terhitung di laboratorium akselerator.',
    },
    discovery: {
      discoverer: 'Marguerite Perey',
      etymology: 'Dinamai untuk menghormati negara Prancis (tanah air sang penemu di Institut Curie Paris).',
    },
    commonIons: {
      'Fr⁺': 'Kation fransium terberat yang berperilaku menyerupai ion sesium.',
    },
    compounds: {},
  },

  // 88: Radium (Ra)
  88: {
    appearance: 'Logam alkali tanah radioaktif putih keperakan murni; berpendar cahaya biru pucat di kegelapan akibat radiasi pengion',
    understanding: {
      simpleTerms: 'Unsur bercahaya biru magis Marie Curie yang dahulu menerangi jarum jam tangan malam sebelum bahaya radiasinya dipahami dunia.',
      whyItBehavesThisWay: 'Dengan konfigurasi [Rn] 7s², radium memiliki sifat kimia mirip barium, namun intinya sangat tidak stabil dan memancarkan partikel alfa berenergi sangat tinggi.',
      keyTakeaways: [
        'Ditemukan oleh fisikawan pemenang Hadiah Nobel Marie Curie dan suaminya Pierre Curie dari bijih pitchblende (1898).',
        'Menyala dengan pendaran biru pucat misterius di kegelapan akibat eksitasi udara oleh partikel radiasi alfa.',
        'Tragedi "Radium Girls" (gadis buruh pelukis jarum jam tangan malam yang menjilat kuas cat bercahaya) memicu hukum perlindungan keselamatan kerja modern.',
        'Mengendap di dalam jaringan tulang meniru kalsium, memicu kanker tulang osteosarkoma.',
      ],
    },
    applications: [
      'Pelat cat bercahaya mandiri (radiomarking) instrumen kokpit pesawat terbang militer dan arloji kuno (sekarang dilarang).',
      'Terapi radioterapi kanker tulang stadium akhir (Radium-223 diklorida / Xofigo) pemancar partikel alfa terarah.',
      'Sumber radiasi neutron laboratorium awal jika dicampur dengan bubuk berilium murni.',
    ],
    biologicalRole: {
      humanImportance: 'Radioaktif karsinogenik mematikan; diserap tubuh meniru kalsium masuk ke dalam matriks kristal tulang rangka.',
      dietarySources: ['Kontaminasi air tanah dekat formasi batuan granit'],
    },
    safety: {
      handlingConcerns: 'Karsinogenik radioaktif ekstrem. Meluruh melepaskan gas radioaktif radon-222 yang memicu kanker paru-paru.',
    },
    discovery: {
      discoverer: 'Marie Curie & Pierre Curie',
      etymology: 'Dari bahasa Latin "radius" yang berarti sinar radiasi pancaran, karena intensitas pancaran radiasi radioaktifnya yang dahsyat.',
    },
    commonIons: {
      'Ra²⁺': 'Kation radium stabil dengan sifat kimia persis meniru barium.',
    },
    compounds: {
      'RaCl₂': { name: 'Radium Klorida', description: 'Garam radium murni pertama yang diisolasi Marie Curie dan obat radiofarmaka penarget kanker tulang.' },
    },
  },

  // 92: Uranium (U)
  92: {
    appearance: 'Logam aktinida padat abu-abu keperakan yang sangat berat, bersifat radioaktif alami, dan piroforik dalam bentuk serbuk',
    understanding: {
      simpleTerms: 'Bahan bakar pembangkit listrik tenaga nuklir dan senjata atom terkuat; unsur alami terberat di seluruh tabel periodik.',
      whyItBehavesThisWay: 'Dengan nomor atom 92 dan konfigurasi [Rn] 5f³ 6d¹ 7s², Uranium-235 (²³⁵U) adalah satu-satunya isotop alami di Bumi yang dapat mengalami reaksi fisi berantai berkelanjutan.',
      keyTakeaways: [
        'Unsur alami nomor atom tertinggi (terberat) yang ditemukan dalam jumlah besar di kerak Bumi.',
        'Satu gram Uranium-235 yang mengalami pembelahan fisi nuklir melepaskan energi setara dengan membakar 3 ton batu bara hitam!',
        'Isotop utama: Uranium-238 (99,27% kelimpahan alam) dan Uranium-235 (0,72% isotop fisil untuk reaktor nuklir).',
        'Peluruhan radioaktif uranium di dalam perut Bumi adalah sumber panas utama yang menggerakkan lempeng tektonik dan gunung berapi.',
      ],
    },
    applications: [
      'Bahan bakar reaktor pembangkit listrik tenaga nuklir (PLTN) untuk menghasilkan listrik bebas karbon skala gigawatt.',
      'Bahan hulu ledak senjata nuklir fisi atom dan bom termonuklir hidrogen.',
      'Uranium terdeplesi (depleted uranium / DU) berdensitas tinggi untuk amunisi penusuk lapis baja dan perisai penahan radiasi sinar gamma.',
      'Pewarna kuning kehijauan berpendar ultraviolet pada kerajinan gelas vas antik (uranium glass).',
    ],
    biologicalRole: {
      humanImportance: 'Tidak ada peran biologis; merupakan racun kimiawi bagi ginjal (nefrotoksik) di samping bahaya radiasi pengionnya.',
      dietarySources: ['Konsentrasi renik alami dalam batuan fosfat'],
    },
    safety: {
      handlingConcerns: 'Bahan radioaktif terkontrol ketat internasional; bahaya toksisitas kimiawi logam berat pada ginjal sering kali melebihi risiko bahaya radiasi jangka pendek.',
    },
    discovery: {
      discoverer: 'Martin Heinrich Klaproth',
      etymology: 'Dinamai dari planet Uranus yang baru ditemukan oleh astronom William Herschel delapan tahun sebelumnya (1781).',
    },
    commonIons: {
      'UO₂²⁺': 'Kation uranil kuning terang yang sangat stabil dan mudah larut dalam air asam.',
      'U⁴⁺': 'Bentuk ionik uranium tereduksi berwarna hijau lumut.',
    },
    compounds: {
      'UO₂': { name: 'Uranium Dioksida', description: 'Pelet keramik hitam bahan bakar standar di dalam selongsong reaktor daya nuklir air bertekanan.' },
      'UF₆': { name: 'Uranium Heksafluorida', description: 'Gas volatil yang diputar dalam mesin sentrifugasi gas untuk proses pengayaan kadar isotop U-235.' },
      'U₃O₈': { name: 'Triuranium Oktaoksida (Yellowcake)', description: 'Konsentrat bubuk kuning bijih tambang uranium olahan sebelum diproses menjadi bahan bakar.' },
    },
  },

  // 94: Plutonium (Pu)
  94: {
    appearance: 'Logam aktinida radioaktif sintetis berwarna putih keperakan; terasa hangat saat disentuh akibat panas peluruhan radioaktif alaminya',
    understanding: {
      simpleTerms: 'Pelepas energi dahsyat bom atom dan baterai nuklir abadi yang memberi tenaga wahana Voyager di luar batas tata surya kita.',
      whyItBehavesThisWay: 'Memiliki struktur elektronik sangat rumit ([Rn] 5f⁶ 7s²) dengan 6 alotrop kristal padat yang memuai dan menyusut secara dramatis terhadap sedikit perubahan suhu.',
      keyTakeaways: [
        'Unsur sintetis buatan manusia yang diproduksi di reaktor nuklir dari penangkapan neutron oleh Uranium-238.',
        'Logamnya terasa hangat dan panas saat dipegang akibat pelepasan energi partikel alfa peluruhan radioaktif intens.',
        'Generator termoelektrik radioisotop Plutonium-238 (RTG) memberi tenaga listrik pesawat antariksa Voyager 1 dan robot penjelajah Mars Curiosity/Perseverance.',
        'Bahan fisil hulu ledak senjata nuklir strategis utama (Fat Man, Trinity, bom atom modern).',
      ],
    },
    applications: [
      'Baterai nuklir generator RTG (Plutonium-238) untuk wahana penjelajah antariksa luar angkasa dalam NASA yang tidak terjangkau sinar matahari.',
      'Hulu ledak senjata fisi nuklir berdaya ledak dahsyat (Plutonium-239).',
      'Bahan bakar campuran oksida MOX (Mixed Oxide Fuel) pada reaktor nuklir pembangkit listrik sipil.',
      'Baterai pemacu jantung jantung (pacemaker) buatan masa awal sebelum digantikan baterai litium.',
    ],
    biologicalRole: {
      humanImportance: 'Tidak ada fungsi biologis; sangat beracun dan karsinogenik ekstrem jika partikel debunya terhirup ke paru-paru.',
      dietarySources: ['Tidak terdapat dalam makanan; unsur radioaktif sintetis'],
    },
    safety: {
      handlingConcerns: 'Karsinogenik dan radiotoksik ekstrem. Menghirup bahkan partikel mikroskopis debu plutonium dapat memicu kanker paru fatal. Memiliki massa kritis yang dapat memicu kecelakaan kekritisan nuklir spontan.',
    },
    discovery: {
      discoverer: 'Glenn T. Seaborg, Edwin McMillan, Joseph Kennedy & Arthur Wahl',
      etymology: 'Dinamai dari planet kerdil Pluto, meneruskan tradisi penamaan berurutan setelah uranium (Uranus) dan neptunium (Neptunus).',
    },
    commonIons: {
      'Pu⁴⁺': 'Tingkat oksidasi plutonium yang paling stabil dalam larutan air asam.',
      'PuO₂²⁺': 'Ion plutonil dengan tingkat oksidasi +6.',
    },
    compounds: {
      'PuO₂': { name: 'Plutonium Dioksida', description: 'Bahan pelet keramik tahan panas baterai nuklir RTG antariksa dan bahan bakar MOX reaktor sipil.' },
    },
  },

  // 95: Amerisium (Am)
  95: {
    appearance: 'Logam aktinida sintetis radioaktif berwarna putih keperakan berkilau',
    understanding: {
      simpleTerms: 'Unsur radioaktif penyelamat nyawa di setiap langit-langit rumah: sensor pendeteksi asap kebakaran.',
      whyItBehavesThisWay: 'Konfigurasi [Rn] 5f⁷ 7s² memiliki subkulit 5f terisi setengah penuh yang memberikan stabilitas pada tingkat oksidasi +3 (Am³⁺).',
      keyTakeaways: [
        'Satu-satunya unsur sintetis buatan manusia yang dapat dibeli oleh masyarakat umum (di dalam detektor asap kebakaran rumah).',
        'Detektor asap ionisasi mengandung sekitar 0,29 mikrogram Amerisium-241 (²⁴¹Am).',
        'Partikel radiasi alfa dari amerisium mengionisasi molekul udara, dan ketika asap masuk, arus listrik terganggu sehingga membunyikan alarm penyelamat.',
        'Waktu paruh 432 tahun menjamin alarm asap bekerja andal selama puluhan tahun.',
      ],
    },
    applications: [
      'Sensor ionisasi pada detektor alarm asap kebakaran rumah tangga komersial.',
      'Pengukur ketebalan presisi non-kontak lembaran baja dan kertas di pabrik industri.',
      'Sumber radiasi neutron untuk eksplorasi penebangan sumur minyak bumi jika dicampur berilium.',
    ],
    biologicalRole: {
      humanImportance: 'Tidak ada fungsi biologis; radioaktif karsinogenik yang terakumulasi di tulang jika tertelan.',
      dietarySources: ['Tidak terdapat dalam makanan'],
    },
    safety: {
      handlingConcerns: 'Di dalam detektor asap komersial, amerisium disegel aman dalam kapsul emas foil; jangan pernah membongkar atau menelan inti detektor asap.',
    },
    discovery: {
      discoverer: 'Glenn T. Seaborg, Ralph James, Leon Morgan & Albert Ghiorso',
      etymology: 'Dinamai untuk menghormati benua Amerika, analog dengan homolog lantanidanya europium yang dinamai dari benua Eropa.',
    },
    commonIons: {
      'Am³⁺': 'Ion merah muda stabil dalam larutan asam.',
    },
    compounds: {
      'AmO₂': { name: 'Amerisium Dioksida', description: 'Senyawa oksida cokelat gelap yang disegel di dalam kamar ionisasi detektor asap kebakaran.' },
    },
  },

  // 118: Oganeson (Og) -> THE HEAVIEST ELEMENT!
  118: {
    appearance: 'Unsur gas mulia sintetis superberat terberat di tabel periodik; diprediksi berwujud padat pada suhu kamar akibat efek relativistik',
    understanding: {
      simpleTerms: 'Puncak tertinggi dan unsur paling berat di tabel periodik; gas mulia misterius yang diperkirakan justru berwujud padat.',
      whyItBehavesThisWay: 'Dengan 118 elektron ([Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁶), efek relativistik spin-orbit yang dahsyat membaurkan kulit elektron terluarnya menjadi awan muatan kontinu yang dapat terpolarisasi (bukan gas mulia klasik).',
      keyTakeaways: [
        'Unsur nomor atom tertinggi (Z = 118) yang menempati ujung kanan bawah tabel periodik modern.',
        'Hanya beberapa atom oganeson yang pernah berhasil diciptakan di laboratorium fisika nuklir Dubna di Rusia.',
        'Memiliki waktu paruh kurang dari satu milidetik (~0,7 milidetik) sebelum hancur meluruh.',
        'Meskipun berada di kolom Gas Mulia Golongan 18, perhitungan relativistik memprediksi oganeson adalah padatan semikonduktor pada suhu kamar.',
      ],
    },
    applications: [
      'Riset fisika nuklir terdepan untuk mengeksplorasi batas stabilitas materi inti atom dan mencari "Pulau Stabilitas" (Island of Stability).',
    ],
    biologicalRole: {
      humanImportance: 'Tidak ada; unsur sintetis superberat dengan usia kurang dari satu milidetik.',
      dietarySources: ['Tidak terdapat dalam makanan'],
    },
    safety: {
      handlingConcerns: 'Radioaktif ekstrem; meluruh hampir seketika melepaskan energi radiasi alfa berenergi sangat tinggi.',
    },
    discovery: {
      discoverer: 'Kolaborasi JINR (Dubna, Rusia) & LLNL (California, AS)',
      etymology: 'Dinamai untuk menghormati Profesor Yuri Oganessian, fisikawan nuklir perintis yang memimpin sintesis unsur-unsur superberat.',
    },
    commonIons: {},
    compounds: {},
  },
};
