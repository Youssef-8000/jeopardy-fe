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
import { updateCategory } from '@/lib/slices/boardsSlice';
import { Category } from '@/lib/slices/boardsSlice';

interface EditCategoryDialogProps {
  open: boolean;
  onClose: () => void;
  boardId: string;
  category: Category;
}

interface CategoryFormData {
  title: string;
}

export function EditCategoryDialog({ open, onClose, boardId, category }: EditCategoryDialogProps) {
  const dispatch = useAppDispatch();
  const { control, handleSubmit, reset } = useForm<CategoryFormData>({
    defaultValues: {
      title: category.title,
    },
  });

  const onSubmit = (data: CategoryFormData) => {
    dispatch(
      updateCategory({
        boardId,
        category: {
          ...category,
          title: data.title,
        },
      })
    );
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Category</DialogTitle>
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
                autoFocus
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            Update Category
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
