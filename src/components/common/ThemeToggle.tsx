"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { Sun, Moon, Laptop } from "lucide-react";
import { cn } from "@/lib/utils";

const emptySubscribe = () => () => {};

function useMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();

  if (!mounted) {
    return (
      <div
        className={cn(
          "w-9 h-9 rounded-lg border border-border/60 bg-muted/30 animate-pulse",
          className
        )}
      />
    );
  }

  const cycleTheme = () => {
    if (theme === "light") setTheme("dark");
    else if (theme === "dark") setTheme("system");
    else setTheme("light");
  };

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        onClick={cycleTheme}
        aria-label={`Toggle theme (currently ${theme})`}
        title={`Theme: ${theme}. Click to switch.`}
        className={cn(
          "flex items-center justify-center w-9 h-9 rounded-lg border border-border bg-card/60 backdrop-blur-sm text-foreground hover:bg-accent hover:text-accent-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
          className
        )}
      >
        {theme === "light" && <Sun className="w-4 h-4 text-amber-500 transition-all" />}
        {theme === "dark" && <Moon className="w-4 h-4 text-blue-400 transition-all" />}
        {theme === "system" && <Laptop className="w-4 h-4 text-muted-foreground transition-all" />}
      </button>
    </div>
  );
}
