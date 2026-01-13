"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { thaiFont } from '@/app/fonts';

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)
  const router = useRouter()

  const slides = [
    {
      id: 1,
      image: "/images/泰国寺庙.png",
      title: "泰国寺庙",
      description: "探索古老的佛教建筑艺术",
      link: "/explore/architecture",
    },
    {
      id: 2,
      image: "/images/水灯节.png",
      title: "水灯节",
      description: "感受传统文化庆典的魔力",
      link: "/explore/festivals",
    },
    {
      id: 3,
      image: "/images/泰国舞蹈.png",
      title: "泰国古典舞蹈",
      description: "沉浸在千年艺术传统中",
      link: "/explore/art",
    },
    {
      id: 4,
      image: "/images/泰国美食1.png",
      title: "泰国美食",
      description: "品尝东南亚的独特风味",
      link: "/explore/food",
    },
    {
      id: 5,
      image: "/images/泰国建筑.png",
      title: "古代建筑",
      description: "发现历史的印记",
      link: "/explore/architecture",
    },
  ]

  useEffect(() => {
    if (!autoPlay) return
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [autoPlay, slides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    setAutoPlay(false)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    setAutoPlay(false)
  }

  const handleSlideClick = () => {
    router.push(slides[currentSlide].link)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") nextSlide()
    if (e.key === "ArrowLeft") prevSlide()
  }

  return (
    // 移除 bg-muted，让轮播图透明以显示主页背景
    <div
      className="relative w-full h-96 md:h-[700px] overflow-hidden cursor-pointer"
      role="region"
      aria-label="英雄轮播"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      onClick={handleSlideClick}
    >
      {/* Slides */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
            role="tabpanel"
            aria-label={`幻灯片 ${index + 1}: ${slide.title}`}
            aria-hidden={index !== currentSlide}
          >
            <Image
              src={slide.image || "/placeholder.svg"}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            {/* 调整遮罩层，使背景更清晰 */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h2 
                className={`text-6xl md:text-7xl font-bold mb-3 ${thaiFont.className} no-decoration`}
                style={{ 
                  textShadow: '2px 2px 8px rgba(0,0,0,0.5)',
                  letterSpacing: '-0.05em',
                  lineHeight: '1.2',
                }}
              >
                {slide.title}
              </h2>
              <p className="text-xl opacity-90 ml-3">{slide.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          prevSlide()
        }}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors"
        aria-label="上一张幻灯片"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation()
          nextSlide()
        }}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors"
        aria-label="下一张幻灯片"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots */}
      <div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2"
        role="tablist"
        aria-label="幻灯片导航"
        onClick={(e) => e.stopPropagation()}
      >
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.stopPropagation()
              setCurrentSlide(index)
              setAutoPlay(false)
            }}
            className={`w-2 h-2 rounded-full transition-all ${index === currentSlide ? "bg-white w-8" : "bg-white/50"}`}
            role="tab"
            aria-label={`转到幻灯片 ${index + 1}`}
            aria-selected={index === currentSlide}
          />
        ))}
      </div>
    </div>
  )
}