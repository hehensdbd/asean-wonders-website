"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Music } from "lucide-react"

const artForms = [
  {
    id: 1,
    name: "古典舞蹈",
    thai: "Khon (โขน)",
    description: "泰国最高雅的古典舞蹈形式，通常表演古代史诗和神话故事。",
    image: "/placeholder.svg?key=art1&height=400&width=300",
    details:
      "古典舞蹈（Khon）是泰国最古老和最复杂的舞蹈形式。舞者穿着精美的传统服装和面具，通过精确的手势和身体运动来讲述故事，特别是《罗摩衍那》中的故事。",
    characteristics: ["精美的面具", "复杂的手势", "传统服装", "传统音乐"],
  },
  {
    id: 2,
    name: "民间舞蹈",
    thai: "Ram Thai (รำไทย)",
    description: "不同地区的传统民间舞蹈，各具特色，反映了地方文化。",
    image: "/placeholder.svg?key=art2&height=400&width=300",
    details:
      "泰国各地都有独特的民间舞蹈传统。从东北地区的Isaan舞到北方的Lanna舞，每个地区都有自己独特的舞蹈风格和音乐节奏，反映了该地区的文化特色。",
    characteristics: ["区域特色", "传统音乐", "群舞", "故事叙述"],
  },
  {
    id: 3,
    name: "传统音乐",
    thai: "Pipat (ปี่พาทย์)",
    description: "泰国古老的管乐和打击乐组合，常在庆典和仪式中演奏。",
    image: "/placeholder.svg?key=art3&height=400&width=300",
    details:
      "泰国传统音乐使用各种传统乐器，包括竹制长笛（Pipat）、鼓和其他打击乐器。这些音乐形式已有数个世纪的历史，是泰国文化认同的重要组成部分。",
    characteristics: ["竹笛演奏", "鼓声节奏", "传统乐器", "仪式用途"],
  },
  {
    id: 4,
    name: "木偶戏",
    thai: "Nang Talung (หนังตะลุง)",
    description: "皮影戏的一种形式，使用剪影和灯光在屏幕上讲述故事。",
    image: "/placeholder.svg?key=art4&height=400&width=300",
    details:
      "泰国皮影戏是一种古老的艺术形式，艺人操纵皮制的人物剪影，在灯光下投射在屏幕上。通过这种方式讲述故事、传说和民间传说，为观众提供娱乐和教育。",
    characteristics: ["皮制剪影", "灯光投射", "手工操纵", "故事讲述"],
  },
]

export default function ArtPage() {
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">艺术表演</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            泰国拥有丰富而多样的艺术表演传统。从精美的古典舞蹈到充满活力的民间艺术，每种形式都是泰国文化遗产的重要组成部分。
          </p>
        </div>

        {/* Art Forms */}
        <div className="space-y-16">
          {artForms.map((art, index) => (
            <section
              key={art.id}
              className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-8 items-stretch`}
            >
              {/* Image */}
              <div className="flex-1">
                <div className="relative w-full h-80 rounded-lg overflow-hidden bg-muted">
                  <Image src={art.image || "/placeholder.svg"} alt={art.name} fill className="object-cover" />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col justify-center">
                <div className="inline-block w-fit px-3 py-1 bg-secondary/20 text-secondary rounded-full text-sm font-semibold mb-4">
                  {art.thai}
                </div>
                <h2 className="text-3xl font-bold mb-2">{art.name}</h2>
                <p className="text-lg font-semibold text-muted-foreground mb-4">{art.description}</p>
                <p className="text-muted-foreground mb-6">{art.details}</p>

                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Music size={18} />
                    特点：
                  </h3>
                  <ul className="space-y-2">
                    {art.characteristics.map((char, i) => (
                      <li key={i} className="flex items-center gap-2 text-muted-foreground">
                        <span className="w-2 h-2 bg-secondary rounded-full" />
                        {char}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* Video Section */}
        <section className="mt-16 bg-card border border-border rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-6">表演视频</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-muted rounded-lg h-64 flex items-center justify-center hover:bg-muted/80 transition-colors"
              >
                <Music size={48} className="text-muted-foreground" />
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
