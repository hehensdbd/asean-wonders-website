"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import Image from "next/image"
import Link from "next/link"
import { Download, ArrowLeft } from "lucide-react"
import { useState } from "react"

const wallpapers = [
  {
    id: 201,
    name: "寺庙艺术壁纸",
    category: "建筑",
    resolution: "4K",
    size: "2.5MB",
    image: "/placeholder.svg?key=wallpaper1&height=600&width=900",
  },
  {
    id: 202,
    name: "传统图案壁纸",
    category: "图案",
    resolution: "2K",
    size: "1.8MB",
    image: "/placeholder.svg?key=wallpaper2&height=600&width=900",
  },
  {
    id: 203,
    name: "泰式风景壁纸",
    category: "风景",
    resolution: "4K",
    size: "3.2MB",
    image: "/placeholder.svg?key=wallpaper3&height=600&width=900",
  },
  {
    id: 204,
    name: "节日庆典壁纸",
    category: "节日",
    resolution: "4K",
    size: "2.8MB",
    image: "/placeholder.svg?key=wallpaper4&height=600&width=900",
  },
  {
    id: 205,
    name: "古典舞蹈壁纸",
    category: "艺术",
    resolution: "2K",
    size: "2.1MB",
    image: "/placeholder.svg?key=wallpaper5&height=600&width=900",
  },
  {
    id: 206,
    name: "美食文化壁纸",
    category: "美食",
    resolution: "4K",
    size: "2.9MB",
    image: "/placeholder.svg?key=wallpaper6&height=600&width=900",
  },
]

const categories = ["全部", "建筑", "图案", "风景", "节日", "艺术", "美食"]
const resolutions = ["全部分辨率", "4K", "2K", "1080P"]

export default function WallpapersPage() {
  const [selectedCategory, setSelectedCategory] = useState("全部")
  const [selectedResolution, setSelectedResolution] = useState("全部分辨率")

  const filteredWallpapers = wallpapers.filter((w) => {
    const categoryMatch = selectedCategory === "全部" || w.category === selectedCategory
    const resolutionMatch = selectedResolution === "全部分辨率" || w.resolution === selectedResolution
    return categoryMatch && resolutionMatch
  })

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        {/* Back Link */}
        <Link
          href="/cultural-products"
          className="flex items-center gap-2 text-secondary hover:text-accent transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          返回
        </Link>

        {/* Hero Section */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">精美壁纸</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            下载精心策划的泰国文化主题壁纸，将东盟万象的艺术美感带入你的屏幕。提供多种分辨率供选择。
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div>
            <h3 className="text-sm font-semibold mb-3">按类别筛选</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full font-semibold transition-colors ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "bg-card border border-border text-foreground hover:border-primary"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-3">按分辨率筛选</h3>
            <div className="flex flex-wrap gap-2">
              {resolutions.map((resolution) => (
                <button
                  key={resolution}
                  onClick={() => setSelectedResolution(resolution)}
                  className={`px-4 py-2 rounded-full font-semibold transition-colors ${
                    selectedResolution === resolution
                      ? "bg-primary text-primary-foreground"
                      : "bg-card border border-border text-foreground hover:border-primary"
                  }`}
                >
                  {resolution}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Wallpapers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWallpapers.map((wallpaper) => (
            <div
              key={wallpaper.id}
              className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow group"
            >
              <div className="relative w-full h-64 bg-muted">
                <Image
                  src={wallpaper.image || "/placeholder.svg"}
                  alt={wallpaper.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold">
                    <Download size={20} />
                    下载
                  </button>
                </div>
              </div>
              <div className="p-4">
                <div className="inline-block px-2 py-1 bg-secondary/20 text-secondary rounded text-xs font-semibold mb-2">
                  {wallpaper.category}
                </div>
                <h3 className="text-lg font-bold mb-2">{wallpaper.name}</h3>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{wallpaper.resolution}</span>
                  <span>{wallpaper.size}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredWallpapers.length === 0 && (
          <div className="flex items-center justify-center h-64 text-muted-foreground">
            <p>没有找到匹配的壁纸</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
