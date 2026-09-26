import type { ElementTranslationId } from './types';

export const period4TranslationsId: Record<number, ElementTranslationId> = {
  // 19: Kalium (K)
  19: {
    appearance: 'Logam keperakan lunak yang cepat kusam bernoda ungu di udara dan bereaksi dahsyat dengan air',
    understanding: {
      simpleTerms: 'Logam lunak yang meletupkan api ungu saat tercebur ke air; sangat vital dalam memicu impuls pikiran pada sistem saraf kita.',
      whyItBehavesThisWay: 'Elektron valensi tunggal pada orbital 4s berada sangat jauh dari inti dan terlindungi oleh 18 elektron inti, sehingga sangat mudah dilepaskan.',
      keyTakeaways: [
        'Elektrolit intraseluler utama dalam sel manusia, penting untuk kontraksi otot jantung dan konduksi saraf.',
        'Kalium-40 (⁴⁰K) adalah isotop radioaktif alami dalam pisang dan tubuh manusia, menyumbang radiasi latar belakang alami terbesar.',
        'Membakar dengan nyala api khas berwarna lembayung (violet/lilac).',
        'Komponen pupuk pertanian kalium (potas) yang menyokong ketahanan tanaman terhadap kekeringan.',
      ],
    },
    applications: [
      'Pupuk pertanian (kalium klorida KCl / potas) untuk memacu pertumbuhan dan ketahanan tanaman pangan.',
      'Kalium hidroksida (KOH / potas kaustik) untuk pembuatan sabun cair dan baterai alkalin.',
      'Kalium nitrat (sendawa) untuk bahan kembang api dan pengawetan daging.',
      'Paduan NaK cair sebagai fluida transfer panas reaktor nuklir generasi maju.',
    ],
    biologicalRole: {
      humanImportance: 'Kation intraseluler dominan; mengendalikan potensial membran istirahat, transmisi impuls saraf, kontraksi otot rangka, dan detak ritme jantung.',
      dietarySources: ['Pisang', 'Kentang panggang', 'Bayam', 'Kacang-kacangan dan alpukat'],
    },
    safety: {
      handlingConcerns: 'Bereaksi meledak dengan air dan terbakar spontan di udara lembap. Simpan terendam dalam minyak mineral bebas air.',
    },
    discovery: {
      discoverer: 'Humphry Davy',
      etymology: 'Dari bahasa Inggris "potash" (abu periuk); simbol K dari bahasa Neo-Latin "kalium", berasal dari bahasa Arab "al-qalyah" (abu tumbuhan).',
    },
    commonIons: {
      'K⁺': 'Kehilangan elektron tunggal 4s untuk memperoleh kestabilan konfigurasi gas mulia argon [Ar].',
    },
    compounds: {
      'KCl': { name: 'Kalium Klorida', description: 'Pupuk potas pertanian dan suplemen elektrolit kalium medis.' },
      'KOH': { name: 'Kalium Hidroksida', description: 'Basa kuat untuk pembuatan sabun cair lembut dan elektrolit baterai.' },
    },
  },

  // 20: Kalsium (Ca)
  20: {
    appearance: 'Logam abu-abu keperakan agak keras; cepat membentuk lapisan oksida abu-abu kusam di udara',
    understanding: {
      simpleTerms: 'Fondasi arsitektur tulang dan gigi kita serta bahan penyusun utama semen beton gedung pencakar langit.',
      whyItBehavesThisWay: 'Dengan 2 elektron valensi (4s²), kalsium mudah melepaskan kedua elektronnya membentuk ion Ca²⁺ yang mengkoordinasikan protein biologis dan kisi mineral batuan kapur.',
      keyTakeaways: [
        'Unsur logam paling melimpah dalam tubuh manusia (~1,4 kg pada orang dewasa, 99% di tulang dan gigi).',
        'Sinyal ion Ca²⁺ memicu setiap kontraksi denyut jantung dan pelepasan neurotransmiter di otak.',
        'Membentuk batu kapur marmer dan gips semen beton bangunan.',
        'Membakar dengan nyala api merah bata (brick-red) yang khas.',
      ],
    },
    applications: [
      'Bahan baku semen Portland, plester beton, mortar, dan batu bata kapur bangunan.',
      'Peleburan besi baja untuk mengikat pengotor terak silikat.',
      'Suplemen kalsium pencegah osteoporosis pengeroposan tulang.',
      'Pembuatan keju dan pengendapan tahu tradisional.',
    ],
    biologicalRole: {
      humanImportance: 'Mineral struktural utama hidroksiapatit tulang dan gigi; pembawa pesan kedua (second messenger) intraseluler untuk kontraksi otot, koagulasi pembekuan darah, dan eksositosis seluler.',
      dietarySources: ['Susu dan olahan keju/yogurt', 'Ikan teri/sarden dengan tulang', 'Tahu kalsium', 'Sayuran hijau brokoli'],
    },
    safety: {
      handlingConcerns: 'Kalsium logam bereaksi dengan air menghasilkan gas hidrogen dan panas; kalsium oksida (kapur tohor) sangat kaustik bagi mata dan kulit.',
    },
    discovery: {
      discoverer: 'Humphry Davy',
      etymology: 'Dari bahasa Latin "calx" yang berarti kapur tohor (batu kapur yang dibakar).',
    },
    commonIons: {
      'Ca²⁺': 'Kehilangan kedua elektron 4s membentuk ion stabil dengan konfigurasi argon [Ar].',
    },
    compounds: {
      'CaCO₃': { name: 'Kalsium Karbonat', description: 'Mineral batu kapur, marmer, kapur tulis, dan antasida pereda sakit maag.' },
      'CaO': { name: 'Kalsium Oksida (Kapur Tohor)', description: 'Zat kimia industri penstabil tanah dan pembuatan baja.' },
      'CaSO₄·2H₂O': { name: 'Gips / Gypsum', description: 'Bahan plester dinding gipsum dan gips medis fiksasi patah tulang.' },
    },
  },

  // 21: Skandium (Sc)
  21: {
    appearance: 'Logam transisi putih keperakan yang relatif lunak; menguning keemasan jika teroksidasi di udara',
    understanding: {
      simpleTerms: 'Logam transisi langka yang memperkuat kerangka sepeda balap balap dan membuat lampu sorot stadion seterang siang hari.',
      whyItBehavesThisWay: 'Unsur pertama di blok-d dengan konfigurasi [Ar] 3d¹ 4s². Melepaskan ketiga elektron terluarnya secara serentak membentuk kation Sc³⁺ nir-elektron d yang tidak berwarna.',
      keyTakeaways: [
        'Unsur logam transisi 3d pertama pada tabel periodik.',
        'Paduan Al-Sc menghasilkan logam berkekuatan sangat tinggi yang dapat dilas untuk industri dirgantara.',
        'Lampu halida logam skandium menghasilkan indeks reproduksi warna mendekati spektrum sinar matahari asli.',
        'Hanya memiliki satu tingkat oksidasi stabil (+3), menyerupai sifat kimia lantanida.',
      ],
    },
    applications: [
      'Paduan aluminium-skandium untuk komponen jet tempur militer dan rangka sepeda kompetisi kelas atas.',
      'Lampu halida logam intensitas tinggi untuk penerangan stadion sepak bola dan set film bioskop.',
      'Pelacak isotop radioaktif dalam eksplorasi industri minyak bumi.',
    ],
    biologicalRole: {
      humanImportance: 'Tidak memiliki fungsi biologis yang diketahui; senyawa skandium dianggap memiliki toksisitas rendah.',
      dietarySources: ['Tidak terdapat dalam bahan makanan'],
    },
    safety: {
      handlingConcerns: 'Debu serbuk skandium dapat terbakar; simpan dalam wadah kedap udara.',
    },
    discovery: {
      discoverer: 'Lars Fredrik Nilson',
      etymology: 'Dari bahasa Latin "Scandia" yang berarti Skandinavia, tempat mineral euxenit pertama kali ditemukan.',
    },
    commonIons: {
      'Sc³⁺': 'Kehilangan kedua elektron 4s dan satu elektron 3d membentuk ion diamagnetik stabil berkonfigurasi argon.',
    },
    compounds: {
      'Sc₂O₃': { name: 'Skandium Oksida (Skandia)', description: 'Bahan laser optik kristal dan paduan keramik sel bahan bakar oksida padat (SOFC).' },
      'ScCl₃': { name: 'Skandium Klorida', description: 'Garam halida yang digunakan dalam lampu uap stadion berintensitas tinggi.' },
    },
  },

  // 22: Titanium (Ti)
  22: {
    appearance: 'Logam transisi abu-abu keperakan berkilau kuat; sangat tahan korosi dan sekuat baja dengan berat setengahnya',
    understanding: {
      simpleTerms: 'Logam berkekuatan super sekuat baja namun 45% lebih ringan; kebal karat dan ramah bersatu dengan tulang manusia.',
      whyItBehavesThisWay: 'Dengan konfigurasi [Ar] 3d² 4s², titanium membentuk lapisan pasivasi TiO₂ sangat tipis namun luar biasa stabil yang merekat kuat pada permukaan logam.',
      keyTakeaways: [
        'Rasio kekuatan terhadap massa (kekuatan spesifik) tertinggi di antara semua logam struktural.',
        'Kebal total terhadap korosi air laut, klorin, dan cairan tubuh manusia.',
        'Biokompatibel sempurna: jaringan tulang manusia dapat menyatu langsung dengannya (osteointegrasi).',
        'Titanium dioksida (TiO₂) adalah pigmen putih paling buram dan cemerlang di dunia.',
      ],
    },
    applications: [
      'Komponen turbin jet pesawat komersial/militer dan struktur lambung kapal selam laut dalam.',
      'Implan medis ortopedi (pengganti sendi panggul/lutut) dan sekrup implan gigi.',
      'Pigmen putih murni TiO₂ untuk cat tembok, plastik putih, tabir surya SPF, dan pasta gigi.',
      'Peralatan olahraga premium: stik golf, rangka sepeda balap, dan casing jam tangan mewah.',
    ],
    biologicalRole: {
      humanImportance: 'Bersifat biokompatibel dan lembam secara biologis; tidak memicu penolakan imunologis pada tubuh manusia.',
      dietarySources: ['Tidak diserap secara biologis; zat warna makanan E171 (TiO₂)'],
    },
    safety: {
      handlingConcerns: 'Logam padat sangat aman; serbuk halus titanium dapat terbakar hebat di udara jika tersulut.',
    },
    discovery: {
      discoverer: 'William Gregor & Martin Heinrich Klaproth',
      etymology: 'Dinamai dari Titan, raksasa perkasa berkekuatan luar biasa dalam mitologi Yunani kuno.',
    },
    commonIons: {
      'Ti⁴⁺': 'Bentuk teroksidasi penuh paling stabil, terdapat dalam senyawa titanium dioksida.',
      'Ti³⁺': 'Ion pereduksi berwarna ungu khas dalam larutan air asam.',
    },
    compounds: {
      'TiO₂': { name: 'Titanium Dioksida (Rutil)', description: 'Pigmen putih paling cemerlang dan filter pelindung fisik radiasi UV pada tabir surya.' },
      'TiCl₄': { name: 'Titanium Tetraklorida', description: 'Cairan penghasil tabir asap tebal dan katalis polimerisasi plastik Ziegler-Natta.' },
    },
  },

  // 23: Vanadium (V)
  23: {
    appearance: 'Logam abu-abu keperakan cerah yang ulet dan keras; membentuk senyawa larutan air berwarna-warni memukau',
    understanding: {
      simpleTerms: 'Penguat baja kunci pas perkakas bengkel dan baterai aliran masa depan untuk penyimpan listrik energi terbarukan raksasa.',
      whyItBehavesThisWay: 'Memiliki konfigurasi [Ar] 3d³ 4s². Memamerkan empat tingkat oksidasi stabil (+2 ungu, +3 hijau, +4 biru, +5 kuning) yang dapat berpindah bolak-balik tanpa merusak elektroda.',
      keyTakeaways: [
        'Menambahkan hanya 0,1% vanadium ke baja dapat menggandakan kekuatan tariknya.',
        'Baterai aliran redoks vanadium (VRFB) dapat diisi dan dikosongkan puluhan ribu kali tanpa degradasi.',
        'Menampilkan 4 warna larutan kimia berbeda yang memukau untuk 4 bilangan oksidasi berturut-turut.',
        'Dinamai dari Dewi Kecantikan Nordik karena keindahan variasi warna senyawanya.',
      ],
    },
    applications: [
      'Baja paduan vanadium untuk perkakas tangan mekanik (kunci pas), poros engkol, dan rel kereta api berkecepatan tinggi.',
      'Baterai aliran redoks skala jaringan (VRFB) untuk penyimpanan listrik pembangkit surya dan angin.',
      'Katalis kimia vanadium pentoksida (V₂O₅) dalam proses kontak pembuatan asam sulfat.',
      'Paduan Ti-6Al-4V untuk turbin industri kedirgantaraan.',
    ],
    biologicalRole: {
      humanImportance: 'Diperlukan dalam jumlah renik oleh beberapa mikroorganisme dan alga laut; fungsi pada tubuh manusia masih diteliti.',
      dietarySources: ['Jamur', 'Lada hitam', 'Padi-padian utuh', 'Kerang-kerangan'],
    },
    safety: {
      handlingConcerns: 'Debu vanadium pentoksida (V₂O₅) beracun jika terhirup, menyebabkan iritasi mata, batuk parah, dan lidah kehijauan.',
    },
    discovery: {
      discoverer: 'Andrés Manuel del Río & Nils Gabriel Sefström',
      etymology: 'Dari "Vanadís", nama lain Dewi Freya (Dewi Kecantikan dan Kesuburan dalam mitologi Nordik Skandinavia).',
    },
    commonIons: {
      'VO²⁺': 'Kation vanadil biru cerah dengan tingkat oksidasi +4.',
      'VO₂⁺': 'Kation dioksovanadium kuning terang dengan tingkat oksidasi +5.',
    },
    compounds: {
      'V₂O₅': { name: 'Vanadium Pentoksida', description: 'Katalis padat penting dalam konversi SO₂ menjadi SO₃ pada produksi asam sulfat industri.' },
      'FeV': { name: 'Ferrovanadium', description: 'Paduan induk aditif penguat struktur mikro kisi baja konstruksi.' },
    },
  },

  // 24: Kromium (Cr)
  24: {
    appearance: 'Logam transisi abu-abu baja mengkilap cermin, sangat keras, dan tahan terhadap pemudaran kusam',
    understanding: {
      simpleTerms: 'Logam pelapis krom mengkilap pada knalpot motor dan rahasia ajaib yang membuat baja tahan karat (stainless steel) kebal karat.',
      whyItBehavesThisWay: 'Pengecualian aturan Aufbau: konfigurasi [Ar] 3d⁵ 4s¹ lebih disukai daripada 3d⁴ 4s² karena subkulit d setengah terisi memberikan stabilitas pertukaran kuantum ekstra.',
      keyTakeaways: [
        'Anomali konfigurasi elektron: mempromosikan 1 elektron 4s ke subkulit 3d membentuk 3d⁵ 4s¹.',
        'Menyusun minimal 10,5% dari baja tahan karat (stainless steel) untuk menciptakan lapisan pasivasi Cr₂O₃ antikarat.',
        'Pelapisan krom (electroplating) menghasilkan kilau cermin reflektif yang sangat keras dan dekoratif.',
        'Kromium(III) adalah nutrisi esensial tubuh, sedangkan Kromium(VI) heksavalen bersifat karsinogenik beracun.',
      ],
    },
    applications: [
      'Bahan paduan utama baja tahan karat (stainless steel) untuk alat bedah medis dan peralatan dapur.',
      'Pelapisan krom dekoratif dan pelindung aus pada pelek roda dan bumper otomotif.',
      'Pigmen warna cat kuning krom (PbCrO₄) dan hijau krom (Cr₂O₃).',
      'Proses penyamakan kulit hewani (krom tanning) agar kulit lentur dan awet.',
    ],
    biologicalRole: {
      humanImportance: 'Kromium trivalen Cr³⁺ adalah mikronutrien esensial yang meningkatkan aksi kerja hormon insulin dalam mengatur kadar glukosa darah.',
      dietarySources: ['Brokoli', 'Daging sapi', 'Hati ayam', 'Ragi bir', 'Roti gandum utuh'],
    },
    safety: {
      handlingConcerns: 'Senyawa kromium heksavalen Cr(VI) (seperti kromat) sangat beracun, karsinogenik, dan merusak DNA. Logam padat kromium aman.',
    },
    discovery: {
      discoverer: 'Louis-Nicolas Vauquelin',
      etymology: 'Dari bahasa Yunani "chroma" yang berarti warna, karena banyaknya variasi warna cerah dari berbagai senyawanya.',
    },
    commonIons: {
      'Cr³⁺': 'Ion kromium(III) hijau/ungu stabil dan nutrisi esensial manusia.',
      'CrO₄²⁻': 'Ion kromat kuning terang dengan kromium pada bilangan oksidasi +6.',
    },
    compounds: {
      'Cr₂O₃': { name: 'Kromium(III) Oksida', description: 'Pigmen hijau tua sangat stabil dan bubuk pengilap poles kaca/logam.' },
      'K₂Cr₂O₇': { name: 'Kalium Dikromat', description: 'Zat oksidator laboratorium kuat berwarna oranye cerah.' },
    },
  },

  // 25: Mangan (Mn)
  25: {
    appearance: 'Logam transisi abu-abu keperakan keras dan sangat rapuh; perlahan teroksidasi berkarat di udara lembap',
    understanding: {
      simpleTerms: 'Logam pembantu pembuat baja tangguh dan komponen baterai alkalin penyala senter rumah kita.',
      whyItBehavesThisWay: 'Konfigurasi elektron [Ar] 3d⁵ 4s² memiliki subkulit 3d terisi setengah penuh yang stabil. Hal ini memungkinkannya melepaskan hingga seluruh 7 elektron valensinya membentuk oksidasi +2 hingga +7.',
      keyTakeaways: [
        'Rentang bilangan oksidasi terluas di antara unsur periode 4 (dari -3 hingga +7).',
        'Kalium permanganat (KMnO₄, +7) adalah oksidator ungu pekat yang legendaris.',
        'Sangat penting dalam metalurgi baja untuk mengikat pengotor belerang dan deoksidasi.',
        'Pusat kompleks evolusi oksigen (kluster Mn₄CaO₅) pada fotosintesis tumbuhan.',
      ],
    },
    applications: [
      'Peleburan baja paduan Hadfield berkekuatan impak tinggi (misalnya gerigi ekskavator dan rel kereta).',
      'Katoda depolarizer pada baterai sel kering seng-karbon dan baterai alkalin rumah tangga (MnO₂).',
      'Kaleng minuman aluminium (paduan Al-Mn) untuk meningkatkan kelenturan cetak dan ketahanan korosi.',
      'Disinfektan antiseptik pembersih luka dan oksidator kimia (KMnO₄).',
    ],
    biologicalRole: {
      humanImportance: 'Nutrisi mikro esensial tubuh; kofaktor enzim antioksidan superoksida dismutase mitokondria (Mn-SOD) dan enzim pembentuk tulang.',
      dietarySources: ['Teh hijau dan hitam', 'Kacang hazelnut dan kenari', 'Bayam', 'Tiram', 'Beras cokelat'],
    },
    safety: {
      handlingConcerns: 'Paparan inhalasi debu mangan kronis di lingkungan tambang menyebabkan gangguan saraf mirip Parkinson yang disebut manganisme.',
    },
    discovery: {
      discoverer: 'Carl Wilhelm Scheele & Johan Gottlieb Gahn',
      etymology: 'Berasal dari bahasa Latin "magnes" (magnet), karena mineral pirolusit dahulu disalahartikan sebagai bijih besi magnetik.',
    },
    commonIons: {
      'Mn²⁺': 'Ion mangan(II) merah muda sangat pucat dengan subkulit 3d⁵ stabil.',
      'MnO₄⁻': 'Ion permanganat ungu tua intens dengan daya oksidasi tinggi.',
    },
    compounds: {
      'MnO₂': { name: 'Mangan Dioksida (Pirolusit)', description: 'Bahan aktif katoda baterai alkalin dan penghilang warna hijau pada pembuatan kaca jernih.' },
      'KMnO₄': { name: 'Kalium Permanganat', description: 'Kristal ungu kehitaman antiseptik kuat dan reagen titrasi redoks analitis.' },
    },
  },

  // 26: Besi (Fe) -> THE USER HIGHLIGHTED ELEMENT!
  26: {
    appearance: 'Logam feromagnetik berkilau abu-abu keperakan; mudah terkorosi membentuk karat cokelat kemerahan di udara lembap',
    understanding: {
      simpleTerms: 'Raja dari segala logam; membentuk inti planet Bumi, membangun jembatan peradaban modern kita, dan mengangkut oksigen melalui aliran darah dalam tubuh manusia.',
      whyItBehavesThisWay: 'Memiliki 8 elektron valensi ([Ar] 3d⁶ 4s²). Kehilangan dua elektron 4s menghasilkan ion Fe²⁺; kehilangan satu elektron 3d tambahan menghasilkan ion Fe³⁺ dengan subkulit 3d⁵ terisi setengah penuh yang luar biasa stabil.',
      keyTakeaways: [
        'Unsur paling melimpah di planet Bumi berdasarkan massa (~32,1%), menyusun sebagian besar inti luar cair dan inti dalam padat Bumi.',
        'Pusat gugus heme pada protein hemoglobin, memberikan warna merah pada darah arteri dan menyalurkan gas O₂ ke seluruh sel tubuh.',
        'Besi-56 (⁵⁶Fe) memiliki salah satu energi ikat inti per nukleon tertinggi di alam semesta, menjadikannya titik akhir fusi nuklir pada bintang-bintang raksasa.',
        'Bersifat feromagnetik alami pada suhu kamar; kehilangan magnet permanennya di atas titik Curie 770 °C.',
      ],
    },
    applications: [
      'Fabrikasi struktural baja dan besi tuang: mencakup lebih dari 90% dari seluruh tonase produksi logam dunia.',
      'Rangka otomotif, kapal kargo kontainer, rel kereta api, jembatan bentang panjang, dan tulangan beton gedung.',
      'Katalis industri proses Haber-Bosch untuk sintesis pupuk amonia dalam skala global.',
      'Inti magnetik untuk transformator listrik tegangan tinggi, motor listrik, dan generator daya.',
    ],
    biologicalRole: {
      humanImportance: 'Sangat krusial untuk pengangkutan O₂ oleh hemoglobin darah, penyimpanan oksigen di otot oleh mioglobin, dan transfer elektron respirasi seluler oleh enzim sitokrom mitokondria.',
      dietarySources: ['Daging merah', 'Kacang lentil dan buncis', 'Bayam dan sayuran hijau', 'Sereal yang diperkaya zat besi'],
    },
    safety: {
      handlingConcerns: 'Serbuk besi halus dapat terbakar jika tersebar membentuk aerosol di udara. Kelebihan konsumsi zat besi akut memicu keracunan toksik hati pada anak-anak.',
    },
    discovery: {
      discoverer: 'Telah dikenal sejak zaman prasejarah kuno (Zaman Besi)',
      etymology: 'Simbol Fe berasal dari bahasa Latin "ferrum"; kata Inggris "iron" berasal dari bahasa Proto-Jermanik "isarnan".',
    },
    commonIons: {
      'Fe²⁺': 'Ion fero (besi II), terbentuk dengan melepaskan kedua elektron valensi 4s.',
      'Fe³⁺': 'Ion feri (besi III), memperoleh kestabilan termodinamika ekstra dari subkulit 3d yang terisi setengah penuh (3d⁵).',
    },
    compounds: {
      'Fe₂O₃': { name: 'Besi(III) Oksida (Karat / Hematit)', description: 'Bijih besi utama penambangan dan produk korosi pengkaratan logam di alam.' },
      'FeSO₄': { name: 'Besi(II) Sulfat', description: 'Suplemen makanan medis untuk mengatasi dan mengobati anemia defisiensi besi.' },
      'Fe₃O₄': { name: 'Magnetit (Besi Oksida Magnetik)', description: 'Mineral magnet alami hitam tertua yang digunakan manusia sebagai kompas navigasi kuno.' },
    },
  },

  // 27: Kobalt (Co)
  27: {
    appearance: 'Logam feromagnetik abu-abu keperakan berkilau dengan sedikit semburat kebiruan; keras dan tahan aus',
    understanding: {
      simpleTerms: 'Pewarna biru tua keramik porselen Tiongkok kuno dan inti atom kobalamin pada Vitamin B12 penjaga sistem saraf kita.',
      whyItBehavesThisWay: 'Dengan konfigurasi [Ar] 3d⁷ 4s², elektron-elektron d yang tidak berpasangan menghasilkan sifat koersivitas magnetik yang sangat tinggi dan ketahanan panas superalloy.',
      keyTakeaways: [
        'Atom logam pusat dalam molekul Vitamin B12 (kobalamin), esensial untuk sintesis DNA dan selubung mielin saraf.',
        'Bahan katoda litium kobalt oksida (LCO/NMC) pada baterai litium-ion ponsel dan mobil listrik.',
        'Isotop radioaktif Kobalt-60 (⁶⁰Co) memancarkan sinar gamma untuk radioterapi kanker dan sterilisasi alat bedah.',
        'Pigmen biru kobalt telah digunakan ribuan tahun untuk mewarnai kaca katedral dan porselen.',
      ],
    },
    applications: [
      'Bahan katoda berkerapatan energi tinggi untuk baterai isi ulang litium-ion.',
      'Superalloy kobalt tahan panas ekstrem untuk turbin gas jet pesawat terbang militer.',
      'Magnet permanen Alnico berkekuatan magnetik tinggi tahan demagnetisasi suhu.',
      'Pewarna pigmen biru kobalt keramik, enamel, kaca, dan cat minyak lukis.',
    ],
    biologicalRole: {
      humanImportance: 'Nutrisi mikro esensial mutlak sebagai inti koordinasi molekul Vitamin B12 (sianokobalamin); tanpanya sel tubuh tidak dapat membentuk sel darah merah dan memicu anemia pernisiosa.',
      dietarySources: ['Ikan laut', 'Daging sapi', 'Telur ayam', 'Hati sapi', 'Susu'],
    },
    safety: {
      handlingConcerns: 'Debu logam kobalt dapat menyebabkan asma alergi kerja dan fibrosis paru. Garam kobalt bersifat karsinogenik potensial jika tertelan berlebih.',
    },
    discovery: {
      discoverer: 'Georg Brandt',
      etymology: 'Dari bahasa Jerman "Kobold" yang berarti goblin atau roh jahat bawah tanah, dinamai oleh penambang perak abad pertengahan.',
    },
    commonIons: {
      'Co²⁺': 'Ion kobalt(II) merah muda dalam air dan biru tua jika terdehidrasi (digunakan pada kertas indikator kelembapan).',
      'Co³⁺': 'Bentuk ion kobalt(III) stabil dalam kompleks koordinasi oktahedral seperti vitamin B12.',
    },
    compounds: {
      'CoCl₂': { name: 'Kobalt(II) Klorida', description: 'Indikator kelembapan silika gel: berubah dari biru saat kering menjadi merah muda saat menyerap air.' },
      'LiCoO₂': { name: 'Litium Kobalt Oksida', description: 'Bahan katoda komersial baterai litium-ion perangkat elektronik portabel.' },
    },
  },

  // 28: Nikel (Ni)
  28: {
    appearance: 'Logam putih keperakan mengkilap keras dengan sedikit kilau keemasan hangat; sangat tahan korosi',
    understanding: {
      simpleTerms: 'Logam koin anti-karat yang menjadi tulang punggung baterai mobil listrik masa depan dan kabel pemanas oven listrik.',
      whyItBehavesThisWay: 'Dengan konfigurasi [Ar] 3d⁸ 4s², nikel memiliki ketahanan oksidasi tinggi dan kelenturan mekanis yang sangat baik pada rentang suhu sangat luas.',
      keyTakeaways: [
        'Komponen kunci baterai kendaraan listrik berjangkauan jauh (baterai nikel NMC 811).',
        'Kawat paduan Nichrome (Ni-Cr) menghasilkan panas efisien untuk pemanggang roti, oven, dan pengering rambut.',
        'Membentuk inti dalam planet Bumi bersama besi dalam bentuk paduan nikel-besi.',
        'Menjadi penyebab paling umum dari reaksi alergi kontak kulit pada perhiasan tiruan.',
      ],
    },
    applications: [
      'Katoda baterai kendaraan listrik (EV) berdaya jelajah tinggi.',
      'Paduan baja tahan karat austenitik (misalnya tipe 304 dan 316) dan superalloy kedirgantaraan Inconel.',
      'Kawat elemen pemanas listrik Nichrome tahan oksidasi suhu tinggi.',
      'Uang koin logam dan pelapisan elektroplating nikel tahan gores.',
    ],
    biologicalRole: {
      humanImportance: 'Nutrisi mikro esensial bagi enzim urease pada tumbuhan dan bakteri; peran spesifik pada manusia sangat kecil.',
      dietarySources: ['Kacang kedelai', 'Kacang tanah', 'Oatmeal', 'Cokelat'],
    },
    safety: {
      handlingConcerns: 'Penyebab umum dermatitis kontak alergi kulit. Debu nikel sulfida dan nikel karbonil (Ni(CO)₄) sangat beracun dan karsinogenik pernapasan.',
    },
    discovery: {
      discoverer: 'Axel Fredrik Cronstedt',
      etymology: 'Berasal dari bahasa Jerman "Kupfernickel" (tembaga Iblis Nick), dinamai oleh penambang yang mengira bijihnya mengandung tembaga.',
    },
    commonIons: {
      'Ni²⁺': 'Ion nikel(II) hijau cerah dalam larutan air terhidrasi [Ni(H₂O)₆]²⁺.',
    },
    compounds: {
      'NiSO₄': { name: 'Nikel(II) Sulfat', description: 'Garam nikel utama untuk bak pelapisan elektroplating dan sintesis bahan katoda baterai.' },
      'NiO': { name: 'Nikel(II) Oksida', description: 'Bahan pewarna hijau keramik kaca dan anoda sel bahan bakar SOFC.' },
    },
  },

  // 29: Tembaga (Cu)
  29: {
    appearance: 'Logam lunak ulet berwarna cokelat kemerahan mengkilap; konduktor listrik dan panas terbaik kedua setelah perak',
    understanding: {
      simpleTerms: 'Kabel tembaga penghubung aliran listrik dunia, pembasmi kuman alami pada gagang pintu, dan pembuat patung berwarna hijau toska.',
      whyItBehavesThisWay: 'Pengecualian aturan Aufbau: konfigurasi [Ar] 3d¹⁰ 4s¹ lebih disukai karena subkulit d yang terisi penuh sempurna menghasilkan kestabilan elektrostatik yang luar biasa.',
      keyTakeaways: [
        'Konduktor listrik dan panas terbaik di antara semua logam non-mulia komersial.',
        'Logam pertama yang dilebur dan ditempa oleh peradaban manusia (Zaman Tembaga / Kalkolitik, ~5000 SM).',
        'Membentuk lapisan patina hijau toska alami (tembaga karbonat) seperti pada Patung Liberty.',
        'Permukaan logamnya bersifat antimikroba alami yang mematikan bakteri dan virus dalam hitungan menit.',
      ],
    },
    applications: [
      'Kabel transmisi listrik perumahan, kumparan motor listrik, dan trafo daya.',
      'Pipa saluran pipa air bersih dan radiator pemindah panas AC/lemari es.',
      'Paduan kuningan (tembaga-seng) instrumen musik tiup dan perunggu (tembaga-timah).',
      'Papan sirkuit cetak (PCB) pada komputer dan telepon genggam.',
    ],
    biologicalRole: {
      humanImportance: 'Nutrisi mikro esensial; kofaktor enzim sitokrom c oksidase respirasi, lisil oksidase sintesis kolagen, dan transport zat besi.',
      dietarySources: ['Kerang tiram dan udang', 'Hati sapi', 'Kacang mete', 'Cokelat hitam murni', 'Biji wijen'],
    },
    safety: {
      handlingConcerns: 'Logam padat sangat aman; konsumsi garam tembaga dosis tinggi memicu muntah parah dan kerusakan hati (Penyakit Wilson).',
    },
    discovery: {
      discoverer: 'Dikenal sejak peradaban prasejarah (~8000 SM)',
      etymology: 'Simbol Cu dari bahasa Latin "cuprum", dari bahasa Yunani "Kyprios" merujuk ke Pulau Siprus penghasil tembaga kuno.',
    },
    commonIons: {
      'Cu⁺': 'Ion kupro (tembaga I), berkonfigurasi d¹⁰ diamagnetik.',
      'Cu²⁺': 'Ion kupri (tembaga II), larutan airnya berwarna biru langit cerah [Cu(H₂O)₆]²⁺.',
    },
    compounds: {
      'CuSO₄·5H₂O': { name: 'Tembaga(II) Sulfat (Terusi / Blue Vitriol)', description: 'Kristal biru cerah fungisida pertanian (campuran Bordeaux) dan reagen biuret protein.' },
      'CuO': { name: 'Tembaga(II) Oksida', description: 'Pigmen hitam glasir keramik dan katalis industri kimia.' },
    },
  },

  // 30: Seng (Zn)
  30: {
    appearance: 'Logam abu-abu keperakan agak kebiruan; rapuh pada suhu kamar namun dapat ditempa di atas 100 °C',
    understanding: {
      simpleTerms: 'Perisai galvanis pelindung atap seng dari karat dan mikronutrien penjaga sistem kekebalan tubuh dari flu dan batuk.',
      whyItBehavesThisWay: 'Memiliki konfigurasi elektron penuh [Ar] 3d¹⁰ 4s². Melepaskan kedua elektron 4s menyisakan inti 3d¹⁰ yang sangat stabil, sehingga hampir secara eksklusif membentuk ion Zn²⁺.',
      keyTakeaways: [
        'Digunakan luas dalam galvanisasi celup panas untuk melindungi pelat baja konstruksi dari korosi karat.',
        'Membentuk paduan kuningan yang merdu dan tahan gesek saat dicampur dengan tembaga.',
        'Seng adalah komponen aktif sel baterai seng-karbon dan seng-udara.',
        'Mineral esensial bagi fungsi kekebalan tubuh imun, penyembuhan luka kulit, dan indra perasa lidah.',
      ],
    },
    applications: [
      'Galvanisasi pelat baja dan kawat pagar anti-karat (mengorbankan diri melindungi besi).',
      'Pembuatan paduan logam kuningan (brass) untuk keran air dan gembok pintu.',
      'Tabir surya fisik dan salep ruam popok bayi (seng oksida ZnO).',
      'Suplemen tablet hisap pereda gejala selesma/flu dan peningkat imunitas tubuh.',
    ],
    biologicalRole: {
      humanImportance: 'Nutrisi mikro esensial kedua terbanyak di tubuh setelah besi; kofaktor struktural bagi lebih dari 300 enzim dan protein jari seng (zinc finger) pembaca kode DNA.',
      dietarySources: ['Tiram dan daging kepiting', 'Daging sapi', 'Biji labu', 'Kacang polong', 'Telur'],
    },
    safety: {
      handlingConcerns: 'Menghirup uap seng oksida saat mengelas baja galvanis memicu demam uap logam (metal fume fever). Suplemen berlebih jangka panjang mengganggu penyerapan tembaga.',
    },
    discovery: {
      discoverer: 'Andreas Sigismund Marggraf',
      etymology: 'Dari bahasa Jerman "Zinke" yang berarti gerigi runcing atau garpu, mengacu pada bentuk kristal logam seng saat membeku di tungku.',
    },
    commonIons: {
      'Zn²⁺': 'Kehilangan kedua elektron 4s menyisakan konfigurasi d¹⁰ terisi penuh yang tidak berwarna dan diamagnetik.',
    },
    compounds: {
      'ZnO': { name: 'Seng Oksida', description: 'Krim tabir surya pemblokir sinar UV, salep antiseptik kulit, dan aktivator vulkanisasi ban karet.' },
      'ZnSO₄': { name: 'Seng Sulfat', description: 'Suplemen oral pencegah dehidrasi diare berat pada anak dan pupuk mikronutrien seng.' },
    },
  },

  // 31: Galium (Ga)
  31: {
    appearance: 'Logam lunak putih keperakan yang meleleh di telapak tangan pada suhu 29,8 °C',
    understanding: {
      simpleTerms: 'Logam unik yang meleleh menjadi cairan mengkilap di telapak tangan hangat dan menyalakan lampu LED biru semikonduktor.',
      whyItBehavesThisWay: 'Dengan konfigurasi [Ar] 3d¹⁰ 4s² 4p¹, elektron 4p¹ tunggalnya mudah terlepas bersama pasangan 4s² membentuk kation Ga³⁺. Ikatan antarmolekul logam Ga-Ga tergolong lemah sehingga titik lelehnya sangat rendah.',
      keyTakeaways: [
        'Titik leleh 29,76 °C: padat di meja ruangan ber-AC, namun meleleh di telapak tangan manusia.',
        'Mengembang saat membeku (seperti air), sehingga dapat memecahkan wadah kaca penyimpanan.',
        'Galium arsenida (GaAs) dan galium nitrida (GaN) adalah pilar revolusioner semikonduktor kecepatan tinggi dan charger cepat GaN.',
        'Menyerang dan meretakkan struktur kisi aluminium padat secara instan (fenomena perapuhan logam cair).',
      ],
    },
    applications: [
      'Semikonduktor galium nitrida (GaN) untuk adaptor charger cepat ringkas ponsel pintar dan lampu LED efisiensi tinggi.',
      'Cip frekuensi radio galium arsenida (GaAs) untuk radar satelit dan komunikasi sinyal seluler 5G.',
      'Termometer medis nir-merkuri (paduan cair Galinstan: galium-indium-timah).',
    ],
    biologicalRole: {
      humanImportance: 'Tidak esensial bagi tubuh; ion Ga³⁺ meniru ion Fe³⁺ sehingga diuji klinis untuk menghambat bakteri dan mendeteksi tumor kanker tulang.',
      dietarySources: ['Hanya terdapat dalam jumlah renik di alam'],
    },
    safety: {
      handlingConcerns: 'Toksisitas rendah; meninggalkan noda basah mengkilap pada kulit. Jangan biarkan bersentuhan dengan struktur aluminium pesawat.',
    },
    discovery: {
      discoverer: 'Paul-Émile Lecoq de Boisbaudran',
      etymology: 'Dari bahasa Latin "Gallia" yang berarti Prancis (tanah air sang penemu); diprediksi tepat sebelumnya oleh Mendeleev sebagai "eka-aluminium".',
    },
    commonIons: {
      'Ga³⁺': 'Ion galium(III) stabil dengan konfigurasi pseudo-gas mulia [Ar] 3d¹⁰.',
    },
    compounds: {
      'GaN': { name: 'Galium Nitrida', description: 'Semikonduktor celah pita lebar untuk laser biru Blu-ray, lampu LED cerah, dan pengisi daya GaN ultra-cepat.' },
      'GaAs': { name: 'Galium Arsenida', description: 'Semikonduktor fotonika berkecepatan tinggi untuk panel surya efisiensi tertinggi di satelit antariksa.' },
    },
  },

  // 32: Germanium (Ge)
  32: {
    appearance: 'Metaloid kristal putih keabu-abuan keras dan berkilau; transparan terhadap radiasi inframerah termal',
    understanding: {
      simpleTerms: 'Metaloid pembuat transistor pertama di dunia yang kini menjadi mata lensa kamera penglihatan malam inframerah dan kabel serat optik.',
      whyItBehavesThisWay: 'Dengan konfigurasi [Ar] 3d¹⁰ 4s² 4p², celah pita energinya (0,66 eV) sangat sempit, memungkinkan elektron melompat ke pita konduksi pada suhu lebih rendah dibandingkan silikon.',
      keyTakeaways: [
        'Transistor semikonduktor pertama di Laboratorium Bell (1947) dibuat dari kristal germanium, bukan silikon.',
        'Sangat transparan terhadap radiasi cahaya inframerah termal panjang gelombang 2 hingga 14 mikrometer.',
        'Diprediksi secara tepat oleh Dmitri Mendeleev pada tahun 1869 sebagai unsur hipotesis "eka-silikon".',
        'Komponen inti kaca serat optik berindeks bias tinggi untuk kabel internet bawah laut.',
      ],
    },
    applications: [
      'Inti kaca serat optik kemurnian tinggi untuk jaringan transmisi telekomunikasi internet global.',
      'Lensa optik kamera pencitraan termal inframerah dan teropong penglihatan malam (night-vision) militer.',
      'Sel surya fotovoltaik multijungsi efisiensi tertinggi untuk satelit luar angkasa dan wahana Mars Rover.',
      'Katalis polimerisasi plastik botol kemasan minuman PET.',
    ],
    biologicalRole: {
      humanImportance: 'Bukan unsur esensial bagi nutrisi manusia; suplemen germanium organik tidak terbukti secara medis dan berisiko gagal ginjal.',
      dietarySources: ['Konsentrasi renik pada jamur dan gandum'],
    },
    safety: {
      handlingConcerns: 'Germanium padat relatif inert; senyawa gas hidridanya (germanium tetrahidrida GeH₄) sangat mudah terbakar dan toksik.',
    },
    discovery: {
      discoverer: 'Clemens Winkler',
      etymology: 'Dari bahasa Latin "Germania" untuk menghormati tanah air penemu di Jerman; membuktikan keakuratan ramalan tabel periodik Mendeleev.',
    },
    commonIons: {
      'Ge⁴⁺': 'Bentuk tingkat oksidasi dominan pada sebagian besar senyawa germanium stabil.',
    },
    compounds: {
      'GeO₂': { name: 'Germanium Dioksida', description: 'Bahan pembuat inti kabel serat optik kaca telekomunikasi dan lensa mikroskop spesialis.' },
      'SiGe': { name: 'Silikon-Germanium', description: 'Paduan semikonduktor kecepatan ultra-tinggi untuk cip mikroprosesor frekuensi tinggi.' },
    },
  },

  // 33: Arsen (As)
  33: {
    appearance: 'Metaloid abu-abu baja berkilau yang rapuh; menyublim menjadi uap beracun berbau seperti bawang putih saat dipanaskan',
    understanding: {
      simpleTerms: 'Racun legendaris warisan para bangsawan kuno yang kini menjadi komponen cip laser supercepat dan semikonduktor.',
      whyItBehavesThisWay: 'Dengan 5 elektron valensi ([Ar] 3d¹⁰ 4s² 4p³), arsenik dapat mengikat gugus tiol (-SH) pada asam amino sistein, melumpuhkan enzim siklus Krebs respirasi seluler.',
      keyTakeaways: [
        'Dikenal sepanjang sejarah sebagai "Raja Segala Racun" ("Inheritance Powder") karena tidak berasa dan sulit dideteksi pada masa kuno.',
        'Menyublim langsung dari padat menjadi gas pada 615 °C tanpa meleleh pada tekanan atmosfer standar.',
        'Semikonduktor senyawa Galium Arsenida (GaAs) mengubah arus listrik menjadi laser dengan efisiensi tinggi.',
        'Kontaminasi alami arsenik pada air tanah adalah masalah kesehatan lingkungan serius di berbagai belahan dunia.',
      ],
    },
    applications: [
      'Semikonduktor galium arsenida (GaAs) pada pemancar gelombang mikro ponsel dan dioda laser inframerah.',
      'Bahan dopan tipe-n dalam fabrikasi semikonduktor mikrocip silikon.',
      'Pengawet kayu industri (arsenat tembaga terkromasi / CCA) terhadap rayap dan jamur pembusuk.',
      'Obat kemoterapi kanker darah leukemia promielositik akut (arsenik trioksida As₂O₃).',
    ],
    biologicalRole: {
      humanImportance: 'Sangat beracun bagi manusia; menghambat produksi ATP mitokondria. Beberapa mikroorganisme ekstremofil mampu menggunakan arsenik dalam metabolisme respirasinya.',
      dietarySources: ['Konsentrasi renik alami pada makanan laut dan beras sawah'],
    },
    safety: {
      handlingConcerns: 'Senyawa arsenik bersifat karsinogenik kuat dan racun mematikan akut. Hindari kontak kulit, debu, atau menghirup uapnya.',
    },
    discovery: {
      discoverer: 'Albertus Magnus',
      etymology: 'Dari bahasa Yunani "arsenikon" atau bahasa Persia kuno "zarnik" yang berarti pigmen kuning keemasan (mineral orpimen).',
    },
    commonIons: {
      'As³⁻': 'Ion arsenida dalam senyawa antarmetalik semi-konduktor.',
      'AsO₄³⁻': 'Ion arsenat yang meniru gugus fosfat dan meracuni reaksi seluler biokimia.',
    },
    compounds: {
      'As₂O₃': { name: 'Arsenik Trioksida', description: 'Racun arsenik bubuk putih klasik dan obat kemoterapi kanker leukemia modern.' },
      'GaAs': { name: 'Galium Arsenida', description: 'Kristal semikonduktor optoelektronika untuk laser serat optik dan panel surya wahana antariksa.' },
    },
  },

  // 34: Selenium (Se)
  34: {
    appearance: 'Padatan metaloid hitam berkilau, merah amorf, atau abu-abu heksagonal; menghantarkan listrik lebih baik saat terkena cahaya',
    understanding: {
      simpleTerms: 'Unsur peka cahaya yang membuka sensor mesin fotokopi dan antioksidan vital penangkal radikal bebas perusak sel tubuh kita.',
      whyItBehavesThisWay: 'Dengan 6 elektron valensi ([Ar] 3d¹⁰ 4s² 4p⁴), selenium menunjukkan sifat fotokonduktivitas: konduktivitas listriknya melonjak tajam saat menyerap foton cahaya tampak.',
      keyTakeaways: [
        'Fotokonduktif: semakin terang terkena cahaya, semakin lancar menghantarkan arus listrik (dasar mesin fotokopi xerografi awal).',
        'Antioksidan esensial bagi enzim glutation peroksidase pelindung sel dari kerusakan radikal bebas.',
        'Mewarnai kaca menjadi merah delima cemerlang dan menghilangkan semburat kehijauan pada kaca botol.',
        'Bahan aktif sampo antiketombe (selenium disulfida SeS₂).',
      ],
    },
    applications: [
      'Drum fotoreseptor fotosensitif pada mesin fotokopi xerografi laser dan sel fotolistrik.',
      'Sampo obat antiketombe dan obat antijamur kulit panu (selenium disulfida).',
      'Pewarna kaca merah rubi lampu lalu lintas dan dekolorisasi kaca jendela jernih.',
      'Sel surya film tipis tembaga indium galium diselenida (CIGS).',
    ],
    biologicalRole: {
      humanImportance: 'Nutrisi mikro esensial penyusun asam amino selenositein (asam amino ke-21) dalam enzim antioksidan glutation peroksidase dan enzim pengaktif hormon tiroid.',
      dietarySources: ['Kacang brazil (sumber terkaya)', 'Ikan tuna dan sarden', 'Daging sapi', 'Telur ayam', 'Biji bunga matahari'],
    },
    safety: {
      handlingConcerns: 'Batas antara dosis esensial dan dosis toksik selenium sangat sempit. Keracunan selenium (selenosis) menyebabkan rambut rontok dan bau napas bawang putih.',
    },
    discovery: {
      discoverer: 'Jöns Jacob Berzelius',
      etymology: 'Dari bahasa Yunani "Selene" (Dewi Bulan), dinamai berpasangan dengan telurium (dari bahasa Latin "Tellus" yang berarti Bumi).',
    },
    commonIons: {
      'Se²⁻': 'Ion selenida dengan konfigurasi oktet kripton [Kr].',
      'SeO₄²⁻': 'Ion selenat yang larut dalam air tanah.',
    },
    compounds: {
      'SeS₂': { name: 'Selenium Disulfida', description: 'Zat aktif antijamur pada sampo medis pengontrol ketombe dan dermatitis seboroik.' },
      'Na₂SeO₃': { name: 'Natrium Selenit', description: 'Suplemen nutrisi pakan ternak dan premiks vitamin manusia.' },
    },
  },

  // 35: Bromin (Br)
  35: {
    appearance: 'Cairan kental berwarna merah kecokelatan gelap yang menguap dengan cepat menjadi gas mencekik berbau busuk tajam',
    understanding: {
      simpleTerms: 'Satu-satunya unsur nonlogam cair di tabel periodik; cairan merah berasap yang memadamkan api dan menciptakan film fotografi hitam-putih.',
      whyItBehavesThisWay: 'Dengan 7 elektron valensi ([Ar] 3d¹⁰ 4s² 4p⁵), bromin adalah halogen yang membutuhkan 1 elektron untuk stabil. Gaya tarik dispersi London antarmolekul Br₂ cukup kuat untuk menjadikannya cair pada suhu kamar.',
      keyTakeaways: [
        'Satu-satunya unsur nonlogam yang berwujud cair pada suhu dan tekanan standar (bersama raksa sebagai satu-satunya unsur cair lainnya).',
        'Menguap sangat cepat pada suhu kamar menghasilkan uap gas cokelat kemerahan beracun yang menyesakkan dada.',
        'Senyawa perak bromida (AgBr) adalah dasar penemu fotografi film analog hitam-putih tradisional.',
        'Bahan tahan api terhalogenasi (BFR) yang dicampurkan ke plastik elektronik agar tidak mudah terbakar.',
      ],
    },
    applications: [
      'Bahan penghambat nyala api (flame retardants) pada casing plastik TV, komputer, dan busa jok mobil.',
      'Emulsi peka cahaya garam perak bromida (AgBr) pada film fotografi analog klasik.',
      'Cairan pengeboran sumur minyak dan gas bumi berdensitas tinggi (larutan kalsium bromida).',
      'Zat antara sintesis bahan kimia pertanian herbisida dan obat-obatan sedatif bromida.',
    ],
    biologicalRole: {
      humanImportance: 'Nutrisi mikro esensial baru yang berperan dalam perakitan jaringan kolagen membran basal ginjal melalui enzim peroksinasik.',
      dietarySources: ['Garam laut alami', 'Makanan laut kerang dan ikan', 'Kacang-kacangan'],
    },
    safety: {
      handlingConcerns: 'Cairan dan uap bromin menyebabkan luka bakar kimiawi parah pada kulit yang sulit sembuh. Uapnya merusak paru-paru secara akut.',
    },
    discovery: {
      discoverer: 'Antoine Jérôme Balard',
      etymology: 'Dari bahasa Yunani "bromos" yang berarti bau busuk menyengat, merujuk pada bau uapnya yang menusuk hidung.',
    },
    commonIons: {
      'Br⁻': 'Ion bromida dengan konfigurasi gas mulia kripton [Kr] yang stabil.',
    },
    compounds: {
      'AgBr': { name: 'Perak Bromida', description: 'Kristal kuning pucat fotosensitif pembentuk bayangan laten pada film fotografi analog.' },
      'HBr': { name: 'Asam Bromida', description: 'Asam kuat industri kimia untuk sintesis senyawa bromoorganik farmasi.' },
    },
  },

  // 36: Kripton (Kr)
  36: {
    appearance: 'Gas mulia tidak berwarna dan tidak berbau; memancarkan pendar putih kebiruan dingin yang tajam dalam tabung lucutan',
    understanding: {
      simpleTerms: 'Gas mulia bercahaya putih dingin pengisi lampu landasan pacu bandara dan standar penentu panjang meter internasional dahulu kala.',
      whyItBehavesThisWay: 'Memiliki konfigurasi oktet penuh [Ar] 3d¹⁰ 4s² 4p⁶ yang luar biasa stabil. Namun, karena elektron kulit terluarnya berada pada tingkat n=4 yang cukup jauh dari inti, kripton dapat bereaksi dengan unsur paling elektronegatif seperti fluorin.',
      keyTakeaways: [
        'Cahaya pendar putih kebiruan tajamnya dapat menembus kabut tebal di landasan pacu bandara udara internasional.',
        'Antara tahun 1960 dan 1983, satuan resmi 1 meter internasional didefinisikan berdasarkan panjang gelombang spektrum emisi Kripton-86 (⁸⁶Kr).',
        'Gas pengisi lampu blitz kamera fotografi berkecepatan tinggi.',
        'Mampu membentuk senyawa kimia langka stabil seperti kripton difluorida (KrF₂).',
      ],
    },
    applications: [
      'Lampu strobo blitz fotografi kecepatan tinggi dan pencahayaan lampu pendarat darurat bandar udara.',
      'Pengisi celah isolator kaca jendela ganda termal bangunan hemat energi (lebih baik dari argon).',
      'Laser eksimer kripton fluorida (KrF) untuk litografi semikonduktor beresolusi tinggi.',
      'Pemeriksaan ventilasi paru-paru medis menggunakan gas pelacak isotopik Kripton-81m.',
    ],
    biologicalRole: {
      humanImportance: 'Gas mulia lembam tanpa fungsi biologis atau fisiologis alami dalam tubuh manusia.',
      dietarySources: ['Tidak terdapat dalam makanan; gas mulia lembam'],
    },
    safety: {
      handlingConcerns: 'Tidak beracun; dapat bertindak sebagai gas pencekik di ruang tertutup yang menggeser kadar oksigen udara.',
    },
    discovery: {
      discoverer: 'Sir William Ramsay & Morris Travers',
      etymology: 'Dari bahasa Yunani "kryptos" yang berarti tersembunyi, karena sangat sulit dideteksi di dalam residu udara cair.',
    },
    commonIons: {},
    compounds: {
      'KrF₂': { name: 'Kripton Difluorida', description: 'Zat padat kristal putih oksidator fluorinasi superkuat yang hanya stabil di bawah -30 °C.' },
    },
  },
};
