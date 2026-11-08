export type CategoryId =
  | "pdf-tools"
  | "image-tools"
  | "text-tools"
  | "developer-tools"
  | "generators"
  | "calculators";

export interface ToolCategory {
  id: CategoryId;
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  iconName: string;
  accentColor: string;
  gradient: string;
  seoTitle: string;
  seoDescription: string;
  subcategories: string[];
  featured: boolean;
}
