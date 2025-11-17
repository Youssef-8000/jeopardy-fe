"use client";

import * as React from "react";

interface AspectRatioProps {
  ratio?: number;
  children?: React.ReactNode;
  className?: string;
}

function AspectRatio({
  ratio = 16 / 9,
  children,
  className,
  ...props
}: AspectRatioProps) {
  return (
    <div
      data-slot="aspect-ratio"
      style={{
        position: "relative",
        width: "100%",
        paddingBottom: `${(1 / ratio) * 100}%`,
      }}
      className={className}
      {...props}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export { AspectRatio };
