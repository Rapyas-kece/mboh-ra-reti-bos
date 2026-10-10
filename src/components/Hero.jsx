import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Hero({ heroRef, outerRef, bgRef, overlayRef }) {
  const titleRef = useRef(null)
  const taglineRef = useRef(null)

  useEffect(() => {
    // Hero Entrance Text Reveal Animation on initial mount
    const titleEl = titleRef.current
    const taglineEl = taglineRef.current

    if (titleEl && taglineEl) {
      const entranceTl = gsap.timeline({ delay: 0.2 })

      entranceTl
        .fromTo(
          titleEl,
          { opacity: 0, yPercent: 40 },
          {
            opacity: 1,
            yPercent: 0,
            duration: 1.4,
            ease: 'expo.out',
          }
        )
        .fromTo(
          taglineEl,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'expo.out',
          },
          '-=0.9'
        )
    }
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative w-full text-white overflow-hidden"
      data-layout-theme="dark"
    >
      <div ref={outerRef} className="relative w-full will-change-transform">
        {/* Background Video Looping */}
        <div
          ref={bgRef}
          className="absolute top-0 left-0 w-full h-[100svh] flex justify-center z-0 will-change-transform"
        >
          <video
            autoPlay
            playsInline
            muted
            loop
            disableRemotePlayback={true}
            className="absolute top-0 left-0 w-full h-full object-cover"
          >
            <source
              src="https://res.cloudinary.com/mkpill/video/upload/v1691860071/mp_intro_robot_v2_32611febe2.mp4"
              type="video/mp4"
            />
          </video>
        </div>

        {/* Hero Content */}
        <div className="relative z-[1] min-h-[100svh] flex flex-col items-center justify-center text-center pt-[calc(67rem+23vh)] lg:pt-[calc(115rem+23vh)] pb-[120rem] lg:pb-[160rem]">
          {/* Headline */}
          <div className="title__wrapper overflow-hidden">
            <h1
              ref={titleRef}
              className="m-0 font-normal [font-kerning:none] text-[45rem] lg:text-[128rem] leading-[130%] lg:leading-[120%] will-change-[transform,opacity]"
            >
              <span className="markdown-content unwrapped">
                A new kind of
                <br />
                venture{' '}
                <span className="inline-block cursor-pointer relative group">
                  studio
                  <span className="text-[#deff00] group-hover:underline">*</span>.
                </span>
              </span>
            </h1>
          </div>

          {/* Tagline */}
          <div
            ref={taglineRef}
            className="mt-[32rem] text-[20rem] 2xl:text-[28rem] leading-[140%] text-white/75 will-change-[transform,opacity]"
          >
            <p className="m-0">
              We architect your company&apos;s competitive edge
              <br />
              through strategy, design, and technology.
            </p>
          </div>
        </div>
      </div>

      {/* Hero Dark Overlay for Scroll Parallax */}
      <div
        ref={overlayRef}
        className="absolute top-0 left-0 w-full h-full bg-[#0f0f0f] opacity-0 pointer-events-none z-[2] transition-opacity duration-300"
      ></div>
    </section>
  )
}
