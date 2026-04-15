import type { HTMLAttributes } from "react";

import { cn } from "@/lib/cn";

import styles from "./badge.module.css";

export type BadgeVariant = "solid" | "outline" | "muted";
export type BadgeSize = "sm" | "md";

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
  size?: BadgeSize;
};

export function Badge({
  className,
  variant = "solid",
  size = "md",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(styles.badge, styles[variant], styles[size], className)}
      {...props}
    />
  );
}
