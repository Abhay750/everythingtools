"use client";

import React, { useEffect } from "react";
import { adsConfig } from "@/config/ads.config";
import { cn } from "@/lib/utils";

interface AdSlotProps {
  slotKey: keyof typeof adsConfig.slots;
  className?: string;
}

export function AdSlot({ slotKey, className }: AdSlotProps) {
  const slot = adsConfig.slots[slotKey];

  useEffect(() => {
    // Only push to adsbygoogle if ads are genuinely enabled
    if (adsConfig.enabled && typeof window !== "undefined") {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      } catch (e) {
        console.error("AdSense execution error:", e);
      }
    }
  }, []);

  if (!slot) {
    return null;
  }

  // When ads are disabled (current state pending AdSense verification)
  if (!adsConfig.enabled) {
    if (adsConfig.showDevPlaceholders) {
      return (
        <aside
          aria-label={`Advertisement Slot - ${slot.name}`}
          className={cn(
            "my-6 flex flex-col items-center justify-center rounded-xl border border-dashed border-border/70 bg-muted/20 p-4 text-center transition-all",
            className
          )}
        >
          <span className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
            Ad Space: {slot.name}
          </span>
          <span className="text-[10px] text-muted-foreground/60 mt-0.5">
            Dimensions: {slot.recommendedDimensions} (AdSense Disabled Pending Approval)
          </span>
        </aside>
      );
    }
    // Clean production view when ads are inactive
    return null;
  }

  // Active production AdSense unit
  return (
    <aside
      aria-label={`Advertisement - ${slot.name}`}
      className={cn("my-6 overflow-hidden flex justify-center items-center", className)}
    >
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={adsConfig.publisherId}
        data-ad-slot={slot.slotId}
        data-ad-format={slot.responsive ? "auto" : undefined}
        data-full-width-responsive={slot.responsive ? "true" : "false"}
      />
    </aside>
  );
}

