import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { DAYS_OF_THE_WEEK } from '@/constants';
import { tasksState } from '@/store/state';
import { DayOfWeek } from '@/types';
import {
  CreateTask,
  EditTask,
  UpdateTaskCompletionStatus,
  UpdateTotalTasksCompleted,
} from '@/types/payload-types/task-slice-payload-types';
import { Task, TasksState } from '@/types/tasks';
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
    editTask(state, action: PayloadAction<EditTask>) {
      const { task, weekId, taskId, day } = action.payload;
      const weeklyTasks = state.find(
        (weeklyTasks) => weeklyTasks.id === weekId,
      );
      if (!weeklyTasks) {
        return state;
      }
      const taskToEditIndex = weeklyTasks.tasks[day].findIndex(
        (task: Task) => task.id === taskId,
      );

      if (taskToEditIndex === -1) {
        return state;
      }

      weeklyTasks.tasks[day][taskToEditIndex] = task;
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

export const selectTaskByWeekIdAndDate = (
  state: TasksState[],
  weekId: string,
  day: DayOfWeek,
  taskId: string,
) =>
  state
    .find((week) => week.id === weekId)
    ?.tasks[day].find((task) => task.id === taskId);

export const {
  createTask,
  editTask,
  updateTaskCompletionStatus,
  updateTotalTasksCompleted,
} = tasksSlice.actions;
export const tasksReducer = tasksSlice.reducer;
