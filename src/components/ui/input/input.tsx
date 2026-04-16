import type { InputHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/cn";

import styles from "./input.module.css";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  startIcon?: ReactNode;
  endIcon?: ReactNode;
};

export function Input({
  className,
  type = "text",
  startIcon,
  endIcon,
  ...props
}: InputProps) {
  const hasAffix = Boolean(startIcon || endIcon);

  if (!hasAffix) {
    return <input type={type} className={cn(styles.input, className)} {...props} />;
  }

  return (
    <div className={cn(styles.wrapper, className)}>
      {startIcon ? (
        <span className={styles.iconSlot} aria-hidden="true">
          {startIcon}
        </span>
      ) : null}
      <input type={type} className={styles.inputAffixed} {...props} />
      {endIcon ? (
        <span className={cn(styles.iconSlot, styles.iconSlotEnd)} aria-hidden="true">
          {endIcon}
        </span>
      ) : null}
    </div>
  );
}
