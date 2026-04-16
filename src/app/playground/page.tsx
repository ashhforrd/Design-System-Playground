"use client";

import { useState } from "react";
import { ChevronRight, ChevronDown, Moon, Sun } from "lucide-react";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Alert,
  Avatar,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogContent,
  DialogFooter,
  Input,
  Label,
  Link,
  Progress,
  Select,
  Separator,
  Skeleton,
  Spinner,
  Switch,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Textarea,
  Toast,
  Tooltip,
} from "@/components/ui";
import {
  usePlaygroundStore,
  fontFamilyLabels,
  type FontFamily,
} from "@/state/playground-store";

const components = [
  "Accordion",
  "Alert",
  "Avatar",
  "Badge",
  "Button",
  "Card",
  "Checkbox",
  "Dialog",
  "Input",
  "Label",
  "Link",
  "Progress",
  "Select",
  "Separator",
  "Skeleton",
  "Spinner",
  "Switch",
  "Tabs",
  "Textarea",
  "Toast",
  "Tooltip",
] as const;

type ComponentName = (typeof components)[number];

const componentDescriptions: Record<ComponentName, string> = {
  Accordion: "A vertically stacked set of interactive headings that reveal or hide associated content sections. Useful for FAQs, nested menus, or organizing related content into collapsible panels.",
  Alert: "Displays a brief, important message to attract user attention without interrupting their workflow. Supports multiple variants like info, success, warning, and error states.",
  Avatar: "A visual representation of a user or entity, typically showing a profile photo or initials as a fallback. Available in multiple sizes for different contexts.",
  Badge: "A small status indicator or label used to highlight new items, counts, or categorize content. Supports solid, outline, and muted variants.",
  Button: "The primary interactive element for triggering actions. Available in primary, secondary, and ghost variants with multiple size options.",
  Card: "A flexible container for grouping related content and actions. Includes header, content, and footer sections for structured layouts.",
  Checkbox: "A form control that allows users to select one or multiple options from a set. Can be used independently or in groups.",
  Dialog: "A modal overlay that displays content requiring user attention or interaction. Interrupts the current workflow until dismissed.",
  Input: "A single-line text field for capturing user input. Supports various types like text, email, and password with placeholder support.",
  Label: "A text label associated with form controls to provide accessible names. Supports optional indicators for non-required fields.",
  Link: "A navigation element for internal and external links. Automatically handles routing and opens external links in new tabs.",
  Progress: "A visual indicator showing the completion status of a task or process. Available in different sizes with optional percentage label.",
  Select: "A dropdown menu for selecting a single option from a predefined list. Provides a compact way to present multiple choices.",
  Separator: "A visual divider that separates content into distinct sections. Supports horizontal and vertical orientations.",
  Skeleton: "A placeholder loading state that mimics the shape of content while data is being fetched. Available in text, circular, and rectangular variants.",
  Spinner: "An animated loading indicator that signals an ongoing process. Available in multiple sizes for different contexts.",
  Switch: "A toggle control for binary on/off states. Provides immediate visual feedback of the current state.",
  Tabs: "A navigation component that organizes content into separate views, showing one panel at a time. Useful for related but distinct content sections.",
  Textarea: "A multi-line text input for longer form content like comments, descriptions, or messages.",
  Toast: "A brief notification that appears temporarily to provide feedback about an action. Auto-dismisses after a set duration.",
  Tooltip: "A small popup that displays additional information when hovering over an element. Supports multiple positioning options.",
};

const fonts: FontFamily[] = ["satoshi", "manrope", "dm-sans", "poppins", "open-sans"];

export default function PlaygroundPage() {
  const [selectedComponent, setSelectedComponent] = useState<ComponentName>("Accordion");
  const [dialogOpen, setDialogOpen] = useState(false);
  const fontFamily = usePlaygroundStore((state) => state.fontFamily);
  const setFontFamily = usePlaygroundStore((state) => state.setFontFamily);
  const themeMode = usePlaygroundStore((state) => state.themeMode);
  const setThemeMode = usePlaygroundStore((state) => state.setThemeMode);

  const appearanceMode: "dark" | "light" =
    themeMode === "light" ? "light" : "dark";

  const setAppearanceMode = (mode: "dark" | "light") => {
    setThemeMode(mode);
  };

  return (
    <div
      className="flex h-screen min-h-0 overflow-hidden"
      style={{ background: "#131313", color: "white" }}
    >
      {/* Sidebar */}
      <aside className="flex w-[250px] shrink-0 flex-col overflow-hidden p-6">
        <h1 className="shrink-0 text-2xl font-black tracking-tight">PLAYGROUND</h1>
        <nav className="scrollbar-hidden mt-3 flex min-h-0 flex-1 flex-col gap-1.5 overflow-y-auto pr-1">
          {components.map((name) => (
            <button
              key={name}
              onClick={() => setSelectedComponent(name)}
              className="shrink-0 rounded-xl px-3 py-2.5 text-left text-base transition-colors"
              style={{
                background: selectedComponent === name ? "#1C1C1C" : "transparent",
              }}
            >
              {name}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex min-h-0 flex-1 flex-col overflow-hidden p-6">
        <div
          className="flex min-h-0 flex-1 flex-col gap-6 overflow-hidden rounded-3xl p-6"
          style={{ background: "#161616" }}
        >
          {/* Header */}
          <div className="flex shrink-0 flex-col gap-3">
            <div className="flex items-center justify-between">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2.5 text-base">
                <span className="font-medium">Playground</span>
                <ChevronRight size={16} />
                <span>{selectedComponent}</span>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-3">
                {/* Light / Dark appearance */}
                <div className="flex rounded-xl p-1.5" style={{ background: "#1C1C1C" }}>
                  <button
                    type="button"
                    aria-label="Light mode"
                    aria-pressed={appearanceMode === "light"}
                    onClick={() => setAppearanceMode("light")}
                    className="rounded-lg p-2 transition-colors"
                    style={{ background: appearanceMode === "light" ? "#323232" : "transparent" }}
                  >
                    <Sun size={16} />
                  </button>
                  <button
                    type="button"
                    aria-label="Dark mode"
                    aria-pressed={appearanceMode === "dark"}
                    onClick={() => setAppearanceMode("dark")}
                    className="rounded-lg p-2 transition-colors"
                    style={{ background: appearanceMode === "dark" ? "#323232" : "transparent" }}
                  >
                    <Moon size={16} />
                  </button>
                </div>

                {/* Font Selector */}
                <div
                  className="relative flex w-40 items-center justify-between rounded-xl"
                  style={{ background: "#1C1C1C" }}
                >
                  <select
                    value={fontFamily}
                    onChange={(e) => setFontFamily(e.target.value as FontFamily)}
                    className="w-full cursor-pointer appearance-none rounded-xl bg-transparent px-3 py-2 pr-8 text-base outline-none"
                  >
                    {fonts.map((f) => (
                      <option key={f} value={f} style={{ background: "#1C1C1C" }}>
                        {fontFamilyLabels[f]}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={16} className="pointer-events-none absolute right-3" />
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-xl leading-relaxed" style={{ color: "rgba(255,255,255,0.8)" }}>
              {componentDescriptions[selectedComponent]}
            </p>
          </div>

          {/* Component Showcase */}
          <div
            className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden rounded-2xl p-8"
            style={{ background: "#131313", border: "1px solid #212121" }}
          >
            <ComponentShowcase
              component={selectedComponent}
              dialogOpen={dialogOpen}
              setDialogOpen={setDialogOpen}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

function ComponentShowcase({
  component,
  dialogOpen,
  setDialogOpen,
}: {
  component: ComponentName;
  dialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;
}) {
  const gridClass = "grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3";

  const renderVariantCard = (title: string, children: React.ReactNode) => (
    <div className="flex flex-col gap-3">
      <span className="text-sm font-medium uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.5)" }}>
        {title}
      </span>
      <div className="flex flex-wrap items-center gap-3">
        {children}
      </div>
    </div>
  );

  switch (component) {
    case "Accordion":
      return (
        <div className={gridClass}>
          {renderVariantCard("Single Mode", (
            <Accordion type="single" style={{ width: "100%", maxWidth: 400 }}>
              <AccordionItem value="1">
                <AccordionTrigger value="1">What is a design system?</AccordionTrigger>
                <AccordionContent value="1">A collection of reusable components and guidelines for building consistent UIs.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="2">
                <AccordionTrigger value="2">Why use design tokens?</AccordionTrigger>
                <AccordionContent value="2">They store visual decisions in a platform-agnostic format.</AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
          {renderVariantCard("Multiple Mode", (
            <Accordion type="multiple" defaultValue={["1"]} style={{ width: "100%", maxWidth: 400 }}>
              <AccordionItem value="1">
                <AccordionTrigger value="1">First Section (expanded)</AccordionTrigger>
                <AccordionContent value="1">This section is expanded by default.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="2">
                <AccordionTrigger value="2">Second Section</AccordionTrigger>
                <AccordionContent value="2">Multiple sections can be open at once.</AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      );

    case "Alert":
      return (
        <div className={gridClass}>
          {renderVariantCard("Info", <Alert variant="info" title="Information">This is an informational message.</Alert>)}
          {renderVariantCard("Success", <Alert variant="success" title="Success">Your changes have been saved.</Alert>)}
          {renderVariantCard("Warning", <Alert variant="warning" title="Warning">Please review before proceeding.</Alert>)}
          {renderVariantCard("Error", <Alert variant="error" title="Error">Something went wrong.</Alert>)}
        </div>
      );

    case "Avatar":
      return (
        <div className={gridClass}>
          {renderVariantCard("With Initials", (
            <>
              <Avatar fallback="JD" size="sm" />
              <Avatar fallback="JD" size="md" />
              <Avatar fallback="JD" size="lg" />
              <Avatar fallback="JD" size="xl" />
            </>
          ))}
          {renderVariantCard("With Image", (
            <>
              <Avatar src="https://i.pravatar.cc/150?img=1" size="sm" />
              <Avatar src="https://i.pravatar.cc/150?img=2" size="md" />
              <Avatar src="https://i.pravatar.cc/150?img=3" size="lg" />
              <Avatar src="https://i.pravatar.cc/150?img=4" size="xl" />
            </>
          ))}
        </div>
      );

    case "Badge":
      return (
        <div className={gridClass}>
          {renderVariantCard("Solid", (
            <>
              <Badge variant="solid" size="sm">Small</Badge>
              <Badge variant="solid" size="md">Medium</Badge>
            </>
          ))}
          {renderVariantCard("Outline", (
            <>
              <Badge variant="outline" size="sm">Small</Badge>
              <Badge variant="outline" size="md">Medium</Badge>
            </>
          ))}
          {renderVariantCard("Muted", (
            <>
              <Badge variant="muted" size="sm">Small</Badge>
              <Badge variant="muted" size="md">Medium</Badge>
            </>
          ))}
        </div>
      );

    case "Button":
      return (
        <div className={gridClass}>
          {renderVariantCard("Primary", (
            <>
              <Button variant="primary" size="sm">Small</Button>
              <Button variant="primary" size="md">Medium</Button>
              <Button variant="primary" size="lg">Large</Button>
            </>
          ))}
          {renderVariantCard("Secondary", (
            <>
              <Button variant="secondary" size="sm">Small</Button>
              <Button variant="secondary" size="md">Medium</Button>
              <Button variant="secondary" size="lg">Large</Button>
            </>
          ))}
          {renderVariantCard("Ghost", (
            <>
              <Button variant="ghost" size="sm">Small</Button>
              <Button variant="ghost" size="md">Medium</Button>
              <Button variant="ghost" size="lg">Large</Button>
            </>
          ))}
          {renderVariantCard("Disabled", (
            <>
              <Button variant="primary" disabled>Primary</Button>
              <Button variant="secondary" disabled>Secondary</Button>
              <Button variant="ghost" disabled>Ghost</Button>
            </>
          ))}
        </div>
      );

    case "Card":
      return (
        <div className={gridClass}>
          {renderVariantCard("Basic Card", (
            <Card style={{ width: "100%", maxWidth: 320 }}>
              <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>Card description goes here.</CardDescription>
              </CardHeader>
              <CardContent>This is the card content area.</CardContent>
              <CardFooter>
                <Button size="sm">Action</Button>
              </CardFooter>
            </Card>
          ))}
          {renderVariantCard("Card with Actions", (
            <Card style={{ width: "100%", maxWidth: 320 }}>
              <CardHeader>
                <CardTitle>Project Update</CardTitle>
                <CardDescription>Latest changes summary</CardDescription>
              </CardHeader>
              <CardContent>Review the recent updates to the project.</CardContent>
              <CardFooter>
                <Button size="sm">Confirm</Button>
                <Button size="sm" variant="secondary">Cancel</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      );

    case "Checkbox":
      return (
        <div className={gridClass}>
          {renderVariantCard("Unchecked", <Checkbox label="Accept terms" />)}
          {renderVariantCard("Checked", <Checkbox label="Receive updates" defaultChecked />)}
          {renderVariantCard("Disabled", <Checkbox label="Disabled option" disabled />)}
          {renderVariantCard("Disabled Checked", <Checkbox label="Locked option" disabled defaultChecked />)}
        </div>
      );

    case "Dialog":
      return (
        <div className={gridClass}>
          {renderVariantCard("Trigger Dialog", (
            <>
              <Button onClick={() => setDialogOpen(true)}>Open Dialog</Button>
              <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
                <DialogHeader>
                  <DialogTitle>Confirm Action</DialogTitle>
                  <DialogDescription>Are you sure you want to proceed?</DialogDescription>
                </DialogHeader>
                <DialogContent>
                  <p style={{ fontSize: "0.875rem", color: "var(--ds-muted-fg)" }}>
                    This action cannot be undone.
                  </p>
                </DialogContent>
                <DialogFooter>
                  <Button variant="ghost" onClick={() => setDialogOpen(false)}>Cancel</Button>
                  <Button onClick={() => setDialogOpen(false)}>Confirm</Button>
                </DialogFooter>
              </Dialog>
            </>
          ))}
        </div>
      );

    case "Input":
      return (
        <div className={gridClass}>
          {renderVariantCard("Default", <Input placeholder="Enter text..." style={{ width: 280 }} />)}
          {renderVariantCard("Email", <Input type="email" placeholder="you@example.com" style={{ width: 280 }} />)}
          {renderVariantCard("Password", <Input type="password" placeholder="Password" style={{ width: 280 }} />)}
          {renderVariantCard("Disabled", <Input placeholder="Disabled input" disabled style={{ width: 280 }} />)}
        </div>
      );

    case "Label":
      return (
        <div className={gridClass}>
          {renderVariantCard("Basic Label", (
            <div className="space-y-2">
              <Label htmlFor="label-demo">Email address</Label>
              <Input id="label-demo" placeholder="you@example.com" />
            </div>
          ))}
          {renderVariantCard("With Optional", (
            <div className="space-y-2">
              <Label htmlFor="label-optional" optional="(optional)">Phone number</Label>
              <Input id="label-optional" placeholder="+1 (555) 000-0000" />
            </div>
          ))}
        </div>
      );

    case "Link":
      return (
        <div className={gridClass}>
          {renderVariantCard("Internal Link", <Link href="/">Go to Home</Link>)}
          {renderVariantCard("External Link", <Link href="https://github.com">GitHub (opens in new tab)</Link>)}
        </div>
      );

    case "Progress":
      return (
        <div className={gridClass}>
          {renderVariantCard("Small", <Progress value={30} size="sm" style={{ width: 280 }} />)}
          {renderVariantCard("Medium", <Progress value={50} size="md" style={{ width: 280 }} />)}
          {renderVariantCard("Large", <Progress value={70} size="lg" style={{ width: 280 }} />)}
          {renderVariantCard("With Label", <Progress value={85} size="md" showLabel style={{ width: 280 }} />)}
        </div>
      );

    case "Select":
      return (
        <div className={gridClass}>
          {renderVariantCard("Default", (
            <Select
              options={[
                { label: "Option 1", value: "1" },
                { label: "Option 2", value: "2" },
                { label: "Option 3", value: "3" },
              ]}
              value="1"
              onValueChange={() => {}}
            />
          ))}
        </div>
      );

    case "Separator":
      return (
        <div className={gridClass}>
          {renderVariantCard("Horizontal", (
            <div style={{ width: 280 }}>
              <Separator orientation="horizontal" />
            </div>
          ))}
          {renderVariantCard("Vertical", (
            <div className="flex items-center gap-4" style={{ height: 48 }}>
              <span>Left</span>
              <Separator orientation="vertical" />
              <span>Right</span>
            </div>
          ))}
        </div>
      );

    case "Skeleton":
      return (
        <div className={gridClass}>
          {renderVariantCard("Text", <Skeleton variant="text" width={200} />)}
          {renderVariantCard("Circular", <Skeleton variant="circular" width={48} height={48} />)}
          {renderVariantCard("Rectangular", <Skeleton variant="rectangular" width={200} height={100} />)}
          {renderVariantCard("Card Example", (
            <div className="flex gap-3">
              <Skeleton variant="circular" width={48} height={48} />
              <div className="flex flex-col gap-2">
                <Skeleton variant="text" width={120} />
                <Skeleton variant="text" width={200} />
                <Skeleton variant="text" width={160} />
              </div>
            </div>
          ))}
        </div>
      );

    case "Spinner":
      return (
        <div className={gridClass}>
          {renderVariantCard("Small", <Spinner size="sm" />)}
          {renderVariantCard("Medium", <Spinner size="md" />)}
          {renderVariantCard("Large", <Spinner size="lg" />)}
          {renderVariantCard("With Text", (
            <div className="flex items-center gap-2">
              <Spinner size="sm" />
              <span style={{ color: "var(--ds-muted-fg)" }}>Loading...</span>
            </div>
          ))}
        </div>
      );

    case "Switch":
      return (
        <div className={gridClass}>
          {renderVariantCard("Off", <Switch label="Enable feature" />)}
          {renderVariantCard("On", <Switch label="Notifications" defaultChecked />)}
          {renderVariantCard("Disabled Off", <Switch label="Disabled" disabled />)}
          {renderVariantCard("Disabled On", <Switch label="Locked on" disabled defaultChecked />)}
        </div>
      );

    case "Tabs":
      return (
        <div className={gridClass}>
          {renderVariantCard("Default Tabs", (
            <Tabs defaultValue="tab1" style={{ width: "100%", maxWidth: 400 }}>
              <TabsList>
                <TabsTrigger value="tab1">Account</TabsTrigger>
                <TabsTrigger value="tab2">Password</TabsTrigger>
                <TabsTrigger value="tab3">Settings</TabsTrigger>
              </TabsList>
              <TabsContent value="tab1">
                <p style={{ color: "var(--ds-muted-fg)", fontSize: "0.875rem" }}>Manage your account settings.</p>
              </TabsContent>
              <TabsContent value="tab2">
                <p style={{ color: "var(--ds-muted-fg)", fontSize: "0.875rem" }}>Change your password.</p>
              </TabsContent>
              <TabsContent value="tab3">
                <p style={{ color: "var(--ds-muted-fg)", fontSize: "0.875rem" }}>Configure app settings.</p>
              </TabsContent>
            </Tabs>
          ))}
          {renderVariantCard("With Disabled", (
            <Tabs defaultValue="tab1">
              <TabsList>
                <TabsTrigger value="tab1">Active</TabsTrigger>
                <TabsTrigger value="tab2" disabled>Disabled</TabsTrigger>
                <TabsTrigger value="tab3">Another</TabsTrigger>
              </TabsList>
            </Tabs>
          ))}
        </div>
      );

    case "Textarea":
      return (
        <div className={gridClass}>
          {renderVariantCard("Default", <Textarea placeholder="Write your message..." style={{ width: 280 }} />)}
          {renderVariantCard("With Value", <Textarea defaultValue="This is some pre-filled content." style={{ width: 280 }} />)}
          {renderVariantCard("Disabled", <Textarea placeholder="Disabled textarea" disabled style={{ width: 280 }} />)}
        </div>
      );

    case "Toast":
      return (
        <div className={gridClass}>
          {renderVariantCard("Default", <Toast title="Notification" description="This is a toast message." duration={0} />)}
          {renderVariantCard("Success", <Toast variant="success" title="Success!" description="Changes saved." duration={0} />)}
          {renderVariantCard("Error", <Toast variant="error" title="Error" description="Something went wrong." duration={0} />)}
        </div>
      );

    case "Tooltip":
      return (
        <div className={gridClass}>
          {renderVariantCard("Top", (
            <Tooltip content="Tooltip on top" position="top">
              <Button variant="secondary">Hover me (top)</Button>
            </Tooltip>
          ))}
          {renderVariantCard("Bottom", (
            <Tooltip content="Tooltip on bottom" position="bottom">
              <Button variant="secondary">Hover me (bottom)</Button>
            </Tooltip>
          ))}
          {renderVariantCard("Left", (
            <Tooltip content="Tooltip on left" position="left">
              <Button variant="secondary">Hover me (left)</Button>
            </Tooltip>
          ))}
          {renderVariantCard("Right", (
            <Tooltip content="Tooltip on right" position="right">
              <Button variant="secondary">Hover me (right)</Button>
            </Tooltip>
          ))}
        </div>
      );

    default:
      return null;
  }
}
