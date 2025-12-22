"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import type { MythologyCharacter } from "@/components/mythology-carousel"
import { MythologyVideoSection, type MythologyVideo } from "@/components/mythology-video-section"

const characters: MythologyCharacter[] = [
  {
    id: 1,
    name: "南塔尼",
    thai: "Nang Tani (นางทานี)",
    title: "树神女神",
    description: "泰国民间中的诗意女神，是榕树神话中的中心人物。她象征着自然的神圣与女性的魅力。",
    image: "/thai-mythology-goddess-nang-tani.jpg",
  },
  {
    id: 2,
    name: "哈奴曼",
    thai: "Hanuman (หนุมาน)",
    title: "神圣的猴子战士",
    description: "源自《罗摩衍那》的英雄人物，象征忠诚、勇气和智慧。在泰国文化中被广泛崇拜。",
    image: "/thai-mythology-hanuman-monkey-warrior.jpg",
  },
  {
    id: 3,
    name: "罗摩",
    thai: "Rama (พระราม)",
    title: "王子与英雄",
    description: "泰国版《罗摩衍那》（Ramakien）中的中心人物，代表正义和王权。",
    image: "/thai-mythology-prince-rama.jpg",
  },
  {
    id: 4,
    name: "十面魔王",
    thai: "Ravana (ทศกัณฐ)",
    title: "强大的反派",
    description: "泰国罗摩衍那中的主要反派角色，象征邪恶的力量和欲望。",
    image: "/thai-mythology-ravana-demon-king.jpg",
  },
  {
    id: 5,
    name: "娜娜",
    thai: "Nang Nana (นางนนา)",
    title: "高贵的女性战士",
    description: "泰国神话中的女性英雄，以其智慧、勇气和高贵的品质闻名。她象征女性的力量和独立精神。",
    image: "/thai-mythology-nang-nana.jpg",
  },
  {
    id: 6,
    name: "拉玛",
    thai: "Rama (พระลาหม)",
    title: "命运的守护者",
    description: "泰国民间传说中的神秘人物，被认为是命运的引导者和变革的象征。",
    image: "/thai-mythology-rama-guardian.jpg",
  },
]

const videos: MythologyVideo[] = [
  {
    id: 1,
    characterId: 1,
    title: "南塔尼：树神的爱情故事",
    description:
      "探索关于南塔尼的经典民间故事。这个视频讲述了美丽的树神与凡人之间的爱情传说，以及她如何成为榕树的保护神。",
    duration: "12:34",
    thumbnail: "/placeholder.svg?key=video1",
  },
  {
    id: 2,
    characterId: 1,
    title: "泰国民间中的南塔尼信仰",
    description: "了解泰国人民如何崇拜南塔尼，以及这个女神在现代泰国文化中的重要性。",
    duration: "18:45",
    thumbnail: "/placeholder.svg?key=video2",
  },
  {
    id: 3,
    characterId: 2,
    title: "哈奴曼：忠诚的象征",
    description: "深入了解哈奴曼的史诗冒险，他如何帮助罗摩拯救妻子，以及他在泰国古典舞蹈中的表现。",
    duration: "22:15",
    thumbnail: "/placeholder.svg?key=video3",
  },
  {
    id: 4,
    characterId: 2,
    title: "泰国舞蹈中的哈奴曼",
    description: "观看传统泰国古典舞蹈如何演绎哈奴曼的英勇故事和复杂的动作编排。",
    duration: "15:20",
    thumbnail: "/placeholder.svg?key=video4",
  },
  {
    id: 5,
    characterId: 3,
    title: "罗摩衍那：泰国版本的史诗",
    description: "了解《罗摩衍那》如何在泰国得到改编和演绎，以及罗摩作为理想王子的象征意义。",
    duration: "25:40",
    thumbnail: "/placeholder.svg?key=video5",
  },
  {
    id: 6,
    characterId: 3,
    title: "罗摩的道德教训",
    description: "探索罗摩的故事如何传递道德和伦理价值观，影响了几个世纪的泰国教育。",
    duration: "19:30",
    thumbnail: "/placeholder.svg?key=video6",
  },
  {
    id: 7,
    characterId: 4,
    title: "十面魔王的权力与野心",
    description: "分析十面魔王作为反派角色的复杂性，以及他如何代表罗摩衍那中的邪恶力量。",
    duration: "20:15",
    thumbnail: "/placeholder.svg?key=video7",
  },
  {
    id: 8,
    characterId: 4,
    title: "善恶之争：十面魔王的故事",
    description: "通过十面魔王的视角探索泰国神话中关于善与恶的永恒主题。",
    duration: "17:50",
    thumbnail: "/placeholder.svg?key=video8",
  },
  {
    id: 9,
    characterId: 5,
    title: "娜娜：女性战士的传说",
    description: "探索泰国神话中的女性英雄娜娜的故事。这个视频讲述了她如何通过智慧和勇气赢得尊重。",
    duration: "16:20",
    thumbnail: "/placeholder.svg?key=video9",
  },
  {
    id: 10,
    characterId: 5,
    title: "娜娜与古代泰国女性权力",
    description: "了解娜娜如何代表泰国文化中女性的力量和地位。",
    duration: "14:30",
    thumbnail: "/placeholder.svg?key=video10",
  },
  {
    id: 11,
    characterId: 6,
    title: "拉玛：命运之书",
    description: "深入探索神秘的拉玛形象如何在泰国民间传说和现代文化中发挥重要作用。",
    duration: "19:45",
    thumbnail: "/placeholder.svg?key=video11",
  },
  {
    id: 12,
    characterId: 6,
    title: "拉玛与命运的转变",
    description: "揭示拉玛如何作为命运的守护者影响泰国人民的精神信仰。",
    duration: "18:00",
    thumbnail: "/placeholder.svg?key=video12",
  },
]

export default function MythologyPage() {
  const searchParams = useSearchParams()
  const characterId = searchParams.get("character")

  const initialCharacter = characterId ? characters.find((c) => c.id === Number.parseInt(characterId)) : characters[0]

  const [selectedCharacter, setSelectedCharacter] = useState<MythologyCharacter>(initialCharacter || characters[0])

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link
            href="/explore"
            className="flex items-center gap-2 text-secondary hover:text-accent transition-colors mb-6"
          >
            <ArrowLeft size={20} />
            返回探索
          </Link>
        </div>

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

        <section className="mb-16">
          <MythologyVideoSection character={selectedCharacter} videos={videos} />
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

        {/* Characters Grid */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">主要人物详情</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {characters.map((character) => (
              <div
                key={character.id}
                className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative w-full h-64">
                  <Image
                    src={character.image || "/placeholder.svg"}
                    alt={character.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-1">{character.name}</h3>
                  <p className="text-sm text-secondary font-semibold mb-3">{character.thai}</p>
                  <p className="text-sm font-semibold text-muted-foreground mb-4">{character.title}</p>
                  <p className="text-muted-foreground">{character.description}</p>
                </div>
              </div>
            ))}
          </div>
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

      <Footer />
    </div>
  )
}
