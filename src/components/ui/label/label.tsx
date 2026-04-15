import type { LabelHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/cn";

import styles from "./label.module.css";

export type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  optional?: ReactNode;
};

export function Label({
  className,
  children,
  optional,
  ...props
}: LabelProps) {
  return (
    <label className={cn(styles.label, className)} {...props}>
      {children}
      {optional != null && optional !== false ? (
        <span className={styles.optional}> {optional}</span>
      ) : null}
    </label>
  );
}
