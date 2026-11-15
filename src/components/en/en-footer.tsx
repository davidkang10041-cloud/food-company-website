import { EN_COMPANY } from "@/lib/company-en";

export function EnFooter() {
  return (
    <footer className="mt-auto border-t border-brand-line bg-brand-mist pb-[env(safe-area-inset-bottom)]">
      <div className="mx-auto max-w-[1280px] px-5 py-12 md:px-8 md:py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr] md:gap-8">
          {/* Brand */}
          <div>
            <p className="text-[20px] font-extrabold tracking-tight text-brand-deep">
              {EN_COMPANY.name}
            </p>
            <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-muted-foreground">
              A trusted food ingredient solution provider — B2B distribution,
              meal kit OEM/ODM manufacturing, and HACCP-certified production,
              built on major-airline catering expertise since 2017.
            </p>
          </div>

          {/* Company info */}
          <dl className="grid gap-2.5 text-[14.5px]">
            <div className="flex gap-3">
              <dt className="w-20 shrink-0 font-bold text-brand-deep">CEO</dt>
              <dd className="text-muted-foreground">{EN_COMPANY.ceo}</dd>
            </div>
            <div className="flex gap-3">
              <dt className="w-20 shrink-0 font-bold text-brand-deep">Address</dt>
              <dd className="leading-relaxed text-muted-foreground">
                {EN_COMPANY.address}
              </dd>
            </div>
            <div className="flex gap-3">
              <dt className="w-20 shrink-0 font-bold text-brand-deep">Phone</dt>
              <dd className="font-num text-muted-foreground">{EN_COMPANY.phone}</dd>
            </div>
            <div className="flex gap-3">
              <dt className="w-20 shrink-0 font-bold text-brand-deep">Business</dt>
              <dd className="leading-relaxed text-muted-foreground">
                {EN_COMPANY.business}
              </dd>
            </div>
          </dl>

          {/* Links */}
          <nav aria-label="Footer legal links" className="grid content-start gap-2.5">
            <a
              href="/privacy"
              className="w-fit text-[15px] font-semibold text-muted-foreground transition-colors hover:text-brand"
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              className="w-fit text-[15px] font-semibold text-muted-foreground transition-colors hover:text-brand"
            >
              Terms of Service
            </a>
            <a
              href="/"
              className="w-fit text-[15px] font-bold text-brand-deep transition-colors hover:text-brand"
            >
              한국어 사이트 →
            </a>
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-brand-line pt-6 text-[13.5px] text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {EN_COMPANY.name}. All rights reserved.
          </p>
          <p className="tracking-wide">
            The Company Responsible for Healthy Life
          </p>
        </div>
      </div>
    </footer>
  );
}
