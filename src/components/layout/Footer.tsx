import Link from "next/link";
import { Logo } from "@/components/common/Logo";
import { categoriesConfig } from "@/config/categories.config";
import { getPopularTools } from "@/config/tools.config";
import { siteConfig } from "@/config/site.config";
import { ShieldCheck, Lock, Zap } from "lucide-react";

export function Footer() {
  const popularTools = getPopularTools(5);

  return (
    <footer className="w-full border-t border-border/80 bg-card text-card-foreground mt-20 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand & Mission (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <Logo showTagline />
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              EverythingTools provides fast, mobile-friendly online utilities. Built with modern WebAssembly and Canvas APIs to process data directly on your device.
            </p>

            {/* Privacy Guarantee Box */}
            <div className="p-3.5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 max-w-sm">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>100% Client-Side Privacy Guarantee</span>
              </div>
              <p className="text-[11px] text-muted-foreground mt-1 leading-normal">
                Your files, text, and passwords never leave your browser. Zero cloud uploads, zero remote tracking, zero data retention.
              </p>
            </div>
          </div>

          {/* Categories Column */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground mb-4">
              Categories
            </h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              {categoriesConfig.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/category/${cat.slug}`}
                    className="hover:text-foreground hover:underline transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Tools Column */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground mb-4">
              Popular Tools
            </h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              {popularTools.map((tool) => (
                <li key={tool.id}>
                  <Link
                    href={`/tool/${tool.slug}`}
                    className="hover:text-foreground hover:underline transition-colors"
                  >
                    {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Platform Column */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground mb-4">
              Legal & Support
            </h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-foreground transition-colors">
                  Contact & Feedback
                </Link>
              </li>
              <li>
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  GitHub Repository
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© 2026 EverythingTools. All rights reserved.</p>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              Zero-Budget Architecture
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Lock className="w-3.5 h-3.5 text-emerald-500" />
              Secure by Design
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
