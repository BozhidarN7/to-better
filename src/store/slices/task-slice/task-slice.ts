import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { tasksState } from '@/store/state';
import { DayOfWeek } from '@/types';
import { AddTasks } from '@/types/payload-types/task-slice-payload-types';
import { TasksState } from '@/types/tasks';

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: tasksState,
  reducers: {
    initializeTasks(state, action: PayloadAction<AddTasks>) {
      const { tasks } = action.payload;
      state = [...tasks];
      return state;
    },
  },
});

export const selectTaskByWeekIdAndDate = (
  state: TasksState[],
  weekId: string,
  day: DayOfWeek,
  taskId: string,
) =>
  state
    .find((week) => week._id === weekId)
    ?.tasks[day].find((task) => task._id === taskId);

export const { initializeTasks } = tasksSlice.actions;
export const tasksReducer = tasksSlice.reducer;
