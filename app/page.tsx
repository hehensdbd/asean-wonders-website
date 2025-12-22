import { Navigation } from "@/components/navigation"
import { HeroCarousel } from "@/components/hero-carousel"
import { CulturalGrid } from "@/components/cultural-grid"
import { NewsSection, CreativeProductsSection, TravelSection, CommunitySection } from "@/components/content-sections"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main>
        {/* Hero Carousel */}
        <HeroCarousel />

        <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
          <div className="mt-4">
            <CulturalGrid />
          </div>

          {/* Content Sections */}
          <div className="mt-16 grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2">
              <NewsSection />
            </div>
            <div className="lg:col-span-3">
              <CreativeProductsSection />
            </div>
          </div>

          {/* Travel and Community */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <TravelSection />
            <CommunitySection />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
