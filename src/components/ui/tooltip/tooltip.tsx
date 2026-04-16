"use client";

import { useState, type HTMLAttributes, type ReactNode } from "react";

import { cn } from "@/lib/cn";

import styles from "./tooltip.module.css";

export type TooltipPosition = "top" | "bottom" | "left" | "right";

export type TooltipProps = HTMLAttributes<HTMLDivElement> & {
  content: ReactNode;
  position?: TooltipPosition;
  delay?: number;
  children: ReactNode;
};

export function Tooltip({
  className,
  content,
  position = "top",
  delay = 200,
  children,
  ...props
}: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    const id = setTimeout(() => setVisible(true), delay);
    setTimeoutId(id);
  };

  const handleMouseLeave = () => {
    if (timeoutId) clearTimeout(timeoutId);
    setVisible(false);
  };

  return (
    <div
      className={cn(styles.wrapper, className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
      {visible && (
        <div className={cn(styles.tooltip, styles[position])}>{content}</div>
      )}
    </div>
  );
}
