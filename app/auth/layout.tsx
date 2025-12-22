import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Navigation } from "@/components/navigation"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "东盟万象 - 登录/注册",
  description: "登录或注册东盟万象账户，探索东盟文化之美",
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={inter.className}>
      <Navigation />
      <main className="min-h-screen">
        {children}
      </main>
    </div>
  )
}