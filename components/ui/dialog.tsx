"use client";

import * as React from "react";
import {
  Dialog as MuiDialog,
  DialogTitle as MuiDialogTitle,
  DialogContent as MuiDialogContent,
  DialogActions as MuiDialogActions,
  IconButton,
  Typography,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

import { cn } from "@/lib/utils";

interface DialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}

const DialogContext = React.createContext<{
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}>({});

function Dialog({ open, onOpenChange, children, ...props }: DialogProps) {
  return (
    <DialogContext.Provider value={{ open, onOpenChange }}>
      <MuiDialog
        open={open ?? false}
        onClose={() => onOpenChange?.(false)}
        data-slot="dialog"
        {...props}
      >
        {children}
      </MuiDialog>
    </DialogContext.Provider>
  );
}

function DialogTrigger({ children, ...props }: React.ComponentProps<"button">) {
  return <>{children}</>;
}

function DialogPortal({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

function DialogClose({ children, ...props }: React.ComponentProps<"button">) {
  const context = React.useContext(DialogContext);
  return (
    <button
      data-slot="dialog-close"
      onClick={() => context?.onOpenChange?.(false)}
      {...props}
    >
      {children}
    </button>
  );
}

function DialogOverlay({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-overlay"
      className={cn("fixed inset-0 z-50 bg-black/50", className)}
      {...props}
    />
  );
}

interface DialogContentProps {
  className?: string;
  children?: React.ReactNode;
  showCloseButton?: boolean;
}

function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: DialogContentProps) {
  const context = React.useContext(DialogContext);

  return (
    <MuiDialogContent
      data-slot="dialog-content"
      className={cn("p-6", className)}
      {...props}
    >
      {children}
      {showCloseButton && (
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
      )}
    </MuiDialogContent>
  );
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
      {...props}
    />
  );
}

function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <MuiDialogActions
      data-slot="dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    />
  );
}

function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof MuiDialogTitle>) {
  return (
    <MuiDialogTitle
      data-slot="dialog-title"
      className={cn("text-lg leading-none font-semibold", className)}
      {...props}
    />
  );
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      data-slot="dialog-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
