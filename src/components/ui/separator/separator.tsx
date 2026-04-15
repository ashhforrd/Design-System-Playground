import type { HTMLAttributes } from "react";

import { cn } from "@/lib/cn";

import styles from "./separator.module.css";

export type SeparatorOrientation = "horizontal" | "vertical";

export type SeparatorProps = HTMLAttributes<HTMLDivElement> & {
  orientation?: SeparatorOrientation;
};

export function Separator({
  className,
  orientation = "horizontal",
  ...props
}: SeparatorProps) {
  return (
    <div
      role="separator"
      aria-orientation={orientation}
      className={cn(styles.root, styles[orientation], className)}
      {...props}
    />
  );
}
