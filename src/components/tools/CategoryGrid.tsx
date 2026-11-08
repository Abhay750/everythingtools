import { ToolCategory } from "@/types/categories";
import { CategoryCard } from "./CategoryCard";
import { cn } from "@/lib/utils";

interface CategoryGridProps {
  categories: ToolCategory[];
  className?: string;
}

export function CategoryGrid({ categories, className }: CategoryGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6",
        className
      )}
    >
      {categories.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </div>
  );
}
