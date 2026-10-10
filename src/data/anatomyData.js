export const anatomyData = {
  organs: [
    {
      id: 'lungs',
      name: 'Paru-Paru (Pulmo)',
      system: 'Sistem Pernapasan',
      overview:
        'Organ utama sistem pernapasan manusia yang berfungsi menukar oksigen dari udara dengan karbon dioksida dari darah melalui jutaan kantung kecil bernama alveolus.',
      healthyFacts: [
        'Kapasitas total udara paru dewasa rata-rata 4 - 6 liter.',
        'Memiliki sekitar 300 - 500 juta alveolus aktif.',
        'Mendistribusikan oksigen ke seluruh sel tubuh setiap detakan napas.'
      ],
      lifestyleRisks: [
        'Paparan asap rokok konvensional & aerosol rokok elektrik (vape).',
        'Inhalasi polusi PM2.5 perkotaan kronis.',
        'Kurangnya aktivitas kardio untuk ventilasi alveolar.'
      ],
      timeline: [
        {
          year: 0,
          label: 'Tahun 0 - Normal / Bebas Paparan',
          status: 'Optimal & Segar',
          capacityPercent: 100,
          elasticity: '100% Lentur',
          color: '#fb7185', // Healthy pink
          roughness: 0.25,
          emissiveIntensity: 0.2,
          description:
            'Jaringan paru tampak merah muda cerah, silia pembersih lendir bekerja maksimal, tidak ada inflamasi atau deposit tar.'
        },
        {
          year: 1,
          label: 'Tahun 1 - Awal Paparan Rutin',
          status: 'Iritasi Mukosa & Bronkitis Dini',
          capacityPercent: 91,
          elasticity: '88% Lentur',
          color: '#d9777f',
          roughness: 0.45,
          emissiveIntensity: 0.15,
          description:
            'Silia pelindung mulai lumpuh sebagian, penumpukan lendir meningkat, terjadi batuk pagi dan sesak ringan saat aktivitas berat.'
        },
        {
          year: 3,
          label: 'Tahun 3 - Kerusakan Sedang',
          status: 'Penumpukan Tar & Fibrosis Parsial',
          capacityPercent: 74,
          elasticity: '65% Lentur',
          color: '#71717a', // Greyish soot
          roughness: 0.7,
          emissiveIntensity: 0.05,
          description:
            'Deposit tar membekas hitam di permukaan alveolus, elastisitas dinding paru menurun drastis, risiko PPOK meningkat tajam.'
        },
        {
          year: 5,
          label: 'Tahun 5 - Kerusakan Sistemik Kronis',
          status: 'Emfisema & Alveolar Breakdown',
          capacityPercent: 52,
          elasticity: '40% Kaku',
          color: '#18181b', // Tar blackened
          roughness: 0.95,
          emissiveIntensity: 0.0,
          description:
            'Dinding alveolus pecah permanen, perfusi oksigen ke darah anjlok lebih dari 45%, batuk kronis dan kelelahan kronis harian.'
        }
      ],
      recoveryInfo: {
        title: 'Timeline Pemulihan (Regenerasi Gaya Hidup Sehat)',
        milestones: [
          '2 Minggu: Sirkulasi mikro membaik dan fungsi paru meningkat hingga 30%.',
          '3 Bulan: Silia paru tumbuh kembali, mengurangi infeksi saluran pernapasan.',
          '1 Tahun: Risiko penyakit jantung koroner dan komplikasi pernapasan turun 50%.'
        ]
      },
      affiliateProducts: [
        {
          id: 'prod-lung-1',
          name: 'Madu Gurah Herbal Alami (Formulasi Paru)',
          umkmName: 'CV Herbalindo Berkah Sleman - Mitra UMKM DIY',
          bpom: 'POM TR 213645891',
          price: 'Rp 68.000',
          benefit: 'Membantu meredakan iritasi saluran napas, ekspektoran lendir tar, & antioksidan alami.',
          imagePlaceholder: '🍯',
          marketplaceUrl: 'https://shopee.co.id',
          verifiedBadge: 'BPOM Terverifikasi'
        },
        {
          id: 'prod-lung-2',
          name: 'Teh Celup Pegagan & Daun Saga Organik',
          umkmName: 'BioNusantara Herbalindo Jogja',
          bpom: 'POM TR 193231101',
          price: 'Rp 45.000',
          benefit: 'Detoksifikasi pernapasan pasca-rokok, anti-inflamasi, dan meningkatkan saturasi oksigen.',
          imagePlaceholder: '🍵',
          marketplaceUrl: 'https://tokopedia.com',
          verifiedBadge: 'BPOM Terverifikasi'
        }
      ]
    },
    {
      id: 'heart',
      name: 'Jantung (Cor)',
      system: 'Sistem Kardiovaskular',
      overview:
        'Otot pemompa utama dalam tubuh manusia yang memompa lebih dari 7.000 liter darah per hari ke seluruh pembuluh arteri dan kapiler.',
      healthyFacts: [
        'Berdetak sekitar 100.000 kali per hari dalam kondisi normal.',
        'Membawa nutrisi dan oksigen bersih ke seluruh organ vital.',
        'Sangat adaptif terhadap olahraga aerobik teratur.'
      ],
      lifestyleRisks: [
        'Konsumsi tinggi lemak trans & garam (makanan cepat saji).',
        'Gaya hidup sedenter (duduk > 8 jam/hari tanpa olahraga).',
        'Begadang kronis & stres memicu lonjakan kortisol.'
      ],
      timeline: [
        {
          year: 0,
          label: 'Tahun 0 - Normal / Pola Hidup Sehat',
          status: 'Peredaran Bersih & Ritme Stabil',
          capacityPercent: 100,
          elasticity: '100% Lentur',
          color: '#e11d48', // Vibrant red
          roughness: 0.3,
          emissiveIntensity: 0.25,
          description:
            'Dinding arteri elastis tanpa plak, ritme detak stabil 60-80 BPM, tekanan darah normotensif (120/80 mmHg).'
        },
        {
          year: 1,
          label: 'Tahun 1 - Sedenter & Pola Makan Buruk',
          status: 'Penumpukan Plak Lipid Awal',
          capacityPercent: 88,
          elasticity: '82% Lentur',
          color: '#be123c',
          roughness: 0.5,
          emissiveIntensity: 0.18,
          description:
            'Awal penumpukan LDL pada endotel arteri koroner, detak jantung istirahat naik ke 85+ BPM, tekanan darah mulai pre-hipertensi.'
        },
        {
          year: 3,
          label: 'Tahun 3 - Penyempitan Vaskular Lanjut',
          status: 'Aterosklerosis & Hipertensi Sedang',
          capacityPercent: 70,
          elasticity: '60% Lentur',
          color: '#881337',
          roughness: 0.75,
          emissiveIntensity: 0.08,
          description:
            'Plak kalsium mengeras di arteri koroner, ventrikel kiri mulai menebal karena beban pompa berat, sering nyeri dada saat kelelahan.'
        },
        {
          year: 5,
          label: 'Tahun 5 - Kerusakan Kardio Kritis',
          status: 'Iskemia & Risiko Serangan Jantung Tinggi',
          capacityPercent: 48,
          elasticity: '35% Kaku',
          color: '#3b0764', // Dark purplish necrotic
          roughness: 0.9,
          emissiveIntensity: 0.0,
          description:
            'Penyempitan lumen arteri > 70%, perfusi miokardium terhambat kritis, risiko infark miokard akut meningkat hingga 400%.'
        }
      ],
      recoveryInfo: {
        title: 'Timeline Pemulihan Kardiovaskular',
        milestones: [
          '1 Bulan: Tekanan darah sistolik mulai turun rata-rata 5-8 mmHg dengan jalan kaki 30 menit/hari.',
          '6 Bulan: Kolesterol LDL teroksidasi berkurang hingga 25% dengan diet tinggi serat & rempah herbal.',
          '2 Tahun: Risiko serangan jantung mendadak berkurang separuh.'
        ]
      },
      affiliateProducts: [
        {
          id: 'prod-heart-1',
          name: 'Kapsul Ekstrak Bawang Putih Tunggal & Rosella',
          umkmName: 'Herba Medika Nusantara - Bantul',
          bpom: 'POM TR 203362141',
          price: 'Rp 75.000',
          benefit: 'Membantu melarutkan plak kolesterol, menjaga elastisitas pembuluh darah, dan melancarkan sirkulasi.',
          imagePlaceholder: '🧄',
          marketplaceUrl: 'https://shopee.co.id',
          verifiedBadge: 'BPOM Terverifikasi'
        },
        {
          id: 'prod-heart-2',
          name: 'Minyak Ikan Sidat & Ekstrak Temulawak Alami',
          umkmName: 'CV Sehat Raga Sejahtera Yogyakarta',
          bpom: 'POM TR 183319081',
          price: 'Rp 92.000',
          benefit: 'Kaya Omega-3 alami untuk stabilisasi irama jantung dan menurunkan trigliserida darah.',
          imagePlaceholder: '🐟',
          marketplaceUrl: 'https://tokopedia.com',
          verifiedBadge: 'BPOM Terverifikasi'
        }
      ]
    }
  ]
}
