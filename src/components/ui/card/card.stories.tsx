import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Button } from "../button/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";

const meta = {
  title: "Design System/Card",
  tags: ["autodocs"],
  component: Card,
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card style={{ maxWidth: 360 }}>
      <CardHeader>
        <CardTitle>Card title</CardTitle>
        <CardDescription>
          Supporting copy for the card. Keep it concise.
        </CardDescription>
      </CardHeader>
      <CardContent>
        Main content goes here. Use tokens so the card works across themes.
      </CardContent>
      <CardFooter>
        <Button size="sm">Action</Button>
        <Button variant="secondary" size="sm">
          Cancel
        </Button>
      </CardFooter>
    </Card>
  ),
};
