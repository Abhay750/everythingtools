import { GuideItem } from "@/types/site";

export const guidesConfig: GuideItem[] = [
  {
    id: "browser-side-privacy",
    slug: "browser-side-privacy-guide",
    title: "Why Browser-Side Processing is the Future of File Privacy",
    description:
      "Understand why uploading documents and images to remote cloud servers poses privacy risks, and how WebAssembly and Web Workers enable 100% private in-browser utilities.",
    category: "Security & Privacy",
    readTime: "4 min read",
    date: "November 2026",
    author: "EverythingTools Engineering",
  },
  {
    id: "lossless-image-compression",
    slug: "lossless-image-compression-guide",
    title: "How to Compress Images for the Web Without Losing Visual Quality",
    description:
      "A deep dive into WebP vs PNG compression, canvas quantization, chroma subsampling, and how to reduce payload size by up to 80% for lightning-fast Core Web Vitals.",
    category: "Performance & Media",
    readTime: "6 min read",
    date: "November 2026",
    author: "EverythingTools Engineering",
  },
  {
    id: "json-formatting-best-practices",
    slug: "json-formatting-best-practices",
    title: "The Comprehensive Guide to JSON Formatting, Validation, and Escaping",
    description:
      "Learn common JSON syntax pitfalls, how to parse large payloads safely, differences between JSON and JavaScript object notation, and how to debug minified payloads.",
    category: "Developer Guide",
    readTime: "5 min read",
    date: "November 2026",
    author: "EverythingTools Engineering",
  },
  {
    id: "secure-pdf-merging",
    slug: "secure-pdf-merging-in-browser",
    title: "How to Merge and Reorganize PDFs Without Server Uploads",
    description:
      "Discover how modern JavaScript libraries like PDF-lib reconstruct PDF page trees directly inside browser memory, keeping tax returns and legal contracts completely confidential.",
    category: "Productivity",
    readTime: "4 min read",
    date: "November 2026",
    author: "EverythingTools Engineering",
  },
];
