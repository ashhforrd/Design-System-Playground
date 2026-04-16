import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Button } from "../button/button";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogContent,
  DialogFooter,
} from "./dialog";

const meta = {
  title: "Components/Dialog",
  component: Dialog,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Dialog</Button>
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogHeader>
            <DialogTitle>Confirm Action</DialogTitle>
            <DialogDescription>
              Are you sure you want to proceed with this action?
            </DialogDescription>
          </DialogHeader>
          <DialogContent>
            <p style={{ fontSize: "0.875rem", color: "var(--ds-muted-fg)" }}>
              This action cannot be undone. Please make sure you have reviewed all the details.
            </p>
          </DialogContent>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setOpen(false)}>Confirm</Button>
          </DialogFooter>
        </Dialog>
      </>
    );
  },
};
