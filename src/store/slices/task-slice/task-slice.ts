import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { DAYS_OF_THE_WEEK } from '@/constants';
import { tasksState } from '@/store/state';
import { DayOfWeek } from '@/types';
import {
  AddTasks,
  CreateTask,
  DeleteTask,
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
    initializeTasks(state, action: PayloadAction<AddTasks>) {
      const { tasks } = action.payload;
      state = [...tasks];
      return state;
    },
    createTask(state, action: PayloadAction<CreateTask>) {
      const { task, date, weekId } = action.payload;
      const weeklyTasks = state.find(
        (weeklyTasks) => weeklyTasks._id === weekId,
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
        (weeklyTasks) => weeklyTasks._id === weekId,
      );
      if (!weeklyTasks) {
        return state;
      }
      const taskToEditIndex = weeklyTasks.tasks[day].findIndex(
        (task: Task) => task._id === taskId,
      );

      if (taskToEditIndex === -1) {
        return state;
      }

      weeklyTasks.tasks[day][taskToEditIndex] = task;
    },
    deleteTask(state, action: PayloadAction<DeleteTask>) {
      const { weekId, day, taskId } = action.payload;

      const weeklyTasks = state.find(
        (weeklyTasks) => weeklyTasks._id === weekId,
      );

      if (!weeklyTasks) {
        return state;
      }

      const taskToEditIndex = weeklyTasks.tasks[day].findIndex(
        (task: Task) => task._id === taskId,
      );

      if (taskToEditIndex === -1) {
        return state;
      }

      if (weeklyTasks.tasks[day][taskToEditIndex].isCompleted) {
        weeklyTasks.tasksCompleted -= 1;
      }
      weeklyTasks.totalTasks -= 1;
      weeklyTasks.tasks[day].splice(taskToEditIndex, 1);
    },
    updateTotalTasksCompleted(
      state,
      action: PayloadAction<UpdateTotalTasksCompleted>,
    ) {
      const { weekId, increase } = action.payload;
      const weeklyTasks = state.find(
        (weeklyTasks) => weeklyTasks._id === weekId,
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
        (weeklyTasks) => weeklyTasks._id === weekId,
      );

      if (!weeklyTasks) {
        return state;
      }

      const task = weeklyTasks.tasks[day].find((task) => task._id === taskId);

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
    .find((week) => week._id === weekId)
    ?.tasks[day].find((task) => task._id === taskId);

export const {
  initializeTasks,
  createTask,
  deleteTask,
  editTask,
  updateTaskCompletionStatus,
  updateTotalTasksCompleted,
} = tasksSlice.actions;
export const tasksReducer = tasksSlice.reducer;
