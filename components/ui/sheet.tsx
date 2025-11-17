"use client";

import * as React from "react";
import { Drawer as MuiDrawer, IconButton, Typography } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

import { cn } from "@/lib/utils";

interface SheetProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}

const SheetContext = React.createContext<{
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}>({});

function Sheet({ open, onOpenChange, children, ...props }: SheetProps) {
  return (
    <SheetContext.Provider value={{ open, onOpenChange }}>
      <MuiDrawer
        open={open ?? false}
        onClose={() => onOpenChange?.(false)}
        data-slot="sheet"
        {...props}
      >
        {children}
      </MuiDrawer>
    </SheetContext.Provider>
  );
}

function SheetTrigger({ children, ...props }: React.ComponentProps<"button">) {
  return <>{children}</>;
}

function SheetClose({ children, ...props }: React.ComponentProps<"button">) {
  const context = React.useContext(SheetContext);
  return (
    <button
      data-slot="sheet-close"
      onClick={() => context?.onOpenChange?.(false)}
      {...props}
    >
      {children}
    </button>
  );
}

function SheetPortal({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

function SheetOverlay({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-overlay"
      className={cn("fixed inset-0 z-50 bg-black/50", className)}
      {...props}
    />
  );
}

interface SheetContentProps {
  className?: string;
  children?: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
}

function SheetContent({
  className,
  children,
  side = "right",
  ...props
}: SheetContentProps) {
  const context = React.useContext(SheetContext);
  const anchor =
    side === "left"
      ? "left"
      : side === "right"
      ? "right"
      : side === "top"
      ? "top"
      : "bottom";

  return (
    <MuiDrawer
      anchor={anchor}
      open={context?.open ?? false}
      onClose={() => context?.onOpenChange?.(false)}
      data-slot="sheet-content"
      className={cn(
        "bg-background fixed z-50 flex flex-col gap-4 shadow-lg",
        side === "right" &&
          "inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
        side === "left" && "inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
        side === "top" && "inset-x-0 top-0 h-auto border-b",
        side === "bottom" && "inset-x-0 bottom-0 h-auto border-t",
        className
      )}
      {...props}
    >
      {children}
      <IconButton
        aria-label="close"
        onClick={() => context?.onOpenChange?.(false)}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
    </MuiDrawer>
  );
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      className={cn("flex flex-col gap-1.5 p-4", className)}
      {...props}
    />
  );
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
      {...props}
    />
  );
}

function SheetTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <Typography
      variant="h6"
      component="div"
      data-slot="sheet-title"
      className={cn("text-foreground font-semibold", className)}
      {...props}
    />
  );
}

function SheetDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      data-slot="sheet-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};
