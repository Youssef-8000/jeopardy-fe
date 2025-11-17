"use client";

import * as React from "react";
import { Popover as MuiPopover } from "@mui/material";

import { cn } from "@/lib/utils";

interface HoverCardProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}

function HoverCard({ open, onOpenChange, children, ...props }: HoverCardProps) {
  return (
    <MuiPopover
      open={open ?? false}
      onClose={() => onOpenChange?.(false)}
      data-slot="hover-card"
      {...props}
    >
      {children}
    </MuiPopover>
  );
}

function HoverCardTrigger({ children, ...props }: React.ComponentProps<"div">) {
  return <>{children}</>;
}

function HoverCardContent({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof MuiPopover>) {
  return (
    <MuiPopover
      data-slot="hover-card-content"
      className={cn(
        "bg-popover text-popover-foreground z-50 w-64 rounded-md border p-4 shadow-md",
        className
      )}
      {...props}
    />
  );
}

export { HoverCard, HoverCardTrigger, HoverCardContent };
