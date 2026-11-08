import Link from "next/link";
import { guidesConfig } from "@/config/guides.config";
import { BookOpen, Clock, ArrowRight } from "lucide-react";

export function GuidesSection() {
  return (
    <section id="guides" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary mb-1.5">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Knowledge Base & Tutorials</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Helpful Guides & Best Practices
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Practical insights on file compression, data security, formatting, and web performance.
          </p>
        </div>

        <Link
          href="/guides"
          className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
        >
          <span>View all guides</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {guidesConfig.map((guide) => (
          <article
            key={guide.id}
            className="flex flex-col justify-between p-6 rounded-2xl border border-border/80 bg-card hover:border-primary/40 hover:shadow-lg transition-all duration-200"
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

              <h3 className="text-lg font-bold text-foreground hover:text-primary transition-colors">
                <Link href={`/guides#${guide.slug}`}>{guide.title}</Link>
              </h3>

              <p className="text-sm text-muted-foreground mt-2.5 leading-relaxed line-clamp-3">
                {guide.description}
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-border/50 flex items-center justify-between text-xs text-muted-foreground">
              <span>By {guide.author}</span>
              <Link
                href={`/guides#${guide.slug}`}
                className="font-semibold text-primary hover:underline inline-flex items-center gap-1"
              >
                Read Guide <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

