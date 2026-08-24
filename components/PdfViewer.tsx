"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { getPdfJs } from "@/lib/pdfjs"

type PdfDocument = {
  numPages: number
  getPage: (pageNumber: number) => Promise<PdfPage>
  destroy?: () => Promise<void>
}

type PdfPage = {
  getViewport: (options: { scale: number }) => { width: number; height: number }
  render: (options: {
    canvasContext: CanvasRenderingContext2D
    viewport: { width: number; height: number }
  }) => {
    promise: Promise<void>
    cancel: () => void
  }
}

type PdfViewerProps = {
  src: string
}

const minZoom = 0.7
const maxZoom = 1.7
const zoomStep = 0.15

export default function PdfViewer({ src }: PdfViewerProps) {
  const shellRef = useRef<HTMLDivElement>(null)
  const [pdf, setPdf] = useState<PdfDocument | null>(null)
  const [pageCount, setPageCount] = useState(0)
  const [basePageWidth, setBasePageWidth] = useState(0)
  const [containerWidth, setContainerWidth] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [error, setError] = useState("")

  useEffect(() => {
    let cancelled = false
    let loadedPdf: PdfDocument | null = null
    let loadingTask: { destroy: () => Promise<void> } | null = null

    async function loadPdf() {
      try {
        const pdfjs = await getPdfJs()
        const task = pdfjs.getDocument({ url: src })
        loadingTask = task
        loadedPdf = (await task.promise) as unknown as PdfDocument
        if (cancelled) {
          await loadedPdf.destroy?.()
          return
        }

        const firstPage = await loadedPdf.getPage(1)
        const firstViewport = firstPage.getViewport({ scale: 1 })

        setPdf(loadedPdf)
        setPageCount(loadedPdf.numPages)
        setBasePageWidth(firstViewport.width)
      } catch (reason) {
        console.error("PDF failed to load", reason)
        if (!cancelled) {
          setError("Unable to load the PDF.")
        }
      }
    }

    loadPdf()

    return () => {
      cancelled = true
      if (loadedPdf?.destroy) {
        void loadedPdf.destroy()
      } else if (loadingTask) {
        void loadingTask.destroy()
      }
    }
  }, [src])

  useEffect(() => {
    if (!shellRef.current) return

    const observer = new ResizeObserver(([entry]) => {
      setContainerWidth(entry.contentRect.width)
    })

    observer.observe(shellRef.current)

    return () => observer.disconnect()
  }, [])

  const pageScale = useMemo(() => {
    if (!basePageWidth || !containerWidth) return 1

    const horizontalPadding = containerWidth < 820 ? 32 : 64
    const fitWidth = Math.max(280, containerWidth - horizontalPadding)

    return (fitWidth / basePageWidth) * zoom
  }, [basePageWidth, containerWidth, zoom])

  const pages = useMemo(
    () => Array.from({ length: pageCount }, (_, index) => index + 1),
    [pageCount]
  )

  return (
    <div className="pdf-viewer" ref={shellRef}>
      <div className="pdf-toolbar" aria-label="PDF controls">
        <div className="pdf-status">
          <span>{pageCount ? `${pageCount} pages` : "Loading"}</span>
          <span>{Math.round(zoom * 100)}%</span>
        </div>

        <div className="pdf-zoom-controls">
          <button
            type="button"
            data-cursor-hover
            aria-label="Zoom out"
            onClick={() => setZoom((value) => Math.max(minZoom, value - zoomStep))}
          >
            -
          </button>
          <button
            type="button"
            data-cursor-hover
            aria-label="Reset zoom"
            onClick={() => setZoom(1)}
          >
            Fit
          </button>
          <button
            type="button"
            data-cursor-hover
            aria-label="Zoom in"
            onClick={() => setZoom((value) => Math.min(maxZoom, value + zoomStep))}
          >
            +
          </button>
        </div>
      </div>

      <div className="pdf-scroll">
        {error ? (
          <div className="pdf-message">{error}</div>
        ) : pdf ? (
          pages.map((pageNumber) => (
            <PdfCanvas
              key={pageNumber}
              pdf={pdf}
              pageNumber={pageNumber}
              scale={pageScale}
            />
          ))
        ) : (
          <div className="pdf-message">Loading PDF...</div>
        )}
      </div>
    </div>
  )
}

function PdfCanvas({
  pdf,
  pageNumber,
  scale,
}: {
  pdf: PdfDocument
  pageNumber: number
  scale: number
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    let cancelled = false
    let renderTask: ReturnType<PdfPage["render"]> | null = null

    async function renderPage() {
      const canvas = canvasRef.current
      if (!canvas) return

      const page = await pdf.getPage(pageNumber)
      if (cancelled) return

      const viewport = page.getViewport({ scale })
      const context = canvas.getContext("2d")
      if (!context) return

      const pixelRatio = window.devicePixelRatio || 1
      canvas.width = Math.floor(viewport.width * pixelRatio)
      canvas.height = Math.floor(viewport.height * pixelRatio)
      canvas.style.width = `${viewport.width}px`
      canvas.style.height = `${viewport.height}px`

      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
      renderTask = page.render({ canvasContext: context, viewport })

      await renderTask.promise.catch((reason: unknown) => {
        if (!cancelled && !(reason instanceof DOMException)) {
          throw reason
        }
      })
    }

    renderPage()

    return () => {
      cancelled = true
      renderTask?.cancel()
    }
  }, [pageNumber, pdf, scale])

  return (
    <figure className="pdf-page" aria-label={`Page ${pageNumber}`}>
      <canvas ref={canvasRef} />
    </figure>
  )
}
