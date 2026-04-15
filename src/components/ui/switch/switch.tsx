"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { useCallback, useId, useState } from "react";

import { cn } from "@/lib/cn";

import styles from "./switch.module.css";

export type SwitchProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "role" | "onClick" | "children" | "defaultValue"
> & {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: ReactNode;
};

export function Switch({
  className,
  checked: checkedProp,
  defaultChecked = false,
  onCheckedChange,
  disabled,
  label,
  id,
  ...props
}: SwitchProps) {
  const autoId = useId();
  const controlId = id ?? autoId;
  const [uncontrolled, setUncontrolled] = useState(defaultChecked);
  const isControlled = checkedProp !== undefined;
  const checked = isControlled ? checkedProp : uncontrolled;

  const toggle = useCallback(() => {
    if (disabled) return;
    const next = !checked;
    if (!isControlled) setUncontrolled(next);
    onCheckedChange?.(next);
  }, [checked, disabled, isControlled, onCheckedChange]);

  return (
    <button
      type="button"
      role="switch"
      id={controlId}
      aria-checked={checked}
      aria-labelledby={label ? `${controlId}-label` : undefined}
      disabled={disabled}
      className={cn(styles.root, className)}
      onClick={toggle}
      {...props}
    >
      <span
        className={styles.track}
        data-state={checked ? "on" : "off"}
        aria-hidden
      >
        <span className={styles.thumb} />
      </span>
      {label ? (
        <span className={styles.label} id={`${controlId}-label`}>
          {label}
        </span>
      ) : null}
    </button>
  );
}
