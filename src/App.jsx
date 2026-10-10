import { useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [headerTheme, setHeaderTheme] = useState('dark')

  // Refs for animations
  const heroRef = useRef(null)
  const heroOuterRef = useRef(null)
  const heroBgRef = useRef(null)
  const heroOverlayRef = useRef(null)

  const section1Ref = useRef(null)
  const pillLaunchRef = useRef(null)

  const section2Ref = useRef(null)
  const pillAiRef = useRef(null)

  useEffect(() => {
    // 1. Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    // 2. Setup GSAP MatchMedia for Desktop vs Mobile motions
    const mm = gsap.matchMedia()

    mm.add('(min-width: 1024px)', () => {
      // Hero Parallax & Overlay Fade Timeline
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

      // Section 1: Launch Pill Parallax Scroll Motion
      if (section1Ref.current && pillLaunchRef.current) {
        const s1Tl = gsap.timeline({
          scrollTrigger: {
            trigger: section1Ref.current,
            start: () => `top-=${window.innerHeight * 0.25} bottom`,
            end: 'bottom top',
            scrub: 0.5,
            invalidateOnRefresh: true,
          },
        })

        s1Tl.fromTo(
          pillLaunchRef.current,
          { y: 0 },
          {
            y: () => (section1Ref.current ? section1Ref.current.offsetHeight * 0.35 : 150),
            ease: 'none',
          },
          0
        )
      }

      // Section 2: AI Pill Parallax Scroll Motion
      if (section2Ref.current && pillAiRef.current) {
        const s2Tl = gsap.timeline({
          scrollTrigger: {
            trigger: section2Ref.current,
            start: () => `top-=${window.innerHeight * 0.25} bottom`,
            end: 'bottom top',
            scrub: 0.5,
            invalidateOnRefresh: true,
          },
        })

        s2Tl.fromTo(
          pillAiRef.current,
          { y: 0 },
          {
            y: () => (section2Ref.current ? section2Ref.current.offsetHeight * 0.35 : 150),
            ease: 'none',
          },
          0
        )
      }
    })

    // 3. Section Theme Triggers (Dynamically swap Header and Active Theme)
    const sections = document.querySelectorAll('[data-layout-theme]')
    sections.forEach((sec) => {
      const theme = sec.getAttribute('data-layout-theme')
      ScrollTrigger.create({
        trigger: sec,
        start: 'top 12%',
        end: 'bottom 12%',
        onEnter: () => setHeaderTheme(theme),
        onEnterBack: () => setHeaderTheme(theme),
      })
    })

    return () => {
      mm.revert()
      ScrollTrigger.getAll().forEach((t) => t.kill())
      lenis.destroy()
    }
  }, [])

  return (
    <div className="layout layout--default layout-theme-dark">
      {/* Dynamic Themed Floating Header */}
      <header className={`layout-header theme-${headerTheme}`}>
        <div className="layout-header__inner">
          {/* Logo */}
          <div className="layout-header__logo">
            <a href="/" aria-current="page">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100"
                height="24"
                fill="none"
                viewBox="0 0 100 24"
                className="logo"
              >
                <path
                  fill="currentColor"
                  d="M0 19.103V5.782h4.183V7.68h.08c.948-1.526 2.333-2.29 4.156-2.29 1.806 0 3.093.78 3.861 2.342h.054c1.037-1.561 2.476-2.342 4.317-2.342 1.52 0 2.672.46 3.46 1.38.803.901 1.206 2.124 1.206 3.668v8.664h-4.37v-7.91c0-1.509-.644-2.263-1.931-2.263-.68 0-1.216.251-1.61.754-.375.486-.562 1.136-.562 1.952v7.467H8.473v-7.91c0-1.509-.643-2.263-1.93-2.263-.68 0-1.216.251-1.61.754-.375.486-.562 1.136-.562 1.952v7.467H0ZM27.354 19.441c-1.413 0-2.548-.355-3.406-1.067-.858-.71-1.287-1.708-1.287-2.992 0-1.353.465-2.333 1.394-2.94.93-.624 2.217-1.04 3.861-1.249 1.341-.156 2.253-.33 2.735-.52.501-.208.751-.529.751-.963 0-.954-.625-1.43-1.877-1.43-1.34 0-2.082.572-2.225 1.717h-4.022c.053-1.319.608-2.411 1.662-3.279 1.073-.867 2.592-1.3 4.558-1.3 1.967 0 3.45.364 4.452 1.092 1.161.815 1.742 2.082 1.742 3.799v6.713c0 1.058.161 1.69.483 1.899v.182H31.94c-.18-.243-.331-.737-.456-1.483h-.054c-.876 1.214-2.234 1.821-4.075 1.821Zm1.394-2.706c.822 0 1.483-.216 1.984-.65.518-.451.777-1.032.777-1.743v-1.588c-.428.209-1.18.443-2.252.703-.876.19-1.492.416-1.85.676-.357.26-.536.634-.536 1.12 0 .988.626 1.482 1.877 1.482ZM37.811 19.103V.5h4.317v9.783l4.076-4.501h5.04l-4.826 4.995 5.39 8.326H46.74l-3.298-5.438-1.314 1.353v4.085h-4.317Z"
                />
                <path
                  fill="currentColor"
                  d="M58.445 19.493c-2.217 0-3.995-.659-5.336-1.977-1.323-1.336-1.984-3.036-1.984-5.1 0-2.012.652-3.686 1.957-5.021 1.323-1.336 3.021-2.004 5.095-2.004 1.877 0 3.44.555 4.692 1.666 1.645 1.457 2.449 3.616 2.413 6.478h-9.867c.143.92.474 1.64.992 2.16.518.503 1.216.754 2.092.754 1.126 0 1.885-.442 2.279-1.327h4.263c-.322 1.284-1.09 2.333-2.306 3.148-1.198.816-2.628 1.223-4.29 1.223Zm-3.003-8.482h5.416c-.071-.798-.348-1.43-.831-1.899-.465-.468-1.055-.703-1.77-.703-1.555 0-2.493.868-2.815 2.602ZM66.746 23.5V5.782h4.182v1.613h.08c1.056-1.336 2.44-2.004 4.157-2.004 1.787 0 3.209.668 4.263 2.004 1.073 1.318 1.609 3 1.609 5.047 0 2.151-.545 3.868-1.636 5.152-1.09 1.284-2.538 1.925-4.343 1.925-1.68 0-2.977-.598-3.888-1.795h-.054V23.5h-4.37Zm7.186-7.259c.84 0 1.492-.32 1.957-.963.483-.659.724-1.552.724-2.68 0-1.18-.233-2.107-.697-2.784C75.45 9.138 74.763 8.8 73.85 8.8c-.912 0-1.618.355-2.118 1.067-.5.693-.751 1.604-.751 2.731 0 1.093.26 1.978.778 2.654.518.66 1.242.989 2.171.989ZM82.509 19.103V5.782h4.37v13.32h-4.37Zm0-15.169V.5h4.37v3.434h-4.37ZM89.003 19.103V.5h4.425v18.603h-4.425ZM95.576 19.103V.5H100v18.603h-4.424Z"
                />
              </svg>
            </a>
          </div>

          {/* Breadcrumb */}
          <div className="layout-header__breadcrumb">
            <div className="breadcrumb__wrapper">
              <div className="breadcrumb">
                <nav aria-label="Breadcrumb">
                  <ul className="breadcrumb__list">
                    <li className="current-item breadcrumb__item">
                      <span className="decorator">/</span>
                      <span className="link-wrapper">
                        <a href="/" aria-current="page">
                          &nbsp;index&nbsp;
                        </a>
                      </span>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>

          {/* Menu Toggle */}
          <div className="layout-header__menu-toggle">
            <div className="controls__wrapper">
              <button
                type="button"
                className="button button-default tag-button"
                aria-label="Open menu"
              >
                <span className="button__content">
                  <span className="label">M</span>
                  <span className="burger">
                    <span className="wrapper">
                      <span></span>
                      <span></span>
                    </span>
                  </span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <div id="page-index" className="page-component theme-dark">
          <div className="page__outer">
            <div className="page__inner">
              <div className="page page--index">
                {/* 1. Hero Section */}
                <section
                  ref={heroRef}
                  className="index-hero"
                  data-layout-theme="dark"
                >
                  <div ref={heroOuterRef} className="outer">
                    {/* Background Video Looping */}
                    <div ref={heroBgRef} className="background__wrapper">
                      <video
                        autoPlay
                        playsInline
                        muted
                        loop
                        disableRemotePlayback={true}
                      >
                        <source
                          src="https://res.cloudinary.com/mkpill/video/upload/v1691860071/mp_intro_robot_v2_32611febe2.mp4"
                          type="video/mp4"
                        />
                      </video>
                    </div>

                    {/* Hero Content */}
                    <div className="inner">
                      <div className="title__wrapper">
                        <h1>
                          <span className="markdown-content unwrapped">
                            A new kind of
                            <br />
                            venture{' '}
                            <span className="glossary-term">
                              studio
                              <span className="decorator">*</span>.
                            </span>
                          </span>
                        </h1>
                      </div>
                      <div className="tagline__wrapper">
                        <p>
                          We architect your company&apos;s competitive edge
                          <br />
                          through strategy, design, and technology.
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* Hero Parallax Dark Overlay */}
                  <div ref={heroOverlayRef} className="overlay"></div>
                </section>

                {/* 2. Section 1 (Theme White): Launch Pill */}
                <div className="index-expertises">
                  <section
                    ref={section1Ref}
                    className="block-title-text-image"
                    data-layout-theme="white"
                  >
                    <div className="outer">
                      <div className="inner">
                        {/* Sisi Kiri: Video 3D Transparan Launch Pill */}
                        <div ref={pillLaunchRef} className="side side--left">
                          <div className="media">
                            <video
                              autoPlay
                              muted
                              playsInline
                              loop
                              disableRemotePlayback={true}
                            >
                              <source
                                src="https://res.cloudinary.com/mkpill/video/upload/v1691752608/launch_pill_6ae3865c71.webm"
                                type="video/webm"
                              />
                              <source
                                src="https://res.cloudinary.com/mkpill/video/upload/v1691752608/launch_pill_795f2be8d2.mp4"
                                type="video/mp4; codecs=hvc1"
                              />
                            </video>
                          </div>
                        </div>

                        {/* Sisi Kanan: Title Slash, Filling Text, Button */}
                        <div className="side side--right">
                          <div className="title__wrapper">
                            <h2 className="slash-title title">
                              <span className="inner">
                                <span className="decorator" aria-hidden="true">
                                  /
                                </span>
                                <span className="title__wrapper">
                                  <span className="title">
                                    Engineer tomorrow&apos;s leaders
                                  </span>
                                </span>
                              </span>
                            </h2>
                          </div>

                          <div className="text__wrapper">
                            <div className="filling-text">
                              <div className="outer">
                                <div className="inner">
                                  <div className="markdown-content">
                                    <p>
                                      We unite seven specialized domains to
                                      transform your vision into market-ready
                                      reality.
                                    </p>
                                    <br />
                                    <p>
                                      Each mission combines strategic insight,
                                      technical excellence, and operational
                                      rigor to unlock your company&apos;s true
                                      potential.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="cta__wrapper">
                            <a href="/expertise" className="cursor-target">
                              <span className="inner">
                                <span className="inner__label">Expertise</span>
                              </span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>

                {/* 3. Infinite Marquee Pill */}
                <div className="marquee-slider" data-layout-theme="white">
                  <div className="marquee-pill">
                    <div className="marquee">
                      <div className="marquee__outer">
                        <div className="marquee__inner">
                          <div className="marquee__scroller">
                            <div className="marquee__list">
                              {[0, 1, 2, 3].map((idx) => (
                                <div key={idx} className="marquee-pill__content">
                                  <div className="marquee-pill__text">
                                    <span>Build growth. Sustain leadership.</span>
                                    <div className="marque-pill__decorator">
                                      <video
                                        autoPlay
                                        playsInline
                                        muted
                                        loop
                                        disableRemotePlayback={true}
                                      >
                                        <source
                                          src="https://makepill.com/medias/videos/seal/white.webm"
                                          type="video/webm"
                                        />
                                        <source
                                          src="https://makepill.com/medias/videos/seal/white.mp4"
                                          type="video/mp4; codecs=hvc1"
                                        />
                                      </video>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4. Section 2 (Theme Dark Reversed): AI Pill */}
                <section
                  ref={section2Ref}
                  className="block-title-text-image reversed"
                  data-layout-theme="dark"
                >
                  <div className="outer">
                    <div className="inner">
                      {/* Sisi Kiri: Video 3D Transparan AI Pill */}
                      <div ref={pillAiRef} className="side side--left">
                        <div className="media">
                          <video
                            autoPlay
                            muted
                            playsInline
                            loop
                            disableRemotePlayback={true}
                          >
                            <source
                              src="https://res.cloudinary.com/mkpill/video/upload/v1691752606/ai_pill_5352472919.webm"
                              type="video/webm"
                            />
                            <source
                              src="https://res.cloudinary.com/mkpill/video/upload/v1691752606/ai_pill_238dfa28bc.mp4"
                              type="video/mp4; codecs=hvc1"
                            />
                          </video>
                        </div>
                      </div>

                      {/* Sisi Kanan: Title Slash, Filling Text, Button */}
                      <div className="side side--right">
                        <div className="title__wrapper">
                          <h2 className="slash-title title">
                            <span className="inner">
                              <span className="decorator" aria-hidden="true">
                                /
                              </span>
                              <span className="title__wrapper">
                                <span className="title">Our philosophy</span>
                              </span>
                            </span>
                          </h2>
                        </div>

                        <div className="text__wrapper">
                          <div className="filling-text">
                            <div className="outer">
                              <div className="inner">
                                <div className="markdown-content">
                                  <p>
                                    Real value emerges from strategy,
                                    architecture and people, not spreadsheets.
                                  </p>
                                  <br />
                                  <p>
                                    Our team of specialists doesn&apos;t simply
                                    advise, we transform. We act. We reshape
                                    markets by building companies that lead, not
                                    follow.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="cta__wrapper">
                          <a href="/about" className="cursor-target">
                            <span className="inner">
                              <span className="inner__label">Our values</span>
                            </span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
