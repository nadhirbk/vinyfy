import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { ToastProvider } from "@/components/toast-provider"
import "./globals.css"

export const metadata: Metadata = {
  title: "Vinyfy - Premium Vinyl Records",
  description: "Discover and collect premium vinyl records",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`font-sans antialiased`}>
        {children}
        <ToastProvider />
        <Analytics />
      </body>
    </html>
  )
}
