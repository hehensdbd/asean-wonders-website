"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff, LogIn, User, Lock, AlertCircle, Mail } from "lucide-react"
import Image from "next/image"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || "/"

  useEffect(() => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      router.push(callbackUrl)
    }
  }, [router, callbackUrl])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      await new Promise(resolve => setTimeout(resolve, 1000))

      if (!email || !password) {
        throw new Error("请填写所有必填字段")
      }

      if (!email.includes("@")) {
        throw new Error("请输入有效的邮箱地址")
      }

      const mockUser = {
        id: "12345",
        name: email.split("@")[0],
        email: email,
        avatar: null,
        createdAt: new Date().toISOString()
      }

      const mockToken = "mock_jwt_token_" + Math.random().toString(36).substring(7)

      localStorage.setItem('auth_token', mockToken)
      localStorage.setItem('user_info', JSON.stringify(mockUser))
      
      if (rememberMe) {
        sessionStorage.setItem('remembered_auth', 'true')
      }

      window.dispatchEvent(new Event('storage'))

      const savedCallback = localStorage.getItem('login_callback') || callbackUrl
      localStorage.removeItem('login_callback')
      
      router.push(savedCallback)

    } catch (err) {
      setError(err instanceof Error ? err.message : "登录失败，请稍后重试")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialLogin = (provider: string) => {
    alert(`即将通过${provider}登录，此功能待实现`)
  }

  return (
    <div className="min-h-screen relative bg-image-base bg-dl">
      <div className="bg-overlay overlay-dark-10"></div>
      
      <div className="bg-content flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
            {/* 左侧：品牌介绍 */}
            <div className="w-full lg:w-1/2 max-w-md lg:max-w-none">
              <div className="flex justify-center lg:justify-start mb-8">
                <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                  <div className="relative w-48 h-20">
                    <Image
                      src="/images/dm2.png"
                      alt="东盟万象"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                </Link>
              </div>
              
              <div className="text-center lg:text-left">
                <h1 className="text-4xl font-bold text-[#1a3d3a] mb-4">
                  探索东盟文化之美
                </h1>
                <p className="text-lg text-gray-600 mb-6">
                  登录您的账户，畅游东盟十国的神话传说、节日庆典、美食艺术
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-gray-700">
                    <div className="w-6 h-6 rounded-full bg-green-50 flex items-center justify-center">
                      <span className="text-green-600 text-sm font-bold">✓</span>
                    </div>
                    <span>探索东盟十国文化特色</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <div className="w-6 h-6 rounded-full bg-green-50 flex items-center justify-center">
                      <span className="text-green-600 text-sm font-bold">✓</span>
                    </div>
                    <span>获取最新活动与旅游资讯</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <div className="w-6 h-6 rounded-full bg-green-50 flex items-center justify-center">
                      <span className="text-green-600 text-sm font-bold">✓</span>
                    </div>
                    <span>加入文化交流社区</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 右侧：登录表单 */}
            <div className="w-full lg:w-1/2 max-w-md">
              <div className="bg-white/95 backdrop-blur-sm py-8 px-6 sm:px-8 shadow-2xl shadow-green-100/50 rounded-2xl border border-green-100">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-[#1a3d3a] justify-center">
                    欢迎回来
                  </h2>
                  <p className="mt-2 text-gray-600">
                    登录您的账户，继续探索之旅
                  </p>
                </div>

                {error && (
                  <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg flex items-center gap-2">
                    <AlertCircle size={20} />
                    <span className="text-sm">{error}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      邮箱地址
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                        <Mail size={20} className="text-gray-400" />
                      </div>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="appearance-none block w-full pl-12 pr-3 py-3.5 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a3d3a] focus:border-transparent transition-all text-gray-900 bg-gray-50 focus:bg-white placeholder:pl-0"
                        placeholder="请输入您的邮箱"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                      密码
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                        <Lock size={20} className="text-gray-400" />
                      </div>
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="appearance-none block w-full pl-12 pr-12 py-3.5 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a3d3a] focus:border-transparent transition-all text-gray-900 bg-gray-50 focus:bg-white placeholder:pl-0"
                        placeholder="请输入您的密码"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3.5 flex items-center"
                      >
                        {showPassword ? (
                          <EyeOff size={20} className="text-gray-400 hover:text-gray-600" />
                        ) : (
                          <Eye size={20} className="text-gray-400 hover:text-gray-600" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="h-4 w-4 text-[#1a3d3a] focus:ring-[#1a3d3a] border-gray-300 rounded"
                      />
                      <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                        记住我
                      </label>
                    </div>

                    <div className="text-sm">
                      <Link
                        href="/auth/forgot-password"
                        className="font-medium text-[#1a3d3a] hover:text-[#0f2a28] transition-colors"
                      >
                        忘记密码?
                      </Link>
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl text-sm font-bold text-white bg-[#1a3d3a] hover:bg-[#0f2a28] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1a3d3a] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      {isLoading ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          登录中...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <LogIn size={20} />
                          登录
                        </span>
                      )}
                    </button>
                  </div>
                </form>

                <div className="mt-8">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-3 bg-white/95 text-gray-500">其他登录方式</span>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <button
                      onClick={() => handleSocialLogin("微信")}
                      className="w-full inline-flex justify-center items-center py-3 px-4 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <div className="w-5 h-5 mr-2 relative">
                        <Image
                          src="/images/weixin.png"
                          alt="微信"
                          fill
                          className="object-contain"
                        />
                      </div>
                      微信
                    </button>
                    <button
                      onClick={() => handleSocialLogin("Google")}
                      className="w-full inline-flex justify-center items-center py-3 px-4 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <div className="w-5 h-5 mr-2 relative">
                        <Image
                          src="https://img.icons8.com/color/48/000000/google-logo.png"
                          alt="Google"
                          fill
                          className="object-contain"
                        />
                      </div>
                      Google
                    </button>
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <p className="text-sm text-gray-600">
                    还没有账户?{' '}
                    <Link
                      href="/auth/register"
                      className="font-medium text-[#1a3d3a] hover:text-[#0f2a28] transition-colors"
                    >
                      立即注册
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}