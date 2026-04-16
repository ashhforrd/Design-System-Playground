import type { HTMLAttributes } from "react";

import { cn } from "@/lib/cn";

import styles from "./skeleton.module.css";

export type SkeletonVariant = "text" | "circular" | "rectangular";

export type SkeletonProps = HTMLAttributes<HTMLDivElement> & {
  variant?: SkeletonVariant;
  width?: string | number;
  height?: string | number;
};

export function Skeleton({
  className,
  variant = "text",
  width,
  height,
  style,
  ...props
}: SkeletonProps) {
  return (
    <div
      className={cn(styles.skeleton, styles[variant], className)}
      style={{
        width: width,
        height: height,
        ...style,
      }}
      {...props}
    />
  );
}
