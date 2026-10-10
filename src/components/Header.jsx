export default function Header({ theme = 'dark', onNavigate }) {
  const isWhite = theme === 'white'

  return (
    <header
      className={`fixed top-0 left-0 w-full z-[3002] pointer-events-none flex items-center px-[20rem] lg:px-[52rem] h-[67rem] lg:h-[115rem] transition-colors duration-300 ${
        isWhite ? 'text-[#0f0f0f]' : 'text-white'
      }`}
    >
      <div className="flex items-center relative w-full [&>*]:flex-1">
        {/* Logo */}
        <div className="flex justify-start">
          <a
            href="/"
            onClick={(e) => {
              if (onNavigate) {
                e.preventDefault()
                onNavigate('landing')
              }
            }}
            aria-current="page"
            className="pointer-events-auto"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100"
              height="24"
              fill="none"
              viewBox="0 0 100 24"
              className="w-[84rem] lg:w-[100rem] transition-colors duration-300"
            >
              <path
                fill="currentColor"
                d="M0 19.103V5.782h4.183V7.68h.08c.948-1.526 2.333-2.29 4.156-2.29 1.806 0 3.093.78 3.861 2.342h.054c1.037-1.561 2.476-2.342 4.317-2.342 1.52 0 2.672.46 3.46 1.38.803.901 1.206 2.124 1.206 3.668v8.664h-4.37v-7.91c0-1.509-.644-2.263-1.931-2.263-.68 0-1.216.251-1.61.754-.375.486-.562 1.136-.562 1.952v7.467H8.473v-7.91c0-1.509-.643-2.263-1.93-2.263-.68 0-1.216.251-1.61.754-.375.486-.562 1.136-.562 1.952v7.467H0ZM27.354 19.441c-1.413 0-2.548-.355-3.406-1.067-.858-.71-1.287-1.708-1.287-2.992 0-1.353.465-2.333 1.394-2.94.93-.624 2.217-1.04 3.861-1.249 1.341-.156 2.253-.33 2.735-.52.501-.208.751-.529.751-.963 0-.954-.625-1.43-1.877-1.43-1.34 0-2.082.572-2.225 1.717h-4.022c.053-1.319.608-2.411 1.662-3.279 1.073-.867 2.592-1.3 4.558-1.3 1.967 0 3.45.364 4.452 1.092 1.161.815 1.742 2.082 1.742 3.799v6.713c0 1.058.161 1.69.483 1.899v.182H31.94c-.18-.243-.331-.737-.456-1.483h-.054c-.876 1.214-2.234 1.821-4.075 1.821Zm1.394-2.706c.822 0 1.483-.216 1.984-.65.518-.451.777-1.032.777-1.743v-1.588c-.428.209-1.18.443-2.252.703-.876.19-1.492.416-1.85.676-.357.26-.536.634-.536 1.12 0 .988.626 1.482 1.877 1.482ZM37.811 19.103V.5h4.317v9.783l4.076-4.501h5.04l-4.826 4.995 5.39 8.326H46.74l-3.298-5.438-1.314 1.353v4.085h-4.317Z"
              />
              <path
                fill="currentColor"
                d="M58.445 19.493c-2.217 0-3.995-.659-5.336-1.977-1.323-1.336-1.984-3.036-1.984-5.1 0-2.012.652-3.686 1.957-5.021 1.323-1.336 3.021-2.004 5.095-2.004 1.877 0 3.44.555 4.692 1.666 1.645 1.457 2.449 3.616 2.413 6.478h-9.867c.143.92.474 1.64.992 2.16.518.503 1.216.754 2.092.754 1.126 0 1.885-.442 2.279-1.327h4.263c-.322 1.284-1.09 2.333-2.306 3.148-1.198.816-2.628 1.223-4.29 1.223Zm-3.003-8.482h5.416c-.071-.798-.348-1.43-.831-1.899-.465-.468-1.055-.703-1.77-.703-1.555 0-2.493.868-2.815 2.602ZM66.746 23.5V5.782h4.182v1.613h.08c1.056-1.336 2.44-2.004 4.157-2.004 1.787 0 3.209.668 4.263 2.004 1.073 1.318 1.609 3 1.609 5.047 0 2.151-.545 3.868-1.636 5.152-1.09 1.284-2.538 1.925-4.343 1.925-1.68 0-2.977-.598-3.888-1.795h-.054V23.5h-4.37Zm7.186-7.259c.84 0 1.492-.32 1.957-.963.483-.659.724-1.552.724-2.68 0-1.18-.233-2.107-.697-2.784C75.45 9.138 74.763 8.8 73.85 8.8c-.912 0-1.618.355-2.118 1.067-.5.693-.751 1.604-.751 2.731 0 1.093.26 1.978.778 2.654.518.66 1.242.989 2.171.989ZM82.509 19.103V5.782h4.37v13.32h-4.37Zm0-15.169V.5h4.37v3.434h-4.37ZM89.003 19.103V.5h4.425v18.603h-4.425ZM95.576 19.103V.5H100v18.603h-4.424Z"
              />
            </svg>
          </a>
        </div>

        {/* Center Navigation Shortcuts */}
        <div className="flex justify-center items-center gap-3 pointer-events-auto">
          <a
            href="/preview"
            onClick={(e) => {
              if (onNavigate) {
                e.preventDefault()
                onNavigate('preview')
              }
            }}
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
              isWhite
                ? 'border-[#0f0f0f]/30 hover:border-[#0f0f0f] bg-black/5 text-[#0f0f0f] hover:bg-black/10'
                : 'border-cyan-500/50 hover:border-cyan-400 bg-cyan-950/40 text-cyan-300 hover:text-white hover:bg-cyan-900/60 shadow-lg shadow-cyan-950/50'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            3D AnatomiLab
          </a>

          <a
            href="/dashboard"
            onClick={(e) => {
              if (onNavigate) {
                e.preventDefault()
                onNavigate('dashboard')
              }
            }}
            className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium uppercase tracking-wider transition-all duration-300 ${
              isWhite
                ? 'border-[#0f0f0f]/20 hover:border-[#0f0f0f] text-[#0f0f0f]/80 hover:text-[#0f0f0f]'
                : 'border-white/20 hover:border-white text-white/70 hover:text-white'
            }`}
          >
            Dashboard
          </a>
        </div>


        {/* Menu Toggle */}
        <div className="flex justify-end gap-[45rem]">
          <button
            type="button"
            className="pointer-events-auto text-[18rem] leading-[120%]"
            aria-label="Open menu"
          >
            <span className="flex h-[36px] w-[84px]">
              {/* 'M' Segment */}
              <span
                className={`flex flex-[0_0_50%] items-center justify-center pl-[4px] text-[16px] leading-[16px] rounded-l-full border transition-colors duration-300 ${
                  isWhite
                    ? 'border-[#0f0f0f] text-[#0f0f0f]'
                    : 'border-white text-white'
                }`}
              >
                M
              </span>
              {/* Burger Segment */}
              <span
                className={`relative -left-[1px] flex flex-[0_0_calc(50%+1px)] items-center justify-center pr-[4px] rounded-r-full border transition-colors duration-300 ${
                  isWhite ? 'border-[#0f0f0f]' : 'border-white'
                }`}
              >
                <span className="flex flex-col items-center justify-center gap-[9px]">
                  <span
                    className={`block h-[1px] w-[14px] transition-colors duration-300 ${
                      isWhite ? 'bg-[#0f0f0f]' : 'bg-white'
                    }`}
                  ></span>
                  <span
                    className={`block h-[1px] w-[14px] transition-colors duration-300 ${
                      isWhite ? 'bg-[#0f0f0f]' : 'bg-white'
                    }`}
                  ></span>
                </span>
              </span>
            </span>
          </button>
        </div>
      </div>
    </header>
  )
}
