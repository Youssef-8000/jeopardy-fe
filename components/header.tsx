"use client";

import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <AppBar position="static" className="mb-4">
      <Toolbar>
        <Link href="/" className="flex-1 no-underline">
          <Typography
            variant="h4"
            component="span"
            className="cursor-pointer font-bold"
            sx={{
              color: "#d4af37",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
              letterSpacing: "2px",
            }}
          >
            JEOPARDY
          </Typography>
        </Link>
        <Box className="flex gap-2">
          <Link href="/">
            <Button
              sx={{ color: "#d4af37", fontWeight: 700, fontSize: "0.95rem" }}
            >
              Home
            </Button>
          </Link>
          <Link href="/host">
            <Button
              sx={{ color: "#d4af37", fontWeight: 700, fontSize: "0.95rem" }}
            >
              Host
            </Button>
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
