import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { categoriesConfig, getCategoryBySlug } from "@/config/categories.config";
import { getToolsByCategory } from "@/config/tools.config";
import { siteConfig } from "@/config/site.config";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Icon } from "@/components/common/Icon";
import { AdSlot } from "@/components/ads/AdSlot";
import { CategoryView } from "@/components/category/CategoryView";
import { ShieldCheck, HelpCircle } from "lucide-react";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return categoriesConfig.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    return {
      title: "Category Not Found",
    };
  }

  return {
    title: category.seoTitle,
    description: category.seoDescription,
    alternates: {
      canonical: `${siteConfig.url}/category/${category.slug}`,
    },
    openGraph: {
      title: category.seoTitle,
      description: category.seoDescription,
      url: `${siteConfig.url}/category/${category.slug}`,
      type: "website",
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const tools = getToolsByCategory(category.id);

  const categorySchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: category.name,
    description: category.description,
    url: `${siteConfig.url}/category/${category.slug}`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: tools.map((t, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${siteConfig.url}/tool/${t.slug}`,
        name: t.name,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(categorySchema) }}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs
          items={[
            { label: "Categories", href: "/#categories" },
            { label: category.name, current: true },
          ]}
          className="mb-6"
        />

        {/* Category Hero Banner */}
        <section className="relative overflow-hidden p-6 sm:p-10 rounded-3xl border border-border/80 bg-card shadow-sm mb-10">
          <div
            className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none -z-0 opacity-40 bg-gradient-to-bl ${category.gradient}`}
          />

          <div className="relative z-10 max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/10 text-primary border border-primary/20">
                <Icon name={category.iconName} className="w-6 h-6" />
              </div>
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full inline-flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                100% In-Browser Privacy
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
              {category.name}
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground mt-3 leading-relaxed">
              {category.description}
            </p>
          </div>
        </section>

        {/* Top Ad Slot (Pending Google AdSense Approval) */}
        <AdSlot slotKey="categoryTopBanner" />

        {/* Category Tools List & Interactive Filter */}
        <section className="mt-8 mb-16">
          <CategoryView category={category} tools={tools} />
        </section>

        {/* Category Informational & SEO FAQ Section */}
        <section className="pt-12 border-t border-border/80 max-w-4xl">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary mb-2">
            <HelpCircle className="w-4 h-4" />
            <span>About {category.name}</span>
          </div>
          <h2 className="text-2xl font-bold text-foreground">
            Why choose EverythingTools for {category.name.toLowerCase()}?
          </h2>
          <div className="mt-4 space-y-4 text-sm text-muted-foreground leading-relaxed">
            <p>
              Traditional online utilities for {category.name.toLowerCase()} require you to upload your sensitive personal files, tokens, or documents to an unknown cloud server. This creates security liabilities, compliance issues, and slow processing queues.
            </p>
            <p>
              EverythingTools operates strictly inside your web browser. Utilizing modern browser technology (HTML5 Canvas, WebAssembly, and native Web APIs), your calculations, modifications, and exports are computed locally on your device hardware with zero data transfer to third-party endpoints.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}

