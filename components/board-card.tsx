'use client';

import React from 'react';
import { Card, CardContent, CardActions, Button, Typography } from '@mui/material';
import { Board } from '@/lib/slices/boardsSlice';
import Link from 'next/link';

interface BoardCardProps {
  board: Board;
}

export function BoardCard({ board }: BoardCardProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardContent className="flex-1">
        <Typography variant="h6" component="h3" className="mb-2">
          {board.title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Time Limit: {board.questionTimeLimit}s
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Categories: {board.categories.length}
        </Typography>
      </CardContent>
      <CardActions>
        <Link href={`/host/${board.id}`} className="w-full">
          <Button fullWidth variant="contained">
            Edit Board
          </Button>
        </Link>
        <Link href={`/play/${board.id}`} className="w-full">
          <Button fullWidth variant="outlined">
            Play
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
