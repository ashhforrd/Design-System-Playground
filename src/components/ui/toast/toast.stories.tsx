import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Button } from "../button/button";
import { Toast, ToastContainer } from "./toast";

const meta = {
  title: "Components/Toast",
  component: Toast,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "success", "error"],
    },
  },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof Toast>;

export const Default: Story = {
  args: {
    title: "Notification",
    description: "This is a toast notification message.",
    variant: "default",
    duration: 0,
  },
};

export const Success: Story = {
  args: {
    title: "Success!",
    description: "Your changes have been saved.",
    variant: "success",
    duration: 0,
  },
};

export const Error: Story = {
  args: {
    title: "Error",
    description: "Something went wrong. Please try again.",
    variant: "error",
    duration: 0,
  },
};

export const Interactive: Story = {
  render: () => {
    const [toasts, setToasts] = useState<Array<{ id: number; variant: "default" | "success" | "error" }>>([]);

    const addToast = (variant: "default" | "success" | "error") => {
      setToasts((prev) => [...prev, { id: Date.now(), variant }]);
    };

    const removeToast = (id: number) => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    return (
      <>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <Button onClick={() => addToast("default")}>Default</Button>
          <Button onClick={() => addToast("success")}>Success</Button>
          <Button onClick={() => addToast("error")}>Error</Button>
        </div>
        <ToastContainer>
          {toasts.map((toast) => (
            <Toast
              key={toast.id}
              variant={toast.variant}
              title={toast.variant === "success" ? "Success!" : toast.variant === "error" ? "Error" : "Info"}
              description="This is a toast message."
              onClose={() => removeToast(toast.id)}
            />
          ))}
        </ToastContainer>
      </>
    );
  },
};
