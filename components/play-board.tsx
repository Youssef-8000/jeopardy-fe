"use client";

import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Button, Typography, Container, Box } from "@mui/material";
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
  const headerRefs = useRef<Record<string, HTMLDivElement | null>>({});

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
  };

  return (
    <Container
      maxWidth={false}
      className="py-6 px-6 h-[calc(100vh-80px)] flex flex-col overflow-auto"
    >
      <Typography
        variant="h3"
        component="h1"
        className="mb-6! text-center font-bold"
        sx={{
          background: "linear-gradient(135deg, #f4c542 0%, #ffd966 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          fontSize: { xs: "1.75rem", md: "2rem" },
          textShadow: "0 2px 12px rgba(244, 197, 66, 0.25)",
        }}
      >
        {board.title}
      </Typography>

      <div className="overflow-x-auto flex-1 flex items-start justify-center pb-6">
        <div
          className="grid gap-3 mx-auto"
          style={{
            gridTemplateColumns: `repeat(6, minmax(150px, 1fr))`,
            maxWidth: "1400px",
          }}
        >
          {clueGrid.map(({ category, cluesByPosition }) => (
            <div key={category.id} className="flex flex-col gap-3">
              {/* Category Header */}
              {category.title && (
                <Box
                  ref={(el: HTMLDivElement | null) => {
                    headerRefs.current[String(category.id)] = el;
                  }}
                  className="p-4 text-center w-full"
                  sx={{
                    background: "#010b78",
                    borderRadius: "2px",
                    height: `90px`,
                    maxHeight: "120px",
                    overflowY: "auto",
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    className="font-bold"
                    sx={{
                      color: "#FFFFFF",
                      fontSize: "1rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      wordWrap: "break-word",
                      overflowWrap: "break-word",
                      whiteSpace: "normal",
                    }}
                  >
                    {category.title}
                  </Typography>
                </Box>
              )}

              {/* Clue Cells */}
              {cluesByPosition.map((clue, index) => {
                if (!clue) {
                  // Empty cell for missing clue
                  return (
                    <Button
                      key={`empty-${index}`}
                      disabled
                      className="h-20 flex flex-col items-center justify-center"
                      sx={{
                        background: "#0A0EAF",
                        border: "none",
                        color: "rgba(255, 200, 0, 0.2)",
                        borderRadius: "2px",
                        boxShadow: "none",
                        "&:disabled": {
                          background: "#0A0EAF",
                          border: "none",
                        },
                      }}
                    >
                      <span className="text-base font-bold">-</span>
                    </Button>
                  );
                }

                const isAnswered = answeredClueIds.includes(String(clue.id));

                return (
                  <Button
                    key={clue.id}
                    onClick={() => handleClueClick(category.id, clue.id)}
                    disabled={isAnswered}
                    className="h-20 flex flex-col items-center justify-center"
                    sx={{
                      background: isAnswered ? "#05076B" : "#0A0EAF",
                      color: isAnswered ? "rgba(255, 200, 0, 0.3)" : "#FFCC00",
                      border: "none",
                      borderRadius: "2px",
                      fontSize: "1.8rem",
                      fontWeight: 900,
                      fontFamily: "'Helvetica Neue', Arial, sans-serif",
                      transition: "all 0.15s ease",
                      boxShadow: "none",
                      textShadow: isAnswered
                        ? "none"
                        : "2px 2px 4px rgba(0, 0, 0, 0.5)",
                      letterSpacing: "1px",
                      "&:hover": {
                        transform: isAnswered ? "none" : "scale(1.02)",
                        background: isAnswered ? "#05076B" : "#0C11D4",
                      },
                      "&:disabled": {
                        background: "#05076B",
                        color: "rgba(255, 200, 0, 0.3)",
                        border: "none",
                      },
                    }}
                  >
                    <span>${clue.value}</span>
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
