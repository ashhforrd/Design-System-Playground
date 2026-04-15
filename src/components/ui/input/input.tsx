import type { InputHTMLAttributes } from "react";

import { cn } from "@/lib/cn";

import styles from "./input.module.css";

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, type = "text", ...props }: InputProps) {
  return <input type={type} className={cn(styles.input, className)} {...props} />;
}
