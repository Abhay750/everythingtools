import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { toolsConfig, getToolBySlug } from "@/config/tools.config";
import { getCategoryBySlug } from "@/config/categories.config";
import { siteConfig } from "@/config/site.config";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { ToolHeader } from "@/components/tools/ToolHeader";
import { SampleCounterTool } from "@/components/tools/SampleCounterTool";
import { ToolPlaceholderWorkspace } from "@/components/tools/ToolPlaceholderWorkspace";
import { ToolGuide } from "@/components/tools/ToolGuide";
import { ToolFaq } from "@/components/tools/ToolFaq";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { AdSlot } from "@/components/ads/AdSlot";

interface ToolPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return toolsConfig.map((tool) => ({
    slug: tool.slug,
  }));
}

export async function generateMetadata({
  params,
}: ToolPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    return {
      title: "Tool Not Found",
    };
  }

  const category = getCategoryBySlug(tool.category);

  return {
    title: `${tool.name} - Free Online ${category?.name || "Utility"}`,
    description: tool.description,
    keywords: tool.keywords,
    alternates: {
      canonical: `${siteConfig.url}/tool/${tool.slug}`,
    },
    openGraph: {
      title: `${tool.name} | EverythingTools`,
      description: tool.shortDescription,
      url: `${siteConfig.url}/tool/${tool.slug}`,
      type: "website",
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: tool.name,
        },
      ],
    },
  };
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  const category = getCategoryBySlug(tool.category);
  if (!category) {
    notFound();
  }

  // JSON-LD structured data for WebApplication & FAQPage
  const toolSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: tool.name,
    description: tool.description,
    url: `${siteConfig.url}/tool/${tool.slug}`,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "All (Web Browser)",
    browserRequirements: "Requires JavaScript. Requires HTML5.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: tool.rating
      ? {
          "@type": "AggregateRating",
          ratingValue: tool.rating.score.toString(),
          reviewCount: tool.rating.count.toString(),
          bestRating: "5",
          worstRating: "1",
        }
      : undefined,
  };

  const faqSchema =
    tool.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: tool.faqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: f.answer,
            },
          })),
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs
          items={[
            { label: "Categories", href: "/#categories" },
            { label: category.name, href: `/category/${category.slug}` },
            { label: tool.name, current: true },
          ]}
        />

        {/* Tool Header Information */}
        <ToolHeader tool={tool} category={category} />

        {/* Interactive Workspace Area */}
        <section className="pt-2">
          {tool.slug === "word-counter" ? (
            <SampleCounterTool />
          ) : (
            <ToolPlaceholderWorkspace tool={tool} />
          )}
        </section>

        {/* AdSlot - Tool Bottom Leaderboard */}
        <AdSlot slotKey="toolBottomLeaderboard" />

        {/* How-to-Use Guide & Features Checklist */}
        <ToolGuide
          toolName={tool.name}
          steps={tool.howToUse}
          features={tool.features}
        />

        {/* FAQ Accordion */}
        <ToolFaq toolName={tool.name} faqs={tool.faqs} />

        {/* Related Category Tools */}
        <RelatedTools currentTool={tool} />
      </main>
    </>
  );
}
