"use client";

import React, { useState } from "react";
import { Button } from "@mui/material";
import { Clue } from "@/lib/slices/boardsSlice";
import { AddClueDialog } from "./add-clue-dialog";

interface ClueCellProps {
  boardId: string;
  categoryId: string;
  clueValue: number;
  position: number;
  clue?: Clue;
}

export function ClueCell({
  boardId,
  categoryId,
  clueValue,
  position,
  clue,
}: ClueCellProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const isFilled =
    clue && clue.question.trim() !== "" && clue.answer.trim() !== "";

  console.log("clue", clue);

  return (
    <>
      <Button
        fullWidth
        onClick={() => setDialogOpen(true)}
        className="h-24 flex flex-col items-center justify-center relative"
        sx={{
          backgroundColor: "#1a3a70",
          border: "2px solid #d4af37",
          color: "#ffff00",
          fontWeight: 900,
          fontSize: "2rem",
          textTransform: "uppercase",
          borderRadius: 0,
          margin: 0,
          padding: "0 !important",
          "&:hover": {
            backgroundColor: "#0f2847",
          },
          transition: "all 0.2s ease",
        }}
      >
        <span>${clueValue}</span>
        {isFilled && (
          <span className="absolute top-1 right-1 text-lg font-bold text-green-400">
            ✓
          </span>
        )}
      </Button>
      <AddClueDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        boardId={boardId}
        categoryId={categoryId}
        clueValue={clueValue}
        position={position}
        existingClue={clue}
      />
    </>
  );
}
