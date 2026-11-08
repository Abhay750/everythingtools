"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, X, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";
import { toolsConfig } from "@/config/tools.config";
import { categoriesConfig } from "@/config/categories.config";
import { Icon } from "@/components/common/Icon";
import { Badge } from "@/components/common/Badge";
import { ToolDefinition } from "@/types/tools";
import { cn } from "@/lib/utils";

interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
}

export function SearchDialog({ isOpen, onClose, initialQuery = "" }: SearchDialogProps) {
  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    const timer = setTimeout(() => inputRef.current?.focus(), 50);
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Global keyboard shortcut Cmd+K / Ctrl+K & Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
      } else if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Filter tools
  const filteredTools = useMemo(() => {
    const q = query.toLowerCase().trim();
    return toolsConfig.filter((tool) => {
      const matchesCategory =
        selectedCategory === "all" || tool.category.toLowerCase() === selectedCategory.toLowerCase();
      if (!matchesCategory) return false;

      if (!q) return true;

      const inName = tool.name.toLowerCase().includes(q);
      const inDesc = tool.shortDescription.toLowerCase().includes(q);
      const inKeywords = tool.keywords.some((k) => k.toLowerCase().includes(q));
      const inTags = tool.tags.some((t) => t.toLowerCase().includes(q));

      return inName || inDesc || inKeywords || inTags;
    });
  }, [query, selectedCategory]);

  const handleSelectTool = (tool: ToolDefinition) => {
    onClose();
    router.push(`/tool/${tool.slug}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < filteredTools.length - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === "Enter" && filteredTools[selectedIndex]) {
      e.preventDefault();
      handleSelectTool(filteredTools[selectedIndex]);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search tools"
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-background/80 backdrop-blur-md transition-all animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh] transition-all"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center px-4 py-3.5 border-b border-border">
          <Search className="w-5 h-5 text-muted-foreground shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search tools (e.g. PDF Merge, JSON, Word Counter)..."
            className="w-full bg-transparent text-foreground placeholder:text-muted-foreground/70 text-base focus:outline-none"
          />
          {query && (
            <button
              onClick={() => {
                setQuery("");
                inputRef.current?.focus();
              }}
              className="p-1 hover:bg-accent rounded-md text-muted-foreground hover:text-foreground mr-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 text-[11px] font-mono text-muted-foreground bg-muted border border-border rounded">
            ESC
          </kbd>
        </div>

        {/* Category Pills Filter */}
        <div className="flex items-center gap-1.5 px-4 py-2 border-b border-border/60 bg-muted/20 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setSelectedCategory("all")}
            className={cn(
              "text-xs px-2.5 py-1 rounded-lg font-medium transition-colors shrink-0",
              selectedCategory === "all"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-foreground"
            )}
          >
            All Categories
          </button>
          {categoriesConfig.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={cn(
                "text-xs px-2.5 py-1 rounded-lg font-medium transition-colors shrink-0 flex items-center gap-1.5",
                selectedCategory === cat.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
            >
              <Icon name={cat.iconName} className="w-3 h-3" />
              <span>{cat.shortName}</span>
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-2 space-y-1 divide-y divide-border/20">
          {filteredTools.length === 0 ? (
            <div className="py-12 text-center">
              <Sparkles className="w-8 h-8 text-muted-foreground/50 mx-auto mb-2" />
              <p className="text-sm font-semibold text-foreground">No matching tools found</p>
              <p className="text-xs text-muted-foreground mt-1 max-w-xs mx-auto">
                Try searching with different keywords like &quot;compress&quot;, &quot;json&quot;, &quot;uuid&quot;, or &quot;counter&quot;.
              </p>
            </div>
          ) : (
            filteredTools.map((tool, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={tool.id}
                  onClick={() => handleSelectTool(tool)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={cn(
                    "flex items-center justify-between p-3 rounded-xl cursor-pointer transition-colors",
                    isSelected ? "bg-accent/80 text-foreground" : "hover:bg-accent/40"
                  )}
                >
                  <div className="flex items-start gap-3 min-w-0 pr-3">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0 mt-0.5">
                      <Icon name={tool.iconName} className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-sm text-foreground truncate">
                          {tool.name}
                        </span>
                        {tool.isPopular && <Badge variant="popular" size="sm">Popular</Badge>}
                        {tool.isNew && <Badge variant="new" size="sm">New</Badge>}
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                        {tool.shortDescription}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {tool.isClientSideOnly && (
                      <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                        <ShieldCheck className="w-3 h-3" />
                        In-Browser
                      </span>
                    )}
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground" />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 border-t border-border bg-muted/30 text-[11px] text-muted-foreground flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-card border border-border rounded text-[10px]">↑</kbd>
              <kbd className="px-1.5 py-0.5 bg-card border border-border rounded text-[10px]">↓</kbd>
              Navigate
            </span>
            <span className="inline-flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-card border border-border rounded text-[10px]">↵</kbd>
              Open
            </span>
          </div>
          <span>{filteredTools.length} tools available</span>
        </div>
      </div>
    </div>
  );
}
