"use client";

import { useState, useRef, useCallback, useEffect, type DragEvent, type MouseEvent } from "react";
import {
  Trash2,
  Copy,
  Grid3X3,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Layers,
  ArrowUpToLine,
  ArrowDownToLine,
  ChevronLeft,
  Move,
} from "lucide-react";

import {
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
  Input,
  Label,
  Progress,
  Select,
  Separator,
  Spinner,
  Switch,
  Textarea,
  Tooltip,
} from "@/components/ui";
import {
  useSandboxStore,
  type SandboxComponentType,
  type CanvasNode,
  type ComponentProps,
} from "@/state/sandbox-store";
import { usePlaygroundStore, fontFamilyLabels, type FontFamily } from "@/state/playground-store";
import NextLink from "next/link";

const componentCategories = [
  {
    name: "Form",
    components: ["button", "input", "textarea", "checkbox", "switch", "label"] as SandboxComponentType[],
  },
  {
    name: "Display",
    components: ["badge", "avatar", "card", "alert", "progress", "spinner"] as SandboxComponentType[],
  },
  {
    name: "Layout",
    components: ["separator", "text"] as SandboxComponentType[],
  },
];

const fonts: FontFamily[] = ["satoshi", "manrope", "dm-sans", "poppins", "open-sans"];

export default function SandboxPage() {
  const fontFamily = usePlaygroundStore((state) => state.fontFamily);
  const setFontFamily = usePlaygroundStore((state) => state.setFontFamily);

  return (
    <div
      className="flex h-screen min-h-0 w-full overflow-hidden"
      style={{ background: "#131313", color: "white" }}
    >
      {/* Left Sidebar - Component Palette */}
      <ComponentPalette />

      {/* Main Canvas Area */}
      <main className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        {/* Toolbar */}
        <Toolbar fontFamily={fontFamily} setFontFamily={setFontFamily} />
        
        {/* Canvas */}
        <Canvas />
      </main>

      {/* Right Sidebar - Properties Panel */}
      <PropertiesPanel />
    </div>
  );
}

function ComponentPalette() {
  const handleDragStart = (e: DragEvent<HTMLDivElement>, type: SandboxComponentType) => {
    e.dataTransfer.setData("componentType", type);
    e.dataTransfer.effectAllowed = "copy";
  };

  return (
    <aside className="flex w-[240px] shrink-0 flex-col overflow-hidden border-r border-white/10">
      <div className="flex shrink-0 items-center gap-3 p-4 pb-0">
        <NextLink
          href="/playground"
          className="flex items-center gap-2 text-white/60 transition-colors hover:text-white"
        >
          <ChevronLeft size={18} />
        </NextLink>
        <h1 className="text-lg font-bold tracking-tight">SANDBOX</h1>
      </div>

      <div className="scrollbar-hidden flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto p-4">
        <p className="text-xs text-white/50">
          Drag components onto the canvas to build your layout
        </p>

        {componentCategories.map((category) => (
          <div key={category.name} className="flex flex-col gap-2">
            <span className="text-xs font-medium uppercase tracking-wider text-white/40">
              {category.name}
            </span>
            <div className="grid grid-cols-2 gap-2">
              {category.components.map((type) => (
                <div
                  key={type}
                  draggable
                  onDragStart={(e) => handleDragStart(e, type)}
                  className="flex cursor-grab items-center justify-center rounded-xl border border-white/10 bg-white/5 px-3 py-3.5 text-center transition-all hover:border-white/20 hover:bg-white/10 active:cursor-grabbing"
                >
                  <span className="text-sm font-medium capitalize text-white/90">{type}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}

function Toolbar({
  fontFamily,
  setFontFamily,
}: {
  fontFamily: FontFamily;
  setFontFamily: (font: FontFamily) => void;
}) {
  const { canvasZoom, setCanvasZoom, gridSnap, setGridSnap, clearCanvas, nodes } = useSandboxStore();

  return (
    <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-4 py-2">
      <div className="flex items-center gap-2">
        {/* Grid Snap Toggle */}
        <Tooltip content={gridSnap ? "Disable grid snap" : "Enable grid snap"} position="bottom">
          <button
            onClick={() => setGridSnap(!gridSnap)}
            className={`rounded-lg p-2 transition-colors ${
              gridSnap ? "bg-white/20 text-white" : "text-white/60 hover:bg-white/10 hover:text-white"
            }`}
          >
            <Grid3X3 size={18} />
          </button>
        </Tooltip>

        <Separator orientation="vertical" className="mx-1 h-6" />

        {/* Zoom Controls */}
        <Tooltip content="Zoom out" position="bottom">
          <button
            onClick={() => setCanvasZoom(canvasZoom - 0.1)}
            disabled={canvasZoom <= 0.25}
            className="rounded-lg p-2 text-white/60 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-30"
          >
            <ZoomOut size={18} />
          </button>
        </Tooltip>
        <span className="min-w-[4rem] text-center text-sm text-white/60">
          {Math.round(canvasZoom * 100)}%
        </span>
        <Tooltip content="Zoom in" position="bottom">
          <button
            onClick={() => setCanvasZoom(canvasZoom + 0.1)}
            disabled={canvasZoom >= 2}
            className="rounded-lg p-2 text-white/60 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-30"
          >
            <ZoomIn size={18} />
          </button>
        </Tooltip>
        <Tooltip content="Reset zoom" position="bottom">
          <button
            onClick={() => setCanvasZoom(1)}
            className="rounded-lg p-2 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
          >
            <RotateCcw size={18} />
          </button>
        </Tooltip>

        <Separator orientation="vertical" className="mx-1 h-6" />

        {/* Clear Canvas */}
        <Tooltip content="Clear canvas" position="bottom">
          <button
            onClick={clearCanvas}
            disabled={nodes.length === 0}
            className="rounded-lg p-2 text-white/60 transition-colors hover:bg-red-500/20 hover:text-red-400 disabled:opacity-30"
          >
            <Trash2 size={18} />
          </button>
        </Tooltip>
      </div>

      <div className="flex items-center gap-4">
        {/* Component Count */}
        <div className="flex items-center gap-2 text-sm text-white/50">
          <Layers size={16} />
          <span className="text-nowrap">{nodes.length} components</span>
        </div>

        <Separator orientation="vertical" className="mx-1 h-6" />

        {/* Font Selector */}
        <Select
          value={fontFamily}
          onValueChange={(v) => setFontFamily(v as FontFamily)}
          options={fonts.map((f) => ({
            label: fontFamilyLabels[f],
            value: f,
          }))}
          className="min-w-50"
          placeholder="Font"
        />
      </div>
    </div>
  );
}

function Canvas() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const {
    nodes,
    selectedNodeId,
    selectNode,
    addNode,
    updateNodePosition,
    canvasZoom,
    canvasOffset,
    setCanvasOffset,
    gridSnap,
    gridSize,
  } = useSandboxStore();

  const [isDraggingCanvas, setIsDraggingCanvas] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);

  const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const componentType = e.dataTransfer.getData("componentType") as SandboxComponentType;
      if (!componentType || !canvasRef.current) return;

      const rect = canvasRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - canvasOffset.x) / canvasZoom;
      const y = (e.clientY - rect.top - canvasOffset.y) / canvasZoom;

      addNode(componentType, x, y);
    },
    [addNode, canvasOffset, canvasZoom]
  );

  const handleCanvasClick = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget || (e.target as HTMLElement).dataset.canvas === "true") {
        selectNode(null);
      }
    },
    [selectNode]
  );

  const handleMouseDown = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (e.button === 1 || (e.button === 0 && e.altKey)) {
        setIsPanning(true);
        setDragStart({ x: e.clientX - canvasOffset.x, y: e.clientY - canvasOffset.y });
      }
    },
    [canvasOffset]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (isPanning) {
        setCanvasOffset({
          x: e.clientX - dragStart.x,
          y: e.clientY - dragStart.y,
        });
      }
    },
    [isPanning, dragStart, setCanvasOffset]
  );

  const handleMouseUp = useCallback(() => {
    setIsPanning(false);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        selectNode(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectNode]);

  return (
    <div
      ref={canvasRef}
      className="relative flex-1 overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at center, rgba(255,255,255,0.03) 0%, transparent 70%),
          linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px)
        `,
        backgroundSize: `100% 100%, ${gridSize * canvasZoom}px ${gridSize * canvasZoom}px, ${gridSize * canvasZoom}px ${gridSize * canvasZoom}px`,
        backgroundPosition: `0 0, ${canvasOffset.x}px ${canvasOffset.y}px, ${canvasOffset.x}px ${canvasOffset.y}px`,
        cursor: isPanning ? "grabbing" : "default",
      }}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={handleCanvasClick}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      data-canvas="true"
    >
      {nodes.length === 0 && (
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-1 text-white/30">
          <p className="text-lg">Drag components here to start building</p>
          <p className="text-sm">Hold Alt + drag to pan the canvas</p>
        </div>
      )}

      <div
        style={{
          transform: `translate(${canvasOffset.x}px, ${canvasOffset.y}px) scale(${canvasZoom})`,
          transformOrigin: "0 0",
        }}
      >
        {nodes.map((node) => (
          <CanvasNodeComponent
            key={node.id}
            node={node}
            isSelected={selectedNodeId === node.id}
          />
        ))}
      </div>
    </div>
  );
}

function CanvasNodeComponent({
  node,
  isSelected,
}: {
  node: CanvasNode;
  isSelected: boolean;
}) {
  const { selectNode, updateNodePosition, removeNode, duplicateNode, bringToFront, sendToBack } =
    useSandboxStore();
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const nodeRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (e.button !== 0) return;
      e.stopPropagation();
      selectNode(node.id);
      setIsDragging(true);
      setDragOffset({
        x: e.clientX - node.x,
        y: e.clientY - node.y,
      });
    },
    [node.id, node.x, node.y, selectNode]
  );

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: globalThis.MouseEvent) => {
      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;
      updateNodePosition(node.id, newX, newY);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragOffset, node.id, updateNodePosition]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isSelected) return;
      if (e.key === "Delete" || e.key === "Backspace") {
        e.preventDefault();
        removeNode(node.id);
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "d") {
        e.preventDefault();
        duplicateNode(node.id);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSelected, node.id, removeNode, duplicateNode]);

  return (
    <div
      ref={nodeRef}
      className={`absolute cursor-move ${isDragging ? "z-50" : ""}`}
      style={{
        left: node.x,
        top: node.y,
        width: node.width,
        outline: isSelected ? "2px solid #3B82F6" : "2px solid transparent",
        outlineOffset: "4px",
        borderRadius: "8px",
      }}
      onMouseDown={handleMouseDown}
    >
      <RenderComponent node={node} />
      
      {isSelected && (
        <div className="absolute -right-2 -top-10 flex gap-1">
          <Tooltip content="Bring to front" position="top">
            <button
              onClick={(e) => {
                e.stopPropagation();
                bringToFront(node.id);
              }}
              className="rounded-md bg-white/10 p-1.5 text-white/70 transition-colors hover:bg-white/20 hover:text-white"
            >
              <ArrowUpToLine size={14} />
            </button>
          </Tooltip>
          <Tooltip content="Send to back" position="top">
            <button
              onClick={(e) => {
                e.stopPropagation();
                sendToBack(node.id);
              }}
              className="rounded-md bg-white/10 p-1.5 text-white/70 transition-colors hover:bg-white/20 hover:text-white"
            >
              <ArrowDownToLine size={14} />
            </button>
          </Tooltip>
          <Tooltip content="Duplicate (Cmd+D)" position="top">
            <button
              onClick={(e) => {
                e.stopPropagation();
                duplicateNode(node.id);
              }}
              className="rounded-md bg-white/10 p-1.5 text-white/70 transition-colors hover:bg-white/20 hover:text-white"
            >
              <Copy size={14} />
            </button>
          </Tooltip>
          <Tooltip content="Delete" position="top">
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeNode(node.id);
              }}
              className="rounded-md bg-red-500/20 p-1.5 text-red-400 transition-colors hover:bg-red-500/30"
            >
              <Trash2 size={14} />
            </button>
          </Tooltip>
        </div>
      )}
    </div>
  );
}

function RenderComponent({ node }: { node: CanvasNode }) {
  const props = node.props;

  switch (node.type) {
    case "button": {
      const p = props as ComponentProps["button"];
      return (
        <Button variant={p.variant} size={p.size} disabled={p.disabled}>
          {p.label}
        </Button>
      );
    }
    case "input": {
      const p = props as ComponentProps["input"];
      return <Input type={p.type} placeholder={p.placeholder} disabled={p.disabled} className="w-full" />;
    }
    case "badge": {
      const p = props as ComponentProps["badge"];
      return (
        <Badge variant={p.variant} size={p.size}>
          {p.label}
        </Badge>
      );
    }
    case "switch": {
      const p = props as ComponentProps["switch"];
      return <Switch label={p.label} defaultChecked={p.checked} disabled={p.disabled} />;
    }
    case "checkbox": {
      const p = props as ComponentProps["checkbox"];
      return <Checkbox label={p.label} defaultChecked={p.checked} disabled={p.disabled} />;
    }
    case "textarea": {
      const p = props as ComponentProps["textarea"];
      return <Textarea placeholder={p.placeholder} disabled={p.disabled} rows={p.rows} className="w-full" />;
    }
    case "label": {
      const p = props as ComponentProps["label"];
      return <Label optional={p.optional}>{p.text}</Label>;
    }
    case "card": {
      const p = props as ComponentProps["card"];
      return (
        <Card className="w-full">
          <CardHeader>
            <CardTitle>{p.title}</CardTitle>
            <CardDescription>{p.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-white/60">Card content area</p>
          </CardContent>
          {p.showFooter && (
            <CardFooter>
              <Button size="sm">{p.footerText}</Button>
            </CardFooter>
          )}
        </Card>
      );
    }
    case "avatar": {
      const p = props as ComponentProps["avatar"];
      return <Avatar fallback={p.fallback} size={p.size} src={p.src || undefined} />;
    }
    case "alert": {
      const p = props as ComponentProps["alert"];
      return (
        <Alert variant={p.variant} title={p.title} className="w-full">
          {p.message}
        </Alert>
      );
    }
    case "progress": {
      const p = props as ComponentProps["progress"];
      return <Progress value={p.value} size={p.size} showLabel={p.showLabel} className="w-full" />;
    }
    case "spinner": {
      const p = props as ComponentProps["spinner"];
      return <Spinner size={p.size} />;
    }
    case "separator": {
      const p = props as ComponentProps["separator"];
      return <Separator orientation={p.orientation} className={p.orientation === "vertical" ? "h-10" : "w-full"} />;
    }
    case "text": {
      const p = props as ComponentProps["text"];
      const fontSizeClass = {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
        xl: "text-xl",
      }[p.fontSize];
      const fontWeightClass = {
        normal: "font-normal",
        medium: "font-medium",
        semibold: "font-semibold",
        bold: "font-bold",
      }[p.fontWeight];
      return <p className={`${fontSizeClass} ${fontWeightClass}`}>{p.content}</p>;
    }
    default:
      return null;
  }
}

function PropertiesPanel() {
  const { selectedNodeId, nodes, updateNodeProps, updateNodePosition, updateNodeSize, removeNode } =
    useSandboxStore();

  const selectedNode = nodes.find((n) => n.id === selectedNodeId);

  if (!selectedNode) {
    return (
      <aside className="flex w-[280px] shrink-0 flex-col border-l border-white/10 p-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-white/40">Properties</h2>
        <div className="mt-8 flex flex-1 flex-col items-center justify-center text-center text-white/30">
          <p className="text-sm">Select a component to edit its properties</p>
        </div>
      </aside>
    );
  }

  return (
    <aside className="scrollbar-hidden flex w-[280px] shrink-0 flex-col overflow-y-auto border-l border-white/10">
      <div className="border-b border-white/10 p-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-white/40">Properties</h2>
        <p className="mt-2 text-base font-medium capitalize text-white">{selectedNode.type}</p>
      </div>

      <div className="flex flex-col gap-4 p-4">
        {/* Position & Size */}
        <div className="flex flex-col gap-3">
          <span className="text-xs font-medium uppercase tracking-wider text-white/40">Position & Size</span>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-1">
              <Label className="text-xs text-white/50">X</Label>
              <Input
                type="number"
                value={Math.round(selectedNode.x)}
                onChange={(e) => updateNodePosition(selectedNode.id, Number(e.target.value), selectedNode.y)}
                className="text-sm"
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label className="text-xs text-white/50">Y</Label>
              <Input
                type="number"
                value={Math.round(selectedNode.y)}
                onChange={(e) => updateNodePosition(selectedNode.id, selectedNode.x, Number(e.target.value))}
                className="text-sm"
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label className="text-xs text-white/50">Width</Label>
              <Input
                type="number"
                value={selectedNode.width}
                onChange={(e) => updateNodeSize(selectedNode.id, Number(e.target.value), selectedNode.height)}
                className="text-sm"
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label className="text-xs text-white/50">Height</Label>
              <Input
                type="number"
                value={selectedNode.height}
                onChange={(e) => updateNodeSize(selectedNode.id, selectedNode.width, Number(e.target.value))}
                className="text-sm"
              />
            </div>
          </div>
        </div>

        <Separator />

        {/* Component-specific props */}
        <ComponentPropsEditor node={selectedNode} updateProps={updateNodeProps} />

        <Separator />

        {/* Delete button */}
        <Button
          variant="ghost"
          className="w-full justify-center text-red-400 hover:bg-red-500/20 hover:text-red-300"
          onClick={() => removeNode(selectedNode.id)}
        >
          <Trash2 size={16} className="mr-2" />
          Delete Component
        </Button>
      </div>
    </aside>
  );
}

function ComponentPropsEditor({
  node,
  updateProps,
}: {
  node: CanvasNode;
  updateProps: (id: string, props: Partial<ComponentProps[SandboxComponentType]>) => void;
}) {
  const props = node.props;

  switch (node.type) {
    case "button": {
      const p = props as ComponentProps["button"];
      return (
        <div className="flex flex-col gap-3">
          <span className="text-xs font-medium uppercase tracking-wider text-white/40">Button Props</span>
          <div className="flex flex-col gap-1">
            <Label className="text-xs text-white/50">Label</Label>
            <Input
              value={p.label}
              onChange={(e) => updateProps(node.id, { label: e.target.value })}
              className="text-sm"
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label className="text-xs text-white/50">Variant</Label>
            <Select
              value={p.variant}
              onValueChange={(v) => updateProps(node.id, { variant: v as "primary" | "secondary" | "ghost" })}
              options={[
                { label: "Primary", value: "primary" },
                { label: "Secondary", value: "secondary" },
                { label: "Ghost", value: "ghost" },
              ]}
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label className="text-xs text-white/50">Size</Label>
            <Select
              value={p.size}
              onValueChange={(v) => updateProps(node.id, { size: v as "sm" | "md" | "lg" })}
              options={[
                { label: "Small", value: "sm" },
                { label: "Medium", value: "md" },
                { label: "Large", value: "lg" },
              ]}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label className="text-xs text-white/50">Disabled</Label>
            <Switch checked={p.disabled} onCheckedChange={(checked) => updateProps(node.id, { disabled: checked })} />
          </div>
        </div>
      );
    }

    case "input": {
      const p = props as ComponentProps["input"];
      return (
        <div className="flex flex-col gap-3">
          <span className="text-xs font-medium uppercase tracking-wider text-white/40">Input Props</span>
          <div className="flex flex-col gap-1">
            <Label className="text-xs text-white/50">Placeholder</Label>
            <Input
              value={p.placeholder}
              onChange={(e) => updateProps(node.id, { placeholder: e.target.value })}
              className="text-sm"
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label className="text-xs text-white/50">Type</Label>
            <Select
              value={p.type}
              onValueChange={(v) => updateProps(node.id, { type: v as "text" | "email" | "password" })}
              options={[
                { label: "Text", value: "text" },
                { label: "Email", value: "email" },
                { label: "Password", value: "password" },
              ]}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label className="text-xs text-white/50">Disabled</Label>
            <Switch checked={p.disabled} onCheckedChange={(checked) => updateProps(node.id, { disabled: checked })} />
          </div>
        </div>
      );
    }

    case "badge": {
      const p = props as ComponentProps["badge"];
      return (
        <div className="flex flex-col gap-3">
          <span className="text-xs font-medium uppercase tracking-wider text-white/40">Badge Props</span>
          <div className="flex flex-col gap-1">
            <Label className="text-xs text-white/50">Label</Label>
            <Input
              value={p.label}
              onChange={(e) => updateProps(node.id, { label: e.target.value })}
              className="text-sm"
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label className="text-xs text-white/50">Variant</Label>
            <Select
              value={p.variant}
              onValueChange={(v) => updateProps(node.id, { variant: v as "solid" | "outline" | "muted" })}
              options={[
                { label: "Solid", value: "solid" },
                { label: "Outline", value: "outline" },
                { label: "Muted", value: "muted" },
              ]}
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label className="text-xs text-white/50">Size</Label>
            <Select
              value={p.size}
              onValueChange={(v) => updateProps(node.id, { size: v as "sm" | "md" })}
              options={[
                { label: "Small", value: "sm" },
                { label: "Medium", value: "md" },
              ]}
            />
          </div>
        </div>
      );
    }

    case "switch": {
      const p = props as ComponentProps["switch"];
      return (
        <div className="flex flex-col gap-3">
          <span className="text-xs font-medium uppercase tracking-wider text-white/40">Switch Props</span>
          <div className="flex flex-col gap-1">
            <Label className="text-xs text-white/50">Label</Label>
            <Input
              value={p.label}
              onChange={(e) => updateProps(node.id, { label: e.target.value })}
              className="text-sm"
            />
          </div>
          <div className="flex items-center justify-between">
            <Label className="text-xs text-white/50">Checked</Label>
            <Switch checked={p.checked} onCheckedChange={(checked) => updateProps(node.id, { checked })} />
          </div>
          <div className="flex items-center justify-between">
            <Label className="text-xs text-white/50">Disabled</Label>
            <Switch checked={p.disabled} onCheckedChange={(checked) => updateProps(node.id, { disabled: checked })} />
          </div>
        </div>
      );
    }

    case "checkbox": {
      const p = props as ComponentProps["checkbox"];
      return (
        <div className="flex flex-col gap-3">
          <span className="text-xs font-medium uppercase tracking-wider text-white/40">Checkbox Props</span>
          <div className="flex flex-col gap-1">
            <Label className="text-xs text-white/50">Label</Label>
            <Input
              value={p.label}
              onChange={(e) => updateProps(node.id, { label: e.target.value })}
              className="text-sm"
            />
          </div>
          <div className="flex items-center justify-between">
            <Label className="text-xs text-white/50">Checked</Label>
            <Switch checked={p.checked} onCheckedChange={(checked) => updateProps(node.id, { checked })} />
          </div>
          <div className="flex items-center justify-between">
            <Label className="text-xs text-white/50">Disabled</Label>
            <Switch checked={p.disabled} onCheckedChange={(checked) => updateProps(node.id, { disabled: checked })} />
          </div>
        </div>
      );
    }

    case "textarea": {
      const p = props as ComponentProps["textarea"];
      return (
        <div className="flex flex-col gap-3">
          <span className="text-xs font-medium uppercase tracking-wider text-white/40">Textarea Props</span>
          <div className="flex flex-col gap-1">
            <Label className="text-xs text-white/50">Placeholder</Label>
            <Input
              value={p.placeholder}
              onChange={(e) => updateProps(node.id, { placeholder: e.target.value })}
              className="text-sm"
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label className="text-xs text-white/50">Rows</Label>
            <Input
              type="number"
              value={p.rows}
              onChange={(e) => updateProps(node.id, { rows: Number(e.target.value) })}
              className="text-sm"
              min={1}
              max={10}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label className="text-xs text-white/50">Disabled</Label>
            <Switch checked={p.disabled} onCheckedChange={(checked) => updateProps(node.id, { disabled: checked })} />
          </div>
        </div>
      );
    }

    case "label": {
      const p = props as ComponentProps["label"];
      return (
        <div className="flex flex-col gap-3">
          <span className="text-xs font-medium uppercase tracking-wider text-white/40">Label Props</span>
          <div className="flex flex-col gap-1">
            <Label className="text-xs text-white/50">Text</Label>
            <Input
              value={p.text}
              onChange={(e) => updateProps(node.id, { text: e.target.value })}
              className="text-sm"
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label className="text-xs text-white/50">Optional Text</Label>
            <Input
              value={p.optional}
              onChange={(e) => updateProps(node.id, { optional: e.target.value })}
              className="text-sm"
              placeholder="(optional)"
            />
          </div>
        </div>
      );
    }

    case "card": {
      const p = props as ComponentProps["card"];
      return (
        <div className="flex flex-col gap-3">
          <span className="text-xs font-medium uppercase tracking-wider text-white/40">Card Props</span>
          <div className="flex flex-col gap-1">
            <Label className="text-xs text-white/50">Title</Label>
            <Input
              value={p.title}
              onChange={(e) => updateProps(node.id, { title: e.target.value })}
              className="text-sm"
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label className="text-xs text-white/50">Description</Label>
            <Input
              value={p.description}
              onChange={(e) => updateProps(node.id, { description: e.target.value })}
              className="text-sm"
            />
          </div>
          <div className="flex items-center justify-between">
            <Label className="text-xs text-white/50">Show Footer</Label>
            <Switch checked={p.showFooter} onCheckedChange={(checked) => updateProps(node.id, { showFooter: checked })} />
          </div>
          {p.showFooter && (
            <div className="flex flex-col gap-1">
              <Label className="text-xs text-white/50">Footer Button Text</Label>
              <Input
                value={p.footerText}
                onChange={(e) => updateProps(node.id, { footerText: e.target.value })}
                className="text-sm"
              />
            </div>
          )}
        </div>
      );
    }

    case "avatar": {
      const p = props as ComponentProps["avatar"];
      return (
        <div className="flex flex-col gap-3">
          <span className="text-xs font-medium uppercase tracking-wider text-white/40">Avatar Props</span>
          <div className="flex flex-col gap-1">
            <Label className="text-xs text-white/50">Fallback (Initials)</Label>
            <Input
              value={p.fallback}
              onChange={(e) => updateProps(node.id, { fallback: e.target.value })}
              className="text-sm"
              maxLength={2}
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label className="text-xs text-white/50">Image URL</Label>
            <Input
              value={p.src}
              onChange={(e) => updateProps(node.id, { src: e.target.value })}
              className="text-sm"
              placeholder="https://..."
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label className="text-xs text-white/50">Size</Label>
            <Select
              value={p.size}
              onValueChange={(v) => updateProps(node.id, { size: v as "sm" | "md" | "lg" | "xl" })}
              options={[
                { label: "Small", value: "sm" },
                { label: "Medium", value: "md" },
                { label: "Large", value: "lg" },
                { label: "Extra Large", value: "xl" },
              ]}
            />
          </div>
        </div>
      );
    }

    case "alert": {
      const p = props as ComponentProps["alert"];
      return (
        <div className="flex flex-col gap-3">
          <span className="text-xs font-medium uppercase tracking-wider text-white/40">Alert Props</span>
          <div className="flex flex-col gap-1">
            <Label className="text-xs text-white/50">Title</Label>
            <Input
              value={p.title}
              onChange={(e) => updateProps(node.id, { title: e.target.value })}
              className="text-sm"
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label className="text-xs text-white/50">Message</Label>
            <Textarea
              value={p.message}
              onChange={(e) => updateProps(node.id, { message: e.target.value })}
              className="text-sm"
              rows={2}
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label className="text-xs text-white/50">Variant</Label>
            <Select
              value={p.variant}
              onValueChange={(v) => updateProps(node.id, { variant: v as "info" | "success" | "warning" | "error" })}
              options={[
                { label: "Info", value: "info" },
                { label: "Success", value: "success" },
                { label: "Warning", value: "warning" },
                { label: "Error", value: "error" },
              ]}
            />
          </div>
        </div>
      );
    }

    case "progress": {
      const p = props as ComponentProps["progress"];
      return (
        <div className="flex flex-col gap-3">
          <span className="text-xs font-medium uppercase tracking-wider text-white/40">Progress Props</span>
          <div className="flex flex-col gap-1">
            <Label className="text-xs text-white/50">Value ({p.value}%)</Label>
            <input
              type="range"
              min={0}
              max={100}
              value={p.value}
              onChange={(e) => updateProps(node.id, { value: Number(e.target.value) })}
              className="w-full accent-blue-500"
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label className="text-xs text-white/50">Size</Label>
            <Select
              value={p.size}
              onValueChange={(v) => updateProps(node.id, { size: v as "sm" | "md" | "lg" })}
              options={[
                { label: "Small", value: "sm" },
                { label: "Medium", value: "md" },
                { label: "Large", value: "lg" },
              ]}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label className="text-xs text-white/50">Show Label</Label>
            <Switch checked={p.showLabel} onCheckedChange={(checked) => updateProps(node.id, { showLabel: checked })} />
          </div>
        </div>
      );
    }

    case "spinner": {
      const p = props as ComponentProps["spinner"];
      return (
        <div className="flex flex-col gap-3">
          <span className="text-xs font-medium uppercase tracking-wider text-white/40">Spinner Props</span>
          <div className="flex flex-col gap-1">
            <Label className="text-xs text-white/50">Size</Label>
            <Select
              value={p.size}
              onValueChange={(v) => updateProps(node.id, { size: v as "sm" | "md" | "lg" })}
              options={[
                { label: "Small", value: "sm" },
                { label: "Medium", value: "md" },
                { label: "Large", value: "lg" },
              ]}
            />
          </div>
        </div>
      );
    }

    case "separator": {
      const p = props as ComponentProps["separator"];
      return (
        <div className="flex flex-col gap-3">
          <span className="text-xs font-medium uppercase tracking-wider text-white/40">Separator Props</span>
          <div className="flex flex-col gap-1">
            <Label className="text-xs text-white/50">Orientation</Label>
            <Select
              value={p.orientation}
              onValueChange={(v) => updateProps(node.id, { orientation: v as "horizontal" | "vertical" })}
              options={[
                { label: "Horizontal", value: "horizontal" },
                { label: "Vertical", value: "vertical" },
              ]}
            />
          </div>
        </div>
      );
    }

    case "text": {
      const p = props as ComponentProps["text"];
      return (
        <div className="flex flex-col gap-3">
          <span className="text-xs font-medium uppercase tracking-wider text-white/40">Text Props</span>
          <div className="flex flex-col gap-1">
            <Label className="text-xs text-white/50">Content</Label>
            <Textarea
              value={p.content}
              onChange={(e) => updateProps(node.id, { content: e.target.value })}
              className="text-sm"
              rows={3}
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label className="text-xs text-white/50">Font Size</Label>
            <Select
              value={p.fontSize}
              onValueChange={(v) => updateProps(node.id, { fontSize: v as "sm" | "md" | "lg" | "xl" })}
              options={[
                { label: "Small", value: "sm" },
                { label: "Medium", value: "md" },
                { label: "Large", value: "lg" },
                { label: "Extra Large", value: "xl" },
              ]}
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label className="text-xs text-white/50">Font Weight</Label>
            <Select
              value={p.fontWeight}
              onValueChange={(v) => updateProps(node.id, { fontWeight: v as "normal" | "medium" | "semibold" | "bold" })}
              options={[
                { label: "Normal", value: "normal" },
                { label: "Medium", value: "medium" },
                { label: "Semibold", value: "semibold" },
                { label: "Bold", value: "bold" },
              ]}
            />
          </div>
        </div>
      );
    }

    default:
      return null;
  }
}
