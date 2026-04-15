import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Input } from "../input/input";
import { Label } from "./label";

const meta = {
  title: "Design System/Label",
  component: Label,
  tags: ["autodocs"],
  args: {
    children: "Email",
    htmlFor: "story-email",
    optional: "(optional)",
  },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 280 }}>
      <Label {...args} />
      <Input id="story-email" type="email" placeholder="you@example.com" />
    </div>
  ),
};

export const Required: Story = {
  args: { children: "Password", optional: undefined, htmlFor: "story-pw" },
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 280 }}>
      <Label {...args} />
      <Input id="story-pw" type="password" placeholder="••••••••" />
    </div>
  ),
};
