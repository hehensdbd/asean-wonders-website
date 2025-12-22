import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

export function NewsSection() {
  const newsItems = [
    { date: "11/17", title: "泰国新年庆典即将开始", preview: "泰国传统新年文化盛宴..." },
    { date: "11/15", title: "水灯节传统工艺展示", preview: "探索传统手工艺制作工艺..." },
    { date: "11/12", title: "古刹维护项目启动", preview: "保护东南亚文化遗产..." },
    { date: "11/10", title: "泰国舞蹈表演季", preview: "传统舞蹈艺术展览..." },
    { date: "11/08", title: "美食节即将举办", preview: "品尝地道东盟美食..." },
  ]

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-foreground">资讯</h3>
        <Link href="/news" className="text-secondary hover:text-accent flex items-center gap-1">
          更多 <ArrowRight size={16} />
        </Link>
      </div>
      <ul className="space-y-4">
        {newsItems.map((item, index) => (
          <li key={index} className="border-b border-border pb-4 last:border-0 last:pb-0">
            <div className="flex items-start gap-4">
              <span className="text-muted-foreground font-medium text-sm whitespace-nowrap">{item.date}</span>
              <div className="flex-1">
                <p className="font-semibold text-foreground hover:text-primary cursor-pointer transition-colors">
                  {item.title}
                </p>
                <p className="text-sm text-muted-foreground mt-1">{item.preview}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function CreativeProductsSection() {
  const products = [
    { title: "泰国文化手工艺", price: "¥299" },
    { title: "传统图案围巾", price: "¥199" },
    { title: "古刹建筑模型", price: "¥499" },
  ];

  // 补齐占位符逻辑保持不变
  const placeholders = Array.from({ length: 6 - products.length }, (_, index) => ({
    title: `Placeholder ${index + 1}`,
    price: "¥0",
  }));

  const items = [...products, ...placeholders];

  return (
    // 【改动1】：最外层添加 flex flex-col h-full
    // flex-col: 让内部元素垂直排列
    // h-full: 确保这个卡片占满父容器的高度（配合左侧资讯栏的高度）
    <div className="bg-card border border-border rounded-lg p-6 flex flex-col h-full">
      
      {/* 标题部分添加 shrink-0，防止空间不够时标题被压缩 */}
      <div className="flex items-center justify-between mb-6 shrink-0">
        <h3 className="text-2xl font-bold text-foreground">文创</h3>
        <Link href="/cultural-products" className="text-secondary hover:text-accent flex items-center gap-1">
          更多 <ArrowRight size={16} />
        </Link>
      </div>

      {/* 【改动2】：Grid 容器添加 flex-1 和 content-stretch */}
      {/* flex-1: 让这个 Grid 区域自动占据卡片剩下的所有垂直空白 */}
      {/* mb-0: 移除底部的 margin，因为已经填满了 */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 flex-1 mb-0">
        {items.map((item, index) => (
          <div
            key={index}
            // 【改动3】：将固定高度 h-40 改为 h-full
            // 这样每个格子就会自动拉伸，平分 Grid 容器的高度
            className="bg-muted rounded-lg h-full flex items-center justify-center hover:bg-muted/80 transition-colors cursor-pointer overflow-hidden relative"
          >
            <Image
              src={`/thai-cultural-product-.jpg?key=${index}&height=160&width=160&query=Thai cultural product ${index}`}
              alt={item.title}
              width={160}
              height={160}
              className="rounded"
              // 如果你想让图片也稍微大一点，可以适当调整 width/height 或者 object-fit，
              // 但通常保持居中显示的方图（如目前设置）在拉长的格子里也很好看。
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function TravelSection() {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-foreground">旅游</h3>
        <Link href="/travel" className="text-secondary hover:text-accent flex items-center gap-1">
          更多 <ArrowRight size={16} />
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-muted rounded-lg h-40 flex items-center justify-center hover:bg-muted/80 transition-colors cursor-pointer"
          >
            <Image
              src={`/thailand-travel-destination-.jpg?height=160&width=160&query=Thailand travel destination ${i}`}
              alt={`Travel destination ${i}`}
              width={160}
              height={160}
              className="rounded"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export function CommunitySection() {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-foreground">交流</h3>
        <Link href="/community" className="text-secondary hover:text-accent flex items-center gap-1">
          更多 <ArrowRight size={16} />
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-muted rounded-lg h-32 flex items-center justify-center hover:bg-muted/80 transition-colors cursor-pointer"
          >
            <span className="text-muted-foreground">社区内容 {i}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
