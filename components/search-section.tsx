"use client"

import { Search, ArrowRight } from "lucide-react"
import { useState } from "react"

export function SearchSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<string | null>(null)

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setSearchResults(`搜索结果：${searchQuery}`)
    }
  }

  return (
    <div className="w-full bg-primary text-primary-foreground py-8 md:py-12 rounded-lg">
      <div className="flex flex-col md:flex-row items-center gap-4 px-6">
        <div className="flex-1 w-full">
          <h3 className="text-xl font-semibold mb-4 md:mb-0">探索</h3>
        </div>
        <div className="flex-1 w-full md:flex-[2]">
          <div className="relative flex items-center">
            <Search size={20} className="absolute left-3 pointer-events-none" aria-hidden="true" />
            <input
              type="text"
              placeholder="搜索文化、节日、美食..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-primary-foreground text-primary placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              aria-label="搜索东盟文化内容"
            />
            <button
              onClick={handleSearch}
              className="absolute right-1 p-2 hover:bg-muted rounded-lg transition-colors"
              aria-label="执行搜索"
            >
              <ArrowRight size={20} className="text-primary" />
            </button>
          </div>
        </div>
      </div>
      {searchResults && (
        <div aria-live="polite" aria-atomic="true" className="sr-only">
          {searchResults}
        </div>
      )}
    </div>
  )
}
