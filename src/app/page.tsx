import Image from "next/image";
import Link from "next/link";
import { Caveat } from "next/font/google";

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400"],
});

function ArrowTowardImageLeft() {
  return (
    <svg
      className="h-28 w-20 shrink-0 text-white sm:h-32 sm:w-24 lg:h-36 lg:w-28"
      viewBox="0 0 100 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M12 12C12 72 28 108 88 128"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M88 128L72 118M88 128L78 138"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowTowardImageRight() {
  return (
    <svg
      className="h-28 w-20 shrink-0 text-white sm:h-32 sm:w-24 lg:h-36 lg:w-28"
      viewBox="0 0 100 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M88 12C88 72 72 108 12 128"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 128L28 118M12 128L22 138"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Home() {
  return (
    <div className="flex h-dvh min-h-0 w-full flex-col overflow-x-hidden overflow-y-hidden bg-[#131313] px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-16">
      <header className="mx-auto w-full max-w-3xl shrink-0 text-center">
        <h1 className="text-balance text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
          Design, Test, and Compose Faster.
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-pretty text-base leading-relaxed text-white/85 sm:mt-5 sm:text-lg lg:text-xl">
          A monochrome design system playground to explore components, test variants, and build
          layouts with real-time props—powered by Next.js and Storybook.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:mt-10 sm:gap-5">
          <Link
            href="/playground"
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-white px-6 py-2.5 text-base font-medium text-[#131313] transition-opacity hover:opacity-90 sm:px-8 sm:py-3 sm:text-nd"
          >
            Explore Playground
          </Link>
          <Link
            href="/sandbox"
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-white px-6 py-2.5 text-base font-medium text-white transition-colors hover:bg-white/10 sm:px-8 sm:py-3 sm:text-md"
          >
            Open Sandbox
          </Link>
        </div>
      </header>

      <div className="mx-auto mt-10 flex min-h-0 w-full max-w-7xl flex-1 flex-col items-stretch gap-6 pb-4 sm:mt-12 lg:mt-12 lg:flex-row lg:items-end lg:justify-center lg:gap-5 lg:pb-6 xl:max-w-[90rem] xl:gap-8">
        <div className="order-2 flex flex-col items-center gap-3 lg:order-1 lg:w-[min(12rem,18vw)] lg:shrink-0 lg:items-end lg:self-end lg:pb-[min(12vh,6rem)]">
          <p
            className={`max-w-[14rem] text-center text-xl leading-snug text-white sm:text-2xl lg:text-right lg:text-[1.65rem] ${caveat.className}`}
          >
            Prebuilt Drag and Drop
            <br />
            Components!
          </p>
          <ArrowTowardImageLeft />
        </div>

        <div
          className="relative translate-y-64 order-1 mx-auto w-full max-w-6xl shrink-0 overflow-hidden rounded-3xl outline outline-[5px] outline-[#1E1E1E] sm:max-w-7xl lg:order-2 lg:max-w-[min(100%,72rem)] xl:max-w-[min(100%,80rem)]"
          style={{ boxShadow: "0 -24px 48px rgba(255, 255, 255, 0.02)" }}
        >
          <div className="relative aspect-[1250/695] w-full">
            <Image
              src="/Screenshot 2026-04-16 at 21.10.25.png"
              alt="Design system playground preview"
              fill
              priority
              className="object-cover object-top"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, (max-width: 1536px) 75vw, 1280px"
            />
          </div>
        </div>

        <div className="order-3 flex flex-col items-center gap-3 lg:w-[min(12rem,18vw)] lg:shrink-0 lg:items-start lg:self-end lg:pb-[min(10vh,5rem)]">
          <p
            className={`max-w-[14rem] text-center text-xl leading-snug text-white sm:text-2xl lg:text-left lg:text-[1.65rem] ${caveat.className}`}
          >
            Edit Component
            <br />
            Properties!
          </p>
          <ArrowTowardImageRight />
        </div>
      </div>
    </div>
  );
}
