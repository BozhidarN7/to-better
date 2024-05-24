import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { tasksState } from '@/store/state';
import { DayOfWeek } from '@/types';
import {
  AddTasks,
  UpdateTotalTasksSelected,
} from '@/types/payload-types/task-slice-payload-types';
import { TasksState } from '@/types/tasks';

const MAX_POSSIBLE_WEEKS_SELECTED = 1000;
const MIN_POSSIBLE_WEEKS_SELECTED = 0;

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: tasksState,
  reducers: {
    initializeTasks(state, action: PayloadAction<AddTasks>) {
      const { tasks } = action.payload;
      return { ...state, weeks: tasks, totalWeeksSelected: tasks.length };
    },
    updateTotalTasksSelected(
      state,
      action: PayloadAction<UpdateTotalTasksSelected>,
    ) {
      const { shouldIncrease } = action.payload;
      if (
        (shouldIncrease &&
          state.totalWeeksSelected < MAX_POSSIBLE_WEEKS_SELECTED) ||
        state.totalWeeksSelected === MIN_POSSIBLE_WEEKS_SELECTED
      ) {
        return { ...state, totalWeeksSelected: state.totalWeeksSelected + 1 };
      }
      return { ...state, totalWeeksSelected: state.totalWeeksSelected - 1 };
    },
  },
});

export const selectTaskByWeekIdAndDate = (
  state: TasksState,
  weekId: string,
  day: DayOfWeek,
  taskId: string,
) =>
  state.weeks
    .find((week) => week._id === weekId)
    ?.tasks[day].find((task) => task._id === taskId);

export const { initializeTasks, updateTotalTasksSelected } = tasksSlice.actions;
export const tasksReducer = tasksSlice.reducer;
