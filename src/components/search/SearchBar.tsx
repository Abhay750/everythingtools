"use client";

import React, { useState } from "react";
import { Search, Command } from "lucide-react";
import { SearchDialog } from "./SearchDialog";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  className?: string;
  variant?: "hero" | "nav";
  placeholder?: string;
}

export function SearchBar({
  className,
  variant = "hero",
  placeholder = "Search 100+ free online tools (e.g. PDF Merge, JSON, Word Counter)...",
}: SearchBarProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (variant === "nav") {
    return (
      <>
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className={cn(
            "flex items-center gap-2 px-3 py-1.5 text-xs text-muted-foreground bg-muted/40 hover:bg-muted border border-border rounded-xl transition-all w-full max-w-[260px] md:max-w-[320px] justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
            className
          )}
        >
          <span className="flex items-center gap-2 truncate">
            <Search className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
            <span className="truncate">Search tools...</span>
          </span>
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground bg-card border border-border rounded shadow-xs">
            <Command className="w-2.5 h-2.5" /> K
          </kbd>
        </button>

        <SearchDialog isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </>
    );
  }

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className={cn(
          "group relative flex items-center w-full max-w-2xl mx-auto rounded-2xl bg-card border border-border/80 shadow-lg shadow-black/5 hover:border-primary/50 hover:shadow-primary/5 transition-all cursor-pointer p-2 sm:p-2.5",
          className
        )}
      >
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary shrink-0 mr-3 group-hover:scale-105 transition-transform">
          <Search className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0 pr-2">
          <p className="text-sm sm:text-base text-muted-foreground/80 truncate">
            {placeholder}
          </p>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <kbd className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 text-xs font-mono font-medium text-muted-foreground bg-muted border border-border/80 rounded-lg">
            <Command className="w-3 h-3" /> K
          </kbd>
          <span className="inline-flex sm:hidden px-2.5 py-1 text-xs font-medium bg-primary text-primary-foreground rounded-lg">
            Search
          </span>
        </div>
      </div>

      <SearchDialog isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
