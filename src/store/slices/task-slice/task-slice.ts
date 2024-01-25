import { createSlice } from '@reduxjs/toolkit';

import { tasksState } from '@/store/state';

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: tasksState,
  reducers: {},
});

export const tasksReducer = tasksSlice.reducer;
