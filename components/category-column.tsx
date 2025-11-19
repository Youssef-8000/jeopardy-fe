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
      <div className="flex flex-col gap-2.5">
        <Button
          onClick={() => setEditDialogOpen(true)}
          className="!p-0 h-auto"
          fullWidth
          sx={{
            borderRadius: "10px",
            overflow: "hidden",
            "&:hover": {
              transform: "translateY(-2px)",
            },
            transition: "all 0.3s ease",
          }}
        >
          <Card
            className="w-full cursor-pointer"
            sx={{
              background: "#0A0EAF",
              color: "#FFFFFF",
              minHeight: "65px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "2px",
              border: "none",
              margin: 0,
              boxShadow: "none",
            }}
          >
            <CardContent className="py-3 px-2 text-center w-full">
              <Typography
                variant="h6"
                className="font-bold"
                sx={{ 
                  fontSize: "0.85rem", 
                  letterSpacing: "0.5px", 
                  fontWeight: 700,
                  textTransform: "uppercase",
                  fontFamily: "'Helvetica Neue', Arial, sans-serif",
                }}
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
