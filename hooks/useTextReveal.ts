"use client"

import { useEffect, useRef } from "react"
import { gsap, ScrollTrigger } from "@/lib/gsap"

interface TextRevealOptions {
  /** If true, animate immediately instead of on scroll */
  immediate?: boolean
  delay?: number
  stagger?: number
  duration?: number
  start?: string
}

export function useTextReveal<T extends HTMLElement = HTMLElement>(
  options: TextRevealOptions = {}
) {
  const ref = useRef<T>(null)
  const {
    immediate = false,
    delay = 0,
    stagger = 0.06,
    duration = 1,
    start = "top 88%",
  } = options

  useEffect(() => {
    if (!ref.current) return

    const words = ref.current.querySelectorAll<HTMLElement>(".word-inner")
    if (!words.length) return

    const ctx = gsap.context(() => {
      const from = { y: "115%", opacity: 0 }
      const to = {
        y: "0%",
        opacity: 1,
        duration,
        ease: "power4.out",
        stagger,
        delay,
        ...(immediate
          ? {}
          : {
              scrollTrigger: {
                trigger: ref.current,
                start,
              },
            }),
      }

      gsap.fromTo(words, from, to)
    }, ref)

    return () => ctx.revert()
  }, [immediate, delay, stagger, duration, start])

  return ref
}
