import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Avatar } from "./avatar";

const meta = {
  title: "Components/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl"],
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    fallback: "John Doe",
    size: "md",
  },
};

export const WithImage: Story = {
  args: {
    src: "https://i.pravatar.cc/150?img=3",
    alt: "User avatar",
    size: "md",
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      <Avatar fallback="JD" size="sm" />
      <Avatar fallback="JD" size="md" />
      <Avatar fallback="JD" size="lg" />
      <Avatar fallback="JD" size="xl" />
    </div>
  ),
};
