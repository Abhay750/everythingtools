"use client";

import React, { useState } from "react";
import { ToolFaq as ToolFaqType } from "@/types/tools";
import { ChevronDown, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ToolFaqProps {
  toolName: string;
  faqs: ToolFaqType[];
}

export function ToolFaq({ toolName, faqs }: ToolFaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!faqs || faqs.length === 0) return null;

  return (
    <section className="pt-8 border-t border-border/60">
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary mb-2">
        <HelpCircle className="w-4 h-4" />
        <span>Frequently Asked Questions</span>
      </div>
      <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-6">
        Common questions about {toolName}
      </h2>

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="rounded-2xl border border-border/80 bg-card overflow-hidden transition-all"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full flex items-center justify-between p-4 sm:p-5 text-left text-sm sm:text-base font-bold text-foreground hover:bg-accent/40 transition-colors focus:outline-none"
                aria-expanded={isOpen}
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={cn(
                    "w-4 h-4 text-muted-foreground transition-transform duration-200 shrink-0 ml-3",
                    isOpen && "rotate-180 text-primary"
                  )}
                />
              </button>

              {isOpen && (
                <div className="p-4 sm:p-5 pt-0 text-xs sm:text-sm text-muted-foreground leading-relaxed animate-in fade-in duration-200 border-t border-border/30">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
