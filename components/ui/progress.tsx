"use client";

import * as React from "react";
import { LinearProgress } from "@mui/material";

import { cn } from "@/lib/utils";

function Progress({
  className,
  value,
  ...props
}: React.ComponentProps<typeof LinearProgress> & {
  value?: number;
}) {
  return (
    <LinearProgress
      data-slot="progress"
      variant="determinate"
      value={value ?? 0}
      className={cn(
        "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
        className
      )}
      {...props}
    />
  );
}

export { Progress };
