"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

const dishes = [
  {
    id: 1,
    name: "冬阴功汤",
    thai: "Tom Yum Goong (ต้มยำกุ้ง)",
    type: "汤类",
    description: "最著名的泰国汤，以酸、辣、咸、甜四种味道的完美平衡著称。",
    image: "/placeholder.svg?key=food1&height=300&width=300",
    ingredients: ["虾", "柠檬草", "高良姜", "辣椒", "柠檬", "鱼露"],
  },
  {
    id: 2,
    name: "绿咖喱鸡",
    thai: "Gaeng Keow Wan Gai (แกงเขียวหวาน)",
    type: "咖喱类",
    description: "用绿辣椒制成的浓郁咖喱，带有特有的香气和热度。",
    image: "/placeholder.svg?key=food2&height=300&width=300",
    ingredients: ["鸡肉", "绿辣椒", "椰浆", "泰国罗勒", "鱼露"],
  },
  {
    id: 3,
    name: "泰式炒河粉",
    thai: "Pad Thai (ผัดไทย)",
    description: "泰国最受欢迎的面食，结合了酸、甜、咸、辣的完美风味。",
    image: "/placeholder.svg?key=food3&height=300&width=300",
    ingredients: ["河粉", "鸡蛋", "豆芽", "花生", "柠檬", "辣椒"],
  },
  {
    id: 4,
    name: "泰式烤鸡",
    thai: "Gai Yang (ไก่ย่าง)",
    type: "烧烤类",
    description: "用香草和香料腌制后烤制的嫩鸡，风味独特。",
    image: "/placeholder.svg?key=food4&height=300&width=300",
    ingredients: ["鸡肉", "大蒜", "香茅", "泰国罗勒", "鱼露"],
  },
]

export default function FoodPage() {
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">美食风味</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            泰国美食以其独特的风味和精美的呈现闻名于世。发现那些让泰国烹饪成为世界公认的理由的标志性菜肴。
          </p>
        </div>

        {/* Introduction */}
        <section className="mb-16 bg-card border border-border rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-6">泰国烹饪艺术</h2>
          <p className="text-lg text-muted-foreground mb-4">
            泰国美食是东南亚烹饪传统中最具代表性的之一。它巧妙地平衡了四种基本味道：酸、甜、咸和辣，创造出一种独特的烹饪体验。
          </p>
          <p className="text-lg text-muted-foreground mb-4">
            从街头小食到米其林星级餐厅，泰国美食反映了国家丰富的文化遗产和地区多样性。每一道菜都讲述了一个故事，体现了泰国人民对美食的热情。
          </p>
        </section>

        {/* Dishes Grid */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">标志性菜肴</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {dishes.map((dish) => (
              <div
                key={dish.id}
                className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Image */}
                <div className="relative w-full h-64">
                  <Image src={dish.image || "/placeholder.svg"} alt={dish.name} fill className="object-cover" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="inline-block px-2 py-1 bg-secondary/20 text-secondary rounded text-xs font-semibold mb-2">
                    {dish.type}
                  </div>
                  <h3 className="text-2xl font-bold mb-1">{dish.name}</h3>
                  <p className="text-sm text-secondary font-semibold mb-3">{dish.thai}</p>
                  <p className="text-muted-foreground mb-4">{dish.description}</p>

                  <div>
                    <h4 className="font-semibold mb-2">主要材料：</h4>
                    <div className="flex flex-wrap gap-2">
                      {dish.ingredients.map((ingredient, i) => (
                        <span key={i} className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded">
                          {ingredient}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Cooking Experience */}
        <section className="bg-secondary/10 border border-secondary rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-6">烹饪体验</h2>
          <p className="text-lg text-muted-foreground mb-6">
            想要学习如何制作这些美味的泰国菜肴吗？许多旅游目的地提供泰国烹饪课程，让您可以从当地大厨那里学习传统食谱和烹饪技巧。
          </p>
          <Link
            href="/travel"
            className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold"
          >
            探索烹饪旅游
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  )
}
