'use client';

import React, { useMemo } from 'react';
import { Button, Card, CardContent, Typography, Container } from '@mui/material';
import { Board } from '@/lib/slices/boardsSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { setCurrentClue, setTimeRemaining, setIsTimerRunning } from '@/lib/slices/gameSlice';

const CLUE_VALUES = [200, 400, 600, 800, 1000];

interface PlayBoardProps {
  board: Board;
}

export function PlayBoard({ board }: PlayBoardProps) {
  const dispatch = useAppDispatch();
  const currentClue = useAppSelector((state) => state.game.currentClue);
  const answeredClueIds = useAppSelector((state) => state.game.answeredClueIds);

  const handleClueClick = (categoryId: string, clueValue: number) => {
    if (currentClue) return;

    const category = board.categories.find((c) => c.id === categoryId);
    if (!category) return;

    const clue = category.clues.find((c) => c.value === clueValue);
    if (!clue) return;

    const timeLimit = board.questionTimeLimit;
    dispatch(
      setCurrentClue({
        boardId: board.id,
        categoryId,
        clueId: clue.id,
        value: clueValue,
        question: clue.question,
        answer: clue.answer,
      })
    );
    dispatch(setTimeRemaining(timeLimit));
    dispatch(setIsTimerRunning(true));
  };

  return (
    <Container maxWidth="100%" className="py-8 px-4">
      <Typography variant="h4" component="h1" className="mb-8 text-center">
        {board.title}
      </Typography>

      <div className="overflow-x-auto">
        <div
          className="grid gap-2 min-w-full"
          style={{
            gridTemplateColumns: `repeat(${Math.min(board.categories.length, 6)}, minmax(150px, 1fr))`,
          }}
        >
          {board.categories.map((category) => (
            <div key={category.id} className="flex flex-col gap-2">
              {/* Category Header */}
              <Card className="bg-blue-600 text-white">
                <CardContent className="py-3 px-2 text-center">
                  <Typography variant="subtitle2" className="font-bold">
                    {category.title}
                  </Typography>
                </CardContent>
              </Card>

              {/* Clue Cells */}
              {CLUE_VALUES.map((value) => {
                const clue = category.clues.find((c) => c.value === value);
                const isAnswered = clue && answeredClueIds.includes(clue.id);

                return (
                  <Button
                    key={value}
                    variant={isAnswered ? 'outlined' : 'contained'}
                    color={isAnswered ? 'inherit' : 'primary'}
                    onClick={() => handleClueClick(category.id, value)}
                    disabled={!clue || isAnswered}
                    className="h-16 flex flex-col items-center justify-center"
                    sx={{
                      backgroundColor: isAnswered ? '#e0e0e0' : '#1976d2',
                      color: isAnswered ? '#999' : 'white',
                      '&:disabled': {
                        backgroundColor: '#e0e0e0',
                        color: '#999',
                      },
                    }}
                  >
                    <span className="text-lg font-bold">${value}</span>
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
