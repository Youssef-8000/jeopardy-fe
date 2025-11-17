'use client';

import React, { useMemo } from 'react';
import { Button, Container, Typography } from '@mui/material';
import { useParams, useRouter } from 'next/navigation';
import { useAppSelector } from '@/lib/hooks';
import { CategoryColumn } from '@/components/category-column';

const CLUE_VALUES = [200, 400, 600, 800, 1000];
const NUM_CATEGORIES = 6;

export default function BoardEditorPage() {
  const params = useParams();
  const router = useRouter();
  const boardId = params.id as string;

  const board = useAppSelector((state) =>
    state.boards.boards.find((b) => b.id === boardId)
  );

  if (!board) {
    return (
      <Container maxWidth="lg" className="py-8">
        <Typography>Board not found</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="100%" className="py-8 px-4">
      <div className="mb-8 flex justify-between items-center">
        <Typography variant="h4" component="h1" sx={{ color: '#d4af37' }}>
          {board.title} - Editor
        </Typography>
        <Button variant="outlined" onClick={() => router.back()}>
          Back
        </Button>
      </div>

      {board.categories.length === 0 ? (
        <Typography color="textSecondary">
          No categories yet. Something went wrong!
        </Typography>
      ) : (
        <div className="overflow-x-auto">
          <div className="board-grid" style={{ gap: '0px', gridTemplateColumns: `repeat(6, minmax(140px, 1fr))` }}>
            {board.categories.map((category) => (
              <CategoryColumn
                key={category.id}
                boardId={board.id}
                category={category}
                clueValues={CLUE_VALUES}
              />
            ))}
          </div>
        </div>
      )}
    </Container>
  );
}
