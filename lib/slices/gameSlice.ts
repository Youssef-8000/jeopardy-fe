import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface GameState {
  currentBoardId: string | null;
  currentClue: {
    boardId: string;
    categoryId: string;
    clueId: string;
    value: number;
    question: string;
    answer: string;
  } | null;
  showAnswer: boolean;
  timeRemaining: number;
  isTimerRunning: boolean;
  answeredClueIds: string[];
}

const initialState: GameState = {
  currentBoardId: null,
  currentClue: null,
  showAnswer: false,
  timeRemaining: 0,
  isTimerRunning: false,
  answeredClueIds: [],
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setCurrentBoardId: (state, action: PayloadAction<string>) => {
      state.currentBoardId = action.payload;
      state.answeredClueIds = [];
    },
    setCurrentClue: (state, action: PayloadAction<GameState['currentClue']>) => {
      state.currentClue = action.payload;
      state.showAnswer = false;
      state.isTimerRunning = true;
    },
    setShowAnswer: (state, action: PayloadAction<boolean>) => {
      state.showAnswer = action.payload;
    },
    setTimeRemaining: (state, action: PayloadAction<number>) => {
      state.timeRemaining = action.payload;
    },
    setIsTimerRunning: (state, action: PayloadAction<boolean>) => {
      state.isTimerRunning = action.payload;
    },
    resetCurrentClue: (state) => {
      state.currentClue = null;
      state.showAnswer = false;
      state.isTimerRunning = false;
      state.timeRemaining = 0;
    },
    markClueAsAnswered: (state, action: PayloadAction<string>) => {
      if (!state.answeredClueIds.includes(action.payload)) {
        state.answeredClueIds.push(action.payload);
      }
    },
  },
});

export const {
  setCurrentBoardId,
  setCurrentClue,
  setShowAnswer,
  setTimeRemaining,
  setIsTimerRunning,
  resetCurrentClue,
  markClueAsAnswered,
} = gameSlice.actions;
export default gameSlice.reducer;
