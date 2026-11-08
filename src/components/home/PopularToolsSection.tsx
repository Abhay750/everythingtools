import Link from "next/link";
import { getPopularTools } from "@/config/tools.config";
import { ToolGrid } from "@/components/tools/ToolGrid";
import { Flame, ArrowRight } from "lucide-react";

export function PopularToolsSection() {
  const popularTools = getPopularTools(6);

  return (
    <section id="popular" className="py-12 sm:py-16 bg-muted/20 border-y border-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1.5">
              <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>Most Popular Utilities</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              Community Favorites
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              The most frequented tools used by thousands of professionals every day.
            </p>
          </div>

          <Link
            href="/category/text-tools"
            className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
          >
            <span>Browse all tools</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <ToolGrid tools={popularTools} />
      </div>
    </section>
  );
}
