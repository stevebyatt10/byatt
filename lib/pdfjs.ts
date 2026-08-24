import type * as PdfJs from "pdfjs-dist"

let pdfJsPromise: Promise<typeof PdfJs> | null = null

export function getPdfJs() {
  pdfJsPromise ??= import("pdfjs-dist").then((pdfjs) => {
    pdfjs.GlobalWorkerOptions.workerSrc = new URL(
      "pdfjs-dist/build/pdf.worker.min.mjs",
      import.meta.url
    ).toString()

    return pdfjs
  })

  return pdfJsPromise
}
