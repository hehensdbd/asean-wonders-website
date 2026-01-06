"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import Image from "next/image"
import { MessageCircle, ThumbsUp, Share2, Plus, MoreVertical } from "lucide-react"
import { useState } from "react"
import { ScrollToTop } from "@/components/scroll-to-top"

const initialPosts = [
  {
    id: 1,
    author: "张三",
    avatar: "/images/孔剧.png",
    date: "2 小时前",
    title: "我在清迈的寺庙体验",
    content: "今天在清迈参加了晨间冥想活动，与友善的僧侣们度过了神奇的一小时。真是一次改变人生的经历！",
    image: "/images/冥想分享.png",
    likes: 234,
    comments: 45,
    shares: 12,
    category: "shares",
  },
  {
    id: 2,
    author: "李四",
    avatar: "/images/节日庆典壁纸.png",
    date: "5 小时前",
    title: "泰国美食烹饪课程推荐",
    content: "刚完成了5天的泰国烹饪课程。学到了如何制作正宗的冬阴功汤和绿咖喱。强烈推荐曼谷的这家烹饪学校！",
    image: "/images/烹饪分享.png",
    likes: 567,
    comments: 89,
    shares: 34,
    category: "shares",
  },
  {
    id: 3,
    author: "王五",
    avatar: "/images/南塔尼.png",
    date: "12 小时前",
    title: "水灯节的美妙回忆",
    content: "去年参加了水灯节，真是太美了。看着数千盏灯笼在河上漂浮，感觉与宇宙相连。现在迫不及待想再去一次！",
    image: "/images/水灯节分享.png",
    likes: 892,
    comments: 156,
    shares: 78,
    category: "shares",
  },
]

export default function CommunityPage() {
  const [newPostText, setNewPostText] = useState("")
  const [posts, setPosts] = useState(initialPosts)
  const [activeTab, setActiveTab] = useState("shares")
  const [newPostTitle, setNewPostTitle] = useState("")

  const handlePublishPost = () => {
    if (newPostTitle.trim() && newPostText.trim()) {
      const newPost = {
        id: posts.length + 1,
        author: "您",
        avatar: "/placeholder.svg?key=userme&height=48&width=48",
        date: "现在",
        title: newPostTitle,
        content: newPostText,
        image: "/placeholder.svg?key=newpost&height=300&width=400",
        likes: 0,
        comments: 0,
        shares: 0,
        category: activeTab,
      }
      setPosts([newPost, ...posts])
      setNewPostText("")
      setNewPostTitle("")
    }
  }

  const filteredPosts = posts.filter((post) => post.category === activeTab)

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="max-w-2xl mx-auto px-4 md:px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">社区交流</h1>
          <p className="text-lg text-muted-foreground">分享您的泰国文化体验、旅游故事和美食发现。</p>
        </div>

        <div className="flex gap-4 mb-8 border-b border-border">
          <button
            onClick={() => setActiveTab("shares")}
            className={`px-4 py-3 font-semibold border-b-2 transition-colors ${
              activeTab === "shares"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            分享社区
          </button>
          <button
            onClick={() => setActiveTab("questions")}
            className={`px-4 py-3 font-semibold border-b-2 transition-colors ${
              activeTab === "questions"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            提问专区
          </button>
          <button
            onClick={() => setActiveTab("feedback")}
            className={`px-4 py-3 font-semibold border-b-2 transition-colors ${
              activeTab === "feedback"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            反馈建议
          </button>
        </div>

        {/* Create Post */}
        <div className="bg-card border border-border rounded-lg p-6 mb-8">
          <h2 className="text-lg font-bold mb-4 justify-center">
            {activeTab === "shares" && "分享您的故事"}
            {activeTab === "questions" && "提出您的问题"}
            {activeTab === "feedback" && "提供反馈意见"}
          </h2>
          <div className="space-y-4">
            <input
              type="text"
              value={newPostTitle}
              onChange={(e) => setNewPostTitle(e.target.value)}
              placeholder={
                activeTab === "shares"
                  ? "给您的故事起个标题..."
                  : activeTab === "questions"
                    ? "您的问题是？"
                    : "反馈标题..."
              }
              className="w-full p-3 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <textarea
              value={newPostText}
              onChange={(e) => setNewPostText(e.target.value)}
              placeholder={
                activeTab === "shares"
                  ? "分享您对泰国文化、美食或旅行的想法..."
                  : activeTab === "questions"
                    ? "请详细说明您的问题..."
                    : "请描述您的建议或反馈..."
              }
              className="w-full p-4 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              rows={4}
            />
            <div className="flex items-center justify-between">
              <button className="p-2 text-muted-foreground hover:text-primary rounded-lg hover:bg-muted transition-colors">
                <Plus size={20} />
              </button>
              <button
                onClick={handlePublishPost}
                disabled={!newPostTitle.trim() || !newPostText.trim()}
                className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold"
              >
                发布
              </button>
            </div>
          </div>
        </div>

        {/* Posts Feed */}
        <div className="space-y-6">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                {activeTab === "shares" && "暂无分享内容，成为第一个分享者吧！"}
                {activeTab === "questions" && "暂无提问，有问题随时提出！"}
                {activeTab === "feedback" && "暂无反馈，感谢您的建议！"}
              </p>
            </div>
          ) : (
            filteredPosts.map((post) => (
              <div
                key={post.id}
                className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Header */}
                <div className="p-6 pb-4">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden bg-muted">
                      <Image src={post.avatar || "/placeholder.svg"} alt={post.author} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{post.author}</h3>
                      <p className="text-sm text-muted-foreground">{post.date}</p>
                    </div>
                    <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                      <MoreVertical size={20} className="text-muted-foreground" />
                    </button>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                  <p className="text-muted-foreground">{post.content}</p>
                </div>

                {/* Image */}
                {post.image && (
                  <div className="relative w-full h-64">
                    <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                  </div>
                )}

                {/* Actions */}
                <div className="px-6 py-4 border-t border-border flex items-center justify-around">
                  <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                    <ThumbsUp size={20} />
                    <span className="text-sm">{post.likes}</span>
                  </button>
                  <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                    <MessageCircle size={20} />
                    <span className="text-sm">{post.comments}</span>
                  </button>
                  <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                    <Share2 size={20} />
                    <span className="text-sm">{post.shares}</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Load More */}
        {filteredPosts.length > 0 && (
          <div className="mt-8 text-center">
            <button className="px-6 py-3 bg-card border border-border text-foreground rounded-lg hover:border-primary hover:text-primary transition-colors font-semibold">
              加载更多
            </button>
          </div>
        )}
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  )
}
