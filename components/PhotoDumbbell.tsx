'use client'
import { motion, useReducedMotion } from 'framer-motion'

export default function PhotoDumbbell({ className = '' }: { className?: string }) {
  const reduced = useReducedMotion()

  return (
    <motion.div
      className={`relative select-none ${className}`}
      animate={reduced ? {} : { y: [0, -14, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
    >
      <svg
        viewBox="0 0 700 230"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        style={{ width: '100%', height: 'auto', overflow: 'visible' }}
      >
        <defs>
          {/* Plate face — overhead lighting: bright top, dark bottom */}
          <linearGradient id="db-plate-face" x1="0.5" y1="0" x2="0.5" y2="1">
            <stop offset="0%"   stopColor="#484848" />
            <stop offset="18%"  stopColor="#2e2e2e" />
            <stop offset="55%"  stopColor="#1a1a1a" />
            <stop offset="100%" stopColor="#090909" />
          </linearGradient>

          {/* Plate inner ring */}
          <linearGradient id="db-inner-ring" x1="0.5" y1="0" x2="0.5" y2="1">
            <stop offset="0%"   stopColor="#222222" />
            <stop offset="100%" stopColor="#0c0c0c" />
          </linearGradient>

          {/* Hub */}
          <radialGradient id="db-hub" cx="35%" cy="30%" r="65%">
            <stop offset="0%"   stopColor="#1e1e1e" />
            <stop offset="100%" stopColor="#080808" />
          </radialGradient>

          {/* Handle — chrome cylinder, overhead light */}
          <linearGradient id="db-handle" x1="0.5" y1="0" x2="0.5" y2="1">
            <stop offset="0%"   stopColor="#c8c8c8" />
            <stop offset="7%"   stopColor="#787878" />
            <stop offset="30%"  stopColor="#3c3c3c" />
            <stop offset="50%"  stopColor="#282828" />
            <stop offset="70%"  stopColor="#323232" />
            <stop offset="93%"  stopColor="#606060" />
            <stop offset="100%" stopColor="#c0c0c0" />
          </linearGradient>

          {/* Amber collar */}
          <linearGradient id="db-collar" x1="0.5" y1="0" x2="0.5" y2="1">
            <stop offset="0%"   stopColor="#FDE68A" />
            <stop offset="20%"  stopColor="#FBBF24" />
            <stop offset="55%"  stopColor="#F59E0B" />
            <stop offset="85%"  stopColor="#D97706" />
            <stop offset="100%" stopColor="#92400E" />
          </linearGradient>

          {/* Plate edge thickness (outer shadow) */}
          <linearGradient id="db-plate-edge" x1="0" y1="0.5" x2="1" y2="0.5">
            <stop offset="0%"   stopColor="#050505" />
            <stop offset="50%"  stopColor="#151515" />
            <stop offset="100%" stopColor="#050505" />
          </linearGradient>

          {/* Floor shadow */}
          <radialGradient id="db-shadow" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#000000" stopOpacity="0.65" />
            <stop offset="60%"  stopColor="#000000" stopOpacity="0.3"  />
            <stop offset="100%" stopColor="#000000" stopOpacity="0"    />
          </radialGradient>

          {/* Amber ambient glow below (product photography look) */}
          <radialGradient id="db-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#F59E0B" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0"    />
          </radialGradient>

          {/* Filter: blur glow for collar */}
          <filter id="db-collar-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ── Ambient amber glow ── */}
        <ellipse cx="350" cy="145" rx="300" ry="90" fill="url(#db-glow)" />

        {/* ── Floor shadow ── */}
        <ellipse cx="350" cy="220" rx="260" ry="10" fill="url(#db-shadow)" />

        {/* ══════════════════ LEFT PLATE ══════════════════ */}

        {/* Plate outer edge / depth shadow (offset behind) */}
        <polygon
          points="168,115 127,43 44,43 2,115 44,187 127,187"
          fill="#040404"
          transform="translate(4,5)"
          opacity="0.9"
        />

        {/* Main plate shape */}
        <polygon
          points="168,115 127,43 44,43 2,115 44,187 127,187"
          fill="#0d0d0d"
        />

        {/* Plate face (inset slightly) */}
        <polygon
          points="163,115 123,49 47,49 7,115 47,181 123,181"
          fill="url(#db-plate-face)"
        />

        {/* Top specular highlight (light hitting top-left of plate) */}
        <polygon
          points="123,49 47,49 7,115 20,110 55,55"
          fill="white"
          fillOpacity="0.06"
        />

        {/* Inner bevel ring */}
        <circle cx="85" cy="115" r="52" fill="url(#db-inner-ring)" />

        {/* Inner ring rim highlight */}
        <path
          d="M 48,80 A 52,52 0 0 1 122,80"
          stroke="#3a3a3a"
          strokeWidth="1.5"
          fill="none"
          opacity="0.7"
        />

        {/* Hub circle */}
        <circle cx="85" cy="115" r="24" fill="url(#db-hub)" />

        {/* Hub highlight */}
        <path
          d="M 68,100 A 24,24 0 0 1 102,100"
          stroke="#2a2a2a"
          strokeWidth="1"
          fill="none"
          opacity="0.8"
        />

        {/* Center hole */}
        <circle cx="85" cy="115" r="10" fill="#030303" />

        {/* Hole rim */}
        <circle cx="85" cy="115" r="10" fill="none" stroke="#1a1a1a" strokeWidth="1" />

        {/* ══════════════════ RIGHT PLATE ══════════════════ */}

        <polygon
          points="532,115 574,43 657,43 698,115 657,187 574,187"
          fill="#040404"
          transform="translate(4,5)"
          opacity="0.9"
        />
        <polygon
          points="532,115 574,43 657,43 698,115 657,187 574,187"
          fill="#0d0d0d"
        />
        <polygon
          points="537,115 577,49 653,49 693,115 653,181 577,181"
          fill="url(#db-plate-face)"
        />
        <polygon
          points="577,49 653,49 693,115 680,110 645,55"
          fill="white"
          fillOpacity="0.06"
        />
        <circle cx="615" cy="115" r="52" fill="url(#db-inner-ring)" />
        <path
          d="M 578,80 A 52,52 0 0 1 652,80"
          stroke="#3a3a3a"
          strokeWidth="1.5"
          fill="none"
          opacity="0.7"
        />
        <circle cx="615" cy="115" r="24" fill="url(#db-hub)" />
        <path
          d="M 598,100 A 24,24 0 0 1 632,100"
          stroke="#2a2a2a"
          strokeWidth="1"
          fill="none"
          opacity="0.8"
        />
        <circle cx="615" cy="115" r="10" fill="#030303" />
        <circle cx="615" cy="115" r="10" fill="none" stroke="#1a1a1a" strokeWidth="1" />

        {/* ══════════════════ HANDLE ══════════════════ */}

        {/* Handle bottom shadow strip */}
        <rect x="173" y="136" width="354" height="6" rx="2" fill="#000" fillOpacity="0.45" />

        {/* Handle body */}
        <rect x="173" y="88" width="354" height="52" rx="4" fill="url(#db-handle)" />

        {/* Knurling — diamond cross-hatch at very low opacity */}
        {Array.from({ length: 30 }).map((_, i) => (
          <line
            key={`kv-${i}`}
            x1={180 + i * 11.7}
            y1="88"
            x2={180 + i * 11.7}
            y2="140"
            stroke="white"
            strokeOpacity="0.045"
            strokeWidth="1.2"
          />
        ))}
        {Array.from({ length: 30 }).map((_, i) => (
          <line
            key={`kd-${i}`}
            x1={173 + i * 11.7}
            y1="88"
            x2={190 + i * 11.7}
            y2="140"
            stroke="white"
            strokeOpacity="0.025"
            strokeWidth="1"
          />
        ))}

        {/* Handle top highlight rim */}
        <rect x="173" y="88" width="354" height="6" rx="4" fill="white" fillOpacity="0.18" />
        <rect x="173" y="88" width="354" height="2" rx="4" fill="white" fillOpacity="0.1"  />

        {/* ══════════════════ AMBER COLLARS ══════════════════ */}

        {/* Left collar */}
        <rect
          x="150" y="80" width="26" height="70" rx="3"
          fill="url(#db-collar)"
          filter="url(#db-collar-glow)"
        />
        {/* Left collar top highlight */}
        <rect x="150" y="80" width="26" height="10" rx="3" fill="white" fillOpacity="0.22" />
        {/* Left collar bottom shadow */}
        <rect x="150" y="140" width="26" height="10" rx="3" fill="black" fillOpacity="0.3"  />

        {/* Right collar */}
        <rect
          x="524" y="80" width="26" height="70" rx="3"
          fill="url(#db-collar)"
          filter="url(#db-collar-glow)"
        />
        <rect x="524" y="80" width="26" height="10" rx="3" fill="white" fillOpacity="0.22" />
        <rect x="524" y="140" width="26" height="10" rx="3" fill="black" fillOpacity="0.3"  />

        {/* ══ Late specular: plate top-edge bright line ══ */}
        {/* Left plate top edge */}
        <line x1="44" y1="43" x2="127" y2="43" stroke="white" strokeOpacity="0.12" strokeWidth="1.5" />
        {/* Right plate top edge */}
        <line x1="574" y1="43" x2="657" y2="43" stroke="white" strokeOpacity="0.12" strokeWidth="1.5" />
      </svg>
    </motion.div>
  )
}
