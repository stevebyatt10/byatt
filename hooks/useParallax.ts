"use client"

import { useEffect, useRef } from "react"
import { gsap, ScrollTrigger } from "@/lib/gsap"

interface ParallaxOptions {
  /** How far (in px) the element moves relative to scroll. Negative = up. */
  speed?: number
  start?: string
  end?: string
}

/**
 * Applies a vertical parallax effect to the element on scroll.
 * Uses transform: translateY only — no layout thrash.
 */
export function useParallax<T extends HTMLElement = HTMLElement>(
  options: ParallaxOptions = {}
) {
  const ref = useRef<T>(null)
  const { speed = -60, start = "top bottom", end = "bottom top" } = options

  useEffect(() => {
    if (!ref.current) return

    const ctx = gsap.context(() => {
      gsap.to(ref.current, {
        y: speed,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start,
          end,
          scrub: true,
        },
      })
    }, ref)

    return () => ctx.revert()
  }, [speed, start, end])

  return ref
}
