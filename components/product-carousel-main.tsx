"use client"

import { useState, useEffect } from "react"
import { ArrowRight, ShoppingCart, Heart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface Product {
  id: number
  name: string
  price: string
  rating: number
  reviews: number
  image: string
  description?: string
}

interface ProductCarouselProps {
  title: string
  description: string
  products: Product[]
  moreLink: string
  layout?: "left-text" | "right-text"
}

export function ProductCarouselMain({
  title,
  description,
  products,
  moreLink,
  layout = "left-text",
}: ProductCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    if (!isAutoPlay) return
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [isAutoPlay, products.length])

  const currentProduct = products[currentIndex]

  const handleDotClick = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlay(false)
  }

  const textContent = (
    <div className="flex flex-col justify-between h-full">
      <div>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 no-decoration">{currentProduct.name}</h2>
        <p className="text-lg text-muted-foreground mb-6">
          {currentProduct.description || "精选产品，融合传统工艺与现代设计"}
        </p>
        <div className="flex items-center gap-8 mb-8">
          <div>
            <span className="text-3xl md:text-4xl font-bold text-primary">{currentProduct.price}</span>
          </div>
          <div className="text-sm text-muted-foreground">
            <p>
              ⭐ {currentProduct.rating} ({currentProduct.reviews} 条评价)
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <button className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold">
          <ShoppingCart size={20} />
          立即购买
        </button>
        <Link
          href={moreLink}
          className="flex items-center gap-2 px-6 py-3 text-primary hover:text-primary/80 transition-colors font-semibold text-right"
        >
          查看更多 <ArrowRight size={20} />
        </Link>
      </div>
    </div>
  )

  const imageContent = (
    <div className="flex-1 h-80 md:h-96 relative rounded-lg overflow-hidden bg-muted group">
      <Image
        src={currentProduct.image || "/placeholder.svg"}
        alt={currentProduct.name}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <button
        onClick={() => setIsFavorite(!isFavorite)}
        className="absolute top-4 right-4 p-3 bg-white/90 rounded-full hover:bg-white transition-colors z-10"
      >
        <Heart size={24} className={isFavorite ? "fill-red-500 text-red-500" : "text-foreground"} />
      </button>
    </div>
  )

  return (
    <section className="mb-20">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">{title}</h2>
        <p className="text-muted-foreground">{description}</p>
      </div>

      {/* Main carousel */}
      <div
        className="flex flex-col md:flex-row gap-8 items-stretch"
        onMouseEnter={() => setIsAutoPlay(false)}
        onMouseLeave={() => setIsAutoPlay(true)}
      >
        {/* 左侧文本 */}
        {layout === "left-text" && (
          <>
            <div className="flex-1 flex flex-col justify-between">{textContent}</div>
            {imageContent}
          </>
        )}

        {/* 右侧文本 */}
        {layout === "right-text" && (
          <>
            {imageContent}
            <div className="flex-1 flex flex-col justify-between">{textContent}</div>
          </>
        )}
      </div>

      {/* Dots indicator */}
      <div className="flex gap-2 md:gap-3 justify-center mt-8 flex-wrap">
        {products.map((product, index) => (
          <button
            key={product.id}
            onClick={() => handleDotClick(index)}
            className={`relative w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 flex-shrink-0 ${
              index === currentIndex
                ? "border-primary ring-2 ring-primary/50 scale-100 shadow-lg"
                : "border-gray-300 hover:border-primary hover:scale-105"
            }`}
            aria-label={`Select ${product.name}`}
            aria-pressed={index === currentIndex}
          >
            <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
            <div className="absolute inset-0 bg-black/10 transition-colors" />
            <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold text-center p-1 line-clamp-2 bg-gradient-to-t from-black/50 to-transparent">
              {product.name}
            </span>
          </button>
        ))}
      </div>

      {/* Divider */}
      <div className="mt-12 border-t border-border" />
    </section>
  )
}
