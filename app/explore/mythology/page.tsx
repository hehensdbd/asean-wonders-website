"use client"

import { useState, useEffect, useRef } from "react" // 添加 useRef
import { useSearchParams } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"
import { BackButton } from "@/components/back-button"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import type { MythologyCharacter } from "@/components/mythology-video-section"
import { MythologyVideoSection, type MythologyVideo } from "@/components/mythology-video-section"

// 神话视频讲堂中可选择的人物（6位原始人物）
const charactersForSelection: MythologyCharacter[] = [
  {
    id: 1,
    name: "南塔尼",
    thai: "Nang Tani (นางทานี)",
    title: "树神女神",
    description: "泰国民间中的诗意女神，是榕树神话中的中心人物。她象征着自然的神圣与女性的魅力。",
    image: "/images/南塔尼1.png",
  },
  {
    id: 2,
    name: "哈奴曼",
    thai: "Hanuman (หนุมาน)",
    title: "神圣的猴子战士",
    description: "源自《罗摩衍那》的英雄人物，象征忠诚、勇气和智慧。在泰国文化中被广泛崇拜。",
    image: "/images/哈奴曼.png",
  },
  {
    id: 3,
    name: "罗摩",
    thai: "Rama (พระราม)",
    title: "王子与英雄",
    description: "泰国版《罗摩衍那》（Ramakien）中的中心人物，代表正义和王权。",
    image: "/images/罗摩.png",
  },
  {
    id: 4,
    name: "十面魔王",
    thai: "Ravana (ทศกัณฐ)",
    title: "强大的反派",
    description: "泰国罗摩衍那中的主要反派角色，象征邪恶的力量和欲望。",
    image: "/images/十面魔王.png",
  },
  {
    id: 5,
    name: "金娜丽",
    thai: "Kinnari(กินรี)",
    title: "天国歌者与舞者",
    description: "上半身为绝世美女，下半身为天鹅或孔雀的神话生物，以美妙歌喉与舞姿著称。",
    image: "/images/金娜丽.png",
  },
  {
    id: 6,
    name: "伽鲁达",
    thai: "Garuda (ครุฑ)",
    title: "毗湿奴的坐骑",
    description: "半人半鹰的金翅神鸟，拥有无上神力，是忠诚、力量与速度的化身。",
    image: "/images/伽鲁达.png",
  },
]

// 所有人物（包括新增的隐藏人物）
const allCharacters: MythologyCharacter[] = [
  ...charactersForSelection,
  {
    id: 7,
    name: "阿肯",
    thai: "Ark (อัคน์)",
    title: "守树者",
    description: "童年时纯真无邪，受阿婆教导敬畏自然，立誓守护塔尼树；青年时期却在旱灾饥荒中迷失本心，背弃承诺，变得暴戾；直至老年白发幡然醒悟，历经神启与救赎，终将“守树即守心”化为信念，成为指引下一代的领路者。",
    image: "/images/阿肯.png",
  },
  {
    id: 8,
    name: "娜迦龙王",
    thai: "Phaya Nak (พญานาค)",
    title: "水域守护神",
    description: "泰国神话中的蛇神，掌管河流与水域，既是保护神也是财富的象征，在泰国文化中地位崇高。",
    image: "/images/娜迦龙王.png",
  },
  {
    id: 9,
    name: "因陀罗",
    thai: "Indra (พระอินทร์)",
    title: "天界之王",
    description: "源自印度神话，在泰国神话中掌管天界与雨水，是雷电与战争之神，常以骑象形象出现。",
    image: "/images/因陀罗.png",
  },
]

const videos: MythologyVideo[] = [
  {
    id: 1,
    characterId: 1,
    title: "南塔尼的惩戒",
    description:
      "以“守树即守心”为核心主题，讲述了关于自然敬畏与初心救赎的故事 。",
    duration: "3:14",
    thumbnail: "/images/南塔尼视频1.png",
    characters: [1, 7], 
    videoUrl: "/videos/南塔尼的惩戒.mp4",
  },
  {
    id: 2,
    characterId: 1,
    title: "泰国民间中的南塔尼信仰",
    description: "了解泰国人民如何崇拜南塔尼，以及这个女神在现代泰国文化中的重要性。",
    duration: "8:45",
    thumbnail: "/images/南塔尼视频4.png",
    characters: [1],
    videoUrl: "",
  },
  {
    id: 3,
    characterId: 2,
    title: "哈奴曼：忠诚的象征",
    description: "深入了解哈奴曼的史诗冒险，他如何帮助罗摩拯救妻子，以及他在泰国古典舞蹈中的表现。",
    duration: "22:15",
    thumbnail: "/hanuman-monkey-warrior.jpg",
    characters: [2, 3], 
  },
  {
    id: 4,
    characterId: 2,
    title: "泰国舞蹈中的哈奴曼",
    description: "观看传统泰国古典舞蹈如何演绎哈奴曼的英勇故事和复杂的动作编排。",
    duration: "15:20",
    thumbnail: "/thai-classical-dance-hanuman.jpg",
    characters: [2],
  },
  {
    id: 5,
    characterId: 3,
    title: "罗摩衍那：泰国版本的史诗",
    description: "了解《罗摩衍那》如何在泰国得到改编和演绎，以及罗摩作为理想王子的象征意义。",
    duration: "25:40",
    thumbnail: "/thai-ramakien-epic.jpg",
    characters: [3, 4], // Rama and Ravana
  },
  {
    id: 6,
    characterId: 3,
    title: "罗摩的道德教训",
    description: "探索罗摩的故事如何传递道德和伦理价值观，影响了几个世纪的泰国教育。",
    duration: "19:30",
    thumbnail: "/prince-rama-thailand.jpg",
    characters: [3],
  },
  {
    id: 7,
    characterId: 4,
    title: "十面魔王的权力与野心",
    description: "分析十面魔王作为反派角色的复杂性，以及他如何代表罗摩衍那中的邪恶力量。",
    duration: "20:15",
    thumbnail: "/ravana-ten-headed-demon.jpg",
    characters: [4],
  },
  {
    id: 8,
    characterId: 4,
    title: "善恶之争：十面魔王的故事",
    description: "通过十面魔王的视角探索泰国神话中关于善与恶的永恒主题。",
    duration: "17:50",
    thumbnail: "/thai-mythology-good-evil.jpg",
    characters: [4, 3], // Ravana and Rama
  },
  {
    id: 9,
    characterId: 5,
    title: "金娜丽：女性战士的传说",
    description: "探索泰国神话中的金娜丽的故事。这个视频讲述了她如何通过智慧和勇气赢得尊重。",
    duration: "16:20",
    thumbnail: "/thai-female-warrior.jpg",
    characters: [5],
  },
  {
    id: 10,
    characterId: 5,
    title: "金娜丽与古代泰国女性权力",
    description: "了解金娜丽如何代表泰国文化中女性的力量和地位。",
    duration: "14:30",
    thumbnail: "/ancient-thai-women-power.jpg",
    characters: [5],
  },
  {
    id: 11,
    characterId: 6,
    title: "伽鲁达：命运之书",
    description: "深入探索神秘的伽鲁达形象如何在泰国民间传说和现代文化中发挥重要作用。",
    duration: "19:45",
    thumbnail: "/thai-destiny-guardian.jpg",
    characters: [6],
  },
  {
    id: 12,
    characterId: 6,
    title: "伽鲁达与命运的转变",
    description: "揭示伽鲁达如何作为命运的守护者影响泰国人民的精神信仰。",
    duration: "18:00",
    thumbnail: "/thai-spiritual-belief-destiny.jpg",
    characters: [6],
  },
]

export default function MythologyPage() {
  const searchParams = useSearchParams()
  const characterId = searchParams.get("character")
  
  // 添加 useRef 用于视频区域
  const videoSectionRef = useRef<HTMLDivElement>(null)
  
  // 添加自动滚动效果
  useEffect(() => {
    // 如果URL中有锚点，滚动到视频区域
    if (window.location.hash === '#video-section' && videoSectionRef.current) {
      setTimeout(() => {
        videoSectionRef.current?.scrollIntoView({ behavior: 'smooth' })
      }, 100) // 延迟100ms确保内容已加载
    }
  }, [])

  const initialCharacter = characterId ? charactersForSelection.find((c) => c.id === Number.parseInt(characterId)) : charactersForSelection[0]

  const [selectedCharacterId, setSelectedCharacterId] = useState<number>(initialCharacter?.id || 1)
  const [currentVideo, setCurrentVideo] = useState<MythologyVideo | null>(
    videos.find((v) => v.characterId === selectedCharacterId) || null,
  )

  // 获取当前视频中出现的所有人物（包括隐藏人物）
  const getCharactersInCurrentVideo = () => {
    if (!currentVideo || !currentVideo.characters) return []
    return allCharacters.filter((c) => currentVideo.characters?.includes(c.id))
  }

  const displayedCharacters = getCharactersInCurrentVideo()

  const handleCharacterChange = (characterId: number) => {
    setSelectedCharacterId(characterId)
    const firstVideo = videos.find((v) => v.characterId === characterId)
    setCurrentVideo(firstVideo || null)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-12 flex-1">
        {/* Hero Section */}
        <div className="mb-16">
          <div className="inline-block px-3 py-1 bg-secondary/20 text-secondary rounded-full text-sm font-semibold mb-4">
            探索泰国文化
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">神话传说</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            深入探索泰国古老的神话世界。这些故事已经流传了数个世纪，塑造了泰国的文化认同和精神信仰。
          </p>
        </div>

        {/* 添加ref到视频区域 */}
        <section id="video-section" ref={videoSectionRef} className="mb-16">
          <MythologyVideoSection 
            characters={charactersForSelection} 
            videos={videos} 
            initialCharacterId={selectedCharacterId} // 传递当前选中的角色ID
            onCharacterChange={handleCharacterChange} 
          />
        </section>

        {/* Introduction */}
        <section className="mb-16 bg-card border border-border rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-6">泰国神话宇宙</h2>
          <div className="prose prose-lg text-muted-foreground max-w-none">
            <p className="mb-4">
              泰国神话深深植根于古老的宗教信仰和文化传统。其中最重要的是《罗摩衍那》（Ramakien），这是古代印度史诗在泰国的独特改编版本。
            </p>
            <p className="mb-4">
              这些故事不仅仅是娱乐，它们是道德教育的工具，教导人们关于勇气、忠诚、智慧和正义。通过寺庙壁画、古典舞蹈和民间传说，这些神话人物在泰国文化中继续发挥着重要的作用。
            </p>
            <p>
              从女神到战士，从妖怪到凡人，每个角色都代表了人类体验的某个方面，为泰国人民提供了深刻的文化和精神指引。
            </p>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-4">主要人物详情</h2>
          <p className="text-muted-foreground mb-8">以下是当前视频中出现的人物介绍：</p>
          
          {displayedCharacters.length === 0 ? (
            <div className="text-center py-12 bg-card border border-border rounded-lg">
              <p className="text-muted-foreground">暂无相关人物信息</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedCharacters.map((character) => (
                <div
                  key={character.id}
                  className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300"
                >
                  <div className="relative w-full h-56">
                    <Image
                      src={character.image || "/placeholder.svg"}
                      alt={character.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-1">{character.name}</h3>
                    <p className="text-sm text-secondary font-semibold mb-2">{character.thai}</p>
                    <p className="text-sm font-semibold text-muted-foreground mb-3">{character.title}</p>
                    <p className="text-muted-foreground text-sm">{character.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Related Sections */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">相关文化</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/explore/art">
              <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer h-full">
                <Image
                  src="/thai-classical-dance.jpg"
                  alt="Thai Dance"
                  width={200}
                  height={200}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-bold mb-2">古典舞蹈</h3>
                <p className="text-muted-foreground mb-4">通过舞蹈表现神话人物和故事</p>
                <div className="flex items-center text-secondary">
                  更多 <ArrowRight size={16} className="ml-2" />
                </div>
              </div>
            </Link>

            <Link href="/explore/festivals">
              <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer h-full">
                <Image
                  src="/thai-festivals-ceremonies.jpg"
                  alt="Thai Festivals"
                  width={200}
                  height={200}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-bold mb-2">节日庆典</h3>
                <p className="text-muted-foreground mb-4">庆祝与神话相关的重要节日</p>
                <div className="flex items-center text-secondary">
                  更多 <ArrowRight size={16} className="ml-2" />
                </div>
              </div>
            </Link>

            <Link href="/explore/architecture">
              <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer h-full">
                <Image
                  src="/thai-temple-architecture.jpg"
                  alt="Thai Architecture"
                  width={200}
                  height={200}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-bold mb-2">建筑艺术</h3>
                <p className="text-muted-foreground mb-4">寺庙中的神话艺术展现</p>
                <div className="flex items-center text-secondary">
                  更多 <ArrowRight size={16} className="ml-2" />
                </div>
              </div>
            </Link>
          </div>
        </section>
      </main>

      {/* 返回探索按钮 - 放在页面底部，Footer上方 */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 w-full">
        <Link
          href="/explore"
          className="flex items-center justify-center gap-2 text-secondary hover:text-accent transition-colors border border-border rounded-lg px-6 py-3 w-full max-w-xs mx-auto hover:bg-secondary/5"
        >
          <ArrowLeft size={20} />
          返回探索
        </Link>
      </div>

      <Footer />
      <BackButton />
      <ScrollToTop />
    </div>
  )
}