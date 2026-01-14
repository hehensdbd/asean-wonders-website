"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import Image from "next/image"
import Link from "next/link"
import { ScrollToTop } from "@/components/scroll-to-top"
import { BackButton } from "@/components/back-button"
import { ShoppingCart, Heart, ArrowLeft, Star } from "lucide-react"
import { useState } from "react"

const products = [
  {
    id: 1,
    name: "泰国传统丝绸围巾",
    category: "纺织品",
    price: "¥299",
    rating: 4.8,
    reviews: 156,
    image: "/images/泰国丝绸围巾.png",
    description: "手工制作的传统泰国丝绸围巾，采用传统染料和编织技术。",
  },
  {
    id: 2,
    name: "金箔陶瓷器皿",
    category: "工艺品",
    price: "¥599",
    rating: 4.9,
    reviews: 89,
    image: "/images/金箔陶瓷器皿.png",
    description: "精美的手工陶瓷餐具，装饰有传统泰国图案和金箔。",
  },
  {
    id: 3,
    name: "木雕佛像",
    category: "工艺品",
    price: "¥899",
    rating: 5.0,
    reviews: 124,
    image: "/images/木雕佛像.png",
    description: "用柚木手工雕刻的精美佛像，体现泰国工艺的精湛技艺。",
  },
  {
    id: 4,
    name: "香茅精油套装",
    category: "护理产品",
    price: "¥199",
    rating: 4.7,
    reviews: 203,
    image: "/images/香茅精油套装.png",
    description: "用传统泰国香草和精油制成的护理产品套装。",
  },
  {
    id: 5,
    name: "传统竹编包",
    category: "配饰",
    price: "¥449",
    rating: 4.6,
    reviews: 87,
    image: "/images/传统竹编包.png",
    description: "用竹子手工编制的传统泰国背包，独特且实用。",
  },
  {
    id: 6,
    name: "泰式少女一周幸运色系列手办盲盒摆件礼物",
    category: "文创产品",
    price: "¥58.8",
    rating: 5.0,
    reviews: 124,
    image: "/images/IP2.jpg",
    description: "泰式少女，装点美好生活",
  },
  {
    id: 7,
    name: "THAI STYLE COLLECTION系列文创",
    category: "文创产品",
    price: "¥12-99",
    rating: 4.8,
    reviews: 156,
    image: "/images/IP1.jpg",
    description: "寻泰国风情，拾异域美好。",
  },
  {
    id: 8,
    name: "泰国少女可爱贴纸高颜值IP周边手账DIY防水贴纸",
    category: "文创产品",
    price: "¥8.8",
    rating: 4.9,
    reviews: 142,
    image: "/images/IP3.jpg",
    description: "手账里的打工人一周情绪搭子，每天状态贴贴贴！",
  },
  {
    id: 9,
    name: "暹罗猫陶瓷摆件",
    category: "工艺品",
    price: "¥349",
    rating: 4.9,
    reviews: 142,
    image: "/images/暹罗猫陶瓷摆件.png",
    description: "精美的陶瓷暹罗猫摆件，是泰国文化的象征。",
  },
]

const categories = ["全部", "文创产品","纺织品", "工艺品", "护理产品", "配饰"]

export default function CreativeProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("全部")
  const [favorites, setFavorites] = useState<number[]>([])

  const filteredProducts =
    selectedCategory === "全部" ? products : products.filter((p) => p.category === selectedCategory)

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]))
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        {/* Back Link */}
        <Link
          href="/cultural-products"
          className="flex items-center gap-2 text-secondary hover:text-accent transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          返回
        </Link>

        {/* Hero Section */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">文创产品</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            发现融合传统工艺与现代设计的创意产品。每件物品都代表了泰国文化的深厚底蕴和工匠的精湛技艺。
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full font-semibold transition-colors ${
                selectedCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border text-foreground hover:border-primary"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative w-full h-64 bg-muted group">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform"
                />
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className="absolute top-3 right-3 p-2 bg-white/90 rounded-full hover:bg-white transition-colors z-10"
                >
                  <Heart
                    size={20}
                    className={favorites.includes(product.id) ? "fill-red-500 text-red-500" : "text-foreground"}
                  />
                </button>
              </div>
              <div className="p-4">
                <div className="inline-block px-2 py-1 bg-secondary/20 text-secondary rounded text-xs font-semibold mb-2">
                  {product.category}
                </div>
                <h3 className="text-lg font-bold mb-2 line-clamp-2">{product.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{product.description}</p>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={
                          i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                        }
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.rating} ({product.reviews})
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">{product.price}</span>
                  <button className="p-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                    <ShoppingCart size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
      <BackButton />
      <ScrollToTop />
    </div>
  )
}
