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
    <Container
      maxWidth={false}
      className="py-6 px-6 h-[calc(100vh-80px)] flex flex-col overflow-auto"
    >
      <div className="mb-6 flex justify-between items-center flex-wrap gap-4">
        <Typography
          variant="h3"
          component="h1"
          className="font-bold"
          sx={{
            background: "linear-gradient(135deg, #f4c542 0%, #ffd966 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            fontSize: { xs: "1.75rem", md: "2rem" },
            textShadow: "0 2px 12px rgba(244, 197, 66, 0.25)",
          }}
        >
          {title}
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

      <div className="overflow-x-auto flex-1 flex items-start justify-center pb-6">
        <div
          className="grid gap-3 mx-auto"
          style={{
            gridTemplateColumns: `repeat(6, minmax(150px, 1fr))`,
            maxWidth: "1400px",
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
