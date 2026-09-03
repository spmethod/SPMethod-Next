import { SVGProps } from 'react'

export default function KettlebellIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 120 150"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      {/* Handle arc */}
      <path
        d="M38 70 Q38 18 60 14 Q82 18 82 70"
        stroke="currentColor"
        strokeWidth="14"
        fill="none"
        strokeLinecap="round"
      />
      {/* Neck / base of handle */}
      <rect x="44" y="62" width="32" height="18" rx="6" />
      {/* Body */}
      <circle cx="60" cy="108" r="42" />
    </svg>
  )
}
