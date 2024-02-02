import Task from './task';

interface TasksState {
  id: string;
  sevenDaysPeriod: {
    startDate: string;
    endDate: string;
  };
  tasks: {
    monday: Task[];
    tuesday: Task[];
    wednesday: Task[];
    thursday: Task[];
    friday: Task[];
    saturday: Task[];
    sunday: Task[];
  };
}

export default TasksState;
