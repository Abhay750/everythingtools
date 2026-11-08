import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showTagline?: boolean;
}

export function Logo({ className, showTagline = false }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex items-center gap-2.5 transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg",
        className
      )}
      aria-label="EverythingTools Homepage"
    >
      <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200">
        <svg
          className="w-5 h-5 text-white"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Stylized geometric tool symbol */}
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
        <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-emerald-500 border-2 border-background rounded-full" />
      </div>

      <div className="flex flex-col leading-none">
        <span className="text-lg font-bold tracking-tight text-foreground flex items-center gap-0.5">
          <span>Everything</span>
          <span className="text-primary font-extrabold">Tools</span>
        </span>
        {showTagline && (
          <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mt-0.5">
            Client-Side Utilities
          </span>
        )}
      </div>
    </Link>
  );
}
