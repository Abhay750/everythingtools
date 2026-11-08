import { ToolCategory } from "@/types/categories";

export const categoriesConfig: ToolCategory[] = [
  {
    id: "pdf-tools",
    slug: "pdf-tools",
    name: "PDF Tools",
    shortName: "PDF",
    tagline: "Manipulate, convert and optimize PDF documents securely in your browser.",
    description:
      "A complete suite of client-side PDF utilities. Merge multiple PDFs, split documents, compress file sizes, and extract pages without transmitting your sensitive documents to any external server.",
    iconName: "FileText",
    accentColor: "rose",
    gradient: "from-rose-500/10 via-rose-500/5 to-transparent border-rose-500/20 text-rose-600 dark:text-rose-400",
    seoTitle: "Free Online PDF Tools - Merge, Split, Compress, Convert",
    seoDescription:
      "Process and edit PDF files in your web browser with 100% privacy. Free client-side PDF merger, splitter, compressor, and converter.",
    subcategories: ["PDF Organization", "PDF Optimization", "Conversion", "Security"],
    featured: true,
  },
  {
    id: "image-tools",
    slug: "image-tools",
    name: "Image Tools",
    shortName: "Images",
    tagline: "Compress, resize, convert and edit images with instant preview.",
    description:
      "High-speed image manipulation tools running directly on your device canvas. Compress PNG/JPEG/WebP images without quality loss, resize dimensions, crop, convert formats, and extract color palettes.",
    iconName: "Image",
    accentColor: "amber",
    gradient: "from-amber-500/10 via-amber-500/5 to-transparent border-amber-500/20 text-amber-600 dark:text-amber-400",
    seoTitle: "Free Online Image Tools - Compress, Resize, Convert",
    seoDescription:
      "Fast client-side image editor and compressor. Convert between PNG, JPG, WebP, and SVG formats directly in your browser with zero server uploads.",
    subcategories: ["Compression", "Resizing & Cropping", "Format Converters", "Color Utilities"],
    featured: true,
  },
  {
    id: "text-tools",
    slug: "text-tools",
    name: "Text Tools",
    shortName: "Text",
    tagline: "Format, analyze, clean and transform text and strings effortlessly.",
    description:
      "Powerful text utilities for writers, editors, and students. Count words and characters in real time, convert case, find text differences, sanitize whitespace, remove duplicate lines, and preview Markdown.",
    iconName: "Type",
    accentColor: "emerald",
    gradient: "from-emerald-500/10 via-emerald-500/5 to-transparent border-emerald-500/20 text-emerald-600 dark:text-emerald-400",
    seoTitle: "Free Online Text Tools - Word Counter, Case Converter, Diff Checker",
    seoDescription:
      "Analyze and format text with instant live counters, diff comparison, case converters, line sorters, and Markdown rendering.",
    subcategories: ["Counters & Statistics", "Case & Casing", "Text Formatting", "Comparison"],
    featured: true,
  },
  {
    id: "developer-tools",
    slug: "developer-tools",
    name: "Developer Tools",
    shortName: "Developer",
    tagline: "Essential browser-side utilities for web developers and engineers.",
    description:
      "Streamline your day-to-day coding workflow with zero latency. Format and validate JSON, encode/decode Base64 and URLs, debug JWT tokens, test Regular Expressions, and minify code safely.",
    iconName: "Code2",
    accentColor: "blue",
    gradient: "from-blue-500/10 via-blue-500/5 to-transparent border-blue-500/20 text-blue-600 dark:text-blue-400",
    seoTitle: "Free Online Developer Tools - JSON Formatter, Base64, JWT, Regex",
    seoDescription:
      "Browser-side engineering utilities. Format JSON, decode JWTs, test regex, encode Base64, and minify assets with instant client execution.",
    subcategories: ["Formatters & Validators", "Encoding & Decoding", "Token & Security", "Minifiers"],
    featured: true,
  },
  {
    id: "generators",
    slug: "generators",
    name: "Generators",
    shortName: "Generators",
    tagline: "Generate cryptographic passwords, UUIDs, QR codes, and mock data.",
    description:
      "Client-side random and cryptographic generation tools. Create cryptographically secure passwords, v4 UUIDs, scannable QR codes, dummy placeholder text, and cryptographic hashes instantly.",
    iconName: "Sparkles",
    accentColor: "purple",
    gradient: "from-purple-500/10 via-purple-500/5 to-transparent border-purple-500/20 text-purple-600 dark:text-purple-400",
    seoTitle: "Free Online Generators - Passwords, UUIDs, QR Codes, Hashes",
    seoDescription:
      "Generate random passwords, UUIDs, QR codes, lorem ipsum dummy text, and hash digests locally in your browser.",
    subcategories: ["Security & Keys", "Identifiers", "Barcodes & QR", "Design Assets"],
    featured: true,
  },
  {
    id: "calculators",
    slug: "calculators",
    name: "Calculators",
    shortName: "Calculators",
    tagline: "Simple, accurate mathematical, date, unit, and aspect ratio calculators.",
    description:
      "Specialized calculators for everyday calculations. Compute percentages, date differences, aspect ratios for responsive design, timestamp conversions, and unit transformations without complicated menus.",
    iconName: "Calculator",
    accentColor: "indigo",
    gradient: "from-indigo-500/10 via-indigo-500/5 to-transparent border-indigo-500/20 text-indigo-600 dark:text-indigo-400",
    seoTitle: "Free Online Calculators - Percentage, Date, Aspect Ratio, Units",
    seoDescription:
      "Perform fast mathematical, date, aspect ratio, and unit conversions directly in your browser with step-by-step formula explanations.",
    subcategories: ["Math & Percentages", "Date & Time", "Display & Aspect Ratio", "Unit Conversion"],
    featured: true,
  },
];

export function getCategoryBySlug(slug: string): ToolCategory | undefined {
  return categoriesConfig.find(
    (c) => c.slug.toLowerCase() === slug.toLowerCase() || c.id.toLowerCase() === slug.toLowerCase()
  );
}
