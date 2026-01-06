"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, Heart, ArrowLeft, Star } from "lucide-react"
import { useState } from "react"
import ScrollToTop from "@/components/scroll-to-top"
import BackButton from "@/components/back-button"

const products = [
  {
    id: 101,
    name: "泰国红咖啡",
    category: "饮品",
    price: "¥89",
    rating: 4.7,
    reviews: 203,
    image: "/placeholder.svg?key=local1&height=300&width=300",
    description: "地道的泰国高山咖啡，采用传统烘焙技艺。",
  },
  {
    id: 102,
    name: "鱼露调味料",
    category: "调味料",
    price: "¥45",
    rating: 4.6,
    reviews: 87,
    image: "/placeholder.svg?key=local2&height=300&width=300",
    description: "传统泰国鱼露，是烹饪的必备调料。",
  },
  {
    id: 103,
    name: "泰国丝绸面料",
    category: "纺织品",
    price: "¥599",
    rating: 4.9,
    reviews: 142,
    image: "/placeholder.svg?key=local3&height=300&width=300",
    description: "手工织造的泰国丝绸，质量上乘。",
  },
  {
    id: 104,
    name: "手工香皂套装",
    category: "护理",
    price: "¥129",
    rating: 4.8,
    reviews: 95,
    image: "/placeholder.svg?key=local4&height=300&width=300",
    description: "用天然泰国草本制作的手工香皂。",
  },
  {
    id: 105,
    name: "竹编工艺品",
    category: "工艺品",
    price: "¥199",
    rating: 4.7,
    reviews: 76,
    image: "/placeholder.svg?key=local5&height=300&width=300",
    description: "精美的竹编装饰品，展现泰国民间艺术。",
  },
]

const categories = ["全部", "饮品", "调味料", "纺织品", "护理", "工艺品"]

export default function LocalSpecialtiesPage() {
  const [selectedCategory, setSelectedCategory] = useState("全部")
  const [favorites, setFavorites] = useState<number[]>([])

  const filteredProducts =
    selectedCategory === "全部" ? products : products.filter((p) => p.category === selectedCategory)

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]))
  }

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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">本地特产</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            品尝和购买地道的泰国特产，从传统调味料到特色商品，每一样都承载着泰国的文化和风味。
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8 flex flex-wrap gap-2">
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

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative w-full h-64 bg-muted group">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform"
                />
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className="absolute top-3 right-3 p-2 bg-white/90 rounded-full hover:bg-white transition-colors z-10"
                >
                  <Heart
                    size={20}
                    className={favorites.includes(product.id) ? "fill-red-500 text-red-500" : "text-foreground"}
                  />
                </button>
              </div>
              <div className="p-4">
                <div className="inline-block px-2 py-1 bg-secondary/20 text-secondary rounded text-xs font-semibold mb-2">
                  {product.category}
                </div>
                <h3 className="text-lg font-bold mb-2 line-clamp-2">{product.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{product.description}</p>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={
                          i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                        }
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.rating} ({product.reviews})
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">{product.price}</span>
                  <button className="p-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                    <ShoppingCart size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
      <ScrollToTop />
      <BackButton />
    </div>
  )
}
