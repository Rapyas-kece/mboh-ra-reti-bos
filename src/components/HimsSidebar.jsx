import { useState, useEffect } from 'react'

const MENU_CATEGORIES = [
  {
    id: 'respirasi',
    label: 'Sistem Pernapasan (Paru-Paru)',
    badge: '3D LAB',
    desc: 'Simulasi akumulasi tar rokok & vape vs pemulihan silia',
    items: [
      {
        name: 'Uji Simulasi Paru 3D',
        actionType: 'preview',
        desc: 'WebGL interactive mesh dengan slider akumulasi 1-5 tahun',
      },
      {
        name: 'Katalog Produk Herbal Paru',
        actionType: 'dashboard',
        desc: 'Madu Gurah & Daun Saga terkurasi BPOM dari UMKM lokal',
      },
    ],
  },
  {
    id: 'kardiovaskular',
    label: 'Kardiovaskular (Jantung & Arteri)',
    desc: 'Dampak gaya hidup sedenter & plak kolesterol',
    items: [
      {
        name: 'Simulasi Jantung & Aliran Darah',
        actionType: 'preview',
        desc: 'Visualisasi penyempitan arteri koroner & perbaikan kardio',
      },
      {
        name: 'Suplemen Jantung BPOM',
        actionType: 'dashboard',
        desc: 'Ekstrak Bawang Putih & Daun Salam terstandar',
      },
    ],
  },
  {
    id: 'metabolisme',
    label: 'Metabolisme (Hati & Ginjal)',
    desc: 'Analisis risiko fatty liver, gula berlebih, & dehidrasi kronis',
    items: [
      {
        name: 'Eksplorasi Fisiologi Hepar',
        actionType: 'preview',
        desc: 'Pelajari laju filtrasi glomerulus dan detoksifikasi alami',
      },
      {
        name: 'Teh Temulawak & Herbal Hati',
        actionType: 'dashboard',
        desc: 'Rekomendasi preventif kontekstual UMKM binaan',
      },
    ],
  },
  {
    id: 'saraf',
    label: 'Sistem Saraf & Otak',
    desc: 'Pengaruh deprivasi tidur kronis dan stres mental',
    items: [
      {
        name: 'Analisis Perfusi Serebral',
        actionType: 'preview',
        desc: 'Visualisasi penurunan mikrovaskular saat begadang kronis',
      },
      {
        name: 'Herbal Relaksasi & Kualitas Tidur',
        actionType: 'dashboard',
        desc: 'Teh chamomile & pegagan lokal berizin resmi',
      },
    ],
  },
]

export default function HimsSidebar({ isOpen, onClose, onNavigate, onScrollToSection }) {
  const [activeCategory, setActiveCategory] = useState(null)

  // Prevent background scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      setActiveCategory(null)
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleAction = (actionType) => {
    onClose()
    if (actionType === 'preview') {
      onNavigate('preview')
    } else if (actionType === 'dashboard') {
      onNavigate('dashboard')
    } else if (actionType === 'section1') {
      if (onScrollToSection) onScrollToSection('section1')
    } else if (actionType === 'section2') {
      if (onScrollToSection) onScrollToSection('section2')
    }
  }

  return (
    <div className="fixed inset-0 z-[4000] flex justify-end select-none">
      {/* 1. Backdrop Overlay */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-[4px] transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* 2. Main Hims Sidebar Drawer */}
      <aside
        className="relative w-full max-w-[460px] h-full bg-[#FFFFF7] text-[#1A1816] shadow-2xl flex flex-col z-10 overflow-hidden transform transition-transform duration-300 ease-out animate-in slide-in-from-right"
        style={{ fontFamily: '"Neue Haas Grotesk Display Pro", -apple-system, sans-serif' }}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-black/8 bg-[#FFFFF7] shrink-0">
          {activeCategory ? (
            <button
              onClick={() => setActiveCategory(null)}
              className="inline-flex items-center gap-2 text-sm font-medium tracking-tight text-[#1A1816] hover:text-[#AE6313] transition-colors cursor-pointer"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
              <span>Semua Kategori</span>
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-[#1A1816]">
                anatomi<span className="text-[#AE6313]">lab</span>.
              </span>
              <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-black/5 text-[#736C65]">
                JOINTS 2026
              </span>
            </div>
          )}

          {/* Close 'X' Button */}
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="w-9 h-9 rounded-full flex items-center justify-center text-[#1A1816] hover:bg-black/5 transition-colors cursor-pointer"
          >
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Scrollable Navigation Body */}
        <div className="flex-1 overflow-y-auto">
          {activeCategory ? (
            /* Sub-category Drilldown View (1:1 with Hims Submenu) */
            <div className="px-6 py-6">
              <div className="mb-6">
                <h3 className="text-xl font-semibold tracking-tight text-[#1A1816]">
                  {activeCategory.label}
                </h3>
                <p className="text-xs text-[#736C65] mt-1">{activeCategory.desc}</p>
              </div>

              <div className="space-y-3">
                {activeCategory.items.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAction(item.actionType)}
                    className="w-full text-left p-4 rounded-xl hover:bg-black/[0.03] border border-black/5 transition-all group cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[15px] font-medium text-[#1A1816] group-hover:text-[#AE6313] transition-colors">
                        {item.name}
                      </span>
                      <span className="text-sm text-black/40 group-hover:translate-x-1 group-hover:text-[#AE6313] transition-all">
                        →
                      </span>
                    </div>
                    {item.desc && <p className="text-xs text-[#736C65] mt-1 leading-relaxed">{item.desc}</p>}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Root Menu Items (Hims Accordion Style) */
            <div className="divide-y divide-black/[0.06]">
              {/* Highlight Announcement */}
              <div className="px-6 py-4 bg-[#FDF7EF] border-b border-black/6">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold tracking-wider uppercase text-[#AE6313]">
                      Platform Terintegrasi
                    </span>
                    <p className="text-xs text-[#1A1816] font-medium mt-0.5">
                      Education × Healthcare × Economy
                    </p>
                  </div>
                  <button
                    onClick={() => handleAction('preview')}
                    className="px-3 py-1.5 rounded-full bg-[#1A1816] text-[#FFFFF7] text-[11px] font-medium hover:bg-black transition-colors cursor-pointer"
                  >
                    Buka 3D Lab
                  </button>
                </div>
              </div>

              {/* Primary System Categories */}
              {MENU_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat)}
                  className="w-full flex items-center justify-between px-6 py-4.5 text-left hover:bg-black/[0.02] transition-colors group cursor-pointer"
                >
                  <div className="pr-3">
                    <span className="flex items-center gap-2.5 text-[16px] font-medium text-[#1A1816] group-hover:text-[#AE6313] transition-colors">
                      {cat.label}
                      {cat.badge && (
                        <span className="text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-[#AE6313]/10 text-[#AE6313]">
                          {cat.badge}
                        </span>
                      )}
                    </span>
                    <p className="text-[12px] text-[#736C65] mt-0.5 line-clamp-1">{cat.desc}</p>
                  </div>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="shrink-0 text-black/30 group-hover:text-black/80 group-hover:translate-x-1 transition-all"
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              ))}

              {/* Direct Landing Page Section Links */}
              <div className="px-6 py-5 space-y-3 bg-[#FFFFF7]">
                <span className="block text-[11px] font-bold tracking-wider uppercase text-[#736C65]">
                  Navigasi Halaman
                </span>
                <button
                  onClick={() => handleAction('section1')}
                  className="w-full text-left text-sm font-medium text-[#1A1816]/80 hover:text-[#AE6313] transition-colors flex items-center justify-between cursor-pointer"
                >
                  <span>Pilar 1: Edukasi & Simulasi Waktu</span>
                  <span className="text-xs text-black/30">#section-1</span>
                </button>
                <button
                  onClick={() => handleAction('section2')}
                  className="w-full text-left text-sm font-medium text-[#1A1816]/80 hover:text-[#AE6313] transition-colors flex items-center justify-between cursor-pointer"
                >
                  <span>Pilar 2: Ekonomi & Afiliasi UMKM</span>
                  <span className="text-xs text-black/30">#section-2</span>
                </button>
                <button
                  onClick={() => handleAction('dashboard')}
                  className="w-full text-left text-sm font-medium text-[#1A1816]/80 hover:text-[#AE6313] transition-colors flex items-center justify-between cursor-pointer"
                >
                  <span>Katalog Produk Herbal BPOM</span>
                  <span className="text-xs text-black/30">/dashboard</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 3. Bottom Pinned Action Bar */}
        <div className="p-6 border-t border-black/8 bg-[#FDF7EF] space-y-3 shrink-0">
          <button
            onClick={() => handleAction('preview')}
            className="w-full py-3.5 rounded-full bg-[#1A1816] text-[#FFFFF7] font-medium text-sm hover:bg-black transition-colors cursor-pointer shadow-sm flex items-center justify-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-[#deff00] animate-pulse" />
            <span>Mulai Simulasi Anatomi 3D</span>
          </button>
          <div className="flex items-center justify-center gap-3 text-xs text-[#736C65] pt-0.5">
            <button
              onClick={() => handleAction('dashboard')}
              className="hover:text-[#1A1816] underline underline-offset-2 cursor-pointer"
            >
              Buka Portal Dashboard UMKM
            </button>
          </div>
        </div>
      </aside>
    </div>
  )
}
