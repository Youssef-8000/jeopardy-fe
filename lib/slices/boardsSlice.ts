import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Clue {
  id: string;
  value: number;
  question: string;
  answer: string;
}

export interface Category {
  id: string;
  title: string;
  clues: Clue[];
}

export interface Board {
  id: string;
  title: string;
  questionTimeLimit: number;
  categories: Category[];
  createdAt: string;
}

interface BoardsState {
  boards: Board[];
}

const createPremadeBoard = (title: string, timeLimit: number): Board => {
  const categoryNames = ['Category 1', 'Category 2', 'Category 3', 'Category 4', 'Category 5', 'Category 6'];
  const clueValues = [200, 400, 600, 800, 1000];

  const categories: Category[] = categoryNames.map((name) => ({
    id: `cat-${Math.random().toString(36).substr(2, 9)}`,
    title: name,
    clues: clueValues.map((value) => ({
      id: `clue-${Math.random().toString(36).substr(2, 9)}`,
      value,
      question: '',
      answer: '',
    })),
  }));

  return {
    id: `board-${Math.random().toString(36).substr(2, 9)}`,
    title,
    questionTimeLimit: timeLimit,
    categories,
    createdAt: new Date().toISOString(),
  };
};

const initialState: BoardsState = {
  boards: [],
};

const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    addBoard: (state, action: PayloadAction<{ title: string; questionTimeLimit: number }>) => {
      const newBoard = createPremadeBoard(action.payload.title, action.payload.questionTimeLimit);
      state.boards.push(newBoard);
    },
    updateBoard: (state, action: PayloadAction<Board>) => {
      const index = state.boards.findIndex((b) => b.id === action.payload.id);
      if (index !== -1) {
        state.boards[index] = action.payload;
      }
    },
    deleteBoard: (state, action: PayloadAction<string>) => {
      state.boards = state.boards.filter((b) => b.id !== action.payload);
    },
    addCategory: (state, action: PayloadAction<{ boardId: string; category: Category }>) => {
      const board = state.boards.find((b) => b.id === action.payload.boardId);
      if (board) {
        board.categories.push(action.payload.category);
      }
    },
    updateCategory: (state, action: PayloadAction<{ boardId: string; category: Category }>) => {
      const board = state.boards.find((b) => b.id === action.payload.boardId);
      if (board) {
        const categoryIndex = board.categories.findIndex(
          (c) => c.id === action.payload.category.id
        );
        if (categoryIndex !== -1) {
          board.categories[categoryIndex] = action.payload.category;
        }
      }
    },
    addClue: (
      state,
      action: PayloadAction<{ boardId: string; categoryId: string; clue: Clue }>
    ) => {
      const board = state.boards.find((b) => b.id === action.payload.boardId);
      if (board) {
        const category = board.categories.find((c) => c.id === action.payload.categoryId);
        if (category) {
          category.clues.push(action.payload.clue);
        }
      }
    },
    updateClue: (
      state,
      action: PayloadAction<{ boardId: string; categoryId: string; clue: Clue }>
    ) => {
      const board = state.boards.find((b) => b.id === action.payload.boardId);
      if (board) {
        const category = board.categories.find((c) => c.id === action.payload.categoryId);
        if (category) {
          const clueIndex = category.clues.findIndex((cl) => cl.id === action.payload.clue.id);
          if (clueIndex !== -1) {
            category.clues[clueIndex] = action.payload.clue;
          }
        }
      }
    },
  },
});

export const {
  addBoard,
  updateBoard,
  deleteBoard,
  addCategory,
  updateCategory,
  addClue,
  updateClue,
} = boardsSlice.actions;
export default boardsSlice.reducer;
