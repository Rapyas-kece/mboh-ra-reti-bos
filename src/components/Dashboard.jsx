import { useState } from 'react'
import {
  Heart,
  Brain,
  Eye,
  Activity,
  Layers,
  Search,
  ChevronRight,
  ChevronDown,
  ArrowLeft,
  SlidersHorizontal,
  Bookmark,
  Share2,
  Info,
  Maximize2,
  Bone,
  Flame,
  Microscope,
  Stethoscope,
  Grid,
  List,
  ArrowUpDown,
  RotateCcw,
  Box,
  CircleDot,
  Check,
  ShieldCheck,
  Compass,
} from 'lucide-react'

export default function Dashboard({ onBackToLanding }) {
  const [activeCategory, setActiveCategory] = useState('all')
  const [expandedSection, setExpandedSection] = useState({
    anatomy: true,
    condition: false,
    biology: true,
  })
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedOrgan, setSelectedOrgan] = useState(null)
  const [viewLayout, setViewLayout] = useState('grid') // 'grid' | 'list'
  const [sortBy, setSortBy] = useState('popular')
  const [genderFilter, setGenderFilter] = useState('all') // 'all' | 'male' | 'female'

  // BioDigital Human Taxonomy Structure
  const anatomySystems = [
    { id: 'all', label: 'All Anatomy & Systems', count: 18, icon: Layers },
    { id: 'cardiovascular', label: 'Cardiovascular System', count: 4, icon: Heart },
    { id: 'nervous', label: 'Nervous & Neural System', count: 3, icon: Brain },
    { id: 'respiratory', label: 'Respiratory & Pulmonology', count: 3, icon: Flame },
    { id: 'skeletal', label: 'Skeletal & Musculoskeletal', count: 3, icon: Bone },
    { id: 'sensory', label: 'Sensory & Ophthalmic', count: 2, icon: Eye },
    { id: 'cellular', label: 'Cellular & Molecular', count: 3, icon: Microscope },
  ]

  const healthConditions = [
    { id: 'coronary_disease', label: 'Cardiovascular Pathology', count: 5 },
    { id: 'neurological_disorder', label: 'Neurological Conditions', count: 4 },
    { id: 'pulmonary_trauma', label: 'Pulmonary & Respiratory Trauma', count: 3 },
  ]

  // BioDigital 1:1 Anatomical Modules Catalog
  const modules = [
    {
      id: 'heart-anatomy',
      title: 'Heart Anatomy & Coronary Circuit',
      category: 'cardiovascular',
      system: 'Cardiovascular System',
      gender: 'both',
      views: '3D Interactive',
      layersCount: '4 Layers',
      color: '#ff3366',
      badge: '3D Model',
      description:
        'Interactive anatomical simulation of internal cardiac chambers, mitral and tricuspid valve dynamics, and coronary vasculature.',
      structureList: ['Left Ventricle', 'Right Atrium', 'Aortic Arch', 'Coronary Arteries'],
      previewSvg: (
        <Heart className="w-[64rem] h-[64rem] text-[#ff3366] stroke-[1.4] transition-transform duration-500 group-hover:scale-110" />
      ),
    },
    {
      id: 'brain-cortex',
      title: 'Human Brain & Cerebral Hemispheres',
      category: 'nervous',
      system: 'Nervous System',
      gender: 'both',
      views: 'Neural Pulse',
      layersCount: '6 Layers',
      color: '#00e5ff',
      badge: 'Interactive',
      description:
        'Cerebral cortex topographical mapping, highlighting frontal, parietal, temporal, occipital lobes and brainstem projections.',
      structureList: ['Frontal Cortex', 'Hippocampus', 'Cerebellum', 'Corpus Callosum'],
      previewSvg: (
        <Brain className="w-[64rem] h-[64rem] text-[#00e5ff] stroke-[1.4] transition-transform duration-500 group-hover:scale-110" />
      ),
    },
    {
      id: 'lungs-respiratory',
      title: 'Respiratory System & Alveolar Tree',
      category: 'respiratory',
      system: 'Respiratory System',
      gender: 'both',
      views: 'Gas Diffusion',
      layersCount: '3 Layers',
      color: '#deff00',
      badge: 'Simulated',
      description:
        'Full trachea arborization branching into primary bronchi, terminal bronchioles, and functional alveolar gas exchange clusters.',
      structureList: ['Trachea', 'Bronchi', 'Alveolar Sacs', 'Diaphragm'],
      previewSvg: (
        <Flame className="w-[64rem] h-[64rem] text-[#deff00] stroke-[1.4] transition-transform duration-500 group-hover:scale-110" />
      ),
    },
    {
      id: 'spinal-column',
      title: 'Vertebral Column & Spinal Roots',
      category: 'skeletal',
      system: 'Skeletal System',
      gender: 'both',
      views: 'Kinematic 3D',
      layersCount: '33 Vertebrae',
      color: '#a78bfa',
      badge: '3D Model',
      description:
        'Segmented cervical, thoracic, lumbar, and sacral vertebrae with articulated intervertebral discs and peripheral nerve exits.',
      structureList: ['Cervical (C1-C7)', 'Thoracic (T1-T12)', 'Lumbar (L1-L5)', 'Sacrum'],
      previewSvg: (
        <Bone className="w-[64rem] h-[64rem] text-[#a78bfa] stroke-[1.4] transition-transform duration-500 group-hover:scale-110" />
      ),
    },
    {
      id: 'eye-optics',
      title: 'Ocular Anatomy & Foveal Retina',
      category: 'sensory',
      system: 'Sensory Organs',
      gender: 'both',
      views: 'Ray Traced',
      layersCount: 'Tunica Layers',
      color: '#38bdf8',
      badge: 'Interactive',
      description:
        'Detailed sagital section showing cornea, crystalline lens, ciliary zonules, vitreous humor, and multi-layered retina.',
      structureList: ['Cornea', 'Iris', 'Crystalline Lens', 'Optic Nerve'],
      previewSvg: (
        <Eye className="w-[64rem] h-[64rem] text-[#38bdf8] stroke-[1.4] transition-transform duration-500 group-hover:scale-110" />
      ),
    },
    {
      id: 'cellular-mitochondria',
      title: 'Cellular Ultrastructure & CRISPR Cas9',
      category: 'cellular',
      system: 'Cellular Biology',
      gender: 'both',
      views: 'Sub-atomic',
      layersCount: 'Organelles',
      color: '#4ade80',
      badge: 'Molecular',
      description:
        'High-resolution macromolecular model of eukaryotic organelle systems and genomic Cas9 endonuclease riboprotein.',
      structureList: ['Double Helix', 'Cas9 Enzyme', 'Mitochondria', 'Endoplasmic Reticulum'],
      previewSvg: (
        <Microscope className="w-[64rem] h-[64rem] text-[#4ade80] stroke-[1.4] transition-transform duration-500 group-hover:scale-110" />
      ),
    },
    {
      id: 'circulatory-vasculature',
      title: 'Full Body Arterial & Venous Network',
      category: 'cardiovascular',
      system: 'Cardiovascular System',
      gender: 'both',
      views: 'Systemic Flow',
      layersCount: 'Arterial / Venous',
      color: '#fb7185',
      badge: 'Systemic',
      description:
        'Comprehensive systemic map tracing oxygenated arterial distribution from the aorta to microcapillaries and venous return.',
      structureList: ['Carotid Artery', 'Subclavian', 'Femoral Artery', 'Vena Cava'],
      previewSvg: (
        <Activity className="w-[64rem] h-[64rem] text-[#fb7185] stroke-[1.4] transition-transform duration-500 group-hover:scale-110" />
      ),
    },
    {
      id: 'musculoskeletal-arm',
      title: 'Upper Limb Biomechanics & Musculature',
      category: 'skeletal',
      system: 'Musculoskeletal System',
      gender: 'both',
      views: 'Kinematic 3D',
      layersCount: 'Muscles & Tendons',
      color: '#facc15',
      badge: '3D Model',
      description:
        'Anatomical kinetics of biceps brachii, triceps, forearm flexors, and ligamentous shoulder glenohumeral stabilization.',
      structureList: ['Biceps Brachii', 'Brachialis', 'Triceps', 'Rotator Cuff'],
      previewSvg: (
        <Stethoscope className="w-[64rem] h-[64rem] text-[#facc15] stroke-[1.4] transition-transform duration-500 group-hover:scale-110" />
      ),
    },
  ]

  const filteredModules = modules.filter((m) => {
    const matchesCat = activeCategory === 'all' || m.category === activeCategory
    const matchesSearch =
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.system.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.structureList.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCat && matchesSearch
  })

  return (
    <div className="flex h-screen w-full bg-[#0a0a0a] text-white font-sans overflow-hidden selection:bg-[#deff00] selection:text-[#0f0f0f]">
      {/* =========================================================================
          1. LEFT SIDEBAR: EXACT BIODIGITAL 310px HIERARCHICAL TAXONOMY
          ========================================================================= */}
      <aside className="w-[310rem] shrink-0 border-r border-white/10 flex flex-col justify-between bg-[#0f0f0f] select-none h-full">
        {/* Top: Brand Header & Anatomy Trees */}
        <div className="flex-1 overflow-y-auto p-[20rem]">
          {/* Logo / Header Navigation */}
          <div className="flex items-center justify-between pb-[18rem] border-b border-white/10">
            <div className="flex items-center gap-[10rem]">
              <div className="w-[28rem] h-[28rem] rounded-full bg-[#deff00] flex items-center justify-center text-[#0f0f0f] font-bold text-[13rem]">
                M
              </div>
              <div>
                <span className="text-[15rem] font-medium tracking-tight block leading-none">
                  BioDigital <span className="text-[#deff00]">/ Anatomy</span>
                </span>
                <span className="text-[10rem] font-mono text-white/40 tracking-wider uppercase mt-[3rem] block">
                  Interactive 3D Engine
                </span>
              </div>
            </div>
            {onBackToLanding && (
              <button
                onClick={onBackToLanding}
                className="text-white/40 hover:text-[#deff00] transition-colors p-[6rem] rounded-full hover:bg-white/5"
                title="Return to Landing Page"
              >
                <ArrowLeft className="w-[16rem] h-[16rem]" />
              </button>
            )}
          </div>

          {/* Section 1: Anatomy & Systems Accordion */}
          <div className="mt-[20rem]">
            <button
              onClick={() =>
                setExpandedSection((prev) => ({ ...prev, anatomy: !prev.anatomy }))
              }
              className="w-full flex items-center justify-between text-[11rem] uppercase tracking-wider text-white/40 font-medium px-[8rem] py-[6rem] hover:text-white"
            >
              <span>Anatomy & Systems</span>
              <ChevronDown
                className={`w-[13rem] h-[13rem] transition-transform ${
                  expandedSection.anatomy ? 'rotate-180' : ''
                }`}
              />
            </button>

            {expandedSection.anatomy && (
              <nav className="mt-[8rem] space-y-[2rem]">
                {anatomySystems.map((item) => {
                  const Icon = item.icon
                  const isActive = activeCategory === item.id
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveCategory(item.id)}
                      className={`w-full flex items-center justify-between px-[12rem] py-[9rem] rounded-lg text-[13rem] transition-all duration-150 ${
                        isActive
                          ? 'bg-white text-[#0f0f0f] font-medium'
                          : 'text-white/70 hover:text-white hover:bg-white/[0.05]'
                      }`}
                    >
                      <div className="flex items-center gap-[10rem] truncate">
                        <Icon
                          className={`w-[15rem] h-[15rem] shrink-0 ${
                            isActive ? 'text-[#0f0f0f]' : 'text-white/40'
                          }`}
                        />
                        <span className="truncate">{item.label}</span>
                      </div>
                      <span
                        className={`text-[10rem] font-mono px-[6rem] py-[1rem] rounded-full ${
                          isActive
                            ? 'bg-[#0f0f0f] text-white'
                            : 'bg-white/10 text-white/50'
                        }`}
                      >
                        {item.count}
                      </span>
                    </button>
                  )
                })}
              </nav>
            )}
          </div>

          {/* Section 2: Health Conditions Accordion */}
          <div className="mt-[20rem] pt-[16rem] border-t border-white/10">
            <button
              onClick={() =>
                setExpandedSection((prev) => ({
                  ...prev,
                  condition: !prev.condition,
                }))
              }
              className="w-full flex items-center justify-between text-[11rem] uppercase tracking-wider text-white/40 font-medium px-[8rem] py-[6rem] hover:text-white"
            >
              <span>Health Conditions</span>
              <ChevronDown
                className={`w-[13rem] h-[13rem] transition-transform ${
                  expandedSection.condition ? 'rotate-180' : ''
                }`}
              />
            </button>

            {expandedSection.condition && (
              <div className="mt-[8rem] space-y-[2rem]">
                {healthConditions.map((cond) => (
                  <button
                    key={cond.id}
                    className="w-full flex items-center justify-between px-[12rem] py-[8rem] rounded-lg text-[12rem] text-white/60 hover:text-white hover:bg-white/[0.04]"
                  >
                    <span className="truncate">{cond.label}</span>
                    <span className="text-[10rem] font-mono text-white/40">
                      {cond.count}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Section 3: Sex & Biotype Filter */}
          <div className="mt-[20rem] pt-[16rem] border-t border-white/10">
            <p className="text-[11rem] uppercase tracking-wider text-white/40 font-medium px-[8rem] mb-[10rem]">
              Model Biotype
            </p>
            <div className="grid grid-cols-3 gap-[4rem] p-[3rem] rounded-lg bg-white/[0.04] border border-white/10 text-[11rem]">
              {['all', 'male', 'female'].map((g) => (
                <button
                  key={g}
                  onClick={() => setGenderFilter(g)}
                  className={`py-[5rem] capitalize rounded transition-colors ${
                    genderFilter === g
                      ? 'bg-white text-[#0f0f0f] font-medium'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom: 3D Engine Diagnostics */}
        <div className="p-[18rem] border-t border-white/10 bg-[#0c0c0c]">
          <div className="flex items-center justify-between text-[11rem]">
            <div className="flex items-center gap-[8rem]">
              <span className="relative flex h-[7rem] w-[7rem]">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#deff00] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-[7rem] w-[7rem] bg-[#deff00]"></span>
              </span>
              <span className="text-white/70 font-mono">BioDigital WebGL 3D</span>
            </div>
            <span className="text-[#deff00] font-mono">60 FPS</span>
          </div>
        </div>
      </aside>

      {/* =========================================================================
          2. MAIN WORKSPACE: BIODIGITAL TOP BARS & 4-COLUMN ORGAN CARD GRID
          ========================================================================= */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Tier 1 Header: Global Search & Actions (Height: 70px) */}
        <header className="h-[70rem] shrink-0 border-b border-white/10 px-[28rem] flex items-center justify-between bg-[#0a0a0a]/90 backdrop-blur-md">
          {/* Global Search Bar */}
          <div className="relative w-[460rem] max-w-full">
            <Search className="w-[15rem] h-[15rem] absolute left-[14rem] top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 1,000+ interactive 3D anatomy modules..."
              className="w-full bg-white/[0.04] border border-white/10 rounded-full pl-[38rem] pr-[54rem] py-[8rem] text-[13rem] text-white placeholder-white/40 focus:outline-none focus:border-[#deff00] transition-colors"
            />
            <span className="absolute right-[12rem] top-1/2 -translate-y-1/2 text-[10rem] px-[6rem] py-[2rem] rounded bg-white/10 text-white/50 font-mono">
              ⌘K
            </span>
          </div>

          {/* Quick Studio Tools */}
          <div className="flex items-center gap-[12rem]">
            <button className="flex items-center gap-[6rem] px-[16rem] py-[7rem] rounded-full border border-white/15 text-[12rem] text-white/80 hover:text-white hover:border-[#deff00] transition-colors">
              <SlidersHorizontal className="w-[13rem] h-[13rem]" />
              <span>Filters</span>
            </button>
            <button className="flex items-center gap-[6rem] px-[18rem] py-[8rem] rounded-full bg-[#deff00] text-[#0f0f0f] font-medium text-[12rem] hover:bg-white transition-all shadow-[0_0_15px_rgba(222,255,0,0.2)]">
              <span>BioDigital Studio</span>
              <ChevronRight className="w-[13rem] h-[13rem]" />
            </button>
          </div>
        </header>

        {/* Tier 2 Sub-Bar: Category Title, Result Count & Layout Controls (Height: 56px) */}
        <div className="h-[56rem] shrink-0 border-b border-white/10 px-[28rem] flex items-center justify-between bg-[#0d0d0d]">
          <div className="flex items-center gap-[12rem]">
            <h1 className="text-[16rem] font-medium text-white tracking-tight">
              {activeCategory === 'all'
                ? 'All Anatomy & Health Conditions'
                : anatomySystems.find((c) => c.id === activeCategory)?.label}
            </h1>
            <span className="text-[11rem] text-white/40 font-mono">
              ({filteredModules.length} models)
            </span>
          </div>

          {/* View Mode & Sorting Controls */}
          <div className="flex items-center gap-[16rem]">
            {/* Sort Dropdown */}
            <div className="flex items-center gap-[6rem] text-[12rem] text-white/60">
              <span className="text-white/40">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-white focus:outline-none cursor-pointer border-none font-medium"
              >
                <option value="popular" className="bg-[#0f0f0f]">
                  Most Popular
                </option>
                <option value="alphabetical" className="bg-[#0f0f0f]">
                  Alphabetical
                </option>
                <option value="newest" className="bg-[#0f0f0f]">
                  Newest 3D
                </option>
              </select>
            </div>

            {/* Grid / List Switcher */}
            <div className="flex items-center p-[2rem] rounded-lg bg-white/[0.04] border border-white/10 text-white/60">
              <button
                onClick={() => setViewLayout('grid')}
                className={`p-[5rem] rounded ${
                  viewLayout === 'grid'
                    ? 'bg-white text-[#0f0f0f]'
                    : 'hover:text-white'
                }`}
                title="Grid view"
              >
                <Grid className="w-[14rem] h-[14rem]" />
              </button>
              <button
                onClick={() => setViewLayout('list')}
                className={`p-[5rem] rounded ${
                  viewLayout === 'list'
                    ? 'bg-white text-[#0f0f0f]'
                    : 'hover:text-white'
                }`}
                title="List view"
              >
                <List className="w-[14rem] h-[14rem]" />
              </button>
            </div>
          </div>
        </div>

        {/* Tier 3: Main Scrollable Content Grid (4 Columns standard BioDigital width) */}
        <main className="flex-1 overflow-y-auto p-[28rem] select-none">
          {viewLayout === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[20rem]">
              {filteredModules.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedOrgan(item)}
                  className="group rounded-xl border border-white/10 bg-[#0f0f0f] overflow-hidden hover:border-[#deff00]/60 transition-all duration-300 cursor-pointer flex flex-col justify-between"
                >
                  {/* Card Thumbnail Canvas Area (Ratio: ~16:10 BioDigital thumbnail) */}
                  <div className="relative h-[190rem] w-full bg-gradient-to-b from-white/[0.03] to-transparent overflow-hidden flex items-center justify-center p-[16rem]">
                    {/* Blueprint Grid Lines */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:20rem_20rem] pointer-events-none"></div>

                    {/* Central 3D Organ Visualization Hub */}
                    <div className="relative z-10 w-[96rem] h-[96rem] rounded-full border border-white/10 bg-white/[0.02] flex items-center justify-center group-hover:scale-110 group-hover:border-[#deff00]/40 transition-all duration-500">
                      {/* Ambient Radial Color Halo */}
                      <div
                        className="absolute inset-0 rounded-full opacity-20 blur-xl group-hover:opacity-40 transition-opacity"
                        style={{ backgroundColor: item.color }}
                      ></div>
                      {item.previewSvg}
                    </div>

                    {/* Top Status Tag */}
                    <div className="absolute top-[12rem] left-[12rem] right-[12rem] flex items-center justify-between z-20">
                      <span className="px-[8rem] py-[3rem] rounded-full text-[9rem] font-mono uppercase tracking-wider border border-white/10 bg-[#0a0a0a]/80 backdrop-blur-md text-white/80">
                        {item.badge}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                        }}
                        className="w-[26rem] h-[26rem] rounded-full border border-white/10 bg-[#0a0a0a]/80 flex items-center justify-center text-white/40 hover:text-white transition-colors"
                      >
                        <Bookmark className="w-[12rem] h-[12rem]" />
                      </button>
                    </div>

                    {/* Bottom Metadata Info */}
                    <div className="absolute bottom-[10rem] right-[12rem] text-[9rem] font-mono text-white/30 z-20">
                      {item.layersCount}
                    </div>
                  </div>

                  {/* Card Detail Information */}
                  <div className="p-[18rem] border-t border-white/10 flex-1 flex flex-col justify-between">
                    <div>
                      <p className="text-[10rem] font-medium uppercase tracking-wider text-[#deff00]">
                        / {item.system}
                      </p>
                      <h3 className="mt-[4rem] text-[15rem] font-medium text-white group-hover:text-[#deff00] transition-colors leading-[130%] line-clamp-1">
                        {item.title}
                      </h3>
                      <p className="mt-[6rem] text-[12rem] text-white/55 leading-[140%] line-clamp-2">
                        {item.description}
                      </p>
                    </div>

                    {/* Structure Tags & Action */}
                    <div className="mt-[14rem] pt-[12rem] border-t border-white/[0.06] flex items-center justify-between">
                      <div className="flex items-center gap-[4rem] truncate">
                        <span className="text-[10rem] text-white/40 font-mono">
                          {item.structureList[0]}
                        </span>
                        <span className="text-[10rem] text-white/20">•</span>
                        <span className="text-[10rem] text-white/40 font-mono">
                          {item.structureList[1]}
                        </span>
                      </div>

                      <div className="flex items-center gap-[4rem] text-[11rem] font-medium text-white group-hover:text-[#deff00] transition-colors shrink-0">
                        <span>3D</span>
                        <ChevronRight className="w-[12rem] h-[12rem] group-hover:translate-x-[2rem] transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* List Layout Alternative */
            <div className="space-y-[8rem]">
              {filteredModules.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedOrgan(item)}
                  className="group rounded-xl border border-white/10 bg-[#0f0f0f] p-[16rem] hover:border-[#deff00]/60 transition-all flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center gap-[16rem]">
                    <div className="w-[50rem] h-[50rem] rounded-lg border border-white/10 bg-white/[0.02] flex items-center justify-center shrink-0">
                      {item.previewSvg}
                    </div>
                    <div>
                      <p className="text-[10rem] font-medium uppercase text-[#deff00]">
                        / {item.system}
                      </p>
                      <h3 className="text-[15rem] font-medium text-white group-hover:text-[#deff00] transition-colors">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                  <div className="flex items-center gap-[20rem]">
                    <span className="text-[11rem] font-mono text-white/40">
                      {item.layersCount}
                    </span>
                    <button className="px-[12rem] py-[5rem] rounded-full border border-white/15 text-[11rem] text-white group-hover:border-[#deff00] group-hover:text-[#deff00] transition-colors">
                      View 3D
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* =========================================================================
          3. FULLSCREEN 3D MODEL DETAIL MODAL VIEWPORT
          ========================================================================= */}
      {selectedOrgan && (
        <div className="fixed inset-0 z-[5000] flex items-center justify-center p-[20rem] bg-black/85 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-[880rem] rounded-3xl border border-white/20 bg-[#0f0f0f] p-[32rem] shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-[18rem] border-b border-white/10">
              <div>
                <span className="text-[11rem] uppercase font-mono text-[#deff00]">
                  / {selectedOrgan.system}
                </span>
                <h2 className="text-[24rem] font-medium text-white mt-[4rem]">
                  {selectedOrgan.title}
                </h2>
              </div>
              <button
                onClick={() => setSelectedOrgan(null)}
                className="px-[14rem] py-[6rem] rounded-full border border-white/20 text-[12rem] text-white hover:bg-white hover:text-[#0f0f0f] transition-all"
              >
                Close ✕
              </button>
            </div>

            {/* Simulated 3D Viewport Area */}
            <div className="mt-[20rem] h-[350rem] rounded-2xl border border-white/10 bg-black/80 relative overflow-hidden flex items-center justify-center">
              <div
                className="absolute inset-0 opacity-25 blur-3xl pointer-events-none"
                style={{ backgroundColor: selectedOrgan.color }}
              ></div>

              <div className="relative z-10 text-center space-y-[14rem]">
                <div className="w-[110rem] h-[110rem] rounded-full border border-white/20 mx-auto flex items-center justify-center bg-white/5">
                  <Activity
                    className="w-[52rem] h-[52rem] animate-pulse"
                    style={{ color: selectedOrgan.color }}
                  />
                </div>
                <div>
                  <p className="text-[16rem] font-medium text-white">
                    BioDigital 3D Anatomical Render Active
                  </p>
                  <p className="text-[12rem] text-white/50 mt-[4rem] font-mono">
                    {selectedOrgan.layersCount} • {selectedOrgan.views}
                  </p>
                </div>
              </div>
            </div>

            {/* Anatomical Key Structures */}
            <div className="mt-[20rem]">
              <p className="text-[11rem] uppercase tracking-wider text-white/40 font-medium mb-[8rem]">
                Identified Anatomical Landmarks
              </p>
              <div className="flex flex-wrap gap-[6rem]">
                {selectedOrgan.structureList.map((st, i) => (
                  <span
                    key={i}
                    className="px-[10rem] py-[4rem] rounded-full border border-white/10 bg-white/[0.03] text-[11rem] text-white/70 font-mono"
                  >
                    {st}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Bottom Action */}
            <div className="mt-[24rem] flex justify-end gap-[12rem] pt-[16rem] border-t border-white/10">
              <button
                onClick={() => setSelectedOrgan(null)}
                className="px-[24rem] py-[10rem] rounded-full bg-[#deff00] text-[#0f0f0f] font-medium text-[13rem] hover:bg-white transition-all shadow-[0_0_20px_rgba(222,255,0,0.3)]"
              >
                Inspect 3D Anatomical Layers →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
