import { SVGProps } from 'react'

export default function DumbbellIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 200 64"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      {/* Left outer plate */}
      <rect x="0" y="8" width="32" height="48" rx="8" />
      {/* Left inner collar */}
      <rect x="34" y="20" width="14" height="24" rx="4" />
      {/* Bar */}
      <rect x="48" y="28" width="104" height="8" rx="3" />
      {/* Right inner collar */}
      <rect x="152" y="20" width="14" height="24" rx="4" />
      {/* Right outer plate */}
      <rect x="168" y="8" width="32" height="48" rx="8" />
    </svg>
  )
}
