"use client"

import { useState, useEffect, useRef } from "react"
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize } from "lucide-react"
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
  characters?: number[]
  videoUrl?: string
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
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [progress, setProgress] = useState(0)
  const [showControls, setShowControls] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [currentTime, setCurrentTime] = useState("0:00")
  const [totalDuration, setTotalDuration] = useState("0:00")
  
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const controlsTimeoutRef = useRef<number | null>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)
  const hasPlayedOnce = useRef(false) // 用于跟踪视频是否至少播放过一次

  // 格式化时间（秒转为 MM:SS）
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`
  }

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

  // 当视频切换时，停止播放
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.pause()
      setIsPlaying(false)
      setProgress(0)
      setCurrentTime("0:00")
      hasPlayedOnce.current = false // 重置播放状态
    }
  }, [selectedVideo])

  // 视频元数据加载完成时设置总时长
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      const duration = videoRef.current.duration
      setTotalDuration(formatTime(duration))
    }
  }

  // 处理时间更新
  const handleTimeUpdate = () => {
    if (videoRef.current && !isDragging) {
      const currentTime = videoRef.current.currentTime
      const duration = videoRef.current.duration
      if (duration > 0) {
        setProgress((currentTime / duration) * 100)
        setCurrentTime(formatTime(currentTime))
      }
    }
  }

  // 视频播放结束时重置
  const handleVideoEnd = () => {
    setIsPlaying(false)
    setProgress(100)
    setCurrentTime(totalDuration)
    setShowControls(true)
  }

  // 处理播放/暂停
  const togglePlay = () => {
    if (!selectedVideo?.videoUrl) return
    
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
        hasPlayedOnce.current = true // 标记视频已经开始播放
      }
      setIsPlaying(!isPlaying)
    }
  }

  // 处理静音
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  // 处理全屏
  const toggleFullscreen = () => {
    if (!containerRef.current) return

    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen()
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }
  }

  // 监听全屏变化
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }
  }, [])

  // 鼠标移动时显示控制界面，静止2秒后隐藏
  const handleMouseMove = () => {
    setShowControls(true)
    
    // 清除之前的定时器
    if (controlsTimeoutRef.current !== null) {
      clearTimeout(controlsTimeoutRef.current)
      controlsTimeoutRef.current = null
    }
    
    // 设置新的定时器，2秒后隐藏控制界面
    controlsTimeoutRef.current = window.setTimeout(() => {
      if (isPlaying) {
        setShowControls(false)
      }
    }, 2000)
  }

  // 鼠标离开视频区域时
  const handleMouseLeave = () => {
    if (isPlaying) {
      setShowControls(false)
    }
  }

  // 处理视频容器点击（播放/暂停）
  const handleVideoClick = () => {
    if (!selectedVideo?.videoUrl) return
    
    // 如果点击的是视频控制按钮，不执行切换（事件冒泡会处理）
    // 直接调用切换播放/暂停
    togglePlay()
  }

  // 点击进度条跳转
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current || !progressBarRef.current) return
    
    const progressBar = progressBarRef.current
    const rect = progressBar.getBoundingClientRect()
    const pos = (e.clientX - rect.left) / rect.width
    
    videoRef.current.currentTime = pos * videoRef.current.duration
    setProgress(pos * 100)
    setCurrentTime(formatTime(videoRef.current.currentTime))
  }

  // 拖拽进度条
  const handleProgressDragStart = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation() // 阻止事件冒泡，避免触发视频点击
    setIsDragging(true)
    
    const handleDragMove = (moveEvent: MouseEvent) => {
      if (!videoRef.current || !progressBarRef.current) return
      
      const progressBar = progressBarRef.current
      const rect = progressBar.getBoundingClientRect()
      let pos = (moveEvent.clientX - rect.left) / rect.width
      
      // 限制在0-1之间
      pos = Math.max(0, Math.min(1, pos))
      
      const newTime = pos * videoRef.current.duration
      setProgress(pos * 100)
      setCurrentTime(formatTime(newTime))
    }
    
    const handleDragEnd = (endEvent: MouseEvent) => {
      if (!videoRef.current || !progressBarRef.current) return
      
      const progressBar = progressBarRef.current
      const rect = progressBar.getBoundingClientRect()
      let pos = (endEvent.clientX - rect.left) / rect.width
      
      // 限制在0-1之间
      pos = Math.max(0, Math.min(1, pos))
      
      videoRef.current.currentTime = pos * videoRef.current.duration
      setIsDragging(false)
      
      // 移除事件监听器
      document.removeEventListener('mousemove', handleDragMove)
      document.removeEventListener('mouseup', handleDragEnd)
    }
    
    document.addEventListener('mousemove', handleDragMove)
    document.addEventListener('mouseup', handleDragEnd)
  }

  // 清理定时器
  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current !== null) {
        clearTimeout(controlsTimeoutRef.current)
      }
    }
  }, [])

  const handleCharacterSelect = (characterId: number) => {
    setSelectedCharacterId(characterId)
    const firstVideo = videos.find((v) => v.characterId === characterId)
    setSelectedVideo(firstVideo || null)
    onCharacterChange?.(characterId)
  }

  const handleVideoSelect = (video: MythologyVideo) => {
    setSelectedVideo(video)
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
              {/* Video player container */}
              <div 
                ref={containerRef}
                className="relative w-full aspect-video bg-black rounded-xl overflow-hidden mb-6 group cursor-pointer"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={handleVideoClick}
              >
                {selectedVideo.videoUrl ? (
                  <>
                    {/* 视频播放器 */}
                    <video
                      ref={videoRef}
                      className="w-full h-full object-cover"
                      onTimeUpdate={handleTimeUpdate}
                      onEnded={handleVideoEnd}
                      onLoadedMetadata={handleLoadedMetadata}
                      muted={isMuted}
                      playsInline
                    >
                      <source src={selectedVideo.videoUrl} type="video/mp4" />
                      您的浏览器不支持视频播放
                    </video>
                    
                    {/* 视频封面（只在视频未播放且从未播放过时显示） */}
                    {!hasPlayedOnce.current && !isPlaying && (
                      <>
                        <Image
                          src={selectedVideo.thumbnail || "/placeholder.svg"}
                          alt={selectedVideo.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                      </>
                    )}
                    
                    {/* 控制界面 - 根据showControls状态显示/隐藏 */}
                    <div className={`absolute inset-0 transition-opacity duration-300 ${
                      showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}>
                      
                      {/* 中间播放/暂停按钮（只在暂停时显示） */}
                      {!isPlaying && (
                        <button 
                          className="absolute inset-0 flex items-center justify-center z-10"
                          onClick={(e) => {
                            e.stopPropagation() // 阻止事件冒泡到视频容器
                            togglePlay()
                          }}
                        >
                          <div className="p-4 rounded-full bg-yellow-400/90 hover:bg-yellow-500 transition-colors shadow-lg group-hover:scale-110 transition-transform">
                            <Play size={32} className="text-black fill-black" />
                          </div>
                        </button>
                      )}
                      
                      {/* 底部控制栏 */}
                      <div 
                        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 z-20"
                        onClick={(e) => e.stopPropagation()} // 阻止点击控制栏时触发视频播放/暂停
                      >
                        {/* 进度条 */}
                        <div 
                          ref={progressBarRef}
                          className="relative h-1 bg-gray-700/50 rounded-full mb-3 cursor-pointer"
                          onClick={handleProgressClick}
                          onMouseDown={handleProgressDragStart}
                        >
                          <div 
                            className="absolute h-full bg-yellow-400 rounded-full transition-all"
                            style={{ width: `${progress}%` }}
                          />
                          {/* 拖拽点 */}
                          <div 
                            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-yellow-400 rounded-full shadow-lg transform -translate-x-1/2 hover:scale-125 transition-transform cursor-grab active:cursor-grabbing"
                            style={{ left: `${progress}%` }}
                          />
                        </div>
                        
                        {/* 控制按钮 */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            {/* 播放/暂停按钮 */}
                            <button 
                              className="text-white hover:text-yellow-400 transition-colors"
                              onClick={(e) => {
                                e.stopPropagation() // 阻止事件冒泡
                                togglePlay()
                              }}
                            >
                              {isPlaying ? (
                                <Pause size={20} />
                              ) : (
                                <Play size={20} />
                              )}
                            </button>
                            
                            {/* 静音按钮 */}
                            <button 
                              className="text-white hover:text-yellow-400 transition-colors"
                              onClick={(e) => {
                                e.stopPropagation() // 阻止事件冒泡
                                toggleMute()
                              }}
                            >
                              {isMuted ? (
                                <VolumeX size={20} />
                              ) : (
                                <Volume2 size={20} />
                              )}
                            </button>
                            
                            {/* 时间显示 */}
                            <div className="text-white text-sm font-mono">
                              {currentTime} / {totalDuration}
                            </div>
                          </div>
                          
                          {/* 全屏按钮 */}
                          <button 
                            className="text-white hover:text-yellow-400 transition-colors"
                            onClick={(e) => {
                              e.stopPropagation() // 阻止事件冒泡
                              toggleFullscreen()
                            }}
                          >
                            {isFullscreen ? (
                              <Minimize size={20} />
                            ) : (
                              <Maximize size={20} />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  // 如果没有视频文件，显示原来的图片封面
                  <>
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
                  </>
                )}
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