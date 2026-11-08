"use client";

import React, { useState, useEffect } from "react";
import {
  compressPdfDocument,
  COMPRESSION_PRESETS,
  CompressionPreset,
  CompressionProgress,
  CompressionResult,
} from "@/lib/pdfCompressor";
import { PdfUploadDropzone } from "./PdfUploadDropzone";
import { Button } from "@/components/common/Button";
import {
  Minimize2,
  Download,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  ShieldCheck,
  Zap,
  Info,
  Clock,
  Sliders,
} from "lucide-react";
import { formatFileSize, cn } from "@/lib/utils";

export function CompressPdfTool() {
  const [files, setFiles] = useState<File[]>([]);
  const [preset, setPreset] = useState<CompressionPreset>("recommended");
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState<CompressionProgress | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<CompressionResult | null>(null);

  // Clean up blob URL on unmount
  useEffect(() => {
    return () => {
      if (result?.blobUrl) {
        URL.revokeObjectURL(result.blobUrl);
      }
    };
  }, [result]);

  const selectedFile = files[0] || null;

  const handleCompress = async () => {
    if (!selectedFile || isProcessing) return;

    setIsProcessing(true);
    setError(null);
    setProgress({ current: 0, total: 100, stage: "Starting compression pipeline...", percent: 2 });

    try {
      const res = await compressPdfDocument(selectedFile, preset, (p) => {
        setProgress(p);
      });
      setResult(res);
    } catch (err: unknown) {
      console.error("Compression error:", err);
      const msg =
        err instanceof Error
          ? err.message
          : "An unexpected error occurred during client-side compression.";
      setError(msg);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    if (result?.blobUrl) {
      URL.revokeObjectURL(result.blobUrl);
    }
    setFiles([]);
    setResult(null);
    setError(null);
    setProgress(null);
  };

  return (
    <div className="space-y-6">
      {/* Privacy Guarantee Banner */}
      <div className="flex items-center justify-between p-3.5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-xs text-emerald-700 dark:text-emerald-300">
        <span className="flex items-center gap-1.5 font-medium">
          <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-500" />
          <span>100% In-Browser Compression: Files are processed on your local device without external uploads.</span>
        </span>
        <span className="hidden sm:inline font-semibold">Zero Server Uploads</span>
      </div>

      {!result ? (
        /* Workspace Setup Screen */
        <div className="p-6 sm:p-8 rounded-2xl border border-border bg-card shadow-md space-y-6">
          {/* File Dropzone */}
          <div>
            <PdfUploadDropzone
              files={files}
              onFilesChange={setFiles}
              multiple={false}
              disabled={isProcessing}
              helperText="Choose the PDF file you wish to optimize"
            />
          </div>

          {selectedFile && (
            <>
              {/* Quality Preset Selection Cards */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-primary" /> Select Compression Preset
                  </span>
                  <span className="text-xs text-muted-foreground font-mono">
                    Target: {COMPRESSION_PRESETS[preset].badge}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                  {(["high", "recommended", "strong"] as CompressionPreset[]).map((key) => {
                    const item = COMPRESSION_PRESETS[key];
                    const isSelected = preset === key;

                    return (
                      <div
                        key={key}
                        onClick={() => !isProcessing && setPreset(key)}
                        className={cn(
                          "relative p-4 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between select-none",
                          isSelected
                            ? "border-primary bg-primary/5 shadow-xs"
                            : "border-border/80 bg-muted/20 hover:border-primary/40 hover:bg-muted/30",
                          isProcessing && "opacity-60 cursor-not-allowed"
                        )}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-bold text-sm text-foreground">
                              {item.name}
                            </span>
                            <span
                              className={cn(
                                "text-[10px] font-bold px-2 py-0.5 rounded-full uppercase",
                                isSelected
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-muted text-muted-foreground"
                              )}
                            >
                              {item.badge}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {item.description}
                          </p>
                        </div>

                        <div className="mt-3 pt-2.5 border-t border-border/40 text-[11px] text-muted-foreground/80">
                          <span className="font-semibold text-foreground">Best for: </span>
                          {item.recommendedFor}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Visible Notice Regarding Rasterization */}
                <div className="p-3.5 rounded-xl border border-amber-500/25 bg-amber-500/10 text-amber-900 dark:text-amber-200 text-xs flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-amber-600 dark:text-amber-400" />
                  <p className="leading-relaxed">
                    This tool converts PDF pages into compressed images. Text may no longer be selectable or searchable, and links, forms, annotations and some document metadata may not be preserved. Keep your original PDF.
                  </p>
                </div>
              </div>

              {/* Error Alert */}
              {error && (
                <div className="p-3.5 rounded-xl border border-destructive/30 bg-destructive/10 text-destructive text-xs flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <p className="leading-relaxed">{error}</p>
                </div>
              )}

              {/* Progress Indicator */}
              {isProcessing && progress && (
                <div className="p-4 rounded-xl border border-border bg-muted/30 space-y-2.5 animate-in fade-in">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-foreground flex items-center gap-2">
                      <Zap className="w-3.5 h-3.5 text-primary animate-pulse" />
                      {progress.stage}
                    </span>
                    <span className="font-mono font-bold text-primary">{progress.percent}%</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all duration-200"
                      style={{ width: `${progress.percent}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Actions Footer */}
              <div className="pt-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-xs text-muted-foreground">
                  Original Document:{" "}
                  <span className="font-bold text-foreground">{formatFileSize(selectedFile.size)}</span>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <Button
                    type="button"
                    size="lg"
                    variant="primary"
                    onClick={handleCompress}
                    disabled={isProcessing}
                    isLoading={isProcessing}
                    className="w-full sm:w-auto gap-2"
                  >
                    <Minimize2 className="w-4 h-4" />
                    {isProcessing ? "Compressing in Browser..." : "Compress PDF"}
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      ) : (
        /* Compression Results Screen */
        <div className="p-8 sm:p-10 rounded-2xl border border-border bg-card shadow-lg text-center space-y-6 animate-in fade-in">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/20">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="max-w-md mx-auto space-y-2">
            <h2 className="text-2xl font-extrabold text-foreground">
              {result.isSmaller ? "PDF Compressed Successfully!" : "Compression Analysis Complete"}
            </h2>
            <p className="text-sm text-muted-foreground">
              {result.isSmaller
                ? "Your document was optimized in your browser without uploading to any remote server."
                : "Your document is already tightly optimized or composed of pure vector text."}
            </p>
          </div>

          {/* Genuine Size Metrics Comparison Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 max-w-2xl mx-auto gap-3 py-2 text-center">
            <div className="p-3.5 rounded-xl bg-muted/40 border border-border">
              <span className="text-[11px] font-semibold text-muted-foreground uppercase block">
                Original Size
              </span>
              <span className="text-lg font-bold text-foreground mt-0.5 block">
                {formatFileSize(result.originalSizeBytes)}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-muted/40 border border-border">
              <span className="text-[11px] font-semibold text-muted-foreground uppercase block">
                Output Size
              </span>
              <span
                className={cn(
                  "text-lg font-bold mt-0.5 block",
                  result.isSmaller
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-foreground"
                )}
              >
                {formatFileSize(result.compressedSizeBytes)}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-muted/40 border border-border">
              <span className="text-[11px] font-semibold text-muted-foreground uppercase block">
                Space Saved
              </span>
              <span
                className={cn(
                  "text-lg font-bold mt-0.5 block",
                  result.isSmaller
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-muted-foreground"
                )}
              >
                {result.isSmaller ? `-${formatFileSize(result.savedBytes)}` : "0 B"}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-muted/40 border border-border">
              <span className="text-[11px] font-semibold text-muted-foreground uppercase block">
                Reduction
              </span>
              <span
                className={cn(
                  "text-lg font-bold mt-0.5 block",
                  result.isSmaller
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-muted-foreground"
                )}
              >
                {result.isSmaller ? `${result.percentReduction}%` : "0%"}
              </span>
            </div>
          </div>

          {/* Honest Explanation If Not Smaller */}
          {!result.isSmaller && (
            <div className="p-4 rounded-xl border border-blue-500/20 bg-blue-500/5 text-xs text-left max-w-xl mx-auto flex items-start gap-2.5">
              <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-bold text-foreground">Why did the file size not decrease?</p>
                <p className="text-muted-foreground leading-relaxed">
                  When a PDF consists of lightweight vector text fonts or is already heavily compressed, converting pages into image streams requires more data than the original vector instructions. No size reduction was achieved for this document. You should keep and use your original file.
                </p>
              </div>
            </div>
          )}

          {/* Time & Page Stats */}
          <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> Time taken: {result.durationSeconds}s
            </span>
            <span>•</span>
            <span>Pages processed: {result.pageCount}</span>
          </div>

          {/* Download & Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <a
              href={result.blobUrl}
              download={`compressed-${selectedFile?.name || "document.pdf"}`}
              className="w-full sm:w-auto"
            >
              <Button size="lg" variant="primary" className="w-full gap-2">
                <Download className="w-4 h-4" />
                Download Compressed PDF
              </Button>
            </a>

            <Button
              size="lg"
              variant="outline"
              onClick={handleReset}
              className="w-full sm:w-auto gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Compress Another PDF
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
