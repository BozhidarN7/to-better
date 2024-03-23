import Task from './task';

interface TasksState {
  _id: string;
  sevenDaysPeriod: {
    startDate: string;
    endDate: string;
  };
  totalTasks: number;
  tasksCompleted: number;
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
