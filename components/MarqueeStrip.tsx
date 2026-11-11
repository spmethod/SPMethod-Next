export default function MarqueeStrip() {
  const text = 'SPMETHOD  ·  PERSONAL TRAINING  ·  VIENNA  ·  WORLDWIDE  ·  STRENGTH  ·  RESULTS  ·  '

  return (
    <div
      className="relative overflow-hidden bg-[#F59E0B] py-3.5 select-none"
      aria-hidden="true"
    >
      {/* Fade edges */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-16 z-10 bg-gradient-to-r from-[#F59E0B] to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-16 z-10 bg-gradient-to-l from-[#F59E0B] to-transparent" />

      <div className="animate-marquee">
        {/* Two identical copies for seamless loop */}
        {[0, 1].map((n) => (
          <span
            key={n}
            className="font-heading font-bold text-[11px] tracking-[0.22em] uppercase text-black"
          >
            {text.repeat(6)}
          </span>
        ))}
      </div>
    </div>
  )
}
