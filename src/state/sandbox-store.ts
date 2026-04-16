import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type SandboxComponentType =
  | "button"
  | "input"
  | "badge"
  | "switch"
  | "checkbox"
  | "textarea"
  | "label"
  | "card"
  | "avatar"
  | "alert"
  | "progress"
  | "spinner"
  | "separator"
  | "text";

export type ComponentProps = {
  button: {
    label: string;
    variant: "primary" | "secondary" | "ghost";
    size: "sm" | "md" | "lg";
    disabled: boolean;
  };
  input: {
    placeholder: string;
    type: "text" | "email" | "password";
    disabled: boolean;
  };
  badge: {
    label: string;
    variant: "solid" | "outline" | "muted";
    size: "sm" | "md";
  };
  switch: {
    label: string;
    checked: boolean;
    disabled: boolean;
  };
  checkbox: {
    label: string;
    checked: boolean;
    disabled: boolean;
  };
  textarea: {
    placeholder: string;
    disabled: boolean;
    rows: number;
  };
  label: {
    text: string;
    optional: string;
  };
  card: {
    title: string;
    description: string;
    showFooter: boolean;
    footerText: string;
  };
  avatar: {
    fallback: string;
    size: "sm" | "md" | "lg" | "xl";
    src: string;
  };
  alert: {
    title: string;
    message: string;
    variant: "info" | "success" | "warning" | "error";
  };
  progress: {
    value: number;
    size: "sm" | "md" | "lg";
    showLabel: boolean;
  };
  spinner: {
    size: "sm" | "md" | "lg";
  };
  separator: {
    orientation: "horizontal" | "vertical";
  };
  text: {
    content: string;
    fontSize: "sm" | "md" | "lg" | "xl";
    fontWeight: "normal" | "medium" | "semibold" | "bold";
  };
};

export type CanvasNode = {
  id: string;
  type: SandboxComponentType;
  x: number;
  y: number;
  width: number;
  height: number;
  props: ComponentProps[SandboxComponentType];
};

const defaultProps: ComponentProps = {
  button: {
    label: "Button",
    variant: "primary",
    size: "md",
    disabled: false,
  },
  input: {
    placeholder: "Enter text...",
    type: "text",
    disabled: false,
  },
  badge: {
    label: "Badge",
    variant: "solid",
    size: "md",
  },
  switch: {
    label: "Toggle",
    checked: false,
    disabled: false,
  },
  checkbox: {
    label: "Checkbox",
    checked: false,
    disabled: false,
  },
  textarea: {
    placeholder: "Enter message...",
    disabled: false,
    rows: 3,
  },
  label: {
    text: "Label",
    optional: "",
  },
  card: {
    title: "Card Title",
    description: "Card description",
    showFooter: true,
    footerText: "Action",
  },
  avatar: {
    fallback: "JD",
    size: "md",
    src: "",
  },
  alert: {
    title: "Alert",
    message: "This is an alert message.",
    variant: "info",
  },
  progress: {
    value: 50,
    size: "md",
    showLabel: true,
  },
  spinner: {
    size: "md",
  },
  separator: {
    orientation: "horizontal",
  },
  text: {
    content: "Text block",
    fontSize: "md",
    fontWeight: "normal",
  },
};

export const getDefaultProps = <T extends SandboxComponentType>(
  type: T
): ComponentProps[T] => {
  return { ...defaultProps[type] } as ComponentProps[T];
};

const defaultComponentSizes: Record<SandboxComponentType, { width: number; height: number }> = {
  button: { width: 120, height: 40 },
  input: { width: 240, height: 40 },
  badge: { width: 80, height: 28 },
  switch: { width: 160, height: 32 },
  checkbox: { width: 160, height: 32 },
  textarea: { width: 280, height: 100 },
  label: { width: 120, height: 24 },
  card: { width: 320, height: 180 },
  avatar: { width: 48, height: 48 },
  alert: { width: 320, height: 80 },
  progress: { width: 240, height: 24 },
  spinner: { width: 32, height: 32 },
  separator: { width: 200, height: 2 },
  text: { width: 200, height: 32 },
};

export const getDefaultSize = (type: SandboxComponentType) => {
  return { ...defaultComponentSizes[type] };
};

/** Starter layout so new users see what the sandbox can build (also used by “Load sample”). */
export function createDemoCanvasNodes(): CanvasNode[] {
  return [
    {
      id: "demo-heading",
      type: "text",
      x: 48,
      y: 32,
      width: 560,
      height: 44,
      props: {
        content: "Sample page",
        fontSize: "xl",
        fontWeight: "bold",
      },
    },
    {
      id: "demo-subtitle",
      type: "text",
      x: 48,
      y: 88,
      width: 640,
      height: 52,
      props: {
        content:
          "Drag components from the left palette, arrange them on the canvas, and edit properties in the right panel—like the layout below.",
        fontSize: "sm",
        fontWeight: "normal",
      },
    },
    {
      id: "demo-badge",
      type: "badge",
      x: 48,
      y: 160,
      width: 80,
      height: 28,
      props: { label: "v2", variant: "outline", size: "sm" },
    },
    {
      id: "demo-avatar",
      type: "avatar",
      x: 144,
      y: 152,
      width: 48,
      height: 48,
      props: { fallback: "DS", size: "md", src: "" },
    },
    {
      id: "demo-spinner",
      type: "spinner",
      x: 208,
      y: 160,
      width: 32,
      height: 32,
      props: { size: "md" },
    },
    {
      id: "demo-alert",
      type: "alert",
      x: 48,
      y: 224,
      width: 400,
      height: 96,
      props: {
        title: "Tip",
        message:
          "Click a component to select it. Use the floating actions for layer order, duplicate, or delete.",
        variant: "info",
      },
    },
    {
      id: "demo-separator",
      type: "separator",
      x: 48,
      y: 336,
      width: 656,
      height: 2,
      props: { orientation: "horizontal" },
    },
    {
      id: "demo-card",
      type: "card",
      x: 48,
      y: 368,
      width: 336,
      height: 200,
      props: {
        title: "Sandbox starter",
        description: "Cards, forms, and status blocks can be arranged freely on the canvas.",
        showFooter: true,
        footerText: "Details",
      },
    },
    {
      id: "demo-label",
      type: "label",
      x: 416,
      y: 368,
      width: 240,
      height: 28,
      props: { text: "Work email", optional: "(required)" },
    },
    {
      id: "demo-input",
      type: "input",
      x: 416,
      y: 400,
      width: 288,
      height: 40,
      props: { placeholder: "you@company.com", type: "email", disabled: false },
    },
    {
      id: "demo-button",
      type: "button",
      x: 416,
      y: 464,
      width: 128,
      height: 40,
      props: { label: "Apply", variant: "primary", size: "md", disabled: false },
    },
    {
      id: "demo-button-secondary",
      type: "button",
      x: 560,
      y: 464,
      width: 128,
      height: 40,
      props: { label: "Cancel", variant: "secondary", size: "md", disabled: false },
    },
    {
      id: "demo-checkbox",
      type: "checkbox",
      x: 416,
      y: 528,
      width: 200,
      height: 32,
      props: { label: "Remember this device", checked: true, disabled: false },
    },
    {
      id: "demo-switch",
      type: "switch",
      x: 416,
      y: 576,
      width: 240,
      height: 36,
      props: { label: "Email notifications", checked: false, disabled: false },
    },
    {
      id: "demo-textarea",
      type: "textarea",
      x: 416,
      y: 624,
      width: 288,
      height: 112,
      props: { placeholder: "Optional notes…", disabled: false, rows: 4 },
    },
    {
      id: "demo-progress",
      type: "progress",
      x: 48,
      y: 592,
      width: 320,
      height: 28,
      props: { value: 72, size: "md", showLabel: true },
    },
  ];
}

type SandboxState = {
  nodes: CanvasNode[];
  selectedNodeId: string | null;
  canvasZoom: number;
  canvasOffset: { x: number; y: number };
  gridSnap: boolean;
  gridSize: number;
  
  addNode: (type: SandboxComponentType, x: number, y: number) => string;
  removeNode: (id: string) => void;
  updateNodePosition: (id: string, x: number, y: number) => void;
  updateNodeSize: (id: string, width: number, height: number) => void;
  updateNodeProps: (id: string, props: Partial<ComponentProps[SandboxComponentType]>) => void;
  selectNode: (id: string | null) => void;
  duplicateNode: (id: string) => void;
  clearCanvas: () => void;
  loadDemoLayout: () => void;
  setCanvasZoom: (zoom: number) => void;
  setCanvasOffset: (offset: { x: number; y: number }) => void;
  setGridSnap: (snap: boolean) => void;
  setGridSize: (size: number) => void;
  bringToFront: (id: string) => void;
  sendToBack: (id: string) => void;
};

const generateId = () => `node-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

export const useSandboxStore = create<SandboxState>()(
  persist(
    (set, get) => ({
      nodes: createDemoCanvasNodes(),
      selectedNodeId: null,
      canvasZoom: 1,
      canvasOffset: { x: 0, y: 0 },
      gridSnap: true,
      gridSize: 16,

      addNode: (type, x, y) => {
        const id = generateId();
        const size = getDefaultSize(type);
        const props = getDefaultProps(type);
        const { gridSnap, gridSize } = get();
        
        const snappedX = gridSnap ? Math.round(x / gridSize) * gridSize : x;
        const snappedY = gridSnap ? Math.round(y / gridSize) * gridSize : y;

        const newNode: CanvasNode = {
          id,
          type,
          x: snappedX,
          y: snappedY,
          width: size.width,
          height: size.height,
          props,
        };

        set((state) => ({
          nodes: [...state.nodes, newNode],
          selectedNodeId: id,
        }));

        return id;
      },

      removeNode: (id) => {
        set((state) => ({
          nodes: state.nodes.filter((node) => node.id !== id),
          selectedNodeId: state.selectedNodeId === id ? null : state.selectedNodeId,
        }));
      },

      updateNodePosition: (id, x, y) => {
        const { gridSnap, gridSize } = get();
        const snappedX = gridSnap ? Math.round(x / gridSize) * gridSize : x;
        const snappedY = gridSnap ? Math.round(y / gridSize) * gridSize : y;

        set((state) => ({
          nodes: state.nodes.map((node) =>
            node.id === id ? { ...node, x: snappedX, y: snappedY } : node
          ),
        }));
      },

      updateNodeSize: (id, width, height) => {
        set((state) => ({
          nodes: state.nodes.map((node) =>
            node.id === id ? { ...node, width, height } : node
          ),
        }));
      },

      updateNodeProps: (id, props) => {
        set((state) => ({
          nodes: state.nodes.map((node) =>
            node.id === id
              ? {
                  ...node,
                  // Runtime: patch always matches `node.type`; TS cannot prove spread preserves the discriminant.
                  props: { ...node.props, ...props } as ComponentProps[SandboxComponentType],
                }
              : node
          ),
        }));
      },

      selectNode: (id) => {
        set({ selectedNodeId: id });
      },

      duplicateNode: (id) => {
        const { nodes, addNode } = get();
        const node = nodes.find((n) => n.id === id);
        if (!node) return;

        const newId = addNode(node.type, node.x + 20, node.y + 20);
        set((state) => ({
          nodes: state.nodes.map((n) =>
            n.id === newId ? { ...n, width: node.width, height: node.height, props: { ...node.props } } : n
          ),
        }));
      },

      clearCanvas: () => {
        set({ nodes: [], selectedNodeId: null });
      },

      loadDemoLayout: () => {
        set({ nodes: createDemoCanvasNodes(), selectedNodeId: null });
      },

      setCanvasZoom: (zoom) => {
        set({ canvasZoom: Math.max(0.25, Math.min(2, zoom)) });
      },

      setCanvasOffset: (offset) => {
        set({ canvasOffset: offset });
      },

      setGridSnap: (snap) => {
        set({ gridSnap: snap });
      },

      setGridSize: (size) => {
        set({ gridSize: size });
      },

      bringToFront: (id) => {
        set((state) => {
          const node = state.nodes.find((n) => n.id === id);
          if (!node) return state;
          return {
            nodes: [...state.nodes.filter((n) => n.id !== id), node],
          };
        });
      },

      sendToBack: (id) => {
        set((state) => {
          const node = state.nodes.find((n) => n.id === id);
          if (!node) return state;
          return {
            nodes: [node, ...state.nodes.filter((n) => n.id !== id)],
          };
        });
      },
    }),
    {
      name: "design-system-sandbox-store",
      storage: createJSONStorage(() => localStorage),
      /**
       * Default `nodes` is a demo layout. Rehydration used to replace it with `[]` from a prior
       * “clear canvas”, making the canvas look full then empty after hydration—avoid that.
       */
      merge: (persistedState, currentState) => {
        if (!persistedState || typeof persistedState !== "object") {
          return currentState;
        }
        const p = persistedState as Partial<SandboxState>;
        const hasPersistedNodes = Array.isArray(p.nodes) && p.nodes.length > 0;
        const nodes = hasPersistedNodes ? p.nodes! : currentState.nodes;
        return {
          ...currentState,
          ...p,
          nodes,
        };
      },
    }
  )
);
