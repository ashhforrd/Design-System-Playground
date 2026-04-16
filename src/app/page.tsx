import { Button } from "@/components/ui";
import Link from "next/link";

export default function Home() {
  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center gap-8 p-8"
      style={{
        background: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      <h1 className="text-4xl font-bold tracking-tight">Design System Playground</h1>
      <p className="max-w-md text-center text-lg opacity-70">
        Explore and customize UI components or build layouts with the interactive sandbox
      </p>
      <div className="flex gap-4">
        <Link href="/playground">
          <Button size="lg">Component Explorer</Button>
        </Link>
        <Link href="/sandbox">
          <Button size="lg" variant="secondary">Page Builder Sandbox</Button>
        </Link>
      </div>
    </div>
  );
}
