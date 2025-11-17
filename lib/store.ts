import { configureStore } from '@reduxjs/toolkit';
import boardsReducer from './slices/boardsSlice';
import gameReducer from './slices/gameSlice';

export const store = configureStore({
  reducer: {
    boards: boardsReducer,
    game: gameReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
