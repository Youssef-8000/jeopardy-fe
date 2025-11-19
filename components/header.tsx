"use client";

import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();

  return (
    <AppBar position="static" className="mb-0">
      <Toolbar sx={{ py: 2, px: { xs: 2, md: 4 } }}>
        <Link href="/" className="flex-1 no-underline">
          <Typography
            variant="h4"
            component="span"
            className="cursor-pointer font-bold"
            sx={{
              fontSize: { xs: "1.5rem", md: "2.125rem" },
              background: "linear-gradient(135deg, #f4c542 0%, #ffd966 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "1.5px",
              transition: "all 0.3s ease",
              "&:hover": {
                filter: "brightness(1.2)",
              },
            }}
          >
            JEOPARDY
          </Typography>
        </Link>
        <Box className="flex gap-2">
          <Link href="/">
            <Button
              sx={{
                color: pathname === "/" ? "#f4c542" : "rgba(240, 244, 248, 0.8)",
                fontWeight: 600,
                fontSize: "1rem",
                textTransform: "none",
                borderRadius: "8px",
                px: 3,
                py: 1,
                position: "relative",
                "&:hover": {
                  color: "#f4c542",
                  backgroundColor: "rgba(244, 197, 66, 0.1)",
                },
                "&::after": pathname === "/" ? {
                  content: '""',
                  position: "absolute",
                  bottom: 0,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "60%",
                  height: "2px",
                  background: "linear-gradient(90deg, transparent, #f4c542, transparent)",
                } : {},
              }}
            >
              Home
            </Button>
          </Link>
          <Link href="/host">
            <Button
              sx={{
                color: pathname.startsWith("/host") ? "#f4c542" : "rgba(240, 244, 248, 0.8)",
                fontWeight: 600,
                fontSize: "1rem",
                textTransform: "none",
                borderRadius: "8px",
                px: 3,
                py: 1,
                position: "relative",
                "&:hover": {
                  color: "#f4c542",
                  backgroundColor: "rgba(244, 197, 66, 0.1)",
                },
                "&::after": pathname.startsWith("/host") ? {
                  content: '""',
                  position: "absolute",
                  bottom: 0,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "60%",
                  height: "2px",
                  background: "linear-gradient(90deg, transparent, #f4c542, transparent)",
                } : {},
              }}
            >
              Host
            </Button>
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
