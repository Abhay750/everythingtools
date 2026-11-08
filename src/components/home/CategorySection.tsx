import { categoriesConfig } from "@/config/categories.config";
import { CategoryGrid } from "@/components/tools/CategoryGrid";
import { LayoutGrid } from "lucide-react";

export function CategorySection() {
  return (
    <section id="categories" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary mb-1.5">
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Explore By Category</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Tools for Every Workflow
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Browse our curated categories designed for creators, writers, developers, and students.
          </p>
        </div>
      </div>

      <CategoryGrid categories={categoriesConfig} />
    </section>
  );
}
