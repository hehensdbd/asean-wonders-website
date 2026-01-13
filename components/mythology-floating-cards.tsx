"use client"

import { useState, useEffect } from "react"
import { ArrowRight } from "lucide-react"
import Image from "next/image"

export interface MythologyCharacter {
  id: number
  name: string
  thai: string
  title: string
  description: string
  image: string
  detailHref: string
}

export function MythologyFloatingCards({
  characters,
  onCardClick,
}: {
  characters: MythologyCharacter[]
  onCardClick?: (character: MythologyCharacter) => void
}) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  useEffect(() => {
    if (!isAutoPlay) return
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % characters.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [isAutoPlay, characters.length])

  const handleMainCardClick = (character: MythologyCharacter, index: number) => {
    if (index === currentIndex) {
      // 当点击中心卡片时，触发跳转
      if (onCardClick) {
        onCardClick(character)
      }
    } else {
      // 当点击非中心卡片时，只切换到该卡片
      setCurrentIndex(index)
      setIsAutoPlay(false)
    }
  }

  const handleThumbnailClick = (character: MythologyCharacter, index: number) => {
    setCurrentIndex(index)
    setIsAutoPlay(false)
    // 缩略图点击只切换卡片，不跳转
  }

  const getCardPosition = (index: number): { position: string; zIndex: number; style: any } => {
    const diff = (index - currentIndex + characters.length) % characters.length
    const maxDisplay = 3

    if (diff === 0) {
      return {
        position: "center",
        zIndex: 30,
        style: {
          transform: "translateX(0) scale(1)",
          opacity: 1,
        },
      }
    } else if (diff === 1 || diff === characters.length - 1) {
      const isRight = diff === 1
      return {
        position: isRight ? "right" : "left",
        zIndex: 20 + (isRight ? -diff : -diff),
        style: {
          transform: `translateX(${isRight ? 160 : -160}px) scale(0.8)`,
          opacity: 0.65,
        },
      }
    } else if (diff === 2 || diff === characters.length - 2) {
      const isRight = diff === 2
      return {
        position: isRight ? "far-right" : "far-left",
        zIndex: 10 + (isRight ? -diff : -diff),
        style: {
          transform: `translateX(${isRight ? 280 : -280}px) scale(0.65)`,
          opacity: 0.35,
        },
      }
    }

    return {
      position: "hidden",
      zIndex: 0,
      style: {
        transform: "scale(0)",
        opacity: 0,
      },
    }
  }

  return (
    <div className="w-full space-y-4">
      {/* Floating cards container */}
      <div
        className="relative h-96 md:h-[420px]"
        onMouseEnter={() => setIsAutoPlay(false)}
        onMouseLeave={() => setIsAutoPlay(true)}
      >
        {/* Semi-transparent floating background */}
        <div className="absolute inset-0 rounded-3xl bg-black/5 backdrop-blur-xl border border-white/10 shadow-2xl" />

        {/* Cards stacking area */}
        <div className="absolute inset-0 flex items-center justify-center px-2 md:px-4">
          <div className="relative w-full h-full max-w-4xl">
            {/* Render all cards */}
            {characters.map((character, index) => {
              const { zIndex, style } = getCardPosition(index)
              const isCurrentCard = index === currentIndex

              return (
                <div key={character.id}>
                  {/* Card - only show if not hidden */}
                  {style.opacity > 0 && (
                    <div
                      onClick={() => handleMainCardClick(character, index)}
                      style={{
                        zIndex,
                        ...style,
                      }}
                      className={`absolute inset-0 rounded-2xl overflow-hidden transition-all duration-500 ease-out bg-card border border-border shadow-xl ${
                        !isCurrentCard ? "cursor-pointer hover:shadow-2xl" : "cursor-pointer"
                      }`}
                    >
                      {/* Card background image */}
                      <div className="absolute inset-0">
                        <Image
                          src={character.image || "/placeholder.svg"}
                          alt={character.name}
                          fill
                          className="object-cover"
                        />
                        {/* Overlay gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                      </div>

                      {/* Card content - only fully visible on main card */}
                      {isCurrentCard && (
                        <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-8 text-white">
                          <div></div>
                          {/* Content at bottom */}
                          <div className="space-y-2">
                            <h3 className="text-3xl md:text-4xl font-bold">{character.name}</h3>
                            <p className="text-sm md:text-base text-yellow-300 font-semibold">{character.thai}</p>
                            <p className="text-xs md:text-sm font-semibold text-gray-200">{character.title}</p>
                            <p className="text-sm md:text-base text-gray-300 line-clamp-2 leading-relaxed">
                              {character.description}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="flex gap-2 md:gap-3 justify-center flex-wrap items-center">
        {characters.map((character, index) => (
          <button
            key={character.id}
            onClick={() => handleThumbnailClick(character, index)}
            className={`relative w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 flex-shrink-0 ${
              index === currentIndex
                ? "border-yellow-400 ring-2 ring-yellow-400/50 scale-100 shadow-lg"
                : "border-gray-300 hover:border-yellow-300 hover:scale-105"
            }`}
            aria-label={`Select ${character.name}`}
            aria-pressed={index === currentIndex}
          >
            <Image src={character.image || "/placeholder.svg"} alt={character.name} fill className="object-cover" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
            <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold text-center p-1 line-clamp-2 bg-gradient-to-t from-black/50 to-transparent">
              {character.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}