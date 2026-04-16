import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Eye, Lock, Mail, Search } from "lucide-react";

import { Input } from "./input";

const meta = {
  title: "Design System/Input",
  component: Input,
  tags: ["autodocs"],
  args: {
    placeholder: "Type something...",
    disabled: false,
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Email: Story = {
  args: {
    type: "email",
    placeholder: "name@company.com",
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "Disabled input",
    disabled: true,
  },
};

export const WithStartIcon: Story = {
  args: {
    placeholder: "Search…",
    startIcon: <Search size={18} strokeWidth={2} />,
  },
};

export const WithEndIcon: Story = {
  args: {
    type: "email",
    placeholder: "you@company.com",
    endIcon: <Mail size={18} strokeWidth={2} />,
  },
};

export const WithStartAndEndIcon: Story = {
  args: {
    type: "password",
    placeholder: "Password",
    startIcon: <Lock size={18} strokeWidth={2} />,
    endIcon: <Eye size={18} strokeWidth={2} />,
  },
};
