import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Link } from "./link";

const meta = {
  title: "Design System/Link",
  component: Link,
  tags: ["autodocs"],
  args: {
    href: "https://nextjs.org",
    children: "Next.js documentation",
  },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const External: Story = {};

export const Internal: Story = {
  args: {
    href: "/",
    children: "Home route",
  },
};
