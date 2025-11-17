'use client';

import React from 'react';
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
import { addClue, updateClue } from '@/lib/slices/boardsSlice';
import { Clue } from '@/lib/slices/boardsSlice';
import { v4 as uuidv4 } from 'uuid';

interface AddClueDialogProps {
  open: boolean;
  onClose: () => void;
  boardId: string;
  categoryId: string;
  clueValue: number;
  existingClue?: Clue;
}

interface ClueFormData {
  question: string;
  answer: string;
}

export function AddClueDialog({
  open,
  onClose,
  boardId,
  categoryId,
  clueValue,
  existingClue,
}: AddClueDialogProps) {
  const dispatch = useAppDispatch();
  const { control, handleSubmit, reset } = useForm<ClueFormData>({
    defaultValues: {
      question: existingClue?.question || '',
      answer: existingClue?.answer || '',
    },
  });

  const onSubmit = (data: ClueFormData) => {
    if (existingClue) {
      dispatch(
        updateClue({
          boardId,
          categoryId,
          clue: {
            id: existingClue.id,
            value: existingClue.value,
            question: data.question,
            answer: data.answer,
          },
        })
      );
    } else {
      dispatch(
        addClue({
          boardId,
          categoryId,
          clue: {
            id: uuidv4(),
            value: clueValue,
            question: data.question,
            answer: data.answer,
          },
        })
      );
    }
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {existingClue ? 'Edit Clue' : `Add Clue - ${clueValue} Points`}
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent className="flex flex-col gap-4">
          <Controller
            name="question"
            control={control}
            rules={{ required: 'Question is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Question"
                fullWidth
                variant="outlined"
                multiline
                rows={3}
                placeholder="Enter the clue or question"
              />
            )}
          />
          <Controller
            name="answer"
            control={control}
            rules={{ required: 'Answer is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Answer"
                fullWidth
                variant="outlined"
                multiline
                rows={2}
                placeholder="Enter the answer or response"
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            {existingClue ? 'Update' : 'Add'} Clue
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
