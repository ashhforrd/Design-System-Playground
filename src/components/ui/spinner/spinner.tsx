import type { HTMLAttributes } from "react";

import { cn } from "@/lib/cn";

import styles from "./spinner.module.css";

export type SpinnerSize = "sm" | "md" | "lg";

export type SpinnerProps = HTMLAttributes<HTMLDivElement> & {
  size?: SpinnerSize;
};

export function Spinner({ className, size = "md", ...props }: SpinnerProps) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn(styles.spinner, styles[size], className)}
      {...props}
    >
      <svg viewBox="0 0 24 24" fill="none" className={styles.svg}>
        <circle
          className={styles.track}
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="3"
        />
        <path
          className={styles.indicator}
          d="M12 2C6.47715 2 2 6.47715 2 12"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
