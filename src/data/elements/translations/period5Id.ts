import type { ElementTranslationId } from './types';

export const period5TranslationsId: Record<number, ElementTranslationId> = {
  // 37: Rubidium (Rb)
  37: {
    appearance: 'Logam lunak putih keperakan yang sangat reaktif; terbakar spontan di udara dengan nyala merah keunguan',
    understanding: {
      simpleTerms: 'Logam alkali ultra-reaktif pengukur jam atom navigasi GPS dan pembuat kondensat Bose-Einstein pertama di dunia.',
      whyItBehavesThisWay: 'Dengan 1 elektron valensi 5s yang sangat jauh dari inti ([Kr] 5s¹), energi ionisasinya sangat rendah sehingga bereaksi eksplosif bahkan dengan es dingin.',
      keyTakeaways: [
        'Bereaksi hebat dan eksplosif dengan air dingin atau es.',
        'Digunakan dalam pembuatan kondensat Bose-Einstein (keadaan materi ke-5) pertama di dunia pada suhu mendekati nol mutlak (Nobel Fisika 2001).',
        'Osilator rubidium adalah standar frekuensi stabil untuk jam atom stasiun bumi satelit GPS.',
        'Membakar dengan nyala api merah keunguan (rubidus).',
      ],
    },
    applications: [
      'Jam atom rubidium presisi tinggi untuk satelit navigasi GPS dan stasiun pangkalan telekomunikasi seluler.',
      'Riset pendinginan laser atom dan komputasi kuantum fisika partikel.',
      'Bahan fotosensitif fotokatoda tabung pengganda elektron (photomultiplier).',
    ],
    biologicalRole: {
      humanImportance: 'Meniru ion kalium di dalam sel tubuh; tidak esensial namun hadir dalam jumlah renik tanpa toksisitas tinggi.',
      dietarySources: ['Kopi', 'Teh', 'Daging sapi', 'Biji-bijian'],
    },
    safety: {
      handlingConcerns: 'Terbakar spontan saat kontak dengan udara dan bereaksi meledak dengan air. Simpan dalam ampul kaca tertutup rapat di bawah gas argon.',
    },
    discovery: {
      discoverer: 'Robert Bunsen & Gustav Kirchhoff',
      etymology: 'Dari bahasa Latin "rubidus" yang berarti merah tua gelap, merujuk pada garis merah tua terang dalam spektrum emisi nyala apinya.',
    },
    commonIons: {
      'Rb⁺': 'Ion kation rubidium stabil dengan konfigurasi gas mulia kripton [Kr].',
    },
    compounds: {
      'RbCl': { name: 'Rubidium Klorida', description: 'Garam biomarker biologis pelacak aliran darah koroner jantung.' },
    },
  },

  // 38: Stronsium (Sr)
  38: {
    appearance: 'Logam kuning keperakan lunak yang berubah warna menjadi kuning pekat di udara; bereaksi cepat dengan air',
    understanding: {
      simpleTerms: 'Pewarna kembang api merah menyala di langit malam dan dasar jam atom optik paling akurat di alam semesta.',
      whyItBehavesThisWay: 'Dengan 2 elektron valensi ([Kr] 5s²), stronsium mudah melepaskan kedua elektronnya membentuk ion Sr²⁺ yang memiliki ukuran ionik mirip kalsium (Ca²⁺).',
      keyTakeaways: [
        'Pewarna merah darah cemerlang pada kembang api festival dan suar darurat maritim.',
        'Jam atom optik kisi stronsium adalah jam terakurat di dunia (hanya meleset 1 detik dalam 15 miliar tahun).',
        'Karena kemiripannya dengan kalsium, isotop radioaktif Stronsium-90 (⁹⁰Sr) dari limbah nuklir terserap ke dalam tulang dan memicu leukemia.',
        'Stronsium klorida digunakan dalam pasta gigi gigi sensitif.',
      ],
    },
    applications: [
      'Piroteknik kembang api warna merah menyala dan suar sinyal darurat keselamatan laut.',
      'Pasta gigi khusus pereda ngilu gigi sensitif (stronsium klorida / asetat).',
      'Jam atom kisi optik frekuensi sangat tinggi untuk navigasi luar angkasa dalam.',
      'Pelat magnet keramik ferit stronsium pada motor listrik otomotif.',
    ],
    biologicalRole: {
      humanImportance: 'Bukan nutrisi esensial; diserap tubuh meniru kalsium ke dalam matriks kristal tulang. Senyawa stronsium ranelat digunakan untuk mengobati osteoporosis berat.',
      dietarySources: ['Air tanah alami', 'Sayuran berdaun hijau'],
    },
    safety: {
      handlingConcerns: 'Bereaksi dengan air dan terbakar jika berwujud serbuk. Isotop radioaktif ⁹⁰Sr dari senjata nuklir sangat berbahaya bagi sumsum tulang.',
    },
    discovery: {
      discoverer: 'Adair Crawford & Humphry Davy',
      etymology: 'Dinamai dari desa tambang Strontian di Skotlandia, tempat mineral stronsianit pertama kali ditemukan pada 1790.',
    },
    commonIons: {
      'Sr²⁺': 'Kation stronsium stabil yang mengkoordinasikan ligan mirip kalsium.',
    },
    compounds: {
      'SrCO₃': { name: 'Stronsium Karbonat', description: 'Pewarna kembang api merah menyala dan kaca tabung sinar katoda pemblokir radiasi sinar-X.' },
      'Sr(NO₃)₂': { name: 'Stronsium Nitrat', description: 'Oksidator piroteknik suar sinyal darurat kereta api dan militer.' },
    },
  },

  // 39: Itrium (Y)
  39: {
    appearance: 'Logam transisi abu-abu keperakan berkilau cukup stabil di udara; memiliki sifat mirip lantanida',
    understanding: {
      simpleTerms: 'Logam pendamping fosfor merah layar televisi tabung CRT klasik dan pilar superkonduktor suhu tinggi YBCO.',
      whyItBehavesThisWay: 'Dengan konfigurasi [Kr] 4d¹ 5s², itrium melepaskan ketiga elektron terluarnya secara serentak membentuk ion Y³⁺ dengan jari-jari ion hampir identik dengan logam tanah jarang berat holmium.',
      keyTakeaways: [
        'Superkonduktor suhu tinggi legendaris YBCO (YBa₂Cu₃O₇) superkonduktif di atas titik didih nitrogen cair (-196 °C).',
        'Fosfor merah layar TV warna CRT klasik berasal dari europium yang didopingkan ke dalam matriks itrium oksida.',
        'Kristal sintetis YAG (Yttrium Aluminum Garnet) adalah media laser padat paling populer di industri dan medis.',
        'Meskipun logam transisi blok-d, itrium dikelompokkan sebagai Logam Tanah Jarang (REE) karena kemiripan perilakunya.',
      ],
    },
    applications: [
      'Kristal laser padat Nd:YAG untuk operasi bedah mata katarak, pemotongan baja presisi, dan penghapusan tato.',
      'Superkonduktor suhu tinggi YBCO untuk transmisi daya nir-hambatan dan levitasi magnetik kereta maglev.',
      'Penstabil keramik zirkonia (YSZ) untuk bilah turbin jet tahan panas ekstrem dan sensor oksigen knalpot mobil.',
      'Terapi radioterapi kanker hati radioembolisasi menggunakan manik-manik mikrosfer Itrium-90 (⁹⁰Y).',
    ],
    biologicalRole: {
      humanImportance: 'Tidak memiliki peran fisiologis yang diketahui; garam larutnya memiliki toksisitas sedang jika terhirup.',
      dietarySources: ['Terdapat dalam jumlah renik yang sangat kecil di alam'],
    },
    safety: {
      handlingConcerns: 'Debu serbuk itrium dapat terbakar di udara; hindari menghirup partikel debunya.',
    },
    discovery: {
      discoverer: 'Johan Gadolin',
      etymology: 'Dinamai dari desa tambang Ytterby di Swedia (desa yang memberi nama 4 unsur kimia: Y, Yb, Tb, Er).',
    },
    commonIons: {
      'Y³⁺': 'Ion itrium trivalen tidak berwarna yang stabil dengan konfigurasi gas mulia kripton.',
    },
    compounds: {
      'Y₂O₃': { name: 'Itrium Oksida (Itria)', description: 'Matriks fosfor merah lampu LED, keramik optik, dan penstabil zirkonia refraktori.' },
      'YBa₂Cu₃O₇': { name: 'YBCO (Itrium Barium Tembaga Oksida)', description: 'Superkonduktor suhu tinggi pertama yang dapat bekerja menggunakan pendingin nitrogen cair murah.' },
    },
  },

  // 40: Zirkonium (Zr)
  40: {
    appearance: 'Logam transisi berkilau abu-abu keperakan; sangat tahan korosi dan memiliki penampang serapan neutron sangat rendah',
    understanding: {
      simpleTerms: 'Selongsong pelindung bahan bakar reaktor nuklir pembangkit listrik dan batu permata tiruan intan terpopuler di dunia.',
      whyItBehavesThisWay: 'Dengan konfigurasi [Kr] 4d² 5s², zirkonium membentuk lapisan pasivasi zirkonia (ZrO₂) yang luar biasa tahan terhadap asam kuat, air laut mendidih, dan radiasi neutron.',
      keyTakeaways: [
        'Penampang tangkapan neutron termal sangat rendah: neutron fisi nuklir dapat menembusnya tanpa diserap.',
        'Material selongsong selongsong bahan bakar utama (Zircaloy) pada reaktor nuklir air bertekanan di seluruh dunia.',
        'Kubik zirkonia (Cubic Zirconia / CZ) adalah kristal sintetis pengganti intan permata yang berkilau indah dan terjangkau.',
        'Mineral zirkon (ZrSiO₄) purba dari Australia Barat adalah batuan mineral tertua di Bumi yang pernah ditemukan (~4,4 miliar tahun).',
      ],
    },
    applications: [
      'Paduan Zircaloy untuk kelongsong batang bahan bakar uranium di dalam reaktor daya nuklir komersial.',
      'Permata sintetis kubik zirkonia perhiasan berkilau tinggi (indeks bias ~2,16 mendekati intan).',
      'Keramik mahkota implan gigi tiruan estetik berkekuatan tinggi (zirkonia keramik).',
      'Pelapis penghalang termal tahan panas ekstrem pada sudu bilah turbin jet kedirgantaraan.',
    ],
    biologicalRole: {
      humanImportance: 'Lembam secara biologis dan tidak beracun; jaringan tulang dan gusi manusia dapat menyatu baik dengannya.',
      dietarySources: ['Konsentrasi renik alami dalam air tanah'],
    },
    safety: {
      handlingConcerns: 'Zirkonium padat sangat aman; serbuk halus zirkonium bersifat piroforik dan dapat terbakar spontan di udara.',
    },
    discovery: {
      discoverer: 'Martin Heinrich Klaproth',
      etymology: 'Dari bahasa Persia "zargun" yang berarti warna emas, merujuk pada batu permata zirkon kuning keemasan kuno.',
    },
    commonIons: {
      'Zr⁴⁺': 'Bentuk ionik zirkonium(IV) yang sangat stabil.',
    },
    compounds: {
      'ZrO₂': { name: 'Zirkonium Dioksida (Zirkonia)', description: 'Bahan keramik gigi tiruan superkuat, permata sintetis intan, dan isolator termal reaktor.' },
      'ZrSiO₄': { name: 'Zirkon', description: 'Mineral silikat pasir tahan api peleburan logam dan penanggalan umur geologi tertua di Bumi.' },
    },
  },

  // 41: Niobium (Nb)
  41: {
    appearance: 'Logam transisi abu-abu berkilau yang lentur dan ulet; menjadi superkonduktor pada suhu kriogenik',
    understanding: {
      simpleTerms: 'Logam superkonduktor penyusun magnet raksasa pemindai MRI rumah sakit dan penguat jembatan baja gantung.',
      whyItBehavesThisWay: 'Pengecualian aturan Aufbau: konfigurasi [Kr] 4d⁴ 5s¹ lebih disukai daripada 4d³ 5s² karena meminimalkan energi tolakan antar-elektron.',
      keyTakeaways: [
        'Kawat paduan Niobium-Titanium (NbTi) menyusun kumparan magnet superkonduktor di 99% mesin MRI dan akselerator partikel LHC CERN.',
        'Menambahkan hanya 0,05% niobium ke baja melipatgandakan ketangguhannya untuk pipa transmisi gas alam bawah tanah.',
        'Membentuk lapisan film oksida interferensi optik berwarna-warni pelangi saat dianodisasi (perhiasan tindik tindik hipoalergenik).',
        'Dahulu dinamai "Columbium" (simbol Cb) di Amerika Serikat sebelum distandarisasi IUPAC pada 1949.',
      ],
    },
    applications: [
      'Kawat kabel superkonduktor magnet mesin pemindai MRI medis dan pemercepat partikel subatomik (LHC CERN).',
      'Baja mikro-paduan berkekuatan tinggi (HSLA) untuk jembatan bentang panjang dan pipa pipa migas lepas pantai.',
      'Superalloy turbin mesin roket pendorong dan knalpot jet ruang angkasa.',
      'Perhiasan anoda berwarna-warni hipoalergenik untuk tindik tubuh dan koin peringatan bernilai tinggi.',
    ],
    biologicalRole: {
      humanImportance: 'Lembam secara fisiologis tanpa peran biologis tubuh; sangat biokompatibel untuk implan bedah ortopedi.',
      dietarySources: ['Jumlah renik tak terukur di alam'],
    },
    safety: {
      handlingConcerns: 'Debu logam niobium dapat terbakar; logam batangan padat sangat aman dan tidak beracun.',
    },
    discovery: {
      discoverer: 'Charles Hatchett',
      etymology: 'Dari Niobe, putri Raja Tantalus dalam mitologi Yunani, mencerminkan kemiripan kimianya yang sangat erat dengan tantalum.',
    },
    commonIons: {
      'Nb⁵⁺': 'Tingkat oksidasi +5 yang paling stabil.',
    },
    compounds: {
      'Nb₂O₅': { name: 'Niobium Pentoksida', description: 'Bahan pelapis kaca optik indeks bias tinggi lensa kamera profesional.' },
      'Nb₃Sn': { name: 'Niobium-Timah', description: 'Senyawa superkonduktor antarlogam medan magnet intensitas sangat tinggi pada reaktor fusi nuklir ITER.' },
    },
  },

  // 42: Molibdenum (Mo)
  42: {
    appearance: 'Logam transisi abu-abu keperakan berkilau dengan titik leleh sangat tinggi (2623 °C); ulet dan keras',
    understanding: {
      simpleTerms: 'Nutrisi mikro esensial pencegah penumpukan racun sulfit di hati dan penguat baja meriam tahan panas ekstrem.',
      whyItBehavesThisWay: 'Pengecualian aturan Aufbau: konfigurasi [Kr] 4d⁵ 5s¹ memiliki subkulit d setengah terisi yang simetris, menghasilkan ikatan logam yang luar biasa kuat dan titik leleh sangat tinggi.',
      keyTakeaways: [
        'Titik leleh tertinggi ke-6 di antara seluruh unsur kimia (2623 °C / 4753 °F).',
        'Satu-satunya logam transisi baris kedua yang mutlak esensial bagi semua bentuk kehidupan di Bumi.',
        'Pusat kofaktor molibdenoenzim (MoCo) pada enzim nitrogenase fiksasi nitrogen bakteri akar polong-polongan.',
        'Molibdenum disulfida (MoS₂) adalah pelumas kering padat berkinerja tinggi dalam kondisi vakum luar angkasa.',
      ],
    },
    applications: [
      'Paduan baja tahan panas dan aus untuk blok mesin otomotif, pipa kilang minyak, dan senjata berat.',
      'Pelumas kering padat molibdenum disulfida (MoS₂) untuk industri penerbangan dan ruang hampa antariksa.',
      'Generator isotop radioaktif Teknesium-99m (⁹⁹Mo/⁹⁹ᵐTc) untuk pencitraan diagnostik kedokteran nuklir rumah sakit.',
      'Elektroda pemanas tungku peleburan kaca cair bersuhu ribuan derajat.',
    ],
    biologicalRole: {
      humanImportance: 'Nutrisi mikro esensial; kofaktor enzim sulfit oksidase (mencegah akumulasi sulfit neurotoksik mematikan), xantin oksidase pembentuk asam urat, dan aldehida oksidase.',
      dietarySources: ['Kacang polong dan buncis', 'Hati sapi', 'Gandum utuh', 'Kacang tanah', 'Telur'],
    },
    safety: {
      handlingConcerns: 'Toksisitas rendah pada manusia; kelebihan molibdenum pada hewan ternak memicu defisiensi tembaga (molibdenosis).',
    },
    discovery: {
      discoverer: 'Carl Wilhelm Scheele & Peter Jacob Hjelm',
      etymology: 'Dari bahasa Yunani "molybdos" yang berarti timbal, karena mineral molibdenit hitam dahulu sering dikira sebagai timbal atau grafit.',
    },
    commonIons: {
      'MoO₄²⁻': 'Ion molibdat tetrahedral larut air, bentuk ketersediaan hayati serapan akar tanaman di tanah.',
    },
    compounds: {
      'MoS₂': { name: 'Molibdenum Disulfida', description: 'Pelumas kering berlapis kisi kristal mirip grafit tahan tekanan ekstrem.' },
      'MoO₃': { name: 'Molibdenum Trioksida', description: 'Prekursor industri kimia untuk produksi paduan molibdenum dan katalis petrokimia.' },
    },
  },

  // 43: Teknesium (Tc)
  43: {
    appearance: 'Logam radioaktif abu-abu keperakan; unsur buatan manusia pertama yang tidak memiliki isotop stabil di tabel periodik',
    understanding: {
      simpleTerms: 'Pekerja keras kedokteran nuklir rumah sakit yang memindai jantung, tulang, dan organ jutaan pasien setiap tahun.',
      whyItBehavesThisWay: 'Tidak memiliki satu pun isotop stabil karena fenomena aturan Mattauch: inti dengan nomor atom ganjil 43 tidak memiliki konfigurasi nukleon stabil di antara molibdenum (42) dan rutenium (44).',
      keyTakeaways: [
        'Unsur pertama di tabel periodik yang diproduksi secara artifisial oleh manusia (1937).',
        'Unsur nomor atom terendah yang seluruh isotopnya bersifat radioaktif tanpa pengecualian.',
        'Isotop metastabil Teknesium-99m (⁹⁹ᵐTc) digunakan dalam lebih dari 80% prosedur pemindaian radiofarmaka kedokteran nuklir dunia.',
        'Memancarkan sinar gamma murni 140 keV yang sangat ideal untuk kamera gamma SPECT dengan dosis radiasi pasien yang aman.',
      ],
    },
    applications: [
      'Pencitraan diagnostik radiofarmasi medis (scintigraphy / SPECT) untuk mendeteksi metastasis kanker tulang, iskemia jantung, dan fungsi ginjal.',
      'Pelindung korosi elektrokimia baja konsentrasi renik pada reaktor nuklir tertutup.',
      'Standar kalibrasi beta untuk peralatan detektor radiasi fisika nuklir.',
    ],
    biologicalRole: {
      humanImportance: 'Tidak ada peran biologis alami; digunakan murni sebagai agen pelacak pencitraan organ medis sementara yang tereliminasi cepat.',
      dietarySources: ['Tidak terdapat dalam makanan alami; unsur radioaktif sintetis'],
    },
    safety: {
      handlingConcerns: 'Bahan radioaktif pemancar radiasi pengion; wajib ditangani dengan perlindungan timbal dan protokol keselamatan radiasi.',
    },
    discovery: {
      discoverer: 'Emilio Segrè & Carlo Perrier',
      etymology: 'Dari bahasa Yunani "technetos" yang berarti buatan manusia (artifisial), karena disintesis pertama kali menggunakan siklotron di Palermo, Sisilia.',
    },
    commonIons: {
      'TcO₄⁻': 'Ion perteknat yang meniru iodida dalam penyerapan organ tiroid medis.',
    },
    compounds: {
      'Tc₂O₇': { name: 'Teknesium Heptoksida', description: 'Oksida volatil berwarna kuning cerah larut air membentuk asam perteknat.' },
    },
  },

  // 44: Rutenium (Ru)
  44: {
    appearance: 'Logam transisi keras dan rapuh berwarna putih keperakan; anggota kelompok logam mulia platina (PGM)',
    understanding: {
      simpleTerms: 'Logam mulia penggerak sel surya tersensitisasi zat warna (DSSC) dan katalis peraih Hadiah Nobel dalam kimia sintesis obat.',
      whyItBehavesThisWay: 'Pengecualian aturan Aufbau: konfigurasi [Kr] 4d⁷ 5s¹. Memiliki kemampuan unik mengadopsi rentang bilangan oksidasi luas dari 0 hingga +8.',
      keyTakeaways: [
        'Anggota kelompok logam platina (Platinum Group Metals / PGM) yang langka dan berharga tinggi.',
        'Katalis metatesis olefin Grubbs (berbasis rutenium) memenangkan Hadiah Nobel Kimia 2005 untuk revolusi sintesis obat-obatan farmasi.',
        'Menghasilkan lapisan antarmuka hard disk drive komputer berdensitas magnetik sangat tinggi.',
        'Rutenium tetroksida (RuO₄) adalah oksidator beracun yang mudah menguap mirip osmium.',
      ],
    },
    applications: [
      'Kontak listrik tahan aus berlapis rutenium dan resistor cip film tebal sirkuit mikroelektronika.',
      'Katalis metatesis Grubbs untuk sintesis polimer maju dan molekul obat kompleks.',
      'Pewarna fotosensitizer berbasis rutenium pada sel surya tersensitisasi zat warna (sel surya Grätzel / DSSC).',
      'Pelapis tipis ruthenium pada elektroda klor-alkali pembangkit klorin gas.',
    ],
    biologicalRole: {
      humanImportance: 'Tidak esensial bagi biologi manusia; kompleks organorutenium sedang giat dikembangkan sebagai obat antikanker alternatif pengganti cisplatin yang lebih ramah ginjal.',
      dietarySources: ['Jumlah renik tidak terukur di alam'],
    },
    safety: {
      handlingConcerns: 'Rutenium padat inert; namun rutenium tetroksida (RuO₄) sangat mudah menguap, mengiritasi saluran pernapasan, dan membakar selaput mata.',
    },
    discovery: {
      discoverer: 'Karl Ernst Claus',
      etymology: 'Dari bahasa Latin "Ruthenia", merujuk pada tanah air Rusia tempat mineral platina Pegunungan Ural diteliti.',
    },
    commonIons: {
      'Ru³⁺': 'Bentuk kation rutenium trivalen yang lazim dalam kimia koordinasi.',
    },
    compounds: {
      'RuO₂': { name: 'Rutenium Dioksida', description: 'Lapisan konduktif elektroda anoda berdimensi stabil (DSA) industri klor-alkali dan superkapasitor.' },
      'RuCl₃': { name: 'Rutenium(III) Klorida', description: 'Prekursor utama sintesis berbagai katalis kimia rutenium homogen.' },
    },
  },

  // 45: Rodium (Rh)
  45: {
    appearance: 'Logam mulia putih keperakan berkilau cermin yang sangat tahan korosi, keras, dan sangat reflektif',
    understanding: {
      simpleTerms: 'Salah satu logam mulia termahal di muka Bumi; penyaring emisi beracun knalpot mobil dan pelapis perhiasan berkilau abadi.',
      whyItBehavesThisWay: 'Konfigurasi elektron [Kr] 4d⁸ 5s¹ memberikannya kestabilan kimiawi ekstrem. Rodium kebal terhadap serangan hampir semua asam mineral pekat termasuk aqua regia.',
      keyTakeaways: [
        'Sering kali menjadi logam mulia dengan harga pasar per gram termahal di dunia, melampaui emas dan platina.',
        'Katalis konverter tiga arah (three-way catalytic converter) knalpot mobil untuk mereduksi gas beracun nitrogen oksida (NOx) menjadi gas nitrogen aman.',
        'Pelapisan rhodium elektroplating pada emas putih memberikan kilau cermin putih keperakan berkilau tinggi yang anti gores.',
        'Katalis Wilkinson berbasis rodium adalah katalis terobosan dalam hidrogenasi alkena industri obat.',
      ],
    },
    applications: [
      'Konverter katalitik knalpot mobil untuk mereduksi gas berbahaya NOx menjadi gas nitrogen dan oksigen alami (80%+ konsumsi dunia).',
      'Pelapis elektroplating pelindung cemerlang pada perhiasan emas putih, perak murni, dan cermin optik presisi tinggi.',
      'Termokopel suhu tinggi rodium-platina pengukur suhu pembakaran tungku industri hingga 1800 °C.',
      'Katalis kimia industri sintesis asam asetat proses Monsanto.',
    ],
    biologicalRole: {
      humanImportance: 'Lembam secara biologis tanpa peran biologis yang diketahui dalam tubuh manusia.',
      dietarySources: ['Tidak terdapat dalam bahan makanan'],
    },
    safety: {
      handlingConcerns: 'Logam perhiasan padat sepenuhnya aman dan hipoalergenik; garam terlarut rodium beracun dan berpotensi memicu dermatitis alergi.',
    },
    discovery: {
      discoverer: 'William Hyde Wollaston',
      etymology: 'Dari bahasa Yunani "rhodon" yang berarti bunga mawar, karena warna merah mawar cerah dari larutan garam kloridanya.',
    },
    commonIons: {
      'Rh³⁺': 'Ion rodium(III) dalam kompleks oktahedral inert.',
    },
    compounds: {
      'RhCl₃': { name: 'Rodium(III) Klorida', description: 'Bahan baku primer sintesis katalis industri Wilkinson dan reaksi hidrogenasi asimetris obat.' },
    },
  },

  // 46: Paladium (Pd)
  46: {
    appearance: 'Logam mulia berkilau putih keperakan; mampu menyerap gas hidrogen hingga 900 kali volume dirinya sendiri',
    understanding: {
      simpleTerms: 'Spons logam penyerap gas hidrogen raksasa dan pembersih gas buang karbon monoksida pada mobil kita.',
      whyItBehavesThisWay: 'Satu-satunya unsur di periode 5 yang kulit 5s-nya kosong sepenuhnya: konfigurasi [Kr] 4d¹⁰ 5s⁰. Subkulit 4d terisi penuh sempurna memberikan stabilitas mulia yang luar biasa.',
      keyTakeaways: [
        'Satu-satunya unsur periode 5 dengan orbital kulit terluar 5s kosong sama sekali ([Kr] 4d¹⁰).',
        'Bertindak seperti spons logam: mampu menyerap gas hidrogen hingga 900 kali lipat volume logamnya sendiri tanpa merusak kisi kristal.',
        'Katalis reaksi penggandengan silang paladium (Heck, Negishi, Suzuki) memenangkan Hadiah Nobel Kimia 2010.',
        'Logam mulia penting dalam perhiasan emas putih (white gold alloy) dan konverter katalitik otomotif.',
      ],
    },
    applications: [
      'Konverter katalitik kendaraan bermotor untuk mengoksidasi gas beracun CO dan hidrokarbon sisa menjadi CO₂ dan air.',
      'Katalis reaksi penggandengan silang (Suzuki-Miyaura coupling) untuk sintesis bahan aktif obat-obatan farmasi modern.',
      'Kapasitor keramik multilapis (MLCC) pada ponsel cerdas dan perangkat keras komputasi.',
      'Perhiasan mewah emas putih paduan paladium yang tidak membutuhkan pelapisan ulang.',
    ],
    biologicalRole: {
      humanImportance: 'Bukan unsur esensial bagi tubuh manusia; toksisitas rendah pada bentuk logam padat.',
      dietarySources: ['Kadar renik tak terukur di alam'],
    },
    safety: {
      handlingConcerns: 'Serbuk halus paladium yang jenuh gas hidrogen dapat menyala spontan di udara; tangani di bawah gas lembam.',
    },
    discovery: {
      discoverer: 'William Hyde Wollaston',
      etymology: 'Dinamai dari asteroid Pallas yang baru ditemukan pada tahun 1802 (dinamai dari Dewi Kebijaksanaan Yunani Pallas Athena).',
    },
    commonIons: {
      'Pd²⁺': 'Ion paladium(II) planar persegi stabil dalam kimia koordinasi.',
    },
    compounds: {
      'PdCl₂': { name: 'Paladium(II) Klorida', description: 'Katalis utama proses Wacker untuk mengubah gas etilena menjadi asetaldehida industri.' },
    },
  },

  // 47: Perak (Ag)
  47: {
    appearance: 'Logam mulia putih keperakan cemerlang; memiliki konduktivitas listrik, termal, dan reflektivitas cahaya tertinggi di antara semua logam',
    understanding: {
      simpleTerms: 'Juara konduktor listrik dan panas nomor satu di dunia; mata uang perak bersejarah, dan pembasmi kuman alami pada plester luka medis.',
      whyItBehavesThisWay: 'Konfigurasi elektron [Kr] 4d¹⁰ 5s¹ memiliki subkulit d penuh. Elektron 5s tunggalnya sangat bebas bergerak melintasi kisi kristal kristal logam menghasilkan konduktivitas listrik tak tertandingi.',
      keyTakeaways: [
        'Konduktivitas listrik dan konduktivitas termal tertinggi dari SELURUH unsur di tabel periodik.',
        'Reflektivitas cahaya tampak tertinggi (99% pemantulan), menjadikannya pelapis cermin teleskop astronomi terbaik.',
        'Ion perak (Ag⁺) memiliki efek oligodinamik kuat: merusak dinding sel bakteri dan virus patogen.',
        'Telah digunakan ribuan tahun sebagai mata uang perak dinar/dirham dan perhiasan berharga.',
      ],
    },
    applications: [
      'Pasta perak konduktif untuk jalur penghantar arus pada sel surya fotovoltaik tenaga surya (pembeli perak industri terbesar).',
      'Peralatan elektronik premium, sakelar kontak listrik berkeandalan tinggi, dan solder suhu tinggi.',
      'Pembalut luka bakar medis antimikroba (perak sulfadiazin) dan pelapis kateter bedah antijamur.',
      'Cermin optik reflektivitas tinggi dan perhiasan perak murni sterling silver (92,5% Ag).',
    ],
    biologicalRole: {
      humanImportance: 'Bukan nutrisi esensial; ion Ag⁺ bertindak sebagai antibakteri spektrum luas dengan mengikat gugus tiol enzim sel kuman.',
      dietarySources: ['Konsentrasi renik alami dalam air laut dan jamur'],
    },
    safety: {
      handlingConcerns: 'Paparan atau konsumsi perak koloid kronis menyebabkan pengendapan garam perak permanen di bawah kulit yang mengubah warna kulit menjadi abu-abu kebiruan permanen (argiria).',
    },
    discovery: {
      discoverer: 'Dikenal sejak zaman prasejarah kuno (~4000 SM)',
      etymology: 'Simbol Ag dari bahasa Latin "argentum", berasal dari akar kata Proto-Indo-Eropa "arg" yang berarti putih bersinar atau berkilau.',
    },
    commonIons: {
      'Ag⁺': 'Ion perak(I) diamagnetik berkonfigurasi d¹⁰.',
    },
    compounds: {
      'AgNO₃': { name: 'Perak Nitrat', description: 'Garam antiseptik kauterisasi kutil kulit dan prekursor kimia senyawa perak analitis.' },
      'AgI': { name: 'Perak Iodida', description: 'Zat inti kondensasi penabur awan dalam teknologi modifikasi cuaca hujan buatan.' },
    },
  },

  // 48: Kadmium (Cd)
  48: {
    appearance: 'Logam lunak putih keperakan kebiruan yang mudah dipotong; logam berat sangat beracun bagi ginjal dan tulang',
    understanding: {
      simpleTerms: 'Logam pigmen kuning lukisan maestro seni dan baterai Ni-Cd klasik yang menjadi ancaman polusi berbahaya bagi kesehatan ginjal.',
      whyItBehavesThisWay: 'Dengan konfigurasi [Kr] 4d¹⁰ 5s², kadmium memiliki sifat mirip seng. Ion Cd²⁺ memiliki ukuran dan muatan identik dengan kalsium dan seng, sehingga menipu dan menyusup ke dalam enzim tubuh.',
      keyTakeaways: [
        'Sangat beracun: meniru kalsium dan mengikis mineral tulang memicu kerapuhan tulang rapuh yang menyakitkan (Penyakit Itai-Itai).',
        'Penampang tangkapan neutron termal tinggi: digunakan sebagai batang kendali darurat reaktor nuklir.',
        'Pigmen kadmium kuning (CdS) dan merah (CdSe) menghasilkan warna lukisan minyak cerah abadi yang disukai pelukis Van Gogh dan Monet.',
        'Baterai isi ulang nikel-kadmium (Ni-Cd) legendaris kini telah banyak digantikan oleh baterai litium-ion yang ramah lingkungan.',
      ],
    },
    applications: [
      'Panel surya film tipis kadmium telurida (CdTe) skala utilitas komersial pembangkit listrik tenaga surya.',
      'Batang kendali penyerap radiasi neutron pada bejana reaktor nuklir fisi.',
      'Pigmen lukis tahan pudar warna kuning kadmium, oranye, dan merah marun cerah.',
      'Pelapisan baja elektroplating tahan korosi air laut keras untuk baut pesawat terbang militer.',
    ],
    biologicalRole: {
      humanImportance: 'Logam berat beracun kumulatif tanpa peran fisiologis pada manusia (kecuali pada diatom laut Thalassiosira weissflogii yang memiliki enzim anhidrase karbonat kadmium).',
      dietarySources: ['Kontaminasi beras sawah dekat kawasan industri tambang'],
    },
    safety: {
      handlingConcerns: 'Karsinogenik kelas 1 dan toksik parah bagi tubulus ginjal. Keracunan kadmium kronis memicu sindrom "Itai-itai" (tulang rapuh patah dan nyeri hebat).',
    },
    discovery: {
      discoverer: 'Friedrich Stromeyer',
      etymology: 'Dari bahasa Yunani "kadmeia" (kalamin/bijih seng), karena pertama kali ditemukan sebagai pengotor pada seng karbonat.',
    },
    commonIons: {
      'Cd²⁺': 'Ion divalen stabil yang mengikat protein metalotionein hati.',
    },
    compounds: {
      'CdS': { name: 'Kadmium Sulfida', description: 'Pigmen kuning kadmium cerah dan bahan fotoresistor peka cahaya sensor malam.' },
      'CdTe': { name: 'Kadmium Telurida', description: 'Semikonduktor sel surya fotovoltaik film tipis industri berbiaya murah.' },
    },
  },

  // 49: Indium (In)
  49: {
    appearance: 'Logam pasca-transisi putih keperakan sangat lunak; dapat digores kuku dan mengeluarkan suara derit tangisan saat ditekuk',
    understanding: {
      simpleTerms: 'Logam pembuat layar sentuh kaca ponsel pintar transparan konduktif yang merespons sentuhan jari kita setiap detik.',
      whyItBehavesThisWay: 'Dengan konfigurasi [Kr] 4d¹⁰ 5s² 5p¹, ikatan logamnya sangat lunak dan ulet bahkan pada suhu kriogenik mendekati nol mutlak.',
      keyTakeaways: [
        'Begitu lunak sehingga dapat dipotong dengan pisau mentega, digores kuku jari, dan ditekuk dengan tangan kosong.',
        'Mengeluarkan suara derit khas ("tangisan indium" / indium cry) saat ditekuk akibat pergeseran kisi kembaran kristal kristal.',
        'Indium Tin Oxide (ITO) adalah material ajaib yang transparan tembus pandang namun sekaligus menghantarkan listrik.',
        'Sangat penting untuk antarmuka layar sentuh kapasitif seluruh ponsel pintar, tablet, dan monitor modern.',
      ],
    },
    applications: [
      'Lapisan film tipis Indium Tin Oxide (ITO) untuk layar sentuh ponsel pintar, TV layar datar LCD, dan panel OLED.',
      'Solder bebas timbal bertitik leleh rendah untuk perakitan cip mikroelektronika sensitif panas.',
      'Bahan segel paking vakum tinggi kedap udara pada kriogenik suhu ultra-rendah.',
      'Dopan semikonduktor fosfida indium (InP) untuk transceiver serat optik internet berkecepatan tinggi.',
    ],
    biologicalRole: {
      humanImportance: 'Tidak ada peran metabolik tubuh; garam terlarutnya bersifat toksik bagi ginjal jika terpapar dosis tinggi.',
      dietarySources: ['Konsentrasi renik di alam'],
    },
    safety: {
      handlingConcerns: 'Logam batangan padat aman dipegang tangan; debu indium tin oxide (ITO) dapat memicu penyakit paru pneumokoniosis indium pada pekerja pabrik layar.',
    },
    discovery: {
      discoverer: 'Ferdinand Reich & Hieronymous Theodor Richter',
      etymology: 'Dari warna garis emisi biru nila (indigo) cerah yang khas dalam analisis spektrum apinya.',
    },
    commonIons: {
      'In³⁺': 'Tingkat oksidasi +3 paling lazim dari indium.',
    },
    compounds: {
      'In₂O₃-SnO₂': { name: 'Indium Tin Oxide (ITO)', description: 'Lapisan oksida transparan konduktif listrik pada kaca layar sentuh ponsel dan monitor komputer.' },
      'InP': { name: 'Indium Fosfida', description: 'Semikonduktor kecepatan tinggi untuk pemancar laser serat optik telekomunikasi dan penguat sinyal radar.' },
    },
  },

  // 50: Timah (Sn)
  50: {
    appearance: 'Logam lunak putih keperakan ulet berkilau (timah putih β); berubah menjadi bubuk abu-abu rapuh pada suhu dingin (hama timah)',
    understanding: {
      simpleTerms: 'Logam pelindung kaleng makanan biskuit dan penyambung solder elektronik yang menyatukan sirkuit cip komputer kita.',
      whyItBehavesThisWay: 'Dengan konfigurasi [Kr] 4d¹⁰ 5s² 5p², timah memiliki dua alotrop utama: timah putih logam ulet (fase-β) dan timah abu-abu semikonduktor rapuh (fase-α). Di bawah 13,2 °C, timah putih perlahan hancur menjadi bubuk.',
      keyTakeaways: [
        'Zaman Perunggu kuno (Bronze Age, ~3000 SM) lahir saat manusia melebur tembaga dengan timah untuk membuat senjata tajam tangguh.',
        'Fenomena "hama timah" (tin pest): pada suhu beku, kancing atau lonceng timah putih berubah menjadi bubuk abu-abu yang hancur.',
        'Menghasilkan suara rintihan "tin cry" saat batang logamnya ditekuk.',
        'Solder paduan timah adalah jembatan perekat logam penghantar listrik di setiap perangkat elektronik di dunia.',
      ],
    },
    applications: [
      'Kawat solder elektronik perakitan papan sirkuit cetak (PCB) komponen komputer dan ponsel.',
      'Pelapis tin-plating kaleng baja kemasan makanan dan minuman agar tidak berkarat.',
      'Paduan perunggu (tembaga-timah) untuk patung artistik, lonceng gereja/kuil, dan bantalan mesin.',
      'Kaca jendela apung (Pilkington float glass process): kaca cair dituang di atas kolam timah cair agar rata sempurna.',
    ],
    biologicalRole: {
      humanImportance: 'Bukan unsur esensial bagi tubuh manusia; logam timah murni padat memiliki toksisitas sangat rendah sehingga aman untuk kemasan makanan.',
      dietarySources: ['Konsentrasi renik pada makanan kaleng'],
    },
    safety: {
      handlingConcerns: 'Logam timah padat aman; namun senyawa organotimah sintetis (seperti tributiltimah TBT pada cat kapal) sangat beracun bagi biota laut.',
    },
    discovery: {
      discoverer: 'Dikenal sejak peradaban prasejarah (~3500 SM)',
      etymology: 'Simbol Sn dari bahasa Latin "stannum", berakar dari kata Keltik kuno untuk timah.',
    },
    commonIons: {
      'Sn²⁺': 'Ion stano (timah II), agen pereduksi kimia yang baik.',
      'Sn⁴⁺': 'Ion stani (timah IV) kovalen dalam timah tetraklorida.',
    },
    compounds: {
      'SnF₂': { name: 'Stano Fluorida (Timah(II) Fluorida)', description: 'Zat aktif mineralisasi email gigi pada pasta gigi pencegah karies dan radang gusi.' },
      'SnO₂': { name: 'Timah(IV) Oksida (Kasiterit)', description: 'Bijih timah utama tambang, bubuk poles batu akik permata, dan sensor gas alkohol sensor napas.' },
    },
  },

  // 51: Antimon (Sb)
  51: {
    appearance: 'Metaloid kristal abu-abu keperakan berkilau mengkilap; keras dan sangat rapuh sehingga mudah dihaluskan menjadi bubuk',
    understanding: {
      simpleTerms: 'Riasan celak mata hitam ratu Mesir kuno yang kini menjadi pelindung kabel tahan api dan pembuat baterai aki mobil awet.',
      whyItBehavesThisWay: 'Dengan 5 elektron valensi ([Kr] 4d¹⁰ 5s² 5p³), antimon memperlihatkan sifat anomali ekspansi: volumenya mengembang saat membeku dari cairan menjadi padatan (seperti air).',
      keyTakeaways: [
        'Mengembang saat membeku dari cairan menjadi padat, mengisi cetakan huruf logam mesin cetak Gutenberg secara sempurna tajam.',
        'Digunakan sejak ribuan tahun lalu di Mesir Kuno sebagai bubuk celak mata hitam "kohl" pelindung mata dari terik gurun.',
        'Antimon trioksida (Sb₂O₃) adalah sinergis bahan tahan api pemadam kebakaran pada plastik dan kain tekstil.',
        'Memperkeras pelat timbal pada baterai aki asam-timbal kendaraan bermotor.',
      ],
    },
    applications: [
      'Bahan sinergis tahan api (flame retardant) pada tekstil jok mobil, plastik elektronik, dan pakaian pemadam kebakaran.',
      'Paduan pengeras timbal pada pelat baterai aki basah asam-timbal dan selongsong amunisi militer.',
      'Dopan semikonduktor antimonida (InSb, GaSb) untuk sensor pencitraan inframerah militer.',
      'Katalis polimerisasi produksi serat poliester pakaian dan botol kemasan plastik PET.',
    ],
    biologicalRole: {
      humanImportance: 'Tidak memiliki peran biologis dalam tubuh manusia; senyawa antimon memiliki toksisitas mirip arsenik.',
      dietarySources: ['Jumlah renik sangat kecil di alam'],
    },
    safety: {
      handlingConcerns: 'Senyawa antimon beracun dan mengiritasi kulit serta selaput lendir pernapasan. Gas stibin (SbH₃) sangat mematikan.',
    },
    discovery: {
      discoverer: 'Dikenal sejak peradaban Timur Tengah kuno (~3000 SM)',
      etymology: 'Simbol Sb berasal dari bahasa Latin "stibium" (nama mineral stibnit); kata "antimony" dari bahasa Yunani "anti-monos" (tidak pernah ditemukan sendirian).',
    },
    commonIons: {
      'Sb³⁺': 'Ion antimon(III) dalam garam mineral.',
      'Sb(OH)₆⁻': 'Anion heksahidroksoantimonat(V).',
    },
    compounds: {
      'Sb₂S₃': { name: 'Antimon Trisulfida (Stibnit)', description: 'Bubuk kristal hitam mineral celak mata kohl Mesir kuno dan pemantik kepala korek api gesek.' },
      'Sb₂O₃': { name: 'Antimon Trioksida', description: 'Aditif penghambat nyala api pemadam kebakaran pada plastik dan polimer tekstil.' },
    },
  },

  // 52: Telurium (Te)
  52: {
    appearance: 'Metaloid rapuh berkilau putih keperakan; memiliki sifat semikonduktor dan berbau tajam seperti bawang putih pada napas jika terpapar',
    understanding: {
      simpleTerms: 'Metaloid langka pembuat panel surya film tipis komersial terbesar dan cakram kepingan DVD-RW yang dapat ditulis ulang.',
      whyItBehavesThisWay: 'Dengan 6 elektron valensi ([Kr] 4d¹⁰ 5s² 5p⁴), telurium membentuk struktur rantai heliks polimerik kovalen. Atomnya mudah membentuk ikatan kovalen polar dengan kadmium dan bismut.',
      keyTakeaways: [
        'Salah satu unsur stabil paling langka di kerak Bumi (lebih langka daripada emas atau platina di bebatuan kerak).',
        'Kadmium Telurida (CdTe) adalah teknologi sel surya fotovoltaik film tipis komersial paling efisien dan murah per watt.',
        'Material termoelektrik Bismut Telurida (Bi₂Te₃) mengubah perbedaan panas suhu menjadi arus listrik pendingin kulkas mini nir-kompresor.',
        'Paparan telurium dalam jumlah renik menyebabkan tubuh mengeluarkan bau bawang putih yang sangat menyengat melalui napas dan keringat selama berminggu-minggu.',
      ],
    },
    applications: [
      'Modul panel surya fotovoltaik film tipis kadmium telurida (CdTe) skala pembangkit listrik tenaga surya raksasa.',
      'Pendingin termoelektrik semikonduktor efek Peltier (Bi₂Te₃) pada dispenser air minum dan lemari es portabel.',
      'Lapisan paduan perubahan fase (phase-change memory) pada keping cakram optik DVD-RW dan Blu-ray RW.',
      'Aditif pemesinan bebas untuk mempermudah pemotongan paduan baja dan tembaga.',
    ],
    biologicalRole: {
      humanImportance: 'Bukan unsur esensial tubuh; beberapa fungi dapat memetabolisme telurium menjadi dimetil telurida yang berbau bawang putih.',
      dietarySources: ['Konsentrasi renik pada tanaman bawang dan kacang'],
    },
    safety: {
      handlingConcerns: 'Menyebabkan "napas telurium" (bau bawang putih menyengat yang memalukan pada napas dan keringat tubuh). Senyawa telurit beracun bagi ginjal.',
    },
    discovery: {
      discoverer: 'Franz-Joseph Müller von Reichenstein',
      etymology: 'Dari bahasa Latin "Tellus" yang berarti Dewi Bumi (Ibu Pertiwi), dinamai berpasangan dengan selenium (Dewi Bulan).',
    },
    commonIons: {
      'Te²⁻': 'Ion telurida berkonfigurasi gas mulia xenon [Xe].',
    },
    compounds: {
      'CdTe': { name: 'Kadmium Telurida', description: 'Bahan semikonduktor sel surya fotovoltaik penyerap sinar matahari berefisiensi tinggi.' },
      'Bi₂Te₃': { name: 'Bismut Telurida', description: 'Bahan termoelektrik pengubah panas langsung menjadi listrik dan pendingin modul pendingin Peltier.' },
    },
  },

  // 53: Iodin (I)
  53: {
    appearance: 'Padatan kristal hitam keunguan berkilau yang menyublim menjadi uap gas ungu violet pekat yang memukau',
    understanding: {
      simpleTerms: 'Kristal ungu antiseptik Betadine pembersih luka dan mikronutrien garam dapur penjaga kelenjar tiroid dari penyakit gondok.',
      whyItBehavesThisWay: 'Halogen terberat yang stabil dengan konfigurasi [Kr] 4d¹⁰ 5s² 5p⁵. Jari-jari atomnya yang besar menghasilkan awan elektron yang sangat terpolarisasi, sehingga gaya dispersi antarmolekul I₂ cukup kuat untuk membentuk padatan kristal pada suhu kamar.',
      keyTakeaways: [
        'Menyublim saat dipanaskan menghasilkan uap gas ungu violet pekat yang sangat spektakuler.',
        'Unsur esensial terberat yang mutlak dibutuhkan tubuh manusia untuk sintesis hormon kelenjar tiroid (tiroksin T4 dan triiodotironin T3).',
        'Garam beriodium (iodized salt) berhasil memberantas penyakit gondok dan gangguan kretinisme keterbelakangan mental di seluruh dunia.',
        'Larutan antiseptik povidon iodin (Betadine) adalah standar emas pembersih luka operasi bedah medis.',
      ],
    },
    applications: [
      'Garam dapur beriodium (KIO₃ / KI) untuk pencegahan penyakit gondok dan kretinisme global.',
      'Antiseptik luka luar dan pembersih pra-operasi bedah rumah sakit (povidon iodin / Betadine).',
      'Agen kontras radio-opak pada pemindaian tomografi terkomputasi (CT Scan) sinar-X pembuluh darah.',
      'Tablet kalium iodida (KI) pelindung saturasi tiroid dari serapan radioaktif iodin-131 saat bencana reaktor nuklir.',
    ],
    biologicalRole: {
      humanImportance: 'Nutrisi mikro esensial mutlak pembentuk hormon tiroid T3 dan T4 yang mengatur laju metabolisme basal, pembakaran energi, perkembangan otak janin, dan pertumbuhan tubuh.',
      dietarySources: ['Garam beriodium', 'Rumput laut kelp/nori', 'Ikan kod dan tuna', 'Susu dan yogurt', 'Udang'],
    },
    safety: {
      handlingConcerns: 'Kristal padat dan uap iodin pekat mengiritasi mata dan saluran pernapasan serta menodai kulit dengan warna cokelat tua.',
    },
    discovery: {
      discoverer: 'Bernard Courtois',
      etymology: 'Dari bahasa Yunani "ioeides" yang berarti berwarna violet atau ungu tua, mengacu pada uap gas hasil sublimasinya.',
    },
    commonIons: {
      'I⁻': 'Ion iodida dengan konfigurasi gas mulia xenon [Xe].',
      'I₃⁻': 'Ion triiodida linier cokelat kemerahan hasil reaksi iodin dengan larutan iodida.',
    },
    compounds: {
      'KI': { name: 'Kalium Iodida', description: 'Zat aditif fortifikasi garam konsumsi dan pelindung radiasi tiroid nuklir darurat.' },
      'AgI': { name: 'Perak Iodida', description: 'Zat kristal penyemai awan untuk teknologi modifikasi cuaca hujan buatan.' },
      'PVP-I': { name: 'Povidon Iodin (Betadine)', description: 'Kompleks antiseptik larut air pelepasan lambat pembasmi bakteri dan virus luka.' },
    },
  },

  // 54: Xenon (Xe)
  54: {
    appearance: 'Gas mulia tidak berwarna, tidak berbau, dan sangat berat; memancarkan cahaya pendar biru langit cemerlang dalam tabung lucutan',
    understanding: {
      simpleTerms: 'Gas mulia pendorong mesin roket ion wahana antariksa luar angkasa dan lampu proyektor bioskop IMAX tercerah.',
      whyItBehavesThisWay: 'Dengan 8 elektron valensi kulit terluar pada tingkat energi n=5 ([Kr] 4d¹⁰ 5s² 5p⁶), awan elektronnya sangat besar dan mudah terpolarisasi, memungkinkannya membentuk ikatan kimia stabil pertama di antara gas mulia (misalnya XeF₄).',
      keyTakeaways: [
        'Massa jenis gas sangat berat (~5,9 g/L, hampir lima kali lebih padat daripada udara biasa).',
        'Membuktikan pada tahun 1962 bahwa gas mulia TIDAK sepenuhnya lembam (Neil Bartlett mensintesis senyawa gas mulia pertama: XePtF₆).',
        'Bahan bakar propelan pendorong mesin pendorong ion listrik (ion thruster) pada satelit dan wahana penjelajah antariksa NASA/ESA.',
        'Lampu busur xenon menghasilkan spektrum cahaya putih murni paling terang untuk proyektor bioskop layar raksasa IMAX.',
      ],
    },
    applications: [
      'Propelan gas pendorong mesin ion listrik wahana antariksa penjelajah luar angkasa (seperti misi Dawn dan satelit Starlink).',
      'Lampu busur xenon intensitas ultra-tinggi untuk proyektor bioskop digital IMAX dan lampu depan mobil HID mewah.',
      'Anestesi umum medis modern neuroprotektif tanpa efek samping kardiovaskular pada operasi jantung.',
      'Detektor materi gelap alam semesta kriogenik cairan xenon murni (eksperimen XENONnT / LZ).',
    ],
    biologicalRole: {
      humanImportance: 'Gas mulia lembam; bekerja sebagai anestesi umum inhalasi yang sangat aman dan neuroprotektif dengan memblokir reseptor NMDA di otak.',
      dietarySources: ['Tidak terdapat dalam makanan; gas mulia lembam'],
    },
    safety: {
      handlingConcerns: 'Tidak beracun secara kimiawi; merupakan gas berat yang dapat memicu asfiksia hipoksia cepat di ruang tertutup rendah ventilasi.',
    },
    discovery: {
      discoverer: 'Sir William Ramsay & Morris Travers',
      etymology: 'Dari bahasa Yunani "xenos" yang berarti orang asing atau tamu tak terduga, ditemukan di residu penyulingan udara cair.',
    },
    commonIons: {},
    compounds: {
      'XeF₄': { name: 'Xenon Tetrafluorida', description: 'Senyawa biner gas mulia pertama berbentuk kristal putih planar persegi stabil.' },
      'XeO₃': { name: 'Xenon Trioksida', description: 'Zat padat kristal putih oksidator superkuat yang sangat mudah meledak jika terbentur.' },
    },
  },
};
