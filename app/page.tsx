'use client';

import { useRouter } from 'next/navigation';
import { Button, Container, Typography, Box } from '@mui/material';

export default function HomePage() {
  const router = useRouter();

  return (
    <Container maxWidth="md" className="flex items-center justify-center min-h-screen">
      <Box className="text-center">
        <Typography variant="h2" component="h1" className="mb-4 font-bold">
          Welcome to Jeopardy Board
        </Typography>
        <Typography variant="h6" color="textSecondary" className="mb-8">
          Create custom Jeopardy boards and play them with your friends or classroom
        </Typography>
        <Box className="flex gap-4 justify-center flex-wrap">
          <Button
            variant="contained"
            size="large"
            onClick={() => router.push('/host')}
          >
            Create & Manage Boards
          </Button>
        </Box>
        
        <Box className="mt-12 pt-8 border-t border-gray-300">
          <Typography variant="h6" className="mb-4 font-bold">
            How to Use
          </Typography>
          <Box className="text-left max-w-xl mx-auto space-y-4">
            <Box>
              <Typography variant="subtitle1" className="font-bold">1. Create a Board</Typography>
              <Typography variant="body2" color="textSecondary">
                Go to Host mode and create a new board with a title and question time limit.
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle1" className="font-bold">2. Add Categories & Clues</Typography>
              <Typography variant="body2" color="textSecondary">
                Click on a board to edit it. Add categories and fill in clues with questions and answers.
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle1" className="font-bold">3. Play the Game</Typography>
              <Typography variant="body2" color="textSecondary">
                Click the Play button to start the game. Click on clues to reveal them with a timer and answer reveal.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
