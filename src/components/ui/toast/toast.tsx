"use client";

import { useEffect, useState, type HTMLAttributes } from "react";

import { cn } from "@/lib/cn";

import styles from "./toast.module.css";

export type ToastVariant = "default" | "success" | "error";

export type ToastProps = HTMLAttributes<HTMLDivElement> & {
  variant?: ToastVariant;
  title?: string;
  description?: string;
  duration?: number;
  open?: boolean;
  onClose?: () => void;
};

export function Toast({
  className,
  variant = "default",
  title,
  description,
  duration = 5000,
  open = true,
  onClose,
  ...props
}: ToastProps) {
  const [visible, setVisible] = useState(open);

  useEffect(() => {
    setVisible(open);
  }, [open]);

  useEffect(() => {
    if (!visible || duration === 0) return;

    const timer = setTimeout(() => {
      setVisible(false);
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [visible, duration, onClose]);

  if (!visible) return null;

  return (
    <div
      role="alert"
      className={cn(styles.toast, styles[variant], className)}
      {...props}
    >
      <div className={styles.content}>
        {title && <div className={styles.title}>{title}</div>}
        {description && <div className={styles.description}>{description}</div>}
      </div>
      <button
        type="button"
        className={styles.close}
        onClick={() => {
          setVisible(false);
          onClose?.();
        }}
        aria-label="Close"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  );
}

export type ToastContainerProps = HTMLAttributes<HTMLDivElement>;

export function ToastContainer({ className, children, ...props }: ToastContainerProps) {
  return (
    <div className={cn(styles.container, className)} {...props}>
      {children}
    </div>
  );
}
