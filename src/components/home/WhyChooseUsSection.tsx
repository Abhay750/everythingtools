import {
  ShieldCheck,
  Zap,
  Lock,
  Layers,
  Smartphone,
  EyeOff,
} from "lucide-react";

export function WhyChooseUsSection() {
  const benefits = [
    {
      icon: ShieldCheck,
      color: "text-emerald-500 bg-emerald-500/10",
      title: "100% Client-Side Privacy",
      description:
        "Unlike other online utility sites that secretly store your documents on remote servers, EverythingTools processes PDFs, images, and text right in your browser via WebAssembly and Canvas.",
    },
    {
      icon: Zap,
      color: "text-amber-500 bg-amber-500/10",
      title: "Instant Execution, Zero Queues",
      description:
        "Skip the wait. Since processing occurs in local memory, calculations, formatting, and file generation happen in milliseconds with zero server queue bottlenecks.",
    },
    {
      icon: EyeOff,
      color: "text-blue-500 bg-blue-500/10",
      title: "No Sign-Up or Tracking",
      description:
        "No email addresses, no passwords, and no invasive tracking cookies. Launch the tool, get your work done, and move on with your day.",
    },
    {
      icon: Layers,
      color: "text-indigo-500 bg-indigo-500/10",
      title: "No Artificial File Size Limits",
      description:
        "Traditional converters cap uploads at 5MB or 10MB to force you into paid plans. EverythingTools uses your browser's allocated memory, allowing larger workloads for free.",
    },
    {
      icon: Smartphone,
      color: "text-purple-500 bg-purple-500/10",
      title: "Flawless Mobile Experience",
      description:
        "Engineered with a responsive, touch-friendly UI. Access full-featured utilities on your iPhone, Android, iPad, or desktop with equal ease.",
    },
    {
      icon: Lock,
      color: "text-rose-500 bg-rose-500/10",
      title: "Zero-Budget Open Foundation",
      description:
        "Built using efficient open-source libraries and modern web standards. Designed to remain permanently free without predatory subscriptions.",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-card border-y border-border/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">
            The EverythingTools Difference
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-foreground mt-2">
            Why Use EverythingTools?
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground mt-3 leading-relaxed">
            Most online utilities monetize by harvesting your files, pushing intrusive fake download ads, or trapping you behind subscriptions. We built a clean alternative.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {benefits.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl border border-border/70 bg-background/60 hover:border-primary/30 hover:shadow-lg transition-all duration-200"
              >
                <div
                  className={`flex items-center justify-center w-12 h-12 rounded-xl mb-4 ${item.color}`}
                >
                  <IconComponent className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
