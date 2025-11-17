"use client";

import * as React from "react";
import {
  RadioGroup as MuiRadioGroup,
  Radio,
  FormControlLabel,
} from "@mui/material";
import { CircleIcon } from "lucide-react";

import { cn } from "@/lib/utils";

function RadioGroup({
  className,
  value,
  onValueChange,
  ...props
}: React.ComponentProps<typeof MuiRadioGroup> & {
  onValueChange?: (value: string) => void;
}) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onValueChange?.(event.target.value);
  };

  return (
    <MuiRadioGroup
      data-slot="radio-group"
      value={value}
      onChange={handleChange}
      className={cn("grid gap-3", className)}
      {...props}
    />
  );
}

function RadioGroupItem({
  className,
  value,
  ...props
}: React.ComponentProps<typeof Radio> & {
  value: string;
}) {
  return (
    <FormControlLabel
      control={
        <Radio
          data-slot="radio-group-item"
          value={value}
          className={cn(
            "border-input text-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 aspect-square size-4 shrink-0 rounded-full border shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          {...props}
        />
      }
      label=""
    />
  );
}

export { RadioGroup, RadioGroupItem };
