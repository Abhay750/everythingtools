"use client";

import React, { useRef, useState } from "react";
import {
  UploadCloud,
  FileText,
  X,
  AlertCircle,
  ArrowUp,
  ArrowDown,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/common/Button";
import { formatFileSize, cn } from "@/lib/utils";

interface PdfUploadDropzoneProps {
  files: File[];
  onFilesChange: (files: File[]) => void;
  multiple?: boolean;
  maxFiles?: number;
  disabled?: boolean;
  className?: string;
  helperText?: string;
}

export function PdfUploadDropzone({
  files,
  onFilesChange,
  multiple = false,
  maxFiles = 20,
  disabled = false,
  className,
  helperText = "100% private in-browser memory • Zero server uploads",
}: PdfUploadDropzoneProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const validateAndAddFiles = (incomingFiles: FileList | File[]) => {
    setErrorMessage(null);
    const validPdfs: File[] = [];
    const invalidNames: string[] = [];

    Array.from(incomingFiles).forEach((file) => {
      const isPdfMime = file.type === "application/pdf";
      const isPdfExt = file.name.toLowerCase().endsWith(".pdf");

      if (isPdfMime || isPdfExt) {
        validPdfs.push(file);
      } else {
        invalidNames.push(file.name);
      }
    });

    if (invalidNames.length > 0) {
      setErrorMessage(
        `Invalid file type detected: "${invalidNames.join(", ")}". Only PDF documents (.pdf) are supported.`
      );
    }

    if (validPdfs.length === 0) {
      return;
    }

    if (!multiple) {
      onFilesChange([validPdfs[0]]);
    } else {
      const combined = [...files, ...validPdfs];
      if (combined.length > maxFiles) {
        setErrorMessage(`Maximum limit of ${maxFiles} PDFs reached. Only the first ${maxFiles} were kept.`);
        onFilesChange(combined.slice(0, maxFiles));
      } else {
        onFilesChange(combined);
      }
    }
  };

  const handleNativeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndAddFiles(e.target.files);
    }
    // Reset native input so the user can re-select the same file if needed
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    if (disabled) return;

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndAddFiles(e.dataTransfer.files);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!disabled) setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleZoneClick = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleRemoveFile = (index: number) => {
    const updated = files.filter((_, idx) => idx !== index);
    onFilesChange(updated);
  };

  const handleMoveFile = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= files.length) return;
    const reordered = [...files];
    const [moved] = reordered.splice(fromIndex, 1);
    reordered.splice(toIndex, 0, moved);
    onFilesChange(reordered);
  };

  const handleClearAll = () => {
    onFilesChange([]);
    setErrorMessage(null);
  };

  const totalSize = files.reduce((acc, f) => acc + f.size, 0);

  return (
    <div className={cn("space-y-4", className)}>
      {/* Hidden real file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="application/pdf,.pdf"
        multiple={multiple}
        disabled={disabled}
        onChange={handleNativeInputChange}
        className="hidden"
        aria-label="Select PDF files"
      />

      {/* Dropzone Container */}
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        onClick={handleZoneClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleZoneClick();
          }
        }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "relative p-8 sm:p-10 rounded-2xl border-2 border-dashed transition-all cursor-pointer text-center select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
          isDragOver
            ? "border-primary bg-primary/10 shadow-lg shadow-primary/5"
            : "border-border/80 bg-muted/20 hover:border-primary/50 hover:bg-muted/30",
          disabled && "opacity-50 cursor-not-allowed pointer-events-none"
        )}
      >
        <div className="flex flex-col items-center max-w-md mx-auto space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center transition-transform group-hover:scale-105">
            <UploadCloud className="w-7 h-7" />
          </div>

          <div>
            <p className="text-base font-bold text-foreground">
              {multiple ? "Drag & drop PDF files here, or click to browse" : "Drag & drop your PDF file here, or click to browse"}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Supports standard PDF documents (.pdf) • {helperText}
            </p>
          </div>

          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              handleZoneClick();
            }}
            className="mt-2"
          >
            {multiple && files.length > 0 ? "Add More PDF Files" : "Choose PDF File"}
          </Button>
        </div>
      </div>

      {/* Error alert banner */}
      {errorMessage && (
        <div className="p-3.5 rounded-xl border border-destructive/30 bg-destructive/10 text-destructive text-xs flex items-start justify-between gap-2 animate-in fade-in">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <p className="leading-relaxed">{errorMessage}</p>
          </div>
          <button
            type="button"
            onClick={() => setErrorMessage(null)}
            className="p-1 hover:bg-destructive/20 rounded text-destructive shrink-0"
            aria-label="Dismiss error"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Selected Files List */}
      {files.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
            <span className="font-semibold text-foreground">
              {files.length} {files.length === 1 ? "document" : "documents"} selected ({formatFileSize(totalSize)} total)
            </span>
            <button
              type="button"
              onClick={handleClearAll}
              className="text-muted-foreground hover:text-destructive flex items-center gap-1 transition-colors"
            >
              <Trash2 className="w-3 h-3" /> Clear list
            </button>
          </div>

          <div className="divide-y divide-border/40 rounded-xl border border-border bg-card overflow-hidden">
            {files.map((file, idx) => (
              <div
                key={`${file.name}-${file.size}-${idx}`}
                className="flex items-center justify-between p-3 gap-3 hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="p-2 rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400 shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-foreground truncate" title={file.name}>
                      {file.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  {multiple && (
                    <>
                      <button
                        type="button"
                        onClick={() => handleMoveFile(idx, idx - 1)}
                        disabled={idx === 0}
                        title="Move Up"
                        className="p-1.5 rounded-lg border border-border bg-card hover:bg-accent disabled:opacity-30 disabled:pointer-events-none text-muted-foreground hover:text-foreground"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMoveFile(idx, idx + 1)}
                        disabled={idx === files.length - 1}
                        title="Move Down"
                        className="p-1.5 rounded-lg border border-border bg-card hover:bg-accent disabled:opacity-30 disabled:pointer-events-none text-muted-foreground hover:text-foreground"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                    </>
                  )}
                  <button
                    type="button"
                    onClick={() => handleRemoveFile(idx)}
                    title="Remove file"
                    className="p-1.5 rounded-lg border border-border bg-card hover:bg-destructive/10 hover:border-destructive/40 text-muted-foreground hover:text-destructive"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
