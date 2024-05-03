import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { globalState } from '@/store/state';
import {
  SetFirstYearWithTasks,
  UpdateWeeksCalendarSelectedYear,
} from '@/types/payload-types/global-slice-payload-types';

const globalSlice = createSlice({
  name: 'global',
  initialState: globalState,
  reducers: {
    updateWeeksCalendarSelectedYear(
      state,
      action: PayloadAction<UpdateWeeksCalendarSelectedYear>,
    ) {
      const { newYear } = action.payload;
      return { ...state, weeksCalendarSelectedYear: newYear };
    },
    setFirstYearWithTasks(state, action: PayloadAction<SetFirstYearWithTasks>) {
      const { year } = action.payload;
      return { ...state, year };
    },
  },
});

export const { updateWeeksCalendarSelectedYear, setFirstYearWithTasks } =
  globalSlice.actions;
export const globalReducer = globalSlice.reducer;
