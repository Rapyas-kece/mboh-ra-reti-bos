export default function MarqueePill() {
  return (
    <div
      className="relative w-full overflow-hidden bg-white text-[#0f0f0f]"
      data-layout-theme="white"
    >
      <div className="py-[100rem] overflow-hidden select-none">
        <div className="flex overflow-hidden">
          <div className="flex whitespace-nowrap animate-[marquee-scroll_24s_linear_infinite]">
            {[0, 1, 2, 3].map((idx) => (
              <div
                key={idx}
                className="flex items-center gap-x-[50rem] lg:gap-x-[100rem] px-[25rem] lg:px-[50rem]"
              >
                <div className="flex items-center gap-x-[50rem] lg:gap-x-[100rem] text-[45rem] lg:text-[128rem] leading-[130%] lg:leading-[120%] whitespace-nowrap">
                  <span>Build growth. Sustain leadership.</span>
                  <div className="w-[80rem] h-[80rem] lg:w-[160rem] lg:h-[160rem] shrink-0 relative">
                    <video
                      autoPlay
                      playsInline
                      muted
                      loop
                      disableRemotePlayback={true}
                      className="w-full h-full object-contain"
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
  )
}
