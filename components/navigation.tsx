"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Menu, X, ChevronDown, Search, Globe, LogOut, LogIn, UserCircle } from "lucide-react"
import Image from "next/image"

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [showSearchDropdown, setShowSearchDropdown] = useState(false)
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false)
  const [showCountryDropdown, setShowCountryDropdown] = useState(false)
  const [showAuthDropdown, setShowAuthDropdown] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [currentLanguage, setCurrentLanguage] = useState("简体中文")
  const [currentCountry, setCurrentCountry] = useState("   泰国")
  
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // 检查登录状态
  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem('auth_token')
      const user = localStorage.getItem('user_info')
      if (token && user) {
        setIsLoggedIn(true)
      }
    }
    
    checkAuthStatus()
    
    // 监听storage变化以同步登录状态
    const handleStorageChange = () => checkAuthStatus()
    window.addEventListener('storage', handleStorageChange)
    
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  const navItems = [
    { label: "首页", href: "/" },
    {
      label: "探索",
      href: "/explore",
      submenu: [
        { label: "神话传说", href: "/explore/mythology" },
        { label: "节日庆典", href: "/explore/festivals" },
        { label: "艺术表演", href: "/explore/art" },
        { label: "美食风味", href: "/explore/food" },
        { label: "建筑古迹", href: "/explore/architecture" },
      ],
    },
    {
      label: "资讯",
      href: "/news",
      submenu: [
        { label: "活动信息", href: "/news?type=events" },
        { label: "旅游讯息", href: "/news?type=travel" },
      ],
    },
    {
      label: "文创",
      href: "/cultural-products",
      submenu: [
        { label: "文创产品", href: "/cultural-products?category=creative" },
        { label: "本地特产", href: "/cultural-products?category=local" },
        { label: "精美壁纸", href: "/cultural-products?category=wallpapers" },
      ],
    },
    {
      label: "旅游",
      href: "/travel",
      submenu: [
        { label: "地区介绍", href: "/travel?section=regions" },
        { label: "路线规划", href: "/travel?section=routes" },
        { label: "票务信息", href: "/travel?section=tickets" },
      ],
    },
    {
      label: "交流",
      href: "/community",
      submenu: [
        { label: "分享社区", href: "/community?tab=shares" },
        { label: "提问专区", href: "/community?tab=questions" },
        { label: "反馈建议", href: "/community?tab=feedback" },
      ],
    },
    { label: "关于", href: "/about" },
  ]

  const languages = ["简体中文", "繁体中文", "English", "ไทย", "Tiếng Việt"]
  const aseanCountries = ["柬埔寨", "印尼", "老挝", "马来西亚", "缅甸", "菲律宾", "新加坡", "泰国", "越南", "文莱"]

  const handleDropdownMouseEnter = (label: string) => {
    setOpenDropdown(label)
  }

  const handleDropdownMouseLeave = () => {
    setOpenDropdown(null)
  }

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
      setSearchQuery("")
      setShowSearchDropdown(false)
    }
  }

  const handleLanguageChange = (lang: string) => {
    setCurrentLanguage(lang)
    setShowLanguageDropdown(false)
  }

  const handleCountryChange = (country: string) => {
    setCurrentCountry(country)
    setShowCountryDropdown(false)
  }

  // 处理登录按钮点击
  const handleLoginClick = () => {
    // 保存当前页面路径以便登录后返回
    const callbackUrl = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '')
    localStorage.setItem('login_callback', callbackUrl)
    router.push('/auth/login')
    setShowAuthDropdown(false)
  }

  // 处理注册按钮点击
  const handleRegisterClick = () => {
    const callbackUrl = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '')
    localStorage.setItem('login_callback', callbackUrl)
    router.push('/auth/register')
    setShowAuthDropdown(false)
  }

  // 处理登出
  const handleLogout = () => {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user_info')
    localStorage.removeItem('login_callback')
    setIsLoggedIn(false)
    setShowAuthDropdown(false)
    router.refresh() // 刷新页面以更新状态
  }

  return (
    <nav className="sticky top-0 z-50 bg-[#1a3d3a] border-b border-primary-foreground/20">
      <div className="w-full px-4 md:px-6">
        <div className="flex items-center justify-between h-16 max-w-7xl mx-auto">
          {/* Logo部分 */}
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="relative w-32 h-12">
                <Image
                  src="/images/e4-b8-9c-e7-9b-9f-e4-b8-87-e8-b1-a12.png"
                  alt="东盟万象"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>

            {/* 国家选择器 */}
            <div className="relative hidden md:block">
              <button
                className="flex items-center gap-1 px-2 py-1 text-primary-foreground text-sm hover:bg-primary-foreground/10 rounded transition-colors"
                onClick={() => setShowCountryDropdown(!showCountryDropdown)}
              >
                -{currentCountry}
                <ChevronDown size={14} className={`transition-transform ${showCountryDropdown ? "rotate-180" : ""}`} />
              </button>
              {showCountryDropdown && (
                <div
                  className="absolute top-full left-0 bg-[#1a3d3a] border border-primary-foreground/20 rounded-md shadow-lg mt-1 w-32 z-50"
                  onMouseEnter={() => setShowCountryDropdown(true)}
                  onMouseLeave={() => setShowCountryDropdown(false)}
                >
                  {aseanCountries.map((country) => (
                    <button
                      key={country}
                      onClick={() => handleCountryChange(country)}
                      className={`block w-full text-left px-3 py-2 text-xs transition-colors ${
                        currentCountry === country
                          ? "bg-accent text-accent-foreground font-semibold"
                          : "text-white hover:bg-accent hover:text-accent-foreground"
                      }`}
                    >
                      {country}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 桌面导航 */}
          <div className="hidden lg:flex items-center gap-1" role="navigation" aria-label="主导航">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.submenu && handleDropdownMouseEnter(item.label)}
                onMouseLeave={() => item.submenu && handleDropdownMouseLeave()}
              >
                <Link href={item.href}>
                  <button
                    className="px-3 py-2 text-sm font-medium text-white hover:bg-primary-foreground/10 transition-colors rounded-md flex items-center gap-1"
                    aria-expanded={item.submenu ? openDropdown === item.label : undefined}
                    aria-haspopup={item.submenu ? "menu" : undefined}
                  >
                    {item.label}
                    {item.submenu && (
                      <ChevronDown
                        size={16}
                        className={`transition-transform ${openDropdown === item.label ? "rotate-180" : ""}`}
                        aria-hidden="true"
                      />
                    )}
                  </button>
                </Link>
                {item.submenu && openDropdown === item.label && (
                  <div
                    className="absolute top-full left-0 bg-[#1a3d3a] border border-primary-foreground/20 rounded-md shadow-lg mt-0 w-48"
                    role="menu"
                    onMouseEnter={() => handleDropdownMouseEnter(item.label)}
                    onMouseLeave={() => handleDropdownMouseLeave()}
                  >
                    {item.submenu.map((subitem) => (
                      <Link
                        key={subitem.label}
                        href={subitem.href}
                        className="block px-4 py-2 text-sm text-white hover:bg-accent hover:text-accent-foreground whitespace-nowrap first:rounded-t-md last:rounded-b-md transition-colors"
                        role="menuitem"
                      >
                        {subitem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* 右侧控制区 */}
          <div className="flex items-center gap-2">
            {/* 搜索下拉框 */}
            <div className="relative">
              <button
                className="p-2 hover:bg-primary-foreground/10 rounded-md transition-colors"
                aria-label="搜索"
                onClick={() => setShowSearchDropdown(!showSearchDropdown)}
              >
                <Search size={20} className="text-white" />
              </button>
              {showSearchDropdown && (
                <div className="absolute top-full right-0 bg-[#1a3d3a] border border-primary-foreground/20 rounded-md shadow-lg mt-2 w-72 p-4 z-50">
                  <div className="relative flex items-center">
                    <Search size={18} className="absolute left-3 text-white/60" aria-hidden="true" />
                    <input
                      type="text"
                      placeholder="搜索文化、节日、美食..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                      className="w-full pl-10 pr-4 py-2 rounded-lg bg-white text-foreground placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent"
                      aria-label="搜索东盟文化内容"
                      autoFocus
                    />
                  </div>
                </div>
              )}
            </div>

            {/* 语言下拉框 */}
            <div className="relative hidden md:block">
              <button
                className="p-2 hover:bg-primary-foreground/10 rounded-md transition-colors flex items-center gap-1"
                aria-label="语言选择"
                onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
              >
                <Globe size={20} className="text-white" />
                <span className="text-white text-xs hidden lg:inline">{currentLanguage}</span>
              </button>
              {showLanguageDropdown && (
                <div className="absolute top-full right-0 bg-[#1a3d3a] border border-primary-foreground/20 rounded-md shadow-lg mt-2 w-40 z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => handleLanguageChange(lang)}
                      className={`block w-full text-left px-4 py-2 text-sm transition-colors ${
                        currentLanguage === lang
                          ? "bg-accent text-accent-foreground font-semibold"
                          : "text-white hover:bg-accent hover:text-accent-foreground"
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 认证下拉框 */}
            <div className="relative">
              <button
                className="p-2 hover:bg-primary-foreground/10 rounded-md transition-colors"
                aria-label="用户账户"
                onClick={() => setShowAuthDropdown(!showAuthDropdown)}
              >
                {isLoggedIn ? (
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-bold text-sm">
                    用
                  </div>
                ) : (
                  <UserCircle size={20} className="text-white" />
                )}
              </button>
              {showAuthDropdown && (
                <div className="absolute top-full right-0 bg-[#1a3d3a] border border-primary-foreground/20 rounded-md shadow-lg mt-2 w-48 z-50">
                  {isLoggedIn ? (
                    <>
                      <div className="px-4 py-3 border-b border-primary-foreground/20 text-white text-sm">用户账户</div>
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-sm text-white hover:bg-accent hover:text-accent-foreground transition-colors"
                      >
                        个人资料
                      </Link>
                      <Link
                        href="/favorites"
                        className="block px-4 py-2 text-sm text-white hover:bg-accent hover:text-accent-foreground transition-colors"
                      >
                        我的收藏
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-white hover:bg-accent hover:text-accent-foreground transition-colors flex items-center gap-2"
                      >
                        <LogOut size={16} />
                        登出
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={handleLoginClick}
                        className="w-full text-left px-4 py-2 text-sm text-white hover:bg-accent hover:text-accent-foreground transition-colors flex items-center gap-2 border-b border-primary-foreground/20"
                      >
                        <LogIn size={16} />
                        登录
                      </button>
                      <button
                        onClick={handleRegisterClick}
                        className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-accent hover:text-accent-foreground transition-colors"
                      >
                        注册账户
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* 移动端菜单按钮 */}
            <button
              className="lg:hidden p-2 hover:bg-primary-foreground/10 rounded-md transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "关闭菜单" : "打开菜单"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={24} className="text-white" /> : <Menu size={24} className="text-white" />}
            </button>
          </div>
        </div>

        {/* 移动端导航 */}
        {isMobileMenuOpen && (
          <div
            className="lg:hidden border-t border-primary-foreground/20 pb-4 bg-[#1a3d3a]"
            role="navigation"
            aria-label="移动导航"
          >
            {navItems.map((item) => (
              <div key={item.label}>
                <button
                  className="w-full text-left px-4 py-2 text-sm font-medium text-white hover:bg-primary-foreground/10 transition-colors flex justify-between items-center"
                  onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                  aria-expanded={item.submenu ? openDropdown === item.label : undefined}
                  aria-haspopup={item.submenu ? "menu" : undefined}
                >
                  <Link href={item.href}>{item.label}</Link>
                  {item.submenu && (
                    <ChevronDown
                      size={16}
                      className={`transform transition-transform ${openDropdown === item.label ? "rotate-180" : ""}`}
                      aria-hidden="true"
                    />
                  )}
                </button>
                {item.submenu && openDropdown === item.label && (
                  <div className="bg-[#1a3d3a]" role="menu">
                    {item.submenu.map((subitem) => (
                      <Link
                        key={subitem.label}
                        href={subitem.href}
                        className="block px-8 py-2 text-sm text-white hover:bg-accent hover:text-accent-foreground transition-colors"
                        role="menuitem"
                      >
                        {subitem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}