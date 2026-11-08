import type { Metadata } from "next";
import { guidesConfig } from "@/config/guides.config";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { BookOpen, Clock, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Knowledge Base & Educational Guides",
  description:
    "Explore comprehensive guides on client-side privacy, image optimization, JSON debugging, and PDF workflows.",
};

export default function GuidesPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <Breadcrumbs items={[{ label: "Guides & Tutorials", current: true }]} className="mb-6" />

      <div className="space-y-10">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary mb-1.5">
            <BookOpen className="w-4 h-4" />
            <span>Knowledge Base</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Practical Guides & Technical Insights
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground mt-3 leading-relaxed max-w-2xl">
            In-depth tutorials explaining modern web standards, privacy-preserving in-browser computation, and file optimization strategies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {guidesConfig.map((guide) => (
            <article
              key={guide.id}
              id={guide.slug}
              className="flex flex-col justify-between p-6 sm:p-7 rounded-2xl border border-border bg-card shadow-sm hover:border-primary/40 transition-all"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                  <span className="font-semibold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">
                    {guide.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {guide.readTime}
                  </span>
                </div>

                <h2 className="text-xl font-bold text-foreground mb-3 leading-snug">
                  {guide.title}
                </h2>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {guide.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-border/50 flex items-center justify-between text-xs text-muted-foreground">
                <span>By {guide.author}</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Verified Guide
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
