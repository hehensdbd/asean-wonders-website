"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, Heart, ArrowRight } from "lucide-react"
import { useState } from "react"
import { ProductCarouselMain } from "@/components/product-carousel-main"
import { ScrollToTop } from "@/components/scroll-to-top"

// Product data
const creativeProducts = [
  {
    id: 1,
    name: "THAI STYLE COLLECTION系列文创",
    price: "¥12-99",
    rating: 4.8,
    reviews: 156,
    image: "/images/IP1.jpg",
    description: "寻泰国风情，拾异域美好。",
  },
  {
    id: 2,
    name: "暹罗猫陶瓷摆件",
    price: "¥349",
    rating: 4.9,
    reviews: 142,
    image: "/images/暹罗猫陶瓷摆件.png",
    description: "精美的陶瓷暹罗猫摆件，是泰国文化的象征。",
  },
  {
    id: 3,
    name: "泰式少女一周幸运色系列手办盲盒摆件礼物",
    price: "¥58.8",
    rating: 5.0,
    reviews: 124,
    image: "/images/IP2.jpg",
    description: "泰式少女，装点美好生活",
  },
  {
    id: 4,
    name: "金箔陶瓷器皿",
    price: "¥599",
    rating: 4.9,
    reviews: 89,
    image: "/images/金箔陶瓷器皿.png",
    description: "精美的手工陶瓷，每件都是独一无二的艺术品",
  },
  {
    id: 5,
    name: "泰国传统丝绸围巾",
    price: "¥299",
    rating: 4.8,
    reviews: 156,
    image: "/images/泰国丝绸围巾.png",
    description: "采用传统织造工艺，展现泰国文化魅力的高级丝绸围巾",
  },
]

const localSpecialties = [
  {
    id: 101,
    name: "泰国红咖啡",
    price: "¥89",
    rating: 4.7,
    reviews: 203,
    image: "/images/泰国红咖啡.png",
    description: "来自泰国北部的特色咖啡豆，风味醇厚",
  },
  {
    id: 102,
    name: "鱼露调味料",
    price: "¥45",
    rating: 4.6,
    reviews: 87,
    image: "/images/鱼露.png",
    description: "传统泰国调味料，增添地道风味",
  },
  {
    id: 103,
    name: "泰国丝绸面料",
    price: "¥599",
    rating: 4.9,
    reviews: 142,
    image: "/images/泰国丝绸面料.png",
    description: "高质量的泰国丝绸，适合服装制作",
  },
  {
    id: 104,
    name: "椰糖甜点",
    price: "¥45",
    rating: 4.8,
    reviews: 178,
    image: "/images/椰糖甜点.png",
    description: "传统手工制作的椰糖甜点，甜蜜可口",
  },
  {
    id: 105,
    name: "干蝦醬",
    price: "¥38",
    rating: 4.5,
    reviews: 92,
    image: "/images/干蝦醬.png",
    description: "泰国特色调味品，提升菜肴风味",
  },
]

const wallpapers = [
  {
    id: 201,
    name: "寺庙艺术壁纸",
    resolution: "4K",
    image: "/images/寺庙艺术壁纸.png",
  },
  {
    id: 202,
    name: "传统图案壁纸",
    resolution: "2K",
    image: "/images/传统图案壁纸.png",
  },
  {
    id: 203,
    name: "泰式风景壁纸",
    resolution: "4K",
    image: "/images/泰式风景壁纸.png",
  },
]

interface Product {
  id: number
  name: string
  price: string
  rating: number
  reviews: number
  image: string
  description: string
}

interface Wallpaper {
  id: number
  name: string
  resolution: string
  image: string
}

function ProductCard({ product }: { product: Product }) {
  const [isFavorite, setIsFavorite] = useState(false)

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow group">
      <div className="relative w-full h-48 bg-muted">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform"
        />
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-3 right-3 p-2 bg-white/90 rounded-full hover:bg-white transition-colors z-10"
        >
          <Heart size={20} className={isFavorite ? "fill-red-500 text-red-500" : "text-foreground"} />
        </button>
      </div>
      <div className="p-4">
        <h4 className="font-semibold text-sm mb-2 line-clamp-2">{product.name}</h4>
        <div className="flex items-center justify-between mb-3">
          <span className="text-lg font-bold text-primary">{product.price}</span>
          <span className="text-xs text-muted-foreground">
            ⭐ {product.rating} ({product.reviews})
          </span>
        </div>
        <button className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-2 rounded hover:bg-primary/90 transition-colors text-sm font-semibold">
          <ShoppingCart size={16} />
          购买
        </button>
      </div>
    </div>
  )
}

function WallpaperCard({ wallpaper }: { wallpaper: Wallpaper }) {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow group">
      <div className="relative w-full h-48 bg-muted">
        <Image
          src={wallpaper.image || "/placeholder.svg"}
          alt={wallpaper.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
        <button className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="px-4 py-2 bg-white text-foreground rounded font-semibold text-sm">下载</div>
        </button>
      </div>
      <div className="p-4">
        <h4 className="font-semibold text-sm mb-2">{wallpaper.name}</h4>
        <p className="text-xs text-muted-foreground">{wallpaper.resolution} 分辨率</p>
      </div>
    </div>
  )
}

export default function CulturalProductsPage() {
  return (
    // 添加背景容器 - 使用文创页面的背景类
    <div className="min-h-screen relative bg-image-base bg-cultural-products">
      {/* 添加遮罩层 - 根据图片亮度调整透明度 */}
      <div className="bg-overlay overlay-dark-5"></div>
      
      {/* 内容区域 */}
      <div className="bg-content">
        <Navigation />

        <main className="max-w-7xl mx-auto px-4 md:px-6 py-12">
          {/* Hero Section */}
          <div className="mb-30">
            {/* 标题间距 */}
            <h1 className="text-4xl md:text-5xl font-bold mb-4">文创</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              发现精选的泰国文化产品，每一件都体现了传统工艺和现代设计的完美结合。通过直接链接，轻松购买心仪的产品。
            </p>
          </div>

          {/* Module 1: Creative Products */}
          <ProductCarouselMain
            title="文创产品"
            description="展示独特的创意产品，融合传统工艺与现代设计。每件产品都是泰国文化的艺术表达。"
            products={creativeProducts}
            moreLink="/cultural-products/creative"
            layout="left-text"
          />

          {/* Module 2: Local Specialties */}
          <ProductCarouselMain
            title="本地特产"
            description="品尝和购买地道的泰国特产，从传统调味料到特色商品，感受最地道的泰国味道。"
            products={localSpecialties}
            moreLink="/cultural-products/local"
            layout="right-text"
          />

          {/* Module 3: Beautiful Wallpapers */}
          <section className="mb-16">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-3xl font-bold">精美壁纸</h2>
                  <p className="text-muted-foreground mt-2">
                    下载精心策划的泰国文化主题壁纸，将文化艺术带入你的日常生活。提供多种分辨率。
                  </p>
                </div>
                <Link
                  href="/cultural-products/wallpapers"
                  className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold whitespace-nowrap"
                >
                  查看更多 <ArrowRight size={20} />
                </Link>
              </div>
            </div>

            {/* Featured wallpapers grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wallpapers.slice(0, 3).map((wallpaper) => (
                <div
                  key={wallpaper.id}
                  className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow group"
                >
                  <div className="relative w-full h-48 bg-muted">
                    <Image
                      src={wallpaper.image || "/placeholder.svg"}
                      alt={wallpaper.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                    <button className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="px-4 py-2 bg-white text-foreground rounded font-semibold text-sm">下载</div>
                    </button>
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-sm mb-2">{wallpaper.name}</h4>
                    <p className="text-xs text-muted-foreground">{wallpaper.resolution} 分辨率</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Module divider */}
            <div className="my-12 border-t border-border" />
          </section>
        </main>

        <Footer />
        <ScrollToTop />
      </div>
    </div>
  )
}