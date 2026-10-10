import { Search, SlidersHorizontal, ArrowLeft, ArrowUpRight } from 'lucide-react'

export default function BioNavbar({
  searchQuery,
  onSearchChange,
  onBackToLanding,
  totalResults = 48,
}) {
  return (
    <header className="h-[68rem] shrink-0 border-b border-black/[0.08] px-[24rem] lg:px-[32rem] flex items-center justify-between bg-white select-none sticky top-0 z-40">
      {/* Left: Brand Identity & Back Trigger */}
      <div className="flex items-center gap-[16rem]">
        {onBackToLanding && (
          <button
            onClick={onBackToLanding}
            className="flex items-center gap-[6rem] px-[12rem] py-[6rem] rounded-full border border-black/10 text-[12rem] text-black/70 hover:text-black hover:border-black transition-all cursor-pointer"
            title="Return to Landing Page"
          >
            <ArrowLeft className="w-[14rem] h-[14rem]" />
            <span className="font-medium hidden sm:inline">Landing</span>
          </button>
        )}

        <div className="flex items-center gap-[10rem]">
          {/* Makepill / BioDigital Capsule Seal */}
          <div className="w-[28rem] h-[28rem] rounded-full bg-[#0f0f0f] flex items-center justify-center text-white font-semibold text-[13rem] tracking-tight">
            M
          </div>
          <div className="leading-tight">
            <span className="text-[15rem] font-medium tracking-tight text-[#0f0f0f] block">
              BioDigital <span className="text-black/40 font-normal">/ Human</span>
            </span>
          </div>
        </div>
      </div>

      {/* Middle: Clean Search Bar */}
      <div className="flex-1 max-w-[500rem] mx-[24rem] hidden md:block">
        <div className="relative w-full">
          <Search className="w-[15rem] h-[15rem] absolute left-[14rem] top-1/2 -translate-y-1/2 text-black/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search 1,000+ interactive 3D anatomy modules..."
            className="w-full bg-[#f8f8f8] hover:bg-[#f3f3f3] focus:bg-white border border-black/10 rounded-full pl-[38rem] pr-[56rem] py-[8rem] text-[13rem] text-[#0f0f0f] placeholder-black/40 focus:outline-none focus:border-black/30 transition-all font-sans"
          />
          <span className="absolute right-[12rem] top-1/2 -translate-y-1/2 text-[10rem] px-[6rem] py-[2rem] rounded border border-black/10 bg-white text-black/50 font-mono">
            ⌘K
          </span>
        </div>
      </div>

      {/* Right: Studio CTA & Global Controls */}
      <div className="flex items-center gap-[12rem]">
        <button
          type="button"
          className="hidden sm:flex items-center gap-[6rem] px-[14rem] py-[7rem] rounded-full border border-black/10 text-[12rem] text-black/70 hover:text-black hover:border-black/30 transition-colors cursor-pointer"
        >
          <SlidersHorizontal className="w-[13rem] h-[13rem]" />
          <span>Filters</span>
        </button>

        <a
          href="https://human.biodigital.com"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-[6rem] px-[18rem] py-[8rem] rounded-full bg-[#0f0f0f] text-white hover:bg-black text-[12rem] font-medium tracking-wide transition-all shadow-sm cursor-pointer"
        >
          <span>BioDigital Studio</span>
          <ArrowUpRight className="w-[13rem] h-[13rem] text-[#deff00]" />
        </a>
      </div>
    </header>
  )
}
