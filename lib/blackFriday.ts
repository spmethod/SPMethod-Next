'use client'

import { useEffect, useState } from 'react'

/** Black Friday window (Vienna time). Change these two dates for next year. */
export const BF_START = new Date('2026-11-27T00:00:00+01:00')
export const BF_END   = new Date('2026-12-07T23:59:59+01:00')

/**
 * Black Friday bonus: access to the SPMETHOD training app with every 6/8-week program.
 * Runs with the sale; to extend it, move this date (it may end later than BF_END).
 */
export const APP_BONUS_END = BF_END

/** true while the training-app bonus is offered */
export function appBonusLive(now: Date = new Date()): boolean {
  return now >= BF_START && now <= APP_BONUS_END
}

export type BfPhase = 'pre' | 'live' | 'over'

export function bfPhase(now: Date = new Date()): BfPhase {
  if (now < BF_START) return 'pre'
  if (now <= BF_END)  return 'live'
  return 'over'
}

/** Current time, refreshed every second on the client (avoids hydration mismatches). */
export function useNow(intervalMs = 1000) {
  const [now, setNow] = useState<Date | null>(null)
  useEffect(() => {
    setNow(new Date())
    const id = setInterval(() => setNow(new Date()), intervalMs)
    return () => clearInterval(id)
  }, [intervalMs])
  return now
}
