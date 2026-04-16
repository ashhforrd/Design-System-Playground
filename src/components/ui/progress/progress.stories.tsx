import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Progress } from "./progress";

const meta = {
  title: "Components/Progress",
  component: Progress,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    value: {
      control: { type: "range", min: 0, max: 100, step: 1 },
    },
  },
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof Progress>;

export const Default: Story = {
  args: {
    value: 60,
    max: 100,
    size: "md",
  },
  decorators: [
    (Story) => (
      <div style={{ width: "20rem" }}>
        <Story />
      </div>
    ),
  ],
};

export const WithLabel: Story = {
  args: {
    value: 75,
    max: 100,
    size: "md",
    showLabel: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: "20rem" }}>
        <Story />
      </div>
    ),
  ],
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", width: "20rem" }}>
      <Progress value={30} size="sm" />
      <Progress value={50} size="md" />
      <Progress value={70} size="lg" />
    </div>
  ),
};
