import { ToolStep } from "@/types/tools";
import { CheckCircle2, ListOrdered, Sparkles } from "lucide-react";

interface ToolGuideProps {
  toolName: string;
  steps: ToolStep[];
  features: string[];
}

export function ToolGuide({ toolName, steps, features }: ToolGuideProps) {
  return (
    <div className="space-y-10">
      {/* How to use step cards */}
      {steps.length > 0 && (
        <section>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary mb-2">
            <ListOrdered className="w-4 h-4" />
            <span>Step-by-Step Instructions</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">
            How to use {toolName}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            {steps.map((s) => (
              <div
                key={s.step}
                className="p-5 rounded-2xl border border-border/80 bg-card/60 flex flex-col justify-between"
              >
                <div>
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-primary/10 text-primary font-extrabold text-xs mb-3">
                    0{s.step}
                  </span>
                  <h3 className="text-sm font-bold text-foreground mb-1">
                    {s.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {s.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Key features checklist */}
      {features.length > 0 && (
        <section className="pt-8 border-t border-border/60">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary mb-2">
            <Sparkles className="w-4 h-4" />
            <span>Key Features & Capabilities</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">
            Built for speed, accuracy, and complete privacy
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-6">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3.5 rounded-xl border border-border/60 bg-card/40"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-foreground/90 font-medium leading-normal">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
