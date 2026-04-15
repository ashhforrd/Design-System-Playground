import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  Input,
  Label,
  Link,
  Separator,
  Switch,
  Textarea,
} from "@/components/ui";
import { ThemeModeToggle } from "@/components/playground/theme-mode-toggle";

export default function Home() {
  return (
    <div
      className="flex min-h-screen items-center justify-center p-8"
      style={{
        background: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      <main
        className="w-full max-w-5xl border p-10"
        style={{
          background: "var(--ds-surface)",
          borderColor: "var(--ds-color-neutral-border)",
          borderRadius: "var(--ds-radius-md)",
        }}
      >
        <div className="space-y-3">
          <p
            className="text-xs font-semibold uppercase tracking-[0.2em]"
            style={{ color: "var(--ds-muted-fg)" }}
          >
            Design system
          </p>
          <h1 className="text-3xl font-semibold tracking-tight">
            Component playground
          </h1>
          <p className="max-w-2xl leading-relaxed" style={{ color: "var(--ds-muted-fg)" }}>
            Explore primitives in isolation via Storybook (Design System group) or
            here on the home screen. Theme defaults to dark; switch to light or soft
            for alternate monochrome contexts.
          </p>
          <p className="text-sm" style={{ color: "var(--ds-muted-fg)" }}>
            Open the interactive editor at{" "}
            <Link href="/playground">/playground</Link>.
          </p>
        </div>

        <div className="mt-8 space-y-2">
          <p className="text-sm font-medium" style={{ color: "var(--ds-muted-fg)" }}>
            Theme
          </p>
          <ThemeModeToggle />
        </div>

        <Separator className="my-8" />

        <section className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
              <CardDescription>Button variants and status badge.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap items-center gap-3">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Badge variant="outline">New</Badge>
              <Badge variant="muted">Beta</Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Inputs</CardTitle>
              <CardDescription>Field primitives for forms.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-1">
                <Label htmlFor="landing-email" optional="(optional)">
                  Email
                </Label>
                <Input id="landing-email" type="email" placeholder="you@example.com" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="landing-notes">Notes</Label>
                <Textarea id="landing-notes" placeholder="Write a short note..." />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Selection</CardTitle>
              <CardDescription>Binary controls and separators.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Checkbox label="Enable compact mode" defaultChecked />
              <Switch label="Auto save drafts" defaultChecked />
              <Separator />
              <div className="flex items-center gap-3">
                <span className="text-sm" style={{ color: "var(--ds-muted-fg)" }}>
                  Left
                </span>
                <Separator orientation="vertical" />
                <span className="text-sm" style={{ color: "var(--ds-muted-fg)" }}>
                  Right
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Navigation</CardTitle>
              <CardDescription>Monochrome links and card actions.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link href="/">Internal link example</Link>
              <br />
              <Link href="https://storybook.js.org">Storybook docs</Link>
            </CardContent>
            <CardFooter>
              <Button size="sm">Confirm</Button>
              <Button size="sm" variant="secondary">
                Cancel
              </Button>
            </CardFooter>
          </Card>
        </section>
      </main>
    </div>
  );
}
