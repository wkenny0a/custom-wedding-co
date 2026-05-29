'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

type BrideLandStickyCtaProps = {
  href: string
  label: string
}

export function BrideLandStickyCta({ href, label }: BrideLandStickyCtaProps) {
  const [isHidden, setIsHidden] = useState(false)

  useEffect(() => {
    const target = document.querySelector(href)
    if (!target) return

    const updateVisibility = () => {
      const targetTop = target.getBoundingClientRect().top + window.scrollY
      setIsHidden(window.scrollY + window.innerHeight * 0.78 >= targetTop)
    }

    updateVisibility()
    window.addEventListener('scroll', updateVisibility, { passive: true })
    window.addEventListener('resize', updateVisibility)

    return () => {
      window.removeEventListener('scroll', updateVisibility)
      window.removeEventListener('resize', updateVisibility)
    }
  }, [href])

  return (
    <Link
      href={href}
      className={`fixed bottom-4 left-16 right-24 z-40 flex min-h-14 items-center justify-center gap-2 bg-espresso px-4 text-center font-sans text-[11px] font-bold uppercase tracking-[0.13em] text-cream shadow-2xl shadow-espresso/25 transition-all duration-300 hover:bg-espresso-light md:hidden ${
        isHidden ? 'pointer-events-none translate-y-20 opacity-0' : 'translate-y-0 opacity-100'
      }`}
    >
      {label}
      <ArrowRight className="h-4 w-4" />
    </Link>
  )
}
