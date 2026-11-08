"use client";

import React, { useState, useMemo } from "react";
import { ToolCategory } from "@/types/categories";
import { ToolDefinition } from "@/types/tools";
import { ToolCard } from "@/components/tools/ToolCard";
import { Search, Sparkles, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface CategoryViewProps {
  category: ToolCategory;
  tools: ToolDefinition[];
}

export function CategoryView({ category, tools }: CategoryViewProps) {
  const [activeSubcategory, setActiveSubcategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      // Subcategory filter: check if tool tags or category subcategories match
      if (activeSubcategory !== "all") {
        const subSlug = activeSubcategory.toLowerCase();
        const matchesTag = tool.tags.some(
          (t) => t.toLowerCase().includes(subSlug) || subSlug.includes(t.toLowerCase())
        );
        if (!matchesTag) return false;
      }

      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const inName = tool.name.toLowerCase().includes(q);
        const inDesc = tool.shortDescription.toLowerCase().includes(q);
        const inKeywords = tool.keywords.some((k) => k.toLowerCase().includes(q));
        if (!inName && !inDesc && !inKeywords) return false;
      }

      return true;
    });
  }, [tools, activeSubcategory, searchQuery]);

  return (
    <div className="space-y-8">
      {/* Search & Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-2xl border border-border/80 bg-card/80 backdrop-blur-sm shadow-xs">
        {/* Search input within category */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Filter ${category.name}...`}
            className="w-full pl-10 pr-9 py-2 rounded-xl text-sm bg-muted/30 border border-border/70 text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 text-muted-foreground hover:text-foreground"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Count Pill */}
        <div className="flex items-center gap-2 self-end sm:self-center text-xs text-muted-foreground">
          <span className="font-semibold text-foreground">{filteredTools.length}</span>
          <span>of {tools.length} utilities</span>
        </div>
      </div>

      {/* Subcategory Pills */}
      {category.subcategories.length > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          <button
            onClick={() => setActiveSubcategory("all")}
            className={cn(
              "text-xs px-3 py-1.5 rounded-full font-medium transition-all shrink-0 border",
              activeSubcategory === "all"
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-card border-border/80 text-muted-foreground hover:text-foreground hover:bg-accent"
            )}
          >
            All Subcategories
          </button>
          {category.subcategories.map((sub) => (
            <button
              key={sub}
              onClick={() => setActiveSubcategory(sub)}
              className={cn(
                "text-xs px-3 py-1.5 rounded-full font-medium transition-all shrink-0 border",
                activeSubcategory === sub
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card border-border/80 text-muted-foreground hover:text-foreground hover:bg-accent"
              )}
            >
              {sub}
            </button>
          ))}
        </div>
      )}

      {/* Tools Grid */}
      {filteredTools.length === 0 ? (
        <div className="text-center py-16 px-4 rounded-2xl border border-dashed border-border bg-card/40">
          <Sparkles className="w-8 h-8 text-muted-foreground/40 mx-auto mb-2" />
          <p className="text-base font-semibold text-foreground">No utilities found</p>
          <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
            No tools matched your current filters in {category.name}. Try clearing your search query.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setActiveSubcategory("all");
            }}
            className="mt-4 text-xs font-semibold text-primary hover:underline"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      )}
    </div>
  );
}
