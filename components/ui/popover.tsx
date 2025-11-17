"use client";

import * as React from "react";
import {
  Popover as MuiPopover,
  PopoverProps as MuiPopoverProps,
} from "@mui/material";

import { cn } from "@/lib/utils";

interface PopoverProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}

function Popover({ open, onOpenChange, children, ...props }: PopoverProps) {
  return (
    <MuiPopover
      open={open ?? false}
      onClose={() => onOpenChange?.(false)}
      data-slot="popover"
      {...props}
    >
      {children}
    </MuiPopover>
  );
}

function PopoverTrigger({
  children,
  ...props
}: React.ComponentProps<"button">) {
  return <>{children}</>;
}

function PopoverContent({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}: MuiPopoverProps) {
  return (
    <MuiPopover
      data-slot="popover-content"
      className={cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden",
        className
      )}
      {...props}
    />
  );
}

function PopoverAnchor({ ...props }: React.ComponentProps<"div">) {
  return <div data-slot="popover-anchor" {...props} />;
}

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor };
