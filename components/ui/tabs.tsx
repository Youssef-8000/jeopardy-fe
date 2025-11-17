"use client";

import * as React from "react";
import { Tabs as MuiTabs, Tab, TabPanel } from "@mui/material";

import { cn } from "@/lib/utils";

interface TabsProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  children?: React.ReactNode;
  className?: string;
}

function Tabs({
  className,
  value,
  defaultValue,
  onValueChange,
  children,
  ...props
}: TabsProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue || "");
  const currentValue = value ?? internalValue;

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setInternalValue(newValue);
    onValueChange?.(newValue);
  };

  return (
    <MuiTabs
      data-slot="tabs"
      value={currentValue}
      onChange={handleChange}
      className={cn("flex flex-col gap-2", className)}
      {...props}
    >
      {children}
    </MuiTabs>
  );
}

function TabsList({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="tabs-list"
      className={cn(
        "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function TabsTrigger({
  className,
  value,
  children,
  ...props
}: React.ComponentProps<typeof Tab> & {
  value: string;
}) {
  return (
    <Tab
      data-slot="tabs-trigger"
      value={value}
      label={children}
      className={cn(
        "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  );
}

function TabsContent({
  className,
  value,
  children,
  ...props
}: React.ComponentProps<typeof TabPanel> & {
  value: string;
}) {
  return (
    <TabPanel
      data-slot="tabs-content"
      value={value}
      className={cn("flex-1 outline-none", className)}
      {...props}
    >
      {children}
    </TabPanel>
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
