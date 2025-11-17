'use client';

import React, { useEffect } from 'react';
import { Card, CardContent, Button, Typography, Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { setShowAnswer, setTimeRemaining, resetCurrentClue, markClueAsAnswered } from '@/lib/slices/gameSlice';

interface ClueDisplayProps {
  onBack: () => void;
}

export function ClueDisplay({ onBack }: ClueDisplayProps) {
  const dispatch = useAppDispatch();
  const { currentClue, showAnswer, timeRemaining, isTimerRunning } = useAppSelector(
    (state) => state.game
  );

  useEffect(() => {
    if (!isTimerRunning || !currentClue) return;

    const interval = setInterval(() => {
      dispatch(setTimeRemaining(Math.max(0, timeRemaining - 1)));
    }, 1000);

    return () => clearInterval(interval);
  }, [isTimerRunning, timeRemaining, dispatch, currentClue]);

  if (!currentClue) return null;

  const handleBack = () => {
    dispatch(markClueAsAnswered(currentClue.clueId));
    dispatch(resetCurrentClue());
    onBack();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardContent className="flex flex-col gap-6 p-8">
          {/* Timer */}
          <div className="text-center">
            <Typography variant="h6" color="textSecondary" className="mb-2">
              Time Remaining
            </Typography>
            <Typography
              variant="h2"
              className={`font-bold ${
                timeRemaining <= 5 ? 'text-red-600' : 'text-blue-600'
              }`}
            >
              {timeRemaining}s
            </Typography>
          </div>

          {/* Clue Value */}
          <div className="text-center">
            <Typography variant="body2" color="textSecondary">
              Points
            </Typography>
            <Typography variant="h4" className="font-bold">
              ${currentClue.value}
            </Typography>
          </div>

          {/* Question/Answer */}
          <Box className="bg-gray-100 rounded p-6 min-h-32 flex items-center justify-center">
            {!showAnswer ? (
              <Typography variant="h5" className="text-center">
                {currentClue.question}
              </Typography>
            ) : (
              <Typography variant="h4" className="text-center font-bold text-green-600">
                {currentClue.answer}
              </Typography>
            )}
          </Box>

          {/* Controls */}
          <div className="flex gap-4 justify-center">
            {!showAnswer ? (
              <Button
                variant="contained"
                size="large"
                onClick={() => dispatch(setShowAnswer(true))}
              >
                Reveal Answer
              </Button>
            ) : (
              <Button
                variant="contained"
                color="success"
                size="large"
                onClick={handleBack}
              >
                Back to Board
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
