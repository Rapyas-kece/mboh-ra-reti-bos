import { Grid, List, ChevronDown } from 'lucide-react'

export default function CategoryFilterHeader({
  title = 'Neurology and Psychiatry',
  totalCount = 48,
  typeTabs = [],
  activeTab = 'all',
  onSelectTab,
  viewMode = 'grid',
  onViewModeChange,
  sortBy = 'popular',
  onSortByChange,
}) {
  return (
    <div className="border-b border-black/[0.08] bg-white sticky top-0 z-30 select-none">
      {/* Top Row: Category Title, Count, Sort & View Controls */}
      <div className="px-[28rem] lg:px-[36rem] pt-[20rem] pb-[14rem] flex flex-col md:flex-row md:items-center justify-between gap-[16rem]">
        {/* Title & Breadcrumb */}
        <div>
          <div className="flex items-center gap-[6rem] text-[11rem] text-black/40 font-mono uppercase tracking-wider mb-[4rem]">
            <span>Clinical Specialties</span>
            <span>/</span>
            <span className="text-[#0f0f0f] font-semibold">Neurology & Psychiatry</span>
          </div>
          <div className="flex items-baseline gap-[10rem]">
            <h1 className="text-[24rem] lg:text-[28rem] font-semibold text-[#0f0f0f] tracking-tight">
              {title}
            </h1>
            <span className="text-[13rem] font-mono text-black/40">
              ({totalCount} models)
            </span>
          </div>
        </div>

        {/* Sort & Grid/List Controls */}
        <div className="flex items-center gap-[16rem]">
          {/* Sort By Dropdown */}
          <div className="flex items-center gap-[6rem] text-[12rem] text-black/60">
            <span className="text-black/40">Sort by:</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => onSortByChange(e.target.value)}
                className="bg-transparent text-[#0f0f0f] font-medium appearance-none pr-[18rem] cursor-pointer focus:outline-none"
              >
                <option value="popular">Most Popular</option>
                <option value="alphabetical">Alphabetical</option>
                <option value="newest">Newest 3D</option>
              </select>
              <ChevronDown className="w-[12rem] h-[12rem] absolute right-0 top-1/2 -translate-y-1/2 text-black/40 pointer-events-none" />
            </div>
          </div>

          {/* Grid / List View Toggle */}
          <div className="flex items-center p-[2rem] rounded-lg bg-[#f8f8f8] border border-black/[0.08]">
            <button
              type="button"
              onClick={() => onViewModeChange('grid')}
              className={`p-[5rem] rounded-md transition-all cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-white text-[#0f0f0f] shadow-xs'
                  : 'text-black/40 hover:text-black'
              }`}
              title="Grid view"
            >
              <Grid className="w-[14rem] h-[14rem]" />
            </button>
            <button
              type="button"
              onClick={() => onViewModeChange('list')}
              className={`p-[5rem] rounded-md transition-all cursor-pointer ${
                viewMode === 'list'
                  ? 'bg-white text-[#0f0f0f] shadow-xs'
                  : 'text-black/40 hover:text-black'
              }`}
              title="List view"
            >
              <List className="w-[14rem] h-[14rem]" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Row: Official BioDigital Type Tabs (All | Anatomy | Conditions | Treatments) */}
      <div className="px-[28rem] lg:px-[36rem] flex items-center gap-[8rem] overflow-x-auto pb-[12rem] scrollbar-none">
        {typeTabs.map((tab) => {
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`px-[16rem] py-[7rem] rounded-full text-[12rem] font-medium whitespace-nowrap transition-all duration-150 cursor-pointer flex items-center gap-[6rem] ${
                isActive
                  ? 'bg-[#0f0f0f] text-white shadow-xs'
                  : 'bg-[#f8f8f8] text-black/60 hover:text-black hover:bg-[#f0f0f0] border border-black/[0.05]'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[10rem] font-mono px-[5rem] py-[1rem] rounded-full ${
                  isActive ? 'bg-white/20 text-white' : 'bg-black/[0.06] text-black/45'
                }`}
              >
                {tab.count}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
