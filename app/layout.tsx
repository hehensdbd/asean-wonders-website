import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SkipToContentLink } from "@/components/skip-to-content"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "东盟万象 - 探索东盟文化与泰国风情",
  description:
    "东盟万象：探索东盟丰富多彩的文化、神话、节日、艺术、美食与建筑。完整的文化体验平台，包含文创产品购物、旅游规划、社区交流等功能。",
  generator: "v0.app",
  keywords: "东盟, 泰国, 文化, 旅游, 艺术, 美食, 购物",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#002760" />
        <meta name="color-scheme" content="light dark" />
      </head>
      <body className={`font-sans antialiased`}>
        <SkipToContentLink />
        <div id="main-content">{children}</div>
        <Analytics />
      </body>
    </html>
  )
}
