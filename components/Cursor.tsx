"use client"

import { useEffect, useRef } from "react"
import { gsap } from "@/lib/gsap"

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!dotRef.current || !ringRef.current) return

    const dot = dotRef.current
    const ring = ringRef.current

    const xDot = gsap.quickTo(dot, "x", { duration: 0.15, ease: "power3.out" })
    const yDot = gsap.quickTo(dot, "y", { duration: 0.15, ease: "power3.out" })
    const xRing = gsap.quickTo(ring, "x", { duration: 0.5, ease: "power3.out" })
    const yRing = gsap.quickTo(ring, "y", { duration: 0.5, ease: "power3.out" })

    const onMove = (e: MouseEvent) => {
      xDot(e.clientX)
      yDot(e.clientY)
      xRing(e.clientX)
      yRing(e.clientY)
    }

    const onEnter = () => ring.classList.add("hovered")
    const onLeave = () => ring.classList.remove("hovered")

    window.addEventListener("mousemove", onMove)

    // Attach hover state to all interactive elements
    const hoverables = document.querySelectorAll(
      "a, button, [data-cursor-hover]"
    )
    hoverables.forEach((el) => {
      el.addEventListener("mouseenter", onEnter)
      el.addEventListener("mouseleave", onLeave)
    })

    // Use MutationObserver to catch dynamically added elements
    const observer = new MutationObserver(() => {
      document.querySelectorAll("a, button, [data-cursor-hover]").forEach((el) => {
        el.addEventListener("mouseenter", onEnter)
        el.addEventListener("mouseleave", onLeave)
      })
    })
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener("mousemove", onMove)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  )
}
