import { PDFDocument } from "pdf-lib";

export type CompressionPreset = "high" | "recommended" | "strong";

export interface CompressionSettings {
  id: CompressionPreset;
  name: string;
  badge: string;
  scale: number;
  quality: number;
  description: string;
  recommendedFor: string;
}

export const COMPRESSION_PRESETS: Record<CompressionPreset, CompressionSettings> = {
  high: {
    id: "high",
    name: "High Quality",
    badge: "Mild Compression",
    scale: 1.5,
    quality: 0.85,
    description: "Higher rendering resolution and higher image quality. Produces the clearest output but results in larger file sizes.",
    recommendedFor: "Documents with detailed charts, small graphics, or where visual clarity is the priority.",
  },
  recommended: {
    id: "recommended",
    name: "Recommended",
    badge: "Balanced",
    scale: 1.2,
    quality: 0.70,
    description: "Balanced rendering resolution and moderate image compression. Delivers practical file-size reduction while keeping text and images clearly readable.",
    recommendedFor: "Standard everyday documents, scanned agreements, and email attachments.",
  },
  strong: {
    id: "strong",
    name: "Strong Compression",
    badge: "Maximum Reduction",
    scale: 0.9,
    quality: 0.50,
    description: "Lower rendering resolution and higher image compression. Minimizes file size as much as possible at the expense of noticeable image softening.",
    recommendedFor: "Strict upload forms or email size limits where file size matters more than fine image detail.",
  },
};

export interface CompressionProgress {
  current: number;
  total: number;
  stage: string;
  percent: number;
}

export interface CompressionResult {
  blob: Blob;
  blobUrl: string;
  originalSizeBytes: number;
  compressedSizeBytes: number;
  savedBytes: number;
  percentReduction: number;
  durationSeconds: number;
  pageCount: number;
  isSmaller: boolean;
}

export async function compressPdfDocument(
  file: File,
  preset: CompressionPreset = "recommended",
  onProgress?: (progress: CompressionProgress) => void
): Promise<CompressionResult> {
  const startTime = Date.now();
  const presetConfig = COMPRESSION_PRESETS[preset];

  // 1. Dynamic import of PDF.js to ensure purely client-side browser execution
  onProgress?.({
    current: 0,
    total: 100,
    stage: "Initializing browser-side PDF engine...",
    percent: 5,
  });

  const pdfjsLib = await import("pdfjs-dist");
  if (typeof window !== "undefined") {
    pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
  }

  // 2. Read file to array buffer and load document
  onProgress?.({
    current: 0,
    total: 100,
    stage: "Reading document into memory...",
    percent: 10,
  });

  const arrayBuffer = await file.arrayBuffer();

  let pdfDoc;
  try {
    const loadingTask = pdfjsLib.getDocument({
      data: arrayBuffer,
      cMapUrl: "https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/cmaps/",
      cMapPacked: true,
    });
    pdfDoc = await loadingTask.promise;
  } catch (err: unknown) {
    if (err && typeof err === "object" && "name" in err) {
      if (err.name === "PasswordException") {
        throw new Error(
          "This PDF document is encrypted or password-protected. Please remove the password protection before compressing."
        );
      }
      if (err.name === "InvalidPDFException") {
        throw new Error("Unable to parse file. The document appears to be corrupted or not a valid PDF.");
      }
    }
    throw new Error("Failed to load PDF document: " + (err instanceof Error ? err.message : String(err)));
  }

  const numPages = pdfDoc.numPages;
  if (numPages === 0) {
    throw new Error("The selected PDF document contains 0 pages.");
  }

  // 3. Initialize output PDF via pdf-lib
  const outputPdf = await PDFDocument.create();

  // 4. Process each page sequentially
  for (let i = 1; i <= numPages; i++) {
    const pagePercent = Math.round(15 + ((i - 1) / numPages) * 75);
    onProgress?.({
      current: i,
      total: numPages,
      stage: `Recompressing page ${i} of ${numPages} (${presetConfig.name})...`,
      percent: pagePercent,
    });

    const page = await pdfDoc.getPage(i);
    const originalViewport = page.getViewport({ scale: 1.0 });
    const renderViewport = page.getViewport({ scale: presetConfig.scale });

    // Render page to offscreen canvas
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.floor(renderViewport.width));
    canvas.height = Math.max(1, Math.floor(renderViewport.height));

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) {
      throw new Error("Failed to create canvas 2D rendering context.");
    }

    // Set white background for transparent pages
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    await page.render({
      canvasContext: ctx,
      viewport: renderViewport,
    }).promise;

    // Convert to compressed JPEG data URL
    const jpegDataUrl = canvas.toDataURL("image/jpeg", presetConfig.quality);

    // Free canvas memory immediately
    canvas.width = 0;
    canvas.height = 0;

    // Embed into output PDF
    const embeddedImage = await outputPdf.embedJpg(jpegDataUrl);
    const outputPage = outputPdf.addPage([originalViewport.width, originalViewport.height]);
    outputPage.drawImage(embeddedImage, {
      x: 0,
      y: 0,
      width: originalViewport.width,
      height: originalViewport.height,
    });
  }

  // 5. Serialize with object streams optimization
  onProgress?.({
    current: numPages,
    total: numPages,
    stage: "Finalizing object streams and metadata compression...",
    percent: 95,
  });

  const compressedBytes = await outputPdf.save({ useObjectStreams: true });
  const compressedBlob = new Blob([compressedBytes.buffer as ArrayBuffer], {
    type: "application/pdf",
  });
  const blobUrl = URL.createObjectURL(compressedBlob);

  const durationSeconds = parseFloat(((Date.now() - startTime) / 1000).toFixed(2));
  const originalSizeBytes = file.size;
  const compressedSizeBytes = compressedBytes.byteLength;
  const savedBytes = originalSizeBytes - compressedSizeBytes;
  const percentReduction =
    originalSizeBytes > 0 ? parseFloat(((savedBytes / originalSizeBytes) * 100).toFixed(1)) : 0;
  const isSmaller = savedBytes > 0;

  onProgress?.({
    current: numPages,
    total: numPages,
    stage: "Compression complete!",
    percent: 100,
  });

  return {
    blob: compressedBlob,
    blobUrl,
    originalSizeBytes,
    compressedSizeBytes,
    savedBytes,
    percentReduction,
    durationSeconds,
    pageCount: numPages,
    isSmaller,
  };
}

