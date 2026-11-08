"use client";

import React from "react";
import * as LucideIcons from "lucide-react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: string;
  className?: string;
  size?: number;
}

export function Icon({ name, className = "w-5 h-5", size = 20, ...props }: IconProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const IconComponent = (LucideIcons as Record<string, any>)[name] || LucideIcons.Wrench;

  return <IconComponent className={className} size={size} {...props} />;
}
