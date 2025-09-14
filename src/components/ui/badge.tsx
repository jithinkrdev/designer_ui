import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "./utils";
import { badgeVariants } from "./badge.utils";

import type { BadgeVariantProps } from "./badge.utils";

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> & {
  variant?: BadgeVariantProps["variant"];
  asChild?: boolean;
}) {
  const Comp = asChild ? Slot : "span";
  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge };
