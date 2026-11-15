export default function NewsNotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-cream px-5 py-16 text-center">
      <p className="font-num text-[15px] font-bold tracking-[0.28em] text-brand">
        404 — NOT FOUND
      </p>
      <h1 className="mt-5 text-[26px] font-extrabold tracking-tight text-foreground md:text-[32px]">
        게시물을 찾을 수 없습니다
      </h1>
      <p className="mt-4 text-[16px] leading-relaxed text-muted-foreground">
        해당 게시물이 삭제되었거나 잘못된 주소로 접근하셨습니다.
        <br />
        뉴스룸에서 다른 소식을 확인해 주세요.
      </p>
      <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
        <a
          href="/"
          className="rounded-full bg-brand px-6 py-3 font-bold text-white transition-colors hover:bg-brand-deep"
        >
          홈으로 돌아가기
        </a>
        <a
          href="/#news"
          className="rounded-full border border-brand-line bg-white px-6 py-3 font-bold text-brand transition-colors hover:border-brand hover:bg-brand-soft"
        >
          뉴스룸으로 이동
        </a>
      </div>
    </div>
  );
}
