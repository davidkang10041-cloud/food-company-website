import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      className={cn("h-8 w-8", className)}
      aria-hidden="true"
    >
      <circle
        cx="20"
        cy="20"
        r="14"
        stroke="currentColor"
        strokeWidth="7"
        strokeLinecap="round"
        strokeDasharray="66 22"
        strokeDashoffset="-8"
        transform="rotate(-45 20 20)"
      />
    </svg>
  );
}

export function Logo({
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
          채다원
        </span>
        {!compact && (
          <span
            className={cn(
              "mt-1 text-[10px] font-semibold tracking-[0.28em]",
              variant === "dark" ? "text-brand/70" : "text-white/60"
            )}
          >
            CHEDAWON
          </span>
        )}
      </span>
    </span>
  );
}
