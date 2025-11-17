"use client";

import { useToast } from "@/hooks/use-toast";
import { Snackbar, Alert } from "@mui/material";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastTitle,
} from "@/components/ui/toast";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Snackbar
            key={id}
            open={props.open}
            onClose={() => props.onOpenChange?.(false)}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            {...props}
          >
            <Alert
              severity={props.variant === "destructive" ? "error" : "info"}
            >
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
              {action}
              <ToastClose />
            </Alert>
          </Snackbar>
        );
      })}
    </>
  );
}
