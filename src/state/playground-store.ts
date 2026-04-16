import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { ThemeMode } from "@/tokens/theme";

export type FontFamily = "satoshi" | "manrope" | "dm-sans" | "poppins" | "open-sans";

export const fontFamilyLabels: Record<FontFamily, string> = {
  satoshi: "Satoshi",
  manrope: "Manrope",
  "dm-sans": "DM Sans",
  poppins: "Poppins",
  "open-sans": "Open Sans",
};

export const fontFamilyValues: Record<FontFamily, string> = {
  satoshi: '"Satoshi", system-ui, sans-serif',
  manrope: '"Manrope", system-ui, sans-serif',
  "dm-sans": '"DM Sans", system-ui, sans-serif',
  poppins: '"Poppins", system-ui, sans-serif',
  "open-sans": '"Open Sans", system-ui, sans-serif',
};

export type PlaygroundComponent =
  | "button"
  | "input"
  | "badge"
  | "switch"
  | "checkbox"
  | "textarea"
  | "label"
  | "separator"
  | "link"
  | "card";

type ButtonPlaygroundProps = {
  label: string;
  variant: "primary" | "secondary" | "ghost";
  size: "sm" | "md" | "lg";
  disabled: boolean;
};

type InputPlaygroundProps = {
  placeholder: string;
  type: "text" | "email" | "password";
  disabled: boolean;
};

type BadgePlaygroundProps = {
  label: string;
  variant: "solid" | "outline" | "muted";
  size: "sm" | "md";
};

type SwitchPlaygroundProps = {
  label: string;
  checked: boolean;
  disabled: boolean;
};

type CheckboxPlaygroundProps = {
  label: string;
  checked: boolean;
  disabled: boolean;
};

type TextareaPlaygroundProps = {
  placeholder: string;
  value: string;
  disabled: boolean;
};

type LabelPlaygroundProps = {
  text: string;
  optional: string;
};

type SeparatorPlaygroundProps = {
  orientation: "horizontal" | "vertical";
};

type LinkPlaygroundProps = {
  text: string;
  href: string;
};

type CardPlaygroundProps = {
  title: string;
  description: string;
  body: string;
  actionText: string;
};

type PlaygroundSnapshot = {
  selectedComponent: PlaygroundComponent;
  button: ButtonPlaygroundProps;
  input: InputPlaygroundProps;
  badge: BadgePlaygroundProps;
  switchControl: SwitchPlaygroundProps;
  checkbox: CheckboxPlaygroundProps;
  textarea: TextareaPlaygroundProps;
  label: LabelPlaygroundProps;
  separator: SeparatorPlaygroundProps;
  link: LinkPlaygroundProps;
  card: CardPlaygroundProps;
};

export type PlaygroundPreset = {
  id: string;
  name: string;
  snapshot: PlaygroundSnapshot;
};

const defaultButtonProps: ButtonPlaygroundProps = {
  label: "Primary action",
  variant: "primary",
  size: "md",
  disabled: false,
};

const defaultInputProps: InputPlaygroundProps = {
  placeholder: "Type something...",
  type: "text",
  disabled: false,
};

const defaultBadgeProps: BadgePlaygroundProps = {
  label: "New",
  variant: "solid",
  size: "md",
};

const defaultSwitchProps: SwitchPlaygroundProps = {
  label: "Enable updates",
  checked: true,
  disabled: false,
};

const defaultCheckboxProps: CheckboxPlaygroundProps = {
  label: "Accept terms",
  checked: true,
  disabled: false,
};

const defaultTextareaProps: TextareaPlaygroundProps = {
  placeholder: "Write your message...",
  value: "",
  disabled: false,
};

const defaultLabelProps: LabelPlaygroundProps = {
  text: "Email address",
  optional: "(optional)",
};

const defaultSeparatorProps: SeparatorPlaygroundProps = {
  orientation: "horizontal",
};

const defaultLinkProps: LinkPlaygroundProps = {
  text: "Open Storybook",
  href: "https://storybook.js.org",
};

const defaultCardProps: CardPlaygroundProps = {
  title: "Project update",
  description: "A concise summary of the latest changes.",
  body: "You can compose primitive components to build larger patterns.",
  actionText: "Review",
};

const createSnapshot = (): PlaygroundSnapshot => ({
  selectedComponent: "button",
  button: defaultButtonProps,
  input: defaultInputProps,
  badge: defaultBadgeProps,
  switchControl: defaultSwitchProps,
  checkbox: defaultCheckboxProps,
  textarea: defaultTextareaProps,
  label: defaultLabelProps,
  separator: defaultSeparatorProps,
  link: defaultLinkProps,
  card: defaultCardProps,
});

const initialPresets: PlaygroundPreset[] = [
  {
    id: "preset-form-kit",
    name: "Form Kit",
    snapshot: {
      ...createSnapshot(),
      selectedComponent: "input",
      input: { placeholder: "name@company.com", type: "email", disabled: false },
      label: { text: "Work email", optional: "(required)" },
      textarea: { placeholder: "Tell us what you are building...", value: "", disabled: false },
    },
  },
  {
    id: "preset-release-badge",
    name: "Release Badge",
    snapshot: {
      ...createSnapshot(),
      selectedComponent: "badge",
      badge: { label: "v1.1.0", variant: "outline", size: "md" },
      link: { text: "Release notes", href: "https://storybook.js.org" },
    },
  },
];

type PlaygroundState = {
  themeMode: ThemeMode;
  fontFamily: FontFamily;
  selectedComponent: PlaygroundComponent;
  button: ButtonPlaygroundProps;
  input: InputPlaygroundProps;
  badge: BadgePlaygroundProps;
  switchControl: SwitchPlaygroundProps;
  checkbox: CheckboxPlaygroundProps;
  textarea: TextareaPlaygroundProps;
  label: LabelPlaygroundProps;
  separator: SeparatorPlaygroundProps;
  link: LinkPlaygroundProps;
  card: CardPlaygroundProps;
  presets: PlaygroundPreset[];
  setThemeMode: (mode: ThemeMode) => void;
  setFontFamily: (font: FontFamily) => void;
  setSelectedComponent: (component: PlaygroundComponent) => void;
  updateButton: (patch: Partial<ButtonPlaygroundProps>) => void;
  updateInput: (patch: Partial<InputPlaygroundProps>) => void;
  updateBadge: (patch: Partial<BadgePlaygroundProps>) => void;
  updateSwitchControl: (patch: Partial<SwitchPlaygroundProps>) => void;
  updateCheckbox: (patch: Partial<CheckboxPlaygroundProps>) => void;
  updateTextarea: (patch: Partial<TextareaPlaygroundProps>) => void;
  updateLabel: (patch: Partial<LabelPlaygroundProps>) => void;
  updateSeparator: (patch: Partial<SeparatorPlaygroundProps>) => void;
  updateLink: (patch: Partial<LinkPlaygroundProps>) => void;
  updateCard: (patch: Partial<CardPlaygroundProps>) => void;
  savePreset: (name: string) => void;
  loadPreset: (id: string) => void;
  deletePreset: (id: string) => void;
  resetPlayground: () => void;
};

export const usePlaygroundStore = create<PlaygroundState>()(
  persist(
    (set) => ({
      themeMode: "dark",
      fontFamily: "satoshi",
      selectedComponent: "button",
      button: defaultButtonProps,
      input: defaultInputProps,
      badge: defaultBadgeProps,
      switchControl: defaultSwitchProps,
      checkbox: defaultCheckboxProps,
      textarea: defaultTextareaProps,
      label: defaultLabelProps,
      separator: defaultSeparatorProps,
      link: defaultLinkProps,
      card: defaultCardProps,
      presets: initialPresets,
      setThemeMode: (mode) => set({ themeMode: mode === "soft" ? "soft" : "dark" }),
      setFontFamily: (font) => set({ fontFamily: font }),
      setSelectedComponent: (component) => set({ selectedComponent: component }),
      updateButton: (patch) => set((state) => ({ button: { ...state.button, ...patch } })),
      updateInput: (patch) => set((state) => ({ input: { ...state.input, ...patch } })),
      updateBadge: (patch) => set((state) => ({ badge: { ...state.badge, ...patch } })),
      updateSwitchControl: (patch) =>
        set((state) => ({ switchControl: { ...state.switchControl, ...patch } })),
      updateCheckbox: (patch) =>
        set((state) => ({ checkbox: { ...state.checkbox, ...patch } })),
      updateTextarea: (patch) =>
        set((state) => ({ textarea: { ...state.textarea, ...patch } })),
      updateLabel: (patch) => set((state) => ({ label: { ...state.label, ...patch } })),
      updateSeparator: (patch) =>
        set((state) => ({ separator: { ...state.separator, ...patch } })),
      updateLink: (patch) => set((state) => ({ link: { ...state.link, ...patch } })),
      updateCard: (patch) => set((state) => ({ card: { ...state.card, ...patch } })),
      savePreset: (name) =>
        set((state) => {
          const nextName = name.trim();
          if (!nextName) return state;
          const id = `preset-${Date.now()}`;
          const snapshot: PlaygroundSnapshot = {
            selectedComponent: state.selectedComponent,
            button: state.button,
            input: state.input,
            badge: state.badge,
            switchControl: state.switchControl,
            checkbox: state.checkbox,
            textarea: state.textarea,
            label: state.label,
            separator: state.separator,
            link: state.link,
            card: state.card,
          };
          return {
            presets: [{ id, name: nextName, snapshot }, ...state.presets],
          };
        }),
      loadPreset: (id) =>
        set((state) => {
          const preset = state.presets.find((item) => item.id === id);
          if (!preset) return state;
          return {
            selectedComponent: preset.snapshot.selectedComponent,
            button: preset.snapshot.button,
            input: preset.snapshot.input,
            badge: preset.snapshot.badge,
            switchControl: preset.snapshot.switchControl,
            checkbox: preset.snapshot.checkbox,
            textarea: preset.snapshot.textarea,
            label: preset.snapshot.label,
            separator: preset.snapshot.separator,
            link: preset.snapshot.link,
            card: preset.snapshot.card,
          };
        }),
      deletePreset: (id) =>
        set((state) => ({
          presets: state.presets.filter((item) => item.id !== id),
        })),
      resetPlayground: () =>
        set({
          ...createSnapshot(),
        }),
    }),
    {
      name: "design-system-playground-store",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state && state.themeMode !== "dark" && state.themeMode !== "soft") {
          state.setThemeMode("dark");
        }
      },
    },
  ),
);
