import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Separator } from "./separator";

const meta = {
  title: "Design System/Separator",
  component: Separator,
  tags: ["autodocs"],
  args: {
    orientation: "horizontal",
  },
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {};

export const Vertical: Story = {
  args: { orientation: "vertical" },
  render: (args) => (
    <div style={{ display: "flex", alignItems: "stretch", gap: "1rem", minHeight: 48 }}>
      <span style={{ fontSize: 14 }}>Left</span>
      <Separator {...args} />
      <span style={{ fontSize: 14 }}>Right</span>
    </div>
  ),
};
