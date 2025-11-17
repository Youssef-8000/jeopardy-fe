"use client";

import * as React from "react";
import {
  Accordion as MuiAccordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import { ChevronDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface AccordionProps {
  type?: "single" | "multiple";
  collapsible?: boolean;
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  children?: React.ReactNode;
}

function Accordion({
  type = "single",
  collapsible = false,
  value,
  defaultValue,
  onValueChange,
  children,
  ...props
}: AccordionProps) {
  const [internalValue, setInternalValue] = React.useState<string | string[]>(
    defaultValue || (type === "multiple" ? [] : "")
  );
  const currentValue = value ?? internalValue;

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      if (type === "multiple") {
        const values = Array.isArray(currentValue) ? currentValue : [];
        const newValue = isExpanded
          ? [...values, panel]
          : values.filter((v) => v !== panel);
        setInternalValue(newValue);
        onValueChange?.(newValue);
      } else {
        const newValue = isExpanded ? panel : collapsible ? "" : panel;
        setInternalValue(newValue);
        onValueChange?.(newValue);
      }
    };

  return (
    <div data-slot="accordion" {...props}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === AccordionItem) {
          const itemValue = child.props.value || "";
          const isExpanded =
            type === "multiple"
              ? Array.isArray(currentValue) && currentValue.includes(itemValue)
              : currentValue === itemValue;

          return React.cloneElement(child, {
            expanded: isExpanded,
            onChange: handleChange(itemValue),
          } as any);
        }
        return child;
      })}
    </div>
  );
}

function AccordionItem({
  className,
  value,
  expanded,
  onChange,
  children,
  ...props
}: React.ComponentProps<typeof MuiAccordion> & {
  value?: string;
  expanded?: boolean;
  onChange?: (event: React.SyntheticEvent, isExpanded: boolean) => void;
}) {
  return (
    <MuiAccordion
      data-slot="accordion-item"
      expanded={expanded}
      onChange={onChange}
      className={cn("border-b last:border-b-0", className)}
      {...props}
    >
      {children}
    </MuiAccordion>
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionSummary>) {
  return (
    <AccordionSummary
      expandIcon={
        <ChevronDownIcon className="text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" />
      }
      data-slot="accordion-trigger"
      className={cn(
        "focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
        className
      )}
      {...props}
    >
      {children}
    </AccordionSummary>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionDetails>) {
  return (
    <AccordionDetails
      data-slot="accordion-content"
      className={cn("pt-0 pb-4", className)}
      {...props}
    >
      {children}
    </AccordionDetails>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
