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

  console.log("categoryId", categoryId);

  return (
    <>
      <Button
        fullWidth
        onClick={() => setDialogOpen(true)}
        className="h-24 flex flex-col items-center justify-center relative"
        disabled={categoryId.includes("placeholder-")}
        sx={{
          background: isFilled
            ? "#0A0EAF"
            : "linear-gradient(145deg, rgba(26, 47, 74, 0.6) 0%, rgba(42, 63, 90, 0.4) 100%)",
          border: isFilled ? "none" : "1px dashed rgba(244, 197, 66, 0.3)",
          color: isFilled ? "#FFCC00" : "rgba(240, 244, 248, 0.5)",
          fontWeight: 900,
          fontSize: "1.8rem",
          textTransform: "none",
          borderRadius: isFilled ? "2px" : "8px",
          margin: 0,
          padding: "0 !important",
          fontFamily: isFilled
            ? "'Helvetica Neue', Arial, sans-serif"
            : "inherit",
          boxShadow: "none",
          textShadow: isFilled ? "2px 2px 4px rgba(0, 0, 0, 0.5)" : "none",
          letterSpacing: isFilled ? "1px" : "normal",
          "&:hover": {
            background: isFilled
              ? "#0C11D4"
              : "linear-gradient(145deg, rgba(26, 47, 74, 0.8) 0%, rgba(42, 63, 90, 0.6) 100%)",
            transform: isFilled ? "scale(1.02)" : "translateY(-2px)",
            boxShadow: isFilled ? "none" : "0 2px 8px rgba(0, 0, 0, 0.2)",
          },
          transition: "all 0.15s ease",
        }}
      >
        <span>${clueValue}</span>
        {isFilled && (
          <span className="absolute top-2 right-2 text-sm font-bold text-green-400">
            ✓
          </span>
        )}
        {!isFilled && (
          <span
            className="absolute bottom-2 text-xs"
            style={{ color: "rgba(240, 244, 248, 0.4)" }}
          >
            Click to add
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
