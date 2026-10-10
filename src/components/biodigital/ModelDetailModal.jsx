import { Activity, X, Layers, Box, Compass } from 'lucide-react'

export default function ModelDetailModal({ module, onClose }) {
  if (!module) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-[20rem] bg-black/40 backdrop-blur-xs select-none">
      <div className="relative w-full max-w-[800rem] rounded-3xl bg-white border border-black/10 p-[32rem] shadow-2xl overflow-hidden animate-in fade-in">
        {/* Header */}
        <div className="flex items-start justify-between pb-[18rem] border-b border-black/[0.08]">
          <div>
            <span className="text-[11rem] uppercase font-mono tracking-wider text-black/40">
              / {module.system}
            </span>
            <h2 className="text-[22rem] font-semibold text-[#0f0f0f] mt-[2rem]">
              {module.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-[32rem] h-[32rem] rounded-full border border-black/10 flex items-center justify-center text-black/60 hover:text-black hover:bg-black/[0.04] transition-colors cursor-pointer"
          >
            <X className="w-[16rem] h-[16rem]" />
          </button>
        </div>

        {/* 3D Simulated Viewport Window */}
        <div className="mt-[20rem] h-[300rem] rounded-2xl border border-black/[0.08] bg-[#fbfbfb] relative overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000006_1px,transparent_1px),linear-gradient(to_bottom,#00000006_1px,transparent_1px)] bg-[size:24rem_24rem] pointer-events-none"></div>

          <div
            className="absolute inset-0 opacity-10 blur-3xl pointer-events-none"
            style={{ backgroundColor: module.colorAccent }}
          ></div>

          <div className="relative z-10 text-center space-y-[12rem]">
            <div className="w-[90rem] h-[90rem] rounded-full bg-white border border-black/10 mx-auto flex items-center justify-center shadow-xs">
              <Activity
                className="w-[44rem] h-[44rem] animate-pulse"
                style={{ color: module.colorAccent }}
              />
            </div>
            <div>
              <p className="text-[15rem] font-semibold text-[#0f0f0f]">
                BioDigital 3D Anatomical Simulation
              </p>
              <p className="text-[12rem] text-black/50 mt-[3rem] font-mono">
                {module.layers} • {module.views}
              </p>
            </div>
          </div>
        </div>

        {/* Description & Clinical Context */}
        <div className="mt-[20rem]">
          <p className="text-[13rem] text-black/70 leading-[150%]">
            {module.description}
          </p>
        </div>

        {/* Identified Landmarks */}
        <div className="mt-[18rem]">
          <span className="text-[10rem] uppercase tracking-wider text-black/40 font-mono block mb-[8rem]">
            Anatomical Landmarks
          </span>
          <div className="flex flex-wrap gap-[6rem]">
            {module.landmarks?.map((lm, i) => (
              <span
                key={i}
                className="px-[10rem] py-[4rem] rounded-full border border-black/[0.08] bg-[#f8f8f8] text-[11rem] font-mono text-black/70"
              >
                {lm}
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="mt-[24rem] pt-[18rem] border-t border-black/[0.08] flex justify-end gap-[12rem]">
          <button
            onClick={onClose}
            className="px-[20rem] py-[9rem] rounded-full border border-black/10 text-[12rem] font-medium text-black/70 hover:text-black hover:border-black transition-colors cursor-pointer"
          >
            Close Viewport
          </button>
          <button
            onClick={onClose}
            className="px-[24rem] py-[9rem] rounded-full bg-[#0f0f0f] text-white hover:bg-black text-[12rem] font-medium transition-all shadow-xs cursor-pointer"
          >
            Launch Interactive 3D Model →
          </button>
        </div>
      </div>
    </div>
  )
}
