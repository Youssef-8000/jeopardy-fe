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
      <Container maxWidth="lg" className="py-8">
        <Typography className="mb-4">Loading board...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" className="py-8">
        <Typography className="mb-4" color="error">
          Error: {error}
        </Typography>
        <Button variant="outlined" onClick={() => router.back()}>
          Back
        </Button>
      </Container>
    );
  }

  if (!board) {
    return (
      <Container maxWidth="lg" className="py-8">
        <Typography className="mb-4">Board not found</Typography>
        <Button variant="outlined" onClick={() => router.back()}>
          Back
        </Button>
      </Container>
    );
  }

  if (board.categories.length === 0) {
    return (
      <Container maxWidth="lg" className="py-8">
        <Typography className="mb-4">
          This board has no categories set up yet. Please edit it first.
        </Typography>
        <Button variant="outlined" onClick={() => router.back()}>
          Back
        </Button>
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
