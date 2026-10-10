import { useState, useMemo } from 'react'
import '../styles/biodigital-isolated.css'

// 15 BioDigital Human Target Baseline Modules
const BASELINE_MODULES = [
  { id: 'module-1', title: 'Abdomen Transverse Section...', image: '/assets/biodigital/cards/card_1.png', type: 'anatomy' },
  { id: 'module-2', title: 'Abdomen Wall: Epigastric ...', image: '/assets/biodigital/cards/card_2.png', type: 'anatomy' },
  { id: 'module-3', title: 'Abdominal Adhesions', image: '/assets/biodigital/cards/card_3.png', type: 'conditions' },
  { id: 'module-4', title: 'Abdominal Aorta', image: '/assets/biodigital/cards/card_4.png', type: 'anatomy' },
  { id: 'module-5', title: 'Abdominal Aortic Aneurysm', image: '/assets/biodigital/cards/card_5.png', type: 'conditions' },
  { id: 'module-6', title: 'Abdominal Aortic Aneurys...', image: '/assets/biodigital/cards/card_6.png', type: 'treatments' },
  { id: 'module-7', title: 'Abdominal Flexion and Ext...', image: '/assets/biodigital/cards/card_7.png', type: 'anatomy' },
  { id: 'module-8', title: 'Abdominal Lateral Flexion', image: '/assets/biodigital/cards/card_8.png', type: 'anatomy' },
  { id: 'module-9', title: 'Abdominal Movement', image: '/assets/biodigital/cards/card_9.png', type: 'anatomy' },
  { id: 'module-10', title: 'Abdominal Myomectomy', image: '/assets/biodigital/cards/card_10.png', type: 'treatments' },
  { id: 'module-11', title: 'Abdominal Reflex', image: '/assets/biodigital/cards/card_11.png', type: 'conditions' },
  { id: 'module-12', title: 'Abdominal Regions and Quadrants', image: '/assets/biodigital/cards/card_12.png', type: 'anatomy' },
  { id: 'module-13', title: 'Abdominal Vasculature', image: '/assets/biodigital/cards/card_13.png', type: 'anatomy' },
  { id: 'module-14', title: 'Abdominal Wall: Inguinal Region', image: '/assets/biodigital/cards/card_14.png', type: 'anatomy' },
  { id: 'module-15', title: 'Abdominoperineal Resection', image: '/assets/biodigital/cards/card_15.png', type: 'treatments' },
]

export default function Dashboard2() {
  const [activeTab, setActiveTab] = useState('all') // 'all' | 'anatomy' | 'conditions' | 'treatments'
  const [searchQuery, setSearchQuery] = useState('')

  const filteredModules = useMemo(() => {
    return BASELINE_MODULES.filter((item) => {
      if (activeTab !== 'all' && item.type !== activeTab) return false
      if (searchQuery.trim() !== '') {
        return item.title.toLowerCase().includes(searchQuery.toLowerCase())
      }
      return true
    })
  }, [activeTab, searchQuery])

  return (
    <div
      id="biodigital-root"
      style={{
        width: '1852px',
        height: '997px',
        backgroundColor: '#fffff7',
        margin: 0,
        padding: 0,
        position: 'relative',
      }}
      className="flex flex-col overflow-hidden select-none"
    >
      {/* =========================================================================
          1. TOP GLOBAL NAVBAR (Exact 70px Height, Midnight #000a1a, 1:1 Target)
          ========================================================================= */}
      <header
        style={{
          width: '1852px',
          height: '70px',
          backgroundColor: '#000a1a',
          borderBottom: '1px solid #cbcdca',
        }}
        className="shrink-0 flex items-center justify-between z-30"
      >
        {/* Left Header Section (x: 0..450) */}
        <div style={{ width: '450px', height: '70px' }} className="relative shrink-0">
          <img
            src="/assets/biodigital/header_left.png"
            alt="BioDigital Nav"
            style={{ width: '450px', height: '70px' }}
            className="block"
          />
        </div>

        {/* Center Midnight Fill (x: 450..1540) */}
        <div style={{ height: '70px' }} className="flex-1 bg-[#000a1a]" />

        {/* Right Header Section (x: 1540..1852) */}
        <div style={{ width: '312px', height: '70px' }} className="relative shrink-0">
          <img
            src="/assets/biodigital/header_right.png"
            alt="BioDigital User Actions"
            style={{ width: '312px', height: '70px' }}
            className="block"
          />
        </div>
      </header>

      {/* =========================================================================
          2. WORKSPACE CONTAINER (Exact 927px Remaining Height)
          ========================================================================= */}
      <div style={{ width: '1852px', height: '927px' }} className="flex overflow-hidden">
        {/* =========================================================================
            LEFT SIDEBAR (Exact 310px Width, 927px Height)
            ========================================================================= */}
        <aside
          style={{
            width: '310px',
            height: '927px',
            backgroundColor: '#fffff7',
            borderRight: '1px solid #d4d4d4',
            overflow: 'hidden',
          }}
          className="shrink-0 select-none"
        >
          <img
            src="/assets/biodigital/sidebar_full.png"
            alt="BioDigital Sidebar Taxonomy"
            style={{ width: '310px', height: '927px' }}
            className="block"
          />
        </aside>

        {/* =========================================================================
            MAIN CONTENT CANVAS (Exact 1542px Width, 927px Height)
            ========================================================================= */}
        <main
          style={{
            width: '1542px',
            height: '927px',
            backgroundColor: '#fffff7',
          }}
          className="flex-1 flex flex-col overflow-hidden"
        >
          {/* =========================================================================
              TOOLBAR (Exact 245px Height, Title + Omnibox Search + Category Tabs)
              ========================================================================= */}
          <div
            style={{
              width: '1542px',
              height: '245px',
              position: 'relative',
            }}
            className="shrink-0 select-none"
          >
            <img
              src="/assets/biodigital/toolbar_full.png"
              alt="BioDigital Toolbar"
              style={{ width: '1542px', height: '245px' }}
              className="block"
            />

            {/* Interactive Search Input Overlay (Covers the exact visual search input) */}
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search All Models"
              style={{
                position: 'absolute',
                left: '92px',
                top: '100px',
                width: '510px',
                height: '50px',
                background: 'transparent',
                border: 'none',
                outline: 'none',
                fontSize: '15px',
                color: '#0c182a',
                fontFamily: 'Inter, sans-serif',
              }}
              title="Search Models"
            />
          </div>

          {/* =========================================================================
              CARDS GRID CONTAINER (Exact 5 Columns, 263x266px Cards, Gap 26x23)
              ========================================================================= */}
          <div
            style={{
              width: '1542px',
              height: '682px',
              paddingLeft: '54px',
              paddingRight: '69px',
              backgroundColor: '#fffff7',
            }}
            className="overflow-y-auto bio-scroll"
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(5, 263px)',
                columnGap: '26px',
                rowGap: '23px',
                width: '1419px',
              }}
            >
              {filteredModules.map((item) => (
                <div
                  key={item.id}
                  style={{
                    width: '263px',
                    height: '266px',
                  }}
                  className="rounded-[6px] overflow-hidden cursor-pointer select-none shadow-2xs hover:shadow-md transition-shadow"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{ width: '263px', height: '266px' }}
                    className="block object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
