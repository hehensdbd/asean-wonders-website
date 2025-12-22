import Link from "next/link"
import { Facebook, Smartphone, Music, QrCode } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground mt-16" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        {/* Main Footer */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 pb-8 border-b border-primary-foreground/20">
          <div>
            <h3 className="font-semibold mb-4">关于我们</h3>
            <ul className="space-y-2 text-sm opacity-90">
              <li>
                <Link
                  href="#"
                  className="hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent rounded"
                >
                  网站地图
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent rounded"
                >
                  相关链接
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent rounded"
                >
                  留言板
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">法律信息</h3>
            <ul className="space-y-2 text-sm opacity-90">
              <li>
                <Link
                  href="#"
                  className="hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent rounded"
                >
                  版权声明
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent rounded"
                >
                  隐私政策
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent rounded"
                >
                  用户协议
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">联系方式</h3>
            <ul className="space-y-2 text-sm opacity-90">
              <li>
                <a
                  href="mailto:info@aseanwonders.com"
                  className="hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent rounded"
                >
                  Email: info@aseanwonders.com
                </a>
              </li>
              <li>Phone: +86-XXX-XXXX-XXXX</li>
              <li>Address: Beijing, China</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">关注我们</h3>
            <div className="flex gap-4">
              <button
                className="p-2 hover:bg-primary-foreground/20 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </button>
              <button
                className="p-2 hover:bg-primary-foreground/20 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
                aria-label="微博"
              >
                <Smartphone size={20} />
              </button>
              <button
                className="p-2 hover:bg-primary-foreground/20 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
                aria-label="抖音"
              >
                <Music size={20} />
              </button>
              <button
                className="p-2 hover:bg-primary-foreground/20 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
                aria-label="微信"
              >
                <QrCode size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm opacity-75">
          <p>&copy; 2025 东盟万象. All Rights Reserved. | 信息信息信息信息信息信息信息信息</p>
        </div>
      </div>
    </footer>
  )
}
