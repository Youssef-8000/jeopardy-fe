"use client";

import * as React from "react";
import { Collapse } from "@mui/material";

interface CollapsibleProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}

function Collapsible({
  open,
  onOpenChange,
  children,
  ...props
}: CollapsibleProps) {
  return (
    <div data-slot="collapsible" {...props}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          if (child.type === CollapsibleTrigger) {
            return React.cloneElement(child, {
              onClick: () => onOpenChange?.(!open),
            } as any);
          }
          if (child.type === CollapsibleContent) {
            return <Collapse in={open}>{child}</Collapse>;
          }
        }
        return child;
      })}
    </div>
  );
}

function CollapsibleTrigger({
  children,
  ...props
}: React.ComponentProps<"button">) {
  return (
    <button data-slot="collapsible-trigger" {...props}>
      {children}
    </button>
  );
}

function CollapsibleContent({
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div data-slot="collapsible-content" {...props}>
      {children}
    </div>
  );
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
