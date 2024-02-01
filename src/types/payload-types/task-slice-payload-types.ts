import { Task } from '../tasks';

export type CreateTask = {
  task: Task;
  date: number;
  weekId: string;
};
