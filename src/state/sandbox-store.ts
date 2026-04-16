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
      nodes: [],
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
              ? { ...node, props: { ...node.props, ...props } }
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
    }
  )
);
