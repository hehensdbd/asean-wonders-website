"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { MythologyFloatingCards, type MythologyCharacter } from "@/components/mythology-floating-cards"
import { useRouter } from "next/navigation"
import ScrollToTop from "@/components/scroll-to-top"

const mythologyCharacters: MythologyCharacter[] = [
  {
    id: 1,
    name: "南塔尼",
    thai: "Nang Tani (นางทานี)",
    title: "树神女神",
    description: "泰国民间中的诗意女神，是榕树神话中的中心人物。",
    image: "/images/南塔尼1.png",
    detailHref: "/explore/mythology?character=1#video-section", // 添加锚点
  },
  {
    id: 2,
    name: "哈奴曼",
    thai: "Hanuman (หนุมาน)",
    title: "神圣的猴子战士",
    description: "源自《罗摩衍那》的英雄人物，象征忠诚、勇气和智慧。",
    image: "/images/哈奴曼.png",
    detailHref: "/explore/mythology?character=2#video-section", // 添加锚点
  },
  {
    id: 3,
    name: "罗摩",
    thai: "Rama (พระราม)",
    title: "王子与英雄",
    description: "泰国版《罗摩衍那》中的中心人物，代表正义和王权。",
    image: "/images/罗摩.png",
    detailHref: "/explore/mythology?character=3#video-section", // 添加锚点
  },
  {
    id: 4,
    name: "十面魔王",
    thai: "Ravana (ทศกัณฐ)",
    title: "强大的反派",
    description: "泰国罗摩衍那中的主要反派角色，象征邪恶的力量。",
    image: "/images/十面魔王.png",
    detailHref: "/explore/mythology?character=4#video-section", // 添加锚点
  },
  {
    id: 5,
    name: "金娜丽",
    thai: "Kinnari(กินรี)",
    title: "天国歌者与舞者",
    description: "上半身为绝世美女，下半身为天鹅或孔雀的神话生物，以美妙歌喉与舞姿著称。",
    image: "/images/金娜丽.png",
    detailHref: "/explore/mythology?character=5#video-section", // 添加锚点
  },
  {
    id: 6,
    name: "伽鲁达",
    thai: "Garuda (ครุฑ)",
    title: "毗湿奴的坐骑",
    description: "半人半鹰的金翅神鸟，拥有无上神力，是忠诚、力量与速度的化身。",
    image: "/images/伽鲁达.png",
    detailHref: "/explore/mythology?character=6#video-section", // 添加锚点
  },
]

const categories = [
  {
    id: "festivals",
    title: "节日庆典",
    subtitle: "传统文化的璀璨绽放",
    image: "/thai-festivals-songkran.jpg",
    description: "沉浸在泰国最重要的节日庆祝活动中",
    href: "/explore/festivals",
  },
  {
    id: "art",
    title: "艺术表演",
    subtitle: "古老艺术的现代展现",
    image: "/thai-classical-dance-performance.jpg",
    description: "发现泰国丰富的舞蹈、音乐和戏剧传统",
    href: "/explore/art",
  },
  {
    id: "food",
    title: "美食风味",
    subtitle: "舌尖上的东盟",
    image: "/thai-street-food-cuisine.jpg",
    description: "体验独特的泰国烹饪艺术和味道",
    href: "/explore/food",
  },
  {
    id: "architecture",
    title: "建筑古迹",
    subtitle: "历史的建筑见证",
    image: "/thai-ancient-temple-architecture.jpg",
    description: "欣赏精美的泰国建筑杰作和历史遗迹",
    href: "/explore/architecture",
  },
]

export default function ExplorePage() {
  const router = useRouter()

  const handleMythologyCardClick = (character: MythologyCharacter) => {
    // 使用新链接，包含锚点
    router.push(character.detailHref)
  }

  return (
    // 使用组合类名：bg-image-base + 特定页面背景类
    <div className="min-h-screen relative bg-image-base bg-explore">
      {/* 添加遮罩层 - 根据需求选择透明度 */}
      <div className="bg-overlay overlay-dark-5"></div>
      
      {/* 内容区域 */}
      <div className="bg-content">
        <Navigation />

        <main className="max-w-7xl mx-auto px-4 md:px-6 py-12">
          {/* Hero Section */}
          <div className="mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">探索泰国文化</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              发现东盟万象中最迷人的文化瑰宝。从古老的神话到现代的艺术表演，每一页都讲述了一个独特的故事。
            </p>
          </div>


        <div className="mb-32 space-y-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">神话传说</h2>
            <p className="text-muted-foreground mb-6">探索泰国古老的神话人物和传说故事</p>
          </div>
          <div className="relative">
            <MythologyFloatingCards characters={mythologyCharacters} onCardClick={handleMythologyCardClick} />
            <div className="absolute -bottom-20 right-0"> 
              <Link href="/explore/mythology"> 
                <button className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold">
                立即探索 <ArrowRight size={20} /> 
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="space-y-16">
          {categories
            .filter((cat) => cat.id !== "mythology")
            .map((category, index) => (
              <Link key={category.id} href={category.href}>
                <div
                  className={`flex flex-col ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  } gap-8 items-center hover:opacity-90 transition-opacity cursor-pointer 
                  py-8 ${index < categories.length - 1 ? 'border-b border-gray-200' : ''}`} 
                >
                  {/* Image */}
                  <div className="flex-1">
                    <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden bg-muted">
                      <Image
                        src={category.image || "/placeholder.svg"}
                        alt={category.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="inline-block px-3 py-1 bg-secondary/20 text-secondary rounded-full text-sm font-semibold mb-4">
                      {category.subtitle}
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">{category.title}</h2>
                    <p className="text-lg text-muted-foreground mb-6">{category.description}</p>
                    <button className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold">
                      立即探索 <ArrowRight size={20} />
                    </button>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </main>

      <Footer />

      <ScrollToTop />
     </div>
    </div>
  )
}
