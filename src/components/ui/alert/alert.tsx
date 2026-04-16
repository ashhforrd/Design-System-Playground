import type { HTMLAttributes } from "react";

import { cn } from "@/lib/cn";

import styles from "./alert.module.css";

export type AlertVariant = "info" | "success" | "warning" | "error";

export type AlertProps = HTMLAttributes<HTMLDivElement> & {
  variant?: AlertVariant;
  title?: string;
};

export function Alert({
  className,
  variant = "info",
  title,
  children,
  ...props
}: AlertProps) {
  return (
    <div
      role="alert"
      className={cn(styles.alert, styles[variant], className)}
      {...props}
    >
      {title && <div className={styles.title}>{title}</div>}
      {children && <div className={styles.description}>{children}</div>}
    </div>
  );
}
