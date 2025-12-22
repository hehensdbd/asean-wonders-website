import Link from "next/link"
import { FileText, Palette, UtensilsCrossed, Map, Users } from "lucide-react"

const culturalItems = [
  {
    id: "news",
    title: "资讯",
    description: "最新的文化活动与旅游信息",
    icon: FileText,
    color: "bg-yellow-100 text-yellow-700",
    href: "/news",
  },
  {
    id: "cultural-products",
    title: "文创",
    description: "原创设计与本地特产",
    icon: Palette,
    color: "bg-pink-100 text-pink-700",
    href: "/cultural-products",
  },
  {
    id: "food",
    title: "美食",
    description: "探索东盟的美食文化",
    icon: UtensilsCrossed,
    color: "bg-orange-100 text-orange-700",
    href: "/explore/food",
  },
  {
    id: "travel",
    title: "旅游",
    description: "地区介绍与路线规划",
    icon: Map,
    color: "bg-green-100 text-green-700",
    href: "/travel",
  },
  {
    id: "community",
    title: "交流",
    description: "用户生成的内容与讨论",
    icon: Users,
    color: "bg-blue-100 text-blue-700",
    href: "/community",
  },
]

export function CulturalGrid() {
  return (
    <section className="py-4 md:py-8">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">快速导航</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {culturalItems.map((item) => {
          const Icon = item.icon
          return (
            <Link key={item.id} href={item.href}>
              <div className="bg-card hover:shadow-lg transition-shadow duration-300 rounded-lg p-6 text-center cursor-pointer border border-border h-full flex flex-col items-center justify-center">
                <div className={`${item.color} p-4 rounded-full mb-4`}>
                  <Icon size={32} />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
