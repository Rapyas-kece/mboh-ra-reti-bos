import { useState } from 'react'
import {
  ChevronDown,
  Brain,
  Activity,
  Layers,
  Sparkles,
  Check,
  Disc,
} from 'lucide-react'

export default function BioSidebar({
  systems = [],
  specialties = [],
  levelsOfDetail = [],
  biotypes = [],
  activeSystem,
  onSelectSystem,
  activeSpecialty,
  onSelectSpecialty,
  selectedLevel,
  onSelectLevel,
  selectedBiotype,
  onSelectBiotype,
}) {
  const [openSections, setOpenSections] = useState({
    anatomy: true,
    specialties: true,
    detailLevel: true,
    biotype: true,
  })

  const toggleSection = (key) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <aside className="w-[310rem] shrink-0 border-r border-black/[0.08] bg-white flex flex-col justify-between select-none h-screen overflow-hidden">
      {/* Scrollable Navigation List */}
      <div className="flex-1 overflow-y-auto px-[18rem] py-[20rem] space-y-[22rem]">
        {/* Active Specialty Pill Banner */}
        <div className="p-[14rem] rounded-2xl bg-[#f8f8f8] border border-black/[0.06] flex items-center gap-[12rem]">
          <div className="w-[36rem] h-[36rem] rounded-xl bg-white border border-black/10 flex items-center justify-center text-[#0f0f0f] shadow-xs">
            <Brain className="w-[18rem] h-[18rem] stroke-[1.6]" />
          </div>
          <div className="truncate">
            <span className="text-[10rem] font-mono uppercase tracking-wider text-black/45 block">
              Active Category
            </span>
            <span className="text-[13rem] font-medium text-[#0f0f0f] tracking-tight block truncate">
              Neurology & Psychiatry
            </span>
          </div>
        </div>

        {/* =========================================================================
            SECTION 1: ANATOMY BY SYSTEM (Accordion Tree)
            ========================================================================= */}
        <div>
          <button
            onClick={() => toggleSection('anatomy')}
            className="w-full flex items-center justify-between py-[6rem] text-[11rem] uppercase tracking-wider text-black/40 font-semibold hover:text-black transition-colors cursor-pointer"
          >
            <span>Anatomy by System</span>
            <ChevronDown
              className={`w-[13rem] h-[13rem] text-black/40 transition-transform duration-200 ${
                openSections.anatomy ? 'rotate-180' : ''
              }`}
            />
          </button>

          {openSections.anatomy && (
            <div className="mt-[6rem] space-y-[2rem]">
              {systems.map((item) => {
                const isActive = activeSystem === item.id
                return (
                  <button
                    key={item.id}
                    onClick={() => onSelectSystem(item.id)}
                    className={`w-full flex items-center justify-between px-[12rem] py-[8rem] rounded-xl text-[13rem] transition-all duration-150 group cursor-pointer ${
                      isActive
                        ? 'bg-[#0f0f0f] text-white font-medium shadow-xs'
                        : 'text-black/75 hover:text-black hover:bg-black/[0.03]'
                    }`}
                  >
                    <div className="flex items-center gap-[10rem] truncate">
                      <span
                        className={`w-[6rem] h-[6rem] rounded-full transition-colors ${
                          isActive
                            ? 'bg-[#deff00]'
                            : 'bg-black/20 group-hover:bg-black/50'
                        }`}
                      ></span>
                      <span className="truncate">{item.label}</span>
                    </div>
                    <span
                      className={`text-[11rem] font-mono px-[6rem] py-[1rem] rounded-md ${
                        isActive
                          ? 'bg-white/15 text-white'
                          : 'bg-black/[0.04] text-black/40'
                      }`}
                    >
                      {item.count}
                    </span>
                  </button>
                )
              })}
            </div>
          )}
        </div>

        {/* =========================================================================
            SECTION 2: CLINICAL SPECIALTIES (Real BioDigital Taxonomy)
            ========================================================================= */}
        <div className="pt-[16rem] border-t border-black/[0.06]">
          <button
            onClick={() => toggleSection('specialties')}
            className="w-full flex items-center justify-between py-[6rem] text-[11rem] uppercase tracking-wider text-black/40 font-semibold hover:text-black transition-colors cursor-pointer"
          >
            <span>Clinical Specialties</span>
            <ChevronDown
              className={`w-[13rem] h-[13rem] text-black/40 transition-transform duration-200 ${
                openSections.specialties ? 'rotate-180' : ''
              }`}
            />
          </button>

          {openSections.specialties && (
            <div className="mt-[6rem] space-y-[2rem]">
              {specialties.map((item) => {
                const isActive = activeSpecialty === item.id
                return (
                  <button
                    key={item.id}
                    onClick={() => onSelectSpecialty(item.id)}
                    className={`w-full flex items-center justify-between px-[12rem] py-[8rem] rounded-xl text-[13rem] transition-all duration-150 group cursor-pointer ${
                      isActive
                        ? 'bg-[#0f0f0f] text-white font-medium shadow-xs'
                        : 'text-black/70 hover:text-black hover:bg-black/[0.03]'
                    }`}
                  >
                    <span className="truncate">{item.label}</span>
                    <span
                      className={`text-[11rem] font-mono px-[6rem] py-[1rem] rounded-md ${
                        isActive
                          ? 'bg-white/15 text-white'
                          : 'bg-black/[0.04] text-black/40'
                      }`}
                    >
                      {item.count}
                    </span>
                  </button>
                )
              })}
            </div>
          )}
        </div>

        {/* =========================================================================
            SECTION 3: LEVEL OF DETAIL (Gross, Tissue, Molecular)
            ========================================================================= */}
        <div className="pt-[16rem] border-t border-black/[0.06]">
          <button
            onClick={() => toggleSection('detailLevel')}
            className="w-full flex items-center justify-between py-[6rem] text-[11rem] uppercase tracking-wider text-black/40 font-semibold hover:text-black transition-colors cursor-pointer"
          >
            <span>Level of Detail</span>
            <ChevronDown
              className={`w-[13rem] h-[13rem] text-black/40 transition-transform duration-200 ${
                openSections.detailLevel ? 'rotate-180' : ''
              }`}
            />
          </button>

          {openSections.detailLevel && (
            <div className="mt-[6rem] space-y-[4rem]">
              {levelsOfDetail.map((lvl) => {
                const isSelected = selectedLevel === lvl.id
                return (
                  <button
                    key={lvl.id}
                    onClick={() => onSelectLevel(isSelected ? null : lvl.id)}
                    className="w-full flex items-center justify-between px-[10rem] py-[6rem] rounded-lg text-[12rem] text-black/70 hover:text-black hover:bg-black/[0.02] transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-[8rem]">
                      <div
                        className={`w-[14rem] h-[14rem] rounded border flex items-center justify-center transition-colors ${
                          isSelected
                            ? 'bg-[#0f0f0f] border-[#0f0f0f] text-white'
                            : 'border-black/20 bg-white'
                        }`}
                      >
                        {isSelected && <Check className="w-[10rem] h-[10rem] stroke-[3]" />}
                      </div>
                      <span>{lvl.label}</span>
                    </div>
                    <span className="text-[10rem] font-mono text-black/40">
                      {lvl.count}
                    </span>
                  </button>
                )
              })}
            </div>
          )}
        </div>

        {/* =========================================================================
            SECTION 4: BIOTYPE / GENDER
            ========================================================================= */}
        <div className="pt-[16rem] border-t border-black/[0.06]">
          <p className="text-[11rem] uppercase tracking-wider text-black/40 font-semibold px-[4rem] mb-[8rem]">
            Model Biotype
          </p>
          <div className="grid grid-cols-3 gap-[4rem] p-[3rem] rounded-xl bg-[#f8f8f8] border border-black/[0.06] text-[11rem]">
            {biotypes.map((b) => (
              <button
                key={b.id}
                onClick={() => onSelectBiotype(b.id)}
                className={`py-[5rem] rounded-lg font-medium transition-all cursor-pointer ${
                  selectedBiotype === b.id
                    ? 'bg-white text-[#0f0f0f] shadow-xs'
                    : 'text-black/50 hover:text-black'
                }`}
              >
                {b.id === 'all' ? 'All' : b.id === 'male' ? 'Male' : 'Female'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* =========================================================================
          BOTTOM ENGINE DIAGNOSTIC BEACON
          ========================================================================= */}
      <div className="p-[16rem] border-t border-black/[0.06] bg-[#fafafa]">
        <div className="flex items-center justify-between text-[11rem]">
          <div className="flex items-center gap-[8rem]">
            <span className="relative flex h-[7rem] w-[7rem]">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#deff00] opacity-90"></span>
              <span className="relative inline-flex rounded-full h-[7rem] w-[7rem] bg-[#0f0f0f]"></span>
            </span>
            <span className="text-black/60 font-mono">WebGL Engine</span>
          </div>
          <span className="text-black/40 font-mono">60 FPS</span>
        </div>
      </div>
    </aside>
  )
}
