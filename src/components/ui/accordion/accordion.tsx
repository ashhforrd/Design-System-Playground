"use client";

import { useState, createContext, useContext, type HTMLAttributes, type ReactNode } from "react";

import { cn } from "@/lib/cn";

import styles from "./accordion.module.css";

type AccordionContextValue = {
  expanded: string[];
  toggle: (id: string) => void;
  multiple: boolean;
};

const AccordionContext = createContext<AccordionContextValue | null>(null);

function useAccordionContext() {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error("Accordion components must be used within an Accordion provider");
  }
  return context;
}

export type AccordionProps = HTMLAttributes<HTMLDivElement> & {
  type?: "single" | "multiple";
  defaultValue?: string[];
};

export function Accordion({
  className,
  type = "single",
  defaultValue = [],
  children,
  ...props
}: AccordionProps) {
  const [expanded, setExpanded] = useState<string[]>(defaultValue);
  const multiple = type === "multiple";

  const toggle = (id: string) => {
    setExpanded((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      return multiple ? [...prev, id] : [id];
    });
  };

  return (
    <AccordionContext.Provider value={{ expanded, toggle, multiple }}>
      <div className={cn(styles.accordion, className)} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

export type AccordionItemProps = HTMLAttributes<HTMLDivElement> & {
  value: string;
};

export function AccordionItem({
  className,
  value,
  children,
  ...props
}: AccordionItemProps) {
  const { expanded } = useAccordionContext();
  const isExpanded = expanded.includes(value);

  return (
    <div
      className={cn(styles.item, isExpanded && styles.expanded, className)}
      data-state={isExpanded ? "open" : "closed"}
      {...props}
    >
      {children}
    </div>
  );
}

type AccordionItemContextValue = {
  value: string;
};

const AccordionItemContext = createContext<AccordionItemContextValue | null>(null);

export type AccordionTriggerProps = HTMLAttributes<HTMLButtonElement> & {
  value: string;
};

export function AccordionTrigger({
  className,
  value,
  children,
  ...props
}: AccordionTriggerProps) {
  const { expanded, toggle } = useAccordionContext();
  const isExpanded = expanded.includes(value);

  return (
    <button
      type="button"
      aria-expanded={isExpanded}
      className={cn(styles.trigger, className)}
      onClick={() => toggle(value)}
      {...props}
    >
      <span>{children}</span>
      <svg
        className={cn(styles.chevron, isExpanded && styles.rotated)}
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
      >
        <path
          d="M4 6L8 10L12 6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

export type AccordionContentProps = HTMLAttributes<HTMLDivElement> & {
  value: string;
};

export function AccordionContent({
  className,
  value,
  children,
  ...props
}: AccordionContentProps) {
  const { expanded } = useAccordionContext();
  const isExpanded = expanded.includes(value);

  if (!isExpanded) return null;

  return (
    <div className={cn(styles.content, className)} {...props}>
      {children}
    </div>
  );
}
