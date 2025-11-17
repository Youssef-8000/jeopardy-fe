"use client";

import React, { useMemo } from "react";
import {
  Button,
  Card,
  CardContent,
  Typography,
  Container,
} from "@mui/material";
import { Board } from "@/lib/slices/boardsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  setCurrentClue,
  setTimeRemaining,
  setIsTimerRunning,
} from "@/lib/slices/gameSlice";

interface PlayBoardProps {
  board: Board;
}

export function PlayBoard({ board }: PlayBoardProps) {
  const dispatch = useAppDispatch();
  const currentClue = useAppSelector((state) => state.game.currentClue);
  const answeredClueIds = useAppSelector((state) => state.game.answeredClueIds);

  // Sort categories by position and ensure we have 6 columns
  const sortedCategories = useMemo(() => {
    const sorted = [...board.categories].sort((a, b) => {
      const posA = a.position ?? 0;
      const posB = b.position ?? 0;
      return posA - posB;
    });

    // Fill up to 6 categories with empty placeholders if needed
    while (sorted.length < 6) {
      sorted.push({
        id: `placeholder-${sorted.length}`,
        title: "",
        clues: [],
        position: sorted.length,
      });
    }

    return sorted.slice(0, 6);
  }, [board.categories]);

  // Find the maximum number of clues across all categories to determine grid rows
  const maxClues = useMemo(() => {
    return Math.max(
      ...sortedCategories.map((cat) => cat.clues.length),
      5 // Minimum 5 rows
    );
  }, [sortedCategories]);

  // Create a grid of clues by position (0-4 or max)
  const clueGrid = useMemo(() => {
    return sortedCategories.map((category) => {
      // Sort clues by position
      const sortedClues = [...category.clues].sort((a, b) => {
        const posA = a.position ?? 0;
        const posB = b.position ?? 0;
        return posA - posB;
      });

      // Create an array for each position
      const cluesByPosition: Array<(typeof sortedClues)[0] | null> = [];
      for (let i = 0; i < maxClues; i++) {
        const clue = sortedClues.find((c) => c.position === i);
        cluesByPosition.push(clue || null);
      }

      return {
        category,
        cluesByPosition,
      };
    });
  }, [sortedCategories, maxClues]);

  const handleClueClick = (
    categoryId: string | number,
    clueId: string | number
  ) => {
    if (currentClue) return;

    const category = board.categories.find(
      (c) => String(c.id) === String(categoryId)
    );
    if (!category) return;

    const clue = category.clues.find((c) => String(c.id) === String(clueId));
    if (!clue) return;

    const timeLimit = board.timeLimit;
    dispatch(
      setCurrentClue({
        boardId: String(board.id),
        categoryId: String(categoryId),
        clueId: String(clueId),
        value: clue.value,
        question: clue.question,
        answer: clue.answer,
        type: clue.type,
        mediaUrl: clue.mediaUrl,
      })
    );
    dispatch(setTimeRemaining(timeLimit));
    dispatch(setIsTimerRunning(true));
  };

  return (
    <Container maxWidth={false} className="py-8 px-4">
      <Typography variant="h4" component="h1" className="mb-8 text-center">
        {board.title}
      </Typography>

      <div className="overflow-x-auto">
        <div
          className="grid gap-2 min-w-full"
          style={{
            gridTemplateColumns: `repeat(6, minmax(150px, 1fr))`,
          }}
        >
          {clueGrid.map(({ category, cluesByPosition }) => (
            <div key={category.id} className="flex flex-col gap-2">
              {/* Category Header */}
              {category.title && (
                <Card className="bg-blue-600 text-white">
                  <CardContent className="py-3 px-2 text-center">
                    <Typography variant="subtitle2" className="font-bold">
                      {category.title}
                    </Typography>
                  </CardContent>
                </Card>
              )}

              {/* Clue Cells */}
              {cluesByPosition.map((clue, index) => {
                if (!clue) {
                  // Empty cell for missing clue
                  return (
                    <Button
                      key={`empty-${index}`}
                      variant="outlined"
                      disabled
                      className="h-16 flex flex-col items-center justify-center"
                      sx={{
                        backgroundColor: "#e0e0e0",
                        color: "#999",
                      }}
                    >
                      <span className="text-lg font-bold">-</span>
                    </Button>
                  );
                }

                const isAnswered = answeredClueIds.includes(String(clue.id));

                return (
                  <Button
                    key={clue.id}
                    variant={isAnswered ? "outlined" : "contained"}
                    color={isAnswered ? "inherit" : "primary"}
                    onClick={() => handleClueClick(category.id, clue.id)}
                    disabled={isAnswered}
                    className="h-16 flex flex-col items-center justify-center"
                    sx={{
                      backgroundColor: isAnswered ? "#e0e0e0" : "#1976d2",
                      color: isAnswered ? "#999" : "white",
                      "&:disabled": {
                        backgroundColor: "#e0e0e0",
                        color: "#999",
                      },
                    }}
                  >
                    <span className="text-lg font-bold">${clue.value}</span>
                  </Button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
