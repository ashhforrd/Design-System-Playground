import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "./tabs";

const meta = {
  title: "Components/Tabs",
  component: Tabs,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="account" style={{ width: "24rem" }}>
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <p style={{ fontSize: "0.875rem", color: "var(--ds-muted-fg)" }}>
          Manage your account settings and preferences.
        </p>
      </TabsContent>
      <TabsContent value="password">
        <p style={{ fontSize: "0.875rem", color: "var(--ds-muted-fg)" }}>
          Change your password and security settings.
        </p>
      </TabsContent>
      <TabsContent value="settings">
        <p style={{ fontSize: "0.875rem", color: "var(--ds-muted-fg)" }}>
          Configure your application settings.
        </p>
      </TabsContent>
    </Tabs>
  ),
};

export const WithDisabled: Story = {
  render: () => (
    <Tabs defaultValue="tab1">
      <TabsList>
        <TabsTrigger value="tab1">Active</TabsTrigger>
        <TabsTrigger value="tab2" disabled>Disabled</TabsTrigger>
        <TabsTrigger value="tab3">Another</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <p style={{ fontSize: "0.875rem", color: "var(--ds-muted-fg)" }}>
          First tab content.
        </p>
      </TabsContent>
      <TabsContent value="tab3">
        <p style={{ fontSize: "0.875rem", color: "var(--ds-muted-fg)" }}>
          Third tab content.
        </p>
      </TabsContent>
    </Tabs>
  ),
};
