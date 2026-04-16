import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./accordion";

const meta = {
  title: "Components/Accordion",
  component: Accordion,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  render: () => (
    <Accordion type="single" style={{ width: "24rem" }}>
      <AccordionItem value="item-1">
        <AccordionTrigger value="item-1">What is a design system?</AccordionTrigger>
        <AccordionContent value="item-1">
          A design system is a collection of reusable components and guidelines that help teams build consistent user interfaces.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger value="item-2">Why use design tokens?</AccordionTrigger>
        <AccordionContent value="item-2">
          Design tokens store visual decisions like colors, spacing, and typography in a platform-agnostic format.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger value="item-3">How to contribute?</AccordionTrigger>
        <AccordionContent value="item-3">
          Check out our contribution guidelines in the repository to learn how you can help improve the design system.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const Multiple: Story = {
  render: () => (
    <Accordion type="multiple" defaultValue={["item-1"]} style={{ width: "24rem" }}>
      <AccordionItem value="item-1">
        <AccordionTrigger value="item-1">First Section</AccordionTrigger>
        <AccordionContent value="item-1">
          This section is expanded by default. You can expand multiple sections at once.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger value="item-2">Second Section</AccordionTrigger>
        <AccordionContent value="item-2">
          Click to expand this section while keeping others open.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger value="item-3">Third Section</AccordionTrigger>
        <AccordionContent value="item-3">
          Multiple accordion allows having several sections open simultaneously.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};
