export default function FloatingCTA({
  theme = 'dark',
  isScrolled = false,
  onClick,
  label = 'Explore 3D AnatomiLab',
}) {
  const isWhite = theme === 'white'

  return (
    <div
      className={`fixed left-1/2 -translate-x-1/2 z-[3001] pointer-events-auto bg-transparent transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] will-change-[transform,bottom,opacity] ${
        isScrolled
          ? 'bottom-[24rem] lg:bottom-[36rem] scale-110 lg:scale-125 opacity-100'
          : 'bottom-[48rem] lg:bottom-[64rem] scale-100 opacity-100'
      }`}
    >
      <button
        type="button"
        onClick={onClick}
        className={`group relative inline-flex items-center gap-[14rem] lg:gap-[18rem] px-[36rem] py-[18rem] lg:px-[48rem] lg:py-[22rem] rounded-full border text-[16rem] lg:text-[19rem] font-medium leading-none overflow-hidden transition-all duration-500 cursor-pointer ${
          isWhite
            ? 'border-[#0f0f0f] bg-transparent text-[#0f0f0f] hover:bg-[#0f0f0f] hover:text-white'
            : 'border-white bg-transparent text-white hover:border-[#deff00] hover:bg-[#deff00] hover:text-[#0f0f0f]'
        }`}
      >
        {/* Live Signal Pulse Dot */}
        <span className="relative flex h-[9rem] w-[9rem] lg:h-[11rem] lg:w-[11rem]">
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
              isWhite
                ? 'bg-[#0f0f0f] group-hover:bg-white'
                : 'bg-[#deff00] group-hover:bg-[#0f0f0f]'
            }`}
          ></span>
          <span
            className={`relative inline-flex rounded-full h-[9rem] w-[9rem] lg:h-[11rem] lg:w-[11rem] transition-colors duration-300 ${
              isWhite
                ? 'bg-[#0f0f0f] group-hover:bg-white'
                : 'bg-[#deff00] group-hover:bg-[#0f0f0f]'
            }`}
          ></span>
        </span>

        {/* Action Label */}
        <span className="relative tracking-wide font-normal transition-transform duration-300 group-hover:translate-x-[-2rem]">
          {label}
        </span>


        {/* Directed Arrow Icon */}
        <span
          className="relative text-[15rem] lg:text-[18rem] transition-transform duration-300 group-hover:translate-x-[4rem]"
          aria-hidden="true"
        >
          →
        </span>
      </button>
    </div>
  )
}
