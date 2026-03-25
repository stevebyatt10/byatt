"use client"

import { useEffect, useRef } from "react"
import { gsap } from "@/lib/gsap"

interface ScrollFadeOptions {
  y?: number
  opacity?: number
  duration?: number
  delay?: number
  ease?: string
  start?: string
  stagger?: number
  selector?: string
}

/**
 * Fades (and optionally translates) an element or its children in on scroll.
 * Pass `selector` to target child elements instead of the ref element itself.
 */
export function useScrollFade<T extends HTMLElement = HTMLElement>(
  options: ScrollFadeOptions = {}
) {
  const ref = useRef<T>(null)
  const {
    y = 40,
    opacity = 0,
    duration = 0.9,
    delay = 0,
    ease = "power3.out",
    start = "top 88%",
    stagger,
    selector,
  } = options

  useEffect(() => {
    if (!ref.current) return

    const targets = selector
      ? ref.current.querySelectorAll<HTMLElement>(selector)
      : [ref.current]

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { y, opacity },
        {
          y: 0,
          opacity: 1,
          duration,
          delay,
          ease,
          stagger,
          scrollTrigger: {
            trigger: ref.current,
            start,
          },
        }
      )
    }, ref)

    return () => ctx.revert()
  }, [y, opacity, duration, delay, ease, start, stagger, selector])

  return ref
}
