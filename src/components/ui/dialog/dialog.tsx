"use client";

import { useEffect, useCallback, type HTMLAttributes } from "react";

import { cn } from "@/lib/cn";

import styles from "./dialog.module.css";

export type DialogProps = HTMLAttributes<HTMLDivElement> & {
  open?: boolean;
  onClose?: () => void;
};

export function Dialog({
  className,
  open = false,
  onClose,
  children,
  ...props
}: DialogProps) {
  const handleEscape = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape" && onClose) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (open) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [open, handleEscape]);

  if (!open) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        className={cn(styles.dialog, className)}
        onClick={(e) => e.stopPropagation()}
        {...props}
      >
        {children}
      </div>
    </div>
  );
}

export function DialogHeader({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn(styles.header, className)} {...props} />;
}

export function DialogTitle({
  className,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className={cn(styles.title, className)} {...props} />;
}

export function DialogDescription({
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn(styles.description, className)} {...props} />;
}

export function DialogContent({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn(styles.content, className)} {...props} />;
}

export function DialogFooter({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn(styles.footer, className)} {...props} />;
}
