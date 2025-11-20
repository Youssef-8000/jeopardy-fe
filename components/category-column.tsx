"use client";

import React, { useState, useMemo } from "react";
import { Box, Typography, Button } from "@mui/material";
import { Category, Clue } from "@/lib/slices/boardsSlice";
import { ClueCell } from "./clue-cell";
import { EditCategoryDialog } from "./edit-category-dialog";

interface CategoryColumnProps {
  boardId: string;
  category: Category;
  clueValues: number[];
  position?: number;
}

export function CategoryColumn({
  boardId,
  category,
  clueValues,
  position = 0,
}: CategoryColumnProps) {
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  // Always ensure we have clues for all clueValues, creating placeholders for missing ones
  const cluesToShow = useMemo(() => {
    const existingClues = [...category.clues].sort(
      (a, b) => (a.position || 0) - (b.position || 0)
    );
    const clues: Clue[] = [];

    for (let i = 0; i < clueValues.length; i++) {
      const clueValue = clueValues[i];
      // First try to find by position, then by value as fallback
      const existingClue = existingClues.find((c) => c.position === i);

      if (existingClue) {
        clues.push(existingClue);
      } else {
        // Create a placeholder clue
        clues.push({
          id: `placeholder-${category.id}-${i}`,
          value: clueValue,
          position: i,
          question: "",
          answer: "",
        });
      }
    }

    return clues;
  }, [category.clues, category.id, clueValues]);
  return (
    <>
      <div className="flex flex-col gap-3">
        <Button
          onClick={() => setEditDialogOpen(true)}
          className="p-0! h-auto"
          fullWidth
          sx={{
            borderRadius: "2px",
            overflow: "hidden",
            "&:hover": {
              background: "transparent",
            },
          }}
        >
          <Box
            className="w-full cursor-pointer p-4"
            sx={{
              background: "#010b78",
              color: "#FFFFFF",
              height: "90px",
              maxHeight: "120px",
              borderRadius: "2px",
              overflowY: "auto",
            }}
          >
            <Typography
              variant="subtitle1"
              className="font-bold"
              sx={{
                fontSize: "1rem",
                letterSpacing: "0.5px",
                fontWeight: 700,
                textTransform: "uppercase",
                wordWrap: "break-word",
                overflowWrap: "break-word",
                whiteSpace: "normal",
              }}
            >
              {category.title}
            </Typography>
          </Box>
        </Button>
        {cluesToShow.map((clue, index) => {
          const isPlaceholder = String(clue.id).startsWith("placeholder-");
          return (
            <ClueCell
              key={clue.id || `clue-${index}`}
              boardId={boardId}
              categoryId={String(category.id)}
              clueValue={clue.value}
              position={clue.position || 0}
              clue={isPlaceholder ? undefined : clue}
            />
          );
        })}
      </div>

      <EditCategoryDialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        boardId={boardId}
        category={category}
        position={position}
      />
    </>
  );
}
