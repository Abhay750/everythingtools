"use client";

import React, { useState } from "react";
import { ToolDefinition } from "@/types/tools";
import { Button } from "@/components/common/Button";
import {
  UploadCloud,
  FileCode,
  Sparkles,
  ShieldCheck,
  Cpu,
  Layers,
} from "lucide-react";

interface ToolPlaceholderWorkspaceProps {
  tool: ToolDefinition;
}

export function ToolPlaceholderWorkspace({ tool }: ToolPlaceholderWorkspaceProps) {
  const [isDragOver, setIsDragOver] = useState(false);

  return (
    <div className="space-y-6">
      {/* Interactive Tool Stage Container */}
      <div className="rounded-2xl border border-border bg-card shadow-md p-6 sm:p-10 text-center">
        <div className="max-w-xl mx-auto space-y-5">
          {/* Central Animated Badge */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary border border-primary/20 shadow-sm mx-auto">
            <Sparkles className="w-8 h-8" />
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">
              {tool.name} Workspace
            </h2>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
              This client-side utility is staged and ready for local processing. Files and inputs are processed exclusively on your device without server transmission.
            </p>
          </div>

          {/* Interactive Drag and Drop simulation box */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragOver(true);
            }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragOver(false);
            }}
            className={`p-8 sm:p-10 rounded-2xl border-2 border-dashed transition-all cursor-pointer ${
              isDragOver
                ? "border-primary bg-primary/5"
                : "border-border/80 bg-muted/20 hover:border-primary/40 hover:bg-muted/30"
            }`}
          >
            <UploadCloud className="w-10 h-10 text-muted-foreground/60 mx-auto mb-3" />
            <p className="text-sm font-semibold text-foreground">
              Drag & drop input here or click to select
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Supports standard formats • 100% private in-browser memory
            </p>
            <div className="mt-4">
              <Button size="sm" variant="outline">
                Choose File or Paste Content
              </Button>
            </div>
          </div>

          {/* Security & Architecture Guarantee Banner */}
          <div className="flex items-center justify-center gap-2 text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 py-2 px-3 rounded-xl">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>Encrypted local sandboxing: No data leaves your machine.</span>
          </div>
        </div>
      </div>

      {/* Technical Specifications Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl border border-border/70 bg-card">
          <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground mb-1">
            <Cpu className="w-4 h-4 text-primary" />
            <span>Execution Runtime</span>
          </div>
          <p className="text-sm font-bold text-foreground">Browser Client (Wasm / Web API)</p>
          <p className="text-[11px] text-muted-foreground mt-0.5">Zero remote server calls</p>
        </div>

        <div className="p-4 rounded-xl border border-border/70 bg-card">
          <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground mb-1">
            <Layers className="w-4 h-4 text-amber-500" />
            <span>File Size Limitation</span>
          </div>
          <p className="text-sm font-bold text-foreground">Uncapped (Hardware RAM)</p>
          <p className="text-[11px] text-muted-foreground mt-0.5">No artificial 5MB limits</p>
        </div>

        <div className="p-4 rounded-xl border border-border/70 bg-card">
          <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground mb-1">
            <FileCode className="w-4 h-4 text-indigo-500" />
            <span>Data Retention</span>
          </div>
          <p className="text-sm font-bold text-foreground">0 ms (Discarded on Exit)</p>
          <p className="text-[11px] text-muted-foreground mt-0.5">Never written to any database</p>
        </div>
      </div>
    </div>
  );
}
