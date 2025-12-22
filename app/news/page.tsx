"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import Image from "next/image"
import { Calendar, User, ArrowRight } from "lucide-react"

const newsArticles = [
  {
    id: 1,
    title: "泰国宋干节庆典即将开始，全国欢庆新年",
    date: "2025-04-08",
    author: "泰国文化局",
    category: "节日",
    image: "/placeholder.svg?key=news1&height=400&width=600",
    excerpt:
      "泰国今年的宋干节将于4月13日至15日举行。这个传统的泼水节庆典将在全国各地举行，游客可以体验泼水、赤脚行走和撒香粉等传统活动。",
    content: "宋干节是泰国最重要的文化节日，标志着泰国新年的到来。今年的庆祝活动预计吸引来自世界各地的数百万游客...",
  },
  {
    id: 2,
    title: "清迈古城被列为UNESCO世界遗产预备地",
    date: "2025-03-15",
    author: "文化部",
    category: "文化",
    image: "/placeholder.svg?key=news2&height=400&width=600",
    excerpt:
      "泰国文化部宣布清迈古城已被列为UNESCO世界遗产的候选地。这个有700多年历史的古城以其众多寺庙和传统建筑而闻名。",
    content: "清迈古城拥有丰富的文化遗产，包括300多座寺庙和传统的Lanna建筑风格...",
  },
  {
    id: 3,
    title: "泰国美食节在曼谷举办，聚集全国顶级厨师",
    date: "2025-02-20",
    author: "旅游局",
    category: "美食",
    image: "/placeholder.svg?key=news3&height=400&width=600",
    excerpt: "第三届泰国美食节在曼谷市中心举办，汇集了来自全国各地的最佳泰国美食。超过100位著名厨师参展。",
    content: "这个年度盛事展示了泰国美食的多样性和创新精神，从街头小食到高端料理...",
  },
  {
    id: 4,
    title: "泰国传统手工艺展览在国际舞台上获奖",
    date: "2025-02-10",
    author: "艺术基金会",
    category: "艺术",
    image: "/placeholder.svg?key=news4&height=400&width=600",
    excerpt: "泰国的传统手工艺展览在国际手工艺博览会上获得金奖。展览展示了泰国陶瓷、丝绸和木雕的精湛工艺。",
    content: "这个展览汇集了来自全泰国60多位工匠的作品，展示了几个世纪的工艺传统...",
  },
]

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        {/* Hero Section */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">最新资讯</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">关注泰国文化、旅游和活动的最新动态。</p>
        </div>

        {/* Featured Article */}
        <section className="mb-16">
          <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
            <div className="flex flex-col md:flex-row">
              <div className="relative w-full md:w-2/5 h-64 md:h-auto">
                <Image
                  src={newsArticles[0].image || "/placeholder.svg"}
                  alt={newsArticles[0].title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-8 flex-1 flex flex-col justify-center">
                <div className="inline-block w-fit px-3 py-1 bg-secondary/20 text-secondary rounded text-xs font-semibold mb-3">
                  {newsArticles[0].category}
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-3">{newsArticles[0].title}</h2>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar size={16} />
                    {new Date(newsArticles[0].date).toLocaleDateString("zh-CN")}
                  </span>
                  <span className="flex items-center gap-1">
                    <User size={16} />
                    {newsArticles[0].author}
                  </span>
                </div>
                <p className="text-muted-foreground mb-4">{newsArticles[0].excerpt}</p>
                <button className="w-fit inline-flex items-center gap-2 text-secondary hover:text-accent transition-colors font-semibold">
                  阅读全文 <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* News Grid */}
        <section>
          <h2 className="text-3xl font-bold mb-8">其他资讯</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {newsArticles.slice(1).map((article) => (
              <div
                key={article.id}
                className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              >
                {/* Image */}
                <div className="relative w-full h-48">
                  <Image src={article.image || "/placeholder.svg"} alt={article.title} fill className="object-cover" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="inline-block px-3 py-1 bg-secondary/20 text-secondary rounded text-xs font-semibold mb-3">
                    {article.category}
                  </div>
                  <h3 className="text-xl font-bold mb-2 line-clamp-2">{article.title}</h3>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {new Date(article.date).toLocaleDateString("zh-CN")}
                    </span>
                    <span className="flex items-center gap-1">
                      <User size={14} />
                      {article.author}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{article.excerpt}</p>
                  <button className="text-secondary hover:text-accent transition-colors font-semibold text-sm">
                    了解更多 →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
