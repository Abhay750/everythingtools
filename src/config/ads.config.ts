export interface AdUnitConfig {
  id: string;
  slotId: string;
  name: string;
  format: "horizontal-banner" | "vertical-skyscraper" | "in-article" | "square";
  recommendedDimensions: string;
  responsive: boolean;
}

export interface AdsSystemConfig {
  enabled: boolean;
  publisherId: string;
  showDevPlaceholders: boolean;
  slots: Record<string, AdUnitConfig>;
}

export const adsConfig: AdsSystemConfig = {
  // Advertisements remain strictly disabled until formal approval from AdSense
  enabled: process.env.NEXT_PUBLIC_ENABLE_ADS === "true",
  publisherId: process.env.NEXT_PUBLIC_ADSENSE_PUB_ID || "ca-pub-0000000000000000",
  // In development, show an outline placeholder so layout shifts can be tested without faking ads
  showDevPlaceholders: process.env.NODE_ENV === "development" && process.env.NEXT_PUBLIC_SHOW_AD_PLACEHOLDERS === "true",
  slots: {
    homeTopBanner: {
      id: "home-top-banner",
      slotId: "1001",
      name: "Homepage Header Banner",
      format: "horizontal-banner",
      recommendedDimensions: "728x90 / responsive",
      responsive: true,
    },
    categoryTopBanner: {
      id: "category-top-banner",
      slotId: "1002",
      name: "Category Page Banner",
      format: "horizontal-banner",
      recommendedDimensions: "728x90 / responsive",
      responsive: true,
    },
    toolSideSkyscraper: {
      id: "tool-side-skyscraper",
      slotId: "1003",
      name: "Tool Sidebar Skyscraper",
      format: "vertical-skyscraper",
      recommendedDimensions: "300x600 / responsive",
      responsive: true,
    },
    toolBottomLeaderboard: {
      id: "tool-bottom-leaderboard",
      slotId: "1004",
      name: "Tool Bottom Leaderboard",
      format: "in-article",
      recommendedDimensions: "728x90 / responsive",
      responsive: true,
    },
  },
};

