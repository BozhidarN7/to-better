import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { DAYS_OF_THE_WEEK } from '@/constants';
import { tasksState } from '@/store/state';
import { CreateTask } from '@/types/payload-types/task-slice-payload-types';
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
      console.log('weeklTasks', weeklyTasks);
      const startDate = getDateAndMonth(
        weeklyTasks?.sevenDaysPeriod.startDate,
      ).split('.')[0];
      const day = DAYS_OF_THE_WEEK[Math.abs(Number(startDate) - date)];
      console.log('startDate', startDate);
      console.log('date', date);
      console.log('day', day);
      weeklyTasks.tasks[day].push(task);
    },
  },
});

export const { createTask } = tasksSlice.actions;
export const tasksReducer = tasksSlice.reducer;
