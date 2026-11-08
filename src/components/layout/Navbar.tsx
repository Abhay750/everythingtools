"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/common/Logo";
import { SearchBar } from "@/components/search/SearchBar";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { categoriesConfig } from "@/config/categories.config";
import { Icon } from "@/components/common/Icon";
import {
  ChevronDown,
  Menu,
  X,
  Sparkles,
  ShieldCheck,
  Flame,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/80 bg-background/80 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Logo & Categories Mega-Dropdown */}
        <div className="flex items-center gap-6">
          <Logo />

          {/* Desktop Categories Dropdown */}
          <div className="hidden lg:relative lg:block">
            <button
              type="button"
              onClick={() => setCategoriesOpen(!categoriesOpen)}
              onBlur={() => setTimeout(() => setCategoriesOpen(false), 200)}
              className={cn(
                "inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl border border-border/70 hover:bg-accent text-foreground transition-colors",
                categoriesOpen && "bg-accent border-primary/40"
              )}
              aria-expanded={categoriesOpen}
              aria-haspopup="true"
            >
              <span>Categories</span>
              <ChevronDown
                className={cn(
                  "w-3.5 h-3.5 text-muted-foreground transition-transform duration-200",
                  categoriesOpen && "rotate-180"
                )}
              />
            </button>

            {categoriesOpen && (
              <div className="absolute left-0 mt-2 w-[480px] bg-card border border-border rounded-2xl shadow-2xl p-4 grid grid-cols-2 gap-2 z-50 animate-in fade-in slide-in-from-top-2">
                {categoriesConfig.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/category/${cat.slug}`}
                    onClick={() => setCategoriesOpen(false)}
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-accent/80 transition-colors group"
                  >
                    <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0 group-hover:scale-105 transition-transform">
                      <Icon name={cat.iconName} className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-foreground group-hover:text-primary transition-colors block">
                        {cat.name}
                      </span>
                      <span className="text-[11px] text-muted-foreground line-clamp-1">
                        {cat.tagline}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Center: Search Trigger (Desktop/Tablet) */}
        <div className="hidden md:flex flex-1 max-w-md mx-2 justify-center">
          <SearchBar variant="nav" />
        </div>

        {/* Right: Quick Links, Theme Toggle, Mobile Hamburger */}
        <div className="flex items-center gap-2.5">
          <Link
            href="/#popular"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground px-2.5 py-1.5 rounded-lg hover:bg-accent/60 transition-colors"
          >
            <Flame className="w-3.5 h-3.5 text-amber-500" />
            <span>Popular</span>
          </Link>

          <Link
            href="/about"
            className="hidden lg:inline-flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-lg"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Zero Uploads</span>
          </Link>

          <ThemeToggle />

          {/* Mobile Menu Trigger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg border border-border text-foreground hover:bg-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-card/95 backdrop-blur-lg px-4 pt-4 pb-6 space-y-4 animate-in fade-in">
          <div className="mb-2">
            <SearchBar variant="hero" placeholder="Search all tools..." />
          </div>

          <div className="space-y-1">
            <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground px-2 mb-2">
              Tool Categories
            </div>
            <div className="grid grid-cols-2 gap-2">
              {categoriesConfig.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/category/${cat.slug}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-2.5 rounded-xl border border-border/60 bg-muted/20 hover:bg-accent text-xs font-medium text-foreground transition-colors"
                >
                  <Icon name={cat.iconName} className="w-4 h-4 text-primary shrink-0" />
                  <span className="truncate">{cat.name}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-border/60 flex flex-col gap-2">
            <Link
              href="/#popular"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2 rounded-lg text-sm text-foreground hover:bg-accent"
            >
              <span className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-amber-500" />
                Popular Tools
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
            </Link>
            <Link
              href="/#guides"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2 rounded-lg text-sm text-foreground hover:bg-accent"
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-500" />
                Guides & Privacy
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2 rounded-lg text-sm text-foreground hover:bg-accent"
            >
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                About & Privacy Pledge
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
