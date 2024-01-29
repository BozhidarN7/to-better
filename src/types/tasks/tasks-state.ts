import Task from './task';

interface TasksState {
  id: string;
  sevenDaysPeriod: {
    startDate: Date;
    endDate: Date;
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
