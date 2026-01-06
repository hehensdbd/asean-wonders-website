"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff, UserPlus, User, Lock, Mail, AlertCircle, CheckCircle } from "lucide-react"
import Image from "next/image"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const validateForm = () => {
    if (!formData.username.trim()) {
      throw new Error("请输入用户名")
    }
    if (!formData.email.includes("@")) {
      throw new Error("请输入有效的邮箱地址")
    }
    if (formData.password.length < 6) {
      throw new Error("密码长度至少为6位")
    }
    if (formData.password !== formData.confirmPassword) {
      throw new Error("两次输入的密码不一致")
    }
    if (!formData.agreeTerms) {
      throw new Error("请阅读并同意服务条款")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      validateForm()

      await new Promise(resolve => setTimeout(resolve, 1500))

      const mockUser = {
        id: Math.random().toString(36).substring(7),
        name: formData.username,
        email: formData.email,
        createdAt: new Date().toISOString()
      }

      const mockToken = "mock_jwt_token_" + Math.random().toString(36).substring(7)

      localStorage.setItem('auth_token', mockToken)
      localStorage.setItem('user_info', JSON.stringify(mockUser))

      setSuccess(true)

      window.dispatchEvent(new Event('storage'))

      setTimeout(() => {
        const savedCallback = localStorage.getItem('login_callback') || "/"
        localStorage.removeItem('login_callback')
        router.push(savedCallback)
      }, 2000)

    } catch (err) {
      setError(err instanceof Error ? err.message : "注册失败，请稍后重试")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    // 修改1：添加背景容器，使用 bg-dl 类
    <div className="min-h-screen relative bg-image-base bg-dl">
      {/* 修改2：添加遮罩层 */}
      <div className="bg-overlay overlay-dark-10"></div>
      
      {/* 修改3：添加内容容器 */}
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
                  加入东盟文化之旅
                </h1>
                <p className="text-lg text-gray-600 mb-6">
                  注册账户，开启探索东盟十国的神秘与美丽
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
                  <div className="flex items-center gap-2 text-gray-700">
                    <div className="w-6 h-6 rounded-full bg-green-50 flex items-center justify-center">
                      <span className="text-green-600 text-sm font-bold">✓</span>
                    </div>
                    <span>收藏喜爱的文化内容</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 右侧：注册表单 */}
            <div className="w-full lg:w-1/2 max-w-md">
              {/* 修改4：为注册表单添加半透明背景 */}
              <div className="bg-white/95 backdrop-blur-sm py-8 px-6 sm:px-8 shadow-2xl shadow-green-100/50 rounded-2xl border border-green-100">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-[#1a3d3a] justify-center">
                    创建账户
                  </h2>
                  <p className="mt-2 text-gray-600">
                    填写信息，开始您的东盟文化之旅
                  </p>
                </div>

                {success ? (
                  <div className="text-center py-8">
                    <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                      <CheckCircle size={32} className="text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-[#1a3d3a] mb-2">注册成功！</h3>
                    <p className="text-gray-600 mb-6">欢迎加入东盟万象社区</p>
                    <p className="text-sm text-gray-500">正在跳转...</p>
                  </div>
                ) : (
                  <>
                    {error && (
                      <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg flex items-center gap-2">
                        <AlertCircle size={20} />
                        <span className="text-sm">{error}</span>
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                          用户名
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                            <User size={20} className="text-gray-400" />
                          </div>
                          <input
                            id="username"
                            name="username"
                            type="text"
                            autoComplete="username"
                            required
                            value={formData.username}
                            onChange={handleChange}
                            className="appearance-none block w-full pl-12 pr-3 py-3.5 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a3d3a] focus:border-transparent transition-all text-gray-900 bg-gray-50 focus:bg-white placeholder:pl-0"
                            placeholder="请输入用户名"
                          />
                        </div>
                      </div>

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
                            value={formData.email}
                            onChange={handleChange}
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
                            autoComplete="new-password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                            className="appearance-none block w-full pl-12 pr-12 py-3.5 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a3d3a] focus:border-transparent transition-all text-gray-900 bg-gray-50 focus:bg-white placeholder:pl-0"
                            placeholder="至少6位字符"
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

                      <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                          确认密码
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                            <Lock size={20} className="text-gray-400" />
                          </div>
                          <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            autoComplete="new-password"
                            required
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="appearance-none block w-full pl-12 pr-12 py-3.5 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a3d3a] focus:border-transparent transition-all text-gray-900 bg-gray-50 focus:bg-white placeholder:pl-0"
                            placeholder="请再次输入密码"
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute inset-y-0 right-0 pr-3.5 flex items-center"
                          >
                            {showConfirmPassword ? (
                              <EyeOff size={20} className="text-gray-400 hover:text-gray-600" />
                            ) : (
                              <Eye size={20} className="text-gray-400 hover:text-gray-600" />
                            )}
                          </button>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <input
                          id="agreeTerms"
                          name="agreeTerms"
                          type="checkbox"
                          checked={formData.agreeTerms}
                          onChange={handleChange}
                          className="h-4 w-4 mt-0.5 text-[#1a3d3a] focus:ring-[#1a3d3a] border-gray-300 rounded"
                        />
                        <label htmlFor="agreeTerms" className="ml-2 block text-sm text-gray-700">
                          我已阅读并同意{' '}
                          <Link href="/terms" className="text-[#1a3d3a] hover:underline font-medium">
                            服务条款
                          </Link>
                          {' '}和{' '}
                          <Link href="/privacy" className="text-[#1a3d3a] hover:underline font-medium">
                            隐私政策
                          </Link>
                        </label>
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
                              注册中...
                            </span>
                          ) : (
                            <span className="flex items-center gap-2">
                              <UserPlus size={20} />
                              注册账户
                            </span>
                          )}
                        </button>
                      </div>
                    </form>

                    <div className="mt-8 text-center">
                      <p className="text-sm text-gray-600">
                        已有账户?{' '}
                        <Link
                          href="/auth/login"
                          className="font-medium text-[#1a3d3a] hover:text-[#0f2a28] transition-colors"
                        >
                          立即登录
                        </Link>
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}