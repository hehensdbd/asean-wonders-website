"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar } from "lucide-react"

const festivals = [
  {
    id: 1,
    name: "宋干节（泼水节）",
    thai: "Songkran (สงกรานต์)",
    date: "每年4月13-15日",
    description: '泰国最重要的新年节庆，也被称为"泼水节"，象征清洁和新的开始。',
    image: "/thai-songkran-water-festival.jpg",
    details:
      "宋干节是泰国古老的新年庆祝活动。人们互相泼水以祝福彼此，这个传统象征清洁过去和迎接新的一年。整个城镇都充满了欢笑、水和欢乐的气氛。",
    traditions: ["互相泼水", "赤脚行走", "撒香粉", "进行沙粒堆建活动"],
  },
  {
    id: 2,
    name: "洛叻节（水灯节）",
    thai: "Loy Krathong (ลอยกระทง)",
    date: "每年11月（月圆之夜）",
    description: "人们在河中放置漂浮的灯笼，象征放下过去的烦恼，迎接美好的未来。",
    image: "/thai-loy-krathong-floating-lanterns.jpg",
    details:
      "洛叻节是泰国最浪漫的节日之一。人们在夜晚制作精美的水灯（通常用香蕉叶和蜡烛制成），然后将它们放入水中。这个传统象征着放下悲伤和迎接新的希望。",
    traditions: ["制作水灯", "放入河中", "许愿", "放天灯"],
  },
  {
    id: 3,
    name: "毗湿奴节（火箭节）",
    thai: "Bun Bangsai (บุญบั้งไฟ)",
    date: "每年5月（旱季）",
    description: "东北地区的传统节日，人们制作和发射竹制火箭以祈求下雨。",
    image: "/thai-bun-bang-fai-rocket-festival.jpg",
    details:
      "这个节日起源于东北地区，用来祈求雨季的到来。人们制作装饰精美的竹火箭，然后在节日庆典上发射它们。这个节日充满了音乐、舞蹈和热烈的气氛。",
    traditions: ["制作竹火箭", "游行展示", "音乐舞蹈", "发射火箭"],
  },
  {
    id: 4,
    name: "水灯节庆典",
    thai: "Visakha Bucha (วิสาขบูชา)",
    date: "每年5月（月圆之夜）",
    description: "佛教重要节日，纪念佛祖的诞生、得道和涅槃。",
    image: "/placeholder.svg?key=fest4&height=400&width=300",
    details:
      "毗湿奴节是泰国最重要的佛教节日之一。信徒们聚集在寺庙中进行冥想、诵经和烛光游行，以纪念佛祖释迦牟尼的诞生、成道和涅槃。",
    traditions: ["寺庙礼拜", "烛光游行", "诵经活动", "布施"],
  },
]

export default function FestivalsPage() {
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">节日庆典</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            泰国全年都充满了色彩斑斓的节日庆祝活动。从传统的泼水节到浪漫的水灯节，每个节日都讲述了泰国文化和精神信仰的故事。
          </p>
        </div>

        {/* Festivals */}
        <div className="space-y-16">
          {festivals.map((festival, index) => (
            <section
              key={festival.id}
              className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-8 items-stretch`}
            >
              {/* Image */}
              <div className="flex-1">
                <div className="relative w-full h-80 rounded-lg overflow-hidden bg-muted">
                  <Image src={festival.image || "/placeholder.svg"} alt={festival.name} fill className="object-cover" />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col justify-center">
                <div className="inline-block w-fit px-3 py-1 bg-secondary/20 text-secondary rounded-full text-sm font-semibold mb-4">
                  {festival.thai}
                </div>
                <h2 className="text-3xl font-bold mb-2">{festival.name}</h2>
                <div className="flex items-center gap-2 text-muted-foreground mb-4">
                  <Calendar size={18} />
                  <span>{festival.date}</span>
                </div>
                <p className="text-lg mb-6">{festival.description}</p>
                <p className="text-muted-foreground mb-6">{festival.details}</p>

                <div>
                  <h3 className="font-semibold mb-3">传统活动：</h3>
                  <ul className="space-y-2">
                    {festival.traditions.map((tradition, i) => (
                      <li key={i} className="flex items-center gap-2 text-muted-foreground">
                        <span className="w-2 h-2 bg-secondary rounded-full" />
                        {tradition}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* Related Sections */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold mb-8">相关文化体验</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href="/explore/food">
              <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer h-full">
                <Image
                  src="/placeholder.svg?key=food&height=200&width=200"
                  alt="Festival Food"
                  width={200}
                  height={200}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-bold mb-2">节日美食</h3>
                <p className="text-muted-foreground">品尝节日期间的传统小食和特色菜肴</p>
              </div>
            </Link>

            <Link href="/explore/art">
              <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer h-full">
                <Image
                  src="/placeholder.svg?key=art&height=200&width=200"
                  alt="Festival Performances"
                  width={200}
                  height={200}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-bold mb-2">节日表演</h3>
                <p className="text-muted-foreground">欣赏节日期间的舞蹈、音乐和文化表演</p>
              </div>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
