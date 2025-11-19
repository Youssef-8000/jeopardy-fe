"use client";

import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { setCurrentBoardId } from "@/lib/slices/gameSlice";
import { fetchBoardById } from "@/lib/slices/boardsSlice";
import { PlayBoard } from "@/components/play-board";
import { ClueDisplay } from "@/components/clue-display";
import { Typography, Container, Button } from "@mui/material";

export default function PlayPage() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const boardId = params.id as string;

  const board = useAppSelector((state) => state.boards.currentBoard);
  const loading = useAppSelector((state) => state.boards.loading);
  const error = useAppSelector((state) => state.boards.error);
  const currentClue = useAppSelector((state) => state.game.currentClue);

  useEffect(() => {
    dispatch(fetchBoardById(boardId));
    dispatch(setCurrentBoardId(boardId));
  }, [boardId, dispatch]);

  if (loading) {
    return (
      <Container
        maxWidth="lg"
        className="py-12 h-[calc(100vh-80px)] flex items-center justify-center"
      >
        <div
          className="text-center py-12 px-10 rounded-xl max-w-xl"
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
            sx={{ color: "#f0f4f8", fontSize: "1.25rem", fontWeight: 600 }}
          >
            Loading board...
          </Typography>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container
        maxWidth="lg"
        className="py-12 h-[calc(100vh-80px)] flex items-center justify-center"
      >
        <div
          className="text-center py-12 px-10 rounded-xl max-w-xl"
          style={{
            background:
              "linear-gradient(145deg, rgba(239, 68, 68, 0.3) 0%, rgba(220, 38, 38, 0.2) 100%)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(239, 68, 68, 0.4)",
            boxShadow: "0 8px 32px rgba(239, 68, 68, 0.2)",
          }}
        >
          <Typography
            variant="h5"
            className="mb-6"
            sx={{ color: "#ef4444", fontSize: "1.25rem", fontWeight: 600 }}
          >
            Error: {error}
          </Typography>
          <Button
            variant="outlined"
            onClick={() => router.back()}
            sx={{
              fontSize: "0.95rem",
              padding: "10px 28px",
              borderRadius: "10px",
              borderColor: "rgba(239, 68, 68, 0.5)",
              color: "#ef4444",
              fontWeight: 600,
              "&:hover": {
                borderColor: "#ef4444",
                background: "rgba(239, 68, 68, 0.1)",
              },
            }}
          >
            ← Back
          </Button>
        </div>
      </Container>
    );
  }

  if (!board) {
    return (
      <Container
        maxWidth="lg"
        className="py-12 h-[calc(100vh-80px)] flex items-center justify-center"
      >
        <div
          className="text-center py-12 px-10 rounded-xl max-w-xl"
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
            className="mb-6"
            sx={{ color: "#f0f4f8", fontSize: "1.25rem", fontWeight: 600 }}
          >
            Board not found
          </Typography>
          <Button
            variant="outlined"
            onClick={() => router.back()}
            sx={{
              fontSize: "0.95rem",
              padding: "10px 28px",
              borderRadius: "10px",
              borderColor: "rgba(244, 197, 66, 0.5)",
              color: "#f4c542",
              fontWeight: 600,
              "&:hover": {
                borderColor: "#f4c542",
                background: "rgba(244, 197, 66, 0.1)",
              },
            }}
          >
            ← Back
          </Button>
        </div>
      </Container>
    );
  }

  if (board.categories.length === 0) {
    return (
      <Container
        maxWidth="lg"
        className="py-12 h-[calc(100vh-80px)] flex items-center justify-center"
      >
        <div
          className="text-center py-12 px-10 rounded-xl max-w-xl"
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
            className="mb-3"
            sx={{ color: "#f0f4f8", fontSize: "1.25rem", fontWeight: 600 }}
          >
            No Categories Yet
          </Typography>
          <Typography
            variant="body1"
            className="mb-6"
            sx={{ color: "#e8ecf0", fontSize: "0.95rem" }}
          >
            This board has no categories set up yet. Please edit it first.
          </Typography>
          <Button
            variant="outlined"
            onClick={() => router.back()}
            sx={{
              fontSize: "0.95rem",
              padding: "10px 28px",
              borderRadius: "10px",
              borderColor: "rgba(244, 197, 66, 0.5)",
              color: "#f4c542",
              fontWeight: 600,
              "&:hover": {
                borderColor: "#f4c542",
                background: "rgba(244, 197, 66, 0.1)",
              },
            }}
          >
            ← Back
          </Button>
        </div>
      </Container>
    );
  }
  return (
    <>
      <PlayBoard board={board} />
      <ClueDisplay onBack={() => {}} />
    </>
  );
}
