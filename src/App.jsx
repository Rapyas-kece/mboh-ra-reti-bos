import { useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Header from './components/Header'
import Hero from './components/Hero'
import SectionPill from './components/SectionPill'
import MarqueePill from './components/MarqueePill'
import FloatingCTA from './components/FloatingCTA'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [headerTheme, setHeaderTheme] = useState('dark')
  const [isScrolled, setIsScrolled] = useState(false)

  // Animation element references
  const heroRef = useRef(null)
  const heroOuterRef = useRef(null)
  const heroBgRef = useRef(null)
  const heroOverlayRef = useRef(null)

  const section1Ref = useRef(null)
  const section2Ref = useRef(null)

  useEffect(() => {
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
      // Hero Parallax & Overlay Fade (Transisi halus keluar dari Hero ke Section 1)
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

    // 4. Section Layout Theme Trigger (Dynamic Color Inversion Header & Floating CTA)
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

    // Refresh triggers to ensure correct layout calculations
    setTimeout(() => {
      ScrollTrigger.refresh()
    }, 100)

    return () => {
      mm.revert()
      ScrollTrigger.getAll().forEach((t) => t.kill())
      lenis.destroy()
    }
  }, [])

  return (
    <div className="w-full min-h-screen bg-[#0f0f0f] text-white selection:bg-[#deff00] selection:text-[#0f0f0f]">
      {/* 1. Dynamic Fixed Header with Theme Inversion */}
      <Header theme={headerTheme} />

      {/* 2. Floating Docked CTA Button (Animates larger at bottom center on scroll) */}
      <FloatingCTA theme={headerTheme} isScrolled={isScrolled} />

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
          slashTitle="Engineer tomorrow's leaders"
          paragraphs={[
            'We unite seven specialized domains to transform your vision into market-ready reality.',
            "Each mission combines strategic insight, technical excellence, and operational rigor to unlock your company's true potential.",
          ]}
          ctaText="Expertise"
          ctaLink="/expertise"
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
          slashTitle="Our philosophy"
          paragraphs={[
            'Real value emerges from strategy, architecture and people, not spreadsheets.',
            "Our team of specialists doesn't simply advise, we transform. We act. We reshape markets by building companies that lead, not follow.",
          ]}
          ctaText="Our values"
          ctaLink="/about"
          videoWebm="https://res.cloudinary.com/mkpill/video/upload/v1691752606/ai_pill_5352472919.webm"
          videoMp4="https://res.cloudinary.com/mkpill/video/upload/v1691752606/ai_pill_238dfa28bc.mp4"
        />
      </main>
    </div>
  )
}
