"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "@/lib/gsap"
import { SplitText } from "@/components/SplitText"
import { useTextReveal } from "@/hooks/useTextReveal"
import { projects } from "@/data/content"

export default function Projects() {
  const headingRef = useTextReveal<HTMLHeadingElement>({ stagger: 0.05 })
  const listRef = useRef<HTMLDivElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)
  const [activeProject, setActiveProject] = useState<number | null>(null)

  // Cursor-follow image preview
  const xTo = useRef<((value: number) => void) | null>(null)
  const yTo = useRef<((value: number) => void) | null>(null)

  useEffect(() => {
    if (!listRef.current) return

    // Staggered scroll-in for each project row
    const rows = listRef.current.querySelectorAll<HTMLElement>(".project-row")
    const lines = listRef.current.querySelectorAll<HTMLElement>(".hr-reveal")

    const ctx = gsap.context(() => {
      gsap.fromTo(
        rows,
        { y: 50, opacity: 0, filter: "blur(4px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: listRef.current,
            start: "top 80%",
          },
        }
      )

      gsap.fromTo(
        lines,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: "power3.inOut",
          stagger: 0.08,
          scrollTrigger: {
            trigger: listRef.current,
            start: "top 80%",
          },
        }
      )
    }, listRef)

    // Quick-to for smooth cursor follow
    if (previewRef.current) {
      xTo.current = gsap.quickTo(previewRef.current, "x", {
        duration: 0.6,
        ease: "power3.out",
      })
      yTo.current = gsap.quickTo(previewRef.current, "y", {
        duration: 0.6,
        ease: "power3.out",
      })
    }

    const onMouseMove = (e: MouseEvent) => {
      xTo.current?.(e.clientX)
      yTo.current?.(e.clientY)
    }

    window.addEventListener("mousemove", onMouseMove)
    return () => {
      ctx.revert()
      window.removeEventListener("mousemove", onMouseMove)
    }
  }, [])

  const handleProjectEnter = (index: number) => {
    setActiveProject(index)
    if (previewRef.current) {
      gsap.to(previewRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: "power3.out",
      })
    }
  }

  const handleProjectLeave = () => {
    setActiveProject(null)
    if (previewRef.current) {
      gsap.to(previewRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 0.3,
        ease: "power3.in",
      })
    }
  }

  return (
    <section
      id="work"
      className="section"
      style={{
        borderTop: "1px solid var(--border)",
        position: "relative",
      }}
    >
      {/* Section header */}
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          marginBottom: "4rem",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >
        <h2
          ref={headingRef}
          className="heading"
        >
          <SplitText text="Selected Work" />
        </h2>
        <span className="label">2023 — Present</span>
      </div>

      {/* Project list */}
      <div ref={listRef}>
        <div className="hr-reveal" style={{ marginBottom: 0 }} />

        {projects.map((project, i) => (
          <div key={project.id}>
            <div
              className="project-row"
              data-cursor-hover
              onMouseEnter={() => handleProjectEnter(i)}
              onMouseLeave={handleProjectLeave}
              style={{
                display: "grid",
                gridTemplateColumns: "3rem 1fr auto auto",
                alignItems: "center",
                gap: "2rem",
                padding: "2rem 0",
                cursor: "pointer",
              }}
            >
              {/* Number */}
              <span
                className="label"
                style={{ color: "var(--text-secondary)" }}
              >
                {project.id}
              </span>

              {/* Title */}
              <span
                style={{
                  fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                  fontWeight: 700,
                  letterSpacing: "-0.03em",
                  transition: "color 0.3s ease",
                  color:
                    activeProject === i ? "var(--text)" : "var(--text)",
                }}
              >
                {project.title}
              </span>

              {/* Category — hidden on small screens via media query in globals */}
              <span className="label project-category">
                {project.category}
              </span>

              {/* Year */}
              <span className="label">{project.year}</span>
            </div>

            {/* Description — expands on active */}
            {activeProject === i && (
              <div
                style={{
                  padding: "0 0 1.5rem 5rem",
                  color: "var(--text-secondary)",
                  fontSize: "0.9rem",
                  lineHeight: 1.6,
                  maxWidth: "480px",
                }}
              >
                {project.description}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "0.5rem",
                    marginTop: "0.75rem",
                  }}
                >
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontFamily: "var(--font-geist-mono)",
                        fontSize: "0.6rem",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        padding: "0.3rem 0.6rem",
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
            )}

            <div className="hr-reveal" />
          </div>
        ))}
      </div>

      {/* Cursor-follow preview */}
      <div
        ref={previewRef}
        className="project-preview"
        style={{ transform: "translate(-50%, -50%) scale(0.9)" }}
      >
        {projects.map((project, i) => (
          <div
            key={project.id}
            style={{
              position: "absolute",
              inset: 0,
              background: `linear-gradient(135deg, ${project.gradient
                .replace("from-[", "")
                .replace("] to-[", ", ")
                .replace("]", "")})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: activeProject === i ? 1 : 0,
              transition: "opacity 0.3s ease",
            }}
          >
            <span
              style={{
                fontWeight: 700,
                fontSize: "2rem",
                letterSpacing: "-0.04em",
                color: project.accent,
              }}
            >
              {project.title}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
