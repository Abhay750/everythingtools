"use client";

import React, { useState } from "react";
import { PDFDocument } from "pdf-lib";
import { PdfUploadDropzone } from "./PdfUploadDropzone";
import { Button } from "@/components/common/Button";
import {
  FilePlus2,
  Download,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";
import { formatFileSize } from "@/lib/utils";

export function MergePdfTool() {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [mergedBlobUrl, setMergedBlobUrl] = useState<string | null>(null);
  const [mergedStats, setMergedStats] = useState<{
    pageCount: number;
    fileSizeBytes: number;
    fileName: string;
  } | null>(null);

  const handleMerge = async () => {
    if (files.length < 2) {
      setErrorMessage("Please select at least 2 PDF documents to merge.");
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null);

    try {
      // 1. Create a fresh PDF document
      const mergedPdf = await PDFDocument.create();
      let totalPages = 0;

      // 2. Iterate and append pages sequentially
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        try {
          const arrayBuffer = await file.arrayBuffer();
          const doc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: false });
          const copiedPages = await mergedPdf.copyPages(doc, doc.getPageIndices());
          copiedPages.forEach((page) => mergedPdf.addPage(page));
          totalPages += doc.getPageCount();
        } catch {
          throw new Error(
            `Unable to parse "${file.name}". The document might be password-protected or corrupted.`
          );
        }
      }

      // 3. Serialize to bytes
      const mergedBytes = await mergedPdf.save();
      const blob = new Blob([mergedBytes.buffer as ArrayBuffer], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      setMergedBlobUrl(url);
      setMergedStats({
        pageCount: totalPages,
        fileSizeBytes: mergedBytes.byteLength,
        fileName: "merged-everythingtools.pdf",
      });
    } catch (err: unknown) {
      console.error("PDF Merge error:", err);
      const message =
        err instanceof Error
          ? err.message
          : "An unexpected error occurred while merging your PDF documents.";
      setErrorMessage(message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    if (mergedBlobUrl) {
      URL.revokeObjectURL(mergedBlobUrl);
    }
    setFiles([]);
    setMergedBlobUrl(null);
    setMergedStats(null);
    setErrorMessage(null);
  };

  return (
    <div className="space-y-6">
      {/* Privacy Guarantee Badge */}
      <div className="flex items-center justify-between p-3.5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-xs text-emerald-700 dark:text-emerald-300">
        <span className="flex items-center gap-1.5 font-medium">
          <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-500" />
          <span>Client-Side Processing: Your PDF documents never leave your browser memory.</span>
        </span>
        <span className="hidden sm:inline font-semibold">100% Secure</span>
      </div>

      {/* Main Tool Area */}
      {!mergedBlobUrl ? (
        <div className="p-6 sm:p-8 rounded-2xl border border-border bg-card shadow-md space-y-6">
          <PdfUploadDropzone
            files={files}
            onFilesChange={setFiles}
            multiple={true}
            maxFiles={30}
            disabled={isProcessing}
            helperText="Reorder pages using the up/down arrows below"
          />

          {errorMessage && (
            <div className="p-3.5 rounded-xl border border-destructive/30 bg-destructive/10 text-destructive text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <p>{errorMessage}</p>
            </div>
          )}

          {/* Action Footer */}
          <div className="pt-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-muted-foreground">
              {files.length === 0 ? (
                <span>No files selected. Add 2 or more PDFs to combine them.</span>
              ) : files.length === 1 ? (
                <span className="text-amber-600 dark:text-amber-400 font-medium">
                  Add at least 1 more PDF file to enable merging.
                </span>
              ) : (
                <span className="text-foreground font-semibold">
                  Ready to merge {files.length} documents.
                </span>
              )}
            </div>

            <Button
              type="button"
              size="lg"
              variant="primary"
              onClick={handleMerge}
              disabled={files.length < 2 || isProcessing}
              isLoading={isProcessing}
              className="w-full sm:w-auto gap-2"
            >
              <FilePlus2 className="w-4 h-4" />
              {isProcessing ? "Merging in Browser..." : `Merge ${files.length > 0 ? files.length : ""} PDF Files`}
            </Button>
          </div>
        </div>
      ) : (
        /* Merged Success Screen */
        <div className="p-8 sm:p-10 rounded-2xl border border-emerald-500/30 bg-card shadow-lg text-center space-y-6 animate-in fade-in">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/20">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="max-w-md mx-auto space-y-2">
            <h2 className="text-2xl font-extrabold text-foreground">
              PDFs Merged Successfully!
            </h2>
            <p className="text-sm text-muted-foreground">
              Your consolidated PDF document was assembled locally in your browser memory.
            </p>
          </div>

          {mergedStats && (
            <div className="grid grid-cols-2 max-w-sm mx-auto gap-3 py-2 text-center">
              <div className="p-3 rounded-xl bg-muted/40 border border-border">
                <span className="text-[11px] font-semibold text-muted-foreground uppercase block">
                  Total Pages
                </span>
                <span className="text-xl font-bold text-foreground mt-0.5 block">
                  {mergedStats.pageCount}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-muted/40 border border-border">
                <span className="text-[11px] font-semibold text-muted-foreground uppercase block">
                  Merged Size
                </span>
                <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mt-0.5 block">
                  {formatFileSize(mergedStats.fileSizeBytes)}
                </span>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <a
              href={mergedBlobUrl}
              download="merged-everythingtools.pdf"
              className="w-full sm:w-auto"
            >
              <Button size="lg" variant="primary" className="w-full gap-2">
                <Download className="w-4 h-4" />
                Download Merged PDF
              </Button>
            </a>

            <Button
              size="lg"
              variant="outline"
              onClick={handleReset}
              className="w-full sm:w-auto gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Merge More PDFs
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
