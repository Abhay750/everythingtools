import Link from "next/link";
import { ToolCategory } from "@/types/categories";
import { toolsConfig } from "@/config/tools.config";
import { Icon } from "@/components/common/Icon";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CategoryCardProps {
  category: ToolCategory;
  className?: string;
}

export function CategoryCard({ category, className }: CategoryCardProps) {
  const toolsCount = toolsConfig.filter((t) => t.category === category.id).length;

  return (
    <Link
      href={`/category/${category.slug}`}
      className={cn(
        "group relative flex flex-col justify-between p-6 rounded-2xl border border-border/80 bg-card hover:bg-card/80 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 transition-all duration-200 overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        className
      )}
    >
      {/* Decorative gradient overlay */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-50 group-hover:opacity-100 transition-opacity pointer-events-none",
          category.gradient
        )}
      />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-card border border-border/80 shadow-xs group-hover:scale-110 transition-transform duration-200">
            <Icon name={category.iconName} className="w-6 h-6 text-foreground" />
          </div>
          <span className="text-xs font-semibold text-muted-foreground bg-card/80 backdrop-blur-xs border border-border/60 px-2.5 py-1 rounded-full">
            {toolsCount} {toolsCount === 1 ? "tool" : "tools"}
          </span>
        </div>

        <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors flex items-center justify-between">
          <span>{category.name}</span>
          <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
        </h3>

        <p className="text-xs sm:text-sm text-muted-foreground mt-2 line-clamp-2 leading-relaxed">
          {category.tagline}
        </p>
      </div>

      <div className="relative z-10 mt-5 pt-3 border-t border-border/40 flex flex-wrap gap-1.5">
        {category.subcategories.slice(0, 3).map((sub) => (
          <span
            key={sub}
            className="text-[11px] font-medium text-muted-foreground/80 bg-muted/50 px-2 py-0.5 rounded-md"
          >
            {sub}
          </span>
        ))}
      </div>
    </Link>
  );
}
