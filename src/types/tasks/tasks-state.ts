import Task from './task';

interface TasksState {
  sevenDaysPeriod: {
    startDate: Date;
    endDate: Date;
  };
  tasks: Task[];
}

export default TasksState;
