"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Heart } from "lucide-react"

interface CarouselProduct {
  id: number
  name: string
  price: string
  rating: number
  reviews: number
  image: string
  description?: string
  category?: string
}

interface ProductCarouselProps {
  products: CarouselProduct[]
  onProductClick?: (product: CarouselProduct) => void
}

export function ProductCarousel({ products, onProductClick }: ProductCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    if (isHovering) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isHovering, products.length])

  const currentProduct = products[currentIndex]

  const handleDotClick = (index: number) => {
    setCurrentIndex(index)
  }

  const handlePrevClick = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length)
  }

  const handleNextClick = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length)
  }

  return (
    <div
      className="w-full bg-gradient-to-r from-slate-50 to-slate-100 rounded-lg overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8 md:p-12">
        <div className="lg:col-span-1 flex items-center justify-center">
          <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-white shadow-lg">
            <Image
              src={currentProduct.image || "/placeholder.svg"}
              alt={currentProduct.name}
              fill
              className="object-cover transition-opacity duration-500"
            />
          </div>
        </div>

        <div className="lg:col-span-2 flex flex-col justify-center">
          {/* Product category */}
          {currentProduct.category && (
            <div className="inline-block px-3 py-1 bg-secondary/20 text-secondary rounded text-xs font-semibold mb-4 w-fit">
              {currentProduct.category}
            </div>
          )}

          {/* Product name and decorative elements */}
          <div className="mb-6">
            <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-2">{currentProduct.name}</h3>
            <p className="text-sm text-muted-foreground">✧ · ✧ · ✧ · ✧ · ✧</p>
          </div>

          {/* Product description */}
          {currentProduct.description && (
            <p className="text-muted-foreground text-base leading-relaxed mb-6">{currentProduct.description}</p>
          )}

          {/* Product details */}
          <div className="flex items-center gap-6 mb-8">
            <div>
              <p className="text-3xl font-bold text-primary">{currentProduct.price}</p>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < Math.floor(currentProduct.rating) ? "text-yellow-400" : "text-gray-300"}>
                    ★
                  </span>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                {currentProduct.rating} ({currentProduct.reviews} 评价)
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            {/* Dot indicators */}
            <div className="flex gap-2">
              {products.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex ? "bg-secondary w-8" : "bg-gray-300 w-3 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to product ${index + 1}`}
                />
              ))}
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="p-2 bg-white rounded-full hover:bg-gray-50 transition-colors shadow-md"
              >
                <Heart size={20} className={isFavorite ? "fill-red-500 text-red-500" : "text-foreground"} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
