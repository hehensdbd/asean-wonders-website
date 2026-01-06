"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import Image from "next/image"
import { MapPin, Clock, Users, ArrowRight, Calendar } from "lucide-react"
import { ScrollToTop } from "@/components/scroll-to-top"

const destinations = [
  {
    id: 1,
    name: "曼谷",
    thai: "Bangkok (กรุงเทพ)",
    image: "/images/曼谷.png",
    description: "泰国的首都，融合了现代与传统，拥有著名的寺庙和充满活力的夜生活。",
    highlights: ["大皇宫", "玉佛寺", "唐人街", "浮动市场"],
    bestTime: "11月-2月",
  },
  {
    id: 2,
    name: "清迈",
    thai: "Chiang Mai (เชียงใหม่)",
    image: "/images/清迈.png",
    description: "北方文化中心，以其古老的寺庙、清新的空气和友善的人民著称。",
    highlights: ["古城老城", "素贴寺", "周日夜市", "丛林象营"],
    bestTime: "11月-2月",
  },
  {
    id: 3,
    name: "普吉岛",
    thai: "Phuket (ภูเก็ต)",
    image: "/images/普吉岛.png",
    description: "泰国最大的岛屿，以其美丽的海滩、水上运动和夜生活著称。",
    highlights: ["卡塔海滩", "皮皮岛", "大佛像", "夜间巴刹"],
    bestTime: "12月-2月",
  },
  {
    id: 4,
    name: "素可泰",
    thai: "Sukhothai (สุโขทัย)",
    image: "/images/素可泰.png",
    description: "泰国古老王国的遗址，拥有众多历史寺庙和考古遗迹。",
    highlights: ["历史公园", "古寺庙", "文物博物馆", "传统手工艺"],
    bestTime: "11月-1月",
  },
]

const tours = [
  {
    id: 1,
    name: "经典泰国7日游",
    destinations: "曼谷 → 清迈",
    duration: "7天6晚",
    groupSize: "2-8人",
    price: "¥3,999",
    image: "/images/旅游套餐1.png",
    description: "完整体验泰国文化、美食和自然风光的经典路线。",
  },
  {
    id: 2,
    name: "海岛度假5日游",
    destinations: "曼谷 → 普吉岛",
    duration: "5天4晚",
    groupSize: "2-10人",
    price: "¥2,999",
    image: "/images/旅游套餐2.png",
    description: "享受阳光、海滩和水上冒险的完美假期。",
  },
  {
    id: 3,
    name: "文化遗产深度游",
    destinations: "曼谷 → 素可泰 → 清迈",
    duration: "9天8晚",
    groupSize: "4-12人",
    price: "¥4,999",
    image: "/images/旅游套餐3.png",
    description: "探索泰国历史文化，参观古迹和传统工坊。",
  },
]

export default function TravelPage() {
  return (
    // 添加背景容器 - 使用旅游页面的背景类
    <div className="min-h-screen relative bg-image-base bg-travel">
      {/* 添加遮罩层 - 旅游页面通常需要稍高的透明度以提高文字可读性 */}
      <div className="bg-overlay overlay-dark-10"></div>
      
      {/* 内容区域 */}
      <div className="bg-content">
        <Navigation />

        <main className="max-w-7xl mx-auto px-4 md:px-6 py-12">
          {/* Hero Section */}
          <div className="mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">泰国旅游</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              发现泰国最迷人的目的地，体验独特的文化、美食和自然风光。我们提供精心设计的旅游路线，让您深入了解泰国。
            </p>
          </div>

          {/* Featured Destinations */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8">热门目的地</h2>
            <div className="space-y-12">
              {destinations.map((dest, index) => (
                <div
                  key={dest.id}
                  className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-8 items-stretch`}
                >
                  {/* Image */}
                  <div className="flex-1">
                    <div className="relative w-full h-80 rounded-lg overflow-hidden bg-muted">
                      <Image src={dest.image || "/placeholder.svg"} alt={dest.name} fill className="object-cover" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col justify-center">
                    <div className="inline-block w-fit px-3 py-1 bg-secondary/20 text-secondary rounded-full text-sm font-semibold mb-4">
                      {dest.thai}
                    </div>
                    <h3 className="text-3xl font-bold mb-2">{dest.name}</h3>
                    <p className="text-lg text-muted-foreground mb-6">{dest.description}</p>

                    <div className="mb-6">
                      <h4 className="font-semibold mb-3">主要景点：</h4>
                      <div className="flex flex-wrap gap-2">
                        {dest.highlights.map((highlight, i) => (
                          <span key={i} className="px-3 py-1 bg-muted text-muted-foreground text-sm rounded-full">
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
                      <div className="flex items-center gap-2">
                        <Calendar size={18} />
                        <span>最佳时期：{dest.bestTime}</span>
                      </div>
                    </div>

                    <button className="w-fit inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold">
                      详细了解 <ArrowRight size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Tour Packages */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8">旅游套餐</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {tours.map((tour) => (
                <div
                  key={tour.id}
                  className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {/* Image */}
                  <div className="relative w-full h-48">
                    <Image src={tour.image || "/placeholder.svg"} alt={tour.name} fill className="object-cover" />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{tour.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{tour.description}</p>

                    {/* Details */}
                    <div className="space-y-3 mb-6 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <MapPin size={16} />
                        <span>{tour.destinations}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={16} />
                        <span>{tour.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users size={16} />
                        <span>{tour.groupSize}</span>
                      </div>
                    </div>

                    {/* Price and Action */}
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <span className="text-2xl font-bold text-primary">{tour.price}</span>
                      <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold">
                        预定
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Travel Tips */}
          <section className="bg-card border border-border rounded-lg p-8">
            <h2 className="text-3xl font-bold mb-6">旅游小贴士</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold mb-4">最佳旅游时间</h3>
                <p className="text-muted-foreground mb-4">
                  泰国的最佳旅游季节是11月至2月，气候凉爽干燥。3月至5月天气炎热，6月至10月是雨季。
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-4">旅游须知</h3>
                <p className="text-muted-foreground mb-4">
                  需要有效护照。大多数游客可以获得30天的落地签。学会基本泰语短语会增强旅行体验。
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-4">交通方式</h3>
                <p className="text-muted-foreground mb-4">
                  泰国有良好的公共交通系统，包括飞机、火车、长途汽车和水上出租车。出租车和摩托出租也很便宜。
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-4">文化礼仪</h3>
                <p className="text-muted-foreground mb-4">
                  进入寺庙要脱鞋。对国王表示尊重。给小费是常见习惯。学会基本的泰国问候会让人欣赏。
                </p>
              </div>
            </div>
          </section>
        </main>

        <Footer />
        <ScrollToTop />
      </div>
    </div>
  )
}