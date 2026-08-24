import type { Metadata } from "next"
import Link from "next/link"
import PdfViewer from "@/components/PdfViewer"

const resumePath = "/stephen-byatt-resume-2026.pdf"

export const metadata: Metadata = {
  title: "CV - Stephen Byatt",
  description: "Stephen Byatt resume and CV.",
}

export default function CVPage() {
  return (
    <main className="cv-page">
      <header className="cv-header">
        <Link
          href="/"
          data-cursor-hover
          aria-label="Back to Stephen Byatt homepage"
          className="cv-logo-link"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/sb-logo-trimmed.png" alt="SB" className="cv-logo" />
        </Link>

        <nav className="cv-actions" aria-label="CV actions">
          <Link href="/" data-cursor-hover className="cv-action-link">
            Back
          </Link>
          <a
            href={resumePath}
            download
            data-cursor-hover
            className="cv-action-link cv-action-primary"
          >
            Download
          </a>
        </nav>
      </header>

      <section className="cv-shell" aria-label="Stephen Byatt resume">
        <PdfViewer src={resumePath} />
      </section>
    </main>
  )
}
