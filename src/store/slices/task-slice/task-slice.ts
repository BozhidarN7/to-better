import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { DAYS_OF_THE_WEEK } from '@/constants';
import { tasksState } from '@/store/state';
import {
  CreateTask,
  UpdateTaskCompletionStatus,
  UpdateTotalTasksCompleted,
} from '@/types/payload-types/task-slice-payload-types';
import { getDateAndMonth } from '@/utils';

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: tasksState,
  reducers: {
    createTask(state, action: PayloadAction<CreateTask>) {
      const { task, date, weekId } = action.payload;
      const weeklyTasks = state.find(
        (weeklyTasks) => weeklyTasks.id === weekId,
      );

      if (!weeklyTasks) {
        return state;
      }

      const startDate = getDateAndMonth(
        weeklyTasks?.sevenDaysPeriod.startDate,
      ).split('.')[0];
      const day = DAYS_OF_THE_WEEK[Math.abs(Number(startDate) - date)];

      weeklyTasks.tasks[day].push(task);
      weeklyTasks.totalTasks += 1;
    },
    updateTotalTasksCompleted(
      state,
      action: PayloadAction<UpdateTotalTasksCompleted>,
    ) {
      const { weekId, increase } = action.payload;
      const weeklyTasks = state.find(
        (weeklyTasks) => weeklyTasks.id === weekId,
      );

      if (!weeklyTasks) {
        return state;
      }

      weeklyTasks.tasksCompleted = increase
        ? weeklyTasks.tasksCompleted + 1
        : weeklyTasks.tasksCompleted - 1;
    },
    updateTaskCompletionStatus(
      state,
      action: PayloadAction<UpdateTaskCompletionStatus>,
    ) {
      const { weekId, day, taskId } = action.payload;
      const weeklyTasks = state.find(
        (weeklyTasks) => weeklyTasks.id === weekId,
      );

      if (!weeklyTasks) {
        return state;
      }

      const task = weeklyTasks.tasks[day].find((task) => task.id === taskId);

      if (!task) {
        return state;
      }

      task.isCompleted = !task.isCompleted;
    },
  },
});

export const {
  createTask,
  updateTaskCompletionStatus,
  updateTotalTasksCompleted,
} = tasksSlice.actions;
export const tasksReducer = tasksSlice.reducer;
