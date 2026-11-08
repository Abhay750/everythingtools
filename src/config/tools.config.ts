import { ToolDefinition } from "@/types/tools";

export const toolsConfig: ToolDefinition[] = [
  // --- TEXT TOOLS ---
  {
    id: "word-counter",
    slug: "word-counter",
    name: "Word & Character Counter",
    category: "text-tools",
    shortDescription: "Count words, characters, sentences, paragraphs, and reading time in real time.",
    description:
      "A fast, accurate, client-side text analyzer. Calculate words, characters (with and without spaces), sentences, paragraphs, reading time, and speaking time instantly without uploading your text to any server.",
    iconName: "FileSpreadsheet",
    isPopular: true,
    isNew: false,
    isClientSideOnly: true,
    status: "available",
    tags: ["text", "counter", "words", "characters", "seo", "reading-time", "writing"],
    keywords: ["word counter", "character count", "count words online", "letter counter", "reading time calculator", "paragraph counter"],
    features: [
      "Real-time keystroke calculation without latency",
      "Character count with and without whitespace",
      "Sentence, paragraph, and line counters",
      "Estimated reading time (200 wpm) and speaking time (130 wpm)",
      "Keyword density breakdown for SEO writers",
      "One-click copy, clear, and uppercase/lowercase transformation",
    ],
    howToUse: [
      {
        step: 1,
        title: "Input your text",
        description: "Type, paste, or drag and drop your text into the editor area.",
      },
      {
        step: 2,
        title: "Review live metrics",
        description: "Watch word, character, sentence, and reading time metrics update instantly as you type.",
      },
      {
        step: 3,
        title: "Copy or format",
        description: "Use quick action buttons to copy formatted text or clear the editor for another document.",
      },
    ],
    faqs: [
      {
        question: "Is my text saved or sent to any remote server?",
        answer: "No. EverythingTools calculates all metrics 100% locally in your web browser. Your confidential writing, essays, or code never leave your device.",
      },
      {
        question: "How is reading time calculated?",
        answer: "Standard reading time is based on an average adult reading speed of 200 words per minute (WPM). Speaking time is based on a conversational pace of 130 WPM.",
      },
      {
        question: "Is there a limit on how much text I can paste?",
        answer: "Because calculations happen in your browser memory, you can paste documents containing tens of thousands of words with no artificial file size caps.",
      },
    ],
    estimatedTime: "Instant (<1ms)",
    rating: { score: 4.9, count: 1240 },
  },
  {
    id: "case-converter",
    slug: "case-converter",
    name: "Text Case Converter",
    category: "text-tools",
    shortDescription: "Convert text to UPPERCASE, lowercase, Title Case, Sentence case, camelCase, and slug.",
    description:
      "Transform any block of text into multiple capitalization standards instantly. Perfect for programmers, copywriters, and data cleaners needing uniform string casing.",
    iconName: "Type",
    isPopular: true,
    isNew: false,
    isClientSideOnly: true,
    status: "available",
    tags: ["case", "uppercase", "lowercase", "title-case", "camelCase", "kebab-case"],
    keywords: ["case converter", "uppercase generator", "title case converter", "slugify text", "camelCase tool"],
    features: [
      "UPPERCASE, lowercase, and Sentence case",
      "Title Case following Chicago and AP style conventions",
      "Developer casings: camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE",
      "Instant copy to clipboard with tactile feedback",
    ],
    howToUse: [
      {
        step: 1,
        title: "Paste text",
        description: "Insert the text block you wish to convert.",
      },
      {
        step: 2,
        title: "Select casing format",
        description: "Click any format button to instantly rewrite the text into the desired format.",
      },
      {
        step: 3,
        title: "Copy output",
        description: "Click the copy button to save the converted string to your clipboard.",
      },
    ],
    faqs: [
      {
        question: "Does Title Case follow standard grammatical rules?",
        answer: "Yes, our algorithm intelligently keeps minor prepositions, conjunctions, and articles (like 'and', 'the', 'of') in lowercase unless they appear as the first word.",
      },
    ],
    rating: { score: 4.8, count: 890 },
  },
  {
    id: "diff-checker",
    slug: "diff-checker",
    name: "Text Diff Checker",
    category: "text-tools",
    shortDescription: "Compare two text blocks or code snippets to find differences, additions, and deletions.",
    description:
      "A fast side-by-side and unified text difference comparator. Highlight character-by-character, word-by-word, and line-by-line modifications with clear visual diff indicators.",
    iconName: "GitCompare",
    isPopular: false,
    isNew: true,
    isClientSideOnly: true,
    status: "available",
    tags: ["diff", "compare", "text-difference", "code-diff", "developer"],
    keywords: ["diff checker", "text comparison", "compare files online", "code difference finder"],
    features: [
      "Side-by-side split view and inline unified view",
      "Character-level and word-level change highlighting",
      "Syntax whitespace normalization toggle",
      "100% private and offline capable",
    ],
    howToUse: [
      {
        step: 1,
        title: "Enter original text",
        description: "Paste your base or original string in the left panel.",
      },
      {
        step: 2,
        title: "Enter modified text",
        description: "Paste the modified or updated version in the right panel.",
      },
      {
        step: 3,
        title: "Analyze differences",
        description: "Review color-coded additions (green) and deletions (red).",
      },
    ],
    faqs: [
      {
        question: "Can I compare code snippets?",
        answer: "Yes. The diff checker works with JSON, CSS, JavaScript, Python, HTML, and markdown.",
      },
    ],
    rating: { score: 4.9, count: 412 },
  },

  // --- DEVELOPER TOOLS ---
  {
    id: "json-formatter",
    slug: "json-formatter",
    name: "JSON Formatter & Validator",
    category: "developer-tools",
    shortDescription: "Format, beautify, validate, minify, and inspect JSON with detailed error markers.",
    description:
      "A developer-grade JSON beautifier and syntax validator. Automatically highlight structural errors, format minified API payloads with customizable indentation, and filter keys with zero server interaction.",
    iconName: "Braces",
    isPopular: true,
    isNew: false,
    isClientSideOnly: true,
    status: "available",
    tags: ["json", "formatter", "validator", "beautifier", "minify", "developer", "api"],
    keywords: ["json formatter", "json beautifier", "validate json online", "json validator", "prettify json"],
    features: [
      "Instant syntax validation with precise line and column error markers",
      "2-space, 4-space, and tab indentation options",
      "One-click minify / compact JSON output",
      "Collapsible tree view and raw code preview",
      "Payload size and key statistics breakdown",
    ],
    howToUse: [
      {
        step: 1,
        title: "Paste raw JSON",
        description: "Paste messy, compressed, or unformatted JSON into the input editor.",
      },
      {
        step: 2,
        title: "Format or validate",
        description: "Click 'Format' to beautify or 'Minify' to remove all whitespace.",
      },
      {
        step: 3,
        title: "Export or copy",
        description: "Copy valid formatted JSON or download it as a .json file.",
      },
    ],
    faqs: [
      {
        question: "Can I format confidential API tokens or customer data?",
        answer: "Yes, because EverythingTools processes JSON entirely within your browser runtime (using V8's native JSON engine). No tokens or secrets are ever transmitted.",
      },
    ],
    rating: { score: 4.9, count: 2150 },
  },
  {
    id: "base64-encoder-decoder",
    slug: "base64-encoder-decoder",
    name: "Base64 Encoder & Decoder",
    category: "developer-tools",
    shortDescription: "Encode and decode text, strings, and binary files to and from Base64 format.",
    description:
      "Encode strings and files into Base64 format or decode Base64 back to plain human-readable UTF-8 text with full Unicode support.",
    iconName: "Binary",
    isPopular: true,
    isNew: false,
    isClientSideOnly: true,
    status: "available",
    tags: ["base64", "encoder", "decoder", "developer", "utf-8", "binary"],
    keywords: ["base64 encode", "base64 decode", "base64 converter", "string to base64"],
    features: [
      "Bidirectional conversion: Encode and Decode tabs",
      "Full UTF-8 Unicode characters and emoji support",
      "URL-safe Base64 mode toggle (replacing +/ with -_)",
      "Instant copy and download actions",
    ],
    howToUse: [
      {
        step: 1,
        title: "Choose mode",
        description: "Select 'Encode' to create Base64 or 'Decode' to inspect Base64.",
      },
      {
        step: 2,
        title: "Provide input",
        description: "Type or paste your input into the source box.",
      },
      {
        step: 3,
        title: "Get result",
        description: "The transformed data appears in real-time ready to copy.",
      },
    ],
    faqs: [
      {
        question: "Does this support non-ASCII characters?",
        answer: "Yes, our encoder properly handles multi-byte UTF-8 character sequences, including accented letters, Asian scripts, and emojis.",
      },
    ],
    rating: { score: 4.8, count: 960 },
  },
  {
    id: "jwt-decoder",
    slug: "jwt-decoder",
    name: "JWT Token Inspector & Decoder",
    category: "developer-tools",
    shortDescription: "Decode and inspect JSON Web Tokens (JWT) headers, payloads, and expiration times.",
    description:
      "Safely inspect JWT tokens locally. Parse claims, view issued-at and expiration timestamps in human-readable local time, and inspect authorization roles without sending tokens to any backend.",
    iconName: "KeyRound",
    isPopular: false,
    isNew: true,
    isClientSideOnly: true,
    status: "available",
    tags: ["jwt", "token", "decoder", "oauth", "security", "developer"],
    keywords: ["jwt decoder", "decode jwt online", "parse jwt token", "jwt viewer"],
    features: [
      "Color-coded header, payload, and signature breakdown",
      "Automatic expiration status checker (Expired vs Active countdown)",
      "Unix timestamp translation into user's local timezone",
      "Never transmits tokens or secrets over the wire",
    ],
    howToUse: [
      {
        step: 1,
        title: "Paste JWT",
        description: "Paste your bearer token or three-part encoded JWT string.",
      },
      {
        step: 2,
        title: "Inspect payload",
        description: "View the JSON header and decoded payload claims immediately.",
      },
    ],
    faqs: [
      {
        question: "Is it safe to paste production JWTs here?",
        answer: "Yes, because our implementation runs pure client-side string splitting and Base64URL parsing. No network calls are made.",
      },
    ],
    rating: { score: 4.9, count: 780 },
  },

  // --- PDF TOOLS ---
  {
    id: "merge-pdf",
    slug: "merge-pdf",
    name: "Merge PDF Files",
    category: "pdf-tools",
    shortDescription: "Combine multiple PDF documents into a single organized file in seconds.",
    description:
      "Merge two or more PDF files into one clean document. Drag and drop to reorder pages, remove unnecessary sheets, and download your consolidated PDF with 100% browser-side privacy.",
    iconName: "FilePlus2",
    isPopular: true,
    isNew: false,
    isClientSideOnly: true,
    status: "available",
    tags: ["pdf", "merge", "combine-pdf", "pdf-joiner", "documents"],
    keywords: ["merge pdf", "combine pdf files", "pdf merger online", "join pdf pages"],
    features: [
      "Combine unlimited PDF files without file size limitations",
      "Interactive page thumbnail reordering and drag-and-drop",
      "Completely local browser processing using PDF-lib",
      "Zero server uploads: 100% confidential and compliant",
    ],
    howToUse: [
      {
        step: 1,
        title: "Upload PDFs",
        description: "Select or drop the PDF files you want to combine from your computer.",
      },
      {
        step: 2,
        title: "Reorder",
        description: "Drag file cards to set your preferred order in the output document.",
      },
      {
        step: 3,
        title: "Merge & Download",
        description: "Click 'Merge PDF' and save your single combined document.",
      },
    ],
    faqs: [
      {
        question: "Are my confidential legal documents uploaded to a cloud server?",
        answer: "Never. EverythingTools merges PDF files entirely inside your web browser's memory using WebAssembly. Your files never touch our servers.",
      },
    ],
    rating: { score: 4.9, count: 3200 },
  },
  {
    id: "compress-pdf",
    slug: "compress-pdf",
    name: "Compress PDF",
    category: "pdf-tools",
    shortDescription: "Reduce PDF file size by converting pages into optimized compressed images.",
    description:
      "Compress PDF documents directly in your browser. This tool converts PDF pages into compressed images, reducing file size for scanned paperwork and image-heavy files. Because pages are converted to images, text extraction and searchability are not preserved, and vector text or already-optimized files may increase in size.",
    iconName: "Minimize2",
    isPopular: true,
    isNew: false,
    isClientSideOnly: true,
    status: "available",
    tags: ["pdf", "compress", "shrink-pdf", "optimize-pdf", "reduce-size"],
    keywords: ["compress pdf", "reduce pdf size", "shrink pdf online", "pdf size reducer"],
    features: [
      "Three distinct compression presets: Strong Compression, Recommended, and High Quality",
      "100% browser-side processing without uploading files to remote servers",
      "Transparent reporting: shows exact space saved and alerts when a file increases in size",
      "Best suited for scanned contracts, receipts, photo documents, and image-heavy PDFs",
    ],
    howToUse: [
      {
        step: 1,
        title: "Select PDF",
        description: "Choose or drop the PDF file you wish to compress from your device.",
      },
      {
        step: 2,
        title: "Choose compression preset",
        description: "Select Strong Compression, Recommended, or High Quality based on your image clarity and file size goals.",
      },
      {
        step: 3,
        title: "Compress & Download",
        description: "Click 'Compress PDF' and download your processed document.",
      },
    ],
    faqs: [
      {
        question: "Will text in the compressed PDF still be selectable or searchable?",
        answer:
          "No. This tool rasterizes PDF pages into optimized images to achieve file-size reduction. Text, hyperlinks, fillable form fields, and document annotations will not remain interactive or selectable in the output PDF. Always keep your original document.",
      },
      {
        question: "Why did my PDF file size increase instead of decrease?",
        answer:
          "PDFs that consist of lean vector text or are already heavily compressed will often increase in size when converted into image streams. Size reduction is primarily achieved on documents containing uncompressed photos, camera scans, or high-resolution graphic assets.",
      },
      {
        question: "How much size reduction can I expect?",
        answer:
          "Reduction depends entirely on document contents. High-resolution scanned documents and photo-heavy PDFs typically see substantial size reduction, while already-optimized PDFs or pure text files will see little to no reduction.",
      },
    ],
    rating: { score: 4.8, count: 1840 },
  },

  // --- IMAGE TOOLS ---
  {
    id: "image-compressor",
    slug: "image-compressor",
    name: "Image Compressor",
    category: "image-tools",
    shortDescription: "Compress JPEG, PNG, and WebP images by up to 80% without noticeable quality loss.",
    description:
      "A fast client-side image optimizer utilizing HTML5 Canvas and WebAssembly. Shrink file sizes dramatically for faster websites, blogs, and email attachments.",
    iconName: "FileImage",
    isPopular: true,
    isNew: false,
    isClientSideOnly: true,
    status: "available",
    tags: ["image", "compress", "optimizer", "webp", "jpeg", "png", "web-performance"],
    keywords: ["image compressor", "compress jpeg", "compress png", "shrink image", "optimize pictures"],
    features: [
      "Support for JPEG, PNG, and modern WebP formats",
      "Real-time visual comparison slider (Before vs After)",
      "Batch multi-image compression support",
      "Zero server uploads: processes locally on your GPU/CPU",
    ],
    howToUse: [
      {
        step: 1,
        title: "Select images",
        description: "Drag and drop one or more images into the compressor.",
      },
      {
        step: 2,
        title: "Adjust quality slider",
        description: "Fine-tune compression percentage with instant size previews.",
      },
      {
        step: 3,
        title: "Download images",
        description: "Download individual optimized files or a combined ZIP archive.",
      },
    ],
    faqs: [
      {
        question: "Is there a file upload limit?",
        answer: "Since your device's browser handles the compression directly, you can compress very large photos without artificial upload restrictions.",
      },
    ],
    rating: { score: 4.9, count: 2450 },
  },
  {
    id: "image-converter",
    slug: "image-converter",
    name: "Image Format Converter",
    category: "image-tools",
    shortDescription: "Convert images seamlessly between PNG, JPG, WebP, AVIF, and BMP formats.",
    description:
      "Fast in-browser format conversion. Turn heavy PNGs into lightweight WebP graphics, convert JPGs for transparency, or prepare legacy images for modern web formats.",
    iconName: "RefreshCw",
    isPopular: false,
    isNew: true,
    isClientSideOnly: true,
    status: "available",
    tags: ["image", "converter", "png-to-jpg", "jpg-to-webp", "format-converter"],
    keywords: ["convert image", "png to jpg", "jpg to webp", "image format changer"],
    features: [
      "Instant canvas-based format encoding",
      "Support for PNG, JPG, WebP, and BMP",
      "Custom background fill color for transparent PNG to JPG conversions",
    ],
    howToUse: [
      {
        step: 1,
        title: "Upload image",
        description: "Select the image you wish to convert.",
      },
      {
        step: 2,
        title: "Select target format",
        description: "Choose PNG, JPG, or WebP.",
      },
      {
        step: 3,
        title: "Download",
        description: "Save your freshly converted image instantly.",
      },
    ],
    faqs: [
      {
        question: "Why convert JPG to WebP?",
        answer: "WebP files are typically 25% to 34% smaller than equivalent JPGs while retaining identical visual fidelity, dramatically improving website load speeds.",
      },
    ],
    rating: { score: 4.8, count: 620 },
  },

  // --- GENERATORS ---
  {
    id: "password-generator",
    slug: "password-generator",
    name: "Secure Password Generator",
    category: "generators",
    shortDescription: "Generate ultra-secure, cryptographically random passwords and passphrases.",
    description:
      "Create hacker-resistant passwords using the browser's native window.crypto CSPRNG engine. Customize length, uppercase, lowercase, numbers, symbols, and avoid ambiguous characters.",
    iconName: "ShieldCheck",
    isPopular: true,
    isNew: false,
    isClientSideOnly: true,
    status: "available",
    tags: ["password", "generator", "security", "crypto", "random"],
    keywords: ["password generator", "strong password generator", "random password", "secure password maker"],
    features: [
      "Hardware-level randomness via window.crypto.getRandomValues",
      "Custom length selector from 8 to 128 characters",
      "Exclude ambiguous characters (e.g. 0, O, 1, l, I) for easy reading",
      "Entropy and password strength indicator",
      "One-click copy with privacy auto-clear timeout",
    ],
    howToUse: [
      {
        step: 1,
        title: "Set preferences",
        description: "Choose your desired length and character sets (symbols, numbers, casing).",
      },
      {
        step: 2,
        title: "Generate",
        description: "Click 'Generate' to create a new cryptographically random password.",
      },
      {
        step: 3,
        title: "Copy",
        description: "Click the copy button to transfer the password to your clipboard safely.",
      },
    ],
    faqs: [
      {
        question: "Are generated passwords saved anywhere?",
        answer: "Never. EverythingTools never stores, logs, or transmits generated passwords. The moment you refresh or navigate away, the password is gone forever.",
      },
    ],
    rating: { score: 4.9, count: 1890 },
  },
  {
    id: "uuid-generator",
    slug: "uuid-generator",
    name: "UUID / GUID Generator",
    category: "generators",
    shortDescription: "Generate standard RFC 4122 Version 4 UUIDs (Universally Unique Identifiers) in bulk.",
    description:
      "Generate cryptographically strong UUID v4 strings for database keys, APIs, and microservice tracking. Copy single or bulk identifiers with custom casing and hyphens.",
    iconName: "Hash",
    isPopular: true,
    isNew: false,
    isClientSideOnly: true,
    status: "available",
    tags: ["uuid", "guid", "generator", "developer", "rfc4122"],
    keywords: ["uuid generator", "guid generator", "v4 uuid", "random uuid", "online uuid maker"],
    features: [
      "RFC 4122 compliant version 4 UUID generation",
      "Bulk generation up to 500 UUIDs at once",
      "Uppercase vs lowercase format options",
      "Optional hyphen removal for compact database keys",
    ],
    howToUse: [
      {
        step: 1,
        title: "Select quantity",
        description: "Choose how many UUIDs you need generated.",
      },
      {
        step: 2,
        title: "Configure formatting",
        description: "Toggle hyphens or uppercase formatting.",
      },
      {
        step: 3,
        title: "Copy or export",
        description: "Copy all identifiers with one click or download as text.",
      },
    ],
    faqs: [
      {
        question: "What are the chances of a UUID v4 collision?",
        answer: "Virtually zero. With 122 random bits, the probability of generating a duplicate UUID is roughly 1 in a billion billion, making them universally safe for database IDs.",
      },
    ],
    rating: { score: 4.9, count: 1410 },
  },
  {
    id: "qr-code-generator",
    slug: "qr-code-generator",
    name: "QR Code Generator",
    category: "generators",
    shortDescription: "Create custom QR codes for URLs, Wi-Fi credentials, text, and business contacts.",
    description:
      "Generate high-resolution QR codes that never expire. Customize error correction levels, foreground/background colors, and export crisp PNG or scalable SVG formats.",
    iconName: "QrCode",
    isPopular: true,
    isNew: true,
    isClientSideOnly: true,
    status: "available",
    tags: ["qr-code", "generator", "barcode", "wifi", "url", "sharing"],
    keywords: ["qr code generator", "free qr maker", "wifi qr code", "url to qr code", "custom qr code"],
    features: [
      "Direct client-side vector and raster generation",
      "Multiple data types: URL, Plain Text, Wi-Fi network, Email, vCard",
      "High Error Correction Level (ECC Level H) for maximum scan reliability",
      "Instant PNG and SVG vector download",
    ],
    howToUse: [
      {
        step: 1,
        title: "Enter content",
        description: "Type your destination URL, Wi-Fi details, or message.",
      },
      {
        step: 2,
        title: "Customize appearance",
        description: "Adjust color scheme or dimensions.",
      },
      {
        step: 3,
        title: "Download",
        description: "Save your QR code as PNG or SVG for digital or print use.",
      },
    ],
    faqs: [
      {
        question: "Do these QR codes have scan limits or expiration dates?",
        answer: "No! These are standard static QR codes. They link directly to your target destination with no redirect intermediaries, meaning they work forever with unlimited scans.",
      },
    ],
    rating: { score: 4.9, count: 2190 },
  },

  // --- CALCULATORS ---
  {
    id: "percentage-calculator",
    slug: "percentage-calculator",
    name: "Percentage Calculator",
    category: "calculators",
    shortDescription: "Calculate percentage changes, increases, discounts, and common math problems.",
    description:
      "A comprehensive percentage calculator answering everyday math questions: What is X% of Y? What percentage increase is X to Y? What is the final price after discount?",
    iconName: "Percent",
    isPopular: true,
    isNew: false,
    isClientSideOnly: true,
    status: "available",
    tags: ["percentage", "calculator", "math", "discount", "increase", "finance"],
    keywords: ["percentage calculator", "calculate percentage", "percent increase", "discount calculator"],
    features: [
      "4 common percentage calculation modes in one view",
      "Instant step-by-step formula explanations",
      "Discount and sales tax computation with savings summary",
      "Accurate floating-point rounding controls",
    ],
    howToUse: [
      {
        step: 1,
        title: "Choose question type",
        description: "Select the calculation type matching your problem.",
      },
      {
        step: 2,
        title: "Fill in values",
        description: "Enter your numbers in the corresponding fields.",
      },
      {
        step: 3,
        title: "View result & formula",
        description: "See the exact mathematical answer along with the breakdown formula.",
      },
    ],
    faqs: [
      {
        question: "How do you calculate percentage increase?",
        answer: "Percentage Increase = ((New Value - Original Value) / Original Value) * 100%. Our tool calculates this instantly and shows the formula.",
      },
    ],
    rating: { score: 4.8, count: 1120 },
  },
  {
    id: "aspect-ratio-calculator",
    slug: "aspect-ratio-calculator",
    name: "Aspect Ratio Calculator",
    category: "calculators",
    shortDescription: "Calculate image and video dimensions, aspect ratios (16:9, 4:3, 1:1), and resize targets.",
    description:
      "Find proportional widths and heights for videos, photography, responsive CSS layouts, and graphic design without distortion or stretched pixels.",
    iconName: "Maximize",
    isPopular: false,
    isNew: true,
    isClientSideOnly: true,
    status: "available",
    tags: ["aspect-ratio", "calculator", "dimensions", "video", "design", "css"],
    keywords: ["aspect ratio calculator", "16:9 ratio calculator", "image dimension calculator", "css aspect ratio"],
    features: [
      "Preset ratios: 16:9 (HD), 4:3 (Standard), 21:9 (Ultrawide), 1:1 (Square), 9:16 (Stories/Reels)",
      "Automatic dimension recalculation when changing width or height",
      "CSS aspect-ratio code snippet generator",
    ],
    howToUse: [
      {
        step: 1,
        title: "Enter original dimensions",
        description: "Provide original width and height (e.g. 1920 x 1080).",
      },
      {
        step: 2,
        title: "Enter target size",
        description: "Input either a target width or target height to calculate the matching dimension.",
      },
      {
        step: 3,
        title: "Copy CSS or values",
        description: "Grab proportional numbers or CSS snippet for your project.",
      },
    ],
    faqs: [
      {
        question: "What is the standard aspect ratio for YouTube videos?",
        answer: "The standard aspect ratio for desktop YouTube videos is 16:9 (e.g. 1920x1080 or 1280x720). For YouTube Shorts, it is 9:16 (1080x1920).",
      },
    ],
    rating: { score: 4.8, count: 540 },
  },
];

export function getToolBySlug(slug: string): ToolDefinition | undefined {
  return toolsConfig.find((t) => t.slug.toLowerCase() === slug.toLowerCase());
}

export function getToolsByCategory(categoryId: string): ToolDefinition[] {
  return toolsConfig.filter((t) => t.category.toLowerCase() === categoryId.toLowerCase());
}

export function getPopularTools(limit = 6): ToolDefinition[] {
  return toolsConfig.filter((t) => t.isPopular).slice(0, limit);
}

export function getRecentlyAddedTools(limit = 6): ToolDefinition[] {
  return toolsConfig.filter((t) => t.isNew).slice(0, limit);
}

