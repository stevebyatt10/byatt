"use client"

import { useRef } from "react"
import { SplitText } from "@/components/SplitText"
import { useTextReveal } from "@/hooks/useTextReveal"
import { useScrollFade } from "@/hooks/useScrollFade"
import { about } from "@/data/content"

export default function About() {
  const headingRef = useTextReveal<HTMLHeadingElement>({ stagger: 0.05 })
  const bioRef = useScrollFade<HTMLParagraphElement>({ y: 30, delay: 0.1 })
  const skillsRef = useScrollFade<HTMLDivElement>({ y: 30, stagger: 0.04, selector: ".skill-tag", delay: 0.2 })
  const contactRef = useScrollFade<HTMLDivElement>({ y: 30, delay: 0.15 })
  const footerRef = useScrollFade<HTMLElement>({ y: 20 })

  return (
    <>
      <section
        id="about"
        className="section"
        style={{
          borderTop: "1px solid var(--border)",
        }}
      >
        {/* Heading */}
        <h2
          ref={headingRef}
          className="heading"
          style={{ marginBottom: "clamp(3rem, 6vw, 5rem)", opacity: 0 }}
        >
          <SplitText text="About" />
        </h2>

        {/* Two-column layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
            gap: "4rem",
            alignItems: "start",
          }}
        >
          {/* Left: Bio */}
          <div>
            <p
              ref={bioRef}
              style={{
                fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
                lineHeight: 1.65,
                color: "var(--text-secondary)",
                fontWeight: 300,
                opacity: 0,
              }}
            >
              {about.bio}
            </p>

            <p
              style={{
                marginTop: "1.5rem",
                fontSize: "0.85rem",
                color: "var(--text-secondary)",
                lineHeight: 1.5,
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "var(--accent)",
                  display: "inline-block",
                  flexShrink: 0,
                }}
              />
              {about.availability}
            </p>
          </div>

          {/* Right: Skills + Contact */}
          <div>
            {/* Skills */}
            <span className="label" style={{ marginBottom: "1.25rem", display: "block" }}>
              Technologies
            </span>
            <div
              ref={skillsRef}
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.5rem",
                marginBottom: "3rem",
              }}
            >
              {about.skills.map((skill) => (
                <span
                  key={skill}
                  className="skill-tag"
                  style={{
                    fontFamily: "var(--font-geist-mono)",
                    fontSize: "0.65rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    padding: "0.5rem 1rem",
                    border: "1px solid var(--border)",
                    borderRadius: "2px",
                    color: "var(--text)",
                    opacity: 0,
                    transition: "border-color 0.2s ease, color 0.2s ease",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget
                    el.style.borderColor = "var(--accent)"
                    el.style.color = "var(--accent)"
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget
                    el.style.borderColor = "var(--border)"
                    el.style.color = "var(--text)"
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Contact */}
            <div ref={contactRef} style={{ opacity: 0 }}>
              <span className="label" style={{ marginBottom: "1.25rem", display: "block" }}>
                Get in touch
              </span>
              <a
                href={`mailto:${about.email}`}
                data-cursor-hover
                style={{
                  fontSize: "clamp(1.1rem, 2vw, 1.6rem)",
                  fontWeight: 600,
                  letterSpacing: "-0.03em",
                  color: "var(--text)",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  borderBottom: "1px solid var(--border)",
                  paddingBottom: "0.25rem",
                  transition: "color 0.2s ease, border-color 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget
                  el.style.color = "var(--accent)"
                  el.style.borderColor = "var(--accent)"
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget
                  el.style.color = "var(--text)"
                  el.style.borderColor = "var(--border)"
                }}
              >
                {about.email}
                <span style={{ fontSize: "0.75em", opacity: 0.6 }}>↗</span>
              </a>

              {/* Social links */}
              <div style={{ display: "flex", gap: "1.5rem", marginTop: "1.5rem" }}>
                {Object.entries(about.links).map(([platform, url]) => (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor-hover
                    className="label"
                    style={{
                      color: "var(--text-secondary)",
                      textDecoration: "none",
                      transition: "color 0.2s ease",
                      textTransform: "capitalize",
                      letterSpacing: "0.08em",
                    }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLElement).style.color = "var(--text)")
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLElement).style.color = "var(--text-secondary)")
                    }
                  >
                    {platform} ↗
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        ref={footerRef}
        style={{
          borderTop: "1px solid var(--border)",
          padding: "2rem 2.5rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
          opacity: 0,
        }}
      >
        <span
          className="label"
          style={{ color: "var(--text-secondary)" }}
        >
          © {new Date().getFullYear()} Stephen Byatt
        </span>
        <span
          className="label"
          style={{ color: "var(--text-secondary)" }}
        >
          Designed & built by hand
        </span>
      </footer>
    </>
  )
}
