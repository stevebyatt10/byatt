"use client"

import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register once, guard against SSR
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export { gsap, ScrollTrigger }
