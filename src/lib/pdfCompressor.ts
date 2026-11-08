import { PDFDocument } from "pdf-lib";

export type CompressionMode = "target-size" | "preset";
export type CompressionPreset = "high" | "recommended" | "strong";

export interface CompressionSettings {
  id: CompressionPreset;
  name: string;
  badge: string;
  scale: number;
  quality: number;
  description: string;
  tradeoff: string;
  recommendedFor: string;
}

export const COMPRESSION_PRESETS: Record<CompressionPreset, CompressionSettings> = {
  high: {
    id: "high",
    name: "Higher Visual Quality",
    badge: "Mild Compression",
    scale: 1.5,
    quality: 0.85,
    description: "Renders at 1.5x resolution with light compression. Retains crisp lines, sharp text edges, and fine details.",
    tradeoff: "Produces higher visual clarity, but results in a larger output file size.",
    recommendedFor: "Documents with detailed charts, small graphics, architectural plans, or presentations.",
  },
  recommended: {
    id: "recommended",
    name: "Recommended Balance",
    badge: "Balanced",
    scale: 1.15,
    quality: 0.70,
    description: "Standard resolution rendering with moderate JPEG compression. Balances file size reduction with readable clarity.",
    tradeoff: "Delivers substantial file size savings while keeping text and images clearly readable.",
    recommendedFor: "Standard everyday documents, scanned agreements, invoices, and email attachments.",
  },
  strong: {
    id: "strong",
    name: "Smaller File Size",
    badge: "Maximum Reduction",
    scale: 0.85,
    quality: 0.50,
    description: "Lower resolution rendering with aggressive image compression. Minimizes file size as much as possible.",
    tradeoff: "Minimizes file size, but causes noticeable image softening and minor compression artifacts.",
    recommendedFor: "Strict upload forms, government portals, or email services with low attachment size limits.",
  },
};

export interface TargetSearchProfile {
  id: string;
  name: string;
  scale: number;
  quality: number;
}

export const TARGET_SEARCH_PROFILES: TargetSearchProfile[] = [
  { id: "p1", name: "Ultra High Quality", scale: 1.50, quality: 0.85 },
  { id: "p2", name: "High Quality", scale: 1.35, quality: 0.80 },
  { id: "p3", name: "Balanced High", scale: 1.20, quality: 0.75 },
  { id: "p4", name: "Recommended Balance", scale: 1.10, quality: 0.68 },
  { id: "p5", name: "Medium Compression", scale: 0.95, quality: 0.60 },
  { id: "p6", name: "Strong Compression", scale: 0.82, quality: 0.50 },
  { id: "p7", name: "Very Strong Compression", scale: 0.70, quality: 0.42 },
  { id: "p8", name: "Maximum Reduction", scale: 0.55, quality: 0.35 },
];

export interface CompressionOptions {
  mode: CompressionMode;
  preset?: CompressionPreset;
  targetSizeBytes?: number;
}

export interface CompressionProgress {
  current: number;
  total: number;
  stage: string;
  percent: number;
  pass?: number;
  totalPasses?: number;
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
  mode: CompressionMode;
  targetSizeBytes?: number;
  targetAchieved?: boolean;
  effectiveScale: number;
  effectiveQuality: number;
  passCount: number;
  qualityProfileName: string;
}

export interface PagePreviewResult {
  dataUrl: string;
  width: number;
  height: number;
  estimatedPageBytes: number;
  scale: number;
  quality: number;
}

/**
 * Renders a single page to a JPEG Data URL to estimate quality and byte size.
 */
export async function generatePagePreview(
  file: File,
  pageNumber: number = 1,
  scale: number = 1.0,
  quality: number = 0.70
): Promise<PagePreviewResult> {
  const pdfjsLib = await import("pdfjs-dist");
  if (typeof window !== "undefined") {
    pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
  }

  const arrayBuffer = await file.arrayBuffer();
  const loadingTask = pdfjsLib.getDocument({
    data: arrayBuffer,
    cMapUrl: "https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/cmaps/",
    cMapPacked: true,
  });
  const pdfDoc = await loadingTask.promise;

  const page = await pdfDoc.getPage(Math.min(pageNumber, pdfDoc.numPages));
  const renderViewport = page.getViewport({ scale });

  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.floor(renderViewport.width));
  canvas.height = Math.max(1, Math.floor(renderViewport.height));

  const ctx = canvas.getContext("2d", { alpha: false });
  if (!ctx) {
    throw new Error("Failed to create canvas 2D rendering context.");
  }

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  await page.render({
    canvasContext: ctx,
    viewport: renderViewport,
  }).promise;

  const dataUrl = canvas.toDataURL("image/jpeg", quality);
  const estimatedPageBytes = Math.round(dataUrl.length * 0.75);
  const width = canvas.width;
  const height = canvas.height;

  // Clean up canvas memory
  canvas.width = 0;
  canvas.height = 0;

  return {
    dataUrl,
    width,
    height,
    estimatedPageBytes,
    scale,
    quality,
  };
}

/**
 * Internal helper to render and build a complete compressed PDF document with given scale & quality.
 */
async function buildCompressedPdf(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pdfDoc: any,
  scale: number,
  quality: number,
  onPageProgress?: (currentPage: number, totalPages: number) => void
): Promise<{ pdfBytes: Uint8Array; pageCount: number }> {
  const numPages = pdfDoc.numPages;
  const outputPdf = await PDFDocument.create();

  for (let i = 1; i <= numPages; i++) {
    onPageProgress?.(i, numPages);

    const page = await pdfDoc.getPage(i);
    const originalViewport = page.getViewport({ scale: 1.0 });
    const renderViewport = page.getViewport({ scale });

    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.floor(renderViewport.width));
    canvas.height = Math.max(1, Math.floor(renderViewport.height));

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) {
      throw new Error("Failed to create canvas 2D rendering context.");
    }

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    await page.render({
      canvasContext: ctx,
      viewport: renderViewport,
    }).promise;

    const jpegDataUrl = canvas.toDataURL("image/jpeg", quality);

    // Immediately release canvas memory
    canvas.width = 0;
    canvas.height = 0;

    const embeddedImage = await outputPdf.embedJpg(jpegDataUrl);
    const outputPage = outputPdf.addPage([originalViewport.width, originalViewport.height]);
    outputPage.drawImage(embeddedImage, {
      x: 0,
      y: 0,
      width: originalViewport.width,
      height: originalViewport.height,
    });
  }

  const pdfBytes = await outputPdf.save({ useObjectStreams: true });
  return { pdfBytes, pageCount: numPages };
}

/**
 * Main PDF Compression Engine supporting both quality presets and measured target-size convergence.
 */
export async function compressPdfDocument(
  file: File,
  optionsOrPreset: CompressionOptions | CompressionPreset = "recommended",
  onProgress?: (progress: CompressionProgress) => void
): Promise<CompressionResult> {
  const startTime = Date.now();

  const options: CompressionOptions =
    typeof optionsOrPreset === "string"
      ? { mode: "preset", preset: optionsOrPreset }
      : optionsOrPreset;

  const mode = options.mode || "preset";

  // 1. Dynamic import of PDF.js
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

  let finalBytes: Uint8Array;
  let effectiveScale: number;
  let effectiveQuality: number;
  let qualityProfileName: string;
  let targetAchieved: boolean | undefined = undefined;
  let passCount = 1;

  if (mode === "preset") {
    // Mode A: Fixed Preset Mode
    const presetKey = options.preset || "recommended";
    const presetConfig = COMPRESSION_PRESETS[presetKey];
    effectiveScale = presetConfig.scale;
    effectiveQuality = presetConfig.quality;
    qualityProfileName = presetConfig.name;

    const buildResult = await buildCompressedPdf(
      pdfDoc,
      effectiveScale,
      effectiveQuality,
      (curr, total) => {
        const percent = Math.round(15 + ((curr - 1) / total) * 75);
        onProgress?.({
          current: curr,
          total,
          stage: `Compressing page ${curr} of ${total} (${presetConfig.name})...`,
          percent,
          pass: 1,
          totalPasses: 1,
        });
      }
    );

    finalBytes = buildResult.pdfBytes;
  } else {
    // Mode B: Target Size Mode
    const targetBytes = options.targetSizeBytes || Math.round(file.size * 0.8);
    const pdfOverheadEst = 2500 + numPages * 400;

    onProgress?.({
      current: 0,
      total: numPages,
      stage: "Analyzing document pages to calculate optimal compression...",
      percent: 15,
      pass: 1,
      totalPasses: 1,
    });

    // Calibration: sample Page 1 to estimate JPEG compression size
    const samplePage = await pdfDoc.getPage(1);
    let chosenProfile = TARGET_SEARCH_PROFILES[TARGET_SEARCH_PROFILES.length - 1]; // fallback to max reduction

    for (const profile of TARGET_SEARCH_PROFILES) {
      const renderViewport = samplePage.getViewport({ scale: profile.scale });
      const testCanvas = document.createElement("canvas");
      testCanvas.width = Math.max(1, Math.floor(renderViewport.width));
      testCanvas.height = Math.max(1, Math.floor(renderViewport.height));

      const ctx = testCanvas.getContext("2d", { alpha: false });
      if (ctx) {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, testCanvas.width, testCanvas.height);
        await samplePage.render({ canvasContext: ctx, viewport: renderViewport }).promise;
        const testJpeg = testCanvas.toDataURL("image/jpeg", profile.quality);
        const estSampleBytes = Math.round(testJpeg.length * 0.75);
        const estTotalBytes = pdfOverheadEst + estSampleBytes * numPages;

        testCanvas.width = 0;
        testCanvas.height = 0;

        if (estTotalBytes <= targetBytes) {
          chosenProfile = profile;
          break; // First match is highest quality profile meeting target
        }
      }
    }

    effectiveScale = chosenProfile.scale;
    effectiveQuality = chosenProfile.quality;
    qualityProfileName = chosenProfile.name;

    // Pass 1: Build document with chosen profile
    const pass1 = await buildCompressedPdf(
      pdfDoc,
      effectiveScale,
      effectiveQuality,
      (curr, total) => {
        const percent = Math.round(20 + ((curr - 1) / total) * 70);
        onProgress?.({
          current: curr,
          total,
          stage: `Compressing page ${curr} of ${total} (${chosenProfile.name})...`,
          percent,
          pass: 1,
          totalPasses: 1,
        });
      }
    );

    const pass1Size = pass1.pdfBytes.byteLength;

    if (pass1Size <= targetBytes) {
      // Target met on Pass 1!
      finalBytes = pass1.pdfBytes;
      targetAchieved = true;
      passCount = 1;
    } else {
      // Pass 1 exceeded target (e.g. later pages had more complex images than page 1)
      // Check if we can do an adjustment pass
      if (chosenProfile.id === "p8") {
        // Already at maximum reduction
        finalBytes = pass1.pdfBytes;
        targetAchieved = false;
        passCount = 1;
      } else {
        // Run Pass 2: Calibrated adjustment
        passCount = 2;
        const targetImgBytes = Math.max(1000, targetBytes - pdfOverheadEst);
        const actualImgBytes = Math.max(1000, pass1Size - pdfOverheadEst);
        const ratio = targetImgBytes / actualImgBytes;

        const scaleFactor = Math.sqrt(Math.max(0.2, ratio * 0.90));
        const adjustedScale = Math.max(0.50, Math.min(effectiveScale * scaleFactor, effectiveScale - 0.12));
        const adjustedQuality = Math.max(0.35, Math.min(effectiveQuality * Math.sqrt(ratio), effectiveQuality - 0.08));

        effectiveScale = parseFloat(adjustedScale.toFixed(2));
        effectiveQuality = parseFloat(adjustedQuality.toFixed(2));
        qualityProfileName = "Fine-Tuned Target Profile";

        onProgress?.({
          current: 0,
          total: numPages,
          stage: "Fine-tuning compression to achieve exact target size...",
          percent: 60,
          pass: 2,
          totalPasses: 2,
        });

        const pass2 = await buildCompressedPdf(
          pdfDoc,
          effectiveScale,
          effectiveQuality,
          (curr, total) => {
            const percent = Math.round(60 + ((curr - 1) / total) * 35);
            onProgress?.({
              current: curr,
              total,
              stage: `Fine-tuning page ${curr} of ${total} (Pass 2)...`,
              percent,
              pass: 2,
              totalPasses: 2,
            });
          }
        );

        const pass2Size = pass2.pdfBytes.byteLength;
        finalBytes = pass2.pdfBytes;
        targetAchieved = pass2Size <= targetBytes;
      }
    }
  }

  // Finalize serialization
  onProgress?.({
    current: numPages,
    total: numPages,
    stage: "Finalizing optimized PDF streams...",
    percent: 98,
    pass: passCount,
    totalPasses: passCount,
  });

  const compressedBlob = new Blob([finalBytes.buffer as ArrayBuffer], {
    type: "application/pdf",
  });
  const blobUrl = URL.createObjectURL(compressedBlob);

  const durationSeconds = parseFloat(((Date.now() - startTime) / 1000).toFixed(2));
  const originalSizeBytes = file.size;
  const compressedSizeBytes = finalBytes.byteLength;
  const savedBytes = originalSizeBytes - compressedSizeBytes;
  const percentReduction =
    originalSizeBytes > 0 && savedBytes > 0
      ? parseFloat(((savedBytes / originalSizeBytes) * 100).toFixed(1))
      : 0;
  const isSmaller = savedBytes > 0;

  // If the document grew larger than the original, target is NOT achieved even if it met a loose target
  const finalTargetAchieved =
    mode === "target-size" ? (isSmaller && targetAchieved === true) : undefined;

  onProgress?.({
    current: numPages,
    total: numPages,
    stage: "Compression complete!",
    percent: 100,
    pass: passCount,
    totalPasses: passCount,
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
    mode,
    targetSizeBytes: options.targetSizeBytes,
    targetAchieved: finalTargetAchieved,
    effectiveScale,
    effectiveQuality,
    passCount,
    qualityProfileName,
  };
}
