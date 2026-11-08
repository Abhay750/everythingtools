import { ToolDefinition } from "@/types/tools";
import { ToolGrid } from "@/components/tools/ToolGrid";
import { getToolsByCategory } from "@/config/tools.config";
import { Sparkles } from "lucide-react";

interface RelatedToolsProps {
  currentTool: ToolDefinition;
}

export function RelatedTools({ currentTool }: RelatedToolsProps) {
  const categoryTools = getToolsByCategory(currentTool.category)
    .filter((t) => t.id !== currentTool.id)
    .slice(0, 3);

  if (categoryTools.length === 0) return null;

  return (
    <section className="pt-12 border-t border-border/80">
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary mb-2">
        <Sparkles className="w-4 h-4" />
        <span>Related Utilities</span>
      </div>
      <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-6">
        More tools in this category
      </h2>

      <ToolGrid tools={categoryTools} />
    </section>
  );
}

