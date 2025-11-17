'use client';

import React, { useState } from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { Category } from '@/lib/slices/boardsSlice';
import { ClueCell } from './clue-cell';
import { EditCategoryDialog } from './edit-category-dialog';

interface CategoryColumnProps {
  boardId: string;
  category: Category;
  clueValues: number[];
}

export function CategoryColumn({ boardId, category, clueValues }: CategoryColumnProps) {
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-0">
        <Button
          onClick={() => setEditDialogOpen(true)}
          className="!p-0 h-auto"
          fullWidth
          sx={{
            '&:hover': {
              backgroundColor: 'rgba(212, 175, 55, 0.3)',
            }
          }}
        >
          <Card className="w-full cursor-pointer transition-colors" sx={{ 
            backgroundColor: '#1a3a70',
            color: '#ffffff',
            minHeight: '70px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 0,
            border: '2px solid #d4af37',
            margin: 0
          }}>
            <CardContent className="py-2 px-3 text-center w-full">
              <Typography 
                variant="h6" 
                className="font-bold uppercase"
                sx={{ fontSize: '1rem', letterSpacing: '2px', fontWeight: 900 }}
              >
                {category.title}
              </Typography>
            </CardContent>
          </Card>
        </Button>
        {clueValues.map((value) => {
          const clue = category.clues.find((c) => c.value === value);
          return (
            <ClueCell
              key={value}
              boardId={boardId}
              categoryId={category.id}
              clueValue={value}
              clue={clue}
            />
          );
        })}
      </div>
      
      <EditCategoryDialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        boardId={boardId}
        category={category}
      />
    </>
  );
}
