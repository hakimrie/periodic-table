import type { ElementTranslationId } from './types';

export const period2TranslationsId: Record<number, ElementTranslationId> = {
  // 3: Litium (Li)
  3: {
    appearance: 'Logam lunak berwarna putih keperakan; cepat terkorosi kusam di udara dan bereaksi dengan air',
    understanding: {
      simpleTerms: 'Logam paling ringan dan unsur padat berdensitas paling rendah di Bumi; dapat mengapung di atas air sambil bereaksi dengannya.',
      whyItBehavesThisWay: 'Memiliki 1 elektron valensi yang jauh dari inti dan terlindungi oleh inti 1s², menghasilkan energi ionisasi yang sangat rendah dan elektropositivitas yang tinggi.',
      keyTakeaways: [
        'Unsur padat paling ringan (densitas sekitar setengah dari massa jenis air).',
        'Sangat krusial untuk baterai litium-ion isi ulang modern pada ponsel pintar dan kendaraan listrik.',
        'Digunakan dalam psikiatri (litium karbonat) sebagai penstabil suasana hati (mood stabilizer).',
        'Membakar dengan nyala api merah tua (crimson) yang khas.',
      ],
    },
    applications: [
      'Bahan katoda dan elektrolit pada baterai litium-ion untuk perangkat elektronik dan kendaraan listrik.',
      'Obat farmasi penstabil suasana hati untuk gangguan bipolar.',
      'Pelumas gemuk berkinerja tinggi (litium stearat).',
      'Kaca dan keramik khusus tahan panas (misalnya cermin teleskop astronomi).',
    ],
    biologicalRole: {
      humanImportance: 'Hadir dalam konsentrasi renik di tubuh manusia; membantu memodulasi transmisi neurotransmiter di otak.',
      dietarySources: ['Air tanah alami', 'Sayuran dan biji-bijian dalam jumlah renik'],
    },
    safety: {
      handlingConcerns: 'Bereaksi eksotermik dengan air menghasilkan gas hidrogen yang mudah terbakar dan larutan basa kuat LiOH yang korosif. Simpan di bawah minyak mineral.',
    },
    discovery: {
      discoverer: 'Johan August Arfwedson',
      etymology: 'Dari bahasa Yunani "lithos" yang berarti batu, mencerminkan penemuannya di dalam mineral bijih batuan alih-alih abu tanaman.',
    },
    commonIons: {
      'Li⁺': 'Kehilangan elektron valensi 2s tunggalnya untuk mencapai konfigurasi gas mulia helium yang stabil.',
    },
    compounds: {
      'LiCoO₂': { name: 'Litium Kobalt Oksida', description: 'Bahan katoda berenergi tinggi standar pada baterai litium-ion konsumen.' },
      'Li₂CO₃': { name: 'Litium Karbonat', description: 'Obat psikiatri gangguan bipolar dan prekursor industri senyawa litium.' },
      'LiOH': { name: 'Litium Hidroksida', description: 'Penyerap gas CO₂ pada wahana antariksa dan kapal selam.' },
    },
  },

  // 4: Berilium (Be)
  4: {
    appearance: 'Logam abu-abu baja keras, rapuh, dan berkilau pada suhu kamar',
    understanding: {
      simpleTerms: 'Logam struktural yang sangat kaku dan ringan, namun debunya sangat beracun bagi paru-paru manusia.',
      whyItBehavesThisWay: 'Dengan konfigurasi 1s² 2s², subkulit 2s terisi penuh memberikan kestabilan tertentu, tetapi kerapatan muatan ion Be²⁺ yang tinggi membuatnya membentuk ikatan kovalen polar.',
      keyTakeaways: [
        'Kerapatan rendah namun modulus elastisitas 50% lebih kaku dibandingkan baja.',
        'Sangat transparan terhadap sinar-X, menjadikannya jendela ideal untuk tabung sinar-X.',
        'Membentuk mineral permata berharga seperti zamrud (emerald) dan akuamarin.',
        'Paparan debu berilium dapat memicu penyakit paru kronis beriliosis.',
      ],
    },
    applications: [
      'Jendela transmisi berkas radiasi pada tabung sinar-X dan detektor fisika partikel.',
      'Cermin optik teleskop luar angkasa (seperti Teleskop James Webb) karena stabilitas termal pada suhu kriogenik.',
      'Paduan tembaga-berilium untuk pegas nir-percik dan kontak listrik pesawat.',
    ],
    biologicalRole: {
      humanImportance: 'Tidak memiliki fungsi biologis; beracun bagi manusia karena menggantikan ion magnesium dalam enzim.',
      dietarySources: ['Tidak terdapat dalam makanan; unsur beracun'],
    },
    safety: {
      handlingConcerns: 'Debu berilium bersifat karsinogenik kelas 1 dan memicu beriliosis kronis. Hindari menghirup partikel atau uapnya.',
    },
    discovery: {
      discoverer: 'Louis-Nicolas Vauquelin',
      etymology: 'Dari bahasa Yunani "beryllos" (nama mineral beril). Dahulu disebut glusin karena rasa senyawanya yang manis.',
    },
    commonIons: {
      'Be²⁺': 'Kehilangan kedua elektron 2s; memiliki kerapatan muatan sangat tinggi yang mempolarisasi anion tetangga.',
    },
    compounds: {
      'BeO': { name: 'Berilium Oksida', description: 'Keramik isolator listrik yang memiliki konduktivitas termal sangat tinggi setara logam.' },
      'BeCl₂': { name: 'Berilium Klorida', description: 'Asam Lewis kovalen berbentuk polimer rantai pada fase padat.' },
    },
  },

  // 5: Boron (B)
  5: {
    appearance: 'Metaloid hitam kecokelatan mengkilap atau bubuk amorf cokelat tua',
    understanding: {
      simpleTerms: 'Metaloid keras yang menghasilkan kaca antipanas Pyrex, pupuk mikro tanaman, dan rompi tahan peluru.',
      whyItBehavesThisWay: 'Memiliki 3 elektron valensi (2s² 2p¹), boron kekurangan elektron (elektron-defisien) dan membentuk ikatan kovalen multisentrum yang unik (ikatan 3-pusat 2-elektron).',
      keyTakeaways: [
        'Metaloid satu-satunya di Golongan 13.',
        'Membentuk struktur ikatan kluster ikosahedral (B₁₂) yang sangat kompleks.',
        'Boron karbida (B₄C) adalah salah satu material terkeras buatan manusia.',
        'Nutrisi mikro esensial bagi dinding sel tumbuhan tingkat tinggi.',
      ],
    },
    applications: [
      'Kaca borosilikat (Pyrex) tahan guncangan termal untuk laboratorium dan dapur.',
      'Pelat keramik boron karbida untuk rompi antipeluru militer dan tank lapis baja.',
      'Batang kendali penyerap neutron pada reaktor fisi nuklir.',
      'Pupuk mikronutrien pertanian untuk pertumbuhan tunas tanaman.',
    ],
    biologicalRole: {
      humanImportance: 'Nutrisi mikro esensial bagi tumbuhan; pada manusia diduga berperan dalam metabolisme kalsium dan integritas tulang.',
      dietarySources: ['Kacang-kacangan', 'Buah apel dan pir', 'Kacang kedelai', 'Sayuran hijau'],
    },
    safety: {
      handlingConcerns: 'Unsur boron padat relatif aman; senyawa borat dosis tinggi dapat mengiritasi sistem pencernaan dan reproduksi.',
    },
    discovery: {
      discoverer: 'Joseph Louis Gay-Lussac & Louis Jacques Thénard',
      etymology: 'Dari bahasa Arab "buraq" atau Persia "burah", merujuk pada mineral boraks kuno.',
    },
    commonIons: {
      'B³⁺': 'Jarang terbentuk sebagai kation bebas karena energi ionisasinya yang sangat tinggi; boron hampir selalu berikatan kovalen.',
    },
    compounds: {
      'H₃BO₃': { name: 'Asam Borat', description: 'Antiseptik ringan, insektisida kecoak, dan penahan api bahan kayu.' },
      'B₂O₃': { name: 'Boron Trioksida', description: 'Fluks pelebur dalam pembuatan kaca borosilikat optik dan serat kaca.' },
      'BN': { name: 'Boron Nitrida', description: 'Material berstruktur seperti grafit dan intan dengan stabilitas termal ekstrem.' },
    },
  },

  // 6: Karbon (C)
  6: {
    appearance: 'Beragam alotrop: intan transparan sangat keras, grafit hitam licin berkilau, atau jelaga amorf',
    understanding: {
      simpleTerms: 'Landasan fundamental kimia organik dan seluruh bentuk kehidupan di Bumi; membentuk intan terkeras hingga grafit baterai.',
      whyItBehavesThisWay: 'Dengan 4 elektron valensi (2s² 2p²), karbon mampu mengalami hibridisasi sp³, sp², dan sp, serta membentuk rantai kovalen katenasi tak terbatas dengan ikatan tunggal, rangkap dua, dan tiga.',
      keyTakeaways: [
        'Mampu membentuk jutaan senyawa kimia organik yang kompleks.',
        'Alotrop intan adalah material alami terkeras; grafit adalah pelumas dan konduktor listrik.',
        'Graphene dan nanotabung karbon memiliki kekuatan tarik dan hantaran listrik revolusioner.',
        'Isotop Karbon-14 digunakan dalam penanggalan radiokarbon arkeologi purbakala.',
      ],
    },
    applications: [
      'Bahan anoda grafit pada baterai litium-ion kendaraan listrik.',
      'Baja karbon dan serat karbon komposit untuk bodi pesawat luar angkasa dan mobil balap.',
      'Karbon aktif untuk penyaringan air minum dan pemurnian udara industri.',
      'Permata perhiasan dan mata bor pemotong industri (intan).',
    ],
    biologicalRole: {
      humanImportance: 'Tulang punggung struktural dari semua biomolekul: asam nukleat (DNA/RNA), protein, lipid, dan karbohidrat. Menyusun ~18,5% massa tubuh manusia.',
      dietarySources: ['Semua makanan sumber hayati (karbohidrat, lemak, protein)'],
    },
    safety: {
      handlingConcerns: 'Karbon murni tidak beracun; namun menghirup debu batu bara kronis dapat menyebabkan silikosis paru hitam.',
    },
    discovery: {
      discoverer: 'Dikenal sejak zaman prasejarah kuno (arang dan jelaga)',
      etymology: 'Dari bahasa Latin "carbo" yang berarti arang batubara.',
    },
    commonIons: {
      'C⁴⁻': 'Ion karbida dalam senyawa biner logam elektropositif kuat (seperti CaC₂).',
    },
    compounds: {
      'CO₂': { name: 'Karbon Dioksida', description: 'Gas rumah kaca alami dan reaktan penting dalam proses fotosintesis tumbuhan.' },
      'CH₄': { name: 'Metana', description: 'Gas hidrokarbon bahan bakar fosil utama gas alam.' },
      'CaCO₃': { name: 'Kalsium Karbonat', description: 'Komponen utama batu kapur, marmer, dan cangkang kerang laut.' },
    },
  },

  // 7: Nitrogen (N)
  7: {
    appearance: 'Gas diatomik tidak berwarna, tidak berbau, dan tidak berasa; membentuk 78% volume atmosfer Bumi',
    understanding: {
      simpleTerms: 'Gas inert pembentuk sebagian besar atmosfer kita dan bahan baku esensial pupuk pertanian penyubur tanaman pangan dunia.',
      whyItBehavesThisWay: 'Memiliki 5 elektron valensi (2s² 2p³). Dua atom nitrogen membentuk ikatan kovalen rangkap tiga (N≡N) yang salah satu ikatannya terkuat di alam (945 kJ/mol), menjadikannya sangat stabil dan lembam.',
      keyTakeaways: [
        'Menyusun 78,08% dari volume udara atmosfer Bumi.',
        'Ikatan rangkap tiga N≡N memerlukan energi sangat besar untuk dipecah (proses Haber-Bosch atau kilat petir).',
        'Penyusun esensial asam amino pembentuk protein dan basa nitrogen DNA/RNA.',
        'Nitrogen cair mendidih pada -196 °C (-320 °F) dan digunakan luas dalam kriogenik.',
      ],
    },
    applications: [
      'Produksi amonia dan pupuk urea pertanian dunia melalui proses Haber-Bosch.',
      'Pendingin kriogenik cair untuk penyimpanan sperma, sel punca, dan jaringan biologis.',
      'Atmosfer gas pelindung inert dalam pengemasan makanan agar tidak tengik teroksidasi.',
      'Bahan sintesis bahan peledak industri (TNT, nitrogliserin, amonium nitrat).',
    ],
    biologicalRole: {
      humanImportance: 'Unsur mutlak penyusun asam amino, protein fungsional, hemoglobin darah, dan materi genetik asam nukleat (DNA dan RNA).',
      dietarySources: ['Makanan kaya protein: daging, telur, ikan, susu, tahu, tempe, dan polong-polongan'],
    },
    safety: {
      handlingConcerns: 'Nitrogen cair menyebabkan radang dingin beku instan (frostbite). Pelepasan gas di ruang tertutup dapat memicu asfiksia fatal.',
    },
    discovery: {
      discoverer: 'Daniel Rutherford',
      etymology: 'Dari bahasa Yunani "nitron" (soda/natron) dan "genes" (pembentuk), dinamai oleh Jean-Antoine Chaptal pada 1790.',
    },
    commonIons: {
      'N³⁻': 'Ion nitrida, terbentuk saat nitrogen menerima 3 elektron untuk mencapai oktet gas mulia neon.',
      'NH₄⁺': 'Kation amonium poliatomik stabil hasil protonasi amonia.',
    },
    compounds: {
      'NH₃': { name: 'Amonia', description: 'Gas berbau menyengat bahan baku utama seluruh pupuk nitrogen sintetis.' },
      'HNO₃': { name: 'Asam Nitrat', description: 'Asam oksidator kuat industri untuk pembuatan pupuk dan zat warna.' },
      'N₂O': { name: 'Dinitrogen Monoksida (Gas Gelak)', description: 'Anestesi sedasi dental dan propelan pendorong tenaga roket.' },
    },
  },

  // 8: Oksigen (O)
  8: {
    appearance: 'Gas diatomik tidak berwarna dan tidak berbau; cairan dan padatannya berwarna biru pucat paramagnetik',
    understanding: {
      simpleTerms: 'Napas kehidupan bagi organisme aerobik dan unsur paling melimpah di kerak Bumi serta samudera.',
      whyItBehavesThisWay: 'Dengan 6 elektron valensi (2s² 2p⁴) dan elektronegativitas tinggi (3,44 Pauling), oksigen sangat rakus menangkap 2 elektron membentuk ikatan oksida dengan hampir semua unsur.',
      keyTakeaways: [
        'Unsur paling melimpah di kerak Bumi (~46,6% massa) dan menyusun 21% volume atmosfer.',
        'Akseptor elektron terakhir dalam fosforilasi oksidatif respirasi seluler penghasil energi.',
        'Mendukung proses pembakaran (pemicu api) dan korosi pengkaratan logam.',
        'Membentuk alotrop Ozon (O₃) di stratosfer yang menyaring radiasi sinar ultraviolet berbahaya.',
      ],
    },
    applications: [
      'Terapi oksigen medis di rumah sakit dan penanganan darurat pernapasan.',
      'Peleburan baja dan pengelasan oksi-asetilen suhu tinggi.',
      'Oksidator bahan bakar cair dalam propulsi roket peluncur antariksa.',
      'Pengolahan limbah air dan sterilisasi ozon industri makanan/minuman.',
    ],
    biologicalRole: {
      humanImportance: 'Unsur paling melimpah berdasarkan massa dalam tubuh manusia (~65% massa tubuh, terutama dalam molekul air). Menopang metabolisme energi aerobik.',
      dietarySources: ['Air minum dan seluruh makanan yang mengandung cairan'],
    },
    safety: {
      handlingConcerns: 'Oksigen cair dan gas bertekanan tinggi mempercepat pembakaran secara dahsyat. Jauhkan dari minyak, pelumas, dan zat mudah terbakar.',
    },
    discovery: {
      discoverer: 'Carl Wilhelm Scheele & Joseph Priestley',
      etymology: 'Dari bahasa Yunani "oxys" (asam) dan "genes" (penghasil), karena Lavoisier menduga oksigen hadir dalam semua asam.',
    },
    commonIons: {
      'O²⁻': 'Ion oksida, konfigurasi oktet stabil [Ne], ditemukan dalam mineral silikat dan oksida logam.',
      'O₂²⁻': 'Ion peroksida dengan ikatan kovalen tunggal O-O.',
    },
    compounds: {
      'H₂O': { name: 'Air', description: 'Zat cair pelarut kehidupan di biosfer planet Bumi.' },
      'SiO₂': { name: 'Silika / Kuarsa', description: 'Penyusun utama pasir dan sebagian besar batuan kerak Bumi.' },
      'CO₂': { name: 'Karbon Dioksida', description: 'Produk buangan metabolisme respirasi dan reaktan fotosintesis.' },
    },
  },

  // 9: Fluor (F)
  9: {
    appearance: 'Gas diatomik kuning kehijauan pucat yang sangat korosif, beracun, dan berbau tajam menyengat',
    understanding: {
      simpleTerms: 'Unsur kimia paling elektronegatif dan paling reaktif di seluruh tabel periodik; menyerang kaca dan membakar air.',
      whyItBehavesThisWay: 'Dengan 7 elektron valensi (2s² 2p⁵) dan jari-jari atom yang sangat kecil, muatan intinya menarik elektron luar dengan daya tarik terkuat dari semua unsur (skala 3,98).',
      keyTakeaways: [
        'Unsur paling elektronegatif di tabel periodik (3,98 pada skala Pauling).',
        'Membakar logam, kayu, kaca, dan bahkan air secara spontan.',
        'Ion fluorida (F⁻) memperkuat email gigi dari serangan asam penyebab karies.',
        'Membentuk ikatan C-F yang luar biasa kuat pada polimer Teflon tahan lengket.',
      ],
    },
    applications: [
      'Fluoridasi pasta gigi dan air minum publik untuk pencegahan gigi berlubang.',
      'Pembuatan politetrafluoroetilena (PTFE / Teflon) wajan anti-lengket dan isolator kawat kabel.',
      'Gas isolator tegangan tinggi belerang heksafluorida (SF₆) di gardu induk listrik PLN.',
      'Sintesis senyawa farmasi modern (sekitar 20% obat resep mengandung atom fluorin).',
    ],
    biologicalRole: {
      humanImportance: 'Ion fluorida diserap ke dalam email gigi dan matriks hidroksiapatit tulang, membentuk fluorapatit yang tahan asam bakteri.',
      dietarySources: ['Air berfluorida', 'Teh seduh', 'Ikan laut konsumsi'],
    },
    safety: {
      handlingConcerns: 'Gas fluorin dan asam fluorida (HF) sangat mematikan. Asam HF menembus kulit tanpa nyeri awal dan mengikat kalsium darah memicu henti jantung.',
    },
    discovery: {
      discoverer: 'Henri Moissan',
      etymology: 'Dari bahasa Latin "fluere" yang berarti mengalir, merujuk pada mineral fluorit (CaF₂) yang melelehkan terak logam.',
    },
    commonIons: {
      'F⁻': 'Ion fluorida, konfigurasi oktet [Ne] yang sangat stabil dengan energi hidrasi tinggi.',
    },
    compounds: {
      'HF': { name: 'Asam Fluorida', description: 'Zat kimia korosif yang mampu melarutkan kaca silika dan mengetsa silikon semikonduktor.' },
      'NaF': { name: 'Natrium Fluorida', description: 'Zat aktif mineralisasi email pada pasta gigi komersial.' },
      'UF₆': { name: 'Uranium Heksafluorida', description: 'Gas volatil yang digunakan dalam sentrifugasi pengayaan isotop bahan bakar nuklir.' },
    },
  },

  // 10: Neon (Ne)
  10: {
    appearance: 'Gas mulia tidak berwarna dan tidak berbau; berpendar oranye-kemerahan terang cemerlang dalam lucutan listrik',
    understanding: {
      simpleTerms: 'Gas mulia bercahaya oranye yang menyinari papan reklame neon di jalanan kota metropolitan dunia.',
      whyItBehavesThisWay: 'Memiliki konfigurasi kulit penuh oktet sempurna 1s² 2s² 2p⁶, neon tidak memiliki kecenderungan membentuk ikatan kovalen maupun ionik alami.',
      keyTakeaways: [
        'Cahaya pendar oranye-merah paling intens di antara seluruh gas mulia saat dieksitasi.',
        'Unsur teringan keempat di alam semesta, tetapi sangat langka di atmosfer Bumi (0,0018%).',
        'Lembam secara kimiawi tanpa satu pun senyawa netral stabil yang terisolasi.',
        'Kapasitas refrigerasi pendingin per satuan volume 40 kali lebih besar dari helium cair.',
      ],
    },
    applications: [
      'Lampu reklame neon komersial dan pencahayaan artistik perkotaan.',
      'Laser helium-neon (He-Ne) merah untuk pemindai barcode optik dan perataan konstruksi.',
      'Indikator tegangan tinggi dan penangkal petir jaringan transmisi daya.',
      'Refrigeran kriogenik cair khusus di bidang riset fisika suhu rendah.',
    ],
    biologicalRole: {
      humanImportance: 'Gas mulia lembam tanpa peran metabolisme biokimiawi pada manusia.',
      dietarySources: ['Tidak terdapat dalam makanan'],
    },
    safety: {
      handlingConcerns: 'Tidak beracun; dapat bertindak sebagai gas pencekik (asphyxiant) jika melepaskan konsentrasi tinggi di ruang berventilasi buruk.',
    },
    discovery: {
      discoverer: 'Sir William Ramsay & Morris Travers',
      etymology: 'Dari bahasa Yunani "neos" yang berarti baru, ditemukan saat menguapkan fraksi udara cair pada tahun 1898.',
    },
    commonIons: {},
    compounds: {},
  },
};
