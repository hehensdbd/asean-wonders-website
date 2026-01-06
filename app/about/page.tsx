"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Target, Users, Globe, Heart } from "lucide-react"
import { ScrollToTop } from "@/components/scroll-to-top"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        {/* Hero Section */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">关于我们</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            东盟万象致力于展示和传播东南亚丰富多彩的文化遗产，特别是泰国的传统和现代魅力。
          </p>
        </div>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <div className="bg-card border border-border rounded-lg p-8">
          <Target className="text-secondary mb-4" size={40} />
          <h2 className="text-2xl font-bold mb-4 no-decoration">我们的使命</h2>
          <p className="text-muted-foreground">
            通过数字平台和沉浸式体验，使全世界的人们能够了解、欣赏和参与东南亚文化。我们相信文化交流能够促进理解和尊重。
          </p>
        </div>

        <div className="bg-card border border-border rounded-lg p-8">
          <Heart className="text-secondary mb-4" size={40} />
          <h2 className="text-2xl font-bold mb-4 no-decoration">我们的价值观</h2>
          <p className="text-muted-foreground">
            我们致力于真实性、包容性和可持续性。我们与当地社区合作，确保文化得到真实和尊重的呈现，同时为当地经济做出贡献。
          </p>
        </div>

        <div className="bg-card border border-border rounded-lg p-8">
          <Users className="text-secondary mb-4" size={40} />
          <h2 className="text-2xl font-bold mb-4 no-decoration">我们的团队</h2>
          <p className="text-muted-foreground">
            由文化学者、旅游专家、设计师和开发人员组成的多国团队。我们对传播东南亚文化的热情驱动着我们的工作。
          </p>
        </div>

        <div className="bg-card border border-border rounded-lg p-8">
          <Globe className="text-secondary mb-4" size={40} />
          <h2 className="text-2xl font-bold mb-4 no-decoration">全球视野</h2>
          <p className="text-muted-foreground">
            我们的平台已经帮助数百万用户发现和欣赏东南亚文化。我们继续扩展我们的内容和服务，以更好地服务全球观众。
          </p>
        </div>
      </section>

        {/* Stats Section */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          {[
            { number: "500K+", label: "月度用户" },
            { number: "1000+", label: "文化内容" },
            { number: "50+", label: "合作伙伴" },
            { number: "20", label: "国家覆盖" },
          ].map((stat, i) => (
            <div key={i} className="bg-primary text-primary-foreground rounded-lg p-8 text-center">
              <div className="text-4xl font-bold mb-2">{stat.number}</div>
              <div className="text-sm opacity-90">{stat.label}</div>
            </div>
          ))}
        </section>

        {/* Contact Section */}
        <section className="bg-card border border-border rounded-lg p-12">
          <h2 className="text-3xl font-bold mb-8 text-center justify-center">联系我们</h2>
          <div className="max-w-2xl mx-auto">
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2">姓名</label>
                <input
                  type="text"
                  placeholder="您的姓名"
                  className="w-full px-4 py-3 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">邮箱</label>
                <input
                  type="email"
                  placeholder="您的邮箱地址"
                  className="w-full px-4 py-3 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">信息</label>
                <textarea
                  placeholder="您的信息或建议"
                  rows={5}
                  className="w-full px-4 py-3 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold"
              >
                发送消息
              </button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  )
}
