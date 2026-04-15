"use client";

import { useState } from "react";

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
  Label as UiLabel,
  Link,
  Select,
  Separator,
  Switch,
  Textarea,
} from "@/components/ui";
import { ThemeModeToggle } from "@/components/playground/theme-mode-toggle";
import { componentTimeline } from "@/content/component-changelog";
import { componentDocs } from "@/generated/component-docs";
import { usePlaygroundStore } from "@/state/playground-store";

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-medium uppercase tracking-[0.14em]" style={{ color: "var(--ds-muted-fg)" }}>
      {children}
    </p>
  );
}

function toJsxString(value: string) {
  return JSON.stringify(value);
}

export default function PlaygroundPage() {
  const {
    selectedComponent,
    setSelectedComponent,
    button,
    input,
    badge,
    switchControl,
    checkbox,
    textarea,
    label,
    separator,
    link,
    card,
    updateButton,
    updateInput,
    updateBadge,
    updateSwitchControl,
    updateCheckbox,
    updateTextarea,
    updateLabel,
    updateSeparator,
    updateLink,
    updateCard,
    presets,
    savePreset,
    loadPreset,
    deletePreset,
    resetPlayground,
  } = usePlaygroundStore((state) => state);
  const [activePanel, setActivePanel] = useState<
    "preview" | "code" | "example" | "history"
  >("preview");
  const [copied, setCopied] = useState(false);
  const [presetName, setPresetName] = useState("");
  const selectedDoc = componentDocs[selectedComponent];
  const timeline = componentTimeline[selectedComponent] ?? [];

  const snippet =
    selectedComponent === "button"
      ? `<Button variant="${button.variant}" size="${button.size}"${button.disabled ? " disabled" : ""}>
  ${button.label}
</Button>`
      : selectedComponent === "input"
        ? `<Input type="${input.type}" placeholder=${toJsxString(input.placeholder)}${input.disabled ? " disabled" : ""} />`
        : selectedComponent === "badge"
          ? `<Badge variant="${badge.variant}" size="${badge.size}">
  ${badge.label}
</Badge>`
          : selectedComponent === "switch"
            ? `<Switch label=${toJsxString(switchControl.label)} checked={${String(switchControl.checked)}}${switchControl.disabled ? " disabled" : ""} />`
            : selectedComponent === "checkbox"
              ? `<Checkbox label=${toJsxString(checkbox.label)} checked={${String(checkbox.checked)}}${checkbox.disabled ? " disabled" : ""} />`
              : selectedComponent === "textarea"
                ? `<Textarea placeholder=${toJsxString(textarea.placeholder)}${textarea.disabled ? " disabled" : ""}>
  ${textarea.value}
</Textarea>`
                : selectedComponent === "label"
                  ? `<Label htmlFor="example-input" optional=${toJsxString(label.optional)}>
  ${label.text}
</Label>
<Input id="example-input" placeholder="Input paired with label" />`
                  : selectedComponent === "separator"
                    ? `<Separator orientation="${separator.orientation}" />`
                    : selectedComponent === "link"
                      ? `<Link href=${toJsxString(link.href)}>${link.text}</Link>`
                      : `<Card>
  <CardHeader>
    <CardTitle>${card.title}</CardTitle>
    <CardDescription>${card.description}</CardDescription>
  </CardHeader>
  <CardContent>${card.body}</CardContent>
  <CardFooter>
    <Button size="sm">${card.actionText}</Button>
  </CardFooter>
</Card>`;

  return (
    <div className="min-h-screen p-8" style={{ background: "var(--background)", color: "var(--foreground)" }}>
      <main className="mx-auto w-full max-w-6xl space-y-6">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: "var(--ds-muted-fg)" }}>
            Interactive playground
          </p>
          <h1 className="text-3xl font-semibold tracking-tight">Component Props Editor</h1>
          <p className="max-w-3xl text-sm leading-relaxed" style={{ color: "var(--ds-muted-fg)" }}>
            Select a component, tweak its props in real time, and preview the output instantly.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <ThemeModeToggle />
          <Button variant="secondary" size="sm" onClick={resetPlayground}>
            Reset controls
          </Button>
        </div>

        <section className="grid gap-6 lg:grid-cols-[340px_1fr]">
          <Card>
            <CardHeader>
              <CardTitle>Controls</CardTitle>
              <CardDescription>Choose component and adjust props.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-2">
                <FieldLabel>Component</FieldLabel>
                <Select
                  value={selectedComponent}
                  onValueChange={(next) =>
                    setSelectedComponent(next as typeof selectedComponent)
                  }
                  options={[
                    { label: "Button", value: "button" },
                    { label: "Input", value: "input" },
                    { label: "Badge", value: "badge" },
                    { label: "Switch", value: "switch" },
                    { label: "Checkbox", value: "checkbox" },
                    { label: "Textarea", value: "textarea" },
                    { label: "Label", value: "label" },
                    { label: "Separator", value: "separator" },
                    { label: "Link", value: "link" },
                    { label: "Card", value: "card" },
                  ]}
                />
              </div>

              <Separator />

              <div className="space-y-3">
                <FieldLabel>Playground Presets</FieldLabel>
                <div className="flex gap-2">
                  <Input
                    value={presetName}
                    onChange={(e) => setPresetName(e.target.value)}
                    placeholder="Preset name..."
                  />
                  <Button
                    size="sm"
                    onClick={() => {
                      savePreset(presetName);
                      setPresetName("");
                    }}
                  >
                    Save
                  </Button>
                </div>
                <div className="space-y-2">
                  {presets.length ? (
                    presets.map((preset) => (
                      <div
                        key={preset.id}
                        className="flex items-center justify-between gap-2 rounded-md border p-2"
                        style={{ borderColor: "var(--ds-color-neutral-border)" }}
                      >
                        <span className="truncate text-xs">{preset.name}</span>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="secondary" onClick={() => loadPreset(preset.id)}>
                            Load
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => deletePreset(preset.id)}>
                            Delete
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs" style={{ color: "var(--ds-muted-fg)" }}>
                      No presets saved yet.
                    </p>
                  )}
                </div>
              </div>

              <Separator />

              {selectedComponent === "button" ? (
                <div className="space-y-3">
                  <FieldLabel>Label</FieldLabel>
                  <Input
                    value={button.label}
                    onChange={(e) => updateButton({ label: e.target.value })}
                  />
                  <FieldLabel>Variant</FieldLabel>
                  <Select
                    value={button.variant}
                    onValueChange={(next) =>
                      updateButton({
                        variant: next as "primary" | "secondary" | "ghost",
                      })
                    }
                    options={[
                      { label: "primary", value: "primary" },
                      { label: "secondary", value: "secondary" },
                      { label: "ghost", value: "ghost" },
                    ]}
                  />
                  <FieldLabel>Size</FieldLabel>
                  <Select
                    value={button.size}
                    onValueChange={(next) =>
                      updateButton({ size: next as "sm" | "md" | "lg" })
                    }
                    options={[
                      { label: "sm", value: "sm" },
                      { label: "md", value: "md" },
                      { label: "lg", value: "lg" },
                    ]}
                  />
                  <Switch
                    label="Disabled"
                    checked={button.disabled}
                    onCheckedChange={(checked) => updateButton({ disabled: checked })}
                  />
                </div>
              ) : null}

              {selectedComponent === "input" ? (
                <div className="space-y-3">
                  <FieldLabel>Placeholder</FieldLabel>
                  <Input
                    value={input.placeholder}
                    onChange={(e) => updateInput({ placeholder: e.target.value })}
                  />
                  <FieldLabel>Type</FieldLabel>
                  <Select
                    value={input.type}
                    onValueChange={(next) =>
                      updateInput({ type: next as "text" | "email" | "password" })
                    }
                    options={[
                      { label: "text", value: "text" },
                      { label: "email", value: "email" },
                      { label: "password", value: "password" },
                    ]}
                  />
                  <Switch
                    label="Disabled"
                    checked={input.disabled}
                    onCheckedChange={(checked) => updateInput({ disabled: checked })}
                  />
                </div>
              ) : null}

              {selectedComponent === "badge" ? (
                <div className="space-y-3">
                  <FieldLabel>Label</FieldLabel>
                  <Input
                    value={badge.label}
                    onChange={(e) => updateBadge({ label: e.target.value })}
                  />
                  <FieldLabel>Variant</FieldLabel>
                  <Select
                    value={badge.variant}
                    onValueChange={(next) =>
                      updateBadge({
                        variant: next as "solid" | "outline" | "muted",
                      })
                    }
                    options={[
                      { label: "solid", value: "solid" },
                      { label: "outline", value: "outline" },
                      { label: "muted", value: "muted" },
                    ]}
                  />
                  <FieldLabel>Size</FieldLabel>
                  <Select
                    value={badge.size}
                    onValueChange={(next) => updateBadge({ size: next as "sm" | "md" })}
                    options={[
                      { label: "sm", value: "sm" },
                      { label: "md", value: "md" },
                    ]}
                  />
                </div>
              ) : null}

              {selectedComponent === "switch" ? (
                <div className="space-y-3">
                  <FieldLabel>Label</FieldLabel>
                  <Input
                    value={switchControl.label}
                    onChange={(e) => updateSwitchControl({ label: e.target.value })}
                  />
                  <Switch
                    label="Checked"
                    checked={switchControl.checked}
                    onCheckedChange={(checked) => updateSwitchControl({ checked })}
                  />
                  <Switch
                    label="Disabled"
                    checked={switchControl.disabled}
                    onCheckedChange={(checked) => updateSwitchControl({ disabled: checked })}
                  />
                </div>
              ) : null}

              {selectedComponent === "checkbox" ? (
                <div className="space-y-3">
                  <FieldLabel>Label</FieldLabel>
                  <Input
                    value={checkbox.label}
                    onChange={(e) => updateCheckbox({ label: e.target.value })}
                  />
                  <Switch
                    label="Checked"
                    checked={checkbox.checked}
                    onCheckedChange={(checked) => updateCheckbox({ checked })}
                  />
                  <Switch
                    label="Disabled"
                    checked={checkbox.disabled}
                    onCheckedChange={(checked) => updateCheckbox({ disabled: checked })}
                  />
                </div>
              ) : null}

              {selectedComponent === "textarea" ? (
                <div className="space-y-3">
                  <FieldLabel>Placeholder</FieldLabel>
                  <Input
                    value={textarea.placeholder}
                    onChange={(e) => updateTextarea({ placeholder: e.target.value })}
                  />
                  <FieldLabel>Value</FieldLabel>
                  <Textarea
                    value={textarea.value}
                    onChange={(e) => updateTextarea({ value: e.target.value })}
                  />
                  <Switch
                    label="Disabled"
                    checked={textarea.disabled}
                    onCheckedChange={(checked) => updateTextarea({ disabled: checked })}
                  />
                </div>
              ) : null}

              {selectedComponent === "label" ? (
                <div className="space-y-3">
                  <FieldLabel>Text</FieldLabel>
                  <Input
                    value={label.text}
                    onChange={(e) => updateLabel({ text: e.target.value })}
                  />
                  <FieldLabel>Optional text</FieldLabel>
                  <Input
                    value={label.optional}
                    onChange={(e) => updateLabel({ optional: e.target.value })}
                  />
                </div>
              ) : null}

              {selectedComponent === "separator" ? (
                <div className="space-y-3">
                  <FieldLabel>Orientation</FieldLabel>
                  <Select
                    value={separator.orientation}
                    onValueChange={(next) =>
                      updateSeparator({
                        orientation: next as "horizontal" | "vertical",
                      })
                    }
                    options={[
                      { label: "horizontal", value: "horizontal" },
                      { label: "vertical", value: "vertical" },
                    ]}
                  />
                </div>
              ) : null}

              {selectedComponent === "link" ? (
                <div className="space-y-3">
                  <FieldLabel>Text</FieldLabel>
                  <Input
                    value={link.text}
                    onChange={(e) => updateLink({ text: e.target.value })}
                  />
                  <FieldLabel>Href</FieldLabel>
                  <Input
                    value={link.href}
                    onChange={(e) => updateLink({ href: e.target.value })}
                  />
                </div>
              ) : null}

              {selectedComponent === "card" ? (
                <div className="space-y-3">
                  <FieldLabel>Title</FieldLabel>
                  <Input
                    value={card.title}
                    onChange={(e) => updateCard({ title: e.target.value })}
                  />
                  <FieldLabel>Description</FieldLabel>
                  <Input
                    value={card.description}
                    onChange={(e) => updateCard({ description: e.target.value })}
                  />
                  <FieldLabel>Body</FieldLabel>
                  <Textarea
                    value={card.body}
                    onChange={(e) => updateCard({ body: e.target.value })}
                  />
                  <FieldLabel>Action text</FieldLabel>
                  <Input
                    value={card.actionText}
                    onChange={(e) => updateCard({ actionText: e.target.value })}
                  />
                </div>
              ) : null}

              <Separator />

              <div className="space-y-2">
                <FieldLabel>TypeScript Props Docs</FieldLabel>
                {selectedDoc?.props.length ? (
                  <div
                    className="max-h-60 overflow-auto rounded-md border"
                    style={{ borderColor: "var(--ds-color-neutral-border)" }}
                  >
                    <table className="w-full text-left text-xs">
                      <thead
                        style={{
                          position: "sticky",
                          top: 0,
                          background: "var(--ds-surface)",
                          color: "var(--ds-muted-fg)",
                        }}
                      >
                        <tr>
                          <th className="px-2 py-2 font-medium">Prop</th>
                          <th className="px-2 py-2 font-medium">Type</th>
                          <th className="px-2 py-2 font-medium">Required</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedDoc.props.map((prop) => (
                          <tr key={prop.name} className="border-t" style={{ borderColor: "var(--ds-color-neutral-border)" }}>
                            <td className="px-2 py-2">{prop.name}</td>
                            <td className="px-2 py-2" style={{ color: "var(--ds-muted-fg)" }}>
                              {prop.type}
                              {prop.defaultValue ? ` = ${prop.defaultValue}` : ""}
                            </td>
                            <td className="px-2 py-2">{prop.required ? "Yes" : "No"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-xs" style={{ color: "var(--ds-muted-fg)" }}>
                    No direct props documented for this component.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Live Preview</CardTitle>
              <CardDescription>Switch between rendered output and generated JSX.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant={activePanel === "preview" ? "primary" : "secondary"}
                  onClick={() => setActivePanel("preview")}
                >
                  Preview
                </Button>
                <Button
                  size="sm"
                  variant={activePanel === "code" ? "primary" : "secondary"}
                  onClick={() => setActivePanel("code")}
                >
                  Code
                </Button>
                <Button
                  size="sm"
                  variant={activePanel === "example" ? "primary" : "secondary"}
                  onClick={() => setActivePanel("example")}
                >
                  Real Case
                </Button>
                <Button
                  size="sm"
                  variant={activePanel === "history" ? "primary" : "secondary"}
                  onClick={() => setActivePanel("history")}
                >
                  History
                </Button>
                {activePanel === "code" ? (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={async () => {
                      await navigator.clipboard.writeText(snippet);
                      setCopied(true);
                      window.setTimeout(() => setCopied(false), 1500);
                    }}
                  >
                    {copied ? "Copied" : "Copy code"}
                  </Button>
                ) : null}
              </div>

              {activePanel === "preview" ? (
                <div
                  className="flex min-h-[420px] items-center justify-center rounded-md border"
                  style={{
                    borderColor: "var(--ds-color-neutral-border)",
                    background: "var(--background)",
                  }}
                >
                  {selectedComponent === "button" ? (
                    <Button variant={button.variant} size={button.size} disabled={button.disabled}>
                      {button.label}
                    </Button>
                  ) : null}

                  {selectedComponent === "input" ? (
                    <div className="w-full max-w-sm">
                      <Input
                        type={input.type}
                        placeholder={input.placeholder}
                        disabled={input.disabled}
                      />
                    </div>
                  ) : null}

                  {selectedComponent === "badge" ? (
                    <Badge variant={badge.variant} size={badge.size}>
                      {badge.label}
                    </Badge>
                  ) : null}

                  {selectedComponent === "switch" ? (
                    <Switch
                      label={switchControl.label}
                      checked={switchControl.checked}
                      disabled={switchControl.disabled}
                      onCheckedChange={(checked) => updateSwitchControl({ checked })}
                    />
                  ) : null}

                  {selectedComponent === "checkbox" ? (
                    <Checkbox
                      label={checkbox.label}
                      checked={checkbox.checked}
                      disabled={checkbox.disabled}
                      onChange={(e) => updateCheckbox({ checked: e.target.checked })}
                    />
                  ) : null}

                  {selectedComponent === "textarea" ? (
                    <div className="w-full max-w-sm">
                      <Textarea
                        placeholder={textarea.placeholder}
                        value={textarea.value}
                        disabled={textarea.disabled}
                        onChange={(e) => updateTextarea({ value: e.target.value })}
                      />
                    </div>
                  ) : null}

                  {selectedComponent === "label" ? (
                    <div className="w-full max-w-sm space-y-2">
                      <UiLabel htmlFor="playground-label-demo" optional={label.optional}>
                        {label.text}
                      </UiLabel>
                      <Input id="playground-label-demo" placeholder="Input paired with label" />
                    </div>
                  ) : null}

                  {selectedComponent === "separator" ? (
                    <div
                      className={
                        separator.orientation === "vertical"
                          ? "flex min-h-[96px] items-center justify-center gap-4"
                          : "w-full max-w-md"
                      }
                    >
                      {separator.orientation === "vertical" ? (
                        <>
                          <span style={{ color: "var(--ds-muted-fg)" }}>Left</span>
                          <Separator orientation="vertical" />
                          <span style={{ color: "var(--ds-muted-fg)" }}>Right</span>
                        </>
                      ) : (
                        <Separator orientation="horizontal" />
                      )}
                    </div>
                  ) : null}

                  {selectedComponent === "link" ? <Link href={link.href}>{link.text}</Link> : null}

                  {selectedComponent === "card" ? (
                    <Card style={{ width: "100%", maxWidth: 420 }}>
                      <CardHeader>
                        <CardTitle>{card.title}</CardTitle>
                        <CardDescription>{card.description}</CardDescription>
                      </CardHeader>
                      <CardContent>{card.body}</CardContent>
                      <CardFooter>
                        <Button size="sm">{card.actionText}</Button>
                      </CardFooter>
                    </Card>
                  ) : null}
                </div>
              ) : activePanel === "code" ? (
                <pre
                  className="min-h-[420px] overflow-x-auto border p-4 text-xs leading-relaxed"
                  style={{
                    borderColor: "var(--ds-color-neutral-border)",
                    background: "var(--background)",
                    borderRadius: "var(--ds-radius-md)",
                  }}
                >
                  <code>{snippet}</code>
                </pre>
              ) : activePanel === "example" ? (
                <div
                  className="min-h-[420px] rounded-md border p-5"
                  style={{
                    borderColor: "var(--ds-color-neutral-border)",
                    background: "var(--background)",
                  }}
                >
                  {selectedComponent === "button" ? (
                    <div className="space-y-4">
                      <p style={{ color: "var(--ds-muted-fg)" }}>Checkout footer actions</p>
                      <div className="flex flex-wrap gap-3">
                        <Button variant="secondary">Cancel order</Button>
                        <Button variant={button.variant} size={button.size} disabled={button.disabled}>
                          {button.label}
                        </Button>
                      </div>
                    </div>
                  ) : null}

                  {selectedComponent === "input" ? (
                    <div className="max-w-md space-y-2">
                      <UiLabel htmlFor="example-search">Search components</UiLabel>
                      <Input
                        id="example-search"
                        type={input.type}
                        placeholder={input.placeholder || "Search by name..."}
                        disabled={input.disabled}
                      />
                    </div>
                  ) : null}

                  {selectedComponent === "badge" ? (
                    <div className="space-y-4">
                      <p style={{ color: "var(--ds-muted-fg)" }}>Release list item</p>
                      <div
                        className="flex items-center justify-between border p-3"
                        style={{
                          borderColor: "var(--ds-color-neutral-border)",
                          borderRadius: "var(--ds-radius-md)",
                        }}
                      >
                        <span>Design tokens v2.1</span>
                        <Badge variant={badge.variant} size={badge.size}>
                          {badge.label}
                        </Badge>
                      </div>
                    </div>
                  ) : null}

                  {selectedComponent === "switch" ? (
                    <div className="max-w-md space-y-3">
                      <p style={{ color: "var(--ds-muted-fg)" }}>Preferences</p>
                      <Switch
                        label={switchControl.label}
                        checked={switchControl.checked}
                        disabled={switchControl.disabled}
                        onCheckedChange={(checked) => updateSwitchControl({ checked })}
                      />
                    </div>
                  ) : null}

                  {selectedComponent === "checkbox" ? (
                    <div className="max-w-md space-y-3">
                      <p style={{ color: "var(--ds-muted-fg)" }}>Newsletter opt-in</p>
                      <Checkbox
                        label={checkbox.label}
                        checked={checkbox.checked}
                        disabled={checkbox.disabled}
                        onChange={(e) => updateCheckbox({ checked: e.target.checked })}
                      />
                    </div>
                  ) : null}

                  {selectedComponent === "textarea" ? (
                    <div className="max-w-md space-y-2">
                      <UiLabel htmlFor="example-feedback">Feedback</UiLabel>
                      <Textarea
                        id="example-feedback"
                        placeholder={textarea.placeholder}
                        value={textarea.value}
                        disabled={textarea.disabled}
                        onChange={(e) => updateTextarea({ value: e.target.value })}
                      />
                    </div>
                  ) : null}

                  {selectedComponent === "label" ? (
                    <div className="max-w-md space-y-2">
                      <UiLabel htmlFor="example-email" optional={label.optional}>
                        {label.text}
                      </UiLabel>
                      <Input id="example-email" type="email" placeholder="name@company.com" />
                    </div>
                  ) : null}

                  {selectedComponent === "separator" ? (
                    <div className="space-y-3">
                      <p style={{ color: "var(--ds-muted-fg)" }}>Toolbar grouping</p>
                      <div className="flex items-center gap-3">
                        <Button size="sm" variant="ghost">
                          Bold
                        </Button>
                        <Button size="sm" variant="ghost">
                          Italic
                        </Button>
                        <Separator orientation={separator.orientation} />
                        <Button size="sm" variant="ghost">
                          Code
                        </Button>
                      </div>
                    </div>
                  ) : null}

                  {selectedComponent === "link" ? (
                    <div className="space-y-3">
                      <p style={{ color: "var(--ds-muted-fg)" }}>Documentation references</p>
                      <ul className="space-y-2">
                        <li>
                          <Link href={link.href}>{link.text}</Link>
                        </li>
                        <li>
                          <Link href="https://nextjs.org/docs">Next.js docs</Link>
                        </li>
                      </ul>
                    </div>
                  ) : null}

                  {selectedComponent === "card" ? (
                    <div className="space-y-4">
                      <p style={{ color: "var(--ds-muted-fg)" }}>Dashboard summary card</p>
                      <Card style={{ width: "100%", maxWidth: 460 }}>
                        <CardHeader>
                          <CardTitle>{card.title}</CardTitle>
                          <CardDescription>{card.description}</CardDescription>
                        </CardHeader>
                        <CardContent>{card.body}</CardContent>
                        <CardFooter>
                          <Button size="sm">{card.actionText}</Button>
                          <Button size="sm" variant="secondary">
                            Dismiss
                          </Button>
                        </CardFooter>
                      </Card>
                    </div>
                  ) : null}
                </div>
              ) : (
                <div
                  className="min-h-[420px] rounded-md border p-5"
                  style={{
                    borderColor: "var(--ds-color-neutral-border)",
                    background: "var(--background)",
                  }}
                >
                  <div className="space-y-3">
                    <p className="text-sm" style={{ color: "var(--ds-muted-fg)" }}>
                      Version timeline for <strong>{selectedComponent}</strong>
                    </p>
                    {timeline.length ? (
                      <ol className="space-y-3">
                        {timeline.map((entry) => (
                          <li
                            key={`${entry.version}-${entry.date}`}
                            className="rounded-md border p-3"
                            style={{ borderColor: "var(--ds-color-neutral-border)" }}
                          >
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <span className="text-sm font-semibold">{entry.version}</span>
                              <span className="text-xs" style={{ color: "var(--ds-muted-fg)" }}>
                                {entry.date}
                              </span>
                            </div>
                            <p className="mt-1 text-sm">{entry.summary}</p>
                            <ul
                              className="mt-2 list-disc space-y-1 pl-5 text-xs"
                              style={{ color: "var(--ds-muted-fg)" }}
                            >
                              {entry.changes.map((change) => (
                                <li key={change}>{change}</li>
                              ))}
                            </ul>
                          </li>
                        ))}
                      </ol>
                    ) : (
                      <p className="text-sm" style={{ color: "var(--ds-muted-fg)" }}>
                        No timeline entries yet.
                      </p>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}
