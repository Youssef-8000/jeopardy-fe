"use client";

import { useState, useEffect } from "react";
import { Button, Container, Typography } from "@mui/material";
import { AddBoardDialog } from "@/components/add-board-dialog";
import { BoardCard } from "@/components/board-card";
import { fetchBoards } from "@/lib/slices/boardsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

export default function HostPage() {
  const boards = useAppSelector((state) => state.boards.boards);
  const [dialogOpen, setDialogOpen] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchBoards());
  }, [dispatch]);

  return (
    <Container
      maxWidth="lg"
      className="py-6 px-6 h-[calc(100vh-80px)] flex flex-col overflow-auto"
    >
      <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
        <Typography
          variant="h3"
          component="h1"
          className="font-bold"
          sx={{
            background: "linear-gradient(135deg, #f4c542 0%, #ffd966 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            fontSize: { xs: "1.75rem", md: "2rem" },
            textShadow: "0 2px 12px rgba(244, 197, 66, 0.25)",
          }}
        >
          Jeopardy Boards
        </Typography>
        <Button
          variant="contained"
          onClick={() => setDialogOpen(true)}
          sx={{
            fontSize: "0.95rem",
            padding: "10px 28px",
            borderRadius: "10px",
            background: "linear-gradient(135deg, #f4c542 0%, #d4a430 100%)",
            color: "#0a1628",
            fontWeight: 600,
            boxShadow: "0 4px 12px rgba(244, 197, 66, 0.3)",
            "&:hover": {
              background: "linear-gradient(135deg, #ffd966 0%, #f4c542 100%)",
              boxShadow: "0 6px 16px rgba(244, 197, 66, 0.4)",
            },
          }}
        >
          + Add New Board
        </Button>
      </div>

      {boards.length === 0 ? (
        <div
          className="text-center py-12 px-8 rounded-xl max-w-xl mx-auto flex-1 flex flex-col items-center justify-center"
          style={{
            background:
              "linear-gradient(145deg, rgba(26, 47, 74, 0.5) 0%, rgba(42, 63, 90, 0.3) 100%)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(244, 197, 66, 0.3)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              color: "#f0f4f8",
              mb: 2,
              fontSize: "1.25rem",
              fontWeight: 600,
            }}
          >
            No boards yet
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "#e8ecf0", fontSize: "0.95rem" }}
          >
            Create your first board to get started!
          </Typography>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 flex-1 content-start">
          {boards.map((board) => (
            <BoardCard key={board.id} board={board} />
          ))}
        </div>
      )}

      <AddBoardDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </Container>
  );
}
