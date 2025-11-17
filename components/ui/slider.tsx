"use client";

import * as React from "react";
import { Slider as MuiSlider } from "@mui/material";

import { cn } from "@/lib/utils";

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  onValueChange,
  ...props
}: React.ComponentProps<typeof MuiSlider> & {
  onValueChange?: (value: number[]) => void;
}) {
  const handleChange = (event: Event, newValue: number | number[]) => {
    const values = Array.isArray(newValue) ? newValue : [newValue];
    onValueChange?.(values);
  };

  return (
    <MuiSlider
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      onChange={handleChange}
      className={cn(
        "relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
        className
      )}
      {...props}
    />
  );
}

export { Slider };
