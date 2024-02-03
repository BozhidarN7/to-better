export default function calculateTasksProgress(
  tasksCompleted: number,
  totalTasks: number,
) {
  return (tasksCompleted / totalTasks) * 100;
}
