import { useState } from 'react'
import {
  Search,
  Compass,
  FileText,
  Activity,
  ChevronDown,
  Layers,
  ChevronLeft,
  ChevronRight,
  Brain,
  Wind,
  ShieldCheck,
  Stethoscope,
  Heart,
  Bone,
  Eye,
  Dna,
  Droplets,
  Zap,
} from 'lucide-react'

export default function ToolfolioSidebar({
  onNavigate,
  activeRoute = 'system',
  activeCategory = 'system',
  onSelectCategory,
  activeSubFilter = 'all',
  onSelectSubFilter,
}) {
  const [collapsed, setCollapsed] = useState(false)
  const [openSections, setOpenSections] = useState({
    explore: true,
    systems: true,
    regions: false,
    detailLevel: false,
  })

  const toggleSection = (key) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  // 1. Primary Category Navigation (1:1 BioDigital Human Explore Tree)
  const exploreCategories = [
    { id: 'system', label: 'Anatomy by System', count: 142, icon: Layers },
    { id: 'regional', label: 'Anatomy by Region', count: 114, icon: Compass },
    { id: 'specialties', label: 'Clinical Specialties', count: 68, icon: Stethoscope },
    { id: 'conditions', label: 'Health Conditions', count: 54, icon: Activity },
  ]

  // 2. Exact Human Systems Taxonomy (categoryId=system)
  const humanSystems = [
    { id: 'cardiovascular', label: 'Cardiovascular System', count: 28, icon: Heart },
    { id: 'respiratory', label: 'Respiratory System', count: 22, icon: Wind },
    { id: 'nervous', label: 'Nervous System', count: 34, icon: Brain },
    { id: 'digestive', label: 'Digestive System', count: 19, icon: Droplets },
    { id: 'musculoskeletal', label: 'Musculoskeletal System', count: 25, icon: Bone },
    { id: 'urinary', label: 'Urinary System', count: 14, icon: ShieldCheck },
    { id: 'endocrine', label: 'Endocrine System', count: 12, icon: Zap },
    { id: 'lymphatic', label: 'Lymphatic & Immune', count: 11, icon: ShieldCheck },
    { id: 'integumentary', label: 'Integumentary System', count: 9, icon: Eye },
    { id: 'reproductive', label: 'Reproductive System', count: 16, icon: Dna },
  ]

  // 3. Regional Anatomy Taxonomy (categoryId=regional)
  const regionalTaxonomy = [
    { id: 'head-neck', label: 'Head and Neck', count: 38, icon: Brain },
    { id: 'thorax', label: 'Thorax', count: 24, icon: Wind },
    { id: 'abdomen', label: 'Abdomen', count: 18, icon: Droplets },
    { id: 'pelvis', label: 'Pelvis & Perineum', count: 16, icon: ShieldCheck },
    { id: 'back', label: 'Back & Spine', count: 12, icon: Bone },
    { id: 'upper-limb', label: 'Upper Limb', count: 14, icon: Bone },
    { id: 'lower-limb', label: 'Lower Limb', count: 15, icon: Bone },
  ]

  // 4. Level of Detail
  const detailLevels = [
    { id: 'gross', label: 'Gross Anatomy', count: 82 },
    { id: 'tissue', label: 'Tissue & Cellular', count: 42 },
    { id: 'molecular', label: 'Molecular & Synaptic', count: 18 },
  ]

  return (
    <aside
      className={`nav-sidebar group/sidebar sticky top-0 left-0 z-30 h-screen shrink-0 bg-white text-[#0f172a] border-r border-[#e2e8f0] flex flex-col justify-between transition-all duration-200 select-none shadow-2xs ${
        collapsed ? 'w-[76rem]' : 'w-[300rem]'
      }`}
    >
      <div className="flex h-full w-full flex-col overflow-hidden">
        {/* =========================================================================
            1. HEADER ZONE (BioDigital Clean Light 1:1)
            ========================================================================= */}
        <div className="flex h-[60rem] shrink-0 items-center justify-between px-[18rem] border-b border-[#e2e8f0] bg-white">
          <div className="flex items-center gap-[12rem] truncate">
            {/* BioDigital Monogram Mark */}
            <div className="flex h-[36rem] w-[36rem] shrink-0 items-center justify-center rounded-[8rem] bg-[#2472e9] text-white shadow-xs">
              <svg
                viewBox="0 0 195 95"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-[20rem] h-[20rem] text-white"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M92.5373 92.5374C94.0557 91.0681 94.9996 89.0088 94.9996 86.729L94.9996 0L71.7278 0L71.7278 52.3103L23.5537 4.13617L4.66018 23.0297L53.3583 71.7278L0 71.7278L0 94.9996L86.729 94.9996C89.0087 94.9996 91.068 94.0557 92.5373 92.5374ZM171.06 41.6331L171.06 95H194.332L194.332 8.27101C194.332 5.99129 193.388 3.93204 191.869 2.46271C190.4 0.944334 188.341 0.000389576 186.061 0.000389483L99.332 0V23.2722L151.634 23.2722L103.46 71.4463L122.353 90.3398L171.06 41.6331Z"
                  fill="currentColor"
                />
              </svg>
            </div>

            {!collapsed && (
              <div className="flex items-baseline gap-[6rem] truncate">
                <span className="text-[17rem] font-bold tracking-tight text-[#0f172a]">
                  BioDigital
                </span>
                <span className="text-[12.5rem] font-semibold text-[#64748b]">Human</span>
              </div>
            )}
          </div>

          {!collapsed && (
            <span className="text-[11rem] font-bold px-[8rem] py-[2.5rem] rounded-[6rem] bg-[#f1f5f9] text-[#475569] border border-[#e2e8f0]">
              v2.4
            </span>
          )}
        </div>

        {/* =========================================================================
            2. SEARCH BAR ACTION (Light Clean Input)
            ========================================================================= */}
        <div className="p-[12rem] shrink-0">
          <div
            className={`w-full flex items-center justify-between py-[9rem] px-[12rem] text-[#64748b] bg-[#f8fafc] hover:bg-[#f1f5f9] border border-[#e2e8f0] rounded-[8rem] transition-all cursor-pointer ${
              collapsed ? 'justify-center px-0' : ''
            }`}
          >
            <div className="flex items-center gap-[10rem] truncate">
              <Search className="w-[16rem] h-[16rem] shrink-0 text-[#94a3b8]" />
              {!collapsed && (
                <span className="text-[13.5rem] font-medium truncate">Cari sistem atau organ...</span>
              )}
            </div>
            {!collapsed && (
              <kbd className="text-[11rem] font-bold px-[7rem] py-[2.5rem] rounded-[5rem] bg-white text-[#64748b] border border-[#cbd5e1] shadow-2xs">
                K
              </kbd>
            )}
          </div>
        </div>

        {/* =========================================================================
            3. EXPLORE CATEGORIES (Anatomy by System / Regional)
            - NO LEFT LINE! Pure Rounded Pill Active State
            ========================================================================= */}
        <div className="px-[10rem] pb-[6rem] shrink-0 space-y-[3rem]">
          {!collapsed && (
            <div className="px-[12rem] py-[4rem] text-[11.5rem] font-bold uppercase tracking-wider text-[#94a3b8]">
              Explore 3D Library
            </div>
          )}
          {exploreCategories.map((cat) => {
            const Icon = cat.icon
            const isCatActive = activeCategory === cat.id
            return (
              <button
                key={cat.id}
                onClick={() => {
                  onSelectCategory?.(cat.id)
                  onNavigate?.(cat.id)
                }}
                className={`w-full flex items-center justify-between py-[8.5rem] px-[12rem] rounded-[8rem] text-[14rem] transition-all duration-150 cursor-pointer ${
                  isCatActive
                    ? 'bg-[#eff6ff] text-[#1d4ed8] font-bold border border-[#bfdbfe]/60 shadow-2xs'
                    : 'text-[#475569] hover:text-[#0f172a] hover:bg-[#f1f5f9] font-medium'
                } ${collapsed ? 'justify-center px-0' : ''}`}
                title={cat.label}
              >
                <div className="flex items-center gap-[10rem] truncate">
                  <Icon
                    className={`w-[17rem] h-[17rem] shrink-0 transition-colors ${
                      isCatActive ? 'text-[#2472e9]' : 'text-[#64748b]'
                    }`}
                  />
                  {!collapsed && <span className="truncate">{cat.label}</span>}
                </div>
                {!collapsed && (
                  <span
                    className={`text-[11.5rem] font-bold px-[6rem] py-[1.5rem] rounded-[6rem] ${
                      isCatActive ? 'bg-[#dbeafe] text-[#1e40af]' : 'text-[#94a3b8]'
                    }`}
                  >
                    {cat.count}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {/* Divider */}
        <div className="border-t border-[#e2e8f0] my-[8rem] shrink-0" />

        {/* =========================================================================
            4. ACCORDION: BODY SYSTEMS (1:1 BioDigital categoryId=system)
            - NO LEFT LINE! Rounded Pill Container
            ========================================================================= */}
        <div className="flex-1 overflow-y-auto px-[10rem] space-y-[14rem] scrollbar-none">
          {/* Section: Systems */}
          <div>
            {!collapsed ? (
              <button
                onClick={() => toggleSection('systems')}
                className="w-full flex items-center justify-between py-[6rem] px-[12rem] text-[11.5rem] uppercase tracking-wider text-[#94a3b8] hover:text-[#0f172a] font-bold transition-colors cursor-pointer"
              >
                <span>Body Systems</span>
                <ChevronDown
                  className={`w-[15rem] h-[15rem] text-[#94a3b8] transition-transform duration-200 ${
                    openSections.systems ? 'rotate-0' : '-rotate-90'
                  }`}
                />
              </button>
            ) : (
              <div className="py-[6rem] text-center text-[11rem] text-[#94a3b8] font-bold">SYS</div>
            )}

            {(!collapsed ? openSections.systems : true) && (
              <div className="mt-[3rem] space-y-[2.5rem]">
                {humanSystems.map((sys) => {
                  const Icon = sys.icon
                  const isSysActive = activeSubFilter === sys.id
                  return (
                    <button
                      key={sys.id}
                      onClick={() => onSelectSubFilter?.(sys.id)}
                      className={`w-full flex items-center justify-between py-[7.5rem] px-[12rem] rounded-[8rem] text-[13.5rem] transition-all duration-150 cursor-pointer ${
                        isSysActive
                          ? 'bg-[#f1f5f9] text-[#0f172a] font-bold border border-[#cbd5e1]/60 shadow-2xs'
                          : 'text-[#475569] hover:text-[#0f172a] hover:bg-[#f8fafc] font-medium'
                      } ${collapsed ? 'justify-center px-0' : ''}`}
                      title={sys.label}
                    >
                      <div className="flex items-center gap-[10rem] truncate">
                        <Icon
                          className={`w-[15rem] h-[15rem] shrink-0 transition-colors ${
                            isSysActive ? 'text-[#2472e9]' : 'text-[#94a3b8]'
                          }`}
                        />
                        {!collapsed && <span className="truncate">{sys.label}</span>}
                      </div>
                      {!collapsed && (
                        <span
                          className={`text-[11.5rem] font-semibold px-[6rem] py-[1rem] rounded-[5rem] ${
                            isSysActive ? 'bg-white text-[#0f172a] shadow-2xs' : 'text-[#94a3b8]'
                          }`}
                        >
                          {sys.count}
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="border-t border-[#e2e8f0]" />

          {/* Section: Level of Detail */}
          <div>
            {!collapsed ? (
              <button
                onClick={() => toggleSection('detailLevel')}
                className="w-full flex items-center justify-between py-[6rem] px-[12rem] text-[11.5rem] uppercase tracking-wider text-[#94a3b8] hover:text-[#0f172a] font-bold transition-colors cursor-pointer"
              >
                <span>Level of Detail</span>
                <ChevronDown
                  className={`w-[15rem] h-[15rem] text-[#94a3b8] transition-transform duration-200 ${
                    openSections.detailLevel ? 'rotate-0' : '-rotate-90'
                  }`}
                />
              </button>
            ) : (
              <div className="py-[6rem] text-center text-[11rem] text-[#94a3b8] font-bold">LVL</div>
            )}

            {(!collapsed ? openSections.detailLevel : true) && (
              <div className="mt-[3rem] space-y-[2.5rem] pb-[16rem]">
                {detailLevels.map((lvl) => {
                  return (
                    <button
                      key={lvl.id}
                      className={`w-full flex items-center justify-between py-[7.5rem] px-[12rem] rounded-[8rem] text-[13.5rem] text-[#475569] hover:text-[#0f172a] hover:bg-[#f8fafc] font-medium transition-colors cursor-pointer ${
                        collapsed ? 'justify-center px-0' : ''
                      }`}
                      title={lvl.label}
                    >
                      <span className="truncate">{!collapsed ? lvl.label : lvl.id}</span>
                      {!collapsed && (
                        <span className="text-[11.5rem] font-semibold text-[#94a3b8]">
                          {lvl.count}
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        {/* =========================================================================
            5. FOOTER ZONE (Light Clean BioDigital Style)
            ========================================================================= */}
        <div className="border-t border-[#e2e8f0] p-[10rem] flex items-center justify-between shrink-0 bg-white">
          {!collapsed ? (
            <button
              type="button"
              onClick={() => onNavigate?.('preview')}
              className="flex items-center gap-[10rem] py-[9rem] px-[12rem] text-[#475569] hover:text-[#0f172a] hover:bg-[#f1f5f9] rounded-[8rem] font-semibold text-[13.5rem] transition-colors cursor-pointer flex-1"
            >
              <Activity className="w-[16rem] h-[16rem] text-[#2472e9]" />
              <span>3D Organ Viewer</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onNavigate?.('preview')}
              className="w-full flex justify-center py-[9rem] text-[#475569] hover:text-[#0f172a]"
              title="3D Organ Viewer"
            >
              <Activity className="w-[18rem] h-[18rem] text-[#2472e9]" />
            </button>
          )}

          <button
            type="button"
            onClick={() => setCollapsed(!collapsed)}
            className="flex h-[34rem] w-[34rem] items-center justify-center rounded-[8rem] text-[#94a3b8] hover:text-[#0f172a] hover:bg-[#f1f5f9] transition-colors cursor-pointer shrink-0 ml-[6rem]"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? (
              <ChevronRight className="w-[17rem] h-[17rem]" />
            ) : (
              <ChevronLeft className="w-[17rem] h-[17rem]" />
            )}
          </button>
        </div>
      </div>
    </aside>
  )
}
