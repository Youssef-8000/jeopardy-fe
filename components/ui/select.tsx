"use client";

import * as React from "react";
import {
  Select as MuiSelect,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface SelectProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  children?: React.ReactNode;
}

function Select({
  value,
  defaultValue,
  onValueChange,
  children,
  ...props
}: SelectProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue || "");
  const currentValue = value ?? internalValue;

  const handleChange = (event: SelectChangeEvent<string>) => {
    const newValue = event.target.value;
    setInternalValue(newValue);
    onValueChange?.(newValue);
  };

  return (
    <FormControl data-slot="select" {...props}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === SelectTrigger) {
          return React.cloneElement(child, {
            value: currentValue,
            onChange: handleChange,
          } as any);
        }
        if (React.isValidElement(child) && child.type === SelectContent) {
          return React.cloneElement(child, {
            value: currentValue,
            onChange: handleChange,
          } as any);
        }
        return child;
      })}
    </FormControl>
  );
}

function SelectGroup({ children, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="select-group" {...props}>
      {children}
    </div>
  );
}

function SelectValue({ placeholder, ...props }: { placeholder?: string }) {
  return (
    <span data-slot="select-value" {...props}>
      {placeholder}
    </span>
  );
}

interface SelectTriggerProps {
  className?: string;
  size?: "sm" | "default";
  children?: React.ReactNode;
  value?: string;
  onChange?: (event: SelectChangeEvent<string>) => void;
}

function SelectTrigger({
  className,
  size = "default",
  children,
  value,
  onChange,
  ...props
}: SelectTriggerProps) {
  return (
    <MuiSelect
      data-slot="select-trigger"
      data-size={size}
      value={value || ""}
      onChange={onChange}
      className={cn(
        "border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      {children}
    </MuiSelect>
  );
}

function SelectContent({
  className,
  children,
  position = "popper",
  value,
  onChange,
  ...props
}: React.ComponentProps<typeof MuiSelect> & {
  position?: "popper" | "item-aligned";
}) {
  return (
    <MuiSelect
      data-slot="select-content"
      value={value}
      onChange={onChange}
      className={cn(
        "bg-popover text-popover-foreground relative z-50 max-h-96 min-w-[8rem] overflow-x-hidden overflow-y-auto rounded-md border shadow-md",
        className
      )}
      {...props}
    >
      {children}
    </MuiSelect>
  );
}

function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof InputLabel>) {
  return (
    <InputLabel
      data-slot="select-label"
      className={cn("text-muted-foreground px-2 py-1.5 text-xs", className)}
      {...props}
    />
  );
}

function SelectItem({
  className,
  children,
  value,
  ...props
}: React.ComponentProps<typeof MenuItem>) {
  return (
    <MenuItem
      data-slot="select-item"
      value={value}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className
      )}
      {...props}
    >
      {children}
    </MenuItem>
  );
}

function SelectSeparator({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="select-separator"
      className={cn("bg-border pointer-events-none -mx-1 my-1 h-px", className)}
      {...props}
    />
  );
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="select-scroll-up-button"
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className
      )}
      {...props}
    >
      <ChevronUpIcon className="size-4" />
    </div>
  );
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="select-scroll-down-button"
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className
      )}
      {...props}
    >
      <ChevronDownIcon className="size-4" />
    </div>
  );
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
