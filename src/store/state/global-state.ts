import { GlobalState } from '@/types';

const globalState: GlobalState = {
  weeksCalendarSelectedYear: new Date().getFullYear(),
  firstYearWithTasks: new Date().getFullYear(),
};

export default globalState;
