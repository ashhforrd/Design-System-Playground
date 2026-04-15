"use client";

import type { InputHTMLAttributes, ReactNode } from "react";
import { useId } from "react";

import { cn } from "@/lib/cn";

import styles from "./checkbox.module.css";

export type CheckboxProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "children"
> & {
  label?: ReactNode;
};

export function Checkbox({
  className,
  label,
  id,
  ...props
}: CheckboxProps) {
  const autoId = useId();
  const inputId = id ?? (label != null ? autoId : undefined);

  return (
    <label className={cn(styles.root, className)} htmlFor={inputId}>
      <input
        id={inputId}
        type="checkbox"
        className={styles.input}
        {...props}
      />
      <span className={styles.box} aria-hidden />
      {label ? <span className={styles.labelText}>{label}</span> : null}
    </label>
  );
}
