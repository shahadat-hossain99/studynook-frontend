const loading = () => {
  return (
    <>
      <style>{`
        @keyframes loading-bar {
          0%   { transform: translateX(-100%); }
          50%  { transform: translateX(0%); }
          100% { transform: translateX(100%); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes spin-reverse {
          from { transform: rotate(0deg); }
          to   { transform: rotate(-360deg); }
        }
        @keyframes glow-pulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50%      { opacity: 0.7; transform: scale(1.1); }
        }
        .loading-bar    { animation: loading-bar 1.8s ease-in-out infinite; }
        .spin-slow      { animation: spin-slow 2s linear infinite; }
        .spin-reverse   { animation: spin-reverse 1.5s linear infinite; }
        .glow-1         { animation: glow-pulse 3s ease-in-out infinite; }
        .glow-2         { animation: glow-pulse 3s ease-in-out infinite 1s; }
      `}</style>

      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0B1120]">
        {/* ANIMATED LOGO MARK */}
        <div className="relative flex items-center justify-center mb-8">
          {/* OUTER PING RING */}
          <div className="absolute w-24 h-24 rounded-full border border-violet-500/20 animate-ping" />
          {/* MID RING */}
          <div className="absolute w-20 h-20 rounded-full border border-cyan-500/30 animate-pulse" />

          {/* SPINNING ARC */}
          <svg
            className="absolute w-28 h-28 spin-slow"
            viewBox="0 0 100 100"
            fill="none"
          >
            <defs>
              <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="1" />
              </linearGradient>
            </defs>
            <path
              d="M 50 8 A 42 42 0 1 1 8 50"
              stroke="url(#arcGrad)"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>

          {/* COUNTER SPINNING ARC */}
          <svg
            className="absolute w-20 h-20 spin-reverse"
            viewBox="0 0 100 100"
            fill="none"
          >
            <defs>
              <linearGradient id="arcGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.6" />
              </linearGradient>
            </defs>
            <path
              d="M 50 10 A 40 40 0 0 0 10 50"
              stroke="url(#arcGrad2)"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>

          {/* CENTER ICON */}
          <div className="relative w-14 h-14 rounded-2xl bg-linear-to-br from-violet-500/20 to-cyan-500/20 border border-white/10 flex items-center justify-center backdrop-blur-xl">
            <svg
              viewBox="0 0 200 205"
              width="34"
              height="34"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="bG" x1="0%" y1="0%" x2="80%" y2="100%">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
                <linearGradient id="gG" x1="100%" y1="0%" x2="20%" y2="100%">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
                <linearGradient id="mG" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="50%" stopColor="#7a7060" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
              <g transform="translate(0,6)">
                <path
                  d="M100,168 C96,152 74,125 44,88 C28,65 20,44 24,24 C28,10 42,6 58,12 C76,19 95,48 100,72 Z"
                  fill="none"
                  stroke="url(#bG)"
                  strokeWidth="7"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
                <path
                  d="M100,168 C96,148 82,115 70,82 C62,60 58,40 62,22"
                  fill="none"
                  stroke="url(#bG)"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                  opacity="0.55"
                />
                <path
                  d="M100,168 C104,152 126,125 156,88 C172,65 180,44 176,24 C172,10 158,6 142,12 C124,19 105,48 100,72 Z"
                  fill="none"
                  stroke="url(#gG)"
                  strokeWidth="7"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
                <path
                  d="M100,168 C104,148 118,115 130,82 C138,60 142,40 138,22"
                  fill="none"
                  stroke="url(#gG)"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                  opacity="0.55"
                />
                <path
                  d="M30,178 Q100,196 170,178"
                  fill="none"
                  stroke="url(#mG)"
                  strokeWidth="7"
                  strokeLinecap="round"
                />
                <path
                  d="M66,108 C66,86 134,86 134,108 L134,130 C134,136 122,139 100,139 C78,139 66,136 66,130 Z"
                  fill="none"
                  stroke="url(#gG)"
                  strokeWidth="6.5"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
                <path
                  d="M52,128 C52,122 66,119 66,119 L134,119 C134,119 148,122 148,128 L148,146 C148,153 134,156 134,156 L66,156 C66,156 52,153 52,146 Z"
                  fill="none"
                  stroke="url(#gG)"
                  strokeWidth="6.5"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
                <path
                  d="M52,127 C47,122 42,114 42,105 L42,91 C42,84 50,81 57,86 L66,96"
                  fill="none"
                  stroke="url(#gG)"
                  strokeWidth="6.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M148,127 C153,122 158,114 158,105 L158,91 C158,84 150,81 143,86 L134,96"
                  fill="none"
                  stroke="url(#gG)"
                  strokeWidth="6.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M64,156 L60,178"
                  stroke="url(#gG)"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
                <path
                  d="M136,156 L140,178"
                  stroke="url(#gG)"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
              </g>
            </svg>
          </div>
        </div>

        {/* BRAND NAME */}
        <div className="flex items-baseline gap-0.5 mb-2">
          <span className="text-2xl font-black tracking-wide text-white">
            Study
          </span>
          <span className="text-2xl font-black tracking-wide bg-linear-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
            Nook
          </span>
        </div>

        {/* TAGLINE */}
        <p className="text-xs text-slate-500 tracking-[0.25em] uppercase mb-10">
          Library Study Room Booking
        </p>

        {/* PROGRESS BAR */}
        <div className="w-48 h-0.5 rounded-full bg-white/5 overflow-hidden">
          <div className="loading-bar h-full w-full rounded-full bg-linear-to-r from-violet-500 to-cyan-500" />
        </div>

        {/* AMBIENT GLOW */}
        <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
          <div className="glow-1 absolute -top-40 left-1/2 -translate-x-1/2 w-150 h-150 rounded-full bg-violet-600/5 blur-3xl" />
          <div className="glow-2 absolute bottom-0 left-1/4 w-80 h-80 rounded-full bg-cyan-600/5 blur-3xl" />
        </div>
      </div>
    </>
  );
};

export default loading;
