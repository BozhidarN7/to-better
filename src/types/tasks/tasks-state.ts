import Task from './task';

interface TasksState {
  id: string;
  sevenDaysPeriod: {
    startDate: Date;
    endDate: Date;
  };
  tasks: Task[];
}

export default TasksState;
