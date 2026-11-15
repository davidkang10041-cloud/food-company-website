import { LogoMark } from "@/components/site/logo";
import { cn } from "@/lib/utils";

export function EnLogo({
  className,
  variant = "dark",
  compact = false,
}: {
  className?: string;
  variant?: "dark" | "light";
  compact?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark
        className={cn("h-8 w-8", variant === "dark" ? "text-brand" : "text-white")}
      />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "text-[19px] font-extrabold tracking-tight",
            variant === "dark" ? "text-brand-deep" : "text-white"
          )}
        >
          CHEDAWON
        </span>
        {!compact && (
          <span
            className={cn(
              "mt-1 text-[12px] font-semibold tracking-[0.28em]",
              variant === "dark" ? "text-brand/70" : "text-white/60"
            )}
          >
            SINCE 2017
          </span>
        )}
      </span>
    </span>
  );
}
