"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

export interface MythologyCharacter {
  id: number
  name: string
  thai: string
  title: string
  description: string
  image: string
}

export function MythologyCarousel({
  characters,
  onSelectCharacter,
}: { characters: MythologyCharacter[]; onSelectCharacter: (char: MythologyCharacter) => void }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)

  useEffect(() => {
    if (!autoPlay) return
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % characters.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [autoPlay, characters.length])

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + characters.length) % characters.length)
    setAutoPlay(false)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % characters.length)
    setAutoPlay(false)
  }

  const handleCardClick = (index: number) => {
    setCurrentIndex(index)
    setAutoPlay(false)
    onSelectCharacter(characters[index])
  }

  const currentCharacter = characters[currentIndex]

  return (
    <div className="w-full">
      {/* Main floating card */}
      <div className="relative w-full h-96 md:h-[500px] bg-muted rounded-2xl overflow-hidden shadow-2xl">
        {/* Card background image */}
        <div className="absolute inset-0">
          <Image
            src={currentCharacter.image || "/placeholder.svg"}
            alt={currentCharacter.name}
            fill
            className="object-cover"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>

        {/* Card content */}
        <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-2">{currentCharacter.name}</h2>
          <p className="text-lg text-yellow-400 mb-4 font-semibold">{currentCharacter.thai}</p>
          <p className="text-sm md:text-base text-gray-200 mb-4 max-w-lg">{currentCharacter.title}</p>
          <p className="text-base text-gray-300 line-clamp-3">{currentCharacter.description}</p>
        </div>

        {/* Navigation arrows */}
        <button
          onClick={goToPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/20 hover:bg-white/40 text-white transition-all"
          aria-label="上一个人物"
        >
          <ChevronLeft size={28} />
        </button>
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/20 hover:bg-white/40 text-white transition-all"
          aria-label="下一个人物"
        >
          <ChevronRight size={28} />
        </button>
      </div>

      {/* Carousel thumbnails */}
      <div className="flex gap-4 mt-8 justify-center flex-wrap">
        {characters.map((char, index) => (
          <button
            key={char.id}
            onClick={() => handleCardClick(index)}
            className={`relative w-24 h-24 rounded-xl overflow-hidden border-2 transition-all ${
              index === currentIndex
                ? "border-yellow-400 ring-2 ring-yellow-400/50 scale-110"
                : "border-gray-400 hover:border-yellow-400"
            }`}
            aria-label={`选择 ${char.name}`}
            aria-pressed={index === currentIndex}
          >
            <Image src={char.image || "/placeholder.svg"} alt={char.name} fill className="object-cover" />
            <div className="absolute inset-0 bg-black/30" />
            <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold text-center p-1 line-clamp-2">
              {char.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
