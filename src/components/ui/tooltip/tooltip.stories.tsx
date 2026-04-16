import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Button } from "../button/button";
import { Tooltip } from "./tooltip";

const meta = {
  title: "Components/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    position: {
      control: "select",
      options: ["top", "bottom", "left", "right"],
    },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {
    content: "This is a tooltip",
    position: "top",
    children: <Button>Hover me</Button>,
  },
};

export const Positions: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "2rem", padding: "4rem" }}>
      <Tooltip content="Top tooltip" position="top">
        <Button variant="secondary">Top</Button>
      </Tooltip>
      <Tooltip content="Bottom tooltip" position="bottom">
        <Button variant="secondary">Bottom</Button>
      </Tooltip>
      <Tooltip content="Left tooltip" position="left">
        <Button variant="secondary">Left</Button>
      </Tooltip>
      <Tooltip content="Right tooltip" position="right">
        <Button variant="secondary">Right</Button>
      </Tooltip>
    </div>
  ),
};
