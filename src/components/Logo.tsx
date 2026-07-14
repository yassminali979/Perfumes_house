export function Logo({ className = '', showText = true }: { className?: string; showText?: boolean }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg
        viewBox="0 0 48 48"
        className="h-9 w-9 shrink-0"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Diamond frame */}
        <path
          d="M24 2 L46 24 L24 46 L2 24 Z"
          stroke="url(#goldGrad)"
          strokeWidth="1.5"
          fill="rgba(212,169,78,0.04)"
        />
        {/* Inner diamond accent */}
        <path
          d="M24 8 L40 24 L24 40 L8 24 Z"
          stroke="url(#goldGrad)"
          strokeWidth="0.5"
          opacity="0.4"
          fill="none"
        />
        {/* Bottle cap */}
        <rect x="20.5" y="10" width="7" height="3.5" rx="0.5" fill="url(#goldGrad)" />
        {/* Bottle neck */}
        <rect x="21.5" y="13" width="5" height="2" fill="url(#goldGrad)" opacity="0.7" />
        {/* Bottle body */}
        <path
          d="M18 15 H30 V26 Q30 31 24 33 Q18 31 18 26 Z"
          stroke="url(#goldGrad)"
          strokeWidth="1.2"
          fill="rgba(212,169,78,0.06)"
        />
        {/* P monogram */}
        <text
          x="24"
          y="27"
          textAnchor="middle"
          fontFamily="Cormorant Garamond, serif"
          fontSize="11"
          fontWeight="600"
          fill="url(#goldGrad)"
        >
          P
        </text>
        {/* H monogram - stylized as reflection */}
        <text
          x="24"
          y="27"
          textAnchor="middle"
          fontFamily="Cormorant Garamond, serif"
          fontSize="11"
          fontWeight="600"
          fill="none"
          stroke="url(#goldGrad)"
          strokeWidth="0.4"
          opacity="0.5"
        >
          H
        </text>
        {/* Atomizer spray */}
        <circle cx="24" cy="7.5" r="1.2" fill="url(#goldGrad)" opacity="0.6" />
        <line x1="24" y1="8.5" x2="24" y2="10" stroke="url(#goldGrad)" strokeWidth="0.6" opacity="0.5" />
        <defs>
          <linearGradient id="goldGrad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
            <stop stopColor="#f5ecd6" />
            <stop offset="0.5" stopColor="#d4a94e" />
            <stop offset="1" stopColor="#a87d2c" />
          </linearGradient>
        </defs>
      </svg>
      {showText && (
        <div className="flex flex-col leading-none">
          <span className="font-serif text-lg tracking-widest2 text-cream-50 leading-none">
            Perfumes
          </span>
          <span className="font-serif text-lg tracking-widest2 text-gold-300 leading-none italic">
            House
          </span>
        </div>
      )}
    </div>
  );
}
