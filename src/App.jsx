import { useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Header from './components/Header'
import Hero from './components/Hero'
import SectionPill from './components/SectionPill'
import MarqueePill from './components/MarqueePill'
import FloatingCTA from './components/FloatingCTA'
import Dashboard from './components/Dashboard'
import Dashboard2 from './components/Dashboard2'
import AnatomiPreview from './components/AnatomiPreview'
import HimsSidebar from './components/HimsSidebar'
import BioViewerUI from './components/biodigital/BioViewerUI'

gsap.registerPlugin(ScrollTrigger)

const getInitialView = () => {
  if (typeof window === 'undefined') return 'landing'
  const path = window.location.pathname.toLowerCase().replace(/\/+$/, '')
  if (path === '/viewer') return 'viewer'
  if (path === '/preview') return 'preview'
  if (path === '/dashboard-2') return 'dashboard-2'
  if (path === '/dashboard') return 'dashboard'
  return 'landing'
}

export default function App() {
  const [view, setView] = useState(getInitialView) // 'landing' | 'dashboard' | 'preview'
  const [headerTheme, setHeaderTheme] = useState('dark')
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Navigation function syncing URL pathname
  const navigateTo = (targetView) => {
    setView(targetView)
    const targetPath = targetView === 'landing' ? '/' : `/${targetView}`
    window.history.pushState({}, '', targetPath)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  // Smooth scroll to landing page sections
  const scrollToSection = (sectionId) => {
    if (view !== 'landing') {
      navigateTo('landing')
      setTimeout(() => {
        const el = sectionId === 'section1' ? section1Ref.current : section2Ref.current
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    } else {
      const el = sectionId === 'section1' ? section1Ref.current : section2Ref.current
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setView(getInitialView())
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  // Animation element references
  const heroRef = useRef(null)
  const heroOuterRef = useRef(null)
  const heroBgRef = useRef(null)
  const heroOverlayRef = useRef(null)

  const section1Ref = useRef(null)
  const section2Ref = useRef(null)

  useEffect(() => {
    if (view !== 'landing') return

    // 1. Lenis Smooth Scroll Setup
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    // 2. Track Scroll Position for Floating CTA Docking
    ScrollTrigger.create({
      start: 'top -80px',
      end: 999999,
      onToggle: (self) => setIsScrolled(self.isActive),
    })

    // 3. Desktop MatchMedia Animations (GSAP Parallax & Hero Exit)
    const mm = gsap.matchMedia()

    mm.add('(min-width: 1024px)', () => {
      // Hero Parallax & Overlay Fade
      if (heroRef.current && heroOuterRef.current && heroOverlayRef.current) {
        const heroTl = gsap.timeline({
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })

        heroTl
          .fromTo(
            heroOuterRef.current,
            { yPercent: 0 },
            { yPercent: 65, ease: 'none', duration: 1 },
            0
          )
          .fromTo(
            heroBgRef.current,
            { yPercent: 0 },
            { yPercent: 17.5, ease: 'none', duration: 1 },
            0
          )
          .fromTo(
            heroOverlayRef.current,
            { opacity: 0 },
            { opacity: 1, ease: 'none', duration: 0.75 },
            0
          )
      }
    })

    // 4. Section Layout Theme Trigger
    const sections = document.querySelectorAll('[data-layout-theme]')
    sections.forEach((sec) => {
      const theme = sec.getAttribute('data-layout-theme')
      ScrollTrigger.create({
        trigger: sec,
        start: 'top 40%',
        end: 'bottom 40%',
        onEnter: () => setHeaderTheme(theme),
        onEnterBack: () => setHeaderTheme(theme),
      })
    })

    setTimeout(() => {
      ScrollTrigger.refresh()
    }, 100)

    return () => {
      mm.revert()
      ScrollTrigger.getAll().forEach((t) => t.kill())
      lenis.destroy()
    }
  }, [view])

  // If viewing 1:1 BioDigital UI Viewer (without 3D engine):
  if (view === 'viewer') {
    return <BioViewerUI onBackToLanding={() => navigateTo('landing')} />
  }

  // If viewing the 3D AnatomiLab Preview:
  if (view === 'preview') {
    return <AnatomiPreview onBackToLanding={() => navigateTo('landing')} />
  }

  // If viewing Dashboard 2 (BioDigital 1:1 with Real Assets):
  if (view === 'dashboard-2') {
    return (
      <Dashboard2
        onBackToLanding={() => navigateTo('landing')}
        onNavigateToPreview={() => navigateTo('preview')}
      />
    )
  }

  // If viewing the Dashboard:
  if (view === 'dashboard') {
    return (
      <Dashboard
        onBackToLanding={() => navigateTo('landing')}
        onNavigateToPreview={() => navigateTo('preview')}
      />
    )
  }

  // Default: Landing Page View
  return (
    <div className="w-full min-h-screen bg-[#0f0f0f] text-white selection:bg-[#deff00] selection:text-[#0f0f0f]">
      {/* 1. Dynamic Fixed Header with Theme Inversion & Route Links */}
      <Header
        theme={headerTheme}
        onNavigate={navigateTo}
        onOpenMenu={() => setIsMenuOpen(true)}
      />

      {/* 2. Hims-Inspired Drawer Sidebar */}
      <HimsSidebar
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onNavigate={navigateTo}
        onScrollToSection={scrollToSection}
      />

      {/* 3. Floating Docked CTA Button (Navigates directly to route "/dashboard") */}
      <FloatingCTA
        theme={headerTheme}
        isScrolled={isScrolled}
        label="Mulai Eksplorasi"
        onClick={() => navigateTo('dashboard')}
      />

      {/* Main Content Sections */}
      <main className="w-full">
        {/* Hero Section with Robot Parallax & Overlay */}
        <Hero
          heroRef={heroRef}
          outerRef={heroOuterRef}
          bgRef={heroBgRef}
          overlayRef={heroOverlayRef}
        />

        {/* Section 1 (Theme White): Launch Pill with Dual Parallax & Text Stagger */}
        <SectionPill
          sectionRef={section1Ref}
          theme="white"
          reversed={false}
          slashTitle="01. EDUKASI MULTIORGAN"
          paragraphs={[
            'Tubuh kita bekerja sebagai satu kesatuan sistem, bukan organ yang terisolasi. Satu kebiasaan buruk memicu beban kompensasi pada seluruh organ vital.',
            'Pelajari keterhubungan antara paru-paru, jantung, dan sistem saraf secara 360°. Pahami anatomi dengan cara yang hidup, kontekstual, dan mudah dimengerti.',
          ]}
          ctaText="Jelajahi Organ"
          ctaLink="/preview"
          onCtaClick={() => navigateTo('preview')}
          videoWebm="https://res.cloudinary.com/mkpill/video/upload/v1691752608/launch_pill_6ae3865c71.webm"
          videoMp4="https://res.cloudinary.com/mkpill/video/upload/v1691752608/launch_pill_795f2be8d2.mp4"
        />

        {/* Infinite Running Marquee Pill with Spinning Seal */}
        <MarqueePill />

        {/* Section 2 (Theme Dark Reversed): AI Pill with Dual Parallax & Text Stagger */}
        <SectionPill
          sectionRef={section2Ref}
          theme="dark"
          reversed={true}
          slashTitle="02. PREDIKSI PREVENTIF"
          paragraphs={[
            'Mencegah selalu lebih murah daripada mengobati. Melalui pemodelan komputasi cerdas, kami memetakan risiko kesehatan sebelum gejala klinis muncul.',
            'Gabungan data medis presisi dan simulasi interaktif mengubah cara dokter, pendidik, dan pasien berdialog mengenai urgensi pencegahan penyakit kronis.',
          ]}
          ctaText="Cek Prediksi"
          ctaLink="/dashboard"
          onCtaClick={() => navigateTo('dashboard')}
          videoWebm="https://res.cloudinary.com/mkpill/video/upload/v1691752606/ai_pill_5352472919.webm"
          videoMp4="https://res.cloudinary.com/mkpill/video/upload/v1691752606/ai_pill_238dfa28bc.mp4"
        />
      </main>
    </div>
  )
}
