import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { ShieldCheck, Zap, Lock, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us & Privacy Pledge",
  description:
    "Learn about EverythingTools, our zero-server privacy architecture, and our mission to provide free, high-speed client-side utilities.",
};

export default function AboutPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <Breadcrumbs items={[{ label: "About EverythingTools", current: true }]} className="mb-6" />

      <div className="space-y-10">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-primary">
            Our Mission & Architecture
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground mt-2">
            Free Utilities Without Privacy Compromises
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground mt-4 leading-relaxed">
            EverythingTools was created out of frustration with modern online converter websites that force users to upload confidential tax documents, private family photos, and proprietary source code to obscure third-party cloud servers.
          </p>
        </div>

        {/* Core Principles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
          <div className="p-6 rounded-2xl border border-border bg-card">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h2 className="text-base font-bold text-foreground">100% In-Browser Computation</h2>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We leverage modern WebAssembly (Wasm), Web Workers, and HTML5 Canvas APIs so that document merges, image compressions, and data transformations happen exclusively inside your device memory.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-border bg-card">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500">
                <Zap className="w-5 h-5" />
              </div>
              <h2 className="text-base font-bold text-foreground">Zero Processing Latency</h2>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Because files are not uploaded over home or mobile broadband to remote datacenters, tasks execute at the full speed of your local processor with zero server queuing.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-border bg-card">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-500">
                <Lock className="w-5 h-5" />
              </div>
              <h2 className="text-base font-bold text-foreground">No Account & No Paywalls</h2>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We believe everyday productivity utilities should be accessible to students, freelancers, and engineers without mandatory account creation or predatory monthly subscription fees.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-border bg-card">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-500">
                <Globe className="w-5 h-5" />
              </div>
              <h2 className="text-base font-bold text-foreground">Zero-Budget Sustainable Design</h2>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              By eliminating expensive GPU/server-side rendering and static asset hosting, we maintain an ultra-lean footprint that ensures the platform can remain free indefinitely.
            </p>
          </div>
        </div>

        {/* Technical Architecture Statement */}
        <div className="p-6 sm:p-8 rounded-3xl border border-border/80 bg-muted/20">
          <h2 className="text-xl font-bold text-foreground mb-3">
            Our Strict Privacy & Non-Retention Pledge
          </h2>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>
              When you use our PDF merger, image compressor, word counter, or JSON formatter:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2">
              <li>No file data is ever stored on any remote disk or database.</li>
              <li>No telemetry records the content of your clipboard or documents.</li>
              <li>All memory allocations are garbage-collected by your browser upon closing the tab.</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
