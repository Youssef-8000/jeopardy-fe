"use client";

import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent, Button, Typography, Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  setShowAnswer,
  setTimeRemaining,
  resetCurrentClue,
  markClueAsAnswered,
} from "@/lib/slices/gameSlice";

interface ClueDisplayProps {
  onBack: () => void;
}

// Declare YouTube IFrame API types
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

// Helper function to extract YouTube video ID from URL
function getYouTubeVideoId(url: string | null | undefined): string | null {
  if (!url) return null;

  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
}

export function ClueDisplay({ onBack }: ClueDisplayProps) {
  const dispatch = useAppDispatch();
  const { currentClue, showAnswer, timeRemaining, isTimerRunning } =
    useAppSelector((state) => state.game);
  const playerRef = useRef<any>(null);
  const playerDivRef = useRef<HTMLDivElement>(null);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const stopTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isTimerRunning || !currentClue) return;

    const interval = setInterval(() => {
      dispatch(setTimeRemaining(Math.max(0, timeRemaining - 1)));
    }, 1000);

    return () => clearInterval(interval);
  }, [isTimerRunning, timeRemaining, dispatch, currentClue]);

  // Load YouTube IFrame API
  useEffect(() => {
    const isMediaClue = currentClue?.type && currentClue.type !== "text";
    const youtubeVideoId = getYouTubeVideoId(currentClue?.mediaUrl);

    if (!isMediaClue || !youtubeVideoId || !playerDivRef.current) {
      setIsPlayerReady(false);
      return;
    }

    const initializePlayer = (videoId: string) => {
      if (!playerDivRef.current) return;

      // Destroy existing player if any
      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch (e) {
          // Ignore errors
        }
        playerRef.current = null;
      }

      playerRef.current = new window.YT.Player(playerDivRef.current, {
        videoId: videoId,
        playerVars: {
          autoplay: 0,
          controls: 1,
          rel: 0,
        },
        events: {
          onReady: () => {
            setIsPlayerReady(true);
          },
        },
      });
    };

    // Check if API is already loaded
    if (window.YT && window.YT.Player) {
      initializePlayer(youtubeVideoId);
      return;
    }

    // Load the IFrame Player API code asynchronously
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    // Set up callback when API is ready
    const originalCallback = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (originalCallback) originalCallback();
      initializePlayer(youtubeVideoId);
    };

    return () => {
      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch (e) {
          // Ignore errors during cleanup
        }
        playerRef.current = null;
      }
      if (stopTimerRef.current) {
        clearTimeout(stopTimerRef.current);
        stopTimerRef.current = null;
      }
      setIsPlayerReady(false);
    };
  }, [currentClue]);

  if (!currentClue) return null;

  const handleBack = () => {
    if (playerRef.current) {
      try {
        playerRef.current.stopVideo();
      } catch (e) {
        // Ignore errors
      }
    }
    if (stopTimerRef.current) {
      clearTimeout(stopTimerRef.current);
    }
    dispatch(markClueAsAnswered(currentClue.clueId));
    dispatch(resetCurrentClue());
    onBack();
  };

  const isMediaClue = currentClue.type && currentClue.type !== "text";
  const youtubeVideoId = getYouTubeVideoId(currentClue.mediaUrl);

  const handlePlaySegment = (endSeconds: number) => {
    if (!playerRef.current || !isPlayerReady) return;

    // Clear any existing stop timer
    if (stopTimerRef.current) {
      clearTimeout(stopTimerRef.current);
    }

    try {
      // Seek to start and play
      playerRef.current.seekTo(0, true);
      playerRef.current.playVideo();

      // Set timer to stop at the specified second
      stopTimerRef.current = setTimeout(() => {
        if (playerRef.current) {
          try {
            playerRef.current.pauseVideo();
            playerRef.current.seekTo(0, true);
          } catch (e) {
            // Ignore errors
          }
        }
      }, endSeconds * 1000);
    } catch (e) {
      console.error("Error playing video segment:", e);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl">
        <CardContent className="flex flex-col gap-6 p-8">
          {/* Timer */}
          <div className="text-center">
            <Typography variant="h6" color="textSecondary" className="mb-2">
              Time Remaining
            </Typography>
            <Typography
              variant="h2"
              className={`font-bold ${
                timeRemaining <= 5 ? "text-red-600" : "text-blue-600"
              }`}
            >
              {timeRemaining}s
            </Typography>
          </div>

          {/* Clue Value */}
          <div className="text-center">
            <Typography variant="body2" color="textSecondary">
              Points
            </Typography>
            <Typography variant="h4" className="font-bold">
              ${currentClue.value}
            </Typography>
          </div>

          {/* Media Content or Question/Answer */}
          {isMediaClue && youtubeVideoId ? (
            <Box className="flex flex-col gap-4">
              {/* YouTube Video */}
              <Box className="relative w-full" sx={{ paddingTop: "56.25%" }}>
                <div
                  ref={playerDivRef}
                  className="absolute top-0 left-0 w-full h-full rounded"
                />
              </Box>

              {/* Playback Control Buttons */}
              {!showAnswer && (
                <Box className="flex gap-2 justify-center flex-wrap">
                  <Button
                    variant="outlined"
                    onClick={() => handlePlaySegment(1)}
                    sx={{ minWidth: "60px" }}
                  >
                    1s
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => handlePlaySegment(3)}
                    sx={{ minWidth: "60px" }}
                  >
                    3s
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => handlePlaySegment(5)}
                    sx={{ minWidth: "60px" }}
                  >
                    5s
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => handlePlaySegment(10)}
                    sx={{ minWidth: "60px" }}
                  >
                    10s
                  </Button>
                </Box>
              )}

              {/* Question or Answer */}
              <Box className="bg-gray-100 rounded p-6 min-h-32 flex items-center justify-center">
                {!showAnswer ? (
                  currentClue.question && (
                    <Typography variant="h5" className="text-center">
                      {currentClue.question}
                    </Typography>
                  )
                ) : (
                  <Typography
                    variant="h4"
                    className="text-center font-bold text-green-600"
                  >
                    {currentClue.answer}
                  </Typography>
                )}
              </Box>
            </Box>
          ) : (
            <Box className="bg-gray-100 rounded p-6 min-h-32 flex items-center justify-center">
              {!showAnswer ? (
                <Typography variant="h5" className="text-center">
                  {currentClue.question}
                </Typography>
              ) : (
                <Typography
                  variant="h4"
                  className="text-center font-bold text-green-600"
                >
                  {currentClue.answer}
                </Typography>
              )}
            </Box>
          )}

          {/* Controls */}
          <div className="flex gap-4 justify-center">
            {!showAnswer ? (
              <Button
                variant="contained"
                size="large"
                onClick={() => dispatch(setShowAnswer(true))}
              >
                Reveal Answer
              </Button>
            ) : (
              <Button
                variant="contained"
                color="success"
                size="large"
                onClick={handleBack}
              >
                Back to Board
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
