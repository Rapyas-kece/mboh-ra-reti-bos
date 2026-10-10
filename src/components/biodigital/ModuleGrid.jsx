import ModuleCard from './ModuleCard'
import { Brain, ChevronRight, Activity } from 'lucide-react'

export default function ModuleGrid({ modules = [], viewMode = 'grid', onSelectModule }) {
  if (modules.length === 0) {
    return (
      <div className="py-[80rem] flex flex-col items-center justify-center text-center">
        <div className="w-[56rem] h-[56rem] rounded-full bg-[#f8f8f8] border border-black/[0.08] flex items-center justify-center text-black/40 mb-[16rem]">
          <Brain className="w-[26rem] h-[26rem]" />
        </div>
        <h3 className="text-[16rem] font-medium text-[#0f0f0f]">No modules found</h3>
        <p className="text-[13rem] text-black/50 mt-[4rem] max-w-[320rem]">
          Try adjusting your search terms or filters in the sidebar.
        </p>
      </div>
    )
  }

  if (viewMode === 'list') {
    return (
      <div className="space-y-[8rem]">
        {modules.map((m) => (
          <div
            key={m.id}
            onClick={() => onSelectModule?.(m)}
            className="group rounded-2xl border border-black/[0.08] bg-white p-[16rem] hover:border-black/30 hover:shadow-sm transition-all flex items-center justify-between cursor-pointer select-none"
          >
            <div className="flex items-center gap-[16rem]">
              <div
                className="w-[48rem] h-[48rem] rounded-xl border border-black/[0.06] bg-[#fbfbfb] flex items-center justify-center shrink-0"
                style={{ color: m.colorAccent }}
              >
                <Brain className="w-[24rem] h-[24rem] stroke-[1.6]" />
              </div>
              <div>
                <span className="text-[10rem] font-mono uppercase tracking-wider text-black/40">
                  / {m.system}
                </span>
                <h4 className="text-[14rem] font-semibold text-[#0f0f0f] group-hover:text-black">
                  {m.title}
                </h4>
              </div>
            </div>

            <div className="flex items-center gap-[16rem]">
              <span className="text-[11rem] font-mono text-black/40 hidden sm:inline">
                {m.layers}
              </span>
              <button
                type="button"
                className="px-[14rem] py-[6rem] rounded-full border border-black/10 text-[11rem] font-medium text-[#0f0f0f] group-hover:bg-[#0f0f0f] group-hover:text-white transition-all cursor-pointer"
              >
                Inspect 3D
              </button>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[20rem]">
      {modules.map((m) => (
        <ModuleCard key={m.id} module={m} onSelect={onSelectModule} />
      ))}
    </div>
  )
}
