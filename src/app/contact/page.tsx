import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { siteConfig } from "@/config/site.config";
import { Mail, MessageSquare } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact & Tool Requests",
  description: "Contact the EverythingTools engineering team, request new utilities, or report bugs.",
};

export default function ContactPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <Breadcrumbs items={[{ label: "Contact Us", current: true }]} className="mb-6" />

      <div className="space-y-10">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-primary">
            Get In Touch
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground mt-2">
            Contact & Feature Requests
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground mt-3 leading-relaxed">
            Have a suggestion for a new client-side tool? Encountered an edge case or bug? We would love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl border border-border bg-card">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h2 className="text-base font-bold text-foreground">GitHub Issues & Discussions</h2>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Our project development is open and transparent. Submit feature requests, upvote upcoming tools, or inspect code on GitHub.
            </p>
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-semibold text-primary hover:underline"
            >
              Open GitHub Discussions →
            </a>
          </div>

          <div className="p-6 rounded-2xl border border-border bg-card">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500">
                <Mail className="w-5 h-5" />
              </div>
              <h2 className="text-base font-bold text-foreground">Direct Feedback</h2>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              For business partnerships, sponsorship inquiries, or security disclosures, reach our team directly.
            </p>
            <span className="text-xs font-mono bg-muted px-2.5 py-1 rounded-md text-foreground">
              support@everythingtools.pages.dev
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
