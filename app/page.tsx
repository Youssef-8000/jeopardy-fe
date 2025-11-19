"use client";

import { useRouter } from "next/navigation";
import { Button, Container, Typography, Box } from "@mui/material";

export default function HomePage() {
  const router = useRouter();

  return (
    <Container
      maxWidth="lg"
      className="h-[calc(100vh-80px)] flex items-center justify-center !py-6 !px-6 overflow-hidden"
    >
      <Box className="text-center max-w-6xl !mx-auto w-full h-full flex flex-col justify-center">
        {/* Hero Section */}
        <Box className="!mb-6 !px-4 flex flex-col items-center justify-center w-full">
          <Typography
            variant="h2"
            component="h1"
            className="!mb-3 font-bold text-center"
            sx={{
              fontSize: { xs: "2rem", md: "2.75rem" },
              background: "linear-gradient(135deg, #f4c542 0%, #ffd966 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textShadow: "0 4px 20px rgba(244, 197, 66, 0.3)",
              lineHeight: 1.2,
            }}
          >
            Welcome to Jeopardy Board
          </Typography>
          <Typography
            variant="h5"
            className="!mb-5 leading-relaxed !mx-auto text-center"
            sx={{
              color: "#f0f4f8",
              fontSize: { xs: "0.95rem", md: "1.1rem" },
              fontWeight: 400,
              maxWidth: "650px",
              px: { xs: 3, md: 0 },
            }}
          >
            Create custom Jeopardy boards and play them with your friends or
            classroom
          </Typography>
          <Box className="flex !gap-4 justify-center items-center flex-wrap w-full">
            <Button
              variant="contained"
              size="large"
              onClick={() => router.push("/host")}
              sx={{
                fontSize: "0.95rem",
                padding: "10px 32px",
                borderRadius: "10px",
              }}
            >
              Get Started
            </Button>
          </Box>
        </Box>

        {/* Features Section */}
        <Box className="grid grid-cols-1 md:grid-cols-3 !gap-4 !mb-6 !px-4 max-w-5xl !mx-auto w-full">
          <Box
            className="!p-5 rounded-xl text-center flex flex-col items-center justify-center"
            sx={{
              background:
                "linear-gradient(145deg, rgba(26, 47, 74, 0.6) 0%, rgba(42, 63, 90, 0.4) 100%)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(244, 197, 66, 0.3)",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-4px)",
                borderColor: "rgba(244, 197, 66, 0.5)",
                boxShadow: "0 12px 40px rgba(0, 0, 0, 0.4)",
              },
            }}
          >
            <Typography
              variant="h4"
              className="!mb-2"
              sx={{ color: "#f4c542", fontSize: "2rem" }}
            >
              📋
            </Typography>
            <Typography
              variant="h6"
              className="font-bold !mb-1.5"
              sx={{ fontSize: "1rem", color: "#f4c542" }}
            >
              Create Boards
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#e8ecf0",
                fontSize: "0.875rem",
                lineHeight: 1.5,
              }}
            >
              Design custom game boards with your own categories, questions, and
              point values
            </Typography>
          </Box>

          <Box
            className="!p-5 rounded-xl text-center flex flex-col items-center justify-center"
            sx={{
              background:
                "linear-gradient(145deg, rgba(26, 47, 74, 0.6) 0%, rgba(42, 63, 90, 0.4) 100%)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(244, 197, 66, 0.3)",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-4px)",
                borderColor: "rgba(244, 197, 66, 0.5)",
                boxShadow: "0 12px 40px rgba(0, 0, 0, 0.4)",
              },
            }}
          >
            <Typography
              variant="h4"
              className="!mb-2"
              sx={{ color: "#f4c542", fontSize: "2rem" }}
            >
              🎮
            </Typography>
            <Typography
              variant="h6"
              className="font-bold !mb-1.5"
              sx={{ fontSize: "1rem", color: "#f4c542" }}
            >
              Interactive Play
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#e8ecf0",
                fontSize: "0.875rem",
                lineHeight: 1.5,
              }}
            >
              Play with real-time timers, question reveals, and answer displays
            </Typography>
          </Box>

          <Box
            className="!p-5 rounded-xl text-center flex flex-col items-center justify-center"
            sx={{
              background:
                "linear-gradient(145deg, rgba(26, 47, 74, 0.6) 0%, rgba(42, 63, 90, 0.4) 100%)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(244, 197, 66, 0.3)",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-4px)",
                borderColor: "rgba(244, 197, 66, 0.5)",
                boxShadow: "0 12px 40px rgba(0, 0, 0, 0.4)",
              },
            }}
          >
            <Typography
              variant="h4"
              className="!mb-2"
              sx={{ color: "#f4c542", fontSize: "2rem" }}
            >
              🎯
            </Typography>
            <Typography
              variant="h6"
              className="font-bold !mb-1.5"
              sx={{ fontSize: "1rem", color: "#f4c542" }}
            >
              Easy to Use
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#e8ecf0",
                fontSize: "0.875rem",
                lineHeight: 1.5,
              }}
            >
              Simple, intuitive interface perfect for teachers and game hosts
            </Typography>
          </Box>
        </Box>

        {/* How to Use Section */}
        <Box
          className="!mt-0 !p-6 rounded-xl !mx-auto max-w-3xl w-full"
          sx={{
            background:
              "linear-gradient(145deg, rgba(26, 47, 74, 0.5) 0%, rgba(42, 63, 90, 0.3) 100%)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(244, 197, 66, 0.25)",
          }}
        >
          <Typography
            variant="h4"
            className="!mb-4 font-bold text-center"
            sx={{ color: "#f4c542", fontSize: "1.5rem" }}
          >
            How It Works
          </Typography>
          <Box className="text-left max-w-2xl !mx-auto !space-y-4">
            <Box className="flex !gap-4 items-start">
              <Box
                className="flex-shrink-0 !w-10 !h-10 rounded-full flex items-center justify-center font-bold"
                sx={{
                  background:
                    "linear-gradient(135deg, #f4c542 0%, #d4a430 100%)",
                  color: "#0a1628",
                  fontSize: "1rem",
                  boxShadow: "0 4px 12px rgba(244, 197, 66, 0.4)",
                }}
              >
                1
              </Box>
              <Box className="!pt-0.5 flex-1">
                <Typography
                  variant="h6"
                  className="font-bold !mb-1"
                  sx={{ fontSize: "1rem", color: "#f4c542" }}
                >
                  Create a Board
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "#e8ecf0",
                    fontSize: "0.875rem",
                    lineHeight: 1.5,
                  }}
                >
                  Go to Host mode and create a new board with a title and
                  question time limit
                </Typography>
              </Box>
            </Box>
            <Box className="flex !gap-4 items-start">
              <Box
                className="flex-shrink-0 !w-10 !h-10 rounded-full flex items-center justify-center font-bold"
                sx={{
                  background:
                    "linear-gradient(135deg, #f4c542 0%, #d4a430 100%)",
                  color: "#0a1628",
                  fontSize: "1rem",
                  boxShadow: "0 4px 12px rgba(244, 197, 66, 0.4)",
                }}
              >
                2
              </Box>
              <Box className="!pt-0.5 flex-1">
                <Typography
                  variant="h6"
                  className="font-bold !mb-1"
                  sx={{ fontSize: "1rem", color: "#f4c542" }}
                >
                  Add Categories & Clues
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "#e8ecf0",
                    fontSize: "0.875rem",
                    lineHeight: 1.5,
                  }}
                >
                  Click on a board to edit it. Add categories and fill in clues
                  with questions and answers
                </Typography>
              </Box>
            </Box>
            <Box className="flex !gap-4 items-start">
              <Box
                className="flex-shrink-0 !w-10 !h-10 rounded-full flex items-center justify-center font-bold"
                sx={{
                  background:
                    "linear-gradient(135deg, #f4c542 0%, #d4a430 100%)",
                  color: "#0a1628",
                  fontSize: "1rem",
                  boxShadow: "0 4px 12px rgba(244, 197, 66, 0.4)",
                }}
              >
                3
              </Box>
              <Box className="!pt-0.5 flex-1">
                <Typography
                  variant="h6"
                  className="font-bold !mb-1"
                  sx={{ fontSize: "1rem", color: "#f4c542" }}
                >
                  Play the Game
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "#e8ecf0",
                    fontSize: "0.875rem",
                    lineHeight: 1.5,
                  }}
                >
                  Click the Play button to start the game. Click on clues to
                  reveal them with a timer and answer reveal
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
