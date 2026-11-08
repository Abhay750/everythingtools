import Link from "next/link";
import { ToolDefinition } from "@/types/tools";
import { Icon } from "@/components/common/Icon";
import { Badge } from "@/components/common/Badge";
import { ShieldCheck, Star, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ToolCardProps {
  tool: ToolDefinition;
  className?: string;
}

export function ToolCard({ tool, className }: ToolCardProps) {
  return (
    <Link
      href={`/tool/${tool.slug}`}
      className={cn(
        "group relative flex flex-col justify-between p-5 rounded-2xl border border-border/70 bg-card hover:bg-card/90 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        className
      )}
    >
      <div>
        {/* Top Header with Icon and Badges */}
        <div className="flex items-start justify-between gap-3 mb-3.5">
          <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-primary/10 text-primary border border-primary/15 group-hover:scale-105 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-200">
            <Icon name={tool.iconName} className="w-5 h-5" />
          </div>

          <div className="flex items-center gap-1.5 flex-wrap justify-end">
            {tool.isPopular && <Badge variant="popular" size="sm">Popular</Badge>}
            {tool.isNew && <Badge variant="new" size="sm">New</Badge>}
            {tool.isClientSideOnly && (
              <span
                title="100% Client-Side: File data never leaves your browser"
                className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full"
              >
                <ShieldCheck className="w-3 h-3" />
                Browser Only
              </span>
            )}
          </div>
        </div>

        {/* Title and Description */}
        <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors flex items-center gap-1">
          <span>{tool.name}</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
        </h3>

        <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 mt-1.5 leading-relaxed">
          {tool.shortDescription}
        </p>
      </div>

      {/* Bottom Metadata: Ratings and Tags */}
      <div className="mt-4 pt-3.5 border-t border-border/50 flex items-center justify-between text-xs text-muted-foreground">
        {tool.rating ? (
          <div className="flex items-center gap-1 font-medium">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span className="text-foreground">{tool.rating.score.toFixed(1)}</span>
            <span className="text-muted-foreground/70">({tool.rating.count})</span>
          </div>
        ) : (
          <span className="text-[11px] text-muted-foreground/60">Free Tool</span>
        )}

        <div className="flex items-center gap-1">
          <span className="text-[11px] font-medium text-muted-foreground/80 capitalize bg-muted/60 px-2 py-0.5 rounded-md">
            {tool.category.replace("-tools", "")}
          </span>
        </div>
      </div>
    </Link>
  );
}

