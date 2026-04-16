import type { HTMLAttributes } from "react";

import { cn } from "@/lib/cn";

import styles from "./avatar.module.css";

export type AvatarSize = "sm" | "md" | "lg" | "xl";

export type AvatarProps = HTMLAttributes<HTMLDivElement> & {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: AvatarSize;
};

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function Avatar({
  className,
  src,
  alt = "",
  fallback,
  size = "md",
  ...props
}: AvatarProps) {
  const initials = fallback ? getInitials(fallback) : "?";

  return (
    <div className={cn(styles.avatar, styles[size], className)} {...props}>
      {src ? (
        <img src={src} alt={alt} className={styles.image} />
      ) : (
        <span className={styles.fallback}>{initials}</span>
      )}
    </div>
  );
}
