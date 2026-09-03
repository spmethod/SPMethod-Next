import { useScroll, useTransform, MotionValue } from 'framer-motion'

/**
 * Returns a MotionValue<number> that maps global scrollY to a rotation in degrees.
 * Pass the result directly to a motion element's `style={{ rotate }}`.
 */
export function useScrollRotation(
  scrollRange: [number, number] = [0, 3000],
  rotationRange: [number, number] = [0, 360],
): MotionValue<number> {
  const { scrollY } = useScroll()
  return useTransform(scrollY, scrollRange, rotationRange)
}

/**
 * Returns a MotionValue<number> for horizontal drift tied to scrollY.
 * Use for the barbell background element.
 */
export function useScrollDrift(
  scrollRange: [number, number] = [0, 3000],
  driftRange: [number, number] = [-80, 80],
): MotionValue<number> {
  const { scrollY } = useScroll()
  return useTransform(scrollY, scrollRange, driftRange)
}
