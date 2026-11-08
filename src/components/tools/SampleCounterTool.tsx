"use client";

import React, { useState, useMemo } from "react";
import {
  Copy,
  Trash2,
  Check,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/common/Button";
import { formatNumber } from "@/lib/utils";

const SAMPLE_TEXT = `EverythingTools is an online utility platform designed with privacy at its core. Unlike traditional converter sites that transmit personal documents and files to remote servers, EverythingTools processes text, PDFs, images, and calculations directly in your browser.

This means you enjoy lightning-fast speed, zero wait times, and total confidentiality. Whether you are formatting JSON, merging PDF files, optimizing images, or analyzing text length, your confidential data never leaves your device.`;

export function SampleCounterTool() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  // Real-time calculations
  const stats = useMemo(() => {
    const rawText = text;
    const trimmed = rawText.trim();

    // Characters
    const characters = rawText.length;
    const charactersNoSpaces = rawText.replace(/\s+/g, "").length;

    // Words
    const wordsArray = trimmed ? trimmed.split(/\s+/).filter(Boolean) : [];
    const words = wordsArray.length;

    // Sentences
    const sentences = trimmed
      ? (trimmed.match(/[^.!?]+[.!?]+(\s|$)/g) || []).length || (trimmed.length > 0 ? 1 : 0)
      : 0;

    // Paragraphs
    const paragraphs = trimmed
      ? trimmed.split(/\n+/).filter((p) => p.trim().length > 0).length
      : 0;

    // Lines
    const lines = rawText ? rawText.split("\n").length : 0;

    // Estimated Reading & Speaking Time (200 WPM reading, 130 WPM speaking)
    const readingTimeSec = Math.ceil((words / 200) * 60);
    const speakingTimeSec = Math.ceil((words / 130) * 60);

    const formatDuration = (seconds: number) => {
      if (seconds < 60) return `${seconds}s`;
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return secs > 0 ? `${mins}m ${secs}s` : `${mins}m`;
    };

    // Keyword density
    const wordCounts: Record<string, number> = {};
    const stopWords = new Set([
      "the", "and", "a", "an", "in", "to", "of", "is", "for", "with",
      "on", "at", "by", "this", "that", "it", "or", "from", "as", "your",
    ]);

    wordsArray.forEach((w) => {
      const clean = w.toLowerCase().replace(/[^a-z0-9]/g, "");
      if (clean.length > 2 && !stopWords.has(clean)) {
        wordCounts[clean] = (wordCounts[clean] || 0) + 1;
      }
    });

    const topKeywords = Object.entries(wordCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([word, count]) => ({
        word,
        count,
        percent: words > 0 ? ((count / words) * 100).toFixed(1) : "0",
      }));

    return {
      characters,
      charactersNoSpaces,
      words,
      sentences,
      paragraphs,
      lines,
      readingTime: formatDuration(readingTimeSec),
      speakingTime: formatDuration(speakingTimeSec),
      topKeywords,
    };
  }, [text]);

  const handleCopy = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setText("");
  };

  const handleLoadSample = () => {
    setText(SAMPLE_TEXT);
  };

  const handleTransformCase = (type: "upper" | "lower" | "title") => {
    if (!text) return;
    if (type === "upper") setText(text.toUpperCase());
    else if (type === "lower") setText(text.toLowerCase());
    else if (type === "title") {
      setText(
        text.replace(
          /\w\S*/g,
          (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
        )
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Metric Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-3.5 rounded-xl border border-border/80 bg-card shadow-xs text-center">
          <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block">
            Words
          </span>
          <span className="text-2xl font-extrabold text-foreground mt-0.5 block">
            {formatNumber(stats.words)}
          </span>
        </div>

        <div className="p-3.5 rounded-xl border border-border/80 bg-card shadow-xs text-center">
          <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block">
            Characters
          </span>
          <span className="text-2xl font-extrabold text-primary mt-0.5 block">
            {formatNumber(stats.characters)}
          </span>
        </div>

        <div className="p-3.5 rounded-xl border border-border/80 bg-card shadow-xs text-center">
          <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block">
            No Spaces
          </span>
          <span className="text-2xl font-extrabold text-foreground mt-0.5 block">
            {formatNumber(stats.charactersNoSpaces)}
          </span>
        </div>

        <div className="p-3.5 rounded-xl border border-border/80 bg-card shadow-xs text-center">
          <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block">
            Sentences
          </span>
          <span className="text-2xl font-extrabold text-foreground mt-0.5 block">
            {formatNumber(stats.sentences)}
          </span>
        </div>

        <div className="p-3.5 rounded-xl border border-border/80 bg-card shadow-xs text-center">
          <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block">
            Reading Time
          </span>
          <span className="text-2xl font-extrabold text-foreground mt-0.5 block">
            {stats.readingTime}
          </span>
        </div>

        <div className="p-3.5 rounded-xl border border-border/80 bg-card shadow-xs text-center">
          <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block">
            Speaking Time
          </span>
          <span className="text-2xl font-extrabold text-foreground mt-0.5 block">
            {stats.speakingTime}
          </span>
        </div>
      </div>

      {/* Main Workspace Editor Card */}
      <div className="rounded-2xl border border-border bg-card shadow-md overflow-hidden">
        {/* Editor Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-muted/30 border-b border-border text-xs">
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={handleLoadSample}
              className="px-2.5 py-1 rounded-lg border border-border bg-card hover:bg-accent font-medium text-foreground transition-colors inline-flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3 text-amber-500" />
              Load Sample
            </button>
            <span className="text-border">|</span>
            <button
              onClick={() => handleTransformCase("upper")}
              disabled={!text}
              className="px-2 py-1 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground font-mono disabled:opacity-40"
            >
              UPPER
            </button>
            <button
              onClick={() => handleTransformCase("lower")}
              disabled={!text}
              className="px-2 py-1 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground font-mono disabled:opacity-40"
            >
              lower
            </button>
            <button
              onClick={() => handleTransformCase("title")}
              disabled={!text}
              className="px-2 py-1 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground font-mono disabled:opacity-40"
            >
              Title
            </button>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleClear}
              disabled={!text}
              className="h-7 text-xs px-2.5 gap-1 text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="w-3 h-3" />
              Clear
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleCopy}
              disabled={!text}
              className="h-7 text-xs px-3 gap-1"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 text-emerald-500" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  Copy Text
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Text Area */}
        <div className="relative">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type or paste your text here to count words and characters in real time..."
            rows={12}
            className="w-full p-4 sm:p-5 bg-transparent text-foreground placeholder:text-muted-foreground/60 resize-y focus:outline-none text-base sm:text-base leading-relaxed font-sans"
          />
        </div>

        {/* Editor Bottom Status Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 bg-muted/20 border-t border-border/60 text-xs text-muted-foreground">
          <div className="flex items-center gap-3">
            <span>{stats.paragraphs} paragraphs</span>
            <span>•</span>
            <span>{stats.lines} lines</span>
          </div>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Live In-Browser Calculation
          </span>
        </div>
      </div>

      {/* Keyword Density Breakdown */}
      {stats.topKeywords.length > 0 && (
        <div className="p-5 rounded-2xl border border-border/80 bg-card">
          <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
            Top Keywords & Density
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {stats.topKeywords.map((item) => (
              <div
                key={item.word}
                className="p-2.5 rounded-xl bg-muted/30 border border-border/50 flex flex-col"
              >
                <span className="font-semibold text-sm text-foreground truncate">
                  {item.word}
                </span>
                <span className="text-xs text-muted-foreground mt-0.5">
                  {item.count}× ({item.percent}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
