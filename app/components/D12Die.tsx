interface D12DieProps {
  label: string;
  isRolling: boolean;
  delay?: number;
}

export function D12Die({ label, isRolling, delay = 0 }: D12DieProps) {
  return (
    <div
      className={`relative transition-transform duration-300 ${
        isRolling ? "dice-rolling" : "hover:-translate-y-2"
      }`}
      style={{
        animationDelay: isRolling ? `${delay}ms` : undefined,
        perspective: "600px",
      }}
    >
      <svg
        viewBox="0 0 200 220"
        className="w-32 h-36 md:w-48 md:h-52 lg:w-56 lg:h-60 drop-shadow-[0_0_25px_rgba(212,175,55,0.3)]"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer dodecahedron shape */}
        <polygon
          points="100,10 185,65 160,170 40,170 15,65"
          fill="rgba(29,24,82,0.85)"
          stroke="#d4af37"
          strokeWidth="2.5"
          className={`${isRolling ? "" : "transition-all duration-300"}`}
        />

        {/* Inner pentagon facet lines */}
        <polygon
          points="100,45 155,82 138,148 62,148 45,82"
          fill="none"
          stroke="rgba(212,175,55,0.25)"
          strokeWidth="1.5"
        />

        {/* Facet connection lines from outer to inner */}
        <line x1="100" y1="10" x2="100" y2="45" stroke="rgba(212,175,55,0.2)" strokeWidth="1" />
        <line x1="185" y1="65" x2="155" y2="82" stroke="rgba(212,175,55,0.2)" strokeWidth="1" />
        <line x1="160" y1="170" x2="138" y2="148" stroke="rgba(212,175,55,0.2)" strokeWidth="1" />
        <line x1="40" y1="170" x2="62" y2="148" stroke="rgba(212,175,55,0.2)" strokeWidth="1" />
        <line x1="15" y1="65" x2="45" y2="82" stroke="rgba(212,175,55,0.2)" strokeWidth="1" />

        {/* Subtle light reflection */}
        <polygon
          points="100,45 155,82 138,148 62,148 45,82"
          fill="url(#dieGradient)"
          opacity="0.15"
        />

        {/* Gradient for shine effect */}
        <defs>
          <linearGradient id="dieGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d4af37" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#d4af37" stopOpacity="0" />
            <stop offset="100%" stopColor="#d4af37" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Number label */}
        <text
          x="100"
          y="118"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#d4af37"
          fontSize={label.length > 1 ? "42" : "52"}
          fontFamily="var(--font-cinzel), serif"
          fontWeight="700"
          className="select-none"
        >
          {label}
        </text>
      </svg>
    </div>
  );
}
