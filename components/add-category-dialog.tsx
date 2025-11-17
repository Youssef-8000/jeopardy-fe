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
import { addCategory } from '@/lib/slices/boardsSlice';
import { v4 as uuidv4 } from 'uuid';

interface AddCategoryDialogProps {
  open: boolean;
  onClose: () => void;
  boardId: string;
}

interface CategoryFormData {
  title: string;
}

export function AddCategoryDialog({ open, onClose, boardId }: AddCategoryDialogProps) {
  const dispatch = useAppDispatch();
  const { control, handleSubmit, reset } = useForm<CategoryFormData>({
    defaultValues: {
      title: '',
    },
  });

  const onSubmit = (data: CategoryFormData) => {
    const newCategory = {
      id: uuidv4(),
      title: data.title,
      clues: [],
    };

    dispatch(
      addCategory({
        boardId,
        category: newCategory,
      })
    );
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add Category</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Controller
            name="title"
            control={control}
            rules={{ required: 'Category title is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Category Title"
                fullWidth
                variant="outlined"
                placeholder="e.g., Science"
                className="mt-4"
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            Add Category
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
