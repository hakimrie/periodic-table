import type { ElementTranslationId } from './types';

export const period3TranslationsId: Record<number, ElementTranslationId> = {
  // 11: Natrium (Na)
  11: {
    appearance: 'Logam lunak berwarna putih keperakan; mudah dipotong dengan pisau dan bereaksi dahsyat dengan air',
    understanding: {
      simpleTerms: 'Logam alkali lunak yang jika bercampur klorin beracun membentuk garam dapur gurih yang kita makan setiap hari.',
      whyItBehavesThisWay: 'Memiliki 1 elektron valensi pada orbital 3s di luar inti stabil neon ([Ne] 3s¹). Kehilangan elektron tunggal ini memerlukan energi sangat kecil, menjadikannya sangat elektropositif dan reaktif.',
      keyTakeaways: [
        'Dapat dipotong seperti mentega menggunakan pisau tumpul.',
        'Bereaksi eksotermik eksplosif dengan air menghasilkan gas hidrogen dan natrium hidroksida (NaOH).',
        'Ion Na⁺ adalah kation ekstraseluler utama yang mengendalikan tekanan osmotik darah dan transmisi impuls saraf.',
        'Membakar dengan nyala api kuning-oranye terang benderang (digunakan pada lampu jalan uap natrium).',
      ],
    },
    applications: [
      'Garam dapur (NaCl) untuk penyedap makanan dan pengawetan pangan.',
      'Sintesis soda api (NaOH) dan soda abu (Na₂CO₃) dalam pembuatan sabun, detergen, dan kertas.',
      'Lampu penerangan jalan raya uap natrium bertekanan rendah berwarna kuning.',
      'Pendingin logam cair pada reaktor pembiak cepat nuklir (fast breeder reactor).',
    ],
    biologicalRole: {
      humanImportance: 'Elektrolit ekstraseluler terpenting dalam tubuh manusia; mengatur volume cairan darah, tekanan darah, gradien membran sel, dan perambatan sinyal saraf listrik.',
      dietarySources: ['Garam meja dapur', 'Makanan laut', 'Kecap asin', 'Keju', 'Olahan makanan bergaram'],
    },
    safety: {
      handlingConcerns: 'Bereaksi meledak dengan air dan terbakar di udara lembap. Simpan di bawah minyak mineral kering.',
    },
    discovery: {
      discoverer: 'Humphry Davy',
      etymology: 'Simbol Na berasal dari bahasa Latin "natrium" (merujuk ke garam natron Mesir kuno); kata "sodium" dari bahasa Arab "suda" (sakit kepala).',
    },
    commonIons: {
      'Na⁺': 'Kehilangan elektron valensi 3s untuk mencapai konfigurasi oktet stabil neon [Ne].',
    },
    compounds: {
      'NaCl': { name: 'Natrium Klorida (Garam Dapur)', description: 'Bahan penyedap makanan penting dan elektrolit fisiologis utama cairan tubuh.' },
      'NaHCO₃': { name: 'Natrium Bikarbonat (Soda Kue)', description: 'Bahan pengembang adonan roti dan antasida penetral asam lambung.' },
      'NaOH': { name: 'Natrium Hidroksida (Soda Api)', description: 'Basa kuat industri untuk pembuatan sabun dan pembersih saluran pipa tersumbat.' },
    },
  },

  // 12: Magnesium (Mg)
  12: {
    appearance: 'Logam abu-abu keperakan mengkilap yang ringan; menyala dengan cahaya putih menyilaukan saat dibakar',
    understanding: {
      simpleTerms: 'Logam ringan yang menyalakan kembang api putih menyilaukan dan menjadi inti molekul klorofil hijau pada daun tanaman.',
      whyItBehavesThisWay: 'Dengan 2 elektron valensi (3s²), magnesium melepaskan kedua elektronnya untuk membentuk kation divalen Mg²⁺ yang stabil dengan jari-jari ion kecil dan muatan tinggi.',
      keyTakeaways: [
        'Logam struktural paling ringan ketiga (densitas hanya 1,74 g/cm³).',
        'Menyala di udara dengan nyala api putih terang menyilaukan mata yang kaya radiasi ultraviolet.',
        'Atom pusat molekul klorofil yang menangkap energi foton matahari dalam fotosintesis.',
        'Kofaktor esensial bagi lebih dari 300 reaksi enzim metabolisme ATP di dalam tubuh.',
      ],
    },
    applications: [
      'Paduan logam ringan berkekuatan tinggi dengan aluminium untuk suku cadang mobil dan bodi laptop/kamera.',
      'Piroteknik, kembang api putih cemerlang, dan suar keselamatan maritim.',
      'Obat antasida magnesia dan obat pencahar lambung (susu magnesia).',
      'Anoda korban (galvanik) untuk melindungi pipa bawah tanah dan lambung kapal dari korosi karat.',
    ],
    biologicalRole: {
      humanImportance: 'Unsur mineral makro esensial; berikatan dengan molekul energi seluler ATP agar aktif secara biologis. Memelihara fungsi otot, ritme jantung, dan sintesis DNA.',
      dietarySources: ['Sayuran hijau (klorofil)', 'Biji labu dan kuaci', 'Kacang almond', 'Cokelat hitam', 'Biji-bijian utuh'],
    },
    safety: {
      handlingConcerns: 'Pita atau bubuk magnesium yang terbakar tidak boleh disiram air (karena memecah air menghasilkan gas hidrogen eksplosif); gunakan pasir kering atau pemadam Kelas D.',
    },
    discovery: {
      discoverer: 'Joseph Black & Humphry Davy',
      etymology: 'Dinamai dari nama distrik Magnesia di Thessalia, Yunani kuno.',
    },
    commonIons: {
      'Mg²⁺': 'Kehilangan kedua elektron 3s membentuk ion bermuatan ganda dengan konfigurasi neon [Ne].',
    },
    compounds: {
      'MgO': { name: 'Magnesium Oksida (Magnesia)', description: 'Bata tahan api tungku peleburan baja suhu tinggi dan antasida lambung.' },
      'MgSO₄·7H₂O': { name: 'Garam Epsom (Magnesium Sulfat)', description: 'Garam rendam relaksasi otot dan suplemen mineral tanaman.' },
      'Mg(OH)₂': { name: 'Magnesium Hidroksida', description: 'Suspensi antasida pereda sakit maag (susu magnesia).' },
    },
  },

  // 13: Aluminium (Al)
  13: {
    appearance: 'Logam putih keperakan mengkilap, ringan, tidak berkarat, dan sangat mudah ditempa',
    understanding: {
      simpleTerms: 'Logam paling melimpah di kerak Bumi; membentuk badan pesawat terbang modern, kaleng minuman, dan foil dapur.',
      whyItBehavesThisWay: 'Memiliki 3 elektron valensi (3s² 3p¹). Melepaskan ketiga elektronnya membentuk kation Al³⁺. Di udara, langsung membentuk lapisan pasivasi Al₂O₃ transparan setebal beberapa nanometer yang kebal karat.',
      keyTakeaways: [
        'Logam paling melimpah di kerak Bumi (~8,1% berdasarkan massa).',
        'Massa jenis ringan (~2,70 g/cm³, hanya sepertiga massa jenis besi atau baja).',
        'Membentuk lapisan oksida alami yang sangat melindungi dari korosi karat lebih lanjut.',
        'Mendaur ulang kaleng aluminium hanya membutuhkan 5% energi dibanding mengekstraksi dari bijih bauksit.',
      ],
    },
    applications: [
      'Struktur badan dan sayap pesawat terbang komersial serta wahana antariksa.',
      'Kaleng minuman kemasan ringan dan kertas aluminium foil dapur.',
      'Kabel transmisi listrik saluran udara tegangan tinggi (SUTET) karena ringan dan konduktif.',
      'Kusen jendela, profil arsitektur gedung pencakar langit, dan velg roda otomotif.',
    ],
    biologicalRole: {
      humanImportance: 'Bukan unsur esensial bagi tubuh manusia; diekskresikan melalui ginjal. Paparan berlebih jangka panjang dapat terakumulasi di jaringan tulang dan saraf.',
      dietarySources: ['Konsentrasi renik alami dalam air minum dan sayuran'],
    },
    safety: {
      handlingConcerns: 'Logam padat aman dan tidak beracun; bubuk halus aluminium dapat memicu ledakan debu di udara jika tersulut.',
    },
    discovery: {
      discoverer: 'Hans Christian Ørsted',
      etymology: 'Dari bahasa Latin "alumen" yang berarti garam tawas, dinamai oleh Humphry Davy.',
    },
    commonIons: {
      'Al³⁺': 'Kehilangan ketiga elektron valensi (3s² 3p¹) membentuk kation dengan konfigurasi gas mulia [Ne].',
    },
    compounds: {
      'Al₂O₃': { name: 'Aluminium Oksida (Alumina / Safir / Korundum)', description: 'Keramik abrasif sangat keras, komponen batu permata safir dan rubi.' },
      'AlCl₃': { name: 'Aluminium Klorida', description: 'Katalis asam Lewis utama dalam sintesis kimia alkilasi Friedel-Crafts.' },
      'KAl(SO₄)₂·12H₂O': { name: 'Tawas Kalium Aluminium', description: 'Koagulan penjernih air keruh dan deodoran alami tradisional.' },
    },
  },

  // 14: Silikon (Si)
  14: {
    appearance: 'Metaloid kristal abu-abu tua kebiruan dengan kilau logam mengkilap; keras dan rapuh',
    understanding: {
      simpleTerms: 'Jantung revolusi era digital modern; bahan dasar mikrocip komputer, panel surya surya, dan pasir pantai.',
      whyItBehavesThisWay: 'Dengan 4 elektron valensi (3s² 3p²), silikon membentuk kisi kristal intan semi-konduktor. Celah pitanya (1,1 eV) sangat ideal untuk kendali arus listrik pada transistor.',
      keyTakeaways: [
        'Unsur paling melimpah kedua di kerak Bumi (~27,7% massa) setelah oksigen.',
        'Bahan baku semikonduktor dari 90%+ cip komputasi, prosesor, memori, dan panel surya dunia.',
        'Membentuk mineral silikat (SiO₄⁴⁻) yang menyusun 90% mineral batuan kerak Bumi.',
        'Silikon (unsur Si) berbeda dengan silikon polimer sintetis (silicone) untuk karet dan kosmetik.',
      ],
    },
    applications: [
      'Wafer semikonduktor kemurnian tinggi (99,9999999%) untuk prosesor komputer dan mikrocip.',
      'Sel surya fotovoltaik silikon monokristalin dan polikristalin untuk pembangkit listrik tenaga surya.',
      'Polimer silikon (silicone) untuk sealent tahan panas, implant medis, dan perlengkapan dapur.',
      'Ferrosilikon untuk deoksidasi dalam industri metalurgi peleburan baja.',
    ],
    biologicalRole: {
      humanImportance: 'Nutrisi mikro yang berperan dalam sintesis kolagen, integritas jaringan ikat tulang rawan, serta kekuatan kuku dan rambut. Penting bagi dinding sel diatom ganggang laut.',
      dietarySources: ['Gandum utuh', 'Beras merah', 'Oatmeal', 'Kacang hijau', 'Mentimun'],
    },
    safety: {
      handlingConcerns: 'Silikon kristal padat tidak beracun; menghirup debu silika bebas (SiO₂) kronis menyebabkan penyakit paru silikosis irreversibel.',
    },
    discovery: {
      discoverer: 'Jöns Jacob Berzelius',
      etymology: 'Dari bahasa Latin "silex" atau "silicis" yang berarti batu api (flint).',
    },
    commonIons: {
      'Si⁴⁻': 'Ion silisida dalam senyawa intermetalik dengan logam elektropositif.',
    },
    compounds: {
      'SiO₂': { name: 'Silikon Dioksida (Silika / Kuarsa)', description: 'Pasir kuarsa bahan baku utama kaca jendela, serat optik, dan botol.' },
      'SiC': { name: 'Silikon Karbida (Karborundum)', description: 'Semikonduktor daya generasi baru tahan suhu tinggi dan bahan abrasif superkeras.' },
      'SiH₄': { name: 'Silan', description: 'Gas piroforik yang digunakan dalam deposisi uap kimia film silikon semikonduktor.' },
    },
  },

  // 15: Fosfor (P)
  15: {
    appearance: 'Alotrop putih lilin tembus pandang yang menyala dalam gelap (fosforesen), atau bubuk merah tua stabil',
    understanding: {
      simpleTerms: 'Unsur bercahaya misterius penyusun tulang, gigi, dan molekul pembawa kode genetik DNA kita.',
      whyItBehavesThisWay: 'Dengan 5 elektron valensi (3s² 3p³), fosfor memiliki subkulit 3p terisi setengah penuh dan dapat memperluas kulit valensinya melibatkan orbital 3d (hipervalensi, seperti PCl₅).',
      keyTakeaways: [
        'Fosfor putih menyala hijau pucat di udara gelap karena kemiluminesensi lambat.',
        'Fosfor merah jauh lebih stabil dan digunakan pada kepala korek api gesek.',
        'Membentuk tulang punggung fosfodiester heliks ganda DNA dan RNA.',
        'Molekul ATP (Adenosin Trifosfat) adalah mata uang energi biokimia seluruh sel hidup.',
      ],
    },
    applications: [
      'Pupuk fosfat pertanian (NPK, TSP, DAP) esensial untuk ketahanan pangan global.',
      'Kepala korek api gesek aman dan bahan piroteknik suar militer.',
      'Bahan tahan api sintetis dan pelumas industri aditif tekanan ekstrem.',
      'Sintesis asam fosfat industri untuk minuman berkarbonasi kola dan pembersih karat.',
    ],
    biologicalRole: {
      humanImportance: 'Unsur mineral paling melimpah kedua dalam tubuh manusia (~1% berat badan). Menyusun kalsium fosfat tulang dan gigi, fosfolipid membran sel, serta molekul energi ATP.',
      dietarySources: ['Ikan dan makanan laut', 'Daging ayam dan sapi', 'Telur', 'Susu dan keju', 'Kacang-kacangan'],
    },
    safety: {
      handlingConcerns: 'Fosfor putih sangat mematikan, terbakar spontan di udara pada 30 °C, dan uapnya merusak tulang rahang ("phossy jaw"). Simpan selalu di bawah air.',
    },
    discovery: {
      discoverer: 'Hennig Brand',
      etymology: 'Dari bahasa Yunani "phosphoros" yang berarti pembawa cahaya (Bintang Fajar), karena kemampuannya menyala dalam gelap.',
    },
    commonIons: {
      'P³⁻': 'Ion fosfida dengan konfigurasi oktet stabil [Ar].',
      'PO₄³⁻': 'Anion fosfat poliatomik universal dalam biologi dan mineral batuan.',
    },
    compounds: {
      'H₃PO₄': { name: 'Asam Fosfat', description: 'Pengasam rasa tajam pada minuman soda kola dan pengawet asam makanan.' },
      'Ca₃(PO₄)₂': { name: 'Kalsium Fosfat', description: 'Mineral penyusun utama matriks keras tulang rangka dan gigi mamalia.' },
      'P₄O₁₀': { name: 'Fosfor Pentoksida', description: 'Zat dehidrator pengering paling kuat dalam kimia organik sintesis.' },
    },
  },

  // 16: Belerang (S)
  16: {
    appearance: 'Padatan kristal kuning terang cerah, rapuh, tidak berbau saat murni; membakar dengan nyala biru menghasilkan gas SO₂ menyengat',
    understanding: {
      simpleTerms: 'Kristal kuning terang dari gunung berapi yang menghasilkan asam sulfat—zat kimia paling banyak diproduksi umat manusia.',
      whyItBehavesThisWay: 'Dengan 6 elektron valensi (3s² 3p⁴), belerang membentuk cincin korona delapan atom yang stabil (S₈). Belerang dapat memperluas kulit valensinya membentuk bilangan oksidasi hingga +6 (seperti SF₆).',
      keyTakeaways: [
        'Membentuk molekul cincin mahkota kuning S₈ pada suhu kamar.',
        'Membentuk ikatan disulfida (S-S) yang menentukan lipatan protein keratin rambut dan kuku.',
        'Asam sulfat (H₂SO₄) adalah komoditas kimia terbesar di dunia dan indikator kekuatan industri negara.',
        'Proses vulkanisasi belerang mengubah getah karet alam lengket menjadi ban kendaraan yang elastis dan tangguh.',
      ],
    },
    applications: [
      'Produksi asam sulfat (H₂SO₄) industri untuk pembuatan pupuk, baterai aki, dan pengolahan bijih tambang.',
      'Vulkanisasi karet getah alam untuk pembuatan ban kendaraan bermotor tahan gesek.',
      'Obat antijerawat dermatologis, sabun belerang antibakteri, dan fungisida kebun.',
      'Pembuatan bubuk mesiu mesiu hitam klasik (bubuk mesiu: belerang, arang, sendawa).',
    ],
    biologicalRole: {
      humanImportance: 'Unsur esensial penyusun dua asam amino krusial: metionin dan sistein. Jembatan disulfida memberikan kekuatan struktural pada keratin rambut, kulit, dan hormon insulin.',
      dietarySources: ['Bawang putih dan bawang bombay', 'Telur', 'Brokoli dan kubis', 'Daging sapi dan ikan'],
    },
    safety: {
      handlingConcerns: 'Belerang padat relatif tidak berbahaya; namun gas hidrogen sulfida (H₂S, bau telur busuk) dan sulfur dioksida (SO₂) sangat beracun dan mematikan pada konsentrasi tinggi.',
    },
    discovery: {
      discoverer: 'Dikenal sejak zaman kuno (disebut "brimstone" dalam naskah Alkitab kuno)',
      etymology: 'Dari bahasa Sanskerta "sulvere" dan bahasa Latin "sulfur" yang berarti belerang batu api belerang.',
    },
    commonIons: {
      'S²⁻': 'Ion sulfida dengan konfigurasi oktet [Ar].',
      'SO₄²⁻': 'Anion sulfat tetrahedral poliatomik stabil.',
    },
    compounds: {
      'H₂SO₄': { name: 'Asam Sulfat', description: 'Asam mineral pekat industri paling banyak diproduksi di dunia dan cairan elektrolit aki.' },
      'H₂S': { name: 'Hidrogen Sulfida', description: 'Gas berbau khas telur busuk yang sangat beracun dari kawah vulkanik dan pembusukan selokan.' },
      'SO₂': { name: 'Sulfur Dioksida', description: 'Gas pengawet antioksidan anggur dan emisi pembakaran batu bara penyebab hujan asam.' },
    },
  },

  // 17: Klorin (Cl)
  17: {
    appearance: 'Gas diatomik kuning kehijauan dengan bau menyengat mencekik dan massa jenis 2,5 kali lebih berat dari udara',
    understanding: {
      simpleTerms: 'Gas kuning kehijauan pembersih kuman kolam renang yang menyelamatkan jutaan nyawa melalui klorinasi air minum bersih.',
      whyItBehavesThisWay: 'Dengan 7 elektron valensi (3s² 3p⁵) dan afinitas elektron tertinggi dari seluruh tabel periodik (349 kJ/mol), klorin sangat mudah menangkap 1 elektron membentuk ion klorida (Cl⁻) stabil.',
      keyTakeaways: [
        'Memiliki afinitas elektron tertinggi di antara semua unsur kimia.',
        'Klorinasi air minum adalah salah satu pencapaian sanitasi kesehatan masyarakat terbesar abad ke-20.',
        'Penyusun polimer plastik pipa paralon PVC (Polivinil Klorida) yang digunakan di seluruh dunia.',
        'Asam lambung manusia mengandung HCl konsentrasi ~0,5% untuk membunuh patogen dan mencerna protein.',
      ],
    },
    applications: [
      'Disinfeksi dan klorinasi air minum PDAM serta sterilisasi kolam renang dari bakteri patogen.',
      'Produksi plastik polivinil klorida (PVC) untuk pipa saluran air dan kusen bangunan.',
      'Bahan pemutih pakaian dan disinfektan rumah tangga (natrium hipoklorit NaOCl).',
      'Sintesis industri pelarut terklorinasi dan obat-obatan farmasi.',
    ],
    biologicalRole: {
      humanImportance: 'Anion ekstraseluler utama (Cl⁻) dalam cairan tubuh mamalia; memelihara netralitas listrik sel, tekanan osmotik, serta komponen utama asam lambung hidroklorida (HCl).',
      dietarySources: ['Garam dapur (NaCl)', 'Rumput laut', 'Tomat', 'Zaitun', 'Makanan olahan gurih'],
    },
    safety: {
      handlingConcerns: 'Gas klorin adalah zat toksik parah yang merusak mukosa paru-paru memicu edema paru fatal. Jangan pernah mencampur pemutih klorin dengan cairan asam atau amonia.',
    },
    discovery: {
      discoverer: 'Carl Wilhelm Scheele',
      etymology: 'Dari bahasa Yunani "chloros" yang berarti kuning kehijauan pucat, dinamai oleh Humphry Davy pada tahun 1810.',
    },
    commonIons: {
      'Cl⁻': 'Ion klorida dengan konfigurasi oktet penuh argon [Ar] yang sangat stabil.',
    },
    compounds: {
      'NaCl': { name: 'Natrium Klorida', description: 'Garam meja esensial bagi rasa masakan dan keseimbangan biologis.' },
      'HCl': { name: 'Asam Klorida', description: 'Asam kuat lambung pencerna makanan dan zat kimia pengetsa logam industri.' },
      'NaOCl': { name: 'Natrium Hipoklorit', description: 'Zat aktif cairan pemutih pakaian dan disinfektan pembasmi kuman virus.' },
    },
  },

  // 18: Argon (Ar)
  18: {
    appearance: 'Gas mulia tidak berwarna, tidak berbau, dan tidak berasa; berpendar biru-ungu dingin dalam lucutan tabung vakum',
    understanding: {
      simpleTerms: 'Gas mulia paling melimpah di udara kita; selimut gas lembam pelindung filamen lampu pijar dan pengelasan logam.',
      whyItBehavesThisWay: 'Dengan oktet valensi 3s² 3p⁶ yang terisi penuh sempurna, argon tidak memiliki elektron tak berpasangan maupun kekosongan orbital berenergi rendah, menjadikannya sangat lembam.',
      keyTakeaways: [
        'Gas paling melimpah ketiga di atmosfer Bumi (0,934% volume), jauh lebih melimpah daripada CO₂.',
        'Sebagian besar argon atmosfer berasal dari peluruhan radioaktif Kalium-40 (⁴⁰K) di dalam batuan Bumi.',
        'Digunakan dalam penanggalan geologi Kalium-Argon (K-Ar) untuk menentukan usia batuan vulkanik jutaan tahun.',
        'Gas pelindung las yang mencegah oksidasi logam titanium dan baja panas.',
      ],
    },
    applications: [
      'Gas pelindung lembam pada pengelasan busur gas tungsten (TIG/MIG) untuk paduan logam reaktif.',
      'Pengisi ruang hampa kaca jendela ganda isolator termal dan bola lampu pijar filamen.',
      'Penanggalan geokronologi Kalium-Argon batuan mineral letusan gunung purba.',
      'Laser argon biru-hijau untuk fotokoagulasi retina medis mata dan spektrometri plasma (ICP-OES).',
    ],
    biologicalRole: {
      humanImportance: 'Lembam secara fisiologis dan kimiawi tanpa peran biokimiawi alami dalam organisme hidup.',
      dietarySources: ['Tidak terdapat dalam makanan; gas mulia lembam'],
    },
    safety: {
      handlingConcerns: 'Tidak beracun; gas bertekanan di ruang kedap dapat bertindak sebagai gas pencekik yang menggeser kadar oksigen udara.',
    },
    discovery: {
      discoverer: 'Lord Rayleigh & Sir William Ramsay',
      etymology: 'Dari bahasa Yunani "argos" yang berarti malas atau tidak aktif, merujuk pada kelembaman kimianya yang total.',
    },
    commonIons: {},
    compounds: {
      'HArF': { name: 'Argon Fluorohidrida', description: 'Satu-satunya senyawa argon netral yang diketahui, hanya stabil pada suhu kriogenik ekstrem di bawah 27 K.' },
    },
  },
};
