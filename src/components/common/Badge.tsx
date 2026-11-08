import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary" | "outline" | "success" | "popular" | "new" | "client";
  size?: "sm" | "md";
}

export function Badge({
  className,
  variant = "default",
  size = "md",
  children,
  ...props
}: BadgeProps) {
  const variantStyles = {
    default: "bg-primary/10 text-primary border-primary/20",
    secondary: "bg-secondary text-secondary-foreground border-transparent",
    outline: "border-border text-muted-foreground bg-transparent",
    success: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    popular: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/25 font-semibold",
    new: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/25 font-semibold",
    client: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30 font-medium",
  };

  const sizeStyles = {
    sm: "text-[11px] px-2 py-0.5 rounded-full",
    md: "text-xs px-2.5 py-1 rounded-full",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 font-medium border transition-colors",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

