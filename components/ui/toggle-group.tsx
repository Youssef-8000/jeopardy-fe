"use client";

import * as React from "react";
import { ToggleButtonGroup } from "@mui/material";
import { type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { toggleVariants } from "@/components/ui/toggle";

const ToggleGroupContext = React.createContext<
  VariantProps<typeof toggleVariants>
>({
  size: "default",
  variant: "default",
});

function ToggleGroup({
  className,
  variant,
  size,
  children,
  value,
  onValueChange,
  ...props
}: React.ComponentProps<typeof ToggleButtonGroup> &
  VariantProps<typeof toggleVariants> & {
    onValueChange?: (value: string | string[]) => void;
  }) {
  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newValue: string | string[]
  ) => {
    onValueChange?.(newValue);
  };

  return (
    <ToggleButtonGroup
      data-slot="toggle-group"
      data-variant={variant}
      data-size={size}
      value={value}
      onChange={handleChange}
      className={cn(
        "group/toggle-group flex w-fit items-center rounded-md data-[variant=outline]:shadow-xs",
        className
      )}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ variant, size }}>
        {children}
      </ToggleGroupContext.Provider>
    </ToggleButtonGroup>
  );
}

function ToggleGroupItem({
  className,
  children,
  variant,
  size,
  value,
  ...props
}: React.ComponentProps<typeof ToggleButtonGroup> &
  VariantProps<typeof toggleVariants>) {
  const context = React.useContext(ToggleGroupContext);

  return (
    <ToggleButtonGroup
      data-slot="toggle-group-item"
      data-variant={context.variant || variant}
      data-size={context.size || size}
      value={value}
      className={cn(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        "min-w-0 flex-1 shrink-0 rounded-none shadow-none first:rounded-l-md last:rounded-r-md focus:z-10 focus-visible:z-10 data-[variant=outline]:border-l-0 data-[variant=outline]:first:border-l",
        className
      )}
      {...props}
    >
      {children}
    </ToggleButtonGroup>
  );
}

export { ToggleGroup, ToggleGroupItem };
