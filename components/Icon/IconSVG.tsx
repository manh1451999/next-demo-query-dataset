import React, { HTMLAttributes, SVGAttributes } from 'react'

interface IIconSVGProps extends SVGAttributes<SVGElement> {
  children: React.ReactNode
}

export default function IconSVG({ children, ...rest }: IIconSVGProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="h-6 w-6"
      {...rest}
    >
      {children}
    </svg>
  )
}
