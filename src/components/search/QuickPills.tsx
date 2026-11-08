import Link from "next/link";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuickPillsProps {
  className?: string;
}

export function QuickPills({ className }: QuickPillsProps) {
  const popularShortcuts = [
    { name: "Word Counter", href: "/tool/word-counter", hot: true },
    { name: "Merge PDF", href: "/tool/merge-pdf", hot: false },
    { name: "JSON Formatter", href: "/tool/json-formatter", hot: true },
    { name: "Image Compressor", href: "/tool/image-compressor", hot: false },
    { name: "UUID Generator", href: "/tool/uuid-generator", hot: false },
    { name: "Password Generator", href: "/tool/password-generator", hot: false },
    { name: "QR Code", href: "/tool/qr-code-generator", hot: false },
    { name: "Percentage", href: "/tool/percentage-calculator", hot: false },
  ];

  return (
    <div className={cn("flex flex-wrap items-center justify-center gap-2", className)}>
      <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1 shrink-0">
        <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Popular:
      </span>
      {popularShortcuts.map((pill) => (
        <Link
          key={pill.name}
          href={pill.href}
          className="text-xs px-2.5 py-1 rounded-full border border-border/80 bg-card/60 hover:bg-accent hover:border-primary/40 text-foreground transition-all duration-150 inline-flex items-center gap-1"
        >
          {pill.name}
          {pill.hot && (
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
          )}
        </Link>
      ))}
    </div>
  );
}

