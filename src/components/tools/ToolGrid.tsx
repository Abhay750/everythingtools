import { ToolDefinition } from "@/types/tools";
import { ToolCard } from "./ToolCard";
import { cn } from "@/lib/utils";

interface ToolGridProps {
  tools: ToolDefinition[];
  className?: string;
  emptyMessage?: string;
}

export function ToolGrid({
  tools,
  className,
  emptyMessage = "No tools found matching your criteria.",
}: ToolGridProps) {
  if (tools.length === 0) {
    return (
      <div className="text-center py-12 px-4 rounded-2xl border border-dashed border-border bg-card/40">
        <p className="text-base font-semibold text-foreground">{emptyMessage}</p>
        <p className="text-xs text-muted-foreground mt-1">
          Try adjusting your filter or check back soon for upcoming tools.
        </p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5",
        className
      )}
    >
      {tools.map((tool) => (
        <ToolCard key={tool.id} tool={tool} />
      ))}
    </div>
  );
}

