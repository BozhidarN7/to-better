import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { tasksState } from '@/store/state';
import { CreateTask } from '@/types/payload-types/task-slice-payload-types';

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: tasksState,
  reducers: {
    createTask(state, action: PayloadAction<CreateTask>) {
      const { task } = action.payload;
    },
  },
});

export const { createTask } = tasksSlice.actions;
export const tasksReducer = tasksSlice.reducer;
