import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Skeleton } from "./skeleton";

const meta = {
  title: "Components/Skeleton",
  component: Skeleton,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["text", "circular", "rectangular"],
    },
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Text: Story = {
  args: {
    variant: "text",
    width: "200px",
  },
};

export const Circular: Story = {
  args: {
    variant: "circular",
    width: 48,
    height: 48,
  },
};

export const Rectangular: Story = {
  args: {
    variant: "rectangular",
    width: 200,
    height: 120,
  },
};

export const CardExample: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", padding: "1rem", width: "20rem" }}>
      <Skeleton variant="circular" width={48} height={48} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <Skeleton variant="text" width="60%" />
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="80%" />
      </div>
    </div>
  ),
};
