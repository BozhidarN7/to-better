export default function calculateTasksProgress(
  tasksCompleted: number,
  totalTasks: number,
) {
  if (totalTasks === 0) {
    return 0;
  }

  return Math.trunc((tasksCompleted / totalTasks) * 100);
}
