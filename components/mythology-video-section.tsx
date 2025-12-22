"use client"

import { useState } from "react"
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
}

export function MythologyVideoSection({
  character,
  videos,
}: {
  character: MythologyCharacter | null
  videos: MythologyVideo[]
}) {
  const [selectedVideo, setSelectedVideo] = useState<MythologyVideo | null>(
    character ? videos.find((v) => v.characterId === character.id) || null : null,
  )

  return (
    <div className="w-full bg-gradient-to-br from-[#1a3d3a]/10 to-[#d4a574]/10 rounded-2xl p-8">
      {/* Section title */}
      <h2 className="text-3xl font-bold mb-8 text-foreground">神话视频讲堂</h2>

      {/* Video layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Character info with background */}
        <div className="lg:col-span-1 relative">
          {character && (
            <>
              {/* Character background image */}
              <div className="absolute inset-0 rounded-xl overflow-hidden -z-10">
                <Image
                  src={character.image || "/placeholder.svg"}
                  alt={character.name}
                  fill
                  className="object-cover opacity-20"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20" />
              </div>

              {/* Character info */}
              <div className="relative p-6 rounded-xl bg-black/30 backdrop-blur-sm text-white">
                <h3 className="text-2xl font-bold mb-2">{character.name}</h3>
                <p className="text-yellow-400 font-semibold mb-4">{character.thai}</p>
                <p className="text-sm text-gray-200 mb-4">{character.title}</p>
                <div className="h-32 rounded-lg overflow-hidden border-2 border-yellow-400/50">
                  <Image
                    src={character.image || "/placeholder.svg"}
                    alt={character.name}
                    width={200}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Right: Video player and info */}
        <div className="lg:col-span-2">
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
              <div>
                <h4 className="text-xl font-bold mb-3 text-foreground">{selectedVideo.title}</h4>
                <p className="text-muted-foreground mb-6 leading-relaxed">{selectedVideo.description}</p>

                {/* Video list */}
                <div className="space-y-2">
                  <h5 className="text-sm font-semibold text-foreground mb-4">相关视频</h5>
                  {videos
                    .filter((v) => v.characterId === character?.id)
                    .map((video) => (
                      <button
                        key={video.id}
                        onClick={() => setSelectedVideo(video)}
                        className={`w-full flex gap-3 p-3 rounded-lg transition-all ${
                          selectedVideo.id === video.id
                            ? "bg-secondary/20 border border-secondary"
                            : "hover:bg-muted border border-transparent"
                        }`}
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
