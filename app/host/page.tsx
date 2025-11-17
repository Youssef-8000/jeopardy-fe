'use client';

import React, { useState } from 'react';
import { Button, Container, Typography } from '@mui/material';
import { useAppSelector } from '@/lib/hooks';
import { AddBoardDialog } from '@/components/add-board-dialog';
import { BoardCard } from '@/components/board-card';

export default function HostPage() {
  const boards = useAppSelector((state) => state.boards.boards);
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <Container maxWidth="lg" className="py-8">
      <div className="mb-8">
        <Typography variant="h4" component="h1" className="mb-4">
          Jeopardy Boards
        </Typography>
        <Button
          variant="contained"
          onClick={() => setDialogOpen(true)}
        >
          Add New Board
        </Button>
      </div>

      {boards.length === 0 ? (
        <Typography color="textSecondary">
          No boards yet. Create one to get started!
        </Typography>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {boards.map((board) => (
            <BoardCard key={board.id} board={board} />
          ))}
        </div>
      )}

      <AddBoardDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </Container>
  );
}
