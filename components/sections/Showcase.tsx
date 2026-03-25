"use client"

import { useEffect, useRef } from "react"
import { gsap, ScrollTrigger } from "@/lib/gsap"
import { SplitText } from "@/components/SplitText"
import { useTextReveal } from "@/hooks/useTextReveal"
import { experience } from "@/data/content"

export default function Showcase() {
  const headingRef = useTextReveal<HTMLHeadingElement>({ stagger: 0.05 })
  const sectionRef = useRef<HTMLElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const itemsContainerRef = useRef<HTMLDivElement>(null)
  const companiesContainerRef = useRef<HTMLDivElement>(null)
  const fillRef = useRef<HTMLDivElement>(null)
  const counterCurrentRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !innerRef.current || !itemsContainerRef.current) return

    const items = Array.from(
      itemsContainerRef.current.querySelectorAll<HTMLElement>(".exp-item")
    )
    const companyNames = companiesContainerRef.current
      ? Array.from(companiesContainerRef.current.querySelectorAll<HTMLElement>(".company-name"))
      : []
    const dots = Array.from(
      innerRef.current.querySelectorAll<HTMLElement>(".progress-dot")
    )
    const navItems = Array.from(
      innerRef.current.querySelectorAll<HTMLElement>(".exp-nav-item")
    )

    const n = experience.length
    const pinDistance = window.innerHeight * (n - 1)
    const ACCENT_DIM = "rgba(193, 255, 114, 0.3)"
    const isMobile = window.innerWidth < 768

    // ── Mobile: stack items vertically, no pin ───────────────────────────
    if (isMobile) {
      // Undo the CSS grid stacking — make items flow naturally
      const container = itemsContainerRef.current!
      container.style.display = "flex"
      container.style.flexDirection = "column"
      container.style.gap = "2.5rem"

      items.forEach((item) => {
        item.style.gridArea = "unset"
        item.style.opacity = "0"
        item.style.position = "relative"

        gsap.fromTo(
          item,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
            scrollTrigger: { trigger: item, start: "top 88%" } }
        )
      })

      return () => {
        ScrollTrigger.getAll().forEach((t) => t.kill())
      }
    }

    const updateDots = (activeIndex: number) => {
      dots.forEach((dot, i) => {
        if (i < activeIndex) {
          gsap.to(dot, { background: ACCENT_DIM, duration: 0.25, overwrite: true })
        } else if (i === activeIndex) {
          gsap.to(dot, { background: "var(--accent)", duration: 0.3, overwrite: true })
        } else {
          gsap.to(dot, { background: "var(--border)", duration: 0.2, overwrite: true })
        }
      })
    }

    const updateNav = (activeIndex: number) => {
      navItems.forEach((item, i) => {
        gsap.to(item, {
          color: i === activeIndex ? "var(--text)" : "var(--text-secondary)",
          duration: 0.3,
          overwrite: true,
        })
        const line = item.querySelector<HTMLElement>(".nav-item-line")
        if (line) {
          gsap.to(line, {
            scaleX: i === activeIndex ? 1 : 0,
            duration: 0.4,
            ease: "power3.out",
            overwrite: true,
          })
        }
      })
    }

    const swapTo = (toIndex: number, fromIndex: number) => {
      const forward = toIndex > fromIndex

      // Swap experience details
      gsap.to(items[fromIndex], {
        opacity: 0, y: forward ? -50 : 50, duration: 0.4, ease: "power2.in", overwrite: true,
      })
      gsap.fromTo(
        items[toIndex],
        { opacity: 0, y: forward ? 60 : -60, immediateRender: false },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out", delay: 0.28, overwrite: true }
      )

      // Swap large company name
      if (companyNames[fromIndex]) {
        gsap.to(companyNames[fromIndex], {
          opacity: 0, y: forward ? -30 : 30, duration: 0.4, ease: "power2.in", overwrite: true,
        })
      }
      if (companyNames[toIndex]) {
        gsap.fromTo(
          companyNames[toIndex],
          { opacity: 0, y: forward ? 40 : -40, immediateRender: false },
          { opacity: 1, y: 0, duration: 0.55, ease: "power3.out", delay: 0.28, overwrite: true }
        )
      }

      // Counter
      if (counterCurrentRef.current) {
        gsap.to(counterCurrentRef.current, {
          opacity: 0, y: -8, duration: 0.2, ease: "power2.in", overwrite: true,
          onComplete: () => {
            if (counterCurrentRef.current) {
              counterCurrentRef.current.textContent = String(toIndex + 1).padStart(2, "0")
              gsap.fromTo(
                counterCurrentRef.current,
                { opacity: 0, y: 8 },
                { opacity: 1, y: 0, duration: 0.25, ease: "power2.out" }
              )
            }
          }
        })
      }

      updateDots(toIndex)
      updateNav(toIndex)
    }

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${pinDistance}`,
        pin: innerRef.current,
        pinSpacing: true,
        anticipatePin: 1,
      })

      if (fillRef.current) {
        gsap.fromTo(
          fillRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: `+=${pinDistance}`,
              scrub: true,
            },
          }
        )
      }

      for (let i = 1; i < n; i++) {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: `top+=${window.innerHeight * i - 2} top`,
          onEnter: () => swapTo(i, i - 1),
          onLeaveBack: () => swapTo(i - 1, i),
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="experience"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div
        ref={innerRef}
        style={{
          minHeight: "100svh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "6rem 2.5rem",
          gap: "3rem",
        }}
      >
        {/* Header row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <h2 ref={headingRef} className="heading">
            <SplitText text="Experience" />
          </h2>

          {/* Step counter */}
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: "0.25rem",
              fontFamily: "var(--font-geist-mono)",
              fontSize: "0.75rem",
              letterSpacing: "0.1em",
              color: "var(--text-secondary)",
            }}
          >
            <span ref={counterCurrentRef} style={{ color: "var(--text)", display: "inline-block" }}>
              01
            </span>
            <span style={{ opacity: 0.4 }}>/</span>
            <span>{String(experience.length).padStart(2, "0")}</span>
          </div>
        </div>

        {/* Body: timeline + details | company spotlight */}
        <div
          className="showcase-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "40px 1fr 1fr",
            gap: "3rem",
            alignItems: "start",
          }}
        >
          {/* Progress track */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              paddingTop: "0.5rem",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "8px",
                bottom: "8px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "1px",
                background: "var(--border)",
              }}
            />
            <div
              ref={fillRef}
              style={{
                position: "absolute",
                top: "8px",
                bottom: "8px",
                left: "50%",
                transform: "translateX(-50%) scaleY(0)",
                transformOrigin: "top center",
                width: "1px",
                background: "var(--accent)",
              }}
            />
            {experience.map((_, i) => (
              <div
                key={i}
                className="progress-dot"
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: i === 0 ? "var(--accent)" : "var(--border)",
                  zIndex: 1,
                  flexShrink: 0,
                  marginBottom: i < experience.length - 1 ? "2.5rem" : 0,
                }}
              />
            ))}
          </div>

          {/* Experience details */}
          <div
            ref={itemsContainerRef}
            style={{ display: "grid", gridTemplate: "1fr / 1fr" }}
          >
            {experience.map((exp, i) => (
              <div
                key={i}
                className="exp-item"
                style={{
                  gridArea: "1 / 1",
                  opacity: i === 0 ? 1 : 0,
                  willChange: "transform, opacity",
                }}
              >
                <div style={{ marginBottom: "1.5rem" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: "0.75rem",
                      marginBottom: "0.5rem",
                      flexWrap: "wrap",
                    }}
                  >
                    <h3
                      style={{
                        fontSize: "clamp(1.4rem, 2vw, 1.9rem)",
                        fontWeight: 700,
                        letterSpacing: "-0.03em",
                        lineHeight: 1,
                      }}
                    >
                      {exp.role}
                    </h3>
                    {exp.link ? (
                      <a
                        href={exp.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor-hover
                        style={{
                          color: "var(--accent)",
                          fontSize: "clamp(1rem, 1.5vw, 1.3rem)",
                          letterSpacing: "-0.02em",
                          textDecoration: "none",
                          borderBottom: "1px solid transparent",
                          transition: "border-color 0.2s ease",
                        }}
                        onMouseEnter={(e) =>
                          ((e.currentTarget as HTMLElement).style.borderColor = "var(--accent)")
                        }
                        onMouseLeave={(e) =>
                          ((e.currentTarget as HTMLElement).style.borderColor = "transparent")
                        }
                      >
                        @ {exp.company} ↗
                      </a>
                    ) : (
                      <span
                        style={{
                          color: "var(--accent)",
                          fontSize: "clamp(1rem, 1.5vw, 1.3rem)",
                          letterSpacing: "-0.02em",
                        }}
                      >
                        @ {exp.company}
                      </span>
                    )}
                  </div>
                  <div style={{ display: "flex", gap: "1.5rem" }}>
                    <span className="label">{exp.period}</span>
                    <span className="label">{exp.location}</span>
                  </div>
                </div>

                <p
                  style={{
                    fontSize: "clamp(0.875rem, 1.1vw, 1rem)",
                    lineHeight: 1.75,
                    color: "var(--text-secondary)",
                    marginBottom: "1.25rem",
                    maxWidth: "440px",
                  }}
                >
                  {exp.description}
                </p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontFamily: "var(--font-geist-mono)",
                        fontSize: "0.6rem",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        padding: "0.3rem 0.75rem",
                        border: "1px solid var(--border)",
                        borderRadius: "2px",
                        color: "var(--text-secondary)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Right column: large company name + nav list */}
          <div
            className="showcase-right-col"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
              gap: "3rem",
            }}
          >
            {/* Large stacked company name */}
            <div
              ref={companiesContainerRef}
              style={{
                display: "grid",
                gridTemplate: "1fr / 1fr",
                overflow: "hidden",
              }}
            >
              {experience.map((exp, i) => (
                <div
                  key={i}
                  className="company-name"
                  style={{
                    gridArea: "1 / 1",
                    opacity: i === 0 ? 1 : 0,
                    willChange: "transform, opacity",
                  }}
                >
                  <span
                    style={{
                      display: "block",
                      fontSize: "clamp(3.5rem, 6vw, 7rem)",
                      fontWeight: 800,
                      letterSpacing: "-0.04em",
                      lineHeight: 0.9,
                      color: "var(--text)",
                      opacity: 0.06,
                      userSelect: "none",
                      pointerEvents: "none",
                    }}
                  >
                    {exp.company}
                  </span>
                </div>
              ))}
            </div>

            {/* Company nav list */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {experience.map((exp, i) => (
                <div
                  key={i}
                  className="exp-nav-item"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    padding: "0.75rem 0",
                    borderBottom: "1px solid var(--border)",
                    color: i === 0 ? "var(--text)" : "var(--text-secondary)",
                    fontSize: "clamp(0.9rem, 1.2vw, 1.1rem)",
                    fontWeight: 500,
                    letterSpacing: "-0.02em",
                    transition: "color 0.3s ease",
                    cursor: "default",
                  }}
                >
                  {/* Active indicator line */}
                  <span
                    className="nav-item-line"
                    style={{
                      display: "inline-block",
                      width: "24px",
                      height: "1px",
                      background: "var(--accent)",
                      transform: `scaleX(${i === 0 ? 1 : 0})`,
                      transformOrigin: "left center",
                      flexShrink: 0,
                    }}
                  />
                  <span>{exp.company}</span>
                  <span
                    className="label"
                    style={{ marginLeft: "auto", fontSize: "0.6rem", opacity: 0.6 }}
                  >
                    {exp.period.split(" ")[0]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
