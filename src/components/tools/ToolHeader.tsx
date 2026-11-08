"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ToolDefinition } from "@/types/tools";
import { ToolCategory } from "@/types/categories";
import { Icon } from "@/components/common/Icon";
import { Badge } from "@/components/common/Badge";
import {
  ShieldCheck,
  Star,
  Share2,
  Bookmark,
  Check,
  Clock,
} from "lucide-react";

interface ToolHeaderProps {
  tool: ToolDefinition;
  category: ToolCategory;
}

export function ToolHeader({ tool, category }: ToolHeaderProps) {
  const [copied, setCopied] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
  };

  return (
    <div className="space-y-4 pb-6 border-b border-border/80">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Category link and badges */}
        <div className="flex items-center gap-2 flex-wrap">
          <Link
            href={`/category/${category.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary bg-primary/10 hover:bg-primary/20 border border-primary/20 px-2.5 py-1 rounded-lg transition-colors"
          >
            <Icon name={category.iconName} className="w-3.5 h-3.5" />
            <span>{category.name}</span>
          </Link>

          {tool.isPopular && <Badge variant="popular">Popular Utility</Badge>}
          {tool.isNew && <Badge variant="new">New</Badge>}

          {tool.isClientSideOnly && (
            <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-lg">
              <ShieldCheck className="w-3.5 h-3.5" />
              100% In-Browser • Zero Uploads
            </span>
          )}
        </div>

        {/* Action buttons: Share & Bookmark */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={handleBookmark}
            title={bookmarked ? "Bookmarked" : "Bookmark this tool"}
            className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border border-border bg-card hover:bg-accent text-foreground transition-colors"
          >
            <Bookmark
              className={`w-3.5 h-3.5 ${bookmarked ? "fill-primary text-primary" : "text-muted-foreground"}`}
            />
            <span className="hidden sm:inline">{bookmarked ? "Saved" : "Save"}</span>
          </button>

          <button
            type="button"
            onClick={handleShare}
            title="Copy tool link to clipboard"
            className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border border-border bg-card hover:bg-accent text-foreground transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                  Link Copied!
                </span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="hidden sm:inline">Share</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Title & Description */}
      <div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-foreground flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 text-primary border border-primary/20 shrink-0">
            <Icon name={tool.iconName} className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <span>{tool.name}</span>
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground mt-2.5 max-w-3xl leading-relaxed">
          {tool.description}
        </p>
      </div>

      {/* Rating & Execution Time */}
      <div className="flex items-center gap-4 text-xs text-muted-foreground pt-1">
        {tool.rating && (
          <div className="flex items-center gap-1.5 font-medium">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span className="text-foreground font-bold">{tool.rating.score.toFixed(1)}</span>
            <span>({tool.rating.count} reviews)</span>
          </div>
        )}

        {tool.estimatedTime && (
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-muted-foreground" />
            <span>Speed: {tool.estimatedTime}</span>
          </div>
        )}
      </div>
    </div>
  );
}
