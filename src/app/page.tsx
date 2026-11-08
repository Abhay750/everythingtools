import { HeroSection } from "@/components/home/HeroSection";
import { CategorySection } from "@/components/home/CategorySection";
import { PopularToolsSection } from "@/components/home/PopularToolsSection";
import { RecentToolsSection } from "@/components/home/RecentToolsSection";
import { WhyChooseUsSection } from "@/components/home/WhyChooseUsSection";
import { GuidesSection } from "@/components/home/GuidesSection";
import { AdSlot } from "@/components/ads/AdSlot";
import { siteConfig } from "@/config/site.config";

export default function HomePage() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />

      <main className="flex-1">
        {/* Top Ad Slot (Pending Google AdSense Approval) */}
        <div className="max-w-7xl mx-auto px-4">
          <AdSlot slotKey="homeTopBanner" />
        </div>

        {/* 2. Large Hero Section + 3. Search all tools */}
        <HeroSection />

        {/* 4. Tool Category Navigation */}
        <CategorySection />

        {/* 5. Popular Tools */}
        <PopularToolsSection />

        {/* 6. Recently Added Tools */}
        <RecentToolsSection />

        {/* 7. Why Use EverythingTools Section */}
        <WhyChooseUsSection />

        {/* 8. Helpful Guides Section */}
        <GuidesSection />
      </main>
    </>
  );
}
