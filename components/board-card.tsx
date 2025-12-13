"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Board, deleteBoardById } from "@/lib/slices/boardsSlice";
import { useAppDispatch } from "@/lib/hooks";
import { toast } from "@/hooks/use-toast";
import Link from "next/link";

interface BoardCardProps {
  board: Board;
}

export function BoardCard({ board }: BoardCardProps) {
  const dispatch = useAppDispatch();
  const { title, timeLimit } = board;

  const handleDelete = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this board? This action cannot be undone."
    );
    if (!confirmed) return;

    dispatch(deleteBoardById(board.id))
      .unwrap()
      .then(() => {
        toast({
          title: "Board deleted",
          description: `"${title}" has been removed.`,
          variant: "success",
        });
      })
      .catch((error: any) => {
        toast({
          title: "Error deleting board",
          description: error?.message || "Failed to delete board.",
          variant: "error",
        });
      });
  };

  return (
    <Card
      className="h-full flex flex-col"
      sx={{
        overflow: "hidden",
        background:
          "linear-gradient(145deg, rgba(26, 47, 74, 0.6) 0%, rgba(42, 63, 90, 0.4) 100%)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(244, 197, 66, 0.3)",
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3)",
        transition: "all 0.3s ease",
        position: "relative",
        "&:hover": {
          transform: "translateY(-4px)",
          borderColor: "rgba(244, 197, 66, 0.5)",
          boxShadow: "0 12px 32px rgba(0, 0, 0, 0.4)",
        },
      }}
    >
      <CardContent className="flex-1 p-4!">
        <Box className="mb-4">
          <Box className="flex items-center justify-between">
            <Typography
              variant="h5"
              component="h3"
              className="mb-3 font-bold"
              sx={{
                color: "#f4c542",
                fontSize: "1.25rem",
                textShadow: "0 2px 8px rgba(244, 197, 66, 0.2)",
              }}
            >
              {title}
            </Typography>
            <IconButton
              size="small"
              onClick={handleDelete}
              sx={{
                color: "rgba(232, 236, 240, 0.9)",
                backgroundColor: "rgba(0, 0, 0, 0.35)",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.55)",
                  color: "#ff6666",
                },
                zIndex: 1,
              }}
              aria-label="Delete board"
            >
              <DeleteOutlineIcon fontSize="small" />
            </IconButton>
          </Box>
          <Box
            className="flex items-center gap-2"
            sx={{
              color: "#e8ecf0",
            }}
          >
            <Typography
              variant="body1"
              component="span"
              sx={{ fontSize: "1rem" }}
            >
              ⏱️
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontSize: "0.9rem", color: "#e8ecf0" }}
            >
              Time Limit: {timeLimit}s
            </Typography>
          </Box>
        </Box>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
        }}
      >
        <Link href={`/host/${board.id}`} className="w-full">
          <Button
            fullWidth
            variant="contained"
            sx={{
              py: 1.25,
              fontSize: "0.9rem",
              background: "linear-gradient(135deg, #f4c542 0%, #d4a430 100%)",
              color: "#0a1628",
              fontWeight: 600,
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(244, 197, 66, 0.3)",
              "&:hover": {
                background: "linear-gradient(135deg, #ffd966 0%, #f4c542 100%)",
                boxShadow: "0 6px 16px rgba(244, 197, 66, 0.4)",
              },
            }}
          >
            Edit Board
          </Button>
        </Link>
        <Link href={`/play/${board.id}`} className="w-full">
          <Button
            fullWidth
            variant="outlined"
            sx={{
              py: 1.25,
              fontSize: "0.9rem",
              borderColor: "rgba(244, 197, 66, 0.5)",
              color: "#f4c542",
              fontWeight: 600,
              borderRadius: "8px",
              "&:hover": {
                borderColor: "#f4c542",
                background: "rgba(244, 197, 66, 0.1)",
                boxShadow: "0 4px 12px rgba(244, 197, 66, 0.2)",
              },
            }}
          >
            Play Game
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
