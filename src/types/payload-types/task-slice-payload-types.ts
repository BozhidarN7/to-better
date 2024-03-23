import DayOfWeek from '../day-of-week';
import { Task, Week } from '../tasks';

export type AddTasks = {
  tasks: Week[];
};

export type CreateTask = {
  task: Task;
  date: number;
  weekId: string;
};

export type EditTask = CreateTask & {
  taskId: string;
  day: DayOfWeek;
};

export type DeleteTask = Pick<EditTask, 'taskId' | 'day' | 'weekId'>;

export type UpdateTotalTasksCompleted = {
  weekId: string;
  increase: boolean;
};

export type UpdateTaskCompletionStatus = {
  weekId: string;
  day: DayOfWeek;
  taskId: string;
};
