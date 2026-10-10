import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function SectionPill({
  sectionRef,
  theme = 'white',
  reversed = false,
  slashTitle,
  paragraphs,
  ctaText,
  ctaLink,
  videoWebm,
  videoMp4,
}) {
  const isWhite = theme === 'white'

  // Internal element references for section motions
  const leftColRef = useRef(null)
  const mediaRef = useRef(null)
  const titleTextRef = useRef(null)
  const fillingTextRef = useRef(null)
  const ctaRef = useRef(null)

  useEffect(() => {
    const triggerEl = sectionRef?.current
    if (!triggerEl) return

    const mm = gsap.matchMedia()

    mm.add('(min-width: 1024px)', () => {
      // 1. Dual Counter-Parallax on Media Column
      if (leftColRef.current && mediaRef.current) {
        const mediaTl = gsap.timeline({
          scrollTrigger: {
            trigger: triggerEl,
            start: () => `top-=${window.innerHeight * 0.25} bottom`,
            end: 'bottom top',
            scrub: 0.5,
            invalidateOnRefresh: true,
          },
        })

        mediaTl
          .fromTo(
            leftColRef.current,
            { y: 0 },
            {
              y: () => triggerEl.offsetHeight * 0.45,
              ease: 'none',
            },
            0
          )
          .fromTo(
            mediaRef.current,
            { yPercent: 0 },
            { yPercent: -35, ease: 'none' },
            0
          )
      }

      // 2. Slash Title Slide Reveal
      if (titleTextRef.current) {
        gsap.fromTo(
          titleTextRef.current,
          { xPercent: -100, opacity: 0 },
          {
            xPercent: 0,
            opacity: 1,
            duration: 1.2,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: triggerEl,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }

      // 3. Narrative Text Paragraph Stagger Entrance
      if (fillingTextRef.current) {
        const lines = fillingTextRef.current.querySelectorAll('p')
        gsap.fromTo(
          lines,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1.4,
            stagger: 0.15,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: fillingTextRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }

      // 4. Circular Button Elastic Entrance
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { scale: 0.8, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: ctaRef.current,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }
    })

    return () => {
      mm.revert()
    }
  }, [sectionRef])

  return (
    <section
      ref={sectionRef}
      className={`relative py-[50rem] lg:py-[150rem] lg:pt-[200rem] lg:pb-[100rem] transition-colors duration-500 will-change-[background-color,color] ${
        isWhite ? 'bg-white text-[#0f0f0f]' : 'bg-[#0f0f0f] text-white'
      }`}
      data-layout-theme={theme}
    >
      <div className="relative w-full">
        <div className="block px-[20rem] lg:px-0 lg:mx-[52rem] lg:grid lg:grid-cols-16 lg:gap-x-[10rem]">
          {/* Media 3D Pill Column with Parallax */}
          <div
            ref={leftColRef}
            className={`flex justify-center items-start self-start will-change-transform ${
              reversed
                ? 'lg:col-start-10 lg:col-span-6 lg:row-start-1'
                : 'lg:col-start-2 lg:col-span-6 lg:row-start-1'
            }`}
          >
            <div
              ref={mediaRef}
              className="w-[250rem] lg:w-[550rem] max-w-[550px] will-change-transform"
            >
              <video
                autoPlay
                muted
                playsInline
                loop
                disableRemotePlayback={true}
                className="w-full h-auto block"
              >
                <source src={videoWebm} type="video/webm" />
                <source src={videoMp4} type="video/mp4; codecs=hvc1" />
              </video>
            </div>
          </div>

          {/* Text & Content Column */}
          <div
            className={`mt-[68rem] lg:mt-0 ${
              reversed
                ? 'lg:col-start-3 lg:col-span-6 lg:row-start-1'
                : 'lg:col-start-9 lg:col-span-6 lg:row-start-1'
            }`}
          >
            {/* Slash Title with Slide In */}
            <div>
              <h2 className="text-[18rem] lg:text-[22rem] leading-[140%] m-0 overflow-hidden">
                <span className="inline-block relative whitespace-nowrap">
                  <span className="inline-block align-top mr-[4rem]" aria-hidden="true">
                    /
                  </span>
                  <span className="inline-block align-top clip-slash -ml-[10rem] pl-[20rem] whitespace-normal">
                    <span ref={titleTextRef} className="inline-block will-change-transform">
                      {slashTitle}
                    </span>
                  </span>
                </span>
              </h2>
            </div>

            {/* Narrative Filling Text with Stagger Entrance */}
            <div
              ref={fillingTextRef}
              className="mt-[52rem] lg:mt-[68rem] text-[28rem] lg:text-[45rem] leading-[140%] lg:leading-[130%] w-full"
            >
              <div className="w-full">
                {paragraphs.map((p, idx) => (
                  <p
                    key={idx}
                    className={`m-0 w-full will-change-[transform,opacity] ${
                      idx > 0 ? 'mt-[32rem]' : ''
                    }`}
                  >
                    {p}
                  </p>
                ))}
              </div>
            </div>

            {/* Circular CTA Button with Entrance & Magnet Transition */}
            <div
              ref={ctaRef}
              className="mt-[52rem] lg:mt-[68rem] flex justify-center lg:justify-start will-change-transform"
            >
              <a
                href={ctaLink}
                className="group inline-block no-underline cursor-pointer"
              >
                <span
                  className={`relative inline-flex items-center justify-center w-[110rem] h-[110rem] lg:w-[140rem] lg:h-[140rem] rounded-full transition-all duration-300 ${
                    isWhite
                      ? 'text-[#0f0f0f] group-hover:bg-[#0f0f0f] group-hover:text-white'
                      : 'text-white group-hover:bg-white group-hover:text-[#0f0f0f]'
                  }`}
                >
                  <span
                    className={`absolute inset-0 w-full h-full rounded-full border transition-transform duration-500 group-hover:scale-105 pointer-events-none ${
                      isWhite
                        ? 'border-[#0f0f0f]/20 group-hover:border-[#0f0f0f]'
                        : 'border-white/20 group-hover:border-white'
                    }`}
                  ></span>
                  <span className="text-[18rem] leading-[120%] font-medium text-center">
                    {ctaText}
                  </span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
