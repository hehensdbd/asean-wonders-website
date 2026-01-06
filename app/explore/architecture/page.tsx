"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Building2 } from "lucide-react"
import { ScrollToTop } from "@/components/scroll-to-top"
import { BackButton } from "@/components/back-button"

const sites = [
  {
    id: 1,
    name: "玉佛寺",
    thai: "Wat Phra Kaew (วัดพระแก้ว)",
    location: "曼谷",
    period: "建于18世纪",
    description: "泰国最神圣的寺庙，收藏著著名的翡翠玉佛。",
    image: "/images/玉佛寺.png",
    details:
      "玉佛寺是泰国最重要的寺庙，也是国王的私人礼拜场所。这座寺庙以其精美的建筑和收藏著著名的翡翠玉佛而闻名。寺庙的建筑风格结合了泰国古典建筑的所有元素。",
  },
  {
    id: 2,
    name: "大皇宫",
    thai: "Grand Palace (พระบรมมหาราชวัง)",
    location: "曼谷",
    period: "建于1782年",
    description: "泰国国王的官方住所，以其华丽的建筑和复杂的装饰著称。",
    image: "/images/大皇宫.png",
    details:
      "大皇宫是泰国最著名的地标之一。这座宏伟的建筑群包括多个建筑，展示了泰国建筑的最高成就。其复杂的细节工作和金色的装饰使其成为一个真正的艺术杰作。",
  },
  {
    id: 3,
    name: "素可泰历史公园",
    thai: "Sukhothai Historical Park (สุโขทัยทางประวัติศาสตร์)",
    location: "素可泰",
    period: "13-15世纪",
    description: "泰国最重要的历史遗址之一，包含众多寺庙遗迹。",
    image: "/images/素可泰.png",
    details:
      "素可泰历史公园是泰国古老王国的中心。这个公园包含了超过40个寺庙遗迹，反映了素可泰时期的建筑成就和艺术风格。这些遗迹提供了对泰国历史和文化的深刻洞察。",
  },
  {
    id: 4,
    name: "清迈古城",
    thai: "Chiang Mai Old City (เมืองเก่าเชียงใหม่)",
    location: "清迈",
    period: "建于1296年",
    description: "北部古城，拥有许多历史寺庙和古建筑。",
    image: "/images/清迈古城新闻.png",
    details:
      "清迈古城是泰国北方文化的心脏。这座古城保留了许多寺庙和传统建筑，反映了Lanna王国的建筑风格。漫步在古城的街道上，您可以感受到几个世纪的历史和文化。",
  },
]

export default function ArchitecturePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-12 flex-1">
        {/* Hero Section */}
        <div className="mb-16">
          <div className="inline-block px-3 py-1 bg-secondary/20 text-secondary rounded-full text-sm font-semibold mb-4">
            探索泰国文化
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">建筑古迹</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            发现泰国辉煌的建筑遗产。这些神圣的寺庙和宏伟的建筑见证了泰国几个世纪的历史和文化演进。
          </p>
        </div>

        {/* Architecture Sites */}
        <div className="space-y-16">
          {sites.map((site, index) => (
            <section
              key={site.id}
              className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-8 items-stretch`}
            >
              {/* Image */}
              <div className="flex-1">
                <div className="relative w-full h-80 rounded-lg overflow-hidden bg-muted">
                  <Image src={site.image || "/placeholder.svg"} alt={site.name} fill className="object-cover" />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col justify-center">
                <div className="inline-block w-fit px-3 py-1 bg-secondary/20 text-secondary rounded-full text-sm font-semibold mb-4">
                  {site.thai}
                </div>
                <h2 className="text-3xl font-bold mb-2">{site.name}</h2>
                <div className="flex items-center gap-4 text-muted-foreground mb-4 text-sm">
                  <span className="flex items-center gap-1">
                    <Building2 size={16} />
                    {site.location}
                  </span>
                  <span>•</span>
                  <span>{site.period}</span>
                </div>
                <p className="text-lg font-semibold text-muted-foreground mb-4">{site.description}</p>
                <p className="text-muted-foreground">{site.details}</p>
              </div>
            </section>
          ))}
        </div>

        {/* Architectural Elements */}
        <section className="mt-16 bg-card border border-border rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-6">泰国建筑特色</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">建筑元素</h3>
              <ul className="space-y-2">
                {["尖形屋顶", "金色装饰", "复杂的雕刻", "柱子设计", "台阶安排", "对称布局"].map((element, i) => (
                  <li key={i} className="flex items-center gap-2 text-muted-foreground">
                    <span className="w-2 h-2 bg-secondary rounded-full" />
                    {element}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">工艺技术</h3>
              <ul className="space-y-2">
                {["木雕工艺", "石刻雕刻", "陶土装饰", "金箔应用", "玻璃镶嵌", "瓷砖拼贴"].map((technique, i) => (
                  <li key={i} className="flex items-center gap-2 text-muted-foreground">
                    <span className="w-2 h-2 bg-secondary rounded-full" />
                    {technique}
                  </li>
                ))}
              </ul>
            </div>
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