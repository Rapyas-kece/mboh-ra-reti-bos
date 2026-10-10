export const CATEGORIES_DATA = {
  currentCategory: {
    id: 'neurology-and-psychiatry',
    title: 'Neurology and Psychiatry',
    totalModels: 48,
    description:
      'Interactive 3D models of the nervous system, neuroanatomy, brain functions, neurological disorders, and clinical psychiatric conditions.',
  },

  // Accordion Group 1: Anatomy by System
  systems: [
    { id: 'nervous', label: 'Nervous System', count: 24, active: true },
    { id: 'brain', label: 'Brain & Cerebral Cortex', count: 14 },
    { id: 'cranial_nerves', label: 'Cranial Nerves (I-XII)', count: 8 },
    { id: 'spinal_cord', label: 'Spinal Cord & Peripheral Nerves', count: 6 },
    { id: 'cerebrovascular', label: 'Cerebrovascular Network', count: 5 },
  ],

  // Accordion Group 2: Specialties & Clinical Areas
  specialties: [
    { id: 'neurology', label: 'Neurology and Psychiatry', count: 48, active: true },
    { id: 'cardiology', label: 'Cardiology', count: 36 },
    { id: 'pulmonology', label: 'Pulmonology', count: 28 },
    { id: 'orthopedics', label: 'Orthopedics & Spine', count: 32 },
    { id: 'oncology', label: 'Oncology', count: 22 },
    { id: 'ophthalmology', label: 'Ophthalmology', count: 18 },
  ],

  // Content Type Filter Tabs (from official BioDigital tabTags: h.Ht)
  typeTabs: [
    { id: 'all', label: 'All Models', count: 48 },
    { id: 'anatomy', label: 'Anatomy and Physiology', count: 26 },
    { id: 'conditions', label: 'Conditions & Pathology', count: 16 },
    { id: 'treatments', label: 'Procedures and Treatments', count: 6 },
  ],

  // Level of Detail Filters
  levelsOfDetail: [
    { id: 'gross', label: 'Gross Anatomy', count: 28 },
    { id: 'tissue', label: 'Tissue & Cellular', count: 14 },
    { id: 'molecular', label: 'Molecular & Synaptic', count: 6 },
  ],

  // Gender / Biotype Filters
  biotypes: [
    { id: 'all', label: 'All Biotypes' },
    { id: 'male', label: 'Male Anatomy' },
    { id: 'female', label: 'Female Anatomy' },
  ],

  // Real Neurology & Psychiatry 3D Modules Catalog
  modules: [
    {
      id: 'brain-hemispheres',
      title: 'Human Brain Anatomy & Functional Lobes',
      system: 'Nervous System',
      type: 'anatomy',
      level: 'gross',
      gender: 'all',
      badge: '3D Interactive',
      layers: '6 Cortical Layers',
      views: 'Multi-plane Slice',
      description:
        'Comprehensive 3D topographical map illustrating the frontal, temporal, parietal, and occipital lobes alongside subcortical structures.',
      landmarks: ['Frontal Lobe', 'Cerebellum', 'Thalamus', 'Brainstem'],
      colorAccent: '#0ea5e9',
    },
    {
      id: 'circle-of-willis',
      title: 'Circle of Willis & Cerebral Arterial Supply',
      system: 'Cerebrovascular Network',
      type: 'anatomy',
      level: 'gross',
      gender: 'all',
      badge: 'Interactive Flow',
      layers: 'Arterial Anastomosis',
      views: 'Angiographic 3D',
      description:
        'Anastomotic arterial polygon providing collateral blood flow between anterior and posterior cerebral circulations.',
      landmarks: ['Basilar Artery', 'Internal Carotid', 'Anterior Communicating', 'Middle Cerebral'],
      colorAccent: '#ef4444',
    },
    {
      id: 'synaptic-transmission',
      title: 'Chemical Synapse & Neurotransmitter Release',
      system: 'Nervous System',
      type: 'anatomy',
      level: 'molecular',
      gender: 'all',
      badge: 'Molecular 3D',
      layers: 'Presynaptic to Postsynaptic',
      views: 'Nanoscale Simulation',
      description:
        'Action-potential triggered vesicle exocytosis, acetylcholine diffusion across the synaptic cleft, and receptor activation.',
      landmarks: ['Synaptic Vesicles', 'Presynaptic Membrane', 'Receptor Channel', 'Dendritic Spine'],
      colorAccent: '#8b5cf6',
    },
    {
      id: 'ischemic-stroke',
      title: 'Acute Ischemic Stroke & Thromboembolism',
      system: 'Pathology & Neurology',
      type: 'conditions',
      level: 'gross',
      gender: 'all',
      badge: 'Pathophysiology',
      layers: 'Ischemic Penumbra',
      views: 'Vascular Occlusion',
      description:
        'Embolic obstruction in the middle cerebral artery showing core infarction zone, salvable penumbral tissue, and edema.',
      landmarks: ['Thrombus Clot', 'Hypoperfusion Area', 'MCA M1 Segment', 'Ischemic Core'],
      colorAccent: '#f59e0b',
    },
    {
      id: 'cranial-nerves-pathway',
      title: 'Cranial Nerves (I-XII) & Brainstem Nuclei',
      system: 'Cranial Nerves',
      type: 'anatomy',
      level: 'gross',
      gender: 'all',
      badge: '3D Model',
      layers: '12 Paired Nerves',
      views: 'Neural Pathway',
      description:
        'Origin nuclei in the midbrain, pons, and medulla oblongata tracing peripheral foraminal exit paths of all cranial nerves.',
      landmarks: ['Vagus (X)', 'Trigeminal (V)', 'Facial (VII)', 'Optic (II)'],
      colorAccent: '#10b981',
    },
    {
      id: 'parkinsons-disease',
      title: "Parkinson's Disease & Substantia Nigra",
      system: 'Neurodegenerative Disorders',
      type: 'conditions',
      level: 'tissue',
      gender: 'all',
      badge: 'Clinical Disease',
      layers: 'Dopaminergic Pathway',
      views: 'Basal Ganglia Circuit',
      description:
        'Progressive degeneration of neuromelanin-containing dopaminergic neurons in the pars compacta leading to motor circuit deficits.',
      landmarks: ['Substantia Nigra', 'Striatum', 'Lewy Bodies', 'Basal Ganglia'],
      colorAccent: '#6366f1',
    },
    {
      id: 'alzheimers-plaques',
      title: "Alzheimer's Disease: Amyloid & Tau Pathology",
      system: 'Cognitive Neurology',
      type: 'conditions',
      level: 'molecular',
      gender: 'all',
      badge: 'Molecular Pathology',
      layers: 'Cortical Atrophy',
      views: 'Microscopic 3D',
      description:
        'Extracellular beta-amyloid senile plaques and intracellular hyperphosphorylated tau neurofibrillary tangles causing atrophy.',
      landmarks: ['Amyloid-Beta 42', 'Tau Fibrils', 'Hippocampal Atrophy', 'Ventriculomegaly'],
      colorAccent: '#ec4899',
    },
    {
      id: 'deep-brain-stimulation',
      title: 'Deep Brain Stimulation (DBS) Electrode Placement',
      system: 'Surgical Procedures',
      type: 'treatments',
      level: 'gross',
      gender: 'all',
      badge: 'Surgical Procedure',
      layers: 'Stereotactic Trajectory',
      views: 'Operative Simulation',
      description:
        'Stereotactic surgical implantation of quadripolar lead electrodes into the subthalamic nucleus with neurostimulator routing.',
      landmarks: ['Subthalamic Nucleus', 'Lead Cannula', 'Burr Hole', 'Pulse Generator'],
      colorAccent: '#14b8a6',
    },
  ],
}
