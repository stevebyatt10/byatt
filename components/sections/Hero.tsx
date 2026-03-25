"use client"

import { useEffect, useRef } from "react"
import { gsap } from "@/lib/gsap"
import { SplitText } from "@/components/SplitText"
import { useParallax } from "@/hooks/useParallax"
import { hero } from "@/data/content"

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const metaRef = useRef<HTMLDivElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)
  const bgRef = useParallax<HTMLDivElement>({ speed: 80, start: "top top", end: "bottom top" })

  useEffect(() => {
    if (!containerRef.current) return

    const words = containerRef.current.querySelectorAll<HTMLElement>(".word-inner")
    const meta = metaRef.current
    const scrollIndicator = scrollIndicatorRef.current

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 })

      // Staggered word reveal
      tl.fromTo(
        words,
        { y: "115%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 1.1, ease: "power4.out", stagger: 0.08 }
      )

      // Meta info fades in
      if (meta) {
        tl.fromTo(
          meta,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
          "-=0.5"
        )
      }

      // Scroll indicator
      if (scrollIndicator) {
        tl.fromTo(
          scrollIndicator,
          { opacity: 0 },
          { opacity: 1, duration: 0.6, ease: "power2.out" },
          "-=0.3"
        )

        // Bounce the scroll indicator line
        gsap.to(scrollIndicator.querySelector(".scroll-line"), {
          scaleY: 0.4,
          yoyo: true,
          repeat: -1,
          duration: 1.2,
          ease: "power1.inOut",
          transformOrigin: "top center",
        })
      }
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      style={{
        position: "relative",
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "0 clamp(1.25rem, 5vw, 2.5rem) clamp(2.5rem, 5vw, 4rem)",
        overflow: "hidden",
      }}
    >
      {/* Parallax background grid */}
      <div
        ref={bgRef}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          backgroundImage:
            "radial-gradient(circle at 20% 50%, rgba(193,255,114,0.04) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(100,100,255,0.04) 0%, transparent 50%)",
          pointerEvents: "none",
        }}
      />

      {/* Subtle grid lines */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          backgroundImage:
            "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          opacity: 0.4,
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <div ref={containerRef} style={{ position: "relative", zIndex: 1 }}>
        {/* Display name */}
        <h1 className="display" style={{ marginBottom: "1.5rem" }}>
          {hero.name.map((line, i) => (
            <span key={i} style={{ display: "block" }}>
              <SplitText text={line} />
            </span>
          ))}
        </h1>

        {/* Meta row */}
        <div
          ref={metaRef}
          className="hero-meta"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
            opacity: 0,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
            <span
              className="label"
              style={{ color: "var(--accent)", letterSpacing: "0.12em" }}
            >
              {hero.role}
            </span>
            <span className="label">— {hero.location}</span>
          </div>
          <p
            style={{
              fontSize: "clamp(0.85rem, 1.2vw, 1rem)",
              color: "var(--text-secondary)",
              maxWidth: "340px",
              lineHeight: 1.6,
            }}
          >
            {hero.tagline}
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="hero-scroll-indicator"
        style={{
          position: "absolute",
          bottom: "2.5rem",
          right: "2.5rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.75rem",
          opacity: 0,
        }}
      >
        <span
          className="label"
          style={{ writingMode: "vertical-rl", letterSpacing: "0.2em" }}
        >
          Scroll
        </span>
        <div
          className="scroll-line"
          style={{
            width: "1px",
            height: "60px",
            background:
              "linear-gradient(to bottom, var(--text-secondary), transparent)",
            transformOrigin: "top center",
          }}
        />
      </div>
    </section>
  )
}
