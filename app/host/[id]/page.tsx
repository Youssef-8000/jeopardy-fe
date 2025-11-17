"use client";

import { useEffect, useMemo } from "react";
import { Button, Container, Typography } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { CategoryColumn } from "@/components/category-column";
import { fetchBoardById, Category } from "@/lib/slices/boardsSlice";

const CLUE_VALUES = [200, 400, 600, 800, 1000];
const NUM_CATEGORIES = 6;

export default function BoardEditorPage() {
  const params = useParams();
  const router = useRouter();
  const boardId = params.id as string;

  const board = useAppSelector((state) => state.boards.currentBoard);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchBoardById(boardId));
  }, [dispatch, boardId]);

  // Always ensure we have 6 categories, creating placeholders for missing ones
  const categories = useMemo(() => {
    if (!board) return [];

    const existingCategories = [...board.categories];
    const categoriesToShow: Category[] = [];

    for (let i = 0; i < NUM_CATEGORIES; i++) {
      const existingCategory = existingCategories[i];
      if (existingCategory) {
        categoriesToShow.push(existingCategory);
      } else {
        // Create a placeholder category without an ID
        categoriesToShow.push({
          id: `placeholder-${i}`, // Temporary ID for React key
          title: "Click to add category",
          clues: [],
        });
      }
    }

    categoriesToShow.sort((a, b) => (a.position || 0) - (b.position || 0));

    return categoriesToShow;
  }, [board]);

  if (!board) {
    return <div>Loading...</div>;
  }

  const { title } = board;

  return (
    <Container maxWidth={false} className="py-8 px-4">
      <div className="mb-8 flex justify-between items-center">
        <Typography variant="h4" component="h1" sx={{ color: "#d4af37" }}>
          {title} - Editor
        </Typography>
        <Button variant="outlined" onClick={() => router.back()}>
          Back
        </Button>
      </div>

      <div className="overflow-x-auto">
        <div
          className="board-grid"
          style={{
            gap: "0px",
            gridTemplateColumns: `repeat(6, minmax(140px, 1fr))`,
          }}
        >
          {categories.map((category, index) => (
            <CategoryColumn
              key={category.id || `category-${index}`}
              boardId={String(board.id)}
              category={category}
              clueValues={CLUE_VALUES}
              position={index}
            />
          ))}
        </div>
      </div>
    </Container>
  );
}
