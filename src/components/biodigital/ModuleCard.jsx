import { Bookmark, ChevronRight, Brain, Activity, Zap, ShieldAlert, Cpu } from 'lucide-react'

export default function ModuleCard({ module, onSelect }) {
  const getIcon = () => {
    switch (module.type) {
      case 'conditions':
        return <ShieldAlert className="w-[42rem] h-[42rem] stroke-[1.4]" />
      case 'treatments':
        return <Cpu className="w-[42rem] h-[42rem] stroke-[1.4]" />
      default:
        return <Brain className="w-[42rem] h-[42rem] stroke-[1.4]" />
    }
  }

  return (
    <div
      onClick={() => onSelect?.(module)}
      className="group rounded-2xl border border-black/[0.08] bg-white overflow-hidden hover:border-black/30 hover:shadow-lg transition-all duration-300 flex flex-col justify-between cursor-pointer select-none"
    >
      {/* 3D Visualizer Canvas Window */}
      <div className="relative h-[190rem] w-full bg-[#0a0f1d] border-b border-black/[0.05] overflow-hidden flex items-center justify-center">
        {module.thumbnail ? (
          <>
            <img
              src={module.thumbnail}
              alt={module.title}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />
          </>
        ) : (
          <>
            {/* Subtle Precision Grid Lines */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:20rem_20rem] pointer-events-none"></div>

            {/* Central 3D Mesh / Model Visual Hub */}
            <div className="relative z-10 w-[96rem] h-[96rem] rounded-full bg-white border border-black/[0.08] flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform duration-500">
              {/* Subtle Ambient Halo */}
              <div
                className="absolute inset-0 rounded-full opacity-15 blur-lg group-hover:opacity-30 transition-opacity"
                style={{ backgroundColor: module.colorAccent }}
              ></div>
              <div style={{ color: module.colorAccent }}>{getIcon()}</div>
            </div>
          </>
        )}

        {/* Floating Top Badges */}
        <div className="absolute top-[12rem] left-[12rem] right-[12rem] flex items-center justify-between z-20">
          <span className="px-[9rem] py-[3rem] rounded-full text-[10rem] font-mono uppercase tracking-wider bg-white/90 backdrop-blur-xs border border-black/[0.08] text-[#0f0f0f] font-medium shadow-2xs">
            {module.badge}
          </span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
            }}
            className="w-[28rem] h-[28rem] rounded-full bg-white/90 backdrop-blur-xs border border-black/[0.08] flex items-center justify-center text-black/40 hover:text-black transition-colors shadow-2xs cursor-pointer"
          >
            <Bookmark className="w-[12rem] h-[12rem]" />
          </button>
        </div>

        {/* Bottom Metadata Info */}
        <div className="absolute bottom-[10rem] right-[12rem] text-[10rem] font-mono text-white/90 drop-shadow-xs z-20">
          {module.layers}
        </div>
      </div>

      {/* Card Detail Information */}
      <div className="p-[20rem] flex-1 flex flex-col justify-between">
        <div>
          <span className="text-[10rem] font-mono uppercase tracking-wider text-black/40 block">
            / {module.system}
          </span>
          <h3 className="mt-[4rem] text-[15rem] font-semibold text-[#0f0f0f] leading-[130%] group-hover:text-black transition-colors line-clamp-2">
            {module.title}
          </h3>
          <p className="mt-[8rem] text-[12rem] text-black/60 leading-[145%] line-clamp-2">
            {module.description}
          </p>
        </div>

        {/* Anatomical Landmarks & Action */}
        <div className="mt-[16rem] pt-[12rem] border-t border-black/[0.06] flex items-center justify-between">
          <div className="flex items-center gap-[4rem] overflow-hidden truncate">
            {module.landmarks?.slice(0, 2).map((lm, i) => (
              <span
                key={i}
                className="text-[10rem] font-mono text-black/50 bg-[#f8f8f8] px-[6rem] py-[2rem] rounded border border-black/[0.04]"
              >
                {lm}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-[4rem] text-[11rem] font-medium text-[#0f0f0f] group-hover:translate-x-[2rem] transition-transform shrink-0">
            <span>Inspect</span>
            <ChevronRight className="w-[12rem] h-[12rem]" />
          </div>
        </div>
      </div>
    </div>
  )
}
