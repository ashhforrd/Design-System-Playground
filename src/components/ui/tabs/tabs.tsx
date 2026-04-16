"use client";

import { useState, createContext, useContext, type HTMLAttributes, type ReactNode } from "react";

import { cn } from "@/lib/cn";

import styles from "./tabs.module.css";

type TabsContextValue = {
  activeTab: string;
  setActiveTab: (id: string) => void;
};

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("Tabs components must be used within a Tabs provider");
  }
  return context;
}

export type TabsProps = HTMLAttributes<HTMLDivElement> & {
  defaultValue: string;
  onValueChange?: (value: string) => void;
};

export function Tabs({
  className,
  defaultValue,
  onValueChange,
  children,
  ...props
}: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue);

  const handleTabChange = (id: string) => {
    setActiveTab(id);
    onValueChange?.(id);
  };

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab: handleTabChange }}>
      <div className={cn(styles.tabs, className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export type TabsListProps = HTMLAttributes<HTMLDivElement>;

export function TabsList({ className, ...props }: TabsListProps) {
  return (
    <div role="tablist" className={cn(styles.list, className)} {...props} />
  );
}

export type TabsTriggerProps = HTMLAttributes<HTMLButtonElement> & {
  value: string;
  disabled?: boolean;
};

export function TabsTrigger({
  className,
  value,
  disabled = false,
  children,
  ...props
}: TabsTriggerProps) {
  const { activeTab, setActiveTab } = useTabsContext();
  const isActive = activeTab === value;

  return (
    <button
      role="tab"
      type="button"
      aria-selected={isActive}
      disabled={disabled}
      className={cn(styles.trigger, isActive && styles.active, className)}
      onClick={() => setActiveTab(value)}
      {...props}
    >
      {children}
    </button>
  );
}

export type TabsContentProps = HTMLAttributes<HTMLDivElement> & {
  value: string;
};

export function TabsContent({
  className,
  value,
  children,
  ...props
}: TabsContentProps) {
  const { activeTab } = useTabsContext();

  if (activeTab !== value) return null;

  return (
    <div
      role="tabpanel"
      className={cn(styles.content, className)}
      {...props}
    >
      {children}
    </div>
  );
}
