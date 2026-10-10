import { useState } from 'react'
import {
  Heart,
  Brain,
  Eye,
  Activity,
  Layers,
  Search,
  SlidersHorizontal,
  ChevronRight,
  ArrowLeft,
  Share2,
  Sparkles,
  Info,
  Maximize2,
  Bookmark,
  CheckCircle2,
  Bone,
  Stethoscope,
  Microscope,
  Cpu,
  ShieldAlert,
  Flame,
  Volume2,
} from 'lucide-react'

export default function Dashboard({ onBackToLanding }) {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedOrgan, setSelectedOrgan] = useState(null)
  const [activeViewMode, setActiveViewMode] = useState('3d') // '3d' | 'slice' | 'xray'

  // Anatomical Systems Sidebar Categories (BioDigital Human taxonomy)
  const categories = [
    { id: 'all', label: 'All Anatomical Systems', count: 18, icon: Layers },
    { id: 'cardiovascular', label: 'Cardiovascular System', count: 4, icon: Heart },
    { id: 'nervous', label: 'Nervous & Neural System', count: 3, icon: Brain },
    { id: 'respiratory', label: 'Respiratory & Pulmonology', count: 3, icon: Flame },
    { id: 'musculoskeletal', label: 'Skeletal & Musculoskeletal', count: 3, icon: Bone },
    { id: 'sensory', label: 'Sensory & Ophthalmic', count: 2, icon: Eye },
    { id: 'cellular', label: 'Cellular & Molecular', count: 3, icon: Microscope },
  ]

  // Anatomical Organ Modules (Cards with 3D/Anatomical visualization placeholders)
  const organModules = [
    {
      id: 'heart-coronary',
      title: 'Human Heart & Coronary Vessels',
      system: 'Cardiovascular System',
      category: 'cardiovascular',
      layers: '4 Layers • Vascular Flow',
      complexity: 'High Fidelity',
      badge: '3D Interactive',
      color: '#ff3366',
      description:
        'Complete cardiac anatomy detailing atria, ventricles, coronary arteries, and dynamic systolic pumping cycle.',
      tags: ['Aorta', 'Myocardium', 'Valve Mechanics'],
      modelUrl: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'brain-neocortex',
      title: 'Neocortex & Neural Connectome',
      system: 'Nervous & Neural System',
      category: 'nervous',
      layers: '6 Cortical Layers • Synaptic',
      complexity: 'Dynamic Neural Pulse',
      badge: 'Neural Simulation',
      color: '#00e5ff',
      description:
        'Cerebral cortex mapped with thalamic projections, limbic structures, and real-time synaptic axon transmission.',
      tags: ['Frontal Lobe', 'Hippocampus', 'Synapse'],
      modelUrl: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'lungs-alveoli',
      title: 'Pulmonary Tree & Alveolar Exchange',
      system: 'Respiratory & Pulmonology',
      category: 'respiratory',
      layers: 'Bronchial Arborization',
      complexity: 'Gas Exchange Simulation',
      badge: 'Dynamic Airflow',
      color: '#deff00',
      description:
        'Micro-architecture of the alveolar-capillary barrier illustrating O2/CO2 passive diffusion mechanics.',
      tags: ['Trachea', 'Bronchioles', 'Capillaries'],
      modelUrl: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'spine-vertebrae',
      title: 'Vertebral Column & Spinal Cord',
      system: 'Skeletal & Musculoskeletal',
      category: 'musculoskeletal',
      layers: 'Cervical to Sacral Segments',
      complexity: 'Biomechanical Stress',
      badge: 'Kinematic 3D',
      color: '#a78bfa',
      description:
        'Articulated spinal biomechanics highlighting facet joint articulation, disc compression, and nerve root exits.',
      tags: ['Lumbar', 'Intervertebral Disc', 'Nerve Roots'],
      modelUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'eye-retina',
      title: 'Ocular Globe & Photoreceptor Retina',
      system: 'Sensory & Ophthalmic',
      category: 'sensory',
      layers: 'Cornea to Fovea Centralis',
      complexity: 'Optic Ray Tracing',
      badge: 'Optics & Retina',
      color: '#38bdf8',
      description:
        'Ray-traced optical convergence from lens accommodation through vitreous body down to rod & cone photoreceptors.',
      tags: ['Cornea', 'Iris Diaphragm', 'Optic Nerve'],
      modelUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'cellular-dna',
      title: 'CRISPR Cas9 Genomic Molecular Complex',
      system: 'Cellular & Molecular',
      category: 'cellular',
      layers: 'Double Helix & Guide RNA',
      complexity: 'Sub-nanometer Lattice',
      badge: 'Molecular Ribbon',
      color: '#4ade80',
      description:
        'Steric biochemical model demonstrating ribonucleoprotein cleavage at target DNA base pairs.',
      tags: ['Cas9 Nuclease', 'sgRNA', 'Base Pairing'],
      modelUrl: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=600&q=80',
    },
  ]

  const filteredModules = organModules.filter((m) => {
    const matchesCategory =
      activeCategory === 'all' || m.category === activeCategory
    const matchesSearch =
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.system.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  return (
    <div className="flex h-screen w-full bg-[#0a0a0a] text-white font-sans overflow-hidden selection:bg-[#deff00] selection:text-[#0f0f0f]">
      {/* 1. Left Sidebar: BioDigital Anatomical Taxonomy */}
      <aside className="w-[280rem] lg:w-[310rem] shrink-0 border-r border-white/10 flex flex-col justify-between bg-[#0f0f0f] select-none">
        <div className="p-[20rem] lg:p-[24rem]">
          {/* Top Brand Header */}
          <div className="flex items-center justify-between pb-[20rem] border-b border-white/10">
            <div className="flex items-center gap-[12rem]">
              <div className="w-[30rem] h-[30rem] rounded-full bg-[#deff00] flex items-center justify-center text-[#0f0f0f] font-bold text-[14rem] shadow-[0_0_15px_rgba(222,255,0,0.3)]">
                M
              </div>
              <div>
                <span className="text-[16rem] tracking-tight font-medium block leading-none">
                  BioDigital <span className="text-[#deff00]">/ Lab</span>
                </span>
                <span className="text-[11rem] text-white/40 tracking-wider uppercase mt-[3rem] block">
                  3D Human Anatomy
                </span>
              </div>
            </div>
            {onBackToLanding && (
              <button
                onClick={onBackToLanding}
                className="text-white/40 hover:text-[#deff00] transition-colors p-[8rem] rounded-full hover:bg-white/5"
                title="Return to Landing Page"
              >
                <ArrowLeft className="w-[18rem] h-[18rem]" />
              </button>
            )}
          </div>

          {/* Sidebar System Categories */}
          <div className="mt-[24rem]">
            <p className="text-[11rem] uppercase tracking-wider text-white/40 font-medium px-[10rem] mb-[12rem]">
              Anatomical Systems
            </p>
            <nav className="space-y-[4rem]">
              {categories.map((cat) => {
                const Icon = cat.icon
                const isActive = activeCategory === cat.id
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`w-full flex items-center justify-between px-[14rem] py-[11rem] rounded-full text-[13rem] transition-all duration-200 group ${
                      isActive
                        ? 'bg-white text-[#0f0f0f] font-medium shadow-sm'
                        : 'text-white/70 hover:text-white hover:bg-white/[0.05]'
                    }`}
                  >
                    <div className="flex items-center gap-[12rem] truncate">
                      <Icon
                        className={`w-[16rem] h-[16rem] shrink-0 transition-colors ${
                          isActive
                            ? 'text-[#0f0f0f]'
                            : 'text-white/50 group-hover:text-[#deff00]'
                        }`}
                      />
                      <span className="truncate">{cat.label}</span>
                    </div>
                    <span
                      className={`px-[7rem] py-[2rem] text-[10rem] rounded-full font-mono ${
                        isActive
                          ? 'bg-[#0f0f0f] text-white'
                          : 'bg-white/10 text-white/60'
                      }`}
                    >
                      {cat.count}
                    </span>
                  </button>
                )
              })}
            </nav>
          </div>

          {/* Visual Layer Toggles */}
          <div className="mt-[28rem] pt-[20rem] border-t border-white/10">
            <p className="text-[11rem] uppercase tracking-wider text-white/40 font-medium px-[10rem] mb-[12rem]">
              Rendering Viewport
            </p>
            <div className="grid grid-cols-3 gap-[6rem] p-[4rem] rounded-full bg-white/[0.04] border border-white/10 text-[11rem]">
              <button
                onClick={() => setActiveViewMode('3d')}
                className={`py-[5rem] rounded-full transition-colors ${
                  activeViewMode === '3d'
                    ? 'bg-white text-[#0f0f0f] font-medium'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                Solid 3D
              </button>
              <button
                onClick={() => setActiveViewMode('slice')}
                className={`py-[5rem] rounded-full transition-colors ${
                  activeViewMode === 'slice'
                    ? 'bg-white text-[#0f0f0f] font-medium'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                Cross Slice
              </button>
              <button
                onClick={() => setActiveViewMode('xray')}
                className={`py-[5rem] rounded-full transition-colors ${
                  activeViewMode === 'xray'
                    ? 'bg-white text-[#0f0f0f] font-medium'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                X-Ray
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Hardware Status Badge */}
        <div className="p-[20rem] border-t border-white/10">
          <div className="flex items-center gap-[10rem] px-[12rem] py-[9rem] rounded-full border border-white/10 bg-white/[0.02]">
            <span className="relative flex h-[8rem] w-[8rem]">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#deff00] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-[8rem] w-[8rem] bg-[#deff00]"></span>
            </span>
            <span className="text-[12rem] text-white/80 font-medium truncate">
              WebGL 3D Engine • 60 FPS
            </span>
          </div>
        </div>
      </aside>

      {/* 2. Main Work Area: Top Command Bar & 3D Organ Card Grid */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Command Bar */}
        <header className="h-[68rem] shrink-0 border-b border-white/10 px-[32rem] flex items-center justify-between bg-[#0a0a0a]/90 backdrop-blur-md">
          {/* Anatomy Search Input */}
          <div className="flex items-center gap-[14rem] w-[420rem]">
            <div className="relative w-full">
              <Search className="w-[16rem] h-[16rem] absolute left-[14rem] top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search organs, cardiovascular, neural structures..."
                className="w-full bg-white/[0.04] border border-white/10 rounded-full pl-[40rem] pr-[60rem] py-[8rem] text-[13rem] text-white placeholder-white/40 focus:outline-none focus:border-[#deff00] transition-colors"
              />
              <span className="absolute right-[12rem] top-1/2 -translate-y-1/2 text-[10rem] px-[6rem] py-[2rem] rounded bg-white/10 text-white/50 font-mono">
                ⌘K
              </span>
            </div>
          </div>

          {/* Quick Filters and CTA */}
          <div className="flex items-center gap-[16rem]">
            <div className="flex items-center gap-[8rem] text-[12rem] text-white/60">
              <span className="w-[8rem] h-[8rem] rounded-full bg-[#deff00]"></span>
              <span>Showing {filteredModules.length} Organ Modules</span>
            </div>

            <button className="flex items-center gap-[8rem] px-[18rem] py-[8rem] rounded-full border border-white/20 text-white hover:border-[#deff00] hover:text-[#deff00] text-[13rem] transition-colors">
              <SlidersHorizontal className="w-[14rem] h-[14rem]" />
              <span>Filters</span>
            </button>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 overflow-y-auto p-[32rem] space-y-[32rem]">
          {/* Breadcrumb & Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-[16rem] pb-[4rem]">
            <div>
              <div className="flex items-center gap-[8rem] text-[13rem] text-white/50 mb-[6rem]">
                <span>BioDigital Human</span>
                <span>/</span>
                <span className="text-[#deff00]">Interactive Anatomy</span>
              </div>
              <h1 className="text-[32rem] font-normal tracking-tight text-white">
                Human Biological Modules
              </h1>
            </div>

            <div className="text-[13rem] text-white/50 font-mono">
              ENGINE // V9.4 PRO • ANATOMY EXPLORER
            </div>
          </div>

          {/* 3. 3D Organ Card Grid (BioDigital Layout translated to Makepill Minimal Aesthetic) */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[24rem]">
            {filteredModules.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedOrgan(item)}
                className="group relative rounded-2xl border border-white/10 bg-[#0f0f0f] overflow-hidden hover:border-[#deff00]/50 transition-all duration-500 cursor-pointer flex flex-col justify-between"
              >
                {/* 3D Visualizer Canvas Window */}
                <div className="relative h-[220rem] w-full bg-gradient-to-b from-white/[0.04] to-transparent overflow-hidden flex items-center justify-center p-[20rem]">
                  {/* Subtle Grid Canvas Blueprint Lines */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24rem_24rem] pointer-events-none"></div>

                  {/* Organ Illustration / Visual Representation */}
                  <div className="relative z-10 w-[120rem] h-[120rem] rounded-full border border-white/10 bg-white/[0.02] flex items-center justify-center group-hover:scale-110 group-hover:border-[#deff00]/40 transition-all duration-700">
                    {/* Visual Pulsing Glow in Accent Color */}
                    <div
                      className="absolute inset-0 rounded-full opacity-20 blur-xl group-hover:opacity-40 transition-opacity"
                      style={{ backgroundColor: item.color }}
                    ></div>

                    {/* Organ Type Icon Representation */}
                    {item.category === 'cardiovascular' && (
                      <Heart className="w-[52rem] h-[52rem] text-[#ff3366] stroke-[1.5] group-hover:scale-105 transition-transform" />
                    )}
                    {item.category === 'nervous' && (
                      <Brain className="w-[52rem] h-[52rem] text-[#00e5ff] stroke-[1.5] group-hover:scale-105 transition-transform" />
                    )}
                    {item.category === 'respiratory' && (
                      <Flame className="w-[52rem] h-[52rem] text-[#deff00] stroke-[1.5] group-hover:scale-105 transition-transform" />
                    )}
                    {item.category === 'musculoskeletal' && (
                      <Bone className="w-[52rem] h-[52rem] text-[#a78bfa] stroke-[1.5] group-hover:scale-105 transition-transform" />
                    )}
                    {item.category === 'sensory' && (
                      <Eye className="w-[52rem] h-[52rem] text-[#38bdf8] stroke-[1.5] group-hover:scale-105 transition-transform" />
                    )}
                    {item.category === 'cellular' && (
                      <Microscope className="w-[52rem] h-[52rem] text-[#4ade80] stroke-[1.5] group-hover:scale-105 transition-transform" />
                    )}
                  </div>

                  {/* Top Floating Badges */}
                  <div className="absolute top-[16rem] left-[16rem] right-[16rem] flex items-center justify-between z-20">
                    <span className="px-[10rem] py-[4rem] rounded-full text-[10rem] font-mono uppercase tracking-wider border border-white/10 bg-[#0a0a0a]/80 backdrop-blur-md text-white/80">
                      {item.badge}
                    </span>
                    <button className="w-[28rem] h-[28rem] rounded-full border border-white/10 bg-[#0a0a0a]/80 flex items-center justify-center text-white/40 hover:text-white transition-colors">
                      <Bookmark className="w-[13rem] h-[13rem]" />
                    </button>
                  </div>

                  {/* Bottom Viewport Coordinate Tag */}
                  <div className="absolute bottom-[12rem] right-[16rem] text-[10rem] font-mono text-white/30 z-20">
                    {item.layers}
                  </div>
                </div>

                {/* Card Information Body */}
                <div className="p-[22rem] flex-1 flex flex-col justify-between border-t border-white/10 bg-[#0f0f0f]">
                  <div>
                    {/* System Subtitle */}
                    <p className="text-[11rem] uppercase tracking-wider text-[#deff00] font-medium">
                      / {item.system}
                    </p>

                    {/* Title */}
                    <h3 className="mt-[6rem] text-[18rem] font-medium text-white group-hover:text-[#deff00] transition-colors leading-[130%]">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="mt-[10rem] text-[13rem] text-white/60 leading-[140%] line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  {/* Bottom Tags & Explore Trigger */}
                  <div className="mt-[20rem] pt-[16rem] border-t border-white/[0.08] flex items-center justify-between">
                    <div className="flex items-center gap-[6rem] flex-wrap">
                      {item.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-[8rem] py-[3rem] rounded-full text-[10rem] bg-white/[0.04] text-white/60 border border-white/5"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-[6rem] text-[12rem] font-medium text-white group-hover:text-[#deff00] transition-colors shrink-0">
                      <span>Explore 3D</span>
                      <ChevronRight className="w-[14rem] h-[14rem] group-hover:translate-x-[2rem] transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* 4. Quick Modal for Organ 3D Detail Viewport */}
      {selectedOrgan && (
        <div className="fixed inset-0 z-[5000] flex items-center justify-center p-[20rem] bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-[850rem] rounded-3xl border border-white/20 bg-[#0f0f0f] p-[32rem] shadow-2xl overflow-hidden">
            <div className="flex items-start justify-between pb-[20rem] border-b border-white/10">
              <div>
                <span className="text-[12rem] uppercase font-mono text-[#deff00]">
                  / {selectedOrgan.system}
                </span>
                <h2 className="text-[26rem] font-medium text-white mt-[4rem]">
                  {selectedOrgan.title}
                </h2>
              </div>
              <button
                onClick={() => setSelectedOrgan(null)}
                className="px-[16rem] py-[8rem] rounded-full border border-white/20 text-[12rem] text-white hover:bg-white hover:text-[#0f0f0f] transition-all"
              >
                Close Viewport ✕
              </button>
            </div>

            <div className="mt-[24rem] h-[340rem] rounded-2xl border border-white/10 bg-black/60 relative overflow-hidden flex items-center justify-center">
              <div
                className="absolute inset-0 opacity-20 blur-3xl pointer-events-none"
                style={{ backgroundColor: selectedOrgan.color }}
              ></div>
              <div className="relative z-10 text-center space-y-[16rem]">
                <div className="w-[100rem] h-[100rem] rounded-full border border-white/20 mx-auto flex items-center justify-center bg-white/5">
                  <Activity
                    className="w-[48rem] h-[48rem] animate-pulse"
                    style={{ color: selectedOrgan.color }}
                  />
                </div>
                <div>
                  <p className="text-[15rem] font-medium text-white">
                    Simulating 3D Biomechanical Mesh
                  </p>
                  <p className="text-[12rem] text-white/50 mt-[4rem] font-mono">
                    {selectedOrgan.complexity} • {selectedOrgan.layers}
                  </p>
                </div>
              </div>
            </div>

            <p className="mt-[20rem] text-[14rem] text-white/70 leading-[150%]">
              {selectedOrgan.description}
            </p>

            <div className="mt-[24rem] flex justify-end gap-[12rem]">
              <button
                onClick={() => setSelectedOrgan(null)}
                className="px-[24rem] py-[10rem] rounded-full bg-[#deff00] text-[#0f0f0f] font-medium text-[13rem] hover:bg-white transition-all shadow-[0_0_20px_rgba(222,255,0,0.3)]"
              >
                Launch Full-Screen BioModel →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
