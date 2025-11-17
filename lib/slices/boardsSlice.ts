import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface Clue {
  id: string | number;
  value: number;
  position?: number;
  question: string;
  answer: string;
  type?: string;
  mediaUrl?: string | null;
}

export interface Category {
  id: string | number;
  title: string;
  position?: number;
  clues: Clue[];
}

export interface Board {
  id: string | number;
  title: string;
  timeLimit: number;
  categories: Category[];
  createdAt?: string;
  dateCreated?: string;
  dateUpdated?: string;
}

interface BoardsState {
  boards: Board[];
  loading: boolean;
  error: string | null;
  currentBoard: Board | null;
}

// Async thunks
export const fetchBoards = createAsyncThunk(
  "boards/fetchBoards",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_JEOPARDY_SERVER}/board`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message ||
            error.message ||
            "Failed to fetch boards"
        );
      }
      return rejectWithValue(
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }
);

export const fetchBoardById = createAsyncThunk(
  "boards/fetchBoardById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_JEOPARDY_SERVER}/board/${id}`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message ||
            error.message ||
            "Failed to fetch board"
        );
      }
      return rejectWithValue(
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }
);

export const createBoard = createAsyncThunk(
  "boards/createBoard",
  async (
    boardData: { title: string; questionTimeLimit: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_JEOPARDY_SERVER}/board`,
        boardData
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message ||
            error.message ||
            "Failed to create board"
        );
      }
      return rejectWithValue(
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }
);

export const updateBoard = createAsyncThunk(
  "boards/updateBoard",
  async (
    { id, ...boardData }: Partial<Board> & { id: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_JEOPARDY_SERVER}/board/${id}`,
        boardData
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message ||
            error.message ||
            "Failed to update board"
        );
      }
      return rejectWithValue(
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }
);

export const createCategory = createAsyncThunk(
  "boards/createCategory",
  async (
    {
      boardId,
      title,
      position,
    }: { boardId: string | number; title: string; position: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_JEOPARDY_SERVER}/category`,
        {
          boardId,
          title,
          position,
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message ||
            error.message ||
            "Failed to create category"
        );
      }
      return rejectWithValue(
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }
);

export const updateCategory = createAsyncThunk(
  "boards/updateCategory",
  async (
    {
      id,
      boardId,
      title,
    }: {
      id: string | number;
      boardId: string | number;
      title: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_JEOPARDY_SERVER}/category/${id}`,
        {
          boardId: typeof boardId === "string" ? parseInt(boardId) : boardId,
          title,
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message ||
            error.message ||
            "Failed to update category"
        );
      }
      return rejectWithValue(
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }
);

export const createClue = createAsyncThunk(
  "boards/createClue",
  async (
    {
      categoryId,
      value,
      position,
      question,
      answer,
      type = "text",
      mediaUrl,
    }: {
      categoryId: string | number;
      value: number;
      position: number;
      question: string;
      answer: string;
      type?: string;
      mediaUrl?: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const payload: any = {
        categoryId:
          typeof categoryId === "string" ? parseInt(categoryId) : categoryId,
        value,
        position,
        question,
        answer,
        type,
      };

      // Only include mediaUrl if type is not 'text' and mediaUrl is provided
      if (type !== "text" && mediaUrl) {
        payload.mediaUrl = mediaUrl;
      }

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_JEOPARDY_SERVER}/clue`,
        payload
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message ||
            error.message ||
            "Failed to create clue"
        );
      }
      return rejectWithValue(
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }
);

export const updateClue = createAsyncThunk(
  "boards/updateClue",
  async (
    {
      id,
      categoryId,
      value,
      question,
      answer,
      type = "text",
      mediaUrl,
    }: {
      id: string | number;
      categoryId: string | number;
      value: number;
      question: string;
      answer: string;
      type?: string;
      mediaUrl?: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const payload: any = {
        categoryId:
          typeof categoryId === "string" ? parseInt(categoryId) : categoryId,
        value,
        question,
        answer,
        type,
      };

      // Only include mediaUrl if type is not 'text' and mediaUrl is provided
      if (type !== "text" && mediaUrl) {
        payload.mediaUrl = mediaUrl;
      }

      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_JEOPARDY_SERVER}/clue/${id}`,
        payload
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message ||
            error.message ||
            "Failed to update clue"
        );
      }
      return rejectWithValue(
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }
);

const createPremadeBoard = (title: string, timeLimit: number): Board => {
  const categoryNames = [
    "Category 1",
    "Category 2",
    "Category 3",
    "Category 4",
    "Category 5",
    "Category 6",
  ];
  const clueValues = [200, 400, 600, 800, 1000];

  const categories: Category[] = categoryNames.map((name) => ({
    id: `cat-${Math.random().toString(36).substr(2, 9)}`,
    title: name,
    clues: clueValues.map((value) => ({
      id: `clue-${Math.random().toString(36).substr(2, 9)}`,
      value,
      question: "",
      answer: "",
    })),
  }));

  return {
    id: `board-${Math.random().toString(36).substr(2, 9)}`,
    title,
    timeLimit: timeLimit,
    categories,
    createdAt: new Date().toISOString(),
  };
};

const initialState: BoardsState = {
  boards: [],
  loading: false,
  error: null,
  currentBoard: null,
};

const boardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentBoard: (state) => {
      state.currentBoard = null;
    },
    addBoard: (
      state,
      action: PayloadAction<{ title: string; questionTimeLimit: number }>
    ) => {
      const newBoard = createPremadeBoard(
        action.payload.title,
        action.payload.questionTimeLimit
      );
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
    addCategory: (
      state,
      action: PayloadAction<{ boardId: string; category: Category }>
    ) => {
      const board = state.boards.find((b) => b.id === action.payload.boardId);
      if (board) {
        board.categories.push(action.payload.category);
      }
    },
    updateCategory: (
      state,
      action: PayloadAction<{ boardId: string; category: Category }>
    ) => {
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
        const category = board.categories.find(
          (c) => c.id === action.payload.categoryId
        );
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
        const category = board.categories.find(
          (c) => c.id === action.payload.categoryId
        );
        if (category) {
          const clueIndex = category.clues.findIndex(
            (cl) => cl.id === action.payload.clue.id
          );
          if (clueIndex !== -1) {
            category.clues[clueIndex] = action.payload.clue;
          }
        }
      }
    },
  },
  extraReducers: (builder) => {
    // Fetch all boards
    builder
      .addCase(fetchBoards.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBoards.fulfilled, (state, action) => {
        state.loading = false;
        state.boards = action.payload;
      })
      .addCase(fetchBoards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Fetch board by ID
    builder
      .addCase(fetchBoardById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBoardById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentBoard = action.payload;
        // Also update in boards array if it exists
        const index = state.boards.findIndex((b) => b.id === action.payload.id);
        if (index !== -1) {
          state.boards[index] = action.payload;
        }
      })
      .addCase(fetchBoardById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Create board
    builder
      .addCase(createBoard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBoard.fulfilled, (state, action) => {
        state.loading = false;
        state.boards.push(action.payload);
      })
      .addCase(createBoard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Update board
    builder
      .addCase(updateBoard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBoard.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.boards.findIndex((b) => b.id === action.payload.id);
        if (index !== -1) {
          state.boards[index] = action.payload;
        }
        // Update currentBoard if it's the one being updated
        if (state.currentBoard?.id === action.payload.id) {
          state.currentBoard = action.payload;
        }
      })
      .addCase(updateBoard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Create category
    builder
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = false;
        // The board will be refetched after category creation to get updated categories
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Update category
    builder
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;
        // The board will be refetched after category update to get updated data
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Create clue
    builder
      .addCase(createClue.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createClue.fulfilled, (state, action) => {
        state.loading = false;
        // The board will be refetched after clue creation to get updated clues
      })
      .addCase(createClue.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Update clue
    builder
      .addCase(updateClue.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateClue.fulfilled, (state, action) => {
        state.loading = false;
        // The board will be refetched after clue update to get updated data
      })
      .addCase(updateClue.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  addBoard,
  updateBoard: updateBoardLocal,
  deleteBoard,
  addCategory,
  updateCategory: updateCategoryLocal,
  addClue,
  updateClue: updateClueLocal,
  clearError,
  clearCurrentBoard,
} = boardsSlice.actions;
export default boardsSlice.reducer;
