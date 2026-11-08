import Link from "next/link";
import { getRecentlyAddedTools } from "@/config/tools.config";
import { ToolGrid } from "@/components/tools/ToolGrid";
import { Sparkles, ArrowRight } from "lucide-react";

export function RecentToolsSection() {
  const recentTools = getRecentlyAddedTools(6);

  return (
    <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            <span>Freshly Deployed</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Recently Added Tools
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Newest additions built directly to client specifications.
          </p>
        </div>

        <Link
          href="/category/developer-tools"
          className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
        >
          <span>Explore developer tools</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <ToolGrid tools={recentTools} />
    </section>
  );
}
