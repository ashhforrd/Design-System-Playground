import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Alert } from "./alert";

const meta = {
  title: "Components/Alert",
  component: Alert,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["info", "success", "warning", "error"],
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof Alert>;

export const Info: Story = {
  args: {
    variant: "info",
    title: "Information",
    children: "This is an informational message.",
  },
};

export const Success: Story = {
  args: {
    variant: "success",
    title: "Success",
    children: "Your changes have been saved successfully.",
  },
};

export const Warning: Story = {
  args: {
    variant: "warning",
    title: "Warning",
    children: "Please review your input before proceeding.",
  },
};

export const Error: Story = {
  args: {
    variant: "error",
    title: "Error",
    children: "Something went wrong. Please try again.",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", width: "20rem" }}>
      <Alert variant="info" title="Info">This is an info alert.</Alert>
      <Alert variant="success" title="Success">This is a success alert.</Alert>
      <Alert variant="warning" title="Warning">This is a warning alert.</Alert>
      <Alert variant="error" title="Error">This is an error alert.</Alert>
    </div>
  ),
};
