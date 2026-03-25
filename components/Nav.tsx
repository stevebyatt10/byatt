"use client"

import { useEffect, useRef } from "react"
import { gsap } from "@/lib/gsap"

const navLinks = [
  { label: "Experience", href: "#experience" },
  { label: "About", href: "#about" },
]

export default function Nav() {
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!navRef.current) return
    gsap.fromTo(
      navRef.current,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 1.4, ease: "power3.out" }
    )
  }, [])

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <nav ref={navRef} className="nav" style={{ opacity: 0 }}>
      {/* Logo */}
      <a
        href="#"
        data-cursor-hover
        onClick={(e) => {
          e.preventDefault()
          window.scrollTo({ top: 0, behavior: "smooth" })
        }}
        style={{ textDecoration: "none", display: "flex", alignItems: "center" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/sb-logo-trimmed.png"
          alt="SB"
          style={{
            height: "28px",
            width: "auto",
          }}
        />
      </a>

      {/* Links */}
      <div className="nav-links" style={{ display: "flex", alignItems: "center", gap: "2.5rem" }}>
        {/* Availability badge */}
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            fontFamily: "var(--font-geist-mono)",
            fontSize: "0.65rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--text-secondary)",
          }}
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "var(--accent)",
              display: "inline-block",
            }}
          />
          Available
        </span>

        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            data-cursor-hover
            onClick={(e) => scrollTo(e, link.href)}
            style={{
              fontFamily: "var(--font-geist-mono)",
              fontSize: "0.65rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--text-secondary)",
              textDecoration: "none",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) =>
              ((e.target as HTMLElement).style.color = "var(--text)")
            }
            onMouseLeave={(e) =>
              ((e.target as HTMLElement).style.color = "var(--text-secondary)")
            }
          >
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  )
}
