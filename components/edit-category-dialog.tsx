"use client";

import React, { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useAppDispatch } from "@/lib/hooks";
import {
  updateCategoryLocal,
  updateCategory,
  createCategory,
  fetchBoardById,
} from "@/lib/slices/boardsSlice";
import { Category } from "@/lib/slices/boardsSlice";

interface EditCategoryDialogProps {
  open: boolean;
  onClose: () => void;
  boardId: string;
  category: Category;
  position?: number;
}

interface CategoryFormData {
  title: string;
}

export function EditCategoryDialog({
  open,
  onClose,
  boardId,
  category,
  position = 0,
}: EditCategoryDialogProps) {
  const dispatch = useAppDispatch();
  const isPlaceholder = String(category.id).startsWith("placeholder-");

  const { control, handleSubmit, reset } = useForm<CategoryFormData>({
    defaultValues: {
      title: category.title === "Click to add category" ? "" : category.title,
    },
  });

  // Reset form when dialog opens/closes or category changes
  useEffect(() => {
    if (open) {
      reset({
        title: category.title === "Click to add category" ? "" : category.title,
      });
    }
  }, [open, category, reset]);

  const onSubmit = async (data: CategoryFormData) => {
    if (isPlaceholder) {
      // Create new category via API
      await dispatch(
        createCategory({
          boardId: parseInt(boardId) || boardId,
          title: data.title,
          position,
        })
      );
      // Refetch the board to get the updated categories with IDs
      await dispatch(fetchBoardById(boardId));
    } else {
      // Update existing category via API
      await dispatch(
        updateCategory({
          id: category.id,
          boardId: parseInt(boardId) || boardId,
          title: data.title,
        })
      );
      // Refetch the board to get the updated category
      await dispatch(fetchBoardById(boardId));
    }
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {isPlaceholder ? "Add Category" : "Edit Category"}
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Controller
            name="title"
            control={control}
            rules={{ required: "Category title is required" }}
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
            {isPlaceholder ? "Create Category" : "Update Category"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
