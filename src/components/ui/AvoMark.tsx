'use client';

interface AvoMarkProps {
  size?: number;
  className?: string;
  /** Adds a subtle shadow for elevation */
  elevated?: boolean;
}

/**
 * Avo mascot — a friendly cartoon avocado character rendered as inline SVG.
 * Used as the brand logomark across Navigation, Footer, EmailPopup, etc.
 *
 * Swap for an imported PNG/SVG asset later by replacing the internals.
 */
export default function AvoMark({
  size = 32,
  className,
  elevated = false,
}: AvoMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={
        elevated
          ? { filter: 'drop-shadow(0 6px 12px rgba(62, 142, 90, 0.4))' }
          : undefined
      }
      aria-label="Avo"
      role="img"
    >
      <defs>
        <radialGradient
          id="avoBody"
          cx="40%"
          cy="32%"
          r="70%"
          fx="38%"
          fy="30%"
        >
          <stop offset="0%" stopColor="#c4e4a8" />
          <stop offset="45%" stopColor="#8ec96c" />
          <stop offset="100%" stopColor="#3e8e5a" />
        </radialGradient>
        <radialGradient
          id="avoFlesh"
          cx="45%"
          cy="40%"
          r="70%"
        >
          <stop offset="0%" stopColor="#fef5c4" />
          <stop offset="60%" stopColor="#f0de7e" />
          <stop offset="100%" stopColor="#c9b558" />
        </radialGradient>
        <radialGradient
          id="avoPit"
          cx="40%"
          cy="35%"
          r="65%"
        >
          <stop offset="0%" stopColor="#7a4a22" />
          <stop offset="100%" stopColor="#3e2310" />
        </radialGradient>
      </defs>

      {/* Outer body — pear-shaped avocado */}
      <path
        d="M32 4 C44 4 54 16 54 32 C54 48 44 60 32 60 C20 60 10 48 10 32 C10 16 20 4 32 4 Z"
        fill="url(#avoBody)"
      />

      {/* Rim highlight */}
      <path
        d="M32 4 C24 4 18 10 15 18 C18 12 24 8 32 8 C36 8 40 10 43 13 C40 7 36 4 32 4 Z"
        fill="#ffffff"
        fillOpacity="0.35"
      />

      {/* Inner flesh area */}
      <ellipse cx="32" cy="34" rx="15" ry="19" fill="url(#avoFlesh)" />

      {/* Pit (dark seed center) */}
      <circle cx="32" cy="34" r="8.5" fill="url(#avoPit)" />
      <circle cx="29.5" cy="31" r="2" fill="#ffffff" fillOpacity="0.35" />

      {/* Face — eyes */}
      <circle cx="26.5" cy="42" r="1.5" fill="#0b1a0f" />
      <circle cx="37.5" cy="42" r="1.5" fill="#0b1a0f" />
      <circle cx="26" cy="41.5" r="0.5" fill="#ffffff" />
      <circle cx="37" cy="41.5" r="0.5" fill="#ffffff" />

      {/* Smile */}
      <path
        d="M29 46 Q32 48.5 35 46"
        stroke="#0b1a0f"
        strokeWidth="1.3"
        strokeLinecap="round"
        fill="none"
      />

      {/* Leaf stem on top */}
      <path
        d="M32 4 C30 2 28 1 27 2 C26 3 27 5 29 6 C30 6.5 31 6 32 5 Z"
        fill="#2d6f45"
      />
      <path
        d="M32 4 C31 3 30 2.5 29.5 3 C29 3.5 30 4.5 31 5"
        stroke="#1f5433"
        strokeWidth="0.6"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
