import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";

import { Select } from "./select";

const meta = {
  title: "Design System/Select",
  component: Select,
  tags: ["autodocs"],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    value: "button",
    options: [
      { label: "Button", value: "button" },
      { label: "Input", value: "input" },
      { label: "Card", value: "card" },
    ],
    onValueChange: () => {},
  },
  render: (args) => {
    const [value, setValue] = useState("button");
    return (
      <div style={{ width: 280 }}>
        <Select
          {...args}
          value={value}
          onValueChange={setValue}
        />
      </div>
    );
  },
};
