"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";
import { Button } from "@/components/common/Button";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error boundary triggered:", error);
  }, [error]);

  return (
    <main className="min-h-[70vh] flex items-center justify-center px-4 py-16 text-center">
      <div className="max-w-md mx-auto space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-destructive/10 text-destructive flex items-center justify-center mx-auto">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-destructive">
            Execution Interrupted
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground mt-1">
            Something Went Wrong
          </h1>
          <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
            An unexpected error occurred while processing this request. Your data remains safely isolated in your browser.
          </p>
        </div>

        <div className="pt-4 flex items-center justify-center gap-3">
          <Button variant="primary" size="sm" onClick={() => reset()} className="gap-2">
            <RotateCcw className="w-4 h-4" />
            Try Again
          </Button>
          <Link href="/">
            <Button variant="outline" size="sm" className="gap-2">
              <Home className="w-4 h-4" />
              Return Home
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
