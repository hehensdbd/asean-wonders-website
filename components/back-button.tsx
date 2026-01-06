"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"

export function BackButton() {
  const router = useRouter()

  const goBack = () => {
    router.back()
  }

  return (
    <button
      onClick={goBack}
      className="fixed bottom-36 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-secondary-foreground shadow-lg transition-all hover:bg-secondary/90 hover:scale-110"
      aria-label="返回上一页"
    >
      <ArrowLeft className="h-6 w-6" />
    </button>
  )
}

export default BackButton
