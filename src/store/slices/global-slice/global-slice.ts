import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { globalState } from '@/store/state';
import { UpdateWeeksCalendarSelectedYear } from '@/types/payload-types/global-slice-payload-types';

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
  },
});

export const { updateWeeksCalendarSelectedYear } = globalSlice.actions;
export const globalReducer = globalSlice.reducer;
