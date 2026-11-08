import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { siteConfig } from "@/config/site.config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for EverythingTools - Understand how we protect your data through client-side processing.",
};

export default function PrivacyPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <Breadcrumbs items={[{ label: "Privacy Policy", current: true }]} className="mb-6" />

      <article className="prose dark:prose-invert max-w-none space-y-8 text-foreground">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Privacy Policy</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Last updated: November 2026 • Effective immediately
          </p>
        </div>

        <section className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
          <h2 className="text-xl font-bold text-foreground">1. Introduction & Core Privacy Pledge</h2>
          <p>
            At {siteConfig.name} (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), your privacy is our highest priority. Unlike conventional online file converters that require you to upload your confidential files to remote web servers, our platform is architected so that file processing, conversions, and text analyses take place directly within your web browser.
          </p>
        </section>

        <section className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
          <h2 className="text-xl font-bold text-foreground">2. Client-Side Data Handling (Zero Server Uploads)</h2>
          <p>
            When using tools such as our Word Counter, PDF tools, JSON formatters, or Image editors:
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-2">
            <li>Your input texts, code snippets, tokens, and documents are held strictly in temporary client-side browser memory (RAM).</li>
            <li>No file contents or text entries are uploaded to, stored on, or transmitted across our backend servers.</li>
            <li>Closing or refreshing the browser tab immediately frees the allocated memory and permanently destroys local workspace state.</li>
          </ul>
        </section>

        <section className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
          <h2 className="text-xl font-bold text-foreground">3. Information We Collect</h2>
          <p>
            Because we do not require account registration, we do not collect personal identifiers such as names, passwords, or telephone numbers. Standard, non-identifying server logs (such as IP addresses, browser user-agents, and timestamp requests) may be recorded by our CDN / hosting provider (e.g. Cloudflare Pages or Vercel) strictly for operational security and DDoS mitigation.
          </p>
        </section>

        <section className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
          <h2 className="text-xl font-bold text-foreground">4. Cookies and Advertising Partners</h2>
          <p>
            We use local browser storage (such as localStorage) solely to store your chosen visual preferences (e.g. Dark vs. Light theme toggle) and local tool bookmarks.
          </p>
          <p>
            In the future, we may display third-party advertisements via partners such as Google AdSense. Third-party advertising vendors, including Google, use cookies to serve ads based on prior visits to this or other websites. Users may opt out of personalized advertising by visiting Google Ads Settings.
          </p>
        </section>

        <section className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
          <h2 className="text-xl font-bold text-foreground">5. Contact Information</h2>
          <p>
            If you have questions regarding this Privacy Policy or our client-side architecture, please contact us via our Contact page or GitHub repository.
          </p>
        </section>
      </article>
    </main>
  );
}
