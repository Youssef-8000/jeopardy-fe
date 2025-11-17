"use client";

import React, { useState, useMemo } from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
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
  console.log("cluesToShow", cluesToShow);
  return (
    <>
      <div className="flex flex-col gap-0">
        <Button
          onClick={() => setEditDialogOpen(true)}
          className="!p-0 h-auto"
          fullWidth
          sx={{
            "&:hover": {
              backgroundColor: "rgba(212, 175, 55, 0.3)",
            },
          }}
        >
          <Card
            className="w-full cursor-pointer transition-colors"
            sx={{
              backgroundColor: "#1a3a70",
              color: "#ffffff",
              minHeight: "70px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 0,
              border: "2px solid #d4af37",
              margin: 0,
            }}
          >
            <CardContent className="py-2 px-3 text-center w-full">
              <Typography
                variant="h6"
                className="font-bold uppercase"
                sx={{ fontSize: "1rem", letterSpacing: "2px", fontWeight: 900 }}
              >
                {category.title}
              </Typography>
            </CardContent>
          </Card>
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
