import { Task } from '@/types/tasks';

export default function getCompletedTasksCount(tasks: Task[]) {
  return tasks.filter((task) => task.isCompleted).length;
}
