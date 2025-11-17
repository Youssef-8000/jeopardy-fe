'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { useAppDispatch } from '@/lib/hooks';
import { addBoard } from '@/lib/slices/boardsSlice';

interface AddBoardDialogProps {
  open: boolean;
  onClose: () => void;
}

interface BoardFormData {
  title: string;
  questionTimeLimit: number;
}

export function AddBoardDialog({ open, onClose }: AddBoardDialogProps) {
  const dispatch = useAppDispatch();
  const { control, handleSubmit, reset } = useForm<BoardFormData>({
    defaultValues: {
      title: '',
      questionTimeLimit: 30,
    },
  });

  const onSubmit = (data: BoardFormData) => {
    dispatch(addBoard({
      title: data.title,
      questionTimeLimit: data.questionTimeLimit,
    }));
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Create New Board</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent className="flex flex-col gap-4">
          <Controller
            name="title"
            control={control}
            rules={{ required: 'Board title is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Board Title"
                fullWidth
                variant="outlined"
                placeholder="e.g., Science Jeopardy"
              />
            )}
          />
          <Controller
            name="questionTimeLimit"
            control={control}
            rules={{ required: true, min: 5, max: 300 }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Question Time Limit (seconds)"
                type="number"
                fullWidth
                variant="outlined"
                inputProps={{ min: 5, max: 300 }}
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            Create Board
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
