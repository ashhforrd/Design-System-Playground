import { Button } from "@/components/ui";

export default function Home() {
  return (
    <div
      className="flex min-h-screen items-center justify-center p-8"
      style={{
        background: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      <form action="/playground" method="get">
        <Button type="submit" size="lg">
          Open playground
        </Button>
      </form>
    </div>
  );
}
