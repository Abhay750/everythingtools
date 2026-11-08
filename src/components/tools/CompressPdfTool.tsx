"use client";

import React, { useState, useEffect } from "react";
import {
  compressPdfDocument,
  generatePagePreview,
  COMPRESSION_PRESETS,
  CompressionMode,
  CompressionPreset,
  CompressionProgress,
  CompressionResult,
  PagePreviewResult,
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
  Clock,
  Sliders,
  Target,
  Sparkles,
  Eye,
  EyeOff,
  Layers,
  ArrowRight,
  FileCheck,
} from "lucide-react";
import { formatFileSize, cn } from "@/lib/utils";

const QUICK_TARGETS = [
  { label: "100 KB", value: 100, unit: "KB" as const, bytes: 100 * 1024 },
  { label: "500 KB", value: 500, unit: "KB" as const, bytes: 500 * 1024 },
  { label: "1 MB", value: 1, unit: "MB" as const, bytes: 1024 * 1024 },
  { label: "2 MB", value: 2, unit: "MB" as const, bytes: 2 * 1024 * 1024 },
  { label: "5 MB", value: 5, unit: "MB" as const, bytes: 5 * 1024 * 1024 },
];

export function CompressPdfTool() {
  const [files, setFiles] = useState<File[]>([]);
  const [mode, setMode] = useState<CompressionMode>("target-size");
  const [preset, setPreset] = useState<CompressionPreset>("recommended");

  // Target size state
  const [targetSizeValue, setTargetSizeValue] = useState<string>("500");
  const [targetUnit, setTargetUnit] = useState<"KB" | "MB">("KB");

  // Execution & result state
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState<CompressionProgress | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<CompressionResult | null>(null);

  // Sample page preview state
  const [preview, setPreview] = useState<PagePreviewResult | null>(null);
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // Object URL for downloading original file if user chooses to keep original
  const [originalFileUrl, setOriginalFileUrl] = useState<string | null>(null);

  const selectedFile = files[0] || null;

  // Handle file selection with default target size calculation
  const handleFilesChange = (newFiles: File[]) => {
    if (originalFileUrl) {
      URL.revokeObjectURL(originalFileUrl);
    }

    setFiles(newFiles);
    const file = newFiles[0];
    if (file) {
      const origUrl = URL.createObjectURL(file);
      setOriginalFileUrl(origUrl);

      if (file.size > 2 * 1024 * 1024) {
        // Multi-MB file -> default to roughly 60% of size in MB
        const mb = Math.max(1, Math.round((file.size * 0.6) / (1024 * 1024)));
        setTargetSizeValue(mb.toString());
        setTargetUnit("MB");
      } else {
        // Sub-2MB file -> default to roughly 70% in KB
        const kb = Math.max(50, Math.round((file.size * 0.7) / 1024));
        setTargetSizeValue(kb.toString());
        setTargetUnit("KB");
      }
      setPreview(null);
      setShowPreview(false);
    } else {
      setOriginalFileUrl(null);
    }
  };

  // Clean up blob URLs on unmount or new result
  useEffect(() => {
    return () => {
      if (result?.blobUrl) {
        URL.revokeObjectURL(result.blobUrl);
      }
      if (originalFileUrl) {
        URL.revokeObjectURL(originalFileUrl);
      }
    };
  }, [result, originalFileUrl]);

  // Calculate target size in bytes
  const numericTarget = parseFloat(targetSizeValue);
  const targetSizeBytes = !isNaN(numericTarget) && numericTarget > 0
    ? Math.round(numericTarget * (targetUnit === "MB" ? 1024 * 1024 : 1024))
    : 0;

  const isTargetLargerThanOriginal = selectedFile && targetSizeBytes >= selectedFile.size;
  const isTargetVerySmall = selectedFile && targetSizeBytes > 0 && targetSizeBytes < 15 * 1024;

  const handleGeneratePreview = async () => {
    if (!selectedFile || isPreviewLoading) return;
    setIsPreviewLoading(true);
    setShowPreview(true);

    try {
      const scale = mode === "preset" ? COMPRESSION_PRESETS[preset].scale : 1.1;
      const quality = mode === "preset" ? COMPRESSION_PRESETS[preset].quality : 0.7;
      const p = await generatePagePreview(selectedFile, 1, scale, quality);
      setPreview(p);
    } catch (err) {
      console.error("Preview generation error:", err);
    } finally {
      setIsPreviewLoading(false);
    }
  };

  const handleCompress = async () => {
    if (!selectedFile || isProcessing) return;

    if (mode === "target-size" && (!targetSizeBytes || targetSizeBytes <= 0)) {
      setError("Please specify a valid positive target file size.");
      return;
    }

    setIsProcessing(true);
    setError(null);
    setProgress({
      current: 0,
      total: 100,
      stage: "Starting client-side compression pipeline...",
      percent: 2,
    });

    try {
      const res = await compressPdfDocument(
        selectedFile,
        {
          mode,
          preset: mode === "preset" ? preset : undefined,
          targetSizeBytes: mode === "target-size" ? targetSizeBytes : undefined,
        },
        (p) => {
          setProgress(p);
        }
      );
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
    if (originalFileUrl) {
      URL.revokeObjectURL(originalFileUrl);
      setOriginalFileUrl(null);
    }
    setFiles([]);
    setResult(null);
    setError(null);
    setProgress(null);
    setPreview(null);
    setShowPreview(false);
  };

  const handleAdjustSettings = () => {
    if (result?.blobUrl) {
      URL.revokeObjectURL(result.blobUrl);
    }
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
          <span>100% In-Browser Privacy: All document compression occurs locally on your machine with zero server uploads.</span>
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
              onFilesChange={handleFilesChange}
              multiple={false}
              disabled={isProcessing}
              helperText="Choose the PDF file you wish to optimize"
            />
          </div>

          {selectedFile && (
            <>
              {/* Mode Switcher: Target Size Control vs Quality Presets */}
              <div className="space-y-4 pt-2">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-2 border-b border-border/60">
                  <div>
                    <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                      <Sliders className="w-4 h-4 text-primary" /> Compression Mode
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Choose how you want to guide the compression engine.
                    </p>
                  </div>

                  <div className="flex items-center bg-muted/60 p-1 rounded-xl border border-border/80 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={() => setMode("target-size")}
                      disabled={isProcessing}
                      className={cn(
                        "flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all select-none",
                        mode === "target-size"
                          ? "bg-card text-foreground shadow-xs border border-border/50"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <Target className="w-3.5 h-3.5 text-primary" /> Target File Size
                    </button>
                    <button
                      type="button"
                      onClick={() => setMode("preset")}
                      disabled={isProcessing}
                      className={cn(
                        "flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all select-none",
                        mode === "preset"
                          ? "bg-card text-foreground shadow-xs border border-border/50"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <Sparkles className="w-3.5 h-3.5 text-primary" /> Quality Level
                    </button>
                  </div>
                </div>

                {/* MODE 1: Target Size Controls */}
                {mode === "target-size" && (
                  <div className="space-y-4 bg-muted/20 p-4 sm:p-5 rounded-xl border border-border/80">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                          <Target className="w-3.5 h-3.5 text-primary" /> Desired Target Output Size
                        </span>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Specify your target size cap. The engine tests rendering resolutions and JPEG qualities to meet this target.
                        </p>
                      </div>

                      <div className="text-xs text-muted-foreground font-mono bg-card px-2.5 py-1 rounded-lg border border-border">
                        Original: <span className="font-bold text-foreground">{formatFileSize(selectedFile.size)}</span>
                      </div>
                    </div>

                    {/* Quick Target Buttons */}
                    <div className="space-y-1.5">
                      <span className="text-[11px] font-semibold text-muted-foreground uppercase">
                        Quick Target Presets:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {QUICK_TARGETS.map((t) => {
                          const isCurrent =
                            targetSizeValue === t.value.toString() && targetUnit === t.unit;
                          const isLarger = t.bytes >= selectedFile.size;

                          return (
                            <button
                              key={t.label}
                              type="button"
                              onClick={() => {
                                setTargetSizeValue(t.value.toString());
                                setTargetUnit(t.unit);
                              }}
                              disabled={isProcessing}
                              className={cn(
                                "px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all flex items-center gap-1.5",
                                isCurrent
                                  ? "bg-primary text-primary-foreground border-primary shadow-xs"
                                  : "bg-card text-foreground border-border hover:border-primary/50 hover:bg-muted/40",
                                isLarger && !isCurrent && "opacity-75"
                              )}
                            >
                              <span>{t.label}</span>
                              {isLarger && (
                                <span className={cn(
                                  "text-[10px] px-1 py-0.2 rounded font-normal",
                                  isCurrent ? "bg-primary-foreground/20 text-primary-foreground" : "text-muted-foreground"
                                )}>
                                  (&ge; file)
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Custom Input & Unit Selector */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div>
                        <label className="text-xs font-semibold text-foreground block mb-1.5">
                          Custom Target Size:
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            min="1"
                            step="any"
                            value={targetSizeValue}
                            onChange={(e) => setTargetSizeValue(e.target.value)}
                            disabled={isProcessing}
                            placeholder="e.g. 100"
                            className="w-full px-3 py-2 rounded-xl border border-input bg-card text-sm font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                          />
                          <div className="flex bg-card rounded-xl border border-input p-0.5 shrink-0">
                            <button
                              type="button"
                              onClick={() => setTargetUnit("KB")}
                              className={cn(
                                "px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
                                targetUnit === "KB"
                                  ? "bg-primary text-primary-foreground"
                                  : "text-muted-foreground hover:text-foreground"
                              )}
                            >
                              KB
                            </button>
                            <button
                              type="button"
                              onClick={() => setTargetUnit("MB")}
                              className={cn(
                                "px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
                                targetUnit === "MB"
                                  ? "bg-primary text-primary-foreground"
                                  : "text-muted-foreground hover:text-foreground"
                              )}
                            >
                              MB
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col justify-end">
                        <div className="p-2.5 rounded-xl bg-card border border-border text-xs flex items-center justify-between">
                          <span className="text-muted-foreground">Calculated Target:</span>
                          <span className="font-mono font-bold text-foreground">
                            {targetSizeBytes > 0 ? formatFileSize(targetSizeBytes) : "Invalid"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Target Validation Alerts */}
                    {isTargetLargerThanOriginal && (
                      <div className="p-3 rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-900 dark:text-amber-200 text-xs flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-amber-600 dark:text-amber-400" />
                        <div>
                          <p className="font-semibold">Target is larger than or equal to original document ({formatFileSize(selectedFile.size)}).</p>
                          <p className="text-xs text-muted-foreground/90 mt-0.5">
                            Compression is designed to reduce file size. Setting a target greater than your original document will not reduce its size.
                          </p>
                        </div>
                      </div>
                    )}

                    {isTargetVerySmall && (
                      <div className="p-3 rounded-xl border border-blue-500/20 bg-blue-500/5 text-blue-900 dark:text-blue-200 text-xs flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-blue-500" />
                        <div>
                          <p className="font-semibold">Aggressive target requested ({formatFileSize(targetSizeBytes)}).</p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            The engine will apply maximum compression, but physical PDF structural overhead and minimum image readability limits apply.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* MODE 2: Quality Presets */}
                {mode === "preset" && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                        <Sliders className="w-3.5 h-3.5 text-primary" /> Select Visual Quality Level
                      </span>
                      <span className="text-xs text-muted-foreground font-mono">
                        Selected: {COMPRESSION_PRESETS[preset].badge}
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

                            <div className="mt-3 pt-2.5 border-t border-border/40 space-y-1 text-[11px]">
                              <div>
                                <span className="font-semibold text-foreground">Trade-off: </span>
                                <span className="text-muted-foreground">{item.tradeoff}</span>
                              </div>
                              <div>
                                <span className="font-semibold text-foreground">Best for: </span>
                                <span className="text-muted-foreground">{item.recommendedFor}</span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Sample-Page Visual Quality Preview */}
                <div className="pt-1">
                  <div className="flex items-center justify-between p-3.5 rounded-xl border border-border bg-muted/20">
                    <div className="flex items-center gap-2">
                      <Layers className="w-4 h-4 text-primary" />
                      <div>
                        <span className="text-xs font-bold text-foreground block">
                          Visual Quality Preview (Page 1)
                        </span>
                        <span className="text-[11px] text-muted-foreground">
                          Inspect visual clarity before compressing the entire document.
                        </span>
                      </div>
                    </div>

                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={showPreview ? () => setShowPreview(false) : handleGeneratePreview}
                      disabled={isProcessing || isPreviewLoading}
                      isLoading={isPreviewLoading}
                      className="gap-1.5 text-xs"
                    >
                      {showPreview ? (
                        <>
                          <EyeOff className="w-3.5 h-3.5" /> Hide Preview
                        </>
                      ) : (
                        <>
                          <Eye className="w-3.5 h-3.5" /> Preview First Page
                        </>
                      )}
                    </Button>
                  </div>

                  {showPreview && preview && (
                    <div className="mt-3 p-4 rounded-xl border border-border bg-card shadow-xs space-y-3 animate-in fade-in">
                      <div className="flex items-center justify-between text-xs pb-2 border-b border-border/60">
                        <span className="font-semibold text-foreground">
                          Page 1 Compressed Preview ({preview.width} &times; {preview.height} px)
                        </span>
                        <span className="text-muted-foreground font-mono">
                          Estimated Page 1 Size: ~{formatFileSize(preview.estimatedPageBytes)}
                        </span>
                      </div>

                      <div className="flex justify-center bg-muted/40 p-4 rounded-lg overflow-auto max-h-80 border border-border/50">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={preview.dataUrl}
                          alt="Compressed Page 1 Preview"
                          className="max-h-72 object-contain shadow-sm rounded border border-border"
                        />
                      </div>

                      {/* Explicit Preview Disclosure */}
                      <div className="p-3 rounded-lg bg-muted/30 border border-border/60 text-[11px] text-muted-foreground space-y-1 text-left">
                        <span className="font-semibold text-foreground block">Preview Disclosure:</span>
                        <ul className="list-disc list-inside space-y-0.5">
                          <li>This preview displays only the first page rendered with the current settings.</li>
                          <li>Subsequent pages across the document may have different visual complexity, photographic content, or denser typography.</li>
                          <li>Final output file size and overall visual quality are determined after processing all pages across the complete document.</li>
                        </ul>
                      </div>
                    </div>
                  )}
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
                <div className="text-xs text-muted-foreground flex items-center gap-2">
                  <span>Original: <strong className="text-foreground">{formatFileSize(selectedFile.size)}</strong></span>
                  {mode === "target-size" && targetSizeBytes > 0 && (
                    <>
                      <ArrowRight className="w-3 h-3 text-muted-foreground" />
                      <span>Target: <strong className="text-foreground">&le; {formatFileSize(targetSizeBytes)}</strong></span>
                    </>
                  )}
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
                    {isProcessing ? "Optimizing in Browser..." : "Compress PDF"}
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      ) : (
        /* Compression Results Screen */
        <div className="p-8 sm:p-10 rounded-2xl border border-border bg-card shadow-lg text-center space-y-6 animate-in fade-in">
          {/* Status Icon */}
          <div
            className={cn(
              "w-16 h-16 rounded-2xl flex items-center justify-center mx-auto border",
              result.isSmaller
                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
            )}
          >
            {result.isSmaller ? (
              <CheckCircle2 className="w-8 h-8" />
            ) : (
              <AlertTriangle className="w-8 h-8" />
            )}
          </div>

          <div className="max-w-md mx-auto space-y-2">
            <div className="flex items-center justify-center gap-2 flex-wrap">
              {result.mode === "target-size" ? (
                <span
                  className={cn(
                    "text-xs font-bold px-3 py-1 rounded-full border uppercase tracking-wider",
                    !result.isSmaller
                      ? "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30"
                      : result.targetAchieved
                      ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30"
                      : "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30"
                  )}
                >
                  {!result.isSmaller
                    ? "No Size Reduction"
                    : result.targetAchieved
                    ? "Target Achieved"
                    : "Target Not Achieved"}
                </span>
              ) : (
                <span
                  className={cn(
                    "text-xs font-bold px-3 py-1 rounded-full border uppercase tracking-wider",
                    result.isSmaller
                      ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30"
                      : "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30"
                  )}
                >
                  {result.isSmaller ? "Compressed (Preset)" : "No Size Reduction"}
                </span>
              )}
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-muted text-muted-foreground border border-border">
                {result.qualityProfileName}
              </span>
            </div>

            <h2 className="text-2xl font-extrabold text-foreground">
              {!result.isSmaller
                ? "No Size Reduction Achieved"
                : result.mode === "target-size" && result.targetAchieved
                ? "Target Size Reached!"
                : result.mode === "target-size"
                ? "Closest Legible Size Achieved"
                : "PDF Compressed Successfully!"}
            </h2>
            <p className="text-sm text-muted-foreground">
              {result.isSmaller
                ? "Your document was compressed in your browser memory without uploading to any remote server."
                : "The converted document is larger than or equal to your original file. We strongly recommend keeping and using your original PDF document."}
            </p>
          </div>

          {/* Genuine Size Metrics Comparison Grid (5 columns) */}
          <div className="grid grid-cols-2 sm:grid-cols-5 max-w-3xl mx-auto gap-3 py-2 text-center">
            <div className="p-3.5 rounded-xl bg-muted/40 border border-border">
              <span className="text-[11px] font-semibold text-muted-foreground uppercase block">
                Original Size
              </span>
              <span className="text-base sm:text-lg font-bold text-foreground mt-0.5 block font-mono">
                {formatFileSize(result.originalSizeBytes)}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-muted/40 border border-border">
              <span className="text-[11px] font-semibold text-muted-foreground uppercase block">
                Requested Target
              </span>
              <span className="text-base sm:text-lg font-bold text-foreground mt-0.5 block font-mono">
                {result.mode === "target-size" && result.targetSizeBytes
                  ? formatFileSize(result.targetSizeBytes)
                  : `${result.qualityProfileName}`}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-muted/40 border border-border">
              <span className="text-[11px] font-semibold text-muted-foreground uppercase block">
                Output Size
              </span>
              <span
                className={cn(
                  "text-base sm:text-lg font-bold mt-0.5 block font-mono",
                  result.isSmaller
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-amber-600 dark:text-amber-400"
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
                  "text-base sm:text-lg font-bold mt-0.5 block font-mono",
                  result.isSmaller
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-muted-foreground"
                )}
              >
                {result.isSmaller ? `-${formatFileSize(result.savedBytes)}` : "0 B"}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-muted/40 border border-border col-span-2 sm:col-span-1">
              <span className="text-[11px] font-semibold text-muted-foreground uppercase block">
                Reduction
              </span>
              <span
                className={cn(
                  "text-base sm:text-lg font-bold mt-0.5 block font-mono",
                  result.isSmaller
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-muted-foreground"
                )}
              >
                {result.isSmaller ? `${result.percentReduction}%` : "0%"}
              </span>
            </div>
          </div>

          {/* Honest Target Explanation If Not Achieved (and document actually shrunk) */}
          {result.mode === "target-size" && !result.targetAchieved && result.isSmaller && result.targetSizeBytes && (
            <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/10 text-xs text-left max-w-xl mx-auto flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div className="space-y-1.5">
                <p className="font-bold text-amber-900 dark:text-amber-200">
                  Target size of {formatFileSize(result.targetSizeBytes)} was not achievable
                </p>
                <p className="text-amber-800/90 dark:text-amber-300/90 leading-relaxed">
                  The closest achievable output size for this document while preserving document readability is{" "}
                  <strong>{formatFileSize(result.compressedSizeBytes)}</strong> ({result.percentReduction}% reduction).
                </p>
                <p className="text-amber-800/80 dark:text-amber-300/80 leading-relaxed">
                  <strong>Why can&apos;t it be compressed further?</strong> Rendering below {result.effectiveScale}x resolution or reducing JPEG quality below {Math.round(result.effectiveQuality * 100)}% would damage document readability, causing fine text, numbers, and lines to become severely blurred or unreadable, while also reaching the physical structural stream overhead of PDF documents.
                </p>
              </div>
            </div>
          )}

          {/* Honest Explanation If Output is Larger or Equal (No Reduction) */}
          {!result.isSmaller && (
            <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/10 text-xs text-left max-w-xl mx-auto flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div className="space-y-1.5">
                <p className="font-bold text-amber-900 dark:text-amber-200">
                  Why is the output file larger ({formatFileSize(result.compressedSizeBytes)} vs original {formatFileSize(result.originalSizeBytes)})?
                </p>
                <p className="text-amber-800/90 dark:text-amber-300/90 leading-relaxed">
                  This PDF contains lightweight vector text fonts or highly optimized vector elements. Converting pages into rasterized pixel images requires substantially more data than the original vector instructions.
                </p>
                <p className="font-semibold text-amber-950 dark:text-amber-100 leading-relaxed">
                  Recommendation: Keep and use your original PDF file. No size reduction was achieved.
                </p>
              </div>
            </div>
          )}

          {/* Execution Details & Badges */}
          <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground flex-wrap">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> Time taken: {result.durationSeconds}s
            </span>
            <span>•</span>
            <span>Pages processed: {result.pageCount}</span>
            <span>•</span>
            <span>Passes: {result.passCount}</span>
          </div>

          {/* Actions: Distinguish smaller vs larger output */}
          {result.isSmaller ? (
            /* Successful compression: Download is primary */
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
                onClick={handleAdjustSettings}
                className="w-full sm:w-auto gap-2"
              >
                <Sliders className="w-4 h-4" />
                Adjust Settings
              </Button>

              <Button
                size="lg"
                variant="ghost"
                onClick={handleReset}
                className="w-full sm:w-auto gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Compress Another PDF
              </Button>
            </div>
          ) : (
            /* No size reduction: Keep original is primary; larger file is NOT default */
            <div className="space-y-3 pt-4 max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                {originalFileUrl && (
                  <a
                    href={originalFileUrl}
                    download={selectedFile?.name || "original-document.pdf"}
                    className="w-full sm:w-auto"
                  >
                    <Button
                      size="lg"
                      variant="primary"
                      className="w-full gap-2"
                    >
                      <FileCheck className="w-4 h-4" />
                      Keep Original PDF (Recommended)
                    </Button>
                  </a>
                )}

                <Button
                  size="lg"
                  variant="outline"
                  onClick={handleAdjustSettings}
                  className="w-full sm:w-auto gap-2"
                >
                  <Sliders className="w-4 h-4" />
                  Adjust Settings
                </Button>
              </div>

              {/* Explicit optional download for larger rasterized output */}
              <div className="pt-2 text-center">
                <a
                  href={result.blobUrl}
                  download={`rasterized-${selectedFile?.name || "document.pdf"}`}
                >
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-4"
                  >
                    Download Rasterized File Anyway ({formatFileSize(result.compressedSizeBytes)} — Larger than original)
                  </Button>
                </a>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
