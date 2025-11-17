"use client";

import * as React from "react";
import {
  Tooltip as MuiTooltip,
  TooltipProps as MuiTooltipProps,
} from "@mui/material";

import { cn } from "@/lib/utils";

function TooltipProvider({
  delayDuration = 0,
  children,
  ...props
}: {
  delayDuration?: number;
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

function Tooltip({ children, ...props }: MuiTooltipProps) {
  return (
    <MuiTooltip data-slot="tooltip" {...props}>
      {children}
    </MuiTooltip>
  );
}

function TooltipTrigger({ children, ...props }: React.ComponentProps<"div">) {
  return <>{children}</>;
}

function TooltipContent({
  className,
  sideOffset = 0,
  children,
  ...props
}: MuiTooltipProps) {
  return (
    <MuiTooltip
      data-slot="tooltip-content"
      className={cn(
        "bg-foreground text-background animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance",
        className
      )}
      {...props}
    >
      {children}
    </MuiTooltip>
  );
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
