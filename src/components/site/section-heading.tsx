"use client";

import { FadeIn } from "./fade-in";
import { cn } from "@/lib/utils";

export function SectionHeading({
  kicker,
  title,
  description,
  align = "left",
  dark = false,
  className,
}: {
  kicker: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
}) {
  return (
    <FadeIn
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      <p className={cn(align === "center" && "justify-center", dark ? "kicker-light" : "kicker")}>
        {kicker}
      </p>
      <h2
        className={cn(
          "mt-4 text-3xl md:text-[44px] md:leading-[1.24] font-extrabold tracking-tight whitespace-pre-line",
          dark ? "text-white" : "text-foreground"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-5 text-base md:text-lg leading-relaxed whitespace-pre-line",
            dark ? "text-white/65" : "text-muted-foreground"
          )}
        >
          {description}
        </p>
      )}
    </FadeIn>
  );
}
