import { useState, useMemo, useEffect } from 'react'
import '../styles/biodigital-isolated.css'
import CATALOG_MODULES from '../data/biodigitalCatalog.json'
import {
  ChevronDown,
  Lock,
  MoreVertical,
  Search,
  Menu,
  X,
  SlidersHorizontal,
  Layers,
  Sparkles,
  RotateCcw,
  ExternalLink,
  Check,
  Globe,
} from 'lucide-react'

export default function Dashboard2({ onBackToLanding, onNavigateToPreview }) {
  // Reset root font-size to standard 16px to isolate from Makepill landing fluid font size
  useEffect(() => {
    const prevFontSize = document.documentElement.style.fontSize
    document.documentElement.style.fontSize = '16px'
    return () => {
      document.documentElement.style.fontSize = prevFontSize
    }
  }, [])
  // Navigation & Filter States
  const [activeTab, setActiveTab] = useState('all') // 'all' | 'anatomy' | 'conditions' | 'treatments'
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all-models')
  const [selectedAccessFilter, setSelectedAccessFilter] = useState('all') // 'all' | 'free' | 'premium'
  const [sortBy, setSortBy] = useState('relevance') // 'relevance' | 'alpha-asc' | 'alpha-desc'
  
  // UI Interactive States
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false)
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false)
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false)
  const [isCategoryGroupOpen, setIsCategoryGroupOpen] = useState(true)
  const [isRegionsSubmenuOpen, setIsRegionsSubmenuOpen] = useState(false)
  const [selectedModule, setSelectedModule] = useState(null) // For 3D Embed Modal

  // Filter & Sort Logic
  const filteredModules = useMemo(() => {
    let list = [...CATALOG_MODULES]

    // 1. Tab Filter
    if (activeTab === 'anatomy') {
      list = list.filter(
        (m) => m.type === 'anatomy' || m.tags?.includes('Anatomy and Physiology')
      )
    } else if (activeTab === 'conditions') {
      list = list.filter(
        (m) => m.type === 'conditions' || m.tags?.includes('Disease')
      )
    } else if (activeTab === 'treatments') {
      list = list.filter(
        (m) =>
          m.type === 'treatments' ||
          m.tags?.includes('Tour') ||
          m.tags?.includes('Guided Anatomy')
      )
    }

    // 2. Sidebar Category Filter
    if (selectedCategory !== 'all-models') {
      if (selectedCategory.startsWith('region:')) {
        const targetRegion = selectedCategory.replace('region:', '').toLowerCase()
        list = list.filter(
          (m) => m.region?.toLowerCase() === targetRegion
        )
      } else if (selectedCategory.startsWith('specialty:')) {
        const targetSpec = selectedCategory.replace('specialty:', '').toLowerCase()
        list = list.filter(
          (m) =>
            m.specialty?.toLowerCase() === targetSpec ||
            m.tags?.some((t) => t.toLowerCase().includes(targetSpec))
        )
      }
    }

    // 3. Access Filter (Free vs Premium)
    if (selectedAccessFilter === 'free') {
      list = list.filter((m) => !m.isLocked)
    } else if (selectedAccessFilter === 'premium') {
      list = list.filter((m) => m.isLocked)
    }

    // 4. Search Filter
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim()
      list = list.filter(
        (m) =>
          m.title.toLowerCase().includes(q) ||
          m.region?.toLowerCase().includes(q) ||
          m.description?.toLowerCase().includes(q) ||
          m.tags?.some((t) => t.toLowerCase().includes(q))
      )
    }

    // 5. Sorting
    if (sortBy === 'alpha-asc') {
      list.sort((a, b) => a.title.localeCompare(b.title))
    } else if (sortBy === 'alpha-desc') {
      list.sort((a, b) => b.title.localeCompare(a.title))
    }

    return list
  }, [activeTab, selectedCategory, selectedAccessFilter, searchQuery, sortBy])

  // Dynamic Header Title Calculation
  const currentCategoryTitle = useMemo(() => {
    if (selectedCategory === 'all-models') return 'All Models'
    if (selectedCategory.startsWith('region:')) {
      return `Region: ${selectedCategory.replace('region:', '')}`
    }
    if (selectedCategory.startsWith('specialty:')) {
      return `Specialty: ${selectedCategory.replace('specialty:', '')}`
    }
    return 'All Models'
  }, [selectedCategory])

  // Count to display
  const resultCountText = useMemo(() => {
    if (selectedCategory === 'all-models' && searchQuery === '' && activeTab === 'all' && selectedAccessFilter === 'all') {
      return '1440 results'
    }
    return `${filteredModules.length} results`
  }, [selectedCategory, searchQuery, activeTab, selectedAccessFilter, filteredModules.length])

  // Handle category selection
  const handleSelectCategory = (catId) => {
    setSelectedCategory(catId)
    setIsMobileDrawerOpen(false)
  }

  // Sidebar Component for Desktop & Mobile
  const renderSidebarContent = () => (
    <div className="flex flex-col h-full justify-between pb-8 select-none text-[#14233c]">
      <div>
        {/* Category Accordion Header */}
        <div
          onClick={() => setIsCategoryGroupOpen(!isCategoryGroupOpen)}
          className="h-[60px] sm:h-[70px] px-5 sm:px-6 flex items-center justify-between cursor-pointer border-b border-[#ececec] hover:bg-slate-50/50 transition-colors"
        >
          <span className="text-[16px] sm:text-[17px] font-bold text-[#14233c] tracking-tight">
            Category
          </span>
          <ChevronDown
            className={`w-[18px] h-[18px] text-[#14233c] stroke-[2.5] transition-transform duration-200 ${
              isCategoryGroupOpen ? '' : '-rotate-90'
            }`}
          />
        </div>

        {isCategoryGroupOpen && (
          <div className="py-2">
            {/* Item 1: All Models */}
            <button
              type="button"
              onClick={() => handleSelectCategory('all-models')}
              style={{
                backgroundColor: selectedCategory === 'all-models' ? '#f4f6f8' : 'transparent',
                borderLeft: selectedCategory === 'all-models' ? '4px solid #0060c4' : '4px solid transparent',
              }}
              className="w-full flex items-center px-5 sm:px-6 py-3 gap-3.5 cursor-pointer transition-colors border-0 outline-none text-left hover:bg-slate-100/60"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0">
                <circle cx="4" cy="4" r="2.8" fill="#0084ff" />
                <circle cx="12" cy="4" r="2.8" fill="#0084ff" />
                <circle cx="20" cy="4" r="2.8" fill="#0084ff" />
                <circle cx="4" cy="12" r="2.8" fill="#0084ff" />
                <circle cx="12" cy="12" r="2.8" fill="#0084ff" />
                <circle cx="20" cy="12" r="2.8" fill="#0084ff" />
                <circle cx="4" cy="20" r="2.8" fill="#0084ff" />
                <circle cx="12" cy="20" r="2.8" fill="#0084ff" />
                <circle cx="20" cy="20" r="2.8" fill="#0084ff" />
              </svg>
              <span className="text-[14.5px] font-bold text-[#14233c]">
                All Models
              </span>
            </button>

            {/* Subheader: ANATOMY */}
            <div className="px-5 sm:px-6 pt-5 pb-2 text-[11.5px] font-bold tracking-wider text-[#5c768d] uppercase">
              ANATOMY
            </div>

            <div className="space-y-0.5">
              {/* Anatomy by Region (with sub-filter expand) */}
              <div>
                <button
                  type="button"
                  onClick={() => setIsRegionsSubmenuOpen(!isRegionsSubmenuOpen)}
                  className="w-full flex items-center justify-between px-5 sm:px-6 py-2.5 gap-3.5 cursor-pointer hover:bg-slate-100/60 transition-colors border-0 outline-none text-left bg-transparent"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-5 h-5 flex items-center justify-center shrink-0">
                      <img
                        src="/assets/biodigital/icons/sb_region.png"
                        alt="Region Icon"
                        className="max-w-full max-h-full object-contain block"
                      />
                    </div>
                    <span className="text-[14px] font-semibold text-[#14233c]">
                      Anatomy by Region
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-[#5c768d] transition-transform duration-200 ${
                      isRegionsSubmenuOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isRegionsSubmenuOpen && (
                  <div className="pl-12 pr-4 py-1 space-y-1 bg-slate-50/70 border-y border-slate-100">
                    {[
                      { id: 'Abdomen', label: 'Abdomen (10)' },
                      { id: 'Thorax', label: 'Thorax (16)' },
                      { id: 'Head and Neck', label: 'Head and Neck (36)' },
                      { id: 'Lower Limb', label: 'Lower Limb (15)' },
                      { id: 'Upper Limb', label: 'Upper Limb (10)' },
                      { id: 'Pelvis', label: 'Pelvis (13)' },
                      { id: 'Back', label: 'Back (6)' },
                    ].map((reg) => (
                      <button
                        key={reg.id}
                        type="button"
                        onClick={() => handleSelectCategory(`region:${reg.id}`)}
                        className={`w-full text-left py-1.5 px-2 rounded text-[13px] transition-colors cursor-pointer ${
                          selectedCategory === `region:${reg.id}`
                            ? 'text-[#0060c4] font-bold bg-blue-50'
                            : 'text-[#334155] hover:text-[#0060c4]'
                        }`}
                      >
                        {reg.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Anatomy by System */}
              <button
                type="button"
                onClick={() => handleSelectCategory('all-models')}
                className="w-full flex items-center px-5 sm:px-6 py-2.5 gap-3.5 cursor-pointer hover:bg-slate-100/60 transition-colors border-0 outline-none text-left bg-transparent"
              >
                <div className="w-5 h-5 flex items-center justify-center shrink-0">
                  <img
                    src="/assets/biodigital/icons/sb_system.png"
                    alt="System Icon"
                    className="max-w-full max-h-full object-contain block"
                  />
                </div>
                <span className="text-[14px] font-semibold text-[#14233c]">
                  Anatomy by System
                </span>
              </button>

              {/* Complete Anatomy */}
              <button
                type="button"
                onClick={() => handleSelectCategory('all-models')}
                className="w-full flex items-center px-5 sm:px-6 py-2.5 gap-3.5 cursor-pointer hover:bg-slate-100/60 transition-colors border-0 outline-none text-left bg-transparent"
              >
                <div className="w-5 h-5 flex items-center justify-center shrink-0">
                  <img
                    src="/assets/biodigital/icons/sb_complete.png"
                    alt="Complete Anatomy Icon"
                    className="max-w-full max-h-full object-contain block"
                  />
                </div>
                <span className="text-[14px] font-semibold text-[#14233c]">
                  Complete Anatomy
                </span>
              </button>

              {/* Bony Landmarks */}
              <button
                type="button"
                onClick={() => handleSelectCategory('all-models')}
                className="w-full flex items-center px-5 sm:px-6 py-2.5 gap-3.5 cursor-pointer hover:bg-slate-100/60 transition-colors border-0 outline-none text-left bg-transparent"
              >
                <div className="w-5 h-5 flex items-center justify-center shrink-0">
                  <img
                    src="/assets/biodigital/icons/sb_bony.png"
                    alt="Bony Landmarks Icon"
                    className="max-w-full max-h-full object-contain block"
                  />
                </div>
                <span className="text-[13.5px] font-semibold text-[#14233c] leading-tight">
                  Bony Landmarks, Origins...
                </span>
              </button>

              {/* Cross Sections */}
              <button
                type="button"
                onClick={() => handleSelectCategory('all-models')}
                className="w-full flex items-center px-5 sm:px-6 py-2.5 gap-3.5 cursor-pointer hover:bg-slate-100/60 transition-colors border-0 outline-none text-left bg-transparent"
              >
                <div className="w-5 h-5 flex items-center justify-center shrink-0">
                  <img
                    src="/assets/biodigital/icons/sb_cross.png"
                    alt="Cross Sections Icon"
                    className="max-w-full max-h-full object-contain block"
                  />
                </div>
                <span className="text-[13.5px] font-semibold text-[#14233c] leading-tight">
                  Cross Sections & Micro...
                </span>
              </button>

              {/* Anatomy Quizzes */}
              <button
                type="button"
                onClick={() => handleSelectCategory('all-models')}
                className="w-full flex items-center px-5 sm:px-6 py-2.5 gap-3.5 cursor-pointer hover:bg-slate-100/60 transition-colors border-0 outline-none text-left bg-transparent"
              >
                <div className="w-5 h-5 flex items-center justify-center shrink-0">
                  <img
                    src="/assets/biodigital/icons/sb_quizzes.png"
                    alt="Anatomy Quizzes Icon"
                    className="max-w-full max-h-full object-contain block"
                  />
                </div>
                <span className="text-[14px] font-semibold text-[#14233c]">
                  Anatomy Quizzes
                </span>
              </button>
            </div>

            {/* Subheader: SPECIALTIES */}
            <div className="px-5 sm:px-6 pt-5 pb-2 text-[11.5px] font-bold tracking-wider text-[#5c768d] uppercase">
              SPECIALTIES
            </div>

            <div className="space-y-0.5">
              {/* Allergy */}
              <button
                type="button"
                onClick={() => handleSelectCategory('specialty:Allergy')}
                style={{
                  backgroundColor: selectedCategory === 'specialty:Allergy' ? '#f4f6f8' : 'transparent',
                  borderLeft: selectedCategory === 'specialty:Allergy' ? '4px solid #0060c4' : '4px solid transparent',
                }}
                className="w-full flex items-center px-5 sm:px-6 py-2.5 gap-3.5 cursor-pointer hover:bg-slate-100/60 transition-colors border-0 outline-none text-left"
              >
                <img
                  src="/assets/biodigital/icons/sb_allergy.png"
                  alt="Allergy Icon"
                  className="w-5 h-5 object-contain block shrink-0"
                />
                <span className="text-[14px] font-semibold text-[#14233c]">
                  Allergy & Immunology
                </span>
              </button>

              {/* Cardiology */}
              <button
                type="button"
                onClick={() => handleSelectCategory('specialty:Cardiology')}
                style={{
                  backgroundColor: selectedCategory === 'specialty:Cardiology' ? '#f4f6f8' : 'transparent',
                  borderLeft: selectedCategory === 'specialty:Cardiology' ? '4px solid #0060c4' : '4px solid transparent',
                }}
                className="w-full flex items-center px-5 sm:px-6 py-2.5 gap-3.5 cursor-pointer hover:bg-slate-100/60 transition-colors border-0 outline-none text-left"
              >
                <img
                  src="/assets/biodigital/icons/sb_cardio.png"
                  alt="Cardiology Icon"
                  className="w-5 h-5 object-contain block shrink-0"
                />
                <span className="text-[14px] font-semibold text-[#14233c]">
                  Cardiology
                </span>
              </button>

              {/* Dentistry */}
              <button
                type="button"
                onClick={() => handleSelectCategory('specialty:Dentistry')}
                style={{
                  backgroundColor: selectedCategory === 'specialty:Dentistry' ? '#f4f6f8' : 'transparent',
                  borderLeft: selectedCategory === 'specialty:Dentistry' ? '4px solid #0060c4' : '4px solid transparent',
                }}
                className="w-full flex items-center px-5 sm:px-6 py-2.5 gap-3.5 cursor-pointer hover:bg-slate-100/60 transition-colors border-0 outline-none text-left"
              >
                <img
                  src="/assets/biodigital/icons/sb_dental.png"
                  alt="Dentistry Icon"
                  className="w-5 h-5 object-contain block shrink-0"
                />
                <span className="text-[14px] font-semibold text-[#14233c]">
                  Dentistry
                </span>
              </button>

              {/* Gastroenterology */}
              <button
                type="button"
                onClick={() => handleSelectCategory('specialty:Gastroenterology and Hepatology')}
                style={{
                  backgroundColor: selectedCategory === 'specialty:Gastroenterology and Hepatology' ? '#f4f6f8' : 'transparent',
                  borderLeft: selectedCategory === 'specialty:Gastroenterology and Hepatology' ? '4px solid #0060c4' : '4px solid transparent',
                }}
                className="w-full flex items-center px-5 sm:px-6 py-2.5 gap-3.5 cursor-pointer hover:bg-slate-100/60 transition-colors border-0 outline-none text-left"
              >
                <Layers className="w-5 h-5 text-[#5c768d] shrink-0" />
                <span className="text-[14px] font-semibold text-[#14233c]">
                  Gastroenterology
                </span>
              </button>

              {/* Pulmonology */}
              <button
                type="button"
                onClick={() => handleSelectCategory('specialty:Pulmonology and Respiratory')}
                style={{
                  backgroundColor: selectedCategory === 'specialty:Pulmonology and Respiratory' ? '#f4f6f8' : 'transparent',
                  borderLeft: selectedCategory === 'specialty:Pulmonology and Respiratory' ? '4px solid #0060c4' : '4px solid transparent',
                }}
                className="w-full flex items-center px-5 sm:px-6 py-2.5 gap-3.5 cursor-pointer hover:bg-slate-100/60 transition-colors border-0 outline-none text-left"
              >
                <Layers className="w-5 h-5 text-[#5c768d] shrink-0" />
                <span className="text-[14px] font-semibold text-[#14233c]">
                  Pulmonology & Lungs
                </span>
              </button>

              {/* Urology */}
              <button
                type="button"
                onClick={() => handleSelectCategory('specialty:Urology and Nephrology')}
                style={{
                  backgroundColor: selectedCategory === 'specialty:Urology and Nephrology' ? '#f4f6f8' : 'transparent',
                  borderLeft: selectedCategory === 'specialty:Urology and Nephrology' ? '4px solid #0060c4' : '4px solid transparent',
                }}
                className="w-full flex items-center px-5 sm:px-6 py-2.5 gap-3.5 cursor-pointer hover:bg-slate-100/60 transition-colors border-0 outline-none text-left"
              >
                <Layers className="w-5 h-5 text-[#5c768d] shrink-0" />
                <span className="text-[14px] font-semibold text-[#14233c]">
                  Urology & Nephrology
                </span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Return to Project Landing Link */}
      {onBackToLanding && (
        <div className="px-5 sm:px-6 pt-4 border-t border-slate-200">
          <button
            type="button"
            onClick={onBackToLanding}
            className="w-full py-2 px-3 rounded text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-100/70 transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-slate-200"
          >
            ← Kembali ke Ideathon
          </button>
        </div>
      )}
    </div>
  )

  return (
    <div id="biodigital-root" className="w-full h-screen min-h-screen flex flex-col bg-[#fffff7] overflow-hidden select-none">
      {/* =========================================================================
          1. TOP GLOBAL NAVBAR (Midnight #000a1a, Height ~68px, Fluid Responsive)
          ========================================================================= */}
      <header
        style={{ backgroundColor: '#000a1a' }}
        className="w-full h-[68px] sm:h-[70px] border-b border-[#1a2638] px-4 sm:px-6 flex items-center justify-between text-white shrink-0 z-30"
      >
        {/* Left Side: Mobile Menu Button + BioDigital Monogram Mark + Nav Links */}
        <div className="flex items-center gap-3 sm:gap-6 h-full">
          {/* Mobile Hamburger Toggle (< md) */}
          <button
            type="button"
            onClick={() => setIsMobileDrawerOpen(true)}
            className="md:hidden w-9 h-9 rounded flex items-center justify-center text-white/90 hover:text-white hover:bg-white/10 transition-colors cursor-pointer border-0 outline-none"
            aria-label="Open Category Drawer"
          >
            <Menu className="w-5 h-5 stroke-[2.2]" />
          </button>

          {/* BioDigital Monogram Mark */}
          <div
            onClick={() => {
              setSelectedCategory('all-models')
              setActiveTab('all')
              setSearchQuery('')
            }}
            className="flex items-center cursor-pointer hover:opacity-90 transition-opacity"
            title="BioDigital Human Home"
          >
            <svg
              width="27"
              height="29"
              viewBox="0 0 27 29"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="shrink-0"
            >
              <rect x="0" y="0" width="7" height="29" rx="3.5" fill="white" />
              <path
                d="M8 0H18C22.4183 0 26 3.58172 26 8C26 11.5173 23.7252 14.5024 20.5 15.5C24.366 16.5 27 20 27 23.5C27 26.5376 24.5376 29 21.5 29H8V0Z"
                fill="white"
              />
              <rect x="11" y="4" width="7" height="7" rx="2" fill="#000a1a" />
              <rect x="11" y="18" width="7" height="7" rx="2" fill="#000a1a" />
            </svg>
          </div>

          {/* Navigation Links */}
          <nav className="flex items-center gap-5 sm:gap-8 h-full text-[13.5px] sm:text-[14px] font-bold tracking-[0.5px]">
            {/* EXPLORE (Active with Red Bottom Indicator) */}
            <button
              type="button"
              className="relative h-full flex items-center gap-1.5 text-white cursor-pointer bg-transparent border-0 outline-none p-0"
            >
              <span>EXPLORE</span>
              <ChevronDown className="w-3.5 h-3.5 text-white stroke-[3]" />
              <div
                style={{ backgroundColor: '#ff0015' }}
                className="absolute bottom-[6px] left-0 w-full h-[3px]"
              />
            </button>

            {/* MY LIBRARY */}
            <button
              type="button"
              className="hidden sm:flex h-full items-center text-[#c7d8e8] hover:text-white transition-colors cursor-pointer bg-transparent border-0 outline-none p-0"
            >
              <span>MY LIBRARY</span>
            </button>

            {/* STUDIO */}
            <button
              type="button"
              className="hidden md:flex h-full items-center text-[#c7d8e8] hover:text-white transition-colors cursor-pointer bg-transparent border-0 outline-none p-0"
            >
              <span>STUDIO</span>
            </button>
          </nav>
        </div>

        {/* Right Side: Upgrade Now CTA Button + Action Icons */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Upgrade Now Button */}
          <button
            type="button"
            style={{ backgroundColor: '#ff0015' }}
            className="h-[36px] sm:h-[39px] px-3 sm:px-4 rounded-[4px] text-white font-bold text-[12.5px] sm:text-[13.5px] tracking-tight hover:bg-[#d60012] active:scale-[0.98] transition-all cursor-pointer shadow-xs border-0 outline-none flex items-center justify-center shrink-0"
          >
            Upgrade Now
          </button>

          {/* Feedback Button */}
          <button
            type="button"
            className="w-9 h-9 sm:w-10 sm:h-[38px] rounded-[6px] border border-[#1a2a3f] bg-[#0c1726]/70 flex items-center justify-center text-white/90 hover:text-white hover:border-[#2ca6ff]/60 hover:bg-[#0c1726] transition-all cursor-pointer outline-none"
            title="Feedback"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
            </svg>
          </button>

          {/* Help Button */}
          <button
            type="button"
            className="hidden sm:flex w-9 h-9 sm:w-10 sm:h-[38px] rounded-[6px] border border-[#1a2a3f] bg-[#0c1726]/70 items-center justify-center text-white/90 font-bold text-[15px] hover:text-white hover:border-[#2ca6ff]/60 hover:bg-[#0c1726] transition-all cursor-pointer outline-none"
            title="Help"
          >
            ?
          </button>

          {/* User Profile Button */}
          <button
            type="button"
            className="w-9 h-9 sm:w-10 sm:h-[38px] rounded-[6px] border border-[#1a2a3f] bg-[#0c1726]/70 flex items-center justify-center text-white/90 hover:text-white hover:border-[#2ca6ff]/60 hover:bg-[#0c1726] transition-all cursor-pointer outline-none"
            title="Profile"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </button>
        </div>
      </header>

      {/* =========================================================================
          2. WORKSPACE CONTAINER (Sidebar Rail + Main Content Canvas)
          ========================================================================= */}
      <div className="flex-1 flex overflow-hidden w-full relative">
        {/* ---------------------------------------------------------------------
            DESKTOP SIDEBAR (Pure Semantic HTML Rail, Exact Target Matching)
            --------------------------------------------------------------------- */}
        <aside
          style={{ backgroundColor: '#fffff7' }}
          className="hidden md:flex flex-col w-[260px] lg:w-[290px] xl:w-[310px] shrink-0 border-r border-[#d4d4d4] overflow-y-auto bio-scroll select-none"
        >
          {renderSidebarContent()}
        </aside>

        {/* ---------------------------------------------------------------------
            MOBILE SIDEBAR DRAWER (Sliding Drawer with Backdrop Overlay)
            --------------------------------------------------------------------- */}
        {isMobileDrawerOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex">
            {/* Backdrop */}
            <div
              onClick={() => setIsMobileDrawerOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            />
            {/* Sliding Panel */}
            <div
              style={{ backgroundColor: '#fffff7' }}
              className="relative w-[290px] max-w-[85vw] h-full shadow-2xl flex flex-col z-10 overflow-y-auto bio-scroll"
            >
              <div className="p-4 border-b border-slate-200 flex items-center justify-between">
                <span className="font-bold text-[#14233c] text-base">Categories</span>
                <button
                  type="button"
                  onClick={() => setIsMobileDrawerOpen(false)}
                  className="w-8 h-8 rounded-full hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              {renderSidebarContent()}
            </div>
          </div>
        )}

        {/* =====================================================================
            3. MAIN CONTENT AREA (Full Right Panel Unified Scrolling)
            ===================================================================== */}
        <main
          style={{ backgroundColor: '#fffff7' }}
          className="flex-1 overflow-y-auto bio-scroll flex flex-col min-w-0"
        >
          {/* -----------------------------------------------------------------
              TOOLBAR CONTAINER (Semantic Header, Omnibox, Tabs)
              ----------------------------------------------------------------- */}
          <div className="shrink-0 select-none flex flex-col pt-5 sm:pt-7 pb-2 px-4 sm:px-8 lg:px-12 border-b border-[#e5e7eb]/60 bg-[#fffff7]">
            {/* Row 1: Title Bar "All Models 1440 results" */}
            <div className="flex items-center gap-3 mb-4 sm:mb-5">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="shrink-0">
                <circle cx="4" cy="4" r="2.8" fill="#0084ff" />
                <circle cx="12" cy="4" r="2.8" fill="#0084ff" />
                <circle cx="20" cy="4" r="2.8" fill="#0084ff" />
                <circle cx="4" cy="12" r="2.8" fill="#0084ff" />
                <circle cx="12" cy="12" r="2.8" fill="#0084ff" />
                <circle cx="20" cy="12" r="2.8" fill="#0084ff" />
                <circle cx="4" cy="20" r="2.8" fill="#0084ff" />
                <circle cx="12" cy="20" r="2.8" fill="#0084ff" />
                <circle cx="20" cy="20" r="2.8" fill="#0084ff" />
              </svg>
              <div className="flex items-baseline gap-2.5 flex-wrap">
                <h1 className="text-[22px] sm:text-[26px] md:text-[28px] font-bold text-[#0c182a] tracking-tight leading-none">
                  {currentCategoryTitle}
                </h1>
                <span className="text-[14px] sm:text-[16px] text-[#4e7094] font-medium leading-none">
                  {resultCountText}
                </span>
              </div>
            </div>

            {/* Row 2: Search Omnibox + Integrated Filter + Right Controls */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 mb-4">
              {/* Left: Omnibox Input (Fluid width up to 704px) */}
              <div className="relative w-full max-w-full md:max-w-[550px] lg:max-w-[704px]">
                <div
                  style={{ borderColor: '#7ea2cc' }}
                  className="h-[46px] sm:h-[50px] border rounded-[4px] flex items-center bg-white shadow-2xs overflow-hidden"
                >
                  {/* Search Sparkle Icon */}
                  <div className="pl-3.5 pr-2.5 flex items-center justify-center">
                    <img
                      src="/assets/biodigital/icons/search_sparkle.png"
                      alt="Search Sparkle"
                      className="w-4 h-4 sm:w-[18px] sm:h-[18px] block shrink-0"
                    />
                  </div>

                  {/* Input Text Field */}
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search All Models"
                    className="flex-1 h-full py-2 text-[14.5px] sm:text-[15px] text-[#0c182a] placeholder:text-[#9bb9dc] outline-none bg-transparent"
                  />

                  {/* Clear Search Button if active */}
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="p-1 mr-2 text-slate-400 hover:text-slate-700 cursor-pointer"
                      title="Clear search"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}

                  {/* Integrated Filter Dropdown Button */}
                  <div className="relative h-full">
                    <button
                      type="button"
                      onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
                      style={{ borderLeft: '1px solid #7ea2cc' }}
                      className="h-full px-3.5 sm:px-4 flex items-center justify-center gap-1.5 text-[#0c182a] text-[14px] sm:text-[15px] font-medium hover:bg-slate-50 cursor-pointer bg-transparent border-y-0 border-r-0 outline-none"
                    >
                      <span>Filter</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 text-[#0c182a] stroke-[2.5] transition-transform ${
                          isFilterDropdownOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {/* Filter Popover Menu */}
                    {isFilterDropdownOpen && (
                      <div className="absolute right-0 top-full mt-1.5 w-60 bg-white rounded-lg shadow-xl border border-slate-200 p-3 z-40 text-sm">
                        <div className="font-bold text-[#0c182a] mb-2 text-xs uppercase tracking-wider text-[#5c768d]">
                          Filter Access
                        </div>
                        <div className="space-y-1 mb-3">
                          {[
                            { id: 'all', label: 'All Modules' },
                            { id: 'free', label: 'Free Models' },
                            { id: 'premium', label: 'Premium Models Only' },
                          ].map((opt) => (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() => {
                                setSelectedAccessFilter(opt.id)
                                setIsFilterDropdownOpen(false)
                              }}
                              className={`w-full text-left px-2.5 py-1.5 rounded flex items-center justify-between cursor-pointer ${
                                selectedAccessFilter === opt.id
                                  ? 'bg-blue-50 text-[#0060c4] font-semibold'
                                  : 'text-slate-700 hover:bg-slate-50'
                              }`}
                            >
                              <span>{opt.label}</span>
                              {selectedAccessFilter === opt.id && (
                                <Check className="w-3.5 h-3.5 text-[#0060c4]" />
                              )}
                            </button>
                          ))}
                        </div>

                        {selectedAccessFilter !== 'all' && (
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedAccessFilter('all')
                              setIsFilterDropdownOpen(false)
                            }}
                            className="w-full text-center py-1 text-xs text-[#0060c4] hover:underline cursor-pointer font-medium"
                          >
                            Reset Filter
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right: Language Selector + Sort Dropdown + Kebab Menu */}
              <div className="flex items-center gap-4 sm:gap-6 shrink-0 self-end md:self-auto">
                {/* Language Selector */}
                <div className="flex items-center gap-2 cursor-pointer text-[#0c182a] hover:opacity-80">
                  <img
                    src="/assets/biodigital/icons/us_flag.png"
                    alt="English"
                    className="w-[22px] h-[15px] sm:w-[24px] sm:h-[17px] block shadow-2xs"
                  />
                  <span className="text-[14px] sm:text-[15px] font-semibold">EN</span>
                  <ChevronDown className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>

                {/* Sort Dropdown */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                    className="flex items-center gap-1.5 cursor-pointer text-[#0c182a] hover:text-black font-semibold text-[14px] sm:text-[15px] bg-transparent border-0 outline-none p-0"
                  >
                    <span>
                      Sort:{' '}
                      {sortBy === 'relevance'
                        ? 'Relevance'
                        : sortBy === 'alpha-asc'
                        ? 'Name (A-Z)'
                        : 'Name (Z-A)'}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 stroke-[2.5]" />
                  </button>

                  {/* Sort Options Menu */}
                  {isSortDropdownOpen && (
                    <div className="absolute right-0 top-full mt-1.5 w-44 bg-white rounded-md shadow-xl border border-slate-200 py-1.5 z-40 text-sm">
                      {[
                        { id: 'relevance', label: 'Relevance' },
                        { id: 'alpha-asc', label: 'Alphabetical (A-Z)' },
                        { id: 'alpha-desc', label: 'Alphabetical (Z-A)' },
                      ].map((s) => (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => {
                            setSortBy(s.id)
                            setIsSortDropdownOpen(false)
                          }}
                          className={`w-full text-left px-3 py-1.5 flex items-center justify-between cursor-pointer ${
                            sortBy === s.id
                              ? 'bg-blue-50 text-[#0060c4] font-semibold'
                              : 'text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <span>{s.label}</span>
                          {sortBy === s.id && <Check className="w-3.5 h-3.5" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Kebab 3-dots Menu */}
                <button
                  type="button"
                  className="text-[#0c182a] hover:text-black cursor-pointer bg-transparent border-0 outline-none p-1"
                  title="More actions"
                >
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Row 3: Navigation Tabs with Red Underline */}
            <div className="flex items-center gap-6 sm:gap-8 overflow-x-auto no-scrollbar pt-2">
              {[
                { id: 'all', label: 'All' },
                { id: 'anatomy', label: 'Anatomy and Physiology' },
                { id: 'conditions', label: 'Conditions' },
                { id: 'treatments', label: 'Procedures and Treatments' },
              ].map((tab) => {
                const isActive = activeTab === tab.id
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className="relative pb-2.5 cursor-pointer bg-transparent border-0 outline-none p-0 shrink-0"
                  >
                    <span
                      className={`text-[14.5px] sm:text-[15px] font-bold transition-colors ${
                        isActive ? 'text-[#0060c4]' : 'text-[#0060c4]/80 hover:text-[#0060c4]'
                      }`}
                    >
                      {tab.label}
                    </span>
                    {isActive && (
                      <div
                        style={{ backgroundColor: '#ff0015' }}
                        className="absolute bottom-0 left-0 w-full h-[3px]"
                      />
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* -----------------------------------------------------------------
              CARDS GRID CONTAINER (Fluid Grid with Real Semantic Cards & Hover)
              ----------------------------------------------------------------- */}
          <div className="w-full px-4 sm:px-8 lg:px-12 py-6">
            {filteredModules.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 lg:gap-6 pb-12">
                {filteredModules.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedModule(item)}
                    className="group relative bg-white rounded-[8px] border border-[#e5e7eb] overflow-hidden flex flex-col cursor-pointer transition-all duration-200 ease-out hover:-translate-y-1.5 hover:shadow-xl hover:shadow-blue-950/10 hover:border-[#0060c4]"
                  >
                    {/* Thumbnail Image Container */}
                    <div className="relative w-full aspect-[4/3] bg-[#fbfbfb] overflow-hidden flex items-center justify-center border-b border-[#f1f5f9]">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-contain p-2.5 transition-transform duration-300 ease-out group-hover:scale-105"
                        loading="lazy"
                      />
                      {/* Blue Lock Badge for Premium Modules */}
                      {item.isLocked && (
                        <div
                          className="absolute top-2.5 right-2.5 w-[26px] h-[26px] rounded-full bg-[#2ca6ff] flex items-center justify-center text-white shadow-xs ring-2 ring-white/90"
                          title="Premium Module"
                        >
                          <Lock className="w-[13px] h-[13px] stroke-[2.5]" />
                        </div>
                      )}
                    </div>

                    {/* Card Footer / Title Bar */}
                    <div className="px-3.5 py-3 bg-white flex flex-col justify-center min-h-[54px]">
                      <h3
                        title={item.title}
                        className="text-[14px] font-semibold text-[#0c182a] group-hover:text-[#0060c4] transition-colors duration-200 line-clamp-1 leading-snug"
                      >
                        {item.title}
                      </h3>
                      <div className="flex items-center justify-between mt-1 text-[11.5px] text-[#5c768d]">
                        <span className="truncate">{item.region}</span>
                        {item.isLocked ? (
                          <span className="text-[#0060c4] font-medium text-[11px]">Premium</span>
                        ) : (
                          <span className="text-emerald-600 font-medium text-[11px]">Included</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Empty Search / Filter State */
              <div className="w-full h-80 flex flex-col items-center justify-center text-center p-6 bg-white/60 rounded-xl border border-dashed border-slate-300">
                <Search className="w-10 h-10 text-slate-400 mb-3" />
                <h3 className="text-base font-bold text-slate-800">No matching models found</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm">
                  We could not find any modules matching "{searchQuery}". Try searching for organs like "heart", "brain", "eye", or clear your filter.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('')
                    setActiveTab('all')
                    setSelectedCategory('all-models')
                    setSelectedAccessFilter('all')
                  }}
                  className="mt-4 px-4 py-2 bg-[#0060c4] hover:bg-[#004f9e] text-white text-xs font-bold rounded transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset all filters
                </button>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* =========================================================================
          4. 3D INTERACTIVE VIEWER MODAL (Real 3D Embed from BioDigital)
          ========================================================================= */}
      {selectedModule && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-xs">
          <div className="relative w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="px-5 sm:px-6 py-4 bg-[#000a1a] text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#0060c4] flex items-center justify-center shrink-0">
                  <Layers className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold leading-tight">
                    {selectedModule.title}
                  </h2>
                  <div className="flex items-center gap-2 text-xs text-[#9bb9dc] mt-0.5">
                    <span>{selectedModule.region}</span>
                    <span>•</span>
                    <span className="capitalize">{selectedModule.type}</span>
                    {selectedModule.isLocked && (
                      <>
                        <span>•</span>
                        <span className="text-[#38bdf8] flex items-center gap-1">
                          <Lock className="w-3 h-3" /> Premium
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedModule(null)}
                className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer border-0 outline-none"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal 3D Viewer Body */}
            <div className="flex-1 w-full bg-[#f8fafc] relative min-h-[350px] sm:min-h-[460px] max-h-[580px] flex items-center justify-center">
              {selectedModule.embedUrl ? (
                <iframe
                  src={selectedModule.embedUrl}
                  title={selectedModule.title}
                  className="w-full h-full border-0"
                  allow="fullscreen; xr-spatial-tracking"
                  loading="lazy"
                />
              ) : (
                <div className="p-8 text-center flex flex-col items-center">
                  <img
                    src={selectedModule.image}
                    alt={selectedModule.title}
                    className="max-h-64 object-contain rounded-lg shadow-md mb-4"
                  />
                  <p className="text-sm text-slate-600 max-w-md">
                    {selectedModule.description}
                  </p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-5 sm:px-6 py-3.5 bg-white border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
              <p className="text-xs text-slate-500 line-clamp-1 max-w-lg">
                {selectedModule.description}
              </p>
              <div className="flex items-center gap-2.5 shrink-0 self-end sm:self-auto">
                {selectedModule.isLocked && (
                  <button
                    type="button"
                    className="px-4 py-2 bg-[#ff0015] hover:bg-[#d60012] text-white text-xs font-bold rounded transition-colors cursor-pointer"
                  >
                    Upgrade to Unlock
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setSelectedModule(null)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-semibold rounded transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
