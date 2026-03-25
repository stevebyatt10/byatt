import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import SmoothScroll from "@/components/SmoothScroll"
import Cursor from "@/components/Cursor"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Stephen Byatt - Senior Software Engineer",
  description:
    "Senior software engineer based in London. Currently at Cleo, previously at Snap Inc.",
  openGraph: {
    title: "Stephen Byatt - Senior Software Engineer",
    description: "Software engineer based in London. Currently at Cleo, previously at Snap Inc.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body>
        <SmoothScroll>
          <Cursor />
          {children}
        </SmoothScroll>
      </body>
    </html>
  )
}
