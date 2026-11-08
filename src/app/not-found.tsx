import Link from "next/link";
import { SearchBar } from "@/components/search/SearchBar";
import { HelpCircle, Home } from "lucide-react";
import { Button } from "@/components/common/Button";

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center px-4 py-16 text-center">
      <div className="max-w-md mx-auto space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto">
          <HelpCircle className="w-8 h-8" />
        </div>

        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-primary">
            404 Error
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground mt-1">
            Utility Not Found
          </h1>
          <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
            The tool or page you requested does not exist or may have been relocated.
          </p>
        </div>

        <div className="pt-2">
          <SearchBar variant="hero" placeholder="Search other available tools..." />
        </div>

        <div className="pt-4 flex items-center justify-center gap-3">
          <Link href="/">
            <Button variant="primary" size="sm" className="gap-2">
              <Home className="w-4 h-4" />
              Return Home
            </Button>
          </Link>
          <Link href="/#categories">
            <Button variant="outline" size="sm">
              Explore Categories
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
