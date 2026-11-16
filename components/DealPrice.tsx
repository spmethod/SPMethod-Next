'use client'

import { motion, useReducedMotion } from 'framer-motion'

/**
 * Black Friday price reveal: the old price gets crossed out with a line that
 * draws across it, then the new price pops in. Plays once when scrolled into view.
 */
export default function DealPrice({
  oldPrice, newPrice, oldClass, newClass, delay = 0,
}: {
  oldPrice: string; newPrice: string; oldClass: string; newClass: string; delay?: number
}) {
  const reduced = useReducedMotion()
  const view = { once: true, margin: '-60px' }

  return (
    <>
      <span className={`relative inline-block font-normal text-white/30 ${oldClass}`}>
        {oldPrice}
        <motion.span
          aria-hidden="true"
          className="absolute left-[-2px] right-[-2px] top-1/2 h-[2px] -translate-y-1/2 origin-left rounded-full bg-[#F59E0B]"
          initial={reduced ? false : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={view}
          transition={{ duration: 0.35, delay: delay + 0.15, ease: 'easeOut' }}
        />
      </span>
      <motion.span
        className={`inline-block ${newClass}`}
        initial={reduced ? false : { opacity: 0, scale: 0.4, y: 6 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={view}
        transition={{ type: 'spring', stiffness: 420, damping: 14, delay: delay + 0.45 }}
      >
        {newPrice}
      </motion.span>
    </>
  )
}
