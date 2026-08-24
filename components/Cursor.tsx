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

    const isHoverable = (target: EventTarget | null) =>
      target instanceof Element && target.closest("a, button, [data-cursor-hover]")

    const onPointerOver = (e: PointerEvent) => {
      if (isHoverable(e.target)) ring.classList.add("hovered")
    }

    const onPointerOut = (e: PointerEvent) => {
      if (isHoverable(e.target)) ring.classList.remove("hovered")
    }

    window.addEventListener("mousemove", onMove)
    window.addEventListener("pointerover", onPointerOver)
    window.addEventListener("pointerout", onPointerOut)

    return () => {
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("pointerover", onPointerOver)
      window.removeEventListener("pointerout", onPointerOut)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  )
}
