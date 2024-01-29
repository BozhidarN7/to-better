import { createSlice } from '@reduxjs/toolkit';

import { tasksState } from '@/store/state';

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: tasksState,
  reducers: {
    createTask(state, action) {
      const newTask = action.payload;
    },
  },
});

export const { createTask } = tasksSlice.actions;
export const tasksReducer = tasksSlice.reducer;
