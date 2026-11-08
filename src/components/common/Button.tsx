import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none select-none rounded-xl";

    const variantStyles = {
      primary:
        "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 active:scale-[0.99]",
      secondary:
        "bg-secondary text-secondary-foreground hover:bg-secondary/80 active:scale-[0.99]",
      outline:
        "border border-border bg-card/60 backdrop-blur-sm text-foreground hover:bg-accent hover:text-accent-foreground active:scale-[0.99]",
      ghost:
        "text-foreground hover:bg-accent hover:text-accent-foreground",
      danger:
        "bg-destructive text-destructive-foreground hover:bg-destructive/90 active:scale-[0.99]",
    };

    const sizeStyles = {
      sm: "h-8 px-3 text-xs gap-1.5",
      md: "h-10 px-4 text-sm gap-2",
      lg: "h-12 px-6 text-base gap-2.5",
      icon: "h-10 w-10 p-0",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      >
        {isLoading && (
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-1" />
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
