import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { siteConfig } from "@/config/site.config";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of service and acceptable use agreement for EverythingTools.",
};

export default function TermsPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <Breadcrumbs items={[{ label: "Terms of Service", current: true }]} className="mb-6" />

      <article className="prose dark:prose-invert max-w-none space-y-8 text-foreground">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Terms of Service</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Last updated: November 2026 • Effective immediately
          </p>
        </div>

        <section className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
          <h2 className="text-xl font-bold text-foreground">1. Agreement to Terms</h2>
          <p>
            By accessing or using {siteConfig.name}, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you disagree with any part of these terms, you are prohibited from using the platform.
          </p>
        </section>

        <section className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
          <h2 className="text-xl font-bold text-foreground">2. Permitted Use & Free License</h2>
          <p>
            {siteConfig.name} grants you a non-exclusive, worldwide, royalty-free license to use all provided tools for personal, academic, commercial, or professional purposes. You may freely process text, images, PDFs, code, and calculations for your business or personal projects.
          </p>
        </section>

        <section className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
          <h2 className="text-xl font-bold text-foreground">3. Disclaimer of Warranties</h2>
          <p>
            The tools and utilities on {siteConfig.name} are provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis without warranties of any kind, whether express or implied. While we strive for extreme mathematical precision and robust algorithmic accuracy, we do not guarantee that outputs will be error-free or uninterrupted.
          </p>
        </section>

        <section className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
          <h2 className="text-xl font-bold text-foreground">4. Limitation of Liability</h2>
          <p>
            In no event shall {siteConfig.name}, its creators, or contributors be held liable for any damages (including, without limitation, damages for loss of data or profit) arising out of the use or inability to use the materials on this website.
          </p>
        </section>
      </article>
    </main>
  );
}
