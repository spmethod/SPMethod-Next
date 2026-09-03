import { SVGProps } from 'react'

export default function BarbellIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 480 64"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      {/* Left large plate */}
      <rect x="0"   y="4"  width="24" height="56" rx="6" />
      {/* Left medium plate */}
      <rect x="26"  y="10" width="16" height="44" rx="5" />
      {/* Left collar */}
      <rect x="44"  y="22" width="10" height="20" rx="3" />
      {/* Bar */}
      <rect x="54"  y="28" width="372" height="8"  rx="3" />
      {/* Right collar */}
      <rect x="426" y="22" width="10" height="20" rx="3" />
      {/* Right medium plate */}
      <rect x="438" y="10" width="16" height="44" rx="5" />
      {/* Right large plate */}
      <rect x="456" y="4"  width="24" height="56" rx="6" />
    </svg>
  )
}
