import type { HTMLAttributes } from "react";

import { cn } from "@/lib/cn";

import styles from "./progress.module.css";

export type ProgressSize = "sm" | "md" | "lg";

export type ProgressProps = HTMLAttributes<HTMLDivElement> & {
  value?: number;
  max?: number;
  size?: ProgressSize;
  showLabel?: boolean;
};

export function Progress({
  className,
  value = 0,
  max = 100,
  size = "md",
  showLabel = false,
  ...props
}: ProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={cn(styles.wrapper, className)} {...props}>
      <div
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        className={cn(styles.track, styles[size])}
      >
        <div
          className={styles.indicator}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <span className={styles.label}>{Math.round(percentage)}%</span>
      )}
    </div>
  );
}
