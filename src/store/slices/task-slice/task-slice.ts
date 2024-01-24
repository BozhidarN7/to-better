import { createSlice } from '@reduxjs/toolkit';

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {},
  reducers: {},
});

export const tasksReducer = tasksSlice.reducer;
