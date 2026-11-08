import { SearchBar } from "@/components/search/SearchBar";
import { QuickPills } from "@/components/search/QuickPills";
import { ShieldCheck, Zap, Sparkles, CheckCircle2 } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background radial gradient decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto text-center space-y-6">
        {/* Top Trust Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-xs font-semibold text-primary shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          <span>100% Free • Zero Server Uploads • Client-Side Security</span>
        </div>

        {/* High-Impact Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground leading-[1.15]">
          Every Everyday Tool. <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
            Directly In Your Browser.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Fast, private, mobile-ready utilities for PDF, images, text formatting, developers, and calculators. Your files never touch our servers.
        </p>

        {/* Search Omnibox */}
        <div className="pt-2">
          <SearchBar variant="hero" />
        </div>

        {/* Quick Suggest Pills */}
        <div className="pt-1">
          <QuickPills />
        </div>

        {/* Feature Badges Grid */}
        <div className="pt-8 border-t border-border/50 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-medium text-muted-foreground">
          <div className="flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>100% Client-Side Privacy</span>
          </div>
          <div className="flex items-center justify-center gap-1.5">
            <Zap className="w-4 h-4 text-amber-500" />
            <span>Zero Processing Latency</span>
          </div>
          <div className="flex items-center justify-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-blue-500" />
            <span>No Account Required</span>
          </div>
          <div className="flex items-center justify-center gap-1.5">
            <Sparkles className="w-4 h-4 text-purple-500" />
            <span>Free Forever</span>
          </div>
        </div>
      </div>
    </section>
  );
}

