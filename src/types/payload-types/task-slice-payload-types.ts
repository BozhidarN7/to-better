import DayOfWeek from '../day-of-week';
import { Task } from '../tasks';

export type CreateTask = {
  task: Task;
  date: number;
  weekId: string;
};

export type UpdateTotalTasksCompleted = {
  weekId: string;
  increase: boolean;
};

export type UpdateTaskCompletionStatus = {
  weekId: string;
  day: DayOfWeek;
  taskId: string;
};
