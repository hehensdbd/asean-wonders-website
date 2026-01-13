"use client"

import { useState, useEffect } from "react" // 添加useEffect
import { Play } from "lucide-react"
import Image from "next/image"

export interface MythologyCharacter {
  id: number
  name: string
  thai: string
  title: string
  description: string
  image: string
}

export interface MythologyVideo {
  id: number
  characterId: number
  title: string
  description: string
  duration: string
  thumbnail: string
  characters?: number[] // IDs of characters that appear in this video
}

export function MythologyVideoSection({
  characters,
  videos,
  initialCharacterId,
  onCharacterChange,
}: {
  characters: MythologyCharacter[]
  videos: MythologyVideo[]
  initialCharacterId?: number
  onCharacterChange?: (characterId: number) => void
}) {
  // 使用initialCharacterId作为初始值
  const [selectedCharacterId, setSelectedCharacterId] = useState<number>(
    initialCharacterId || characters[0]?.id || 1
  )
  const [selectedVideo, setSelectedVideo] = useState<MythologyVideo | null>(null)

  // 当initialCharacterId变化时，更新选中的角色和视频
  useEffect(() => {
    if (initialCharacterId && initialCharacterId !== selectedCharacterId) {
      setSelectedCharacterId(initialCharacterId)
      const firstVideo = videos.find((v) => v.characterId === initialCharacterId)
      setSelectedVideo(firstVideo || null)
    }
  }, [initialCharacterId, selectedCharacterId, videos])

  // 初始化或重新设置选中的视频
  useEffect(() => {
    if (!selectedVideo) {
      const firstVideo = videos.find((v) => v.characterId === selectedCharacterId)
      setSelectedVideo(firstVideo || null)
    }
  }, [selectedCharacterId, selectedVideo, videos])

  const handleCharacterSelect = (characterId: number) => {
    setSelectedCharacterId(characterId)
    const firstVideo = videos.find((v) => v.characterId === characterId)
    setSelectedVideo(firstVideo || null)
    onCharacterChange?.(characterId)
  }

  const handleVideoSelect = (video: MythologyVideo) => {
    setSelectedVideo(video)
    // If video is for a different character, update selected character
    if (video.characterId !== selectedCharacterId) {
      setSelectedCharacterId(video.characterId)
      onCharacterChange?.(video.characterId)
    }
  }

  const selectedCharacter = characters.find((c) => c.id === selectedCharacterId)
  const relatedVideos = videos.filter((v) => v.characterId === selectedCharacterId)

  return (
    <div className="w-full bg-gradient-to-br from-[#1a3d3a]/10 to-[#d4a574]/10 rounded-2xl p-6 md:p-8">
      {/* Section title */}
      <h2 className="text-3xl font-bold mb-8 text-foreground">神话视频讲堂</h2>

      {/* Video layout */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-48 flex-shrink-0">
          <div className="space-y-2">
            {characters.map((character) => {
              const isSelected = character.id === selectedCharacterId
              return (
                <button
                  key={character.id}
                  onClick={() => handleCharacterSelect(character.id)}
                  className={`
                    w-full text-left rounded-lg overflow-hidden transition-all duration-300 ease-in-out
                    ${isSelected ? "bg-secondary/20 border-2 border-secondary" : "bg-card border border-border hover:border-secondary/50"}
                  `}
                  style={{
                    height: isSelected ? "auto" : "48px",
                  }}
                >
                  {/* Compressed state - only name */}
                  <div className="p-3">
                    <h3 className="font-bold text-sm line-clamp-1">{character.name}</h3>
                  </div>

                  {/* Expanded state - image and description */}
                  {isSelected && (
                    <div className="px-3 pb-3 animate-in fade-in slide-in-from-top-2 duration-300">
                      <div className="relative w-full h-24 rounded-lg overflow-hidden mb-2">
                        <Image
                          src={character.image || "/placeholder.svg"}
                          alt={character.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <p className="text-xs text-secondary font-semibold mb-1">{character.thai}</p>
                      <p className="text-xs text-muted-foreground line-clamp-2">{character.description}</p>
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        <div className="flex-1">
          {selectedVideo ? (
            <>
              {/* Video player placeholder */}
              <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden mb-6 group">
                <Image
                  src={selectedVideo.thumbnail || "/placeholder.svg"}
                  alt={selectedVideo.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                <button className="absolute inset-0 flex items-center justify-center">
                  <div className="p-4 rounded-full bg-yellow-400 hover:bg-yellow-500 transition-colors shadow-lg group-hover:scale-110 transition-transform">
                    <Play size={32} className="text-black fill-black" />
                  </div>
                </button>
                <span className="absolute bottom-4 right-4 bg-black/80 text-white text-xs px-3 py-1 rounded">
                  {selectedVideo.duration}
                </span>
              </div>

              {/* Video info */}
              <div className="mb-6">
                <h4 className="text-xl font-bold mb-3 text-foreground">{selectedVideo.title}</h4>
                <p className="text-muted-foreground leading-relaxed">{selectedVideo.description}</p>
              </div>

              {/* Related videos list */}
              <div className="space-y-2">
                <h5 className="text-sm font-semibold text-foreground mb-4">相关视频</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {relatedVideos.map((video) => (
                    <button
                      key={video.id}
                      onClick={() => handleVideoSelect(video)}
                      className={`
                        flex gap-3 p-3 rounded-lg transition-all
                        ${
                          selectedVideo.id === video.id
                            ? "bg-secondary/20 border border-secondary"
                            : "hover:bg-muted border border-transparent"
                        }
                      `}
                    >
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
                        <Image
                          src={video.thumbnail || "/placeholder.svg"}
                          alt={video.title}
                          fill
                          className="object-cover"
                        />
                        <Play
                          size={16}
                          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white"
                        />
                      </div>
                      <div className="flex-1 text-left">
                        <h6 className="font-semibold text-sm text-foreground line-clamp-2">{video.title}</h6>
                        <p className="text-xs text-muted-foreground mt-1">{video.duration}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-96 bg-muted rounded-xl">
              <p className="text-muted-foreground">选择一个人物查看相关视频</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}