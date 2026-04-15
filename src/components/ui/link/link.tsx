import type { ComponentProps } from "react";
import NextLink from "next/link";

import { cn } from "@/lib/cn";

import styles from "./link.module.css";

export type LinkProps = Omit<ComponentProps<"a">, "href"> & {
  href: string;
};

export function Link({ href, className, ...props }: LinkProps) {
  const cls = cn(styles.link, className);
  const isExternal =
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("//") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:");

  if (isExternal) {
    return (
      <a
        href={href}
        className={cls}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      />
    );
  }

  return <NextLink href={href} className={cls} {...props} />;
}
