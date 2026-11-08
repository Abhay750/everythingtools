import { CategoryId } from "./categories";

export interface ToolStep {
  step: number;
  title: string;
  description: string;
}

export interface ToolFaq {
  question: string;
  answer: string;
}

export type ToolStatus = "available" | "coming_soon" | "beta";

export interface ToolDefinition {
  id: string;
  slug: string;
  name: string;
  category: CategoryId;
  shortDescription: string;
  description: string;
  iconName: string;
  isPopular?: boolean;
  isNew?: boolean;
  isClientSideOnly: boolean;
  status: ToolStatus;
  tags: string[];
  keywords: string[];
  features: string[];
  howToUse: ToolStep[];
  faqs: ToolFaq[];
  estimatedTime?: string;
  supportedFormats?: string[];
  version?: string;
  rating?: {
    score: number;
    count: number;
  };
}

