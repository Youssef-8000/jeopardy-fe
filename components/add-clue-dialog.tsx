"use client";

import React, { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useForm, Controller, useWatch } from "react-hook-form";
import { useAppDispatch } from "@/lib/hooks";
import {
  addClue,
  updateClueLocal,
  updateClue,
  createClue,
  fetchBoardById,
} from "@/lib/slices/boardsSlice";
import { Clue } from "@/lib/slices/boardsSlice";
import { v4 as uuidv4 } from "uuid";

const CLUE_VALUES = [200, 400, 600, 800, 1000];
const CLUE_TYPES = ["text", "image", "audio", "video"];

interface AddClueDialogProps {
  open: boolean;
  onClose: () => void;
  boardId: string;
  categoryId: string;
  clueValue: number;
  position: number;
  existingClue?: Clue;
}

interface ClueFormData {
  value: number;
  type: string;
  question: string;
  answer: string;
  mediaUrl?: string;
}

export function AddClueDialog({
  open,
  onClose,
  boardId,
  categoryId,
  clueValue,
  position,
  existingClue,
}: AddClueDialogProps) {
  const dispatch = useAppDispatch();
  const { control, handleSubmit, reset } = useForm<ClueFormData>({
    defaultValues: {
      value: existingClue?.value || clueValue,
      type: (existingClue as any)?.type || "text",
      question: existingClue?.question || "",
      answer: existingClue?.answer || "",
      mediaUrl: (existingClue as any)?.mediaUrl || "",
    },
  });

  // Watch the type field to conditionally show mediaUrl
  const selectedType = useWatch({
    control,
    name: "type",
    defaultValue: "text",
  });

  // Reset form when dialog opens/closes or clue changes
  useEffect(() => {
    if (open) {
      reset({
        value: existingClue?.value || clueValue,
        type: (existingClue as any)?.type || "text",
        question: existingClue?.question || "",
        answer: existingClue?.answer || "",
        mediaUrl: (existingClue as any)?.mediaUrl || "",
      });
    }
  }, [open, existingClue, clueValue, reset]);

  const onSubmit = async (data: ClueFormData) => {
    if (existingClue) {
      // Update existing clue via API
      const payload: any = {
        categoryId,
        value: data.value,
        question: data.question,
        answer: data.answer,
        type: data.type,
      };

      // Only include mediaUrl if type is not 'text'
      if (data.type !== "text" && data.mediaUrl) {
        payload.mediaUrl = data.mediaUrl;
      }

      await dispatch(
        updateClue({
          id: existingClue.id,
          ...payload,
        })
      );
      // Refetch the board to get the updated clue
      await dispatch(fetchBoardById(boardId));
    } else {
      // Create new clue via API
      const payload: any = {
        categoryId,
        value: data.value,
        position: position,
        question: data.question,
        answer: data.answer,
        type: data.type,
      };

      // Only include mediaUrl if type is not 'text'
      if (data.type !== "text" && data.mediaUrl) {
        payload.mediaUrl = data.mediaUrl;
      }

      await dispatch(createClue(payload));
      // Refetch the board to get the updated clues with IDs
      await dispatch(fetchBoardById(boardId));
    }
    reset();
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            bgcolor: "var(--jeopardy-navy-light)",
            borderRadius: "4px",
            border: "none",
          },
        },
      }}
    >
      <DialogTitle
        sx={{
          color: "var(--jeopardy-white)",
        }}
      >
        {existingClue ? "Edit Clue" : "Add Clue"}
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent className="flex flex-col gap-4">
          <Controller
            name="value"
            control={control}
            rules={{ required: "Value is required", min: 1 }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Value (Points)"
                type="number"
                fullWidth
                variant="outlined"
                inputProps={{ min: 1 }}
                onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
              />
            )}
          />
          <Controller
            name="type"
            control={control}
            rules={{ required: "Type is required" }}
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel>Type</InputLabel>
                <Select {...field} label="Type">
                  {CLUE_TYPES.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
          {selectedType !== "text" && (
            <Controller
              name="mediaUrl"
              control={control}
              rules={{
                required:
                  selectedType !== "text" ? "Media URL is required" : false,
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Media URL"
                  fullWidth
                  variant="outlined"
                  placeholder="Enter the URL for the media file"
                />
              )}
            />
          )}
          <Controller
            name="question"
            control={control}
            rules={{ required: "Question is required" }}
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
            rules={{ required: "Answer is required" }}
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
            {existingClue ? "Update" : "Create"} Clue
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
